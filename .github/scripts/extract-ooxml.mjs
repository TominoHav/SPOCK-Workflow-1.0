import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';
import { resolve, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

function unzip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 66000; i--)
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('not a zip');
  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const out = new Map();
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) break;
    const method = buf.readUInt16LE(off + 10);
    const csize  = buf.readUInt32LE(off + 20);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commLen = buf.readUInt16LE(off + 32);
    const lho = buf.readUInt32LE(off + 42);
    const name = buf.toString('utf8', off + 46, off + 46 + nameLen);
    const lnameLen = buf.readUInt16LE(lho + 26);
    const lextraLen = buf.readUInt16LE(lho + 28);
    const start = lho + 30 + lnameLen + lextraLen;
    const raw = buf.subarray(start, start + csize);
    try { out.set(name, method === 0 ? raw : inflateRawSync(raw)); } catch {  }
    off += 46 + nameLen + extraLen + commLen;
  }
  return out;
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
const unent = s => s.replace(/&(#x[0-9a-fA-F]+|#\d+|\w+);/g, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENT[e] ?? m));

export function parseXml(xml) {
  const root = { name: '#root', attrs: {}, kids: [] };
  const stack = [root];
  const re = /<!\[CDATA\[([\s\S]*?)\]\]>|<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!DOCTYPE[^>]*>|<\/([^\s>]+)\s*>|<([^\s/>]+)((?:\s+[^\s=/>]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)/g;
  let m;
  while ((m = re.exec(xml))) {
    const top = stack[stack.length - 1];
    if (m[1] !== undefined) top.kids.push(m[1]);
    else if (m[2] !== undefined) { while (stack.length > 1 && stack.pop().name !== m[2]) {  } }
    else if (m[3] !== undefined) {
      const attrs = {};
      for (const a of m[4].matchAll(/([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) attrs[a[1]] = unent(a[2] ?? a[3] ?? '');
      const el = { name: m[3], attrs, kids: [] };
      top.kids.push(el);
      if (!m[5]) stack.push(el);
    } else if (m[6] !== undefined) top.kids.push(unent(m[6]));
  }
  return root;
}
const els = (n, name) => (n ? n.kids.filter(k => typeof k === 'object' && (!name || k.name === name)) : []);
const el = (n, name) => els(n, name)[0] || null;
function* walk(n) { for (const k of (n ? n.kids : [])) if (typeof k === 'object') { yield k; yield* walk(k); } }
const find = (n, name) => { for (const k of walk(n)) if (k.name === name) return k; return null; };
const findAll = (n, name) => [...walk(n)].filter(k => k.name === name);
const textIn = (n, name) => findAll(n, name).map(t => t.kids.filter(k => typeof k === 'string').join('')).join('');

function rels(z, part) {
  const dir = posix.dirname(part), relPath = `${dir}/_rels/${posix.basename(part)}.rels`;
  const out = new Map();
  if (!z.has(relPath)) return out;
  for (const r of findAll(parseXml(z.get(relPath).toString('utf8')), 'Relationship')) {
    if (r.attrs.TargetMode === 'External') continue;
    const t = r.attrs.Target || '';
    out.set(r.attrs.Id, { type: r.attrs.Type || '', path: t.startsWith('/') ? t.slice(1) : posix.normalize(posix.join(dir, t)) });
  }
  return out;
}
const xmlOf = (z, part) => (z.has(part) ? parseXml(z.get(part).toString('utf8')) : null);

function wordPara(p) {
  let out = '';
  const go = n => {
    for (const k of n.kids) {
      if (typeof k !== 'object') continue;
      if (k.name === 'w:t') out += k.kids.filter(x => typeof x === 'string').join('');
      else if (k.name === 'w:tab' || k.name === 'w:br' || k.name === 'w:cr') out += ' ';
      else if (k.name === 'w:noBreakHyphen') out += '-';
      else if (k.name === 'w:delText' || k.name === 'w:instrText' || k.name === 'w:del') continue;
      else go(k);
    }
  };
  go(p);
  return out;
}
const cellText = tc => findAll(tc, 'w:p').map(wordPara).map(s => s.trim()).filter(Boolean).join(' ');
function word(z) {
  const doc = xmlOf(z, 'word/document.xml');
  const body = find(doc, 'w:body');
  const lines = [];
  const block = n => {
    for (const k of els(n)) {
      if (k.name === 'w:p') lines.push(wordPara(k));
      else if (k.name === 'w:tbl') for (const tr of els(k, 'w:tr')) lines.push(els(tr, 'w:tc').map(cellText).join(' | '));
      else if (k.name === 'w:sdt') block(el(k, 'w:sdtContent') || { kids: [] });
      else if (k.name === 'w:customXml' || k.name === 'w:smartTag') block(k);
    }
  };
  block(body || doc);
  return lines.filter(s => s.trim()).join('\n');
}

function shapesText(tree, notes) {
  const out = [];
  for (const sp of findAll(tree, 'p:sp')) {
    const ph = find(sp, 'p:ph');
    const type = ph ? (ph.attrs.type || 'body') : '';
    if (notes && ph && !['body', 'obj'].includes(type)) continue;
    if (!notes && ['sldNum', 'dt', 'ftr', 'hdr'].includes(type)) continue;
    for (const p of findAll(sp, 'a:p')) {
      let s = '';
      for (const k of walk(p)) {
        if (k.name === 'a:t') s += k.kids.filter(x => typeof x === 'string').join('');
        else if (k.name === 'a:br' || k.name === 'a:tab') s += ' ';
      }
      if (s.trim()) out.push(s);
    }
  }
  for (const tbl of findAll(tree, 'a:tbl'))
    for (const tr of els(tbl, 'a:tr')) out.push(els(tr, 'a:tc').map(tc => textIn(tc, 'a:t').trim()).join(' | '));
  return out;
}
function powerpoint(z) {
  let slides = [];
  const pres = 'ppt/presentation.xml';
  if (z.has(pres)) {
    const r = rels(z, pres);
    for (const s of findAll(xmlOf(z, pres), 'p:sldId')) { const t = r.get(s.attrs['r:id']); if (t && z.has(t.path)) slides.push(t.path); }
  }
  if (!slides.length) slides = [...z.keys()].filter(k => /^ppt\/slides\/slide\d+\.xml$/.test(k))
    .sort((a, b) => Number(/(\d+)\.xml$/.exec(a)[1]) - Number(/(\d+)\.xml$/.exec(b)[1]));
  return slides.map((path, i) => {
    const tree = xmlOf(z, path);
    const sld = el(tree, 'p:sld');
    const hidden = sld && sld.attrs.show === '0';
    const lines = [`## Slide ${i + 1}${hidden ? ' (hidden)' : ''}`, ...shapesText(tree, false)];
    const notes = [...rels(z, path).values()].find(r => /\/notesSlide$/.test(r.type));
    if (notes && z.has(notes.path)) {
      const n = shapesText(xmlOf(z, notes.path), true);
      if (n.length) lines.push('', 'Notes:', ...n);
    }
    return lines.join('\n');
  }).join('\n\n');
}

const BUILTIN_DATES = new Set([14, 15, 16, 17, 22]);
const BUILTIN_TIMES = new Set([18, 19, 20, 21, 45, 46, 47]);
export function dateKind(id, code) {
  if (BUILTIN_DATES.has(id)) return id === 22 ? 'datetime' : 'date';
  if (BUILTIN_TIMES.has(id)) return 'time';
  if (!code) return null;
  const c = code.split(';')[0].replace(/"[^"]*"/g, '').replace(/\\./g, '').replace(/\[(?:\$[^\]]*|[a-zA-Z]+[^\]]*)\]/g, '').toLowerCase();
  const date = /[dy]/.test(c) || (/m/.test(c) && !/[hs]/.test(c) && !/0|#/.test(c));
  const time = /[hs]/.test(c);
  return date && time ? 'datetime' : date ? 'date' : time ? 'time' : null;
}
export function excelDate(serial, kind, date1904) {
  const days = Math.floor(serial), frac = serial - days;
  let ms;
  if (date1904) ms = Date.UTC(1904, 0, 1) + days * 86400000;
  else ms = Date.UTC(1899, 11, days >= 61 ? 30 : 31) + days * 86400000;
  const d = new Date(ms + Math.round(frac * 86400) * 1000);
  const iso = d.toISOString();
  if (kind === 'time') return iso.slice(11, 19);
  if (kind === 'datetime') return `${iso.slice(0, 10)} ${iso.slice(11, 16)}`;
  return iso.slice(0, 10);
}
const colIndex = ref => { let n = 0; for (const ch of /^[A-Z]+/i.exec(ref)?.[0].toUpperCase() || '') n = n * 26 + (ch.charCodeAt(0) - 64); return n - 1; };
function excel(z) {
  const wb = 'xl/workbook.xml';
  const wbx = xmlOf(z, wb);
  const date1904 = !!(wbx && findAll(wbx, 'workbookPr').some(w => ['1', 'true'].includes(w.attrs.date1904)));
  let sheets = [];
  if (wbx) {
    const r = rels(z, wb);
    for (const s of findAll(wbx, 'sheet')) { const t = r.get(s.attrs['r:id']); if (t && z.has(t.path)) sheets.push({ path: t.path, name: s.attrs.name || '', hidden: s.attrs.state === 'hidden' || s.attrs.state === 'veryHidden' }); }
  }
  if (!sheets.length) sheets = [...z.keys()].filter(k => /^xl\/worksheets\/sheet\d+\.xml$/.test(k))
    .sort((a, b) => Number(/(\d+)\.xml$/.exec(a)[1]) - Number(/(\d+)\.xml$/.exec(b)[1])).map(path => ({ path, name: '', hidden: false }));
  const sst = xmlOf(z, 'xl/sharedStrings.xml');
  const shared = sst ? els(find(sst, 'sst'), 'si').map(si => {
    let s = ''; const go = n => { for (const k of els(n)) { if (k.name === 'rPh') continue; if (k.name === 't') s += k.kids.filter(x => typeof x === 'string').join(''); else go(k); } };
    go(si); return s;
  }) : [];
  const styles = xmlOf(z, 'xl/styles.xml');
  const fmts = new Map(styles ? findAll(styles, 'numFmt').map(f => [Number(f.attrs.numFmtId), f.attrs.formatCode || '']) : []);
  const xfs = styles ? els(find(styles, 'cellXfs'), 'xf').map(x => { const id = Number(x.attrs.numFmtId || 0); return dateKind(id, fmts.get(id)); }) : [];
  return sheets.map((sh, i) => {
    const tree = xmlOf(z, sh.path);
    const rows = findAll(tree, 'row').map(row => {
      const cells = [];
      let next = 0;
      for (const c of els(row, 'c')) {
        const at = c.attrs.r ? colIndex(c.attrs.r) : next;
        next = at + 1;
        const t = c.attrs.t || 'n';
        const v = (el(c, 'v') ? el(c, 'v').kids.join('') : undefined);
        let val = '';
        if (t === 'inlineStr') val = textIn(c, 't');
        else if (v === undefined) val = '';
        else if (t === 's') val = shared[Number(v)] ?? '';
        else if (t === 'b') val = v === '1' ? 'TRUE' : 'FALSE';
        else if (t === 'e' || t === 'str') val = v;
        else {
          const kind = xfs[Number(c.attrs.s || 0)];
          const num = Number(v);
          val = kind && Number.isFinite(num) ? excelDate(num, kind, date1904) : v;
        }
        cells[at] = val.replace(/\s*\n\s*/g, ' ');
      }
      for (let k = 0; k < cells.length; k++) if (cells[k] === undefined) cells[k] = '';
      return cells.join(' | ');
    });
    const head = `## Sheet ${i + 1}${sh.name ? `: ${sh.name}` : ''}${sh.hidden ? ' (hidden)' : ''}`;
    return [head, ...rows.filter(r => r.replace(/[|\s]/g, ''))].join('\n');
  }).join('\n\n');
}

export function extract(path) {
  const z = unzip(readFileSync(path));
  if (z.has('word/document.xml')) return word(z);
  if (z.has('ppt/presentation.xml') || [...z.keys()].some(k => /^ppt\/slides\/slide\d+\.xml$/.test(k))) return powerpoint(z);
  if (z.has('xl/workbook.xml') || [...z.keys()].some(k => /^xl\/worksheets\/sheet\d+\.xml$/.test(k))) return excel(z);
  throw new Error('unrecognised OOXML container');
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  if (!process.argv[2]) { console.error('usage: node .github/scripts/extract-ooxml.mjs <file.docx|pptx|xlsx|docm|pptm|xlsm>'); process.exit(2); }
  console.log(extract(process.argv[2]));
}

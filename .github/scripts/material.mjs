import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readdirSync, statSync, existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, basename, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, STAGE_DIRS, SUPPLIED_DIR, openRuns, declaredId, KEEP_FILE, KEEP_TEXT, twoRunsRefusal } from './run-files.mjs';
import { frontmatter, fenceAt } from './yaml.mjs';

const TEXT = new Set(['.md', '.txt', '.csv', '.tsv', '.json', '.yaml', '.yml', '.log', '.vtt', '.srt']);
const OFFICE = new Set(['.docx', '.pptx', '.xlsx', '.docm', '.pptm', '.xlsm']);

const MATERIAL_DIR = STAGE_DIRS[1];

const die = m => { console.error(m); process.exit(2); };
const human = n => n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${Math.round(n / 1024)} kB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;

export function measure(abs) {
  try {
    const b = readFileSync(abs);
    return { bytes: b.length, sha256: createHash('sha256').update(b).digest('hex') };
  } catch { return null; }
}

export function citesSupplied(item, f) {
  const sp = String((item && item.source_path) || '').trim();
  return !!sp && (sp === f.rel || sp === `${SUPPLIED_DIR}/${f.rel}`);
}

export function material(dir, stageDir = MATERIAL_DIR) {
  const root = join(dir, stageDir);
  if (!existsSync(root)) return { root, files: [] };
  const files = [];
  const walk = (d, rel) => {
    for (const name of readdirSync(d).sort()) {
      if (name.startsWith('.')) continue;
      const abs = join(d, name);
      let st;
      try { st = statSync(abs); } catch { continue; }
      if (st.isDirectory()) { if (name !== 'records' && name !== 'read') walk(abs, rel ? `${rel}/${name}` : name); continue; }
      const ext = extname(name).toLowerCase();
      let id = null;
      try { id = declaredId(join(root, rel ? `${rel}/${name}` : name)); } catch { id = null; }
      const fullPath = join(root, rel ? `${rel}/${name}` : name);
      const sha256 = (measure(fullPath) || {}).sha256 || null;
      files.push({
        rel: rel ? `${rel}/${name}` : name,
        path: fullPath,
        bytes: st.size,
        sha256,
        artifact: id || null,
        kind: TEXT.has(ext) ? 'text' : OFFICE.has(ext) ? 'office' : ext === '.pdf' ? 'pdf' : 'other',
      });
    }
  };
  walk(root, '');
  return { root, files };
}

export function suppliedFiles(dir, stageDir = MATERIAL_DIR) {
  return material(dir, stageDir).files.filter(f => !f.artifact && String(f.rel).startsWith(`${SUPPLIED_DIR}/`));
}

export function citingItems(items) {
  return (Array.isArray(items) ? items : []).filter(i => i && (String(i.arrival) === 'file' || String(i.source_path || '').trim()));
}

export function looseFiles(dir, stageDir = MATERIAL_DIR) {
  return material(dir, stageDir).files.filter(f => !f.artifact && !String(f.rel).includes('/'));
}

export const inUse = item => !!item && !String(item.superseded_at ?? '').trim() && !String(item.removed_at ?? '').trim();

const A2_FILE = '1-problem-material.md';
const sha256Of = b => createHash('sha256').update(b).digest('hex');

export function itemLines(lines, end) {
  const at = lines.findIndex((l, i) => i > 0 && i < end && /^items:\s*$/.test(l));
  if (at < 0) return null;
  let stop = end;
  for (let i = at + 1; i < end; i++) if (/^\S/.test(lines[i])) { stop = i; break; }
  const first = lines.slice(at + 1, stop).map(l => /^(\s*)-\s/.exec(l)).find(Boolean);
  const dash = first ? first[1].length : 2;
  const starts = [];
  for (let i = at + 1; i < stop; i++) {
    const m = /^(\s*)-\s/.exec(lines[i]);
    if (m && m[1].length === dash) starts.push(i);
  }
  return { at, stop, starts, dash, field: dash + 2 };
}

export function measureItems(text, dir) {
  const lines = text.split('\n');
  const end = String(lines[0] ?? '').trim() === '---' ? fenceAt(lines) : -1;
  if (end < 0) return { text, filled: [], unread: 'it has no front matter' };
  let fm;
  try { fm = frontmatter(text, A2_FILE); } catch (e) { return { text, filled: [], unread: String(e.message).split('\n')[0] }; }
  const items = Array.isArray(fm && fm.items) ? fm.items : [];
  const L = itemLines(lines, end);
  if (!items.length || !L) return { text, filled: [] };
  if (L.starts.length !== items.length)
    return { text, filled: [], unread: `it lists ${items.length} item(s) and ${L.starts.length} could be placed in the file` };
  const path = i => String((i && i.source_path) || '').trim();
  const hasBytes = i => i && i.bytes !== undefined && i.bytes !== null && String(i.bytes).trim() !== '';
  const hasSha = i => i && String(i.sha256 || '').trim() !== '';
  const known = new Map();
  for (const i of items)
    if (inUse(i) && path(i) && hasBytes(i) && hasSha(i) && !known.has(path(i)))
      known.set(path(i), { bytes: Number(i.bytes), sha256: String(i.sha256).trim(), from: 'the record' });
  const inserts = [], filled = [];
  items.forEach((it, k) => {
    const sp = path(it);
    if (!sp || (hasBytes(it) && hasSha(it))) return;
    let m = known.get(sp);
    if (!m) {
      const abs = join(dir, MATERIAL_DIR, sp);
      if (!existsSync(abs)) return;
      const b = readFileSync(abs);
      m = { bytes: b.length, sha256: sha256Of(b), from: 'the file' };
      known.set(sp, m);
    }
    const a = L.starts[k], z = L.starts[k + 1] ?? L.stop;
    let after = -1;
    for (let i = a; i < z; i++) if (/^\s*(?:-\s+)?source_path:/.test(lines[i])) { after = i; break; }
    if (after < 0) { after = z - 1; while (after > a && !lines[after].trim()) after--; }
    const pad = ' '.repeat(L.field);
    inserts.push([after + 1, [...(hasBytes(it) ? [] : [`${pad}bytes: ${m.bytes}`]),
                              ...(hasSha(it) ? [] : [`${pad}sha256: ${m.sha256}`])]]);
    filled.push({ ref: String(it.ref || sp), source_path: sp, ...m });
  });
  for (const [at, add] of inserts.sort((x, y) => y[0] - x[0])) lines.splice(at, 0, ...add);
  return { text: lines.join('\n'), filled };
}

export const KEPT_DIR = 'superseded';

export function keptFiles(dir) {
  const root = join(dir, KEPT_DIR), out = [];
  const walk = (d, rel) => {
    if (!existsSync(d)) return;
    for (const name of readdirSync(d).sort()) {
      if (name.startsWith('.')) continue;
      const abs = join(d, name), r = rel ? `${rel}/${name}` : name;
      let st; try { st = statSync(abs); } catch { continue; }
      if (st.isDirectory()) { walk(abs, r); continue; }
      out.push({ rel: `${KEPT_DIR}/${r}`, path: abs, ...(measure(abs) || { bytes: null, sha256: null }) });
    }
  };
  walk(root, '');
  return out;
}

export function recordItems(dir) {
  const p = join(dir, MATERIAL_DIR, '1-problem-material.md');
  if (!existsSync(p)) return null;
  try { const fm = frontmatter(readFileSync(p, 'utf8'), p); return Array.isArray(fm && fm.items) ? fm.items.filter(Boolean) : []; }
  catch { return null; }
}

const CONVERTED_FROM = /\.(docx|pptx|xlsx|docm|pptm|xlsm|pdf)$/i;
const onRecord = sp => { const t = String(sp || '').trim(); return t.startsWith(`${SUPPLIED_DIR}/`) ? t : `${SUPPLIED_DIR}/${t}`; };

export function materialChanges(dir, items = recordItems(dir)) {
  const out = { new: [], changed: [], moved: [], removed: [], follows: [] };
  if (!Array.isArray(items)) return out;
  const live = new Map();
  for (const i of items)
    if (inUse(i) && String(i.source_path || '').trim()) {
      const p = onRecord(i.source_path);
      if (!live.has(p)) live.set(p, []);
      live.get(p).push(i);
    }
  const disk = new Map(suppliedFiles(dir).map(f => [f.rel, f]));
  const kept = keptFiles(dir);
  for (const [p, its] of live) {
    const was = its.find(i => String(i.sha256 || '').trim()) || its[0];
    const rec = { path: p, refs: its.map(i => String(i.ref)), bytes: was.bytes ?? null, sha256: String(was.sha256 || '').trim() || null };
    const f = disk.get(p);
    if (f) { if (rec.sha256 && f.sha256 && f.sha256 !== rec.sha256) out.changed.push({ ...rec, now: { bytes: f.bytes, sha256: f.sha256 } }); continue; }
    const k = rec.sha256 ? kept.find(x => x.sha256 === rec.sha256) : null;
    if (k) out.moved.push({ ...rec, keptAs: k.rel }); else out.removed.push(rec);
  }
  for (const [p, f] of disk) if (!live.has(p)) out.new.push(f);
  for (const [p, how] of [...out.changed.map(c => [c.path, 'changed']), ...out.moved.map(c => [c.path, 'moved']), ...out.removed.map(c => [c.path, 'removed'])]) {
    const copy = `${p}.md`;
    if (!CONVERTED_FROM.test(p) || !disk.has(copy)) continue;
    out.follows.push({ copy, original: p, how, refs: (live.get(copy) || []).map(i => String(i.ref)), sha256: disk.get(copy).sha256 });
    out.new = out.new.filter(f => f.rel !== copy);
    out.changed = out.changed.filter(c => c.path !== copy);
  }
  return out;
}

export const anyChange = c => !!c && ['new', 'changed', 'moved', 'removed', 'follows'].some(k => c[k].length);

export function changeLines(c, stageDir = MATERIAL_DIR) {
  const at = p => `${stageDir}/${p}`, refs = r => (r.length ? ` (${r.join(', ')})` : '');
  return [
    ...c.new.map(f => `  new       ${at(f.rel)}, ${f.bytes} bytes, fingerprint ${f.sha256}`),
    ...c.changed.map(x => `  changed   ${at(x.path)}${refs(x.refs)}: ${x.bytes} bytes before and ${x.now.bytes} now, fingerprint ${x.sha256} before and ${x.now.sha256} now`),
    ...c.moved.map(x => `  moved to superseded/   ${at(x.path)}${refs(x.refs)} is now ${x.keptAs}, fingerprint ${x.sha256}`),
    ...c.removed.map(x => `  removed   ${at(x.path)}${refs(x.refs)}, fingerprint ${x.sha256} when it was read in`),
    ...c.follows.map(x => `  follows   ${at(x.copy)}${refs(x.refs)} goes with ${x.original}, which ${x.how === 'changed' ? 'changed, so it is converted again and the old copy kept in superseded/' : x.how === 'moved' ? 'was moved to superseded/, so it is kept there too' : 'was removed, so it is kept in superseded/'}`),
  ];
}

export function freeName(folder, stem, date) {
  let name = `${stem}-${date}.md`;
  for (let n = 2; existsSync(join(folder, name)); n++) name = `${stem}-${date}-${n}.md`;
  return name;
}

export function addRefusal(status, hasRecord) {
  if (!hasRecord)
    return 'there is no problem-material record yet, so there is nothing to add to.\n' +
      `        Put the files in ${MATERIAL_DIR}/${SUPPLIED_DIR}/ and run "SPOCK: read in the problem material": it writes the record from everything in that folder.`;
  if (['pending', 'running', 'q_failed', 'produced'].includes(status)) return null;
  if (status === 'stale')
    return 'stage 2 is "stale": a stage it is built on changed after it was accepted.\n' +
      '        Send stage 2 back first with "SPOCK: send a stage back to be redone", then take the material in.';
  const shown = { in_review: 'is waiting on a decision', refined: 'is in review, with changes', accepted: 'is accepted' }[status];
  if (shown)
    return `stage 2 ${shown}, so a person has already been shown what it holds, and new material would change it underneath their decision.\n` +
      '        Send stage 2 back first with "SPOCK: send a stage back to be redone", then add the material, and the stage is written again with it.';
  return `stage 2 is "${status}", and material is added only until stage 2 is put in front of a person: before it starts, while it runs, or after it fails its check.`;
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const arg = process.argv.slice(2).find(a => !a.startsWith('-'));
  let dir;
  if (arg) {
    dir = join(RUNS_ROOT, arg);
    if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`material: ${dir} has no RUN-STATE.md`);
  } else {
    const open = openRuns();
    if (!open.length) die(`material: no unfinished run under \`${RUNS_ROOT}\``);
    if (open.length > 1) die(twoRunsRefusal(open, RUNS_ROOT));
    dir = open[0];
  }

  const sup = join(dir, MATERIAL_DIR, SUPPLIED_DIR);
  if (process.argv.includes('--write') && existsSync(join(dir, 'RUN-STATE.md')) && !existsSync(sup)) {
    mkdirSync(sup, { recursive: true });
    writeFileSync(join(sup, KEEP_FILE), KEEP_TEXT);
    console.log(`${basename(dir)} — made ${MATERIAL_DIR}/${SUPPLIED_DIR}/, which this run arrived without. The problem material goes in it.`);
  }

  const { root, files } = material(dir);
  if (!existsSync(root)) {
    console.log(`${basename(dir)} has no ${MATERIAL_DIR}/ folder yet.`);
    process.exit(0);
  }
  if (!files.length) {
    console.log(`${basename(dir)} — ${MATERIAL_DIR}/ is empty. Nothing has been supplied yet.`);
    process.exit(0);
  }

  const supplied = files.filter(f => !f.artifact);
  const written = files.filter(f => f.artifact);
  console.log(`${basename(dir)} — ${files.length} file(s) in ${MATERIAL_DIR}/\n`);
  if (supplied.length) {
    console.log('  supplied:');
    for (const f of supplied) console.log(`    ${f.rel.padEnd(44)} ${human(f.bytes).padStart(8)}   ${String(f.kind).padEnd(6)} ${f.sha256 ? f.sha256.slice(0, 16) : '—'}`);
  }
  if (written.length) {
    console.log(`${supplied.length ? '\n' : ''}  written by this run, not material:`);
    for (const f of written) console.log(`    ${f.rel.padEnd(44)} ${human(f.bytes).padStart(8)}   ${f.artifact}`);
  }

  const office = supplied.filter(f => f.kind === 'office');
  const pdf = supplied.filter(f => f.kind === 'pdf');
  const other = supplied.filter(f => f.kind === 'other');
  console.log('');
  if (office.length || pdf.length)
    console.log(`  ${office.length + pdf.length} need converting before they can be read: Word, PowerPoint, Excel and PDF files are read through their text copy. Run the conversion command.`);
  if (other.length) console.log(`  ${other.length} are in a form nothing here opens: ${other.map(f => f.rel).join(', ')}`);
  const readable = supplied.filter(f => f.kind === 'text');
  console.log(`  ${readable.length} of the supplied file(s) can be read now, by path, from ${root}/`);
  const changes = materialChanges(dir);
  if (recordItems(dir) && anyChange(changes)) {
    console.log('\n  Changed since the problem-material record was written:');
    for (const l of changeLines(changes)) console.log(`  ${l}`);
    console.log('\n  Tell the person what changed, in plain words, and ask them to run "SPOCK: add problem material", which asks them' +
      '\n  to confirm and takes every change in at once. Nothing is taken in until they do.');
  }
}

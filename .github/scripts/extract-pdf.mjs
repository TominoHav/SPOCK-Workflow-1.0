import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, statSync } from 'node:fs';
import { inflateSync, constants as Z } from 'node:zlib';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const LIMITS = { bytes: 50 * 1024 * 1024, pages: 500, badFile: 0.01, badPage: 0.05, scanLetters: 20, formDepth: 8 };

export class PdfRefusal extends Error {
  constructor(kind, reason) { super(reason); this.kind = kind; }
}
export const WORD_ROUTE = 'Open it in Word, save it as a Word document, and put that in the folder instead of the PDF.';

class Name { constructor(n) { this.n = n; } }
class Str { constructor(s) { this.s = s; } }
class Ref { constructor(num, gen) { this.num = num; this.gen = gen; } }
class Cmd { constructor(c) { this.c = c; } }
class Stream { constructor(dict, raw) { this.dict = dict; this.raw = raw; } }
const isName = (v, n) => v instanceof Name && (n === undefined || v.n === n);
const isDict = v => v instanceof Map;

const WS = new Set([0, 9, 10, 12, 13, 32]);
const DELIM = new Set([40, 41, 60, 62, 91, 93, 123, 125, 47, 37]);

class Lexer {
  constructor(s, pos = 0) { this.s = s; this.pos = pos; }
  skipWs() {
    const s = this.s;
    for (;;) {
      const c = s.charCodeAt(this.pos);
      if (WS.has(c)) { this.pos++; continue; }
      if (c === 37) { while (this.pos < s.length && s[this.pos] !== '\n' && s[this.pos] !== '\r') this.pos++; continue; }
      return;
    }
  }
  next() {
    this.skipWs();
    const s = this.s;
    if (this.pos >= s.length) return undefined;
    const ch = s[this.pos];
    if (ch === '[') { this.pos++; const a = []; for (;;) { this.skipWs(); if (s[this.pos] === ']') { this.pos++; return a; } if (this.pos >= s.length) throw new Error('unterminated array'); a.push(this.value()); } }
    if (ch === '<' && s[this.pos + 1] === '<') {
      this.pos += 2; const d = new Map();
      for (;;) {
        this.skipWs();
        if (s[this.pos] === '>' && s[this.pos + 1] === '>') { this.pos += 2; return d; }
        if (this.pos >= s.length) throw new Error('unterminated dictionary');
        const k = this.next();
        if (!(k instanceof Name)) { if (k === undefined) throw new Error('unterminated dictionary'); continue; }
        this.skipWs();
        if (s[this.pos] === '>' && s[this.pos + 1] === '>') { d.set(k.n, null); continue; }
        d.set(k.n, this.value());
      }
    }
    if (ch === '<') {
      const end = s.indexOf('>', this.pos);
      if (end < 0) throw new Error('unterminated hex string');
      let hex = s.slice(this.pos + 1, end).replace(/[^0-9A-Fa-f]/g, '');
      if (hex.length % 2) hex += '0';
      this.pos = end + 1;
      let out = '';
      for (let i = 0; i < hex.length; i += 2) out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
      return new Str(out);
    }
    if (ch === '(') return new Str(this.literal());
    if (ch === '/') {
      let i = this.pos + 1;
      while (i < s.length && !WS.has(s.charCodeAt(i)) && !DELIM.has(s.charCodeAt(i))) i++;
      const raw = s.slice(this.pos + 1, i); this.pos = i;
      return new Name(raw.replace(/#([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16))));
    }
    if (ch === ']' || ch === '>' || ch === ')' || ch === '{' || ch === '}') { this.pos++; return new Cmd(ch); }
    let i = this.pos;
    while (i < s.length && !WS.has(s.charCodeAt(i)) && !DELIM.has(s.charCodeAt(i))) i++;
    if (i === this.pos) { this.pos++; return new Cmd(ch); }
    const w = s.slice(this.pos, i); this.pos = i;
    if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(w)) return Number(w);
    if (/^[+-]?\d*\.?\d*[+-]\d*$/.test(w) || w === '-' || w === '.') return 0;
    if (w === 'true') return true;
    if (w === 'false') return false;
    if (w === 'null') return null;
    return new Cmd(w);
  }
  value() {
    const v = this.next();
    if (typeof v === 'number' && Number.isInteger(v) && v >= 0) {
      const save = this.pos;
      const g = this.next();
      if (typeof g === 'number' && Number.isInteger(g)) {
        const r = this.next();
        if (r instanceof Cmd && r.c === 'R') return new Ref(v, g);
      }
      this.pos = save;
    }
    return v;
  }
  literal() {
    const s = this.s; let depth = 0, out = '';
    this.pos++;
    while (this.pos < s.length) {
      const ch = s[this.pos++];
      if (ch === '(') { depth++; out += ch; continue; }
      if (ch === ')') { if (depth === 0) return out; depth--; out += ch; continue; }
      if (ch !== '\\') { out += ch; continue; }
      const e = s[this.pos++];
      if (e === 'n') out += '\n'; else if (e === 'r') out += '\r'; else if (e === 't') out += '\t';
      else if (e === 'b') out += '\b'; else if (e === 'f') out += '\f';
      else if (e === '\r') { if (s[this.pos] === '\n') this.pos++; }
      else if (e === '\n') {  }
      else if (e >= '0' && e <= '7') {
        let oct = e;
        while (oct.length < 3 && s[this.pos] >= '0' && s[this.pos] <= '7') oct += s[this.pos++];
        out += String.fromCharCode(parseInt(oct, 8) & 0xff);
      } else out += e;
    }
    return out;
  }
}

const bytesOf = str => Buffer.from(str, 'latin1');
const strOf = buf => buf.toString('latin1');

function inflate(buf) {
  try { return inflateSync(buf); } catch {  }
  try { return inflateSync(buf, { finishFlush: Z.Z_SYNC_FLUSH }); } catch { return null; }
}

export function lzwDecode(buf, early = 1) {
  const out = [];
  let dict = [], width = 9, bits = 0, acc = 0, prev = null;
  const reset = () => { dict = []; for (let i = 0; i < 256; i++) dict.push([i]); dict.push(null, null); width = 9; prev = null; };
  reset();
  for (let i = 0; i < buf.length; i++) {
    acc = (acc << 8) | buf[i]; bits += 8;
    while (bits >= width) {
      const code = (acc >>> (bits - width)) & ((1 << width) - 1);
      bits -= width; acc &= (1 << bits) - 1;
      if (code === 256) { reset(); continue; }
      if (code === 257) return Buffer.from(out);
      let entry;
      if (code < dict.length && dict[code]) entry = dict[code];
      else if (code === dict.length && prev) entry = [...prev, prev[0]];
      else return Buffer.from(out);
      for (const b of entry) out.push(b);
      if (prev) dict.push([...prev, entry[0]]);
      prev = entry;
      const size = dict.length + early;
      if (size >= (1 << width) && width < 12) width++;
    }
  }
  return Buffer.from(out);
}

function asciiHex(buf) {
  const hex = strOf(buf).split('>')[0].replace(/[^0-9A-Fa-f]/g, '');
  const h = hex.length % 2 ? hex + '0' : hex;
  return Buffer.from(h, 'hex');
}
function ascii85(buf) {
  let s = strOf(buf).replace(/\s+/g, '');
  if (s.startsWith('<~')) s = s.slice(2);
  const end = s.indexOf('~>'); if (end >= 0) s = s.slice(0, end);
  const out = []; let group = [];
  for (const ch of s) {
    if (ch === 'z' && group.length === 0) { out.push(0, 0, 0, 0); continue; }
    const c = ch.charCodeAt(0) - 33; if (c < 0 || c > 84) continue;
    group.push(c);
    if (group.length === 5) {
      let v = 0; for (const g of group) v = v * 85 + g;
      out.push((v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255); group = [];
    }
  }
  if (group.length) {
    const n = group.length; while (group.length < 5) group.push(84);
    let v = 0; for (const g of group) v = v * 85 + g;
    const b = [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255];
    out.push(...b.slice(0, n - 1));
  }
  return Buffer.from(out);
}
function runLength(buf) {
  const out = [];
  for (let i = 0; i < buf.length;) {
    const n = buf[i++];
    if (n === 128) break;
    if (n < 128) { for (let k = 0; k <= n && i < buf.length; k++) out.push(buf[i++]); }
    else { const b = buf[i++]; for (let k = 0; k < 257 - n; k++) out.push(b); }
  }
  return Buffer.from(out);
}
function unpredict(buf, parms) {
  const p = parms && isDict(parms) ? parms : null;
  const pred = p ? Number(p.get('Predictor') || 1) : 1;
  if (pred < 2) return buf;
  const colors = Number(p.get('Colors') || 1), bpc = Number(p.get('BitsPerComponent') || 8), cols = Number(p.get('Columns') || 1);
  const bpp = Math.max(1, Math.ceil(colors * bpc / 8)), row = Math.ceil(colors * bpc * cols / 8);
  if (pred === 2) {
    const out = Buffer.from(buf);
    if (bpc === 8) for (let r = 0; r + row <= out.length; r += row) for (let i = bpp; i < row; i++) out[r + i] = (out[r + i] + out[r + i - bpp]) & 255;
    return out;
  }
  const out = []; let prev = new Uint8Array(row);
  for (let i = 0; i + row < buf.length + 1 && i < buf.length; i += row + 1) {
    const type = buf[i], cur = new Uint8Array(row);
    for (let k = 0; k < row; k++) {
      const x = buf[i + 1 + k] || 0, a = k >= bpp ? cur[k - bpp] : 0, b = prev[k], c = k >= bpp ? prev[k - bpp] : 0;
      let v = x;
      if (type === 1) v = x + a; else if (type === 2) v = x + b; else if (type === 3) v = x + ((a + b) >> 1);
      else if (type === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); }
      cur[k] = v & 255;
    }
    out.push(...cur); prev = cur;
  }
  return Buffer.from(out);
}
const IMAGE_FILTERS = new Set(['DCTDecode', 'DCT', 'JPXDecode', 'CCITTFaxDecode', 'CCF', 'JBIG2Decode']);

const GLYPHS = (() => {
  const g = {
    space: ' ', exclam: '!', quotedbl: '"', numbersign: '#', dollar: '$', percent: '%', ampersand: '&', quotesingle: "'",
    quoteright: '’', parenleft: '(', parenright: ')', asterisk: '*', plus: '+', comma: ',', hyphen: '-', period: '.',
    slash: '/', zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9',
    colon: ':', semicolon: ';', less: '<', equal: '=', greater: '>', question: '?', at: '@', bracketleft: '[',
    backslash: '\\', bracketright: ']', asciicircum: '^', underscore: '_', grave: '`', quoteleft: '‘', braceleft: '{',
    bar: '|', braceright: '}', asciitilde: '~', exclamdown: '¡', cent: '¢', sterling: '£', currency: '¤', yen: '¥',
    brokenbar: '¦', section: '§', dieresis: '¨', copyright: '©', ordfeminine: 'ª', guillemotleft: '«', guillemetleft: '«',
    logicalnot: '¬', registered: '®', macron: '¯', degree: '°', plusminus: '±', twosuperior: '²', threesuperior: '³',
    acute: '´', mu: 'µ', paragraph: '¶', periodcentered: '·', cedilla: '¸', onesuperior: '¹', ordmasculine: 'º',
    guillemotright: '»', guillemetright: '»', onequarter: '¼', onehalf: '½', threequarters: '¾', questiondown: '¿',
    multiply: '×', divide: '÷', germandbls: 'ß', Euro: '€', euro: '€', bullet: '•', ellipsis: '…', endash: '–', emdash: '—',
    quotedblleft: '“', quotedblright: '”', quotedblbase: '„', quotesinglbase: '‚', dagger: '†', daggerdbl: '‡',
    perthousand: '‰', trademark: '™', florin: 'ƒ', circumflex: 'ˆ', tilde: '˜', caron: 'ˇ', breve: '˘', dotaccent: '˙',
    ring: '˚', ogonek: '˛', hungarumlaut: '˝', fi: 'fi', fl: 'fl', ff: 'ff', ffi: 'ffi', ffl: 'ffl', minus: '−',
    nbspace: ' ', nonbreakingspace: ' ', sfthyphen: '­', softhyphen: '­', fraction: '⁄',
    guilsinglleft: '‹', guilsinglright: '›', dotlessi: 'ı', lslash: 'ł', Lslash: 'Ł', oe: 'œ', OE: 'Œ', ae: 'æ', AE: 'Æ',
    oslash: 'ø', Oslash: 'Ø', eth: 'ð', Eth: 'Ð', thorn: 'þ', Thorn: 'Þ', ydieresis: 'ÿ', Ydieresis: 'Ÿ', notequal: '≠',
    lessequal: '≤', greaterequal: '≥', infinity: '∞', arrowright: '→', arrowleft: '←', checkmark: '✓', numero: '№',
  };
  for (let c = 65; c <= 90; c++) { g[String.fromCharCode(c)] = String.fromCharCode(c); g[String.fromCharCode(c + 32)] = String.fromCharCode(c + 32); }
  const accents = { acute: '́', grave: '̀', circumflex: '̂', dieresis: '̈', tilde: '̃', ring: '̊',
    caron: '̌', cedilla: '̧', ogonek: '̨', dotaccent: '̇', breve: '̆', macron: '̄', hungarumlaut: '̋' };
  for (const base of 'AaCcDdEeGgHhIiJjKkLlNnOoRrSsTtUuWwYyZz') for (const [an, comb] of Object.entries(accents)) {
    const ch = (base + comb).normalize('NFC');
    if (ch.length === 1) g[base + an] = ch;
  }
  Object.assign(g, { Dcroat: 'Đ', dcroat: 'đ', Ccedilla: 'Ç', ccedilla: 'ç', lcaron: 'ľ', Lcaron: 'Ľ', tcaron: 'ť', Tcaron: 'Ť',
    dcaron: 'ď', Dcaron: 'Ď', uring: 'ů', Uring: 'Ů', lacute: 'ĺ', Lacute: 'Ĺ', racute: 'ŕ', Racute: 'Ŕ' });
  return g;
})();
export function glyphToUnicode(name) {
  if (name in GLYPHS) return GLYPHS[name];
  const base = name.split('.')[0].split('_')[0];
  if (base !== name && base in GLYPHS) return GLYPHS[base];
  let m = /^uni([0-9A-Fa-f]{4})+$/.exec(base);
  if (m) return base.slice(3).match(/.{4}/g).map(h => String.fromCharCode(parseInt(h, 16))).join('');
  m = /^u([0-9A-Fa-f]{4,6})$/.exec(base);
  if (m) { const cp = parseInt(m[1], 16); if (cp <= 0x10ffff) return String.fromCodePoint(cp); }
  return null;
}
const decoderOf = label => { try { return new TextDecoder(label); } catch { return null; } };
const tableOf = label => {
  const d = decoderOf(label), t = new Array(256).fill(null);
  if (!d) return t;
  for (let i = 32; i < 256; i++) { const ch = d.decode(Uint8Array.of(i)); if (ch && ch !== '�') t[i] = ch; }
  return t;
};
const WIN_ANSI = (() => { const t = tableOf('windows-1252'); t[0x7f] = null; for (const i of [0x81, 0x8d, 0x8f, 0x90, 0x9d]) t[i] = null; t[0xa0] = ' '; t[0xad] = '-'; return t; })();
const MAC_ROMAN = tableOf('macintosh');
const STANDARD = (() => {
  const t = new Array(256).fill(null);
  for (let i = 32; i < 127; i++) t[i] = String.fromCharCode(i);
  t[0x27] = '’'; t[0x60] = '‘';
  const hi = { 0xa1: '¡', 0xa2: '¢', 0xa3: '£', 0xa4: '⁄', 0xa5: '¥', 0xa6: 'ƒ', 0xa7: '§', 0xa8: '¤', 0xa9: "'", 0xaa: '“', 0xab: '«',
    0xac: '‹', 0xad: '›', 0xae: 'fi', 0xaf: 'fl', 0xb1: '–', 0xb2: '†', 0xb3: '‡', 0xb4: '·', 0xb6: '¶', 0xb7: '•', 0xb8: '‚',
    0xb9: '„', 0xba: '”', 0xbb: '»', 0xbc: '…', 0xbd: '‰', 0xbf: '¿', 0xc1: '`', 0xc2: '´', 0xc3: 'ˆ', 0xc4: '˜', 0xc5: '¯',
    0xc6: '˘', 0xc7: '˙', 0xc8: '¨', 0xca: '˚', 0xcb: '¸', 0xcd: '˝', 0xce: '˛', 0xcf: 'ˇ', 0xd0: '—', 0xe1: 'Æ', 0xe3: 'ª',
    0xe8: 'Ł', 0xe9: 'Ø', 0xea: 'Œ', 0xeb: 'º', 0xf1: 'æ', 0xf5: 'ı', 0xf8: 'ł', 0xf9: 'ø', 0xfa: 'œ', 0xfb: 'ß' };
  for (const [k, v] of Object.entries(hi)) t[Number(k)] = v;
  return t;
})();
const BASE_ENCODINGS = { WinAnsiEncoding: WIN_ANSI, MacRomanEncoding: MAC_ROMAN, StandardEncoding: STANDARD, PDFDocEncoding: WIN_ANSI };

export function parseToUnicode(text) {
  const map = new Map(), lengths = new Set();
  const hexStr = h => { let out = ''; const b = h.replace(/\s+/g, ''); for (let i = 0; i + 4 <= b.length; i += 4) out += String.fromCharCode(parseInt(b.slice(i, i + 4), 16)); if (b.length % 4 === 2) out += String.fromCharCode(parseInt(b.slice(-2), 16)); return out; };
  for (const m of text.matchAll(/begincodespacerange([\s\S]*?)endcodespacerange/g))
    for (const r of m[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) lengths.add(r[1].length / 2);
  for (const m of text.matchAll(/beginbfchar([\s\S]*?)endbfchar/g))
    for (const r of m[1].matchAll(/<([0-9A-Fa-f\s]+)>\s*<([0-9A-Fa-f\s]*)>/g)) {
      const src = r[1].replace(/\s+/g, '');
      map.set(`${src.length / 2}:${parseInt(src, 16)}`, hexStr(r[2]));
    }
  for (const m of text.matchAll(/beginbfrange([\s\S]*?)endbfrange/g))
    for (const r of m[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*(?:<([0-9A-Fa-f\s]*)>|\[([^\]]*)\])/g)) {
      const n = r[1].length / 2, lo = parseInt(r[1], 16), hi = parseInt(r[2], 16);
      if (hi - lo > 65535) continue;
      if (r[4] !== undefined) {
        const dsts = [...r[4].matchAll(/<([0-9A-Fa-f\s]*)>/g)].map(x => hexStr(x[1]));
        for (let c = lo; c <= hi && c - lo < dsts.length; c++) map.set(`${n}:${c}`, dsts[c - lo]);
      } else {
        const base = hexStr(r[3]);
        for (let c = lo; c <= hi; c++) {
          const last = base.charCodeAt(base.length - 1) + (c - lo);
          map.set(`${n}:${c}`, base.slice(0, -1) + String.fromCharCode(last & 0xffff));
        }
      }
    }
  return { map, lengths };
}

class Doc {
  constructor(buf) {
    this.buf = buf; this.s = strOf(buf); this.xref = new Map(); this.cache = new Map(); this.trailer = new Map();
    this.readXref();
  }
  readXref() {
    const s = this.s;
    const at = s.lastIndexOf('startxref');
    const seen = new Set();
    let off = at >= 0 ? parseInt(s.slice(at + 9, at + 40).trim(), 10) : NaN;
    let ok = false;
    try {
      while (Number.isFinite(off) && !seen.has(off) && off >= 0 && off < s.length) {
        seen.add(off);
        const trailer = this.readSection(off);
        if (!trailer) break;
        ok = true;
        for (const [k, v] of trailer) if (!this.trailer.has(k)) this.trailer.set(k, v);
        const xs = trailer.get('XRefStm');
        if (typeof xs === 'number' && !seen.has(xs)) { seen.add(xs); try { this.readSection(xs); } catch {  } }
        const prev = trailer.get('Prev');
        off = typeof prev === 'number' ? prev : NaN;
      }
    } catch { ok = false; }
    if (!ok || !this.trailer.get('Root')) this.reconstruct();
  }
  readSection(off) {
    const s = this.s;
    const lx = new Lexer(s, off); lx.skipWs();
    if (s.startsWith('xref', lx.pos)) {
      lx.pos += 4;
      for (;;) {
        lx.skipWs();
        if (s.startsWith('trailer', lx.pos)) { lx.pos += 7; const t = lx.value(); return isDict(t) ? t : null; }
        const start = lx.next(), count = lx.next();
        if (typeof start !== 'number' || typeof count !== 'number') return null;
        for (let i = 0; i < count; i++) {
          lx.skipWs();
          const m = /^(\d{1,10})\s+(\d{1,5})\s+([nf])/.exec(s.slice(lx.pos, lx.pos + 24));
          if (!m) return null;
          lx.pos += m[0].length;
          const num = start + i;
          if (!this.xref.has(num)) this.xref.set(num, m[3] === 'n' ? { type: 1, off: Number(m[1]), gen: Number(m[2]) } : { type: 0 });
        }
      }
    }
    const obj = this.parseAt(off);
    if (!(obj instanceof Stream) || !isName(obj.dict.get('Type'), 'XRef')) return null;
    const data = this.decode(obj);
    const W = (obj.dict.get('W') || []).map(Number);
    const size = Number(obj.dict.get('Size') || 0);
    const index = obj.dict.get('Index') || [0, size];
    const rec = W.reduce((a, b) => a + b, 0);
    let p = 0;
    const field = (w, dflt) => { if (!w) return dflt; let v = 0; for (let k = 0; k < w; k++) v = v * 256 + data[p++]; return v; };
    for (let i = 0; i + 1 < index.length; i += 2) {
      for (let k = 0; k < index[i + 1] && p + rec <= data.length; k++) {
        const t = field(W[0], 1), a = field(W[1], 0), b = field(W[2], 0), num = index[i] + k;
        if (this.xref.has(num)) continue;
        if (t === 1) this.xref.set(num, { type: 1, off: a, gen: b });
        else if (t === 2) this.xref.set(num, { type: 2, stm: a, idx: b });
        else this.xref.set(num, { type: 0 });
      }
    }
    return obj.dict;
  }
  reconstruct() {
    const s = this.s;
    for (const m of s.matchAll(/(?:^|[\r\n\s])(\d+)\s+(\d+)\s+obj\b/g)) {
      const off = m.index + m[0].length - m[0].trimStart().length;
      this.xref.set(Number(m[1]), { type: 1, off, gen: Number(m[2]) });
    }
    for (const m of s.matchAll(/trailer\s*<</g)) {
      try { const t = new Lexer(s, m.index + 7).value(); if (isDict(t)) for (const [k, v] of t) this.trailer.set(k, v); } catch {  }
    }
    if (!this.trailer.get('Root')) {
      for (const [num] of this.xref) {
        const o = this.get(new Ref(num, 0));
        if (isDict(o) && isName(o.get('Type'), 'Catalog')) { this.trailer.set('Root', new Ref(num, 0)); break; }
        if (o instanceof Stream && isName(o.dict.get('Type'), 'XRef') && o.dict.get('Root')) { for (const [k, v] of o.dict) this.trailer.set(k, v); break; }
      }
    }
  }
  parseAt(off) {
    const lx = new Lexer(this.s, off);
    const n = lx.next(), g = lx.next(), kw = lx.next();
    if (typeof n !== 'number' || typeof g !== 'number' || !(kw instanceof Cmd && kw.c === 'obj')) throw new Error(`no object at ${off}`);
    const v = lx.value();
    lx.skipWs();
    if (isDict(v) && this.s.startsWith('stream', lx.pos)) {
      let start = lx.pos + 6;
      if (this.s[start] === '\r') start++;
      if (this.s[start] === '\n') start++;
      let len = v.get('Length');
      if (len instanceof Ref) len = this.get(len);
      let end = typeof len === 'number' ? start + len : -1;
      const tail = end >= 0 ? this.s.slice(end, end + 30) : '';
      if (end < 0 || end > this.s.length || !/^\s*endstream/.test(tail)) {
        const e = this.s.indexOf('endstream', start);
        end = e < 0 ? this.s.length : e;
        while (end > start && (this.s[end - 1] === '\n' || this.s[end - 1] === '\r')) end--;
      }
      return new Stream(v, this.buf.subarray(start, end));
    }
    return v;
  }
  get(v, depth = 0) {
    if (!(v instanceof Ref)) return v;
    if (depth > 32) return null;
    if (this.cache.has(v.num)) return this.cache.get(v.num);
    this.cache.set(v.num, null);
    const e = this.xref.get(v.num);
    let o = null;
    try {
      if (e && e.type === 1) o = this.parseAt(e.off);
      else if (e && e.type === 2) o = this.fromObjStm(e.stm, e.idx, v.num);
    } catch { o = null; }
    if (o instanceof Ref) o = this.get(o, depth + 1);
    this.cache.set(v.num, o);
    return o;
  }
  fromObjStm(stmNum, idx, num) {
    const key = `stm:${stmNum}`;
    let parsed = this.cache.get(key);
    if (!parsed) {
      const stm = this.get(new Ref(stmNum, 0));
      if (!(stm instanceof Stream)) return null;
      const data = strOf(this.decode(stm));
      const n = Number(stm.dict.get('N') || 0), first = Number(stm.dict.get('First') || 0);
      const head = new Lexer(data, 0), offsets = [];
      for (let i = 0; i < n; i++) { const on = head.next(), oo = head.next(); offsets.push([on, oo]); }
      parsed = { data, first, offsets };
      this.cache.set(key, parsed);
    }
    let pair = parsed.offsets[idx];
    if (!pair || pair[0] !== num) pair = parsed.offsets.find(p => p[0] === num);
    if (!pair) return null;
    return new Lexer(parsed.data, parsed.first + pair[1]).value();
  }
  decode(stm) {
    let data = stm.raw;
    let filters = this.get(stm.dict.get('Filter') ?? stm.dict.get('F'));
    let parms = this.get(stm.dict.get('DecodeParms') ?? stm.dict.get('DP'));
    if (!filters) return data;
    if (!Array.isArray(filters)) { filters = [filters]; parms = [parms]; }
    if (!Array.isArray(parms)) parms = [parms];
    for (let i = 0; i < filters.length; i++) {
      const f = this.get(filters[i]); const p = this.get(parms[i]);
      const name = f instanceof Name ? f.n : '';
      if (IMAGE_FILTERS.has(name)) return null;
      if (name === 'FlateDecode' || name === 'Fl') { data = inflate(data); if (!data) return null; data = unpredict(data, p); }
      else if (name === 'LZWDecode' || name === 'LZW') { data = lzwDecode(data, p && isDict(p) && p.has('EarlyChange') ? Number(p.get('EarlyChange')) : 1); data = unpredict(data, p); }
      else if (name === 'ASCIIHexDecode' || name === 'AHx') data = asciiHex(data);
      else if (name === 'ASCII85Decode' || name === 'A85') data = ascii85(data);
      else if (name === 'RunLengthDecode' || name === 'RL') data = runLength(data);
      else if (name === 'Crypt') continue;
      else return null;
    }
    return data;
  }
  dict(v) { const o = this.get(v); return isDict(o) ? o : o instanceof Stream ? o.dict : null; }
}

function loadFont(doc, fontRef) {
  const f = doc.dict(fontRef);
  const font = { bytes: 1, lengths: null, toUni: null, enc: null, widths: new Map(), dw: 0, scale: 0.001, type3: false, known: true };
  if (!f) { font.known = false; return font; }
  const sub = f.get('Subtype') instanceof Name ? f.get('Subtype').n : '';
  const tu = doc.get(f.get('ToUnicode'));
  if (tu instanceof Stream) { const d = doc.decode(tu); if (d) font.toUni = parseToUnicode(strOf(d)); }
  if (sub === 'Type0') {
    font.bytes = 2;
    const enc = doc.get(f.get('Encoding'));
    if (enc instanceof Stream) {
      const d = doc.decode(enc);
      if (d) { const cm = parseToUnicode(strOf(d)); if (cm.lengths.size) font.lengths = [...cm.lengths].sort((a, b) => a - b); }
    }
    const desc = doc.get((doc.get(f.get('DescendantFonts')) || [])[0]);
    const dd = doc.dict(desc);
    if (dd) {
      font.dw = Number(doc.get(dd.get('DW')) ?? 1000);
      const W = doc.get(dd.get('W')) || [];
      for (let i = 0; i < W.length;) {
        const a = doc.get(W[i]), b = doc.get(W[i + 1]);
        if (Array.isArray(b)) { b.forEach((w, k) => font.widths.set(a + k, Number(doc.get(w)) || 0)); i += 2; }
        else { const w = Number(doc.get(W[i + 2])) || 0; for (let c = a; c <= b && c - a < 65536; c++) font.widths.set(c, w); i += 3; }
      }
    } else font.dw = 1000;
    return font;
  }
  if (sub === 'Type3') {
    font.type3 = true;
    const fm = doc.get(f.get('FontMatrix'));
    if (Array.isArray(fm)) font.scale = Math.abs(Number(fm[0])) || 0.001;
  }
  const first = Number(doc.get(f.get('FirstChar')) || 0);
  const W = doc.get(f.get('Widths'));
  if (Array.isArray(W)) W.forEach((w, k) => font.widths.set(first + k, Number(doc.get(w)) || 0));
  const fd = doc.dict(f.get('FontDescriptor'));
  font.dw = fd ? Number(doc.get(fd.get('MissingWidth')) || 0) : 0;
  if (!font.dw) font.dw = font.type3 ? 0 : 500;
  const flags = fd ? Number(doc.get(fd.get('Flags')) || 0) : 0;
  const baseName = (f.get('BaseFont') instanceof Name ? f.get('BaseFont').n : '').replace(/^[A-Z]{6}\+/, '');
  const symbolic = /^(Symbol|ZapfDingbats)/.test(baseName) || ((flags & 4) && !(flags & 32));
  let table = sub === 'TrueType' ? WIN_ANSI : STANDARD;
  const enc = doc.get(f.get('Encoding'));
  const diffs = new Map();
  if (enc instanceof Name) table = BASE_ENCODINGS[enc.n] || table;
  else if (isDict(enc)) {
    const be = doc.get(enc.get('BaseEncoding'));
    if (be instanceof Name) table = BASE_ENCODINGS[be.n] || table;
    const D = doc.get(enc.get('Differences')) || [];
    let code = 0;
    for (const d of D) { const v = doc.get(d); if (typeof v === 'number') code = v; else if (v instanceof Name) diffs.set(code++, v.n); }
  } else if (symbolic && !font.toUni) table = null;
  font.enc = code => {
    if (diffs.has(code)) return glyphToUnicode(diffs.get(code));
    return table ? table[code] : null;
  };
  return font;
}

function showCodes(font, str) {
  const out = [];
  let i = 0;
  while (i < str.length) {
    let n = font.bytes;
    if (font.lengths) {
      n = font.lengths[font.lengths.length - 1];
      for (const L of font.lengths) { const code = codeOf(str, i, L); if (font.toUni && font.toUni.map.has(`${L}:${code}`)) { n = L; break; } }
    }
    if (i + n > str.length) n = str.length - i;
    const code = codeOf(str, i, n);
    i += n;
    let text = null;
    if (font.toUni) {
      text = font.toUni.map.get(`${n}:${code}`);
      if (text === undefined && n === 2) text = font.toUni.map.get(`1:${code}`);
      if (text === undefined) text = null;
    }
    if (text === null && font.bytes === 1 && font.enc) text = font.enc(code);
    const w = font.widths.has(code) ? font.widths.get(code) : font.dw;
    out.push({ code, text, w: w * font.scale, space: n === 1 && code === 32 });
  }
  return out;
}
const codeOf = (s, i, n) => { let c = 0; for (let k = 0; k < n; k++) c = c * 256 + (s.charCodeAt(i + k) & 255); return c; };

const mul = (m, n) => [m[0] * n[0] + m[1] * n[2], m[0] * n[1] + m[1] * n[3], m[2] * n[0] + m[3] * n[2], m[2] * n[1] + m[3] * n[3],
  m[4] * n[0] + m[5] * n[2] + n[4], m[4] * n[1] + m[5] * n[3] + n[5]];

function pageText(doc, page, resources) {
  const lines = []; let line = '';
  const st = { good: 0, bad: 0, images: 0 };
  let last = null;
  const fonts = new Map();
  const put = (text, x, y, size, advanceEnd) => {
    if (last) {
      const dy = Math.abs(y - last.y), unit = Math.max(1, Math.min(size, last.size));
      if (dy > unit * 0.5) { lines.push(line); line = ''; }
      else {
        const gap = x - last.x;
        if ((gap > unit * 0.15 || gap < -unit * 1.0) && line && !/\s$/.test(line) && !/^\s/.test(text)) line += ' ';
      }
    }
    line += text;
    last = { x: advanceEnd, y, size };
  };
  const run = (content, res, ctm0, depth) => {
    const gs = { ctm: ctm0, font: null, size: 0, tc: 0, tw: 0, th: 1, tl: 0, rise: 0 };
    const stack = [];
    let tm = [1, 0, 0, 1, 0, 0], tlm = [1, 0, 0, 1, 0, 0];
    const fontOf = name => {
      const fd = res && doc.dict(res.get('Font'));
      const ref = fd ? fd.get(name) : null;
      const key = ref instanceof Ref ? `r${ref.num}` : `n${name}:${depth}`;
      if (!fonts.has(key)) fonts.set(key, loadFont(doc, ref));
      return fonts.get(key);
    };
    const show = str => {
      const font = gs.font; if (!font) return;
      for (const g of showCodes(font, str)) {
        const trm = mul([gs.size * gs.th, 0, 0, gs.size, 0, gs.rise], mul(tm, gs.ctm));
        const size = Math.hypot(trm[2], trm[3]) || Math.abs(gs.size);
        const x = trm[4], y = trm[5];
        const tx = (g.w * gs.size + gs.tc + (g.space ? gs.tw : 0)) * gs.th;
        tm = mul([1, 0, 0, 1, tx, 0], tm);
        const end = mul([gs.size * gs.th, 0, 0, gs.size, 0, gs.rise], mul(tm, gs.ctm));
        let text = g.text;
        if (text === null || text === undefined) { st.bad++; text = '�'; }
        else {
          for (const ch of text) {
            const c = ch.codePointAt(0);
            if (ch === '�' || (c < 32 && ch !== '\t') || (c >= 0x7f && c < 0xa0) || (c >= 0xe000 && c <= 0xf8ff)) st.bad++;
            else if (/\S/.test(ch)) st.good++;
          }
        }
        put(text, x, y, size, end[4]);
      }
    };
    const lx = new Lexer(content, 0);
    const ops = [];
    for (;;) {
      let t;
      try { t = lx.next(); } catch { break; }
      if (t === undefined) break;
      if (!(t instanceof Cmd)) { ops.push(t); continue; }
      const op = t.c; const a = ops.splice(0);
      const n = i => Number(a[i]) || 0;
      switch (op) {
        case 'q': stack.push({ ...gs }); break;
        case 'Q': if (stack.length) Object.assign(gs, stack.pop()); break;
        case 'cm': gs.ctm = mul(a.slice(0, 6).map(Number), gs.ctm); break;
        case 'BT': tm = [1, 0, 0, 1, 0, 0]; tlm = [1, 0, 0, 1, 0, 0]; break;
        case 'ET': break;
        case 'Tf': gs.font = a[0] instanceof Name ? fontOf(a[0].n) : null; gs.size = n(1); break;
        case 'Tc': gs.tc = n(0); break;
        case 'Tw': gs.tw = n(0); break;
        case 'Tz': gs.th = n(0) / 100; break;
        case 'TL': gs.tl = n(0); break;
        case 'Ts': gs.rise = n(0); break;
        case 'Td': tlm = mul([1, 0, 0, 1, n(0), n(1)], tlm); tm = tlm.slice(); break;
        case 'TD': gs.tl = -n(1); tlm = mul([1, 0, 0, 1, n(0), n(1)], tlm); tm = tlm.slice(); break;
        case 'Tm': tlm = a.slice(0, 6).map(Number); tm = tlm.slice(); break;
        case 'T*': tlm = mul([1, 0, 0, 1, 0, -gs.tl], tlm); tm = tlm.slice(); break;
        case 'Tj': if (a[0] instanceof Str) show(a[0].s); break;
        case "'": tlm = mul([1, 0, 0, 1, 0, -gs.tl], tlm); tm = tlm.slice(); if (a[0] instanceof Str) show(a[0].s); break;
        case '"': gs.tw = n(0); gs.tc = n(1); tlm = mul([1, 0, 0, 1, 0, -gs.tl], tlm); tm = tlm.slice(); if (a[2] instanceof Str) show(a[2].s); break;
        case 'TJ':
          for (const el of (Array.isArray(a[0]) ? a[0] : [])) {
            if (el instanceof Str) show(el.s);
            else if (typeof el === 'number') {
              tm = mul([1, 0, 0, 1, -el / 1000 * gs.size * gs.th, 0], tm);
              if (el < -200 && line && !/\s$/.test(line)) line += ' ';
            }
          }
          break;
        case 'BI': {
          const idAt = content.indexOf('ID', lx.pos);
          const ei = idAt < 0 ? -1 : content.slice(idAt + 3).search(/\sEI(\s|$)/);
          lx.pos = ei < 0 ? content.length : idAt + 3 + ei + 3;
          st.images++;
          break;
        }
        case 'Do': {
          const xo = res && doc.dict(res.get('XObject'));
          const x = xo ? doc.get(xo.get(a[0] instanceof Name ? a[0].n : '')) : null;
          if (!(x instanceof Stream)) break;
          const sub = x.dict.get('Subtype');
          if (isName(sub, 'Image')) { st.images++; break; }
          if (isName(sub, 'Form') && depth < LIMITS.formDepth) {
            const data = doc.decode(x);
            if (!data) break;
            const m = doc.get(x.dict.get('Matrix'));
            const ctm = Array.isArray(m) && m.length === 6 ? mul(m.map(Number), gs.ctm) : gs.ctm;
            const xres = doc.dict(x.dict.get('Resources')) || res;
            run(strOf(data), xres, ctm, depth + 1);
          }
          break;
        }
        default: break;
      }
    }
  };
  let contents = doc.get(page.get('Contents'));
  if (!Array.isArray(contents)) contents = contents ? [contents] : [];
  const parts = [];
  for (const c of contents) { const s = doc.get(c); if (s instanceof Stream) { const d = doc.decode(s); if (d) parts.push(strOf(d)); } }
  run(parts.join('\n'), resources, [1, 0, 0, 1, 0, 0], 0);
  lines.push(line);
  const text = lines.map(l => l.replace(/[ﬀ-ﬆ]/g, c => c.normalize('NFKC')).replace(/[ \t ]+/g, ' ').trim())
    .filter(Boolean).join('\n');
  return { text, ...st };
}

function pagesOf(doc) {
  const root = doc.dict(doc.trailer.get('Root'));
  if (!root) throw new PdfRefusal('unreadable', 'its structure could not be read: no document catalogue was found');
  const out = [], seen = new Set();
  const walk = (ref, inherited, depth) => {
    if (depth > 64) return;
    if (ref instanceof Ref) { if (seen.has(ref.num)) return; seen.add(ref.num); }
    const node = doc.dict(ref);
    if (!node) return;
    const res = node.has('Resources') ? doc.dict(node.get('Resources')) : inherited;
    const kids = doc.get(node.get('Kids'));
    if (Array.isArray(kids) && !isName(node.get('Type'), 'Page')) { for (const k of kids) { walk(k, res, depth + 1); if (out.length > LIMITS.pages) return; } }
    else out.push({ page: node, resources: res });
  };
  walk(root.get('Pages'), null, 0);
  return out;
}

export function extractPdf(path) {
  let size;
  try { size = statSync(path).size; } catch (e) { throw new PdfRefusal('unreadable', `it could not be opened: ${e.message}`); }
  if (size > LIMITS.bytes) throw new PdfRefusal('too_large', `it is ${Math.round(size / 1048576)} MB, and a PDF over ${LIMITS.bytes / 1048576} MB is not read here`);
  const buf = readFileSync(path);
  if (!/%PDF-\d/.test(strOf(buf.subarray(0, 1024)))) throw new PdfRefusal('unreadable', 'it is not a PDF: the file does not start the way a PDF does');
  let doc;
  try { doc = new Doc(buf); } catch (e) { throw new PdfRefusal('unreadable', `its structure could not be read (${e.message})`); }
  if (doc.trailer.has('Encrypt') && doc.trailer.get('Encrypt') !== null)
    throw new PdfRefusal('protected', 'it is copy-protected (encrypted), and a protected PDF is not read here');
  let pages;
  try { pages = pagesOf(doc); } catch (e) { if (e instanceof PdfRefusal) throw e; throw new PdfRefusal('unreadable', `its pages could not be read (${e.message})`); }
  if (!pages.length) throw new PdfRefusal('unreadable', 'its structure could not be read: it lists no pages');
  if (pages.length > LIMITS.pages) throw new PdfRefusal('too_large', `it has more than ${LIMITS.pages} pages, and a PDF that long is not read here`);
  const read = pages.map(({ page, resources }) => {
    try { return pageText(doc, page, resources); } catch (e) { return { text: '', good: 0, bad: 1, images: 0, error: e.message }; }
  });
  const good = read.reduce((n, p) => n + p.good, 0), bad = read.reduce((n, p) => n + p.bad, 0), images = read.reduce((n, p) => n + p.images, 0);
  if (good === 0 && bad === 0) throw new PdfRefusal('scanned', images ? 'it holds images of pages and no text: it looks scanned' : 'no page in it holds any text');
  if (good / read.length < LIMITS.scanLetters && images >= read.length && bad === 0)
    throw new PdfRefusal('scanned', `it holds images of pages and almost no text (${good} letter(s) over ${read.length} page(s)): it looks scanned`);
  const badPages = read.map((p, i) => ({ i: i + 1, share: p.bad / Math.max(1, p.bad + p.good), bad: p.bad }))
    .filter(p => p.bad && p.share > LIMITS.badPage).map(p => p.i);
  if (bad / Math.max(1, good + bad) > LIMITS.badFile || badPages.length)
    throw new PdfRefusal('undecodable', `its letters could not be decoded on ${badPages.length ? `page(s) ${badPages.join(', ')}` : 'too many pages'} ` +
      `(${bad} of ${good + bad} letters unknown), so what it says cannot be read reliably`);
  return { pages: read.map(p => p.text) };
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  if (!process.argv[2]) { console.error('usage: node .github/scripts/extract-pdf.mjs <file.pdf>'); process.exit(2); }
  try {
    const { pages } = extractPdf(process.argv[2]);
    console.log(pages.map((t, i) => `## Page ${i + 1}\n\n${t}`).join('\n\n'));
  } catch (e) {
    if (!(e instanceof PdfRefusal)) throw e;
    console.log(`refused (${e.kind}): ${e.message}. ${WORD_ROUTE}`);
    process.exit(1);
  }
}

#!/usr/bin/env node

import { readFileSync } from 'node:fs';

export class YamlError extends Error {}

export const workflowText = path => String(readFileSync(path, 'utf8')).replace(/^﻿/, '').replace(/\r\n?/g, '\n');

const SCALARS = { true: true, false: false, null: null, '~': null, '[]': [], '{}': {} };

const ESCAPES = { '0': '\0', a: '\x07', b: '\b', t: '\t', '\t': '\t', n: '\n', v: '\v', f: '\f', r: '\r', e: '\x1b',
                  ' ': ' ', '"': '"', '/': '/', '\\': '\\', N: '\x85', _: '\xa0', L: '\u2028', P: '\u2029' };
const HEX_DIGITS = { x: 2, u: 4, U: 8 };

export function unquote(raw) {
  const s = String(raw);
  if (s.length > 1 && s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1).replaceAll("''", "'");
  if (!(s.length > 1 && s.startsWith('"') && s.endsWith('"'))) return s;
  const inner = s.slice(1, -1);
  let out = '';
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] !== '\\') { out += inner[i]; continue; }
    const c = inner[i + 1];
    if (c === undefined) { out += '\\'; break; }
    if (Object.hasOwn(ESCAPES, c)) { out += ESCAPES[c]; i++; continue; }
    const width = HEX_DIGITS[c];
    const hex = width ? inner.slice(i + 2, i + 2 + width) : '';
    if (width && hex.length === width && /^[0-9A-Fa-f]+$/.test(hex)) { out += String.fromCodePoint(parseInt(hex, 16)); i += 1 + width; continue; }
    out += '\\';
  }
  return out;
}

function quotedBeforeComment(s) {
  const mark = s[0];
  if (mark !== '"' && mark !== "'") return null;
  for (let i = 1; i < s.length; i++) {
    if (mark === '"' && s[i] === '\\') { i++; continue; }
    if (s[i] !== mark) continue;
    if (mark === "'" && s[i + 1] === "'") { i++; continue; }
    return /^\s+#/.test(s.slice(i + 1)) ? s.slice(0, i + 1) : null;
  }
  return null;
}

export function scalar(raw, where) {
  let s = raw.trim();
  if (s === '') return '';
  if ((s.startsWith('"') && s.endsWith('"') && s.length > 1) ||
      (s.startsWith("'") && s.endsWith("'") && s.length > 1)) {
    return unquote(s);
  }
  const quoted = quotedBeforeComment(s);
  if (quoted !== null) return unquote(quoted);
  const hash = s.indexOf(' #');
  if (hash !== -1) s = s.slice(0, hash).trim();
  if (s.startsWith('[') && s.endsWith(']')) {
    const inner = s.slice(1, -1).trim();
    return inner === '' ? [] : inner.split(',').map(x => scalar(x, where));
  }
  if (s in SCALARS) return structuredClone(SCALARS[s]);
  if (/^-?\d+$/.test(s)) return Number(s);
  if (/^-?\d*\.\d+$/.test(s)) return Number(s);
  if (isBlockScalar(s)) {
    throw new YamlError(`block scalars are not supported (${where}) — put the value on one line, quoted ` +
      `if it carries a colon or a hash (key: "a: b"), or write it as a "- item" list under the key. The ` +
      `wording is kept; only the line breaks go. Inside double quotes, write a quote as \`\\"\` and a ` +
      `backslash as \`\\\\\`. The registries and .github/artifact-fields.yaml are read ` +
      `by a different, tolerant reader (registry-schema.mjs), so a "|" or ">" seen in a skeleton there is ` +
      `not a form a run file may use.`);
  }
  return s;
}

export const isBlockScalar = s => { const t = String(s).trim(); return t.startsWith('>') || t.startsWith('|'); };

const indentOf = l => l.length - l.trimStart().length;
const skip = l => l.trim() === '' || l.trim().startsWith('#');

export function parseBlock(lines, start, indent, file = '') {
  let i = start;
  const at = (n, k) => `${file ? file + ' front-matter ' : ''}line ${n}${k ? `, key "${k}"` : ''}`;
  const isList = () => {
    while (i < lines.length && skip(lines[i])) i++;
    return i < lines.length && indentOf(lines[i]) === indent && lines[i].trim().startsWith('- ');
  };

  if (isList()) {
    const out = [];
    while (i < lines.length) {
      if (skip(lines[i])) { i++; continue; }
      const ind = indentOf(lines[i]);
      if (ind < indent) break;
      if (ind > indent) throw new YamlError(`unexpected indent at line ${i + 1}: "${lines[i]}"`);
      const body = lines[i].trim().slice(2);
      if (!lines[i].trim().startsWith('- ')) break;
      i++;
      if (!/^["']/.test(body) && (body.includes(': ') || body.endsWith(':'))) {
        const synthetic = [' '.repeat(indent + 2) + body];
        while (i < lines.length && (skip(lines[i]) || indentOf(lines[i]) >= indent + 2)) {
          if (!skip(lines[i])) synthetic.push(lines[i]);
          i++;
        }
        const [val, consumed] = parseBlock(synthetic, 0, indent + 2);
        if (consumed !== synthetic.length) throw new YamlError(`unparsed remainder near line ${i}`);
        out.push(val);
      } else {
        out.push(scalar(body, at(i)));
      }
    }
    return [out, i];
  }

  const out = {};
  while (i < lines.length) {
    if (skip(lines[i])) { i++; continue; }
    const ind = indentOf(lines[i]);
    if (ind < indent) break;
    if (ind > indent) throw new YamlError(`unexpected indent at line ${i + 1}: "${lines[i]}"`);
    const line = lines[i].trim();
    const colon = line.indexOf(':');
    if (colon === -1) throw new YamlError(`expected "key: value" at line ${i + 1}: "${line}"`);
    const key = line.slice(0, colon).trim();
    const rest = line.slice(colon + 1).trim();
    i++;
    if (rest !== '') { out[key] = scalar(rest, at(i, key)); continue; }
    let j = i;
    while (j < lines.length && skip(lines[j])) j++;
    if (j < lines.length && indentOf(lines[j]) > indent) {
      const [val, next] = parseBlock(lines, i, indentOf(lines[j]), file);
      out[key] = val; i = next;
    } else {
      out[key] = null;
    }
  }
  return [out, i];
}

export const fenceAt = (lines, from = 1) => lines.findIndex((l, i) => i >= from && String(l).trim() === '---');

export function frontmatter(text, file) {
  const lines = text.split('\n');
  if (lines[0].trim() !== '---') throw new YamlError(`${file}: no frontmatter (first line must be ---)`);
  const end = fenceAt(lines);
  if (end === -1) throw new YamlError(`${file}: frontmatter not closed`);
  const [val] = parseBlock(lines.slice(1, end), 0, 0, file);
  return val;
}

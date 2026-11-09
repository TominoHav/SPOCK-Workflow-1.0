#!/usr/bin/env node

import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const REGISTER = '.github/registry/rule-sentences.yaml';
export const SORTS = ['backed', 'broken', 'unseen', 'none', 'unsorted'];
export const RULE_RE = /\b(never|do not|must not|always)\b/i;

export const GROUPS = [
  { name: '.github/copilot-instructions.md', files: () => ['.github/copilot-instructions.md'] },
  { name: '.github/instructions/', files: () => walk('.github/instructions') },
  { name: '.github/agents/', files: () => walk('.github/agents') },
  { name: '.github/skills/*/SKILL.md', files: () => existsSync('.github/skills')
      ? readdirSync('.github/skills').sort().map(d => join('.github/skills', d, 'SKILL.md')).filter(f => existsSync(f)) : [] },
];

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  const go = d => {
    for (const e of readdirSync(d).sort()) {
      const p = join(d, e);
      if (statSync(p).isDirectory()) go(p);
      else out.push(p.split('\\').join('/'));
    }
  };
  go(dir);
  return out;
}

export function surfaces() {
  const out = [];
  for (const g of GROUPS) for (const f of g.files()) out.push({ file: f, group: g.name });
  return out;
}

const LIST_RE = /^\s*(?:[-*+]|\d+[.)])\s+/;
const HEAD_RE = /^\s{0,3}#{1,6}\s+/;
const FENCE_RE = /^\s*(```|~~~)/;
const HR_RE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;

function units(text) {
  const lines = text.replace(/\r/g, '').split('\n');
  const out = [];
  let cur = null;
  const flush = () => { if (cur && cur.parts.length) out.push(cur); cur = null; };
  const start = () => { flush(); cur = { parts: [] }; };
  const push = (s, n) => { if (!cur) cur = { parts: [] }; if (s.trim()) cur.parts.push({ s: s.trim(), n }); };
  let i = 0;
  if (lines[0] === '---') {
    const end = lines.indexOf('---', 1);
    if (end > 0) {
      for (let j = 1; j < end; j++) {
        if (/^\S/.test(lines[j])) start();
        push(lines[j], j + 1);
      }
      flush();
      i = end + 1;
    }
  }
  let fence = false;
  for (; i < lines.length; i++) {
    const n = i + 1;
    let l = lines[i];
    if (FENCE_RE.test(l)) { flush(); fence = !fence; continue; }
    if (fence) { start(); push(l, n); flush(); continue; }
    if (/^\s*>/.test(l)) l = l.replace(/^\s*(?:>\s?)+/, '');
    if (!l.trim() || HR_RE.test(l)) { flush(); continue; }
    if (HEAD_RE.test(l)) { start(); push(l.replace(HEAD_RE, ''), n); flush(); continue; }
    if (/^\s*\|/.test(l)) {
      flush();
      for (const cell of l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/)) { start(); push(cell, n); flush(); }
      continue;
    }
    if (LIST_RE.test(l)) { start(); push(l.replace(LIST_RE, ''), n); continue; }
    push(l, n);
  }
  flush();
  return out;
}

const ABBREV = /(?:\b(?:e\.g|i\.e|etc|vs|cf|approx|incl|resp|no|p|pp|viz)\.)$/i;

function sentencesOf(unit) {
  let text = '';
  const at = [];
  for (const p of unit.parts) {
    if (text) text += ' ';
    at.push({ off: text.length, n: p.n });
    text += p.s;
  }
  const lineAt = off => { let n = at[0].n; for (const a of at) if (a.off <= off) n = a.n; return n; };
  const out = [];
  const re = /[.!?][*_"'\u201d\u2019)\]`]*(?=\s+[^\sa-z\u00e0-\u017f])/g;
  let from = 0, m;
  while ((m = re.exec(text))) {
    const endAt = m.index + m[0].length;
    if (ABBREV.test(text.slice(Math.max(0, m.index - 8), m.index + 1))) continue;
    out.push({ text: text.slice(from, endAt), off: from });
    from = endAt;
  }
  out.push({ text: text.slice(from), off: from });
  return out
    .map(s => ({ text: s.text.replace(/\s+/g, ' ').trim(), line: lineAt(s.off + (s.text.length - s.text.trimStart().length)) }))
    .filter(s => s.text);
}

export function ruleSentences() {
  const out = [];
  const lineCount = {};
  for (const { file, group } of surfaces()) {
    const src = readFileSync(file, 'utf8');
    lineCount[group] = (lineCount[group] || 0) + src.replace(/\r/g, '').split('\n').filter(l => RULE_RE.test(l)).length;
    const seen = new Set();
    for (const u of units(src))
      for (const s of sentencesOf(u)) {
        if (!RULE_RE.test(s.text) || seen.has(s.text)) continue;
        seen.add(s.text);
        out.push({ surface: file, group, text: s.text, line: s.line });
      }
  }
  return { sentences: out, lines: lineCount };
}

const FIELDS = ['surface', 'text', 'sort', 'by', 'seen', 'ticket'];

function value(raw) {
  const t = raw.trim();
  if (t.startsWith('"')) {
    const m = /^"(?:[^"\\]|\\.)*"/.exec(t);
    if (m) { try { return JSON.parse(m[0]); } catch { return m[0].slice(1, -1); } }
  }
  return t.replace(/\s+#.*$/, '').trim();
}

export function readRegister(path = REGISTER) {
  if (!existsSync(path)) return null;
  const src = workflowText(path).replace(/\r/g, '');
  const parts = src.split(/^(?=- surface:)/m);
  const head = parts[0].startsWith('- surface:') ? '' : parts.shift();
  const rows = parts.map(raw => {
    const row = { raw };
    for (const k of FIELDS) {
      const m = raw.match(new RegExp(`^(?:- |  )${k}:(.*)$`, 'm'));
      row[k] = m ? value(m[1]) : null;
    }
    return row;
  });
  return { head, rows };
}

const q = s => JSON.stringify(s == null ? '' : String(s));
function block(r) {
  return `- surface: ${r.surface}\n  text: ${q(r.text)}\n  sort: ${r.sort}\n  by: ${q(r.by)}\n  seen: ${q(r.seen)}\n  ticket: ${q(r.ticket)}\n`;
}

const HEAD = `# Every rule sentence on the four surfaces an agent reads (one carrying never, do not, must not or always), each keyed on its surface and text, with its sort: backed, broken, unseen or none.
# Written by \`node .github/scripts/rule-sentences.mjs --write\`, which adds an \`unseen\` row for each sentence the register lacks and drops a row whose sentence is on no surface, naming each; read by it and by repo-check.mjs.
# A row's sort is edited by hand: backed names the check, task, script or guard that refuses the rule; broken names the runs it was broken in and the ticket that replaces it.
# Checked by C192: every rule sentence has one sorted row, and every row names a sentence still on its surface.

`;

export function withNewRows(reg, found) {
  const key = (s, t) => `${s}\u0000${t}`;
  const onSurface = new Set(found.map(f => key(f.surface, f.text)));
  const all = reg ? reg.rows.slice() : [];
  const dropped = all.filter(r => !onSurface.has(key(r.surface, r.text)));
  const rows = all.filter(r => onSurface.has(key(r.surface, r.text)));
  const addedRows = [];
  const have = new Set(rows.map(r => key(r.surface, r.text)));
  const order = surfaces().map(s => s.file);
  let added = 0;
  for (let i = 0; i < found.length; i++) {
    const f = found[i];
    if (have.has(key(f.surface, f.text))) continue;
    let at = -1;
    for (let j = i - 1; j >= 0 && found[j].surface === f.surface; j--) {
      const k = rows.findIndex(r => r.surface === f.surface && r.text === found[j].text);
      if (k !== -1) { at = k + 1; break; }
    }
    if (at === -1) {
      const k = rows.findIndex(r => r.surface === f.surface);
      if (k !== -1) at = k;
    }
    if (at === -1) {
      const mine = order.indexOf(f.surface);
      at = 0;
      rows.forEach((r, k) => { const o = order.indexOf(r.surface); if (o !== -1 && o < mine) at = k + 1; });
    }
    const row = { surface: f.surface, text: f.text, sort: 'unseen', by: '', seen: '', ticket: '' };
    row.raw = block(row);
    rows.splice(at, 0, row);
    have.add(key(f.surface, f.text));
    addedRows.push(row);
    added++;
  }
  return { rows, added, addedRows, dropped };
}

export function proposal(text) {
  const named = [];
  const checks = text.match(/\bC\d+\b/g);
  if (checks) named.push(...new Set(checks));
  if (/SPOCK:/.test(text)) named.push('a SPOCK: task');
  const scripts = text.match(/[\w.-]+\.mjs\b/g);
  if (scripts) named.push(...new Set(scripts));
  if (/\bhooks?\b/i.test(text)) named.push('a hook');
  return named.length ? named : null;
}

export function counts(found, lines, reg) {
  const byKey = new Map((reg ? reg.rows : []).map(r => [`${r.surface}\u0000${r.text}`, r]));
  const out = GROUPS.map(g => ({ group: g.name, lines: lines[g.name] || 0, sentences: 0, backed: 0, broken: 0, unseen: 0, none: 0, unsorted: 0, 'no row': 0 }));
  for (const f of found) {
    const c = out.find(x => x.group === f.group);
    c.sentences++;
    const r = byKey.get(`${f.surface}\u0000${f.text}`);
    const s = r ? r.sort : 'no row';
    c[SORTS.includes(s) || s === 'no row' ? s : 'unsorted']++;
  }
  return out;
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const { sentences: found, lines } = ruleSentences();
  const reg = readRegister();
  if (process.argv.includes('--write')) {
    const { rows, added, addedRows, dropped } = withNewRows(reg, found);
    const body = (reg ? reg.head : HEAD) + rows.map(r => r.raw).join('');
    const before = existsSync(REGISTER) ? workflowText(REGISTER) : null;
    if (body !== before) writeFileSync(REGISTER, body);
    console.log(`${REGISTER}: ${added} row(s) added, ${dropped.length} dropped, ${rows.length} in all`);
    for (const r of addedRows) console.log(`  added, unseen: ${r.surface} "${r.text}"`);
    for (const r of dropped) console.log(`  dropped, its sentence is on no surface: ${r.surface} "${r.text}"`);
    if (added) console.log('Each new row is unseen: set it to none where the sentence is no rule, and commit the register with the change.');
  } else {
    const byKey = new Map((reg ? reg.rows : []).map(r => [`${r.surface}\u0000${r.text}`, r]));
    for (const f of found) {
      const r = byKey.get(`${f.surface}\u0000${f.text}`);
      const sort = r ? r.sort : 'no row';
      const p = proposal(f.text);
      const extra = r && r.sort === 'backed' ? `  by ${r.by}` : r && r.sort === 'broken' ? `  seen ${r.seen} · ticket ${r.ticket}` : '';
      console.log(`${sort.padEnd(8)} ${f.surface}:${f.line}  ${f.text}${extra}${p && sort !== 'backed' ? `\n         proposed backed: names ${p.join(', ')}` : ''}`);
    }
    console.log('');
    const cs = counts(found, lines, reg);
    const tot = { group: 'total' };
    for (const c of cs) for (const [k, v] of Object.entries(c)) if (k !== 'group') tot[k] = (tot[k] || 0) + v;
    for (const c of [...cs, tot])
      console.log(`${c.group.padEnd(32)} ${String(c.lines).padStart(4)} line(s)  ${String(c.sentences).padStart(4)} sentence(s): ` +
        `${c.backed} backed, ${c.broken} broken, ${c.unseen} never seen broken, ${c.none} none, ${c.unsorted} unsorted` +
        (c['no row'] ? `, ${c['no row']} with no row` : ''));
    const orphans = (reg ? reg.rows : []).filter(r => !found.some(f => f.surface === r.surface && f.text === r.text));
    if (orphans.length) console.log(`\n${orphans.length} row(s) whose text is on no surface: ${orphans.slice(0, 5).map(r => `${r.surface} "${r.text}"`).join('; ')}`);
  }
}

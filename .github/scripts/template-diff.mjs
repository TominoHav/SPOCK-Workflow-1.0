#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { INITIATIVE_TEMPLATE } from './gates.mjs';
import { PRD_TEMPLATE } from './prd.mjs';
import { fenceAt } from './yaml.mjs';
import { runArtifacts, runLanguage } from './run-files.mjs';
import { sectionName } from './doc-structure.mjs';

const KNOW_HOW = '.github/know-how';

const PRD_NOTE = 'PRD Template §2, authored 12 August (T4). Eight sections, closed. The heading was free ' +
  'prose at v0.1 and no tool could locate a section in a finished PRD; v0.2 fixes it, which is what made ' +
  'this diff possible.';

const TEMPLATES = {
  A14: {
    body: 'initiative-template.md',
    sections: INITIATIVE_TEMPLATE,
    setAt: '## 3. Sections',
    note: "ČS's own template, ported not authored (PT-010). The section set is fixed: never renamed, reordered or dropped.",
  },
  A12: { body: 'prd-template.md', sections: PRD_TEMPLATE, setAt: '## 2. The section set', note: PRD_NOTE },
  A13: { body: 'prd-template.md', sections: PRD_TEMPLATE, setAt: '## 2. The section set', note: PRD_NOTE },
};

const fold = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function headings(text) {
  const lines = text.split('\n');
  let start = 0;
  if (lines[0] && lines[0].trim() === '---') {
    const end = fenceAt(lines);
    if (end !== -1) start = end + 1;
  }
  const out = [];
  let fenced = false;
  for (let i = start; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*```/.test(l)) { fenced = !fenced; continue; }
    if (fenced) continue;
    const m = l.match(/^(#{1,6})\s+(.*\S)\s*$/);
    if (m) out.push({ level: m[1].length, text: m[2], line: i + 1 });
  }
  return out;
}

function diff(sections, doc) {
  const found = headings(doc).filter(h => h.level >= 2);
  const used = new Set();
  const rows = [];

  for (const s of sections) {
    const i = found.findIndex((h, n) => !used.has(n) && fold(h.text) === fold(s.heading));
    if (i === -1) { rows.push({ ...s, state: 'missing' }); continue; }
    used.add(i);
    rows.push({ ...s, state: 'present', at: found[i].line, order: i, as: found[i].text,
                foundLevel: found[i].level, levelOk: found[i].level === s.level });
  }

  const extra = found.filter((_, n) => !used.has(n));

  const seen = rows.filter(r => r.state === 'present');
  const outOfOrder = [];
  for (let i = 1; i < seen.length; i++)
    if (seen[i].order < seen[i - 1].order) outOfOrder.push([seen[i - 1].id, seen[i].id]);

  return { rows, extra, outOfOrder };
}

function bodyPath(name) {
  const flat = join(KNOW_HOW, name);
  if (existsSync(flat)) return flat;
  for (const d of readdirSync(KNOW_HOW, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const nested = join(KNOW_HOW, d.name, name);
    if (existsSync(nested)) return nested;
  }
  return flat;
}

function bodyDrift(t) {
  const p = bodyPath(t.body);
  if (!existsSync(p)) return `${p} is not on disk`;
  const text = readFileSync(p, 'utf8');
  const i = text.indexOf(t.setAt);
  if (i === -1) return `${t.body} has no "${t.setAt}" — the section set has no source of record`;
  const open = text.indexOf('```', i);
  const nextHeading = text.indexOf('\n## ', i + t.setAt.length);
  const end = nextHeading === -1 ? text.length : nextHeading;
  let block;
  if (open !== -1 && open < end) {
    const close = text.indexOf('```', open + 3);
    block = close === -1 ? text.slice(open, end) : text.slice(open, close);
  } else block = text.slice(i, end);
  const folded = fold(block);
  const names = s => (s.en ? [s.id, s.heading, s.en] : [s.heading]);
  const missing = t.sections.filter(s => !names(s).some(n => folded.includes(fold(n)))).map(s => (s.en ? s.id : s.heading));
  return missing.length ? `${t.body} ${t.setAt.replace(/^#+\s*/, '§').split('.')[0]} no longer names: ${missing.join(', ')}` : null;
}

const argv = process.argv.slice(2);

if (argv.includes('--templates')) {
  console.log('\nVetted templates a reviewer can diff against\n');
  for (const [id, t] of Object.entries(TEMPLATES)) {
    const state = t.sections ? `${t.sections.length} sections` : 'absent';
    console.log(`  ${id}  ${String(state).padEnd(12)} ${t.body}`);
    console.log(`       ${t.note}`);
  }
  console.log('\nA template that does not exist is reported as absent, never approximated.\n');
  process.exit(0);
}

const dir = argv.find(a => !a.startsWith('--') && /\//.test(a));
const only = argv.find(a => /^A\d+[a-z]?$/.test(a));
if (!dir) {
  console.error('usage: node .github/scripts/template-diff.mjs {runs_root}/<run_id> [A14] [--templates]');
  process.exit(2);
}
if (!existsSync(dir) || !statSync(dir).isDirectory()) { console.error(`no such run directory: ${dir}`); process.exit(2); }

const files = runArtifacts(dir);
const targets = [];
for (const a of files) {
  const id = a.id;
  if (!id || !TEMPLATES[id]) continue;
  if (only && id !== only) continue;
  targets.push([id, a.rel]);
}

if (!targets.length) {
  console.log(`\nNothing in ${dir} has a template to diff against` +
    (only ? ` under ${only}.` : '. A14 and the PRD are the two artifacts written to one.') + '\n');
  process.exit(0);
}

const docLang = runLanguage(dir);

console.log('');
let anyFinding = false;

for (const [id, file] of targets) {
  const t = TEMPLATES[id];
  console.log(`${id} — ${file}`);
  if (!t.sections) {
    console.log(`  no vetted template. ${t.note}\n`);
    continue;
  }
  const drift = bodyDrift(t);
  const localised = t.sections.map(s => ({ ...s, heading: sectionName(s, docLang) }));
  const { rows, extra, outOfOrder } = diff(localised, readFileSync(join(dir, file), 'utf8'));

  for (const r of rows) {
    if (r.state === 'missing') { console.log(`  --  ${r.heading.padEnd(34)} missing`); anyFinding = true; continue; }
    const notes = [];
    if (!r.levelOk) notes.push(`written at heading level ${r.foundLevel}, template says ${r.level}`);
    if (fold(r.as) === fold(r.heading) && r.as !== r.heading) notes.push(`written as "${r.as}"`);
    console.log(`  ok  ${r.heading.padEnd(34)} line ${String(r.at).padEnd(4)}${notes.length ? ' · ' + notes.join(' · ') : ''}`);
    if (notes.length) anyFinding = true;
  }
  for (const e of extra) { console.log(`  ++  ${e.text.padEnd(34)} line ${e.line} · not in the template`); anyFinding = true; }
  for (const [a, b] of outOfOrder) { console.log(`  !!  ${b} appears before ${a} · the section order is fixed`); anyFinding = true; }
  if (drift) { console.log(`  !!  ${drift}`); anyFinding = true; }

  const present = rows.filter(r => r.state === 'present').length;
  console.log(`  ${present}/${rows.length} template sections found in the document, ${extra.length} outside it.\n`);
}

console.log(anyFinding
  ? 'Findings are for the reviewer to weigh, not a verdict. A section that is genuinely not applicable\nis a legitimate answer, and this tool has no way to know which.\n'
  : 'Nothing to weigh: every template section is in the document, in order, and nothing else is.\n');

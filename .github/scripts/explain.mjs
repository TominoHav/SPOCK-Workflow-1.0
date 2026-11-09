#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { capture, END_LINE } from './capture.mjs';
import { CALLER_CWD } from './run-files.mjs';
import { actionOf, shapeOf, shapesRegister, SIGN_OFF_TASK, STALE_TASK, WAITS_ON_A_PERSON, PERSON_TASK } from './gates.mjs';
import { readFindings } from './findings.mjs';
import { DOC_REL as CARDS_DOC, PARTS_REL as CARDS_PARTS } from './card-join.mjs';
import { DOC_REL as SOLUTIONS_DOC } from './solution-join.mjs';
import { COPIED_ARTIFACT } from './reading-copy.mjs';

export const acceptedDocumentLine = n => `This document belongs to stage ${n}, which is already accepted, so the agent does not change it: ` +
  `the person sends stage ${n} back with "${STALE_TASK.redo}" first, and the agent changes only the documents of the stage being written.`;

const posix = p => String(p || '').replace(/\\/g, '/');
const TASKS_FILE = join('.vscode', 'tasks.json');
function taskRunning(read, script) {
  try {
    const d = JSON.parse(String(read(TASKS_FILE) || '{}').replace(/^\s*\/\/.*$/gm, ''));
    const runs = new RegExp(`task\\.mjs ${script.replace(/\./g, '\\.')}(\\s|$)`);
    return ((d.tasks || []).find(t => t && runs.test(String(t.command || ''))) || {}).label || null;
  } catch { return null; }
}

export function copiedDocumentLine(id, rel, read = p => (existsSync(p) ? readFileSync(p, 'utf8') : null)) {
  const w = WAITS_ON_A_PERSON[id];
  if (w && w.writer === 'workflow' && w.after === 'agreement')
    return `This document is written by the workflow from ${w.from}, its draft: change ${w.from}, then the person marks it ` +
      `agreed with "${PERSON_TASK.agreement}", which writes it again.`;
  if (w && w.writer === 'workflow' && w.after === 'approval')
    return `This document is written by the workflow from the solution the person chose in ${w.from}, its part and the reason ` +
      `recorded with the choice, at the stage ${w.stage} approval, and is never changed in place: the person sends stage ${w.stage} ` +
      `back with "${STALE_TASK.redo}" and records the choice again with "${PERSON_TASK.choice}".`;
  const r = posix(rel);
  if (r && r === posix(CARDS_DOC)) {
    const t = taskRunning(read, 'card-join.mjs');
    return t ? `The cards in this document are written by the workflow from their parts in ${posix(CARDS_PARTS)}/: ` +
      `change the card's part, then "${t}" writes them again.` : null;
  }
  if (r && r === posix(SOLUTIONS_DOC)) {
    const d = taskRunning(read, 'derive.mjs'), a = taskRunning(read, 'solution-join.mjs');
    return d && a ? `The solutions in this document are written by the workflow from their parts in ` +
      `${posix(dirname(SOLUTIONS_DOC))}/parts/: change the solution's part, then "${d}" and "${a}" write them again.` : null;
  }
  if (id === `${COPIED_ARTIFACT}-read`) {
    const t = taskRunning(read, 'reading-copy.mjs');
    return t ? `This document is written by the workflow from ${COPIED_ARTIFACT}: change ${COPIED_ARTIFACT}, then "${t}" writes it again.` : null;
  }
  return null;
}

export const REGISTER = join('.github', 'COVERAGE-CHECKS.md');

export const shapesBodyOf = stage => join('.github', 'know-how', 'product', `stage-${stage}-shapes.md`);

export function registerRow(id, text) {
  const lines = String(text || '').replace(/\r/g, '').split('\n');
  const head = new RegExp(`^\\*\\*${String(id).replace(/[^A-Za-z0-9]/g, '')} · (.*)\\*\\*\\s*$`);
  const at = lines.findIndex(l => head.test(l));
  if (at === -1) return null;
  const body = [];
  for (const l of lines.slice(at + 1)) { if (!l.trim()) break; body.push(l.trim()); }
  const field = name => { const l = body.find(x => x.startsWith(`${name}: `)); return l ? l.slice(name.length + 2).trim() : ''; };
  return { title: head.exec(lines[at])[1].trim(), what: field('What it checks'), why: field('Why'), where: field('Where') };
}

export function shapesSections(id, text) {
  const lines = String(text || '').split('\n');
  const found = [];
  let fence = false, start = -1;
  const close = end => {
    if (start === -1) return;
    found.push({ heading: lines[start].replace(/^##\s+/, ''),
                 text: lines.slice(start, end).join('\n').trimEnd().replace(/\n-{3,}$/, '').trimEnd() });
    start = -1;
  };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^(?:```|~~~)/.test(l)) { fence = !fence; continue; }
    if (fence || !/^## /.test(l)) continue;
    close(i);
    if ([...l.matchAll(/`(C\d+)`/g)].some(m => m[1] === id)) start = i;
  }
  close(lines.length);
  return found;
}

const indent = (text, pad = '    ') => String(text).split('\n').map(l => (l ? pad + l : l)).join('\n');

export { readFindings };

export function explain(out, read = p => (existsSync(p) ? readFileSync(p, 'utf8') : null)) {
  const g = readFindings(out);
  if (!g.gate) return null;
  const L = [];
  if (g.lead.length) L.push(...g.lead, '');
  const ids = [...new Set(g.findings.map(f => f.check))];
  const one = ids.length === 1;
  if (!ids.length) {
    L.push(`Nothing failed: ${g.gate}, the gate of stage ${g.stage}, fails no check now, so there is nothing to explain.`);
  } else {
    L.push(`${g.gate}, the gate of stage ${g.stage}${g.name ? ` (${g.name})` : ''}, fails ${ids.length} check${one ? '' : 's'} now: ` +
      `${ids.join(', ')}. Grouped by the document each failure is about: what failed, what the check is for, what passes ` +
      'and what to do. The gate was run and nothing was recorded.');
    const register = read(REGISTER);
    const reg = shapesRegister();
    const entryOf = id => (reg && reg.shapes[id] && typeof reg.shapes[id] === 'object' ? reg.shapes[id] : null);
    const named = [...new Set(g.findings.map(f => f.document).filter(Boolean))];
    const stageOf = id => { const d = g.documents.get(id); const f = g.findings.find(x => x.document === id);
      return d && d.stage !== null ? d.stage : f && f.stage !== null ? f.stage : Infinity; };
    const groups = named.map((id, i) => ({ id, i, stage: stageOf(id) })).sort((a, b) => a.stage - b.stage || a.i - b.i)
      .map(({ id }) => ({ id, heading: g.documents.has(id) ? `${g.documents.get(id).rel} (${id})` : id }));
    if (g.findings.some(f => !f.document)) groups.push({ id: null, heading: 'About the run' });
    const firstUnder = new Map();
    for (const grp of groups) {
      L.push('', `═══ ${grp.heading} ═══`);
      const doc = grp.id ? g.documents.get(grp.id) : null;
      if (doc && doc.stage !== null && doc.status === 'accepted')
        L.push('', acceptedDocumentLine(doc.stage));
      const copied = grp.id ? copiedDocumentLine(grp.id, doc ? doc.rel : null, read) : null;
      if (copied) L.push('', copied);
      for (const id of ids) {
        const fs = g.findings.filter(f => f.check === id && f.document === grp.id);
        if (!fs.length) continue;
        L.push('', `── ${id} ──`, '', 'What failed:', ...fs.map(f => indent(f.fragment)), '');
        const entry = entryOf(id);
        const first = !firstUnder.has(id);
        if (first) {
          firstUnder.set(id, grp.heading);
          const row = register === null ? null : registerRow(id, register);
          if (row) {
            L.push(`What it checks, from ${REGISTER}:`, indent(row.what));
            if (row.why) L.push('', 'Why it exists:', indent(row.why));
          } else {
            L.push(`${REGISTER} has no line for ${id}.`);
          }
        } else {
          L.push(`What it checks, why it exists and whether it can be signed off: under ${firstUnder.get(id)} above.`);
        }
        L.push('');
        if (entry) {
          const shape = fs.map(f => f.shape).find(Boolean) || shapeOf(id, grp.id);
          if (shape) L.push('What passes:', indent(shape), '');
          if (actionOf(id)) L.push('What to do:', indent(actionOf(id)), '');
        } else {
          L.push(`No passing shape is written for ${id} yet; what it checks is the line above.`, '');
        }
        if (!first) continue;
        const bodies = [...new Set([entry && typeof entry.see === 'string' ? entry.see : null, shapesBodyOf(g.stage)].filter(Boolean))];
        let printed = 0;
        for (const bodyPath of bodies) {
          const body = read(bodyPath);
          for (const s of body === null ? [] : shapesSections(id, body)) {
            L.push(`The section on ${id} in ${bodyPath}, with the shape that passes:`, '', s.text, '');
            printed++;
          }
        }
        if (!entry && !printed) {
          const bodyPath = shapesBodyOf(g.stage);
          L.push(read(bodyPath) === null
            ? `Stage ${g.stage} has no shapes body, so there is no written shape for ${id} beyond the line above.`
            : `${bodyPath} has no section for ${id}, so there is no written shape for it beyond the line above.`, '');
        }
        const sign = g.signing.get(id) || { route: 'open', text: null };
        const what = grp.id ? 'the document' : 'the run';
        if (sign.route === 'never' && sign.text) L.push('Cannot be signed off, and this fixes it:', `  ${id}: ${sign.text}`);
        else if (sign.route === 'signed' && sign.text) L.push(`Signing it off: ${sign.text}`);
        else L.push(`Signing it off: if ${what} already ${entry ? 'has the shape above' : 'does what the check is for'} and the check ` +
          `still fails, the fault may be the workflow's. Tell the person which check, what ${what} holds and why it should ` +
          `pass; they can sign ${id} off with "${SIGN_OFF_TASK}" and give that as the reason.`);
      }
    }
  }
  if (g.closing) L.push('', 'What the gate said after its checks:', '', indent(g.closing, '  '));
  return L.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  const gi = argv.indexOf('--gate');
  const gate = gi === -1 ? '' : (argv[gi + 1] || '');
  let dir = argv.find((a, i) => !a.startsWith('--') && (gi === -1 || i !== gi + 1)) || null;
  if (dir && !isAbsolute(dir) && !existsSync(dir) && existsSync(resolve(CALLER_CWD, dir))) dir = resolve(CALLER_CWD, dir);
  const r = capture(process.execPath, [join('.github', 'scripts', 'check.mjs'), ...(dir ? [dir] : []), '--findings', '--gate', ...(gate ? [gate] : [])]);
  const cut = r.complete && readFindings(r.out).gate && !readFindings(r.out).ended ? `the gate's answer does not end at ${END_LINE}` : null;
  if (!r.complete || cut) {
    process.stderr.write(`\nThe gate could not be read to the end (${r.why || cut}), so nothing is explained. ` +
      '`SPOCK: run one gate` shows what it says.\n');
    process.exit(2);
  }
  const said = explain(r.out);
  if (said === null) {
    console.log((r.out + r.err).replace(/\n$/, ''));
    process.exit(r.code);
  }
  console.log(said.replace(/\n$/, ''));
  process.exit(0);
}

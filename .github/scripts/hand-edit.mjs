#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, relative, basename, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, RECORDS_DIR, runArtifacts, runRecords, recordsFor, readText, unixText } from './run-files.mjs';
import { frontmatter } from './yaml.mjs';
import { namesProducer, STALE_TASK, WAITS_ON_A_PERSON, stoppedLine } from './gates.mjs';
import { DOC_REL as CARDS_DOC, PARTS_REL as CARDS_PARTS, PART_OF as CARDS_ID, expected as expectedCards } from './card-join.mjs';
import { DOC_REL as SOLUTIONS_DOC, expected as expectedSolutions, region as solutionRegion } from './solution-join.mjs';
import { shownDate } from './fixed-messages.mjs';   // r1.13 · W44 · BD-133: a date a person reads is day first
import { envelopeAtApproval } from './envelope.mjs';

export const TASK = 'SPOCK: record that I edited a document';
export const ACCOUNT_REL = 'notes/marked-edits.md';
const JOIN_CARDS = 'SPOCK: stage 3 — join the cards, then the store';
const DERIVE_SOLUTIONS = 'SPOCK: stage 4 — derive the compliance sections';
const JOIN_SOLUTIONS = 'SPOCK: stage 4 — assemble the solution set';
const REPLACE_CHOICE = 'SPOCK: replace a decision that no longer stands';

export const RECORDED_AT = {
  running: 'being written',
  produced: 'written and waiting for its gate',
  q_failed: 'back with its agent after its gate',
  in_review: 'in review',
  refined: 'being changed after review',
};

const slash = p => String(p).split(sep).join('/').replace(/\\/g, '/');
const today = () => new Date().toISOString().slice(0, 10);
const oneLine = s => String(s ?? '').replace(/\s+/g, ' ').trim();

export function resolveDocument(dir, typed) {
  let t = oneLine(typed).replace(/^[`'"]+|[`'"]+$/g, '').replace(/\\/g, '/').trim();
  const runId = basename(dir);
  const inRun = t.lastIndexOf(`/${runId}/`);
  if (inRun !== -1) t = t.slice(inRun + runId.length + 2);
  else if (t.startsWith(`${runId}/`)) t = t.slice(runId.length + 1);
  t = t.replace(/^(\.\/)+/, '');
  const root = resolve(dir);
  const abs = resolve(root, t);
  if (abs !== root && !abs.startsWith(root + sep))
    return { problem: `${t} is outside this run, and an edit is recorded on a document inside it.` };
  const rel = slash(relative(root, abs));
  const parts = rel.split('/');
  const docs = runArtifacts(dir).filter(d => d.id);
  const named = id => docs.find(d => d.id === id);

  if (parts.includes('supplied'))
    return { problem: `${rel} is material that was supplied to the run, and an edit is recorded on a document the run wrote.` };
  if (parts[0] === 'superseded')
    return { problem: `${rel} was taken back and is kept as it was, so a change to it is not recorded.` };
  if (parts[0] === RECORDS_DIR) {
    const rec = runRecords(dir).find(r => slash(r.rel) === rel);
    const doc = rec && rec.id ? named(rec.id) : null;
    return { problem: `${rel} is a record behind ${doc ? doc.rel : 'a document'}, and an edit is recorded on the document itself.` +
      (doc ? ` If you changed ${doc.rel}, name it.` : '') };
  }
  if (parts.includes('parts')) {
    const cards = slash(CARDS_PARTS), solutions = '4-solutions/parts';
    let into = null;
    try { into = (frontmatter(readFileSync(abs, 'utf8'), rel) || {}).part_of || null; } catch { into = null; }
    if (rel.startsWith(`${cards}/`) && (!into || String(into) === CARDS_ID))
      return { problem: `${rel} is a card's own file, which the join copies into ${slash(CARDS_DOC)}. ` +
        `Run "${JOIN_CARDS}", then record the edit naming ${slash(CARDS_DOC)}.` };
    if (rel.startsWith(`${solutions}/`))
      return { problem: `${rel} is a solution's own file, which the assembly copies into ${slash(SOLUTIONS_DOC)}. ` +
        `Run "${DERIVE_SOLUTIONS}" and then "${JOIN_SOLUTIONS}", then record the edit naming ${slash(SOLUTIONS_DOC)}.` };
    const doc = into ? named(String(into)) : null;
    return { problem: `${rel} is a part joined into ${doc ? doc.rel : 'a document'}, and an edit is recorded on the document it is joined into.` };
  }

  let doc = docs.find(d => slash(d.rel) === rel) || null;
  if (!doc && /^A\d+[a-z]?$/i.test(t)) doc = docs.find(d => d.id.toLowerCase() === t.toLowerCase()) || null;
  if (!doc && t && !t.includes('/')) {
    const byName = docs.filter(d => basename(d.rel) === t);
    if (byName.length > 1)
      return { problem: `${t} names ${byName.length} documents in this run: ${byName.map(d => d.rel).join(', ')}. Give its path inside the run.` };
    doc = byName[0] || null;
  }
  if (!doc)
    return { problem: `${t || 'That'} is not a document of this run. Give its path inside the run, as one of: ` +
      `${docs.map(d => d.rel).join(', ') || 'none yet'}.` };
  return { doc: { ...doc, rel: slash(doc.rel) } };
}

export function statusRefusal(n, status) {
  const redo = `Send the stage back with "${STALE_TASK.redo}", then record your edit again, or undo your change.`;
  if (RECORDED_AT[status]) return null;
  if (status === 'accepted')
    return [`Stage ${n} is accepted, and an accepted document stays as the person who approved it saw it.`, redo];
  if (status === 'stale')
    return [`Stage ${n} is marked stale, because a stage it is built on changed after it was accepted, and a stale stage is kept as it was or redone.`, redo];
  if (status === 'pending')
    return [`Stage ${n} has not started, and an edit is recorded on a stage that is being written or reviewed.`];
  if (status === 'superseded')
    return [`Stage ${n} was replaced by a later version, and a replaced stage is kept as it was.`];
  return [`Stage ${n} is "${status}", and an edit is recorded on a stage that is being written or reviewed.`];
}

export function scriptWritten(dir, doc) {
  const whole = WAITS_ON_A_PERSON[doc.id];
  if (whole && whole.writer === 'workflow') {
    const lines = [`${doc.rel} is not changed by hand: it ${whole.why}, and writing it again replaces a change made to it.`];
    if (whole.after === 'agreement') {
      const draft = runArtifacts(dir).find(d => d.id === whole.from);
      lines.push(`Make the change in the draft${draft ? `, ${slash(draft.rel)},` : ''} and record that edit. The agreed PRD is written again from the draft when it is next marked agreed.`);
    } else if (whole.after === 'approval') {
      lines.push(`Its reason is the one recorded with your choice. To change the reason, replace the choice with "${REPLACE_CHOICE}".`);
    }
    return lines;
  }
  if (doc.rel === slash(CARDS_DOC)) {
    const e = expectedCards(dir);
    if (!e.applies) return null;
    if (e.doc !== null && unixText(e.doc) === readText(doc.abs)) return null;
    return [`The cards in ${doc.rel} are copied word for word from their own files in ${slash(CARDS_PARTS)}/, and ` +
        (e.doc === null ? `they cannot be compared with those files now: ${e.reason}.` : 'they no longer match those files, so the next join replaces a change made to a card here.'),
      `Make the change in the card's own file, run "${JOIN_CARDS}", then record your edit again. If you changed nothing in the cards, run that join first and then record your edit again.`];
  }
  if (doc.rel === slash(SOLUTIONS_DOC)) {
    const e = expectedSolutions(dir);
    if (!e.applies) return null;
    const problem = e.problems.length ? e.problems[0] : null;
    const held = solutionRegion(readText(doc.abs));
    if (!problem && (held === null || held.trim() === e.body.trim())) return null;
    return [`The solutions in ${doc.rel} are copied word for word from their own files in 4-solutions/parts/, and ` +
        (problem ? `they cannot be compared with those files now: ${problem}.` : 'they no longer match those files, so the next assembly replaces a change made to a solution here.'),
      `Make the change in the solution's own file, run "${DERIVE_SOLUTIONS}" and then "${JOIN_SOLUTIONS}", then record your edit again. If you changed nothing in the solutions, run those two first and then record your edit again.`];
  }
  return null;
}

export function markHuman(text) {
  const m = /^\ufeff?---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/.exec(String(text));
  if (!m) return null;
  const nl = m[0].includes('\r\n') ? '\r\n' : '\n';
  const bom = m[0].charCodeAt(0) === 0xfeff ? '\ufeff' : '';
  const lines = m[1].split(/\r?\n/);
  const at = lines.findIndex(l => /^modified_by:/.test(l));
  const was = at === -1 ? null : lines[at].replace(/^modified_by:\s*/, '').replace(/^["']|["']$/g, '').trim();
  if (at === -1) lines.push('modified_by: human'); else lines[at] = 'modified_by: human';
  return { text: `${bom}---${nl}${lines.join(nl)}${nl}---${m[2]}${String(text).slice(m[0].length)}`, was };
}

export function accountHeading(runId) {
  return [`# Marked human edits in \`${runId}\``, '',
    'Each change a person made by hand to a document in this run, in their own words, as they recorded it. ' +
    'Every document named here is marked `modified_by: human`.', '', '---', ''].join('\n');
}

export function accountSection({ id, rel, what, why, by, at, stage, status }) {
  return ['', `## ${id} · [\`${rel}\`](../${rel})`, '', `### Edited by ${by} on ${at}`, '',
    `**What changed.** ${what}`, '', `**Why.** ${why}`, '',
    `Recorded while stage ${stage} was ${RECORDED_AT[status] || status}.`, ''].join('\n');
}

const MIN_WORDS = 8;
const RUN = 6;
const wordsIn = s => [...String(s ?? '').replace(/\[rec:[^\]]*\]/g, m => ' '.repeat(m.length)).matchAll(/[\p{L}\p{N}]+/gu)]
  .map(m => ({ word: m[0].toLowerCase(), from: m.index, to: m.index + m[0].length }));
const leaves = (v, path = '', out = []) => {
  if (Array.isArray(v)) v.forEach((x, i) => leaves(x, `${path}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) leaves(x, path ? `${path}.${k}` : k, out);
  else if (typeof v === 'string') out.push([path, v]);
  return out;
};

function longestRun(field, body, positions) {
  let best = { len: 0, at: -1 };
  for (let i = 0; i < field.length && field.length - i > best.len; i++)
    for (const p of positions.get(field[i]) || []) {
      let k = 0;
      while (i + k < field.length && p + k < body.length && field[i + k] === body[p + k]) k++;
      if (k > best.len) best = { len: k, at: p };
    }
  return best;
}

export function repeatedInPart(dir, doc) {
  const records = recordsFor(dir, doc.id);
  if (!records.length) return null;
  const text = readFileSync(doc.abs, 'utf8').replace(/^\ufeff?---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const tokens = wordsIn(text);
  const body = tokens.map(t => t.word);
  const joined = ` ${body.join(' ')} `;
  const positions = new Map();
  body.forEach((w, k) => { if (!positions.has(w)) positions.set(w, []); positions.get(w).push(k); });
  const fields = [];
  let whole = 0;
  for (const r of records) {
    let fm;
    try { fm = frontmatter(readFileSync(r.abs, 'utf8'), r.rel); } catch { continue; }
    for (const [name, value] of leaves(fm || {})) {
      const field = wordsIn(value).map(t => t.word);
      if (field.length < MIN_WORDS) continue;
      if (joined.includes(` ${field.join(' ')} `)) { whole++; continue; }
      const run = longestRun(field, body, positions);
      if (run.len < Math.min(RUN, Math.ceil((field.length - 1) / 2))) continue;
      const last = tokens[run.at + Math.min(run.len, 6) - 1];
      fields.push({ field: name, record: slash(r.rel), at: run.at, opening: text.slice(tokens[run.at].from, last.to).replace(/\s+/g, ' ') });
    }
  }
  fields.sort((a, b) => a.at - b.at);
  return { fields, whole };
}

const say = m => console.log(m);
const refuse = lines => { say(''); say('Nothing was recorded.'); for (const l of lines) say(l); process.exit(3); };
const die = m => { console.error(`\nhand-edit: ${m}\n`); process.exit(2); };

function main() {
  const argv = process.argv.slice(2);
  const KNOWN = ['document', 'what', 'why', 'by'];
  const got = {}, pos = [];
  for (let i = 0; i < argv.length; i++) {
    const flag = /^--(.+)$/.exec(argv[i]);
    if (flag && KNOWN.includes(flag[1])) { got[flag[1]] = oneLine(argv[i + 1]); i++; continue; }
    if (flag) die(`--${flag[1]} is not an option. The options are ${KNOWN.map(k => `--${k}`).join(', ')}`);
    pos.push(argv[i]);
  }
  const [runId] = pos;
  if (!runId || pos.length > 1)
    die('usage: node .github/scripts/hand-edit.mjs <run_id> --document "<path inside the run>" --what "<what changed>" --why "<why>" --by "<your name>"');
  const dir = join(RUNS_ROOT, runId);
  if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`${dir} has no RUN-STATE.md, so name a run that exists`);

  const missing = [['document', 'which document you changed'], ['what', 'what you changed'], ['why', 'why you changed it'], ['by', 'your name']]
    .filter(([k]) => !got[k]).map(([, words]) => words);
  if (missing.length)
    refuse([`The box${missing.length === 1 ? '' : 'es'} asking ${missing.length === 1 ? missing[0] : `${missing.slice(0, -1).join(', ')} and ${missing[missing.length - 1]}`} ` +
      `${missing.length === 1 ? 'was' : 'were'} empty. The account says which document changed, what changed and why, in the words of the person who changed it.`]);
  const impostor = namesProducer(got.by);
  if (impostor.length)
    refuse([`"${got.by}" names ${impostor.join(', ')}, which writes documents in this workflow. An edit recorded here is a person's, in their own name.`]);

  const found = resolveDocument(dir, got.document);
  if (found.problem) refuse([found.problem]);
  const { doc } = found;

  let state;
  try { state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'); }
  catch (e) { die(`the run record could not be read, so nothing was recorded: ${String(e.message).split('\n')[0]}`); }
  { const stopped = stoppedLine(runId, state); if (stopped) refuse([stopped]); }
  const n = Number(doc.stage);
  const stage = ((state && state.stages) || []).find(s => Number(s.id) === n);
  if (!stage) refuse([`${doc.rel} belongs to no stage on this run's record, and an edit is recorded on a stage's document.`]);
  const status = String(stage.status);
  const byStatus = statusRefusal(n, status);
  if (byStatus) refuse([`${doc.rel} is a document of stage ${n}. ${byStatus[0]}`, ...byStatus.slice(1)]);
  const written = scriptWritten(dir, doc);
  if (written) refuse(written);

  const before = readFileSync(doc.abs, 'utf8');
  const marked = markHuman(before);
  if (!marked) refuse([`${doc.rel} has no front matter yet, so it cannot be marked. Record the edit once the document is written in full.`]);

  const at = today();
  const account = join(dir, ACCOUNT_REL);
  mkdirSync(join(dir, 'notes'), { recursive: true });
  const prior = existsSync(account) ? readFileSync(account, 'utf8') : accountHeading(runId);
  const section = accountSection({ id: doc.id, rel: doc.rel, what: got.what, why: got.why, by: got.by, at, stage: n, status });
  writeFileSync(account, `${prior.replace(/\n*$/, '\n')}${section}`);
  if (marked.text !== before && !envelopeAtApproval(dir)) writeFileSync(doc.abs, marked.text);

  say(`Recorded: ${got.by} changed ${doc.rel} by hand, on ${shownDate(at)}.`);
  say(marked.was === 'human'
    ? `  It was already marked as changed by a person, and this edit is added to its account in ${ACCOUNT_REL}.`
    : `  It is marked modified_by: human, and the account of what changed and why is in ${ACCOUNT_REL}.`);
  if (status === 'in_review' || status === 'refined')
    say(`  Stage ${n} is waiting on a decision. When it is approved, its gate runs again first on the changed document, so the approval is given on what the gate checked.`);
  else if (status === 'q_failed')
    say(`  Stage ${n} did not pass its gate and is back with its agent, which works from the document as it now is.`);
  else
    say(`  Stage ${n} is ${RECORDED_AT[status]}, and its gate reads the document as it now is.`);

  const repeated = repeatedInPart(dir, doc);
  say('');
  if (repeated === null) say('This document has no records, so no record field can be out of step with it.');
  else if (!repeated.fields.length)
    say(`No record field repeats this document's text in part, so none can have been left out of step by a change to a passage it repeats` +
        `${repeated.whole === 1 ? ', and the one field it repeats word for word is in step with it' : repeated.whole ? `, and the ${repeated.whole} fields it repeats word for word are in step with it` : ''}. ` +
        'A passage rewritten or removed completely is not compared.');
  else {
    const { fields, whole } = repeated;
    say(`${fields.length} record field${fields.length === 1 ? '' : 's'} repeat${fields.length === 1 ? 's' : ''} this document's text in part. ` +
        `The checks read these fields from the record, so where your change falls in one of these passages, the record still says what the passage said before. ` +
        `Ask the agent for stage ${n} to compare ${fields.length === 1 ? 'it' : 'them'} with your change and bring the record in step:`);
    for (const f of fields.slice(0, 10)) say(`  ${f.field}, in ${f.record}, near "${f.opening}"`);
    if (fields.length > 10) say(`  and ${fields.length - 10} more.`);
    if (whole) say(whole === 1 ? 'The one field it repeats word for word is in step with it.' : `The ${whole} fields it repeats word for word are in step with it.`);
  }
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) main();

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, basename, sep } from 'node:path';
import { RUNS_ROOT, openRuns, runArtifacts, recordsFor, STAGE_DIRS, SUPPLIED_DIR, noOpenRunLine, runDirs, twoRunsRefusal } from './run-files.mjs';
import { suppliedFiles } from './material.mjs';
import { frontmatter } from './yaml.mjs';
import { resolveRole, headsUps, nearMissRole, rolesOn } from './decision-block.mjs';
import { readContracts, parkedArtifacts, standing, nextStageNeeds, needLines, carriedFacts } from './contracts.mjs';
import { OPENING_LEADS, inLanguage, changeLine } from './doc-structure.mjs';
import { frameOwed, framesAt } from './frame.mjs';
import { envelopeAtApproval } from './envelope.mjs';   // r1.16.1 · PC: stage 2's measurement is the approval's on 1.16.1
import { scripts as registeredScripts } from './operator.mjs';

import { GATES, QUALITY_GATES, DECISION_CARRIER, AGREEMENT_CARRIER, decisionsFor, recordedDecisions, skillsForStage,
         coveredBySignature, signatureLine, WAITS_ON_A_PERSON, PERSON_TASK, CHOICE_SOURCE, standingChoices,
         headingForId, selectedId, questionsFor, readJudgedVerdicts, stageWords, SIGN_OFF_TASK, staleRoutes,
         unsignableLines, folderRenamed, cannotSign, BUILD_FILE, signOffBoxLines, SIGN_OFF_CAUSE_WORDS,
         writtenFromChoice, signAgainLine, signedChecks, stoppedLine, refusedEntryLines, chosenSolution,
         contradictionsOf, contradictionSignOffs, entriesOf, signableAtGate, waitsOnThePersonWholly } from './gates.mjs';
import { selectedDocument, writeSelected, runLanguage } from './solution-join.mjs';
import { changedSinceGate, RECORDS_WORDS } from './content-seen.mjs';
import { needingChanges, unreadableFiles } from './run-readme.mjs';
import { gateFindings, failuresOf, aboutAccepted } from './findings.mjs';
import { czechQuestion, shownDate } from './fixed-messages.mjs';
import { messageLines, boxList, messageLanguage } from './messages.mjs';
import { deriveTrust, supportOf } from './trust.mjs';

const BY = 'check.mjs, run independently of the producer';

const say = m => console.log(m);

function withdrawnLines(names) {
  return (names || []).map(b =>
    `    ${b} was declared not read on this stage. It is read on this pass, so that gap no longer stands.`);
}
const die = m => { console.error(m); process.exit(2); };

function run(script, args) {
  try {
    return { code: 0, out: execFileSync('node', [join('.github', 'scripts', script), ...args],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) };
  } catch (e) { return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') }; }
}

function toRunning(runId, n, contracts) {
  const kh = knowHowFor(n, contracts);
  const args = ['stage', runId, String(n), 'running'];
  for (const k of kh) args.push('--know-how', k);
  const before = declaredGaps(runId, n);
  const khBefore = recordedKnowHow(runId, n);
  const r = run('run-state.mjs', args);
  const after = r.code ? before : declaredGaps(runId, n);
  return { r, kh, withdrawn: before.filter(b => !after.includes(b)), changed: r.code ? [] : movedLines(khBefore, recordedKnowHow(runId, n)) };
}

function recordedKnowHow(runId, n) {
  const p = join(RUNS_ROOT, runId, 'RUN-STATE.md');
  if (!existsSync(p)) return [];
  let st; try { st = frontmatter(readFileSync(p, 'utf8'), 'RUN-STATE.md'); } catch { return []; }
  const s = (st.stages || []).find(x => Number(x.id) === Number(n));
  return s && Array.isArray(s.know_how) ? s.know_how.map(String) : [];
}

export function movedLines(before, after) {
  const was = new Map((before || []).map(e => [String(e).split('@')[0], String(e).split('@').slice(1).join('@')]));
  return (after || []).map(String).filter(e => was.has(e.split('@')[0]) && was.get(e.split('@')[0]) !== e.split('@').slice(1).join('@'))
    .map(e => `    ${e.split('@')[0]} is recorded at ${e.split('@').slice(1).join('@') || 'no version'} now, where the stage read ${was.get(e.split('@')[0]) || 'no version'} before.`);
}

function declaredGaps(runId, n) {
  const p = join(RUNS_ROOT, runId, 'RUN-STATE.md');
  if (!existsSync(p)) return [];
  let st; try { st = frontmatter(readFileSync(p, 'utf8'), 'RUN-STATE.md'); } catch { return []; }
  return (st.know_how_not_read || [])
    .filter(w => w && Number(w.stage) === Number(n))
    .map(w => String(w.body || '').replace(/\.md$/, '').split('@')[0])
    .filter(Boolean);
}

function joinStopLines(out) {
  return ['  the join that brings A8 and A9 up to date from the parts stopped, so they may not carry what the parts say. It said:',
          ...String(out || '').split('\n').filter(x => x.trim()).map(l => `    ${l.trim()}`)];
}

function carrierLines(runId, gateIds) {
  const dir = join(RUNS_ROOT, runId);
  const arts = runArtifacts(dir);
  return gateIds.map(id => {
    const aid = DECISION_CARRIER[id];
    if (!aid) return `  ${id} — no artifact is declared as its carrier.`;
    const a = arts.find(x => x.id === aid);
    const later = WAITS_ON_A_PERSON[aid];
    const chooseIn = a && later && later.after === 'choice' && arts.find(x => x.id === later.from);
    if (chooseIn && !standingChoices(frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'), later.stage).length)
      return `  ${id} — read ${join(dir, chooseIn.rel)} (${chooseIn.id}): you choose one of its ${CHOICE_SOURCE[later.stage].entries}, and ${aid} expands the one you choose`;
    if (a) return `  ${id} — read ${join(dir, a.rel)} (${aid})`;
    const src = later && later.after === 'approval' && arts.find(x => x.id === later.from);
    if (src) return `  ${id}: read ${join(dir, src.rel)} (${src.id}); ${aid} is written by the workflow when you approve`;
    return `  ${id} — its carrier ${aid} is not on disk. That is a fault; do not sign over a missing document.`;
  });
}

function personOnRecord(state) {
  const p = state && state.person;
  return p && String(p.name || '').trim() ? { name: String(p.name).trim(), role: String(p.role || '').trim() } : null;
}
function choiceBoxLines(state = null) {
  const p = personOnRecord(state);
  return [
    '  1. What kind: choice',
    '  2. Which one you chose: its id, as the document shows it',
    '  3. Why you chose it, in your own words',
    p ? `  4. Your name. This run records ${p.name}; type it as the record spells it.` : '  4. Your name',
    p && p.role ? `  5. The role you decided in. Leave it empty to keep ${p.role}, the role this run records for you.` : '  5. The role you decided in',
  ];
}

function choiceOrderLines(state, n) {
  const writesAtApproval = Object.values(WAITS_ON_A_PERSON).some(w => w.after === 'approval' && Number(w.stage) === Number(n));
  const expandsChoice = writtenFromChoice(n).some(id => WAITS_ON_A_PERSON[id].after === 'choice');
  if (!writesAtApproval && !expandsChoice) return [];
  const chosen = standingChoices(state, n);
  if (!chosen.length) return [
    'Before you approve, record which one you choose and why with "SPOCK: record a decision I made". It opens five boxes:',
    ...choiceBoxLines(state),
    'Escape cancels and records nothing.',
    'Then approve with "SPOCK: approve what is in front of me".',
  ];
  if (!writesAtApproval) return [];
  if (chosen.length === 1)
    return [`You chose ${selectedId(chosen[0].selection) || 'nothing the set names'} on ${shownDate(chosen[0].at)}. Approve with "SPOCK: approve what is in front of me".`];
  return [
    `Stage ${n} records ${chosen.length} standing choices (${chosen.map(c => `${selectedId(c.selection) || 'none'} on ${shownDate(c.at)}`).join(', ')}), and the document can carry one reason.`,
    'Replace the one that no longer stands with "SPOCK: replace a decision that no longer stands", then approve with "SPOCK: approve what is in front of me".',
  ];
}

function approvalLines(orderLines, state = null, st = null, n = null) {
  if (orderLines.length) return [];
  const p = personOnRecord(state);
  const gate = n != null ? (GATES[Number(n)] || {}).quality : null;
  const asks = gate ? questionsFor(gate, st && st.quality_gate && st.quality_gate.run_at).length : 0;
  const jh = st && st.judged_half;
  const stands = asks && jh && Array.isArray(jh.verdicts) && jh.verdicts.length;
  return [
    'Approve with "SPOCK: approve what is in front of me". It opens four boxes:',
    p ? `  1. Your name. This run records ${p.name}; type it as the record spells it.` : '  1. Your name, which the record will carry',
    p && p.role ? `  2. The role you decide in. Leave it empty to keep ${p.role}, the role this run records for you.` : '  2. The role you are deciding in',
    !asks ? "  3. Answers to this gate's questions: it asks none, so leave it empty"
      : stands ? "  3. Your answers to this gate's questions: they are on the record, so leave it empty"
      : "  3. Your answers to this gate's questions, optional: leave it empty to skip them",
    '  4. What you asked to be changed before approving, in your own words. Optional: leave it empty if nothing.',
    'Escape cancels and records nothing.',
  ];
}

export function answersRead(st, n, typed, lang = 'en') {
  const gate = (GATES[Number(n)] || {}).quality;
  const qs = gate ? questionsFor(gate, st && st.quality_gate && st.quality_gate.run_at) : [];
  const t = String(typed == null ? '' : typed).trim();
  const lead = 'Nothing you typed was recorded: not your name, your role or your answers.';
  if (!qs.length)
    return t ? { refusal: [lead, `Box 3 reads "${t}", and stage ${n}'s gate asks no questions. Leave box 3 empty and run the approval again.`] } : {};
  const jh = st && st.judged_half;
  if (jh && Array.isArray(jh.verdicts) && jh.verdicts.length) return { stands: jh };
  if (!readJudgedVerdicts(t, qs, qs[0].plain).refusal) return { qs, typed: t };
  const k = qs.length;
  const example = qs.map((_, i) => `${i + 1}${['y', '?', 'n'][i % 3]}`).join(' ');
  return { refusal: [lead, `Box 3 reads "${t}", and this gate asks ${k} question${k === 1 ? '' : 's'}:`,
    ...qs.map((q, i) => `  ${i + 1}. ${(lang === 'cs' && q.plain && czechQuestion(q.text)) || q.text}`),
    `Answer each with y, n or ?, numbered as in "${example}". ${qs[0].plain ? 'Leave a number out to skip that question, or leave the box' : 'Leave the box'} ` +
      'empty to skip them all. Then run the approval again.'] };
}

export const STOP_ORDER = ['refused', 'stop', 'headsUp', 'boxes', 'after'];
export function stopLines(parts) {
  const unplaced = Object.keys(parts).filter(k => !STOP_ORDER.includes(k));
  if (unplaced.length) throw new Error(`advance: the stop has no place for ${unplaced.join(', ')}; add it to STOP_ORDER`);
  return STOP_ORDER.flatMap(k => parts[k] || []);
}
export function refusedFor(runId, handed = process.env.SPOCK_UNRECORDED) {
  try {
    const u = JSON.parse(handed || 'null');
    return u && Array.isArray(u.lines) && (!u.runId || String(u.runId) === String(runId)) ? refusedEntryLines(u.lines) : [];
  } catch { return []; }
}

const messagePrinted = lines => !(lines.length === 1 && /^No message is printed/.test(lines[0]));
const choiceFirst = order => order.some(l => l.startsWith('Before you approve, record which one you choose'));
const questionsOwed = (st, n) => {
  const gate = (GATES[Number(n)] || {}).quality;
  const jh = st && st.judged_half;
  return !!(gate && decisionsFor(n).length && questionsFor(gate, st && st.quality_gate && st.quality_gate.run_at).length)
    && !(jh && Array.isArray(jh.verdicts) && jh.verdicts.length);
};
function personLines(runId, n, p, absorbed = false) {
  const L = [`\n${runId}: stage ${n} is running, and what is left waits on you rather than on the agent.`, `${p.id} ${p.why}.`];
  if (absorbed)
    L.push(p.after === 'choice' ? `Once the choice is recorded, the agent writes ${p.id} and this moves again.`
      : 'Once the draft is marked agreed, the workflow writes the agreed PRD from the draft, and this moves again.');
  else if (p.after === 'choice')
    L.push(`Record which one you choose with "${PERSON_TASK.choice}". It opens five boxes:`, ...choiceBoxLines(),
           `Escape cancels and records nothing. Then the agent writes ${p.id} and this moves again.`);
  else if (p.after === 'agreement')
    L.push(`Mark the draft agreed with "${PERSON_TASK.agreement}". It opens one box:`, '  1. Who decided it: your name',
           `Escape cancels and records nothing. Then the workflow writes the agreed PRD from the draft, and this moves again.`);
  return L;
}

export function waitingMessage(dir, state, st, n, p = null) {
  const lang = messageLanguage(dir) || 'en';
  const arts = runArtifacts(dir);
  const at = id => { const a = arts.find(x => x.id === id); return a ? join(dir, a.rel) : null; };
  let kind, doc;
  if (p) { kind = p.after; doc = (WAITS_ON_A_PERSON[p.id] || {}).from; }
  else {
    const needsChoice = choiceOrderLines(state, n).some(l => l.startsWith('Before you approve, record which one you choose'));
    kind = needsChoice ? 'choice' : 'approval';
    const carrier = DECISION_CARRIER[decisionsFor(n)[0]];
    const w = WAITS_ON_A_PERSON[carrier];
    doc = w && (w.after === 'approval' || needsChoice) ? w.from : carrier;
  }
  const gate = (GATES[Number(n)] || {}).quality;
  const asks = gate ? questionsFor(gate, st && st.quality_gate && st.quality_gate.run_at).length : 0;
  const jh = st && st.judged_half;
  const stands = !!(asks && jh && Array.isArray(jh.verdicts) && jh.verdicts.length);
  const task = kind === 'approval' ? 'SPOCK: approve what is in front of me' : PERSON_TASK[kind];
  return messageLines(dir, 'waiting', { stage: n, decision: true, task, document: doc, path: at(doc),
    boxes: boxList(kind, lang, { person: personOnRecord(state), asks, stands }), questions: kind === 'approval' && !!asks && !stands });
}

export function reviewMessage(dir, state, st, n) {
  const lang = messageLanguage(dir) || 'en';
  const arts = runArtifacts(dir);
  const at = id => { const a = arts.find(x => x.id === id); return a ? join(dir, a.rel) : null; };
  if (Number(n) === 6) return messageLines(dir, 'prdLast', { stage: n, path: at('A13') });
  const needsChoice = choiceOrderLines(state, n).some(l => l.startsWith('Before you approve, record which one you choose'));
  const carrier = DECISION_CARRIER[decisionsFor(n)[0]];
  const w = WAITS_ON_A_PERSON[carrier];
  const doc = w && (w.after === 'approval' || needsChoice) ? w.from : carrier;
  const gate = (GATES[Number(n)] || {}).quality;
  const asks = gate ? questionsFor(gate, st && st.quality_gate && st.quality_gate.run_at).length : 0;
  const jh = st && st.judged_half;
  const stands = !!(asks && jh && Array.isArray(jh.verdicts) && jh.verdicts.length);
  const person = personOnRecord(state);
  const step = kind => ({ kind, task: kind === 'approval' ? 'SPOCK: approve what is in front of me' : PERSON_TASK[kind], boxes: boxList(kind, lang, { person, asks, stands }) });
  return messageLines(dir, 'review', { stage: n, document: doc, path: at(doc), steps: needsChoice ? [step('choice'), step('approval')] : [step('approval')] });
}

export function acceptedLastLine(state) {
  const accepted = ((state && state.stages) || []).map(s => ({ ...s, id: Number(s.id) }))
    .filter(s => s.status === 'accepted').sort((a, b) => a.id - b.id);
  const last = accepted[accepted.length - 1];
  if (!last) return null;
  const decisions = recordedDecisions(last).filter(d => d && String(d.decided_by || '').trim());
  const d = decisions[decisions.length - 1];
  if (d) return `Stage ${last.id} was accepted last, decided by ${d.decided_by} on ${shownDate(d.decided_at)}.`;
  if (decisionsFor(last.id).length) return `Stage ${last.id} was accepted last, and its record names nobody who decided it.`;
  const ran = last.quality_gate && last.quality_gate.run_at;
  return `Stage ${last.id} was accepted last. It takes no decision from a person${ran ? `, and its gate ran on ${ran}` : ''}.`;
}

export function questionLines(state, st, n, lang = 'en') {
  const gate = (GATES[Number(n)] || {}).quality;
  const qs = gate ? questionsFor(gate, st && st.quality_gate && st.quality_gate.run_at) : [];
  const k = qs.length;
  if (!k) return [];
  const noun = k === 1 ? 'question' : 'questions';
  const decides = decisionsFor(n).length > 0;
  if (!decides) return [];
  const jh = st && st.judged_half;
  if (jh && Array.isArray(jh.verdicts) && jh.verdicts.length)
    return [`Your answers to this gate's ${k} ${noun} are on the record, from ${jh.by} on ${shownDate(jh.at)}. Leave box 3 empty.`];
  const them = k === 1 ? 'it' : 'them';
  const example = qs.map((_, i) => `${i + 1}${['y', '?', 'n'][i % 3]}`).join(' ');
  const bare = qs.map((_, i) => ['y', '?', 'n'][i % 3]).join(' ');
  return [
    `This gate also asks you ${k} ${noun} no check can answer. Answering is optional and holds nothing up:`,
    ...qs.map((q, i) => `  ${i + 1}. ${(lang === 'cs' && q.plain && czechQuestion(q.text)) || q.text}`),
    `Answer ${them} in box 3 of the approval: y for yes, n for no, ? if you cannot tell, one per question in the order above, ` +
      `as in "${example}", or "${bare}". Leave the box empty to skip ${them}${k > 1 ? ', or leave a number out to skip that question' : ''}; ` +
      'a skipped question is recorded as skipped.',
  ];
}

export function carriedLines(dir, n, lang = runLanguage(dir)) {
  const cs = lang === 'cs';
  const { facts, changes } = carriedFacts(dir, n, { lang: cs ? 'cs' : 'en' });
  const src = f => (f.stage === 1 ? (cs ? 'zadání' : 'brief') : f.stage === 2 ? 'G2' : String(f.from));
  return [
    ...(facts.length ? [inLanguage(OPENING_LEADS.carried, lang), ...facts.map(f => `  ${cs ? f.cs : f.label} (${src(f)}): ${f.value}`)] : []),
    ...(changes.length ? [inLanguage(OPENING_LEADS.changed, lang), ...changes.map(ch => `  ${changeLine(cs ? 'cs' : 'en')(ch).slice(2)}`)] : []),
  ];
}

export function reviewWaitLines(runId, state, st, n, { contracts = readContracts(), dir = join(RUNS_ROOT, runId), absorbed = null } = {}) {
  const signed = new Set(recordedDecisions(st).map(d => d.id));
  const pending = decisionsFor(n).filter(id => !signed.has(id));
  const order = choiceOrderLines(state, n);
  return stopLines({
    refused: refusedFor(runId),
    stop: [`\n${runId} — stage ${n} is waiting on you at ${pending.join(' and ') || decisionsFor(n).join(' and ')}.`,
           ...carriedLines(dir, n),
           ...(absorbed ? [] : carrierLines(runId, pending.length ? pending : decisionsFor(n))),
           ...(Number(n) === 2 ? [...supportLines(runId), ...contradictionLines(runId, state)] : [])],
    headsUp: needLines(nextStageNeeds(contracts, n, dir), 'stop'),
    boxes: absorbed ? (choiceFirst(order) ? [] : order) : [...order, ...approvalLines(order, state, st, n)],
    after: [...(absorbed && absorbed.questions ? [] : questionLines(state, st, n, runLanguage(dir))),
            `Nothing else moves until you decide. The rest of the chain: ${join(RUNS_ROOT, runId, 'README.md')}.`],
  });
}

export function waitsLines() {
  let open;
  try { open = openRuns(); } catch { return []; }
  if (open.length !== 1) return [];
  const dir = open[0], runId = basename(dir);
  let state;
  try { state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'); } catch { return []; }
  const n = Number(state.current_stage);
  const st = (state.stages || []).find(s => Number(s.id) === n);
  if (!st || !GATES[n]) return [];
  if (st.status === 'in_review') {
    const msg = waitingMessage(dir, state, st, n);
    return [...reviewWaitLines(runId, state, st, n, messagePrinted(msg) ? { absorbed: { questions: !choiceFirst(choiceOrderLines(state, n)) && questionsOwed(st, n) } } : {}), ...msg];
  }
  if (st.status !== 'running') return [];
  const have = new Map();
  for (const a of runArtifacts(dir)) (have.get(Number(a.stage)) || have.set(Number(a.stage), new Set()).get(Number(a.stage))).add(a.id);
  const now = standing(state, have, readContracts(), parkedArtifacts());
  if (now.agent.length || !now.person.length || needingChanges(dir).length) return [];
  const msg = waitingMessage(dir, state, st, n, now.person[0]);
  return [...personLines(runId, n, now.person[0], messagePrinted(msg)), ...msg];
}

function listOn(dir, id, field) {
  const doc = runArtifacts(dir).find(a => a.id === id);
  try {
    const fm = doc ? frontmatter(readFileSync(doc.abs, 'utf8'), doc.rel) : null;
    if (fm && Array.isArray(fm[field])) return fm[field];
  } catch {  }
  const out = [];
  for (const r of recordsFor(dir, id)) {
    try { const fm = frontmatter(readFileSync(r.abs, 'utf8'), r.rel); if (fm && Array.isArray(fm[field])) out.push(...fm[field]); } catch {  }
  }
  return out;
}

export function supportLines(runId) {
  const dir = join(RUNS_ROOT, runId);
  const hyps = listOn(dir, 'A3', 'hypotheses').filter(h => h && typeof h === 'object');
  if (!hyps.length) return [];
  const obs = listOn(dir, 'A2b', 'observations').filter(o => o && typeof o === 'object').map(o => ({
    id: o.id, ref: o.ref, origin_key: o.origin_key, proximity: o.proximity, provenance_complete: o.provenance_complete === true,
  }));
  const n = (k, one, many = `${one}s`) => `${k} ${k === 1 ? one : many}`;
  const restsOn = ev => {
    if (!ev.length) return 'no observation cited';
    const s = supportOf(obs, ev);
    if (!s.cited.length) return 'no intake observation carries what it cites';
    if (!s.qualifying.length) return `${n(s.cited.length, 'observation')} cited, none with complete provenance`;
    const q = s.qualifying.length;
    const witness = s.firstHand === 0 ? 'none first-hand' : q === 1 ? 'first-hand' : `${s.firstHand} first-hand`;
    const rest = s.cited.length - q;
    return `${n(q, 'observation')} from ${n(s.origins.length, 'origin')}, ${witness}` +
      (rest ? `, and ${rest} more cited without complete provenance` : '');
  };
  return ['What each hypothesis rests on, counted from the intake record:',
    ...hyps.map(h => {
      const ev = Array.isArray(h.evidence) ? h.evidence : [];
      return `  ${h.id || '(unnamed)'} ${deriveTrust(obs, ev)} · ${restsOn(ev)}`;
    })];
}

export function contradictionLines(runId, state) {
  const dir = join(RUNS_ROOT, runId);
  const ks = contradictionsOf({ contradictions: listOn(dir, 'A3', 'contradictions') }).filter(k => k.id);
  if (!ks.length) return [];
  const docs = runArtifacts(dir).filter(a => Number(a.stage) === 2);
  const { signOffs } = contradictionSignOffs(state, 2);
  const shortened = s => { const w = String(s).replace(/\s+/g, ' ').trim().split(' '); return w.length > 3 ? `${w.slice(0, 3).join(' ')}…` : w.join(' '); };
  return ['Contradictions the agent found in this stage\'s own documents:', ...ks.map(k => {
    const doc = docs.find(a => String(a.id) === k.document);
    const file = doc ? basename(doc.rel) : k.document;
    if (k.resolution === 'corrected') return `  ${k.id} corrected · ${file} no longer says "${shortened(k.claim)}"`;
    const d = signOffs.filter(x => entriesOf(x).includes(k.id)).pop();
    return d ? `  ${k.id} kept · signed off by ${d.by}: ${d.reason || d.what}`
      : `  ${k.id} open · ${file} says "${shortened(k.claim)}", and stage 2 waits on your decision: have it corrected, or keep it with your reason`;
  })];
}

function agentDisplayName(id) {
  const f = join('.github', 'registry', 'agents.yaml');
  if (!existsSync(f)) return null;
  const re = new RegExp(`^\\s*- id:\\s*${id}\\s*$([\\s\\S]*?)(?=^\\s*- id:|^[a-z_]+:)`, 'm');
  const m = re.exec(readFileSync(f, 'utf8'));
  return m ? (/^\s*name:\s*"?([^"\n#]+?)"?\s*$/m.exec(m[1]) || [])[1] || null : null;
}

function knowHowFor(stage, contracts) {
  const skillsText = existsSync(join('.github', 'registry', 'skills.yaml'))
    ? workflowText(join('.github', 'registry', 'skills.yaml')) : '';
  const wanted = new Set([...(contracts.skills.get(stage) || []), ...skillsForStage(stage)]);
  const bodies = new Set();
  for (const m of skillsText.matchAll(/^  - id:\s*(\S+)\s*\n([\s\S]*?)(?=^  - id:|(?![\s\S]))/gm)) {
    if (!wanted.has(m[1])) continue;
    const kh = m[2].match(/^    know_how:\s*\n([\s\S]*?)(?=^    \w|(?![\s\S]))/m);
    if (kh) for (const line of kh[1].split('\n')) {
      const hit = line.match(/^\s*-\s+(\S+\.md)/);
      if (hit) bodies.add(hit[1]);
    }
  }
  const out = [];
  for (const path of [...bodies].sort()) {
    if (!existsSync(path)) continue;
    const v = readFileSync(path, 'utf8').match(/^\*\*Version:\*\*\s*(\S+)/m);
    out.push(`${basename(path, '.md')}@${v ? v[1] : '0.0'}`);
  }
  return out;
}

export function startBegunRuns() {
  const started = [];
  for (const name of (existsSync(RUNS_ROOT) ? readdirSync(RUNS_ROOT) : [])) {
    const d = join(RUNS_ROOT, name);
    if (!/^\d{4}-\d{2}-[a-z0-9-]+$/.test(name)) continue;
    if (existsSync(join(d, 'RUN-STATE.md'))) continue;
    let holds = false;
    try { holds = readdirSync(d).some(x => x !== 'README.md'); } catch { holds = false; }
    if (!holds) continue;
    const r = run('run-state.mjs', ['init', name]);
    if (r.code) die(`${d} holds work and no record, and it could not be started — ${r.out.trim()}`);
    started.push(name);
  }
  return started;
}

function pickRun(arg, approving = false) {
  if (arg) {
    const d = join(RUNS_ROOT, arg);
    if (!existsSync(join(d, 'RUN-STATE.md'))) die(`advance: ${d} has no RUN-STATE.md — start it with \`run-state.mjs init ${arg}\``);
    const stopped = stoppedLine(arg, frontmatter(readFileSync(join(d, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'));
    if (stopped) { say(`\n${stopped}`); process.exit(3); }
    return d;
  }
  for (const started of startBegunRuns()) say(`  started ${started} — it held work and no record`);

  const open = openRuns();
  if (open.length === 1) return open[0];
  const finished = open.length ? null : noOpenRunLine();
  if (finished && approving) {
    say(`\nNothing you typed was recorded. ${finished}, so there was nothing left to approve.`);
    process.exit(3);
  }
  if (finished) {
    const owes = runDirs(RUNS_ROOT).map(d => {
      try { return [basename(d), signAgainLine(frontmatter(readFileSync(join(d, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'))]; }
      catch { return [basename(d), null]; }
    }).filter(([, line]) => line);
    say(owes.length ? `${finished}. ` + owes.map(([id, line]) => (owes.length > 1 ? `In ${id}, ${line}.` : `${line}.`)).join(' ')
      : `${finished}, so there is nothing left to move.`);
    process.exit(0);
  }
  if (!open.length) die(`advance: there is no unfinished run under ${RUNS_ROOT}. If a document is written, run "SPOCK: fill in the envelope", which starts a run that holds work and has no record.`);
  die(twoRunsRefusal(open, RUNS_ROOT));
}

if (!process.argv[1] || resolve(fileURLToPath(import.meta.url)) !== resolve(process.argv[1]))
  {  } else { main(); }

function main() {
const argv = process.argv.slice(2);
if (argv.includes('--waits')) { for (const l of waitsLines()) say(l); process.exit(0); }
const approve = argv.includes('--approve');
const byIdx = argv.indexOf('--by');
const roleIdx = argv.indexOf('--role');
const ownerIdx = argv.indexOf('--owner');
const ownerRoleIdx = argv.indexOf('--owner-role');
const answersIdx = argv.indexOf('--answers');
const askedIdx = argv.indexOf('--asked');
const valueOf = i => (i !== -1 ? String(argv[i + 1] ?? '').trim() : '');
const takesValue = new Set([byIdx, roleIdx, ownerIdx, ownerRoleIdx, answersIdx, askedIdx].filter(i => i !== -1).map(i => i + 1));
const positional = argv.filter((a, i) => !a.startsWith('--') && !takesValue.has(i));
const statedRole = valueOf(roleIdx);
const statedOwner = valueOf(ownerIdx);
const statedOwnerRole = valueOf(ownerRoleIdx);
const statedAnswers = valueOf(answersIdx);
const statedAsked = valueOf(askedIdx);
let who = byIdx !== -1 ? argv[byIdx + 1] : null;
if (approve && byIdx !== -1 && !String(who || '').trim())
  die('advance: nothing was typed in the box. **A stage is accepted by a person, and nobody signed this one.** ' +
      'Run it again and type your name, or leave the stage where it is.');
if (approve && !who) die('advance: --approve needs --by "<your name>". A stage is accepted by a named person, ' +
  'and none was named. Approve it with the task "SPOCK: approve what is in front of me", which asks for your name.');
const dir = pickRun(positional[0], approve);
const runId = basename(dir);
const contracts = readContracts();
let handedOff = false;
const handOffLines = n => { handedOff = true; return messageLines(dir, GATES[n + 1] ? 'accepted' : 'finished', { stage: n, contracts }); };
const PARKED = parkedArtifacts();
const staged = registeredScripts().filter(s => s.stage);

let moved = 0;
let approvalUsed = false, stoppedAt = null;
let personWait = false, personAct = null;
let materialWait = false;
let regated = null;
let joinStopped = null;
const returned = new Set();
let unread = null;
const readWhole = new Set();
const inWords = xs => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0]);
function unreadable(n) {
  if (readWhole.has(n)) return [];
  const files = unreadableFiles(join(RUNS_ROOT, runId), GATES[n].quality);
  if (!files.length) readWhole.add(n);
  return files;
}
function unreadStop(n, files) {
  const q = GATES[n].quality, names = inWords(files.map(f => f.rel));
  const who = agentDisplayName((contracts.agents.get(n) || [])[0]) || 'The agent for this stage';
  say(`\n${runId} — stage ${n} cannot be checked: the checker could not read ${names}, so ${q} records nothing, and the result recorded before is not taken in its place.`);
  for (const f of files) say(`  ${f.rel}: ${f.why}`);
  say(`${who} changes ${files.length === 1 ? 'that file so it reads' : 'those files so they read'}, and "SPOCK: check what is written, then continue" runs ${q} again. ` +
      `Nothing is asked of you until then.`);
  unread = { stage: n, names };
}
{
  const started = String(frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md').build || '').trim();
  const now = existsSync(BUILD_FILE) ? readFileSync(BUILD_FILE, 'utf8').trim() : '';
  if (started && now && started !== now)
    say(`Heads-up: this run was started on build ${started}, and the workflow is now build ${now}, so its later stages may work ` +
        `differently from its earlier ones. Nothing about the run is changed for it.`);
}
for (let guard = 0; guard < 40; guard++) {
  const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
  const stages = (state.stages || []).map(s => ({ ...s, id: Number(s.id) })).sort((a, b) => a.id - b.id);
  const st = stages.find(s => s.status !== 'accepted');
  stoppedAt = st ? st.id : null;

  if (!st) { say(`\n${runId} is complete — all ${stages.length} stages accepted.`); break; }
  const n = st.id;
  const gate = GATES[n] || {};

  if (st.status === 'pending') {
    const { r, kh, withdrawn, changed } = toRunning(runId, n, contracts);
    if (r.code) die(r.out.trim());
    say(`  stage ${n} running`);
    if (kh.length) say(`    its record names ${kh.join(', ')}`);
    for (const l of changed) say(l);
    for (const l of withdrawnLines(withdrawn)) say(l);
    moved++; continue;
  }

  if (st.status === 'running') {
    const have = new Map();
    for (const a of runArtifacts(dir)) (have.get(Number(a.stage)) || have.set(Number(a.stage), new Set()).get(Number(a.stage))).add(a.id);
    const now = standing(state, have, contracts, PARKED);
    const { owed, excused, atAcceptance } = now;
    const waits = now.agent.length + now.person.length;
    if (excused.length && !waits)
      say(`  stage ${n} is not asked for ${excused.join(', ')} — the only skill producing it is parked`);
    if (atAcceptance.length && !waits)
      say(`  stage ${n} does not wait on ${atAcceptance.join(', ')}: the workflow writes it when you approve the stage`);
    if (now.agent.length) {
      say(`\n${runId} — stage ${n} is running and has not been written yet.`);
      say(`Waiting on ${now.agent.join(', ')} in ${join(RUNS_ROOT, runId, STAGE_DIRS[n - 1])}${sep}.`);
      if (!(have.get(n) || new Set()).size && !framesAt(dir, n).length)
        for (const id of now.agent) {
          const f = frameOwed(dir, id, have, contracts);
          if (f) { say(f.line.replace(/^\s+/, '')); break; }
        }
      for (const l of now.later) say(`After ${l.from}, ${l.id} waits on you: it ${l.why}. Nothing is asked of you yet.`);
      if (n === 2 && !suppliedFiles(dir).length) {
        materialWait = true;
        say(`${now.agent.length === 1 ? 'It is' : 'They are'} written from the problem material, which only you can supply, as files in ` +
            `${join(RUNS_ROOT, runId, STAGE_DIRS[1], SUPPLIED_DIR)}${sep}. Put them there, then invoke the agent for this stage.`);
      } else say(`Invoke the agent for this stage, then run this again.`);
      if (!handedOff && !have.get(n)) for (const l of messageLines(dir, n === 3 ? 'market' : 'opening', { stage: n, contracts })) say(l);
      break;
    }
    if (now.person.length) {
      const needs = needingChanges(dir);
      if (needs.length) {
        const agentName = agentDisplayName((contracts.agents.get(n) || [])[0]) || 'The agent for this stage';
        const listed = needs.length > 1 ? `${needs.slice(0, -1).join(', ')} and ${needs[needs.length - 1]}` : needs[0];
        say(`\n${runId} — stage ${n} is running, and what it has written still needs changes before anything is asked of you.`);
        say(`${agentName} changes ${listed} first: the checks still object to ${needs.length === 1 ? 'it' : 'them'}, ` +
            `and "SPOCK: check what is written, then continue" says what. Nothing is asked of you until then.`);
        break;
      }
      if (now.person[0].after === 'agreement') {
        const r = run('run-state.mjs', ['seen', runId, String(n)]);
        if (r.code) die(r.out.trim());
      }
      const waiting = waitingMessage(dir, state, st, n, now.person[0]);
      for (const l of stopLines({ refused: refusedFor(runId), stop: personLines(runId, n, now.person[0], messagePrinted(waiting)) })) say(l);
      for (const l of waiting) say(l);
      personWait = true; personAct = now.person[0].after;
      break;
    }
    const args = ['stage', runId, String(n), 'produced'];
    for (const id of owed) args.push('--artifact', id);
    for (const kh of knowHowFor(n, contracts)) args.push('--know-how', kh);
    const gapsBefore = declaredGaps(runId, n);
    const khBefore = recordedKnowHow(runId, n);
    const r = run('run-state.mjs', args);
    if (r.code) die(r.out.trim());
    say(`  stage ${n} produced ${owed.join(', ')}`);
    const gapsAfter = declaredGaps(runId, n);
    for (const l of movedLines(khBefore, recordedKnowHow(runId, n))) say(l);
    for (const l of withdrawnLines(gapsBefore.filter(b => !gapsAfter.includes(b)))) say(l);
    moved++; continue;
  }

  if (st.status === 'produced') {
    let joinStop = null;
    for (const s of staged.filter(s => s.stage === n)) {
      const script = basename(s.path);
      const shape = String(s.args || '');
      const a = shape.includes('{runs_root}') ? [join(RUNS_ROOT, runId), '--write']
              : shape.includes('<run_id>') ? [runId, '--write'] : ['--write'];
      const r = run(script, a);
      say(r.code ? `  ! ${script} exited ${r.code}` : `  ran ${script}`);
      if (r.code && script === 'solution-join.mjs') joinStop = r.out;
    }
    if (joinStop !== null) {
      for (const l of joinStopLines(joinStop)) say(l);
      const back = agentDisplayName((contracts.agents.get(n) || [])[0]) || 'The agent for this stage';
      say(`\n${runId} — stage ${n} is not put to you while its solution set cannot be assembled from the parts, so ${gate.quality} has not run.`);
      say(`${back} does what the join names above, and "SPOCK: check what is written, then continue" then runs ${gate.quality}. ` +
          `Nothing is asked of you until then.`);
      joinStopped = n;
      break;
    }
    if (n === 2 && !envelopeAtApproval(dir)) {
      const m = run('problem-material.mjs', [runId, '--measure']);
      const said = m.out.trim().split('\n')[0] || '';
      if (m.code) { say('  ! problem-material.mjs exited ' + m.code); say(`    ${said}`); }
      else if (/ measured \d+ item/.test(said)) say(`  ${said.slice(said.indexOf('measured'))}`);
    }
    {
      const before = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
      const wide = ((before && before.decisions) || [])
        .filter(d => d && String(d.kind) === 'exception' && !d.superseded_by && signedChecks(d).length > 1
          && GATES[Number(d.stage)]);
      for (const d of wide) {
        const probe = gateFindings(join(RUNS_ROOT, runId), GATES[Number(d.stage)].quality);
        if (!probe.complete || (probe.code !== 0 && probe.code !== 1)) continue;
        const failing = new Set(probe.failed.map(String));
        const named = signedChecks(d);
        const drop = named.filter(c => !failing.has(c)), rest = named.filter(c => failing.has(c));
        if (!drop.length || !rest.length) continue;
        const w = run('run-state.mjs', ['decide', runId, String(d.stage), '--kind', 'exception', '--narrow', d.at,
          '--drop', drop.join(',')]);
        if (w.code !== 0) { say(`  ! the sign-off of ${named.join(', ')} on stage ${d.stage} could not be narrowed: ${w.out.trim().split('\n')[0]}`); continue; }
        say(`Stage ${d.stage}'s sign-off of ${named.join(', ')} now covers ${rest.join(', ')} only: ${drop.join(', ')} ` +
            `${drop.length === 1 ? 'passes' : 'pass'} on this run. ${d.by}'s signature on ${rest.join(', ')} stands, and nothing is asked of you.`);
      }
    }
    const view = gateFindings(join(RUNS_ROOT, runId), gate.quality);
    if (!view.complete && view.code !== 2) {
      say(`\n${runId} — ${gate.quality} could not be read to the end (${view.why || 'its answer was cut short'}), so nothing was recorded and the stage has not moved.`);
      say('"SPOCK: run one gate" shows what it says.');
      break;
    }
    const g = run('check.mjs', [join(RUNS_ROOT, runId), '--gate', gate.quality, '--record', '--by', BY]);
    const cannotRead = g.code === 2 ? view.unread : [];
    if (cannotRead.length) { unreadStop(n, cannotRead); break; }
    const recordedNow = /^Recorded, not retyped: /m.test(g.out);
    if (recordedNow) readWhole.add(n);
    const refused = !recordedNow && /^the writer refused the record: ([^\n]*(?:\n(?!\n)[^\n]*)*)/m.exec(g.out);
    if (refused) {
      say(`\n${runId} — ${gate.quality} ran on stage ${n}, and the run record refused its result, so nothing was recorded and the stage has not moved. The record said:`);
      for (const l of refused[1].split('\n').filter(x => x.trim())) say(`  ${l.trim()}`);
      say(`${approve ? 'Nothing you typed was recorded either. ' : ''}This is a fault in the run, and neither you nor the agent can fix it: ` +
          `tell whoever maintains the workflow, and send them this output.`);
      process.exit(2);
    }
    let signedPast = null;
    if (g.code && recordedNow) {
      const afterState = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
      const sAfter = (afterState.stages || []).map(x => ({ ...x, id: Number(x.id) })).find(x => x.id === n);
      if (sAfter && sAfter.status === 'produced' && sAfter.quality_gate
          && sAfter.quality_gate.result === 'fail' && coveredBySignature(afterState, sAfter))
        signedPast = signatureLine(afterState, sAfter);
    }
    if (g.code && !signedPast) {
      say(`\n${runId} — ${gate.quality} did not pass.\n`);
      const fails = g.out.split('\n').filter(l => /FAIL|INCOMPLETE|incomplete/.test(l));
      say(fails.slice(0, 12).join('\n') || g.out.trim().slice(0, 900));
      const ac = AGREEMENT_CARRIER[n];
      const markMissing = ac && new RegExp(`${ac.agreed} absent|carries no agreement block|agreement block has no (?:name|date)` +
        `|${ac.agreed} differs from ${ac.draft}|the agreed PRD is this draft with the agreement added, and the two no longer carry` +
        `|the agreed PRD's text is not this draft word for word`);
      if (ac && failuresOf(view).some(f => markMissing.test(f.detail))) {
        say(`\n${ac.agreed} is agreed by a person, and no agent may mark it.`);
        say(`Mark it with "${PERSON_TASK.agreement}". It opens one box: who decided it, your name.`);
        say(`That records the mark on the run and writes the agreed PRD from the draft, and ${gate.quality} then reads the two against each other.`);
        break;
      }
      const back = agentDisplayName((contracts.agents.get(n) || [])[0]) || 'the agent that produced it';
      const recorded = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
      const found = aboutAccepted(view, runArtifacts(dir), recorded, n);
      const renamed = folderRenamed(recorded.run_id, runId);
      for (const f of found) if (cannotSign(f.id, renamed)) f.never = true;
      const onAccepted = found.filter(f => f.stages.length);
      const fixLines = ids => unsignableLines(ids, recorded.run_id || runId, renamed);
      const accepted = list => {
        const stages = [...new Set(list.flatMap(f => f.stages))];
        return `${stageWords(stages)}, which ${stages.length === 1 ? 'is' : 'are'} already accepted`;
      };
      if (found.length && onAccepted.length === found.length && view.verdict === 'fail') {
        const never = onAccepted.filter(f => f.never).map(f => f.id);
        if (never.length) {
          say(`\nNothing was accepted. What failed is about ${accepted(onAccepted)}, and ${never.join(', ')} ` +
              `${never.length === 1 ? 'is a check' : 'are checks'} nobody can sign off.`);
          for (const l of fixLines(never)) say(l);
          break;
        }
        const one = onAccepted.length === 1;
        say(`\nNothing was accepted. What failed is about ${accepted(onAccepted)}, so ${back} cannot change ${one ? 'it' : 'them'} from this stage.`);
        const boxes = signOffBoxLines(onAccepted.map(f => f.id));
        say(`If this run cannot meet ${one ? 'it' : 'them'}, accept ${one ? 'it' : 'them'} with "${SIGN_OFF_TASK}". ${boxes[0]}`);
        for (const l of boxes.slice(1)) say(l);
        break;
      }
      const failedIds = [...new Set(view.failed)];
      const neverHere = failedIds.filter(id => cannotSign(id, renamed));
      const signable = onAccepted.filter(f => !f.never), never = onAccepted.filter(f => f.never);
      if (neverHere.length) {
        const agentsPart = failedIds.filter(id => !cannotSign(id, renamed) && !onAccepted.some(f => f.id === id));
        const other = view.verdict !== 'fail';
        say(`\nNothing was accepted. ${neverHere.join(', ')} ${neverHere.length === 1 ? 'is a check' : 'are checks'} nobody can sign off.`);
        for (const l of fixLines(neverHere)) say(l);
        if (agentsPart.length || other)
          say(`The rest goes back to ${back}, who fixes ${agentsPart.length ? agentsPart.join(', ') : 'what is listed above'} and produces again.`);
        if (signable.length) {
          const one = signable.length === 1;
          say(`${signable.map(f => f.id).join(', ')} ${one ? 'is' : 'are'} about ${accepted(signable)}, so ${back} cannot change ${one ? 'it' : 'them'}. ` +
              `Once the rest passes, ${one ? 'it' : 'they'} can be accepted with "${SIGN_OFF_TASK}".`);
        }
        break;
      }
      const fv = view.verdict === 'fail' ? failuresOf(view) : [];
      if (!onAccepted.length && fv.length && fv.every(waitsOnThePersonWholly)) {
        const ids = fv.map(f => f.id), boxes = signOffBoxLines(ids);
        say(`\nNothing was accepted. What ${gate.quality} found waits on you, not on ${back}: each finding above says what you can do. ` +
            `To keep what it names, with your reason, sign ${ids.join(', ')} off with "${SIGN_OFF_TASK}". ${boxes[0]}`);
        for (const l of boxes.slice(1)) say(l);
        break;
      }
      say(`\nNothing was accepted. The stage goes back to ${back}, who fixes what is listed above and produces again.`);
      say(`You are not asked to decide anything until it passes.`);
      if (!onAccepted.length && view.verdict === 'fail' && failedIds.length && failedIds.every(id => signableAtGate(n, id))) {
        const one = failedIds.length === 1, boxes = signOffBoxLines(failedIds);
        say(`Where this run cannot meet ${one ? 'it' : 'them'}, you can accept ${one ? 'it' : 'them'} with "${SIGN_OFF_TASK}". ${boxes[0]}`);
        for (const l of boxes.slice(1)) say(l);
      }
      if (signable.length) {
        const one = signable.length === 1;
        say(`${signable.map(f => f.id).join(', ')} ${one ? 'is' : 'are'} about ${accepted(signable)}, so ${back} cannot change ${one ? 'it' : 'them'}. ` +
            `Once the rest passes, ${one ? 'it' : 'they'} can be accepted with "${SIGN_OFF_TASK}".`);
      }
      if (never.length) {
        const one = never.length === 1;
        say(`${never.map(f => f.id).join(', ')} ${one ? 'is' : 'are'} about ${accepted(never)}, and nobody can sign ${one ? 'it' : 'them'} off.`);
        for (const l of fixLines(never.map(f => f.id))) say(l);
      }
      break;
    }
    if (signedPast) {
      say(`  ${signedPast}`);
      say(`  stage ${n} advances carrying that failure. The gate result stays "fail" on the record, on the`);
      say(`  run's front page, and in every report that reads them.`);
    } else say(`  ${gate.quality} passed, recorded`);
    const takes = decisionsFor(n);
    if (takes.length) {
      const r = run('run-state.mjs', ['stage', runId, String(n), 'in_review']);
      if (r.code) die(r.out.trim());
      if (regated === n) continue;
      const order = choiceOrderLines(state, n);
      const reviewed = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
      const stReviewed = (reviewed.stages || []).find(x => Number(x.id) === n);
      const ask = reviewMessage(dir, reviewed, stReviewed, n);
      const absorb = messagePrinted(ask);
      for (const l of stopLines({
        refused: refusedFor(runId),
        stop: [`\n${runId} — stage ${n} is ready for you.`,
               ...(absorb ? [] : [`The decision is made on the document, not on the run's index:`, ...carrierLines(runId, takes)]),
               ...(n === 2 ? [...supportLines(runId), ...contradictionLines(runId, reviewed)] : [])],
        headsUp: needLines(nextStageNeeds(contracts, n, dir), 'stop'),
        boxes: absorb ? (choiceFirst(order) ? [] : order) : [...order, ...approvalLines(order, state, stReviewed, n)],
        after: [takes.length === 1
          ? `That decision is ${takes[0]}, it is yours, and no agent can make it.`
          : `That is ${takes.length} decisions — ${takes.join(', then ')} — both yours, and no agent can make either.`,
          ...(absorb ? [] : questionLines(reviewed, stReviewed, n, runLanguage(dir))),
          `The rest of the chain, if you want it: ${join(RUNS_ROOT, runId, 'README.md')}.`],
      })) say(l);
      for (const l of ask) say(l);
      break;
    }
    const r = run('run-state.mjs', ['stage', runId, String(n), 'accepted']);
    if (r.code) die(r.out.trim());
    say(`  stage ${n} accepted — it has no decision gate, ${gate.quality} is its whole acceptance`);
    const acceptedNow = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
    for (const l of questionLines(acceptedNow, (acceptedNow.stages || []).find(x => Number(x.id) === n), n, runLanguage(dir))) say(l);
    for (const l of handOffLines(n)) say(l);
    moved++; continue;
  }

  if (st.status === 'in_review') {
    const signed = new Set(recordedDecisions(st).map(d => d.id));
    const pending = decisionsFor(n).filter(id => !signed.has(id));
    if (!approve) {
      const ask = reviewMessage(dir, state, st, n);
      for (const l of reviewWaitLines(runId, state, st, n, { contracts, dir, ...(messagePrinted(ask) ? { absorbed: { questions: true } } : {}) })) say(l);
      for (const l of ask) say(l);
      break;
    }
    approvalUsed = true;
    const answers = answersRead(st, n, statedAnswers, runLanguage(dir));
    if (answers.refusal) {
      say(`\n${answers.refusal[0]}`);
      for (const l of answers.refusal.slice(1)) say(l);
      process.exit(3);
    }
    {
      const owned = (stages.find(x => x.id === n) || {}).owner;
      const typedRole = statedOwner ? statedOwnerRole : statedRole;
      const near = !owned && typedRole ? nearMissRole(typedRole, rolesOn(state)) : '';
      if (near) {
        say(`\nNothing you typed was recorded: not your name or your role.`);
        say(`The role "${typedRole}" is one or two characters from "${near}", which this run already records. ` +
            `If they are the same role, type it the way the run already spells it. If it really is a different role, ` +
            `name it so it does not read as a slip.`);
        process.exit(3);
      }
    }
    const expands = writtenFromChoice(n).filter(id => WAITS_ON_A_PERSON[id].after === 'choice');
    if (expands.length && !standingChoices(state, n).length) {
      const withdrawn = ((state && state.decisions) || [])
        .filter(d => d && String(d.kind) === 'choice' && String(d.stage) === String(n) && d.superseded_by).slice(-1)[0];
      say(`\nNothing you typed was recorded.`);
      say(`${expands.join(', ')} expands the one option you choose, and no choice stands on stage ${n}` +
          `${withdrawn ? `: the one recorded on ${shownDate(withdrawn.at)} was withdrawn on ${shownDate(withdrawn.superseded_by)}` : ''}.`);
      say(`Record it first with "${PERSON_TASK.choice}". It opens five boxes:`);
      for (const l of choiceBoxLines(state)) say(l);
      say(`Escape cancels and records nothing. Then run the approval again.`);
      process.exit(3);
    }
    const writes = Object.entries(WAITS_ON_A_PERSON)
      .find(([aid, w]) => w.after === 'approval' && Number(w.stage) === n && pending.some(g => DECISION_CARRIER[g] === aid));
    let writing = null;
    if (writes) {
      const [aid] = writes;
      const w = { gate: pending.find(g => DECISION_CARRIER[g] === aid) };
      const reading = chosenSolution(dir, state, { gate: w.gate });
      const chosen = reading.choices;
      if (!chosen.length) {
        say(`\nNothing you typed was recorded: not your name or your role.`);
        say(`Stage ${n}'s selected-solution document carries your reason for the choice, and no choice is recorded on stage ${n} yet.`);
        say(`Record it first with "SPOCK: record a decision I made". It opens five boxes:`);
        for (const l of choiceBoxLines(state)) say(l);
        say(`Escape cancels and records nothing. Then run the approval again.`);
        process.exit(3);
      }
      if (chosen.length > 1) {
        say(`\nNothing you typed was recorded.`);
        say(`Stage ${n} records ${chosen.length} standing choices (${chosen.map(c => `${selectedId(c.selection) || 'none'} on ${shownDate(c.at)}`).join(', ')}), and the document can carry one reason.`);
        say(`Replace the one that no longer stands with "SPOCK: replace a decision that no longer stands", then run the approval again.`);
        process.exit(3);
      }
      const choice = reading.choice || chosen[0];
      const id = reading.id;
      if (!id) {
        say(`\nNothing you typed was recorded.`);
        say(`The choice recorded on stage ${n} on ${shownDate(choice.at)} names no solution, so the document has nothing to carry.`);
        say(`Replace it with "SPOCK: replace a decision that no longer stands", naming the one you chose, then run the approval again.`);
        process.exit(3);
      }
      if (!existsSync(join(dir, STAGE_DIRS[n - 1], 'parts', `${id}.md`))) {
        say(`\nNothing you typed was recorded. ${id} has no part on disk, so the document cannot carry it. This is a fault in the run; tell whoever maintains the workflow.`);
        process.exit(3);
      }
      const lang = runLanguage(dir);
      const probe = selectedDocument(dir, { id, choice, signer: who, status: st.status, today: new Date().toISOString().slice(0, 10), lang });
      if (typeof probe !== 'string') {
        say(`\nNothing you typed was recorded. The selected-solution document cannot be written: ${probe.problem}.`);
        if (!probe.route) say(`This is a fault in the run; tell whoever maintains the workflow.`);
        process.exit(3);
      }
      writing = { aid, gate: w.gate, id, choice, lang };
    }
    if (regated !== n) {
      const changed = changedSinceGate(runId, state, st);
      if (changed.documents.length || changed.decisions || changed.records) {
        const what = [...changed.documents, ...(changed.decisions ? [`the stage's decisions`] : []), ...(changed.records ? [RECORDS_WORDS] : [])];
        const listed = what.length > 1 ? `${what.slice(0, -1).join(', ')} and ${what[what.length - 1]}` : what[0];
        say(`  ${listed} changed after ${gate.quality} ran, so ${gate.quality} runs again before the approval is recorded`);
        const r = run('run-state.mjs', ['stage', runId, String(n), 'produced']);
        if (r.code) die(r.out.trim());
        approvalUsed = false;
        regated = n;
        continue;
      }
      const cannotRead = unreadable(n);
      if (cannotRead.length) { unreadStop(n, cannotRead); approvalUsed = false; break; }
    }
    for (const id of pending) {
      const g = run('run-state.mjs', ['gate', runId, String(n), id, 'pass', '--by', who]);
      if (g.code) die(g.out.trim());
      say(`  ${id} passed, recorded in the name of ${who}`);
    }
    for (const l of needLines(nextStageNeeds(contracts, n, dir), 'approval')) say(`  ${l}`);
    if (writing) {
      const after = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
      const sAfter = (after.stages || []).find(x => Number(x.id) === n) || {};
      const g = recordedDecisions({ ...sAfter, id: n }).find(d => d && d.id === writing.gate);
      const done = writeSelected(dir, { id: writing.id, choice: writing.choice, signer: who, status: sAfter.status,
                                        today: (g && g.decided_at) || new Date().toISOString().slice(0, 10), lang: writing.lang });
      if (done.problem) die(`advance: ${writing.gate} is recorded and the selected-solution document could not be written: ${done.problem}`);
    }
    const already = (stages.find(x => x.id === n) || {}).owner;
    const ownerName = statedOwner || who;
    const ownerRole = statedOwner
      ? (statedOwnerRole || resolveRole(state, stages.find(x => x.id === n) || {}, statedOwner) || 'not stated')
      : (statedRole || resolveRole(state, stages.find(x => x.id === n) || {}, who) || 'accepted_the_stage');
    if (!already && !statedOwner)
      say(`  nobody was named as owning this stage's work, so it is attributed to ${who}, who accepted it`);
    const acceptArgs = already
      ? ['stage', runId, String(n), 'accepted']
      : ['stage', runId, String(n), 'accepted', '--owner', ownerName, '--role', ownerRole];
    if (writing) acceptArgs.push('--selection', writing.id);
    if (statedAsked) acceptArgs.push('--asked', statedAsked);
    const a = run('run-state.mjs', acceptArgs);
    if (!a.code && statedOwner && statedOwner !== who)
      say(`  stage ${n} is owned by ${ownerName} and was accepted by ${who}`);
    if (a.code) die(a.out.trim());
    say(`  stage ${n} accepted`);
    for (const l of headsUps({ state, by: who, gates: pending, stage: n, act: 'approval',
                               role: statedRole || resolveRole(state, stages.find(x => x.id === n) || {}, who) })) say(l);
    if (answers.stands) say(`  Your answers to this gate's questions from ${shownDate(answers.stands.at)} stand; box 3 was not recorded over them.`);
    else if (answers.qs) {
      const judgedRole = statedRole || resolveRole(state, stages.find(x => x.id === n) || {}, who) || 'accepted_the_stage';
      const j = run('run-state.mjs', ['judged', runId, String(n), '--by', who, '--role', judgedRole, '--verdicts', answers.typed]);
      if (j.code) { say('  The stage is approved; your answers were not recorded:'); for (const l of j.out.trim().split('\n')) say(`    ${l.trim()}`); }
      else for (const l of j.out.trim().split('\n')) say(`  ${l}`);
    }
    for (const s of staged.filter(s => s.stage === n && basename(s.path) === 'solution-join.mjs')) {
      const r = run(basename(s.path), (s.args || '').includes('{runs_root}') ? [join(RUNS_ROOT, runId), '--write'] : ['--write']);
      if (!r.code) for (const l of r.out.split('\n').filter(x => /A9 carries/.test(x))) say(l);
      else for (const l of joinStopLines(r.out)) say(l);
    }
    if (writing) say(`  ${writing.aid} carries the reason ${writing.choice.by} recorded on ${shownDate(writing.choice.at)}, word for word`);
    for (const l of handOffLines(n)) say(l);
    moved++; continue;
  }

  if (st.status === 'q_failed') {
    if (coveredBySignature(state, st)) {
      const cannotRead = unreadable(n);
      if (cannotRead.length) { unreadStop(n, cannotRead); break; }
      const r = run('run-state.mjs', ['stage', runId, String(n), 'in_review']);
      if (r.code) die(r.out.trim());
      say(`  ${signatureLine(state, st)}`);
      say(`  stage ${n} advances carrying that failure. The gate result stays "fail" on the record, on the`);
      say(`  run's front page, and in every report that reads them.`);
      if (!decisionsFor(n).length) {
        const a = run('run-state.mjs', ['stage', runId, String(n), 'accepted']);
        if (a.code) die(a.out.trim());
        say(`  stage ${n} accepted — it has no decision gate, and a person signed what ${gate.quality} could not pass`);
        for (const l of questionLines(state, st, n, runLanguage(dir))) say(l);
        for (const l of handOffLines(n)) say(l);
      }
      moved++; continue;
    }
    if (returned.has(n)) {
      const back = agentDisplayName((contracts.agents.get(n) || [])[0]) || 'the agent that produced it';
      say(`\n${runId}: stage ${n} failed ${gate.quality} again, with the same documents.`);
      say(`The stage goes back to ${back}, who runs "SPOCK: run one gate" to read why (it takes nothing) and changes what it lists.`);
      say(`You are not asked to decide anything until it passes. Two failures on one pass is not something to retry: the same documents will fail the same way.`);
      break;
    }
    returned.add(n);
    const { r, kh, withdrawn, changed } = toRunning(runId, n, contracts);
    if (r.code) die(r.out.trim());
    say(`  stage ${n} returned to running, for ${gate.quality} to run again`);
    if (kh.length) say(`    its record names ${kh.join(', ')}`);
    for (const l of changed) say(l);
    for (const l of withdrawnLines(withdrawn)) say(l);
    moved++; continue;
  }

  say(`\n${runId} — stage ${n} is "${st.status}", which this does not move on its own.`);
  if (st.status === 'pending')
    say(`Nothing has been produced for it yet. Invoke ${agentDisplayName((contracts.agents.get(n) || [])[0]) || 'the agent that carries this stage'} to start it.`);
  else if (st.status === 'running' || st.status === 'refined')
    say(`It is being written. ${agentDisplayName((contracts.agents.get(n) || [])[0]) || 'Its agent'} finishes it, and this moves again once it has produced.`);
  else if (st.status === 'stale') {
    const routes = staleRoutes();
    say(`A stage it is built on was sent back or re-run after it was accepted. ${routes[0].toUpperCase()}${routes.slice(1)}.`);
  }
  else
    say(`Whoever set it to "${st.status}" is the one who moves it on. This decides nothing itself.`);
  say(`The rest of the chain: ${join(RUNS_ROOT, runId, 'README.md')}`);
  break;
}

if (approve && !approvalUsed) {
  const typed = [byIdx !== -1 ? 'your name' : null, statedRole ? 'your role' : null,
                 statedAnswers ? 'your answers' : null, statedAsked ? 'what you asked to be changed' : null].filter(Boolean);
  const what = typed.length > 1 ? `${typed.slice(0, -1).join(', ')} or ${typed[typed.length - 1]}` : typed[0];
  const record = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
  const now = stoppedAt === null ? null : ((record.stages || []).find(s => Number(s.id) === stoppedAt) || {}).status;
  const last = now === 'in_review' || personWait || regated === stoppedAt || (unread && unread.stage === stoppedAt) ? null : acceptedLastLine(record);
  const lead = last ? `\n${last}\n` : '\n';
  if (stoppedAt !== null && !decisionsFor(stoppedAt).length) {
    say(`${lead}Stage ${stoppedAt} takes no approval: ${(GATES[stoppedAt] || {}).quality || 'its gate'} accepts it on its own once it passes, ` +
        `so nothing you typed was needed and none of it was recorded.`);
    return;
  }
  const why = stoppedAt === null ? 'every stage of this run is already accepted, so there was nothing left to approve'
    : unread && unread.stage === stoppedAt ? `the checker could not read ${unread.names}, so there is no decision to take yet`
    : joinStopped === stoppedAt ? `stage ${stoppedAt}'s solution set could not be assembled from its parts, so ${(GATES[stoppedAt] || {}).quality || 'its gate'} did not run and there is no decision to take yet`
    : regated === stoppedAt ? `stage ${stoppedAt} changed after ${(GATES[stoppedAt] || {}).quality || 'its gate'} ran and did not pass it again, so there is no decision to take yet`
    : now === 'in_review' ? `stage ${stoppedAt} reached review only on this run, after you typed, so there was nothing in front of you to approve yet`
    : now === 'q_failed' || now === 'produced' ? `stage ${stoppedAt} did not pass ${(GATES[stoppedAt] || {}).quality || 'its gate'}, so there is no decision to take yet`
    : materialWait ? `stage 2 starts from the problem material, which only you can supply, as files in ${STAGE_DIRS[1]}/${SUPPLIED_DIR}/, so there is no decision to take yet`
    : personWait && PERSON_TASK[personAct] ? `stage ${stoppedAt} waits on you first, with "${PERSON_TASK[personAct]}", so there is no decision to take yet`
    : `stage ${stoppedAt} is still being written, so there is no decision to take yet`;
  say(`${lead}Nothing you typed was recorded${what ? ` — not ${what}` : ''}. ${why[0].toUpperCase()}${why.slice(1)}.`);
  say(`Run the approval again when the stage is waiting on you.`);
  process.exit(3);
}
}

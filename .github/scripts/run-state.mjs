#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { duplicateIds, duplicateLine } from './run-files.mjs';
import { RUNS_ROOT, STAGE_DIRS, RECORDS_DIR, RECORD_SUFFIX, artifact as artifactFile,
         runArtifacts, runRecords, recordsFor, runLanguage, KEEP_FILE, KEEP_TEXT, HOLDS_ITS_RESULT, folderTakeBack, takeBackTyped, takeBackListing, readText } from './run-files.mjs';
import { splitFm, contentHash, decisionsSeen, DECISIONS_SEEN_FROM, recordsSeen, recordsSeenOn, RECORDS_WORDS, ideasSeen, stageView } from './content-seen.mjs';
import { q, roundsFor, resolveRole, renderDecisionBlock, rolesOn, nearMissRole, nearMissName, headsUps, fold, askedOn } from './decision-block.mjs';
import { BOX_TYPES, BOXES, NONE_YET, entryRefusal, notPersonRefusal } from './boxes.mjs';
import { gateFindings, failuresOf } from './findings.mjs';
import { selectedFromRecord, writeSelected, fillSelected } from './solution-join.mjs';
import { frontmatter, unquote } from './yaml.mjs';
import { SURFACES, UNSET, SURFACE_FILE, declaredSurface, observeSurface } from './surface.mjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, realpathSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supersedeFile } from './withdraw.mjs';
import { ownRole } from './keep.mjs';
import { capture } from './capture.mjs';
import { envelopeAtApproval, envelopeView } from './envelope.mjs';
import { frameBrief } from './frame.mjs';
import { buildAtLeast } from './derive.mjs';
import { ENVELOPE_AT_APPROVAL_BUILD } from './gates.mjs';
import { agreedPrd, draftAgreementFindings, draftFindingChange } from './prd.mjs';
import { render as renderReadme, OUT_NAME as README_NAME } from './run-readme.mjs';
import { readContracts, upstreamStages } from './contracts.mjs';
import { czechQuestion, shownDate, storedDate } from './fixed-messages.mjs';
import { COMPOSED_FLOOR, STATUSES, legalStageMove, legalSuccessors, judgedTally,
         judgedRulesFor, readJudgedVerdicts, questionsFor, answersToVerdicts,
         namesProducer, personOnly, ABANDON_REASONS, stoppedLine, GATES, AGREEMENT_CARRIER, decisionsFor, recordedDecisions,
         DECISION_CARRIER, coveredBySignature, signatureLine, signedChecks, NEVER_SIGNABLE, unsignableFix,
         CHOICE_SOURCE, headingForId, resolveChoice, staleRoutes, STALE_TASK, signedExceptions,
         SIGN_OFF_TASK, ON_ACCEPTED_ENTRY, onAcceptedOf, onAcceptedPairs, coveringSignatures,
         SIGN_OFF_CAUSE_WORDS, WORKFLOW_FAULT_WORDS, chosenSolution, choiceSet, selectedId,
         CONTRADICTION_CHECK, contradictionIdsOf, recordedContradictions, entriesOf,
         knowHowOwed, stageRanAt, producedAtOf } from './gates.mjs';

function setFmKey(fm, key, lines) {
  const out = [];
  let i = 0, done = false;
  while (i < fm.length) {
    if (new RegExp(`^${key}:`).test(fm[i])) {
      i++;
      while (i < fm.length && /^\s+\S/.test(fm[i])) i++;
      out.push(...lines); done = true; continue;
    }
    out.push(fm[i]); i++;
  }
  if (!done) out.push(...lines);
  return out;
}

function heldSelection(runId, artifactId, gate) {
  let a = null;
  try { a = artifactFile(join(RUNS_ROOT, runId), artifactId); } catch { a = null; }
  if (!a || !a.abs || !existsSync(a.abs)) return null;
  const v = chosenSolution(join(RUNS_ROOT, runId), null, { gate, text: readFileSync(a.abs, 'utf8') }).blockRaw;
  return v == null || v === '' ? null : v;
}

function heldAsked(runId, artifactId) {
  let a = null;
  try { a = artifactFile(join(RUNS_ROOT, runId), artifactId); } catch { a = null; }
  if (!a || !a.abs || !existsSync(a.abs)) return '';
  return askedOn(readFileSync(a.abs, 'utf8'));
}

function choiceCandidates(runId, stageId) {
  return choiceSet(join(RUNS_ROOT, runId), stageId);
}

const choiceRefusal = (r, stageId, where) =>
  `${r.refusal}.\n` +
  `        Stage ${stageId} is choosing between:\n` +
  (r.choices || []).map(c => `          ${c}`).join('\n') + '\n' +
  `        ${where} takes the id, the name, or the whole heading as the document shows it.`;

function writeIntoArtifact(runId, artifactId, key, lines) {
  let a = null;
  try { a = artifactFile(join(RUNS_ROOT, runId), artifactId); } catch { a = null; }
  if (!a || !a.abs || !existsSync(a.abs)) return null;
  const text = readText(a.abs);
  const split = splitFm(text);
  if (!split) return null;
  const next = `---\n${setFmKey(split.fm, key, lines).join('\n')}\n---\n${split.body}`;
  if (next === text) return null;
  writeFileSync(a.abs, next);
  return a.rel || a.abs;
}

const AGREED_FILE = '2-prd-agreed.md';

function agreedFiles(dir, carrier, { by, at }) {
  const draft = artifactFile(dir, carrier.draft);
  if (!draft || !draft.abs || !existsSync(draft.abs)) return { problem: 'The draft PRD is not written yet, so there is nothing to agree.' };
  const stageDir = STAGE_DIRS[Number(draft.stage) - 1] || dirname(draft.rel);
  const agreedRel = `${stageDir}/${AGREED_FILE}`;
  const draftText = readFileSync(draft.abs, 'utf8');
  const refused = draftRefusal(dir, carrier, draft, draftText);
  if (refused) return { problem: refused };
  const made = agreedPrd({
    draftDoc: draftText,
    draftRecords: recordsFor(dir, carrier.draft).map(r => ({ name: basename(r.abs), text: readFileSync(r.abs, 'utf8') })),
    by, at, today: today(), lang: runLanguage(dir), agreedRel,
  });
  if (made.problem) return made;
  return { document: { rel: agreedRel, text: made.document },
           records: made.records.map(r => ({ rel: `${RECORDS_DIR}/${stageDir}/${r.name}`, text: r.text })) };
}

function draftRefusal(dir, carrier, draft, draftText) {
  const read = (text, file) => { try { return frontmatter(text, file) || {}; } catch { return {}; } };
  const own = read(draftText, draft.rel);
  let block = own.agreement_block;
  for (const r of recordsFor(dir, carrier.draft)) {
    if (block !== undefined) break;
    block = read(readFileSync(r.abs, 'utf8'), r.rel).agreement_block;
  }
  const found = draftAgreementFindings(draftText, { assembled: own.assembled_at, block });
  if (!found.length) return null;
  return 'The draft cannot be agreed as it stands. The agreed PRD is the draft word for word and says who agreed it in a ' +
    'paragraph the workflow writes, so each of these would be carried into it and contradict that paragraph:\n' +
    found.map(f => `        ${draftFindingChange(draft.rel, f)}`).join('\n') +
    `\n        The agent for stage ${draft.stage} makes these changes to the draft, and then the draft can be marked agreed.`;
}

function writeAgreedFiles(dir, carrier, made) {
  const want = new Map([[made.document.rel, made.document.text], ...made.records.map(r => [r.rel, r.text])]);
  const replaced = [];
  for (const f of [...runArtifacts(dir).filter(a => a.id === carrier.agreed), ...recordsFor(dir, carrier.agreed)]) {
    if (want.has(f.rel) && readText(f.abs) === want.get(f.rel)) continue;
    supersedeFile(dir, f.rel, { reason: 'replaced by the agreed PRD the workflow writes from the draft', by: 'the workflow' });
    replaced.push(f.rel);
  }
  for (const [rel, text] of want) {
    const abs = join(dir, rel);
    if (existsSync(abs) && readText(abs) === text) continue;
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, text);
  }
  return replaced;
}

function seeContent(stage, gateId, result, at, st, { compared = null } = {}) {
  if (stage.status === 'accepted') return;
  const before = stage.content_seen && typeof stage.content_seen === 'object' && !Array.isArray(stage.content_seen)
    ? stage.content_seen : null;
  const seen = {}, changed = [];
  let read = 0;
  const records = recordsSeenOn(st);
  const view = stageView(runId);
  for (const aid of (stage.artifacts || []).map(String)) {
    const was = before && typeof before[aid] === 'string' && before[aid] ? before[aid] : null;
    const now = contentHash(runId, aid, view);
    if (now === null) { if (was) seen[aid] = was; continue; }
    read++;
    seen[aid] = now;
    if (was && was !== now && (!compared || compared.has(aid))) changed.push(aid);
  }
  const recordsNow = records ? recordsSeen(runId, stage, view) : null;
  if (recordsNow && !compared && before && typeof before.records === 'string' && before.records && before.records !== recordsNow)
    changed.push(RECORDS_WORDS);
  const ideasNow = records && (stage.artifacts || []).map(String).includes('A8') ? ideasSeen(runId) : null;
  if (ideasNow && !compared && before && typeof before.ideas === 'string' && before.ideas !== ideasNow && !changed.includes('A8'))
    changed.push('A8');
  if (changed.length)
    stage.rework = [...(Array.isArray(stage.rework) ? stage.rework : []),
                    { after: before.gate, result: before.result, seen_at: before.at, at, changed: changed.join(', ') }];
  if (read) stage.content_seen = { gate: gateId, result, at, ...seen,
                                   ...(String(at) >= DECISIONS_SEEN_FROM ? { decisions: decisionsSeen(readBack(st), stage.id) } : {}),
                                   ...(recordsNow ? { records: recordsNow } : {}), ...(ideasNow !== null ? { ideas: ideasNow } : {}) };
}

function readBack(st) {
  return frontmatter(render(st), 'RUN-STATE.md');
}

function regateAfterWithdrawal(st, s, from = null) {
  const n = Number(s.id), gate = GATES[n].quality, dir = join(RUNS_ROOT, runId);
  const g = gateFindings(dir, gate);
  if (!g.complete || (g.code !== 0 && g.code !== 1)) {
    console.log(`  ${gate} could not be run again on stage ${n}, so the record keeps the failed gate. ` +
                `"SPOCK: run one gate" shows why.`);
    return;
  }
  const docs = runArtifacts(dir);
  const circular = /^stage \d+ is (?:accepted|in_review|refined) without /;
  const failed = [...new Set(failuresOf(g)
    .filter(f => f.findings.some(x => { const fr = String(x.fragment || '').trim(); return fr && !circular.test(fr) && (x.stage === null || x.stage <= n); }))
    .map(f => f.id))];
  const onAccepted = onAcceptedOf(failuresOf(g).filter(x => failed.includes(x.id)), docs, st, n);
  const kIds = failed.includes(CONTRADICTION_CHECK)
    ? contradictionIdsOf((failuresOf(g).find(x => x.id === CONTRADICTION_CHECK) || {}).detail) : [];
  const w = capture('node', ['.github/scripts/run-state.mjs', 'gate', runId, String(n), gate, failed.length ? 'fail' : 'pass',
    '--by', 'check.mjs, run independently of the producer', ...(failed.length ? ['--failed', failed.join(',')] : []),
    ...(onAccepted.length ? ['--on-accepted', onAccepted.join(',')] : []), ...(kIds.length ? ['--contradictions', kIds.join(',')] : []),
    '--after-withdrawal']);
  if (w.code !== 0) {
    console.log(`  ${gate} ran again on stage ${n} and the record refused the result: ${(w.out + w.err).trim().split('\n')[0]}`);
    return;
  }
  if (!failed.length) {
    console.log(`  ${gate} ran again on stage ${n}, found nothing about it, and the record now holds a pass. The stage stays "${s.status}".`);
    return;
  }
  console.log(`  ${gate} ran again on stage ${n}, and the record now names only what still fails there. The stage stays "${s.status}".`);
  const signed = new Set(signedExceptions(st, n).flatMap(signedChecks));
  const carriesFrom = c => {
    if (from === null) return false;
    const rec = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
    const me = (rec.stages || []).find(x => Number(x.id) === n);
    const v = me && coveringSignatures({ ...rec, decisions: [...(rec.decisions || []),
      { kind: 'exception', stage: String(from), check: [c] }] }, me).get(c);
    return !!v && v.carried && v.from === Number(from);
  };
  for (const c of failed)
    console.log(NEVER_SIGNABLE.includes(c)
      ? `  ${c} still fails on stage ${n} and cannot be signed off: ${String(unsignableFix(c) || '').replaceAll('<run_id>', st.run_id || runId)}`
      : signed.has(c) ? `  ${c} still fails on stage ${n} and stays signed.`
      : `  ${c} still fails on stage ${n} and has no sign-off: sign it again with "${SIGN_OFF_TASK}".` +
        (carriesFrom(c) ? ` Signed again on stage ${from}, where it was signed before, it covers stage ${n} too, since the sign-off there carries to this finding.` : ''));
}

function narrowSignOff(st, s, date, dropArg) {
  const id = s.id;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || '')))
    die(`--narrow takes the date of the sign-off being narrowed, not "${date}"`);
  const drop = [...new Set(String(dropArg == null ? '' : dropArg).split(',').map(x => x.trim()).filter(Boolean))];
  if (!drop.length)
    die('--drop is required with --narrow — which of the sign-off\'s checks pass on this run now, separated by commas');
  const standing = (st.decisions || []).filter(d => String(d.stage) === String(id) && d.kind === 'exception'
    && !d.superseded_by && d.at === date);
  const target = standing.find(d => signedChecks(d).some(c => drop.includes(c)));
  if (!target)
    die(`stage ${id} carries no standing sign-off dated ${date} naming ${drop.join(', ')}.\n` +
        `        Standing sign-off(s) on this stage: ${standing.length ? standing.map(d => `${d.at} (${signedChecks(d).join(', ')})`).join(', ')
          : (st.decisions || []).filter(d => String(d.stage) === String(id) && d.kind === 'exception' && !d.superseded_by)
              .map(d => `${d.at} (${signedChecks(d).join(', ')})`).join(', ') || 'none'}.`);
  const named = signedChecks(target);
  const rest = named.filter(c => !drop.includes(c));
  if (!rest.length)
    die(`narrowing stage ${id}'s sign-off of ${named.join(', ')} by ${drop.join(', ')} would leave it covering nothing.\n` +
        `        A sign-off every check has outgrown is withdrawn, which is a person's act: ` +
        `"SPOCK: replace a decision that no longer stands", kind exception, giving the date ${shownDate(target.at)}.`);
  const now = today();
  target.superseded_by = now;
  target.superseded_reason = `${drop.join(', ')} ${drop.length === 1 ? 'passes' : 'pass'} on this run from ${now}; ` +
    `the sign-off now covers ${rest.join(', ')}`;
  st.decisions.push({ stage: String(id), kind: 'exception', what: target.what, by: target.by, role: target.role,
    at: target.at, ...(target.affects ? { affects: target.affects } : {}), check: rest,
    ...(target.reason ? { reason: target.reason } : {}), ...(target.cause ? { cause: target.cause } : {}),
    ...(Array.isArray(target.entries) && target.entries.length ? { entries: target.entries } : {}),
    narrowed_from: target.at, narrowed_by: 'the workflow' });
  save(st);
  console.log(`stage ${id}: the sign-off of ${named.join(', ')} by ${target.by}, ${target.role}, on ${shownDate(target.at)} now covers ` +
              `${rest.join(', ')} — ${target.superseded_reason}`);
  console.log(`  both stay on the record, and ${target.by}'s signature on ${rest.join(', ')} stands as it was made`);
  if (['accepted', 'in_review', 'refined'].includes(s.status) && s.quality_gate && String(s.quality_gate.result) === 'fail')
    regateAfterWithdrawal(st, s);
  process.exit(0);
}

function syncArtifactStatus(runId, stage) {
  if (String(stage.status) !== 'accepted' && envelopeAtApproval(join(RUNS_ROOT, runId))) return [];
  const touched = [];
  for (const aid of stage.artifacts || []) {
    const rel = writeIntoArtifact(runId, aid, 'status', [`status: ${stage.status}`]);
    if (rel) touched.push(rel);
  }
  return touched;
}

const FLOOR = `composed-floor@${COMPOSED_FLOOR.version}`;

export const STAGES = [
  { id: 1, name: 'Brief',      workflow: 'discovery',            artifacts: ['A1'] },
  { id: 2, name: 'Opportunities', workflow: 'problems',           artifacts: ['A2b', 'A3', 'A3b', 'A4'] },
  { id: 3, name: 'Competitive Analysis',     workflow: 'competitive-analysis', artifacts: ['A5', 'A6', 'A7'] },
  { id: 4, name: 'Solutions',  workflow: 'discovery',            artifacts: ['A8', 'A9'] },
  { id: 5, name: 'MVP',        workflow: 'discovery',            artifacts: ['A10', 'A11'] },
  { id: 6, name: 'PRD',        workflow: 'discovery',            artifacts: ['A12', 'A13'] },
  { id: 7, name: 'Initiative', workflow: 'discovery',            artifacts: ['A14', 'A15'] },
];

const EXCEPTION_CAUSES = SIGN_OFF_CAUSE_WORDS;

const RUN_STATUSES = ['in_progress', 'complete', 'abandoned'];

const BUILD_FILE = '.github/build';
const buildName = () => {
  try { return existsSync(BUILD_FILE) ? readFileSync(BUILD_FILE, 'utf8').trim() : ''; } catch { return ''; }
};

const WORKFLOWS = ['discovery', 'problems', 'competitive-analysis', 'free-roam'];
const MODES = ['discovery', 'free-roam'];

function die(msg) {
  console.error(`\nrun-state: ${msg}\n`);
  process.exit(1);
}

function refuse(msg) {
  console.error(`\nrun-state: ${msg}\n`);
  process.exit(3);
}

function render(st) {
  const L = ['---'];
  L.push(`run_id: ${q(st.run_id)}`);
  L.push(`artifact_id: ${q('S2')}`);
  L.push(`record: run-state`);
  L.push(`workflow: ${q(st.workflow)}`);
  L.push(`mode: ${q(st.mode)}`);
  L.push(`created_at: ${q(st.created_at)}`);
  L.push(`updated_at: ${q(st.updated_at)}`);
  if (st.surface !== undefined) L.push(`surface: ${q(st.surface)}`);
  if (st.surface_observed !== undefined) L.push(`surface_observed: ${q(st.surface_observed)}`);
  if (st.build !== undefined) L.push(`build: ${JSON.stringify(String(st.build))}`);
  if (st.person && st.person.name) {
    L.push('person:');
    for (const k of ['name', 'role', 'recorded_at']) if (st.person[k] !== undefined) L.push(`  ${k}: ${q(st.person[k])}`);
  }
  if (st.jira_key && st.jira_key.value) {
    L.push('jira_key:');
    for (const k of ['value', 'recorded_at']) if (st.jira_key[k] !== undefined) L.push(`  ${k}: ${q(st.jira_key[k])}`);
  }
  L.push(`current_stage: ${q(st.current_stage)}`);
  L.push(`status: ${q(st.status)}`);
  if (st.abandoned_reason) {
    for (const k of ['abandoned_by', 'abandoned_at', 'abandoned_reason'])
      L.push(`${k}: ${q(st[k])}`);
    if (st.abandoned_note) L.push(`abandoned_note: ${q(st.abandoned_note)}`);
  }
  L.push(`behaviours: ${q(st.behaviours)}`);
  L.push('stages:');
  for (const s of st.stages) {
    L.push(`  - id: ${q(s.id)}`);
    L.push(`    name: ${q(s.name)}`);
    L.push(`    workflow: ${q(s.workflow)}`);
    L.push(`    status: ${q(s.status)}`);
    L.push(`    artifacts: [${s.artifacts.map(q).join(', ')}]`);
    if (s.quality_gate) {
      L.push('    quality_gate:');
      for (const k of ['id', 'result', 'run_at', 'run_by']) L.push(`      ${k}: ${q(s.quality_gate[k])}`);
      const answered = s.judged_half && Array.isArray(s.judged_half.verdicts) ? s.judged_half.verdicts.filter(v => String(v) !== 'skipped').length : 0;
      for (const k of ['judged_ran', 'judged_not_run', 'judged_reason']) {
        if (s.quality_gate[k] !== undefined) L.push(`      ${k}: ${q(s.quality_gate[k])}`);
        if (k === 'judged_not_run' && answered) L.push(`      judged_answered_by_person: ${q(answered)}`);
      }
      if (Array.isArray(s.quality_gate.failed) && s.quality_gate.failed.length)
        L.push(`      failed: [${s.quality_gate.failed.map(q).join(', ')}]`);
      if (Array.isArray(s.quality_gate.on_accepted) && s.quality_gate.on_accepted.length)
        L.push(`      on_accepted: [${s.quality_gate.on_accepted.map(q).join(', ')}]`);
      if (Array.isArray(s.quality_gate.contradictions) && s.quality_gate.contradictions.length)
        L.push(`      contradictions: [${s.quality_gate.contradictions.map(q).join(', ')}]`);
      if (s.quality_gate.regate === true || String(s.quality_gate.regate) === 'true') L.push('      regate: true');
    }
    if (s.supplied_market && s.supplied_market.file) {
      L.push('    supplied_market:');
      for (const k of ['file', 'bytes', 'sha256', 'competitors', 'trends', 'recorded_at', 'arrival', 'by', 'previous_sha256', 'previous_file', 'changed_at'])
        if (s.supplied_market[k] !== undefined) L.push(`      ${k}: ${q(s.supplied_market[k])}`);
    }
    if (s.judged_half && Array.isArray(s.judged_half.verdicts) && s.judged_half.verdicts.length) {
      L.push('    judged_half:');
      for (const k of ['by', 'role', 'at', 'as_of', 'asked']) if (s.judged_half[k] !== undefined) L.push(`      ${k}: ${q(s.judged_half[k])}`);
      L.push(`      verdicts: [${s.judged_half.verdicts.map(q).join(', ')}]`);
    }
    if (s.owner && s.owner.name) {
      L.push('    owner:');
      for (const k of ['name', 'role', 'recorded_at']) if (s.owner[k] !== undefined) L.push(`      ${k}: ${q(s.owner[k])}`);
    }
    if (s.agreement && s.agreement.by) {
      L.push('    agreement:');
      for (const k of ['by', 'at', 'recorded_at']) if (s.agreement[k] !== undefined) L.push(`      ${k}: ${q(s.agreement[k])}`);
    }
    const decided = recordedDecisions(s);
    if (decided.length) {
      L.push('    decision_gates:');
      for (const d of decided) {
        L.push(`      - id: ${q(d.id)}`);
        for (const k of ['decided_by', 'decided_at']) L.push(`        ${k}: ${q(d[k])}`);
        L.push(`        by_agent: false`);
      }
    }
    if (Array.isArray(s.corrections) && s.corrections.length) {
      L.push('    corrections:');
      for (const c of s.corrections) {
        L.push(`      - from: ${q(c.from)}`);
        for (const k of ['to', 'by', 'at', 'reason', 'places']) L.push(`        ${k}: ${q(c[k])}`);
      }
    }
    if (s.content_seen && typeof s.content_seen === 'object' && !Array.isArray(s.content_seen)
        && Object.keys(s.content_seen).length) {
      L.push('    content_seen:');
      for (const k of ['gate', 'result', 'at']) if (s.content_seen[k] !== undefined) L.push(`      ${k}: ${q(s.content_seen[k])}`);
      for (const [k, v] of Object.entries(s.content_seen))
        if (!['gate', 'result', 'at'].includes(k)) L.push(`      ${k}: ${JSON.stringify(String(v))}`);
    }
    if (Array.isArray(s.rework) && s.rework.length) {
      L.push('    rework:');
      for (const r of s.rework) {
        L.push(`      - after: ${q(r.after)}`);
        for (const k of ['result', 'seen_at', 'at', 'changed']) L.push(`        ${k}: ${q(r[k])}`);
      }
    }
    L.push(`    know_how: [${(s.know_how || []).map(q).join(', ')}]`);
  }
  if (!(st.refinements || []).length) L.push('refinements: []');
  else {
    L.push('refinements:');
    for (const x of st.refinements) {
      L.push(`  - stage: ${q(x.stage)}`);
      for (const k of ['what', 'reason', 'changed', 'by', 'role', 'at']) L.push(`    ${k}: ${q(x[k])}`);
      if (x.amended_after) L.push(`    amended_after: ${q(x.amended_after)}`);
    }
  }
  if (!(st.decisions || []).length) L.push('decisions: []');
  else {
    L.push('decisions:');
    for (const x of st.decisions) {
      L.push(`  - stage: ${q(x.stage)}`);
      for (const k of ['kind', 'what', 'by', 'role', 'at']) L.push(`    ${k}: ${q(x[k])}`);
      if (x.check !== undefined && x.check !== '')
        L.push(Array.isArray(x.check) ? `    check: [${x.check.map(q).join(', ')}]` : `    check: ${q(x.check)}`);
      if (Array.isArray(x.entries) && x.entries.length) L.push(`    entries: [${x.entries.map(q).join(', ')}]`);
      for (const k of ['affects', 'selection', 'reason', 'cause', 'by_as_typed', 'narrowed_from', 'narrowed_by', 'superseded_by', 'superseded_reason']) if (x[k] !== undefined && x[k] !== '') L.push(`    ${k}: ${q(x[k])}`);
      L.push('    by_agent: false');
    }
  }
  if (!(st.know_how_not_read || []).length) L.push('know_how_not_read: []');
  else {
    L.push('know_how_not_read:');
    for (const x of st.know_how_not_read) {
      L.push(`  - stage: ${q(x.stage)}`);
      for (const k of ['body', 'reason']) L.push(`    ${k}: ${q(x[k])}`);
    }
  }
  if ((st.read_undeclared || []).length) {
    L.push('read_undeclared:');
    for (const x of st.read_undeclared) {
      L.push(`  - stage: ${q(x.stage)}`);
      for (const k of ['document', 'why']) L.push(`    ${k}: ${q(x[k])}`);
    }
  }
  if ((st.judged_withdrawn || []).length) {
    L.push('judged_withdrawn:');
    for (const x of st.judged_withdrawn) {
      L.push(`  - stage: ${q(x.stage)}`);
      for (const k of ['by', 'role', 'at', 'as_of', 'asked']) if (x[k] !== undefined) L.push(`    ${k}: ${q(x[k])}`);
      L.push(`    verdicts: [${(x.verdicts || []).map(q).join(', ')}]`);
      for (const k of ['withdrawn_at', 'withdrawn_reason']) if (x[k] !== undefined) L.push(`    ${k}: ${q(x[k])}`);
    }
  }
  if (!st.stale.length) L.push('stale: []');
  else {
    L.push('stale:');
    for (const x of st.stale) {
      L.push(`  - artifact: ${q(x.artifact)}`);
      L.push(`    reason: ${q(x.reason)}`);
      if (x.rebuilt === true || String(x.rebuilt) === 'true') L.push('    rebuilt: true');
      else {
        L.push(`    accepted_by: ${q(x.accepted_by || '')}`);
        L.push(`    accepted_at: ${q(x.accepted_at || '')}`);
      }
    }
  }
  L.push('---', '', '# Run state', '',
    '> **Written by the workflow, never by an agent.** An agent that can mark its own stage `accepted`',
    '> can advance a run past a gate nobody ran. Agents read this file and stop when their preconditions',
    '> are not met; they do not edit it to make themselves runnable.',
    '',
    'Maintained by `.github/scripts/run-state.mjs`. `C38` checks that it exists, that every stage status',
    'agrees with the artifacts that stage produced, that nothing is `accepted` without the gates that',
    'accept it, and that the composed-behaviour floor in force (§9.3) is recorded and matches the carrier.', '');
  return L.join('\n');
}

const pathFor = runId => join(RUNS_ROOT, runId, 'RUN-STATE.md');

export function load(runId) {
  const p = pathFor(runId);
  if (!existsSync(p)) die(`no record at ${p}. Run \`init ${runId}\` first.`);
  const txt = readFileSync(p, 'utf8').replace(/^\ufeff/, '');
  const open = /^\ufeff?---\r?\n/.exec(txt);
  const end = txt.indexOf('\n---', open ? open[0].length : 4);
  const fm = txt.slice(open ? open[0].length : 4, end).split(/\r?\n/);

  const st = { stages: [], stale: [], refinements: [], know_how_not_read: [], decisions: [], read_undeclared: [], judged_withdrawn: [] };
  const scalar = s => unquote(s.trim());
  const list = s => { s = s.trim(); return s === '[]' ? [] : s.slice(1, -1).split(',').map(x => scalar(x)).filter(Boolean); };
  let cur = null, sub = null, subEntry = null, inStale = false, inRefine = false, inUnread = false, inDecide = false, inReadUndeclared = false,
      inJudgedWithdrawn = false, inMap = null;

  for (const line of fm) {
    if (!line.trim()) continue;
    const ind = line.length - line.trimStart().length;
    const t = line.trim();

    if (ind === 0) {
      inStale = false; inRefine = false; inUnread = false; inDecide = false; inReadUndeclared = false; inJudgedWithdrawn = false;
      cur = null; sub = null; subEntry = null; inMap = null;
      if (t === 'stages:') continue;
      if (t === 'person:' || t === 'jira_key:') { inMap = t.slice(0, -1); st[inMap] = {}; continue; }
      if (t === 'stale:') { inStale = true; continue; }
      if (t === 'stale: []') continue;
      if (t === 'refinements:') { inRefine = true; continue; }
      if (t === 'refinements: []') continue;
      if (t === 'read_undeclared:') { inReadUndeclared = true; continue; }
      if (t === 'judged_withdrawn:') { inJudgedWithdrawn = true; continue; }
      if (t === 'know_how_not_read:') { inUnread = true; continue; }
      if (t === 'know_how_not_read: []') continue;
      if (t === 'decisions:') { inDecide = true; continue; }
      if (t === 'decisions: []') continue;
      const c = t.indexOf(':');
      st[t.slice(0, c)] = scalar(t.slice(c + 1));
      continue;
    }
    if (ind === 2 && inMap && !t.startsWith('- ')) {
      const c = t.indexOf(':');
      st[inMap][t.slice(0, c)] = scalar(t.slice(c + 1));
      continue;
    }
    if (ind === 2 && t.startsWith('- ')) {
      const c = t.indexOf(':');
      if (inStale) { cur = { artifact: scalar(t.slice(c + 1)) }; st.stale.push(cur); }
      else if (inRefine) { cur = { stage: scalar(t.slice(c + 1)) }; st.refinements.push(cur); }
      else if (inReadUndeclared) { cur = { stage: scalar(t.slice(c + 1)) }; (st.read_undeclared = st.read_undeclared || []).push(cur); }
      else if (inJudgedWithdrawn) { cur = { stage: scalar(t.slice(c + 1)) }; st.judged_withdrawn.push(cur); }
      else if (inUnread) { cur = { stage: Number(scalar(t.slice(c + 1))) }; st.know_how_not_read.push(cur); }
      else if (inDecide) { cur = { stage: scalar(t.slice(c + 1)) }; st.decisions.push(cur); }
      else { cur = { id: Number(scalar(t.slice(c + 1))), know_how: [], artifacts: [] }; st.stages.push(cur); }
      sub = null; subEntry = null; continue;
    }
    if (ind === 4) {
      const c = t.indexOf(':');
      const k = t.slice(0, c), v = t.slice(c + 1).trim();
      if (v === '') { sub = k; cur[k] = {}; subEntry = null; continue; }
      sub = null; subEntry = null;
      cur[k] = (k === 'know_how' || k === 'artifacts' || (k === 'check' && v.startsWith('['))
                || (k === 'entries' && v.startsWith('[')) || (k === 'verdicts' && inJudgedWithdrawn)) ? list(v) : scalar(v);
      continue;
    }
    if (ind === 6 && sub && t.startsWith('- ')) {
      const c = t.indexOf(':');
      if (!Array.isArray(cur[sub])) cur[sub] = [];
      subEntry = { [t.slice(2, c)]: scalar(t.slice(c + 1)) };
      cur[sub].push(subEntry);
      continue;
    }
    if (ind === 6 && sub) {
      const c = t.indexOf(':');
      const k6 = t.slice(0, c), v6 = t.slice(c + 1);
      cur[sub][k6] = (k6 === 'failed' || k6 === 'verdicts' || k6 === 'on_accepted' || k6 === 'contradictions') ? list(v6) : scalar(v6);
      continue;
    }
    if (ind === 8 && subEntry) {
      const c = t.indexOf(':');
      subEntry[t.slice(0, c)] = scalar(t.slice(c + 1));
    }
  }
  Object.defineProperty(st, 'readFrom', { value: p, enumerable: false });
  if (cmd !== 'abandon') { const stopped = stoppedLine(runId, st); if (stopped) refuse(stopped); }
  return st;
}

const today = () => new Date().toISOString().slice(0, 10);

function save(st) {
  st.updated_at = today();
  if (!st.behaviours) st.behaviours = FLOOR;
  const firstOpen = st.stages.find(s => s.status !== 'accepted' && s.status !== 'superseded');
  st.current_stage = firstOpen ? String(firstOpen.id) : 'complete';
  st.status = st.abandoned_reason ? 'abandoned' : (firstOpen ? 'in_progress' : 'complete');
  const recordPath = st.readFrom || pathFor(st.run_id);
  writeFileSync(recordPath, render(st));
  const runRoot = dirname(recordPath);
  const front = renderReadme(runRoot);
  if (front !== null) writeFileSync(join(runRoot, README_NAME), front);
  sourcesInLanguage(runRoot);
  return st;
}

const SOURCES_SCAFFOLD = {
  en: ['# Sources', "The run's bibliography. Every `ref` an artifact cites in `external_sources[]` resolves to a row here."],
  cs: ['# Zdroje', 'Seznam zdrojů runu. Každý `ref`, který artefakt uvádí v `external_sources[]`, má zde svůj řádek.'],
};
function sourcesInLanguage(runRoot) {
  const file = join(runRoot, 'sources.md');
  if (!existsSync(file) || runLanguage(runRoot) !== 'cs') return;
  const was = readText(file);
  const [heading, sentence] = SOURCES_SCAFFOLD.en;
  const now = (was.startsWith(`${heading}\n`) ? `${SOURCES_SCAFFOLD.cs[0]}\n${was.slice(heading.length + 1)}` : was)
    .replace(`\n${sentence}\n`, `\n${SOURCES_SCAFFOLD.cs[1]}\n`);
  if (now !== was) writeFileSync(file, now);
}

function parse(argv) {
  const f = {}, pos = [];
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) { pos.push(argv[i]); continue; }
    const k = argv[i].slice(2);
    (f[k] = f[k] || []).push(argv[i + 1] !== undefined && !argv[i + 1].startsWith('--') ? argv[++i] : true);
  }
  return { f, pos };
}

function writeDecisionBlocks(st, s, typedSelection, typedAsked = '', { fresh = false } = {}) {
  for (const d of recordedDecisions(s)) {
    const carrier = DECISION_CARRIER[d.id];
    if (!carrier) continue;
    const role = resolveRole(st, s, d.decided_by) || 'accepted_the_stage';
    const rounds = roundsFor(st, s.id);
    let given = String(typedSelection || '').trim();
    if (given) {
      const r = resolveChoice(given, choiceCandidates(runId, s.id));
      if (r.refusal) die(`stage ${s.id}: ${choiceRefusal(r, s.id, 'The box')}`);
      if (r.id && r.id !== given) { console.log(`  "${given}" is ${r.id}, and ${r.id} is what the record carries`); given = r.id; }
    }
    const held = fresh ? null : heldSelection(runId, carrier, d.id);
    if (given && held && given !== held)
      die(`${carrier} already records ${d.id} selecting "${held}" and this says "${given}" — a choice recorded twice can disagree with itself`);
    const selection = given || held;
    const asked = String(typedAsked || '').trim() || (fresh ? '' : heldAsked(runId, carrier));
    const L = renderDecisionBlock({ gate: d.id, who: d.decided_by, role,
                                    acceptedAt: d.decided_at, selection, rounds, asked });
    const touched = writeIntoArtifact(runId, carrier, 'decision', L);
    if (touched) console.log(`${carrier} carries the ${d.id} record — ${touched}`);
  }
}

const real = p => { try { return realpathSync(p); } catch { return p; } };
const MAIN = !!process.argv[1] && real(fileURLToPath(import.meta.url)) === real(process.argv[1]);
if (!MAIN && /(?:^|[\\/])run-state\.mjs$/.test(process.argv[1] || ''))
  die('run-state.mjs could not tell that it was started as a command, so it did nothing. Nothing was written.');
const [cmd, runId, ...rest] = MAIN ? process.argv.slice(2) : [];
if (MAIN && (!cmd || !runId)) die('usage: run-state.mjs <init | stage | gate | agree | seen | decide | correct-name | retract | read | unread | stale | accept-stale | abandon | jira> <run_id> …');
const { f, pos } = parse(rest);
const one = k => (f[k] ? String(f[k][0]) : undefined);

function cascadeFrom(st, owner, reason) {
  const marked = [];
  for (const a of owner.artifacts || []) {
    const existing = st.stale.find(x => x.artifact === a);
    if (existing) { existing.reason = reason; existing.accepted_by = ''; existing.accepted_at = ''; }
    else st.stale.push({ artifact: a, reason, accepted_by: '', accepted_at: '' });
    marked.push(a);
  }
  return { marked, downstream: staleDownstream(st, owner) };
}

const holdsAResult = s => s.status === 'accepted' || !!s.quality_gate || (s.decision_gates || []).length > 0;

function staleDownstream(st, owner) {
  const downstream = [];
  for (const x of st.stages)
    if (x.id > owner.id && x.status !== 'pending' && x.status !== 'superseded' && holdsAResult(x)) {
      x.status = 'stale';
      syncArtifactStatus(runId, x);
      downstream.push(x.id);
    }
  return downstream;
}

if (cmd === 'init') {
  const workflow = one('workflow') || 'discovery';
  const mode = one('mode') || 'discovery';
  if (!WORKFLOWS.includes(workflow)) die(`workflow "${workflow}" is not registered — ${WORKFLOWS.join(' | ')}`);
  if (!MODES.includes(mode)) die(`mode "${mode}" is not registered — ${MODES.join(' | ')}`);
  if (existsSync(pathFor(runId))) refuse(`${pathFor(runId)} already exists. Refusing to overwrite a run's history.`);
  const personName = one('person'), personRole = one('role');
  if (personName !== undefined && personName !== 'true') {
    const notPerson = notPersonRefusal(String(personName).trim(), 'starting a run', 'Your name', 'Nothing was started');
    if (notPerson) refuse(notPerson);
    if (!String(personName).trim())
      refuse(entryRefusal({ what: 'Nothing was started: the box \'Your name\' was empty',
        takes: 'Starting a run records the person running it, by name.', next: 'Run the task again and type your name.' }));
    if (!String(personRole || '').trim() || personRole === 'true')
      refuse(entryRefusal({ what: 'Nothing was started: the box \'The role you decide in\' was empty',
        takes: `Starting a run records the role ${String(personName).trim()} decides in, as in Product Manager.`,
        next: 'Run the task again and type the role.' }));
  }
  if (RUNS_ROOT === 'fixtures' && !process.env.SPOCK_ALLOW_FIXTURES)
    die(`refusing to create a run in "fixtures" — that is the directory this build tests itself against, ` +
        `and a real run there is counted among the ten fabricated ones.\n` +
        `        Set your own destination first: open \`.github/runs-root\` in VS Code, put your own directory ` +
        `in it in place of what is there, and save. Add \`<your-directory>/*\` to .gitignore in the same edit (C141).\n` +
        `        Write it in the editor rather than from a terminal: the file holds one word, and on Windows ` +
        `PowerShell a \`>\` redirection saves it in an encoding nothing here can read.`);

  const selfTest = process.env.SPOCK_ALLOW_FIXTURES || process.env.SPOCK_RUNS_TEST_OVERRIDE;
  const declared = declaredSurface();
  const { observed, evidence } = observeSurface();
  if (!selfTest && !SURFACES.includes(declared))
    die(`refusing to create a run with no declared surface — \`${SURFACE_FILE}\` reads "${declared}".\n` +
        `        Run the task \`SPOCK: check my setup\` (Terminal › Run Task…) and pick the tool you use: it saves ` +
        `${SURFACES.join(' or ')} in that file, and says what else this computer still needs.\n` +
        `        The two surfaces share one chat view and both hold the same agent files, so nothing about ` +
        `what you can see says which one you are on.\n` +
        `        See SETUP.md, step 4.`);
  if (!selfTest && observed === 'other-agent-tool' && declared === 'copilot')
    die(`refusing to create a run declared "copilot" from another agent tool's session (${evidence}).\n` +
        `        The dry-run protocol's questions are about Copilot and none of them can be answered here.\n` +
        `        Either run it in Copilot, or declare this surface: open \`${SURFACE_FILE}\` in VS Code, put ` +
        `other-agent-tool in it in place of what is there, and save.`);

  const runRoot = join(RUNS_ROOT, runId);
  mkdirSync(runRoot, { recursive: true });
  for (const d of STAGE_DIRS) {
    mkdirSync(join(runRoot, d), { recursive: true });
    mkdirSync(join(runRoot, 'records', d), { recursive: true });
    if (d === STAGE_DIRS[1] || d === STAGE_DIRS[2]) {
      mkdirSync(join(runRoot, d, 'supplied'), { recursive: true });
      writeFileSync(join(runRoot, d, 'supplied', KEEP_FILE), KEEP_TEXT);
    }
  }
  mkdirSync(join(runRoot, 'read'), { recursive: true });
  const st = save({
    run_id: runId, workflow, mode, created_at: today(), updated_at: today(),
    surface: declaredSurface(), surface_observed: observeSurface().observed,
    ...(buildName() ? { build: buildName() } : {}),
    ...(personName !== undefined && personName !== 'true'
      ? { person: { name: String(personName).trim(), role: String(personRole).trim(), recorded_at: today() } } : {}),
    current_stage: '1', status: 'in_progress', behaviours: FLOOR, stale: [],
    stages: STAGES.map(s => ({ ...s, artifacts: [...s.artifacts], status: 'pending', know_how: [] })),
  });
  writeFileSync(join(runRoot, 'sources.md'),
    `${SOURCES_SCAFFOLD.en[0]}\n\n${SOURCES_SCAFFOLD.en[1]}\n\n` +
    '| ref | publisher | what it is | accessed |\n|---|---|---|---|\n');

  console.log(`initialised ${pathFor(runId)} — ${st.stages.length} stages pending, ` +
    `${STAGE_DIRS.length} stage folder(s) with their records/, read/, an empty bibliography at ` +
    `sources.md and a front page at ${join(runRoot, README_NAME)}`);
  if (st.person) console.log(`${st.person.name}, ${st.person.role}, is recorded as the person running this run.`);
  if (buildAtLeast(buildName(), ENVELOPE_AT_APPROVAL_BUILD)) {
    const framed = frameBrief(runRoot);
    if (framed.length) console.log(`The brief's frame is written at ${framed.map(rel => join(runRoot, rel)).join(' and ')}, for the agent to fill.`);
  }

} else if (cmd === 'stage') {
  const [id, status] = pos;
  const st = load(runId);
  const s = st.stages.find(x => String(x.id) === String(id));
  if (!s) die(`no stage ${id} — stages are 1…7`);
  {
    const ids = new Set([...(s.artifacts || []), ...(f.artifact || [])].map(String));
    const twice = duplicateIds(join(RUNS_ROOT, runId)).filter(x => ids.has(x.id));
    if (twice.length) refuse(twice.map(duplicateLine).join('\n        '));
  }
  if (!STATUSES.includes(status)) die(`status "${status}" is not in the shared vocabulary — ${STATUSES.join(' | ')}`);
  const stop = f.person ? refuse : die;

  if (!legalStageMove(s.status, status, s.id))
    stop(`stage ${id} cannot move ${s.status} → ${status}. Legal from ${s.status}: ` +
        `${legalSuccessors(s.status, s.id).join(', ') || '(none — terminal)'}.\n` +
        `        ${legalSuccessors(s.status, s.id).length ? 'Run the task again and pick one of those.' : 'Nothing moves it from here.'}`);

  const signedStale = status === 'running' && s.status === 'stale' ? recordedDecisions(s).map(d => d.id) : [];
  if (signedStale.length)
    stop(`stage ${id} is stale and carries ${signedStale.join(' and ')}, which a person signed, so it is redone by sending it back ` +
        `with "${STALE_TASK.redo}".\n` +
        `        That ends the signature on the record first. Moved back to running with the signature still standing, ` +
        `the stage's gate could not be recorded on a later day than the signature.\n` +
        `        Run "${STALE_TASK.redo}" in place of the move.`);

  if (status === 'running' && s.status === 'accepted' && f.person)
    refuse(`stage ${id} is accepted, so it is redone by sending it back with "${STALE_TASK.redo}", which ends its acceptance on the record first.\n` +
        `        Moved back to running with its acceptance still standing, the gate it is redone through cannot pass.\n` +
        `        Run "${STALE_TASK.redo}" in place of the move.`);

  const droppedAtRerun = [];
  if (status === 'running' && (s.status === 'accepted' || s.status === 'q_failed')) {
    const standing = (st.decisions || []).filter(d => String(d.stage) === String(id)
                                                   && String(d.kind) === 'exception' && !d.superseded_by);
    for (const d of standing) {
      d.superseded_by = today();
      d.superseded_reason = `stage ${id} was re-run, so the documents this accepted no longer exist`;
    }
    if (standing.length)
      console.log(`  ${standing.length} signed exception(s) on stage ${id} are withdrawn — ` +
                  `${standing.flatMap(signedChecks).join(', ')}. They were about documents being replaced.`);
    droppedAtRerun.push(...recordedDecisions(s).map(d => d.id));
    delete s.decision_gates;
    delete s.decision_gate;
    if (droppedAtRerun.length)
      console.log(`  ${droppedAtRerun.join(' and ')} on stage ${id} ${droppedAtRerun.length === 1 ? 'is' : 'are'} withdrawn. ` +
                  `${droppedAtRerun.length === 1 ? 'It was a decision' : 'They were decisions'} on documents being replaced.`);
  }

  if ((status === 'in_review' || status === 'refined')
      && !(s.quality_gate && s.quality_gate.result === 'pass') && !coveredBySignature(st, s)) {
    const g = GATES[s.id];
    stop(`stage ${id} cannot move to ${status}: ${g.quality} has not passed on the record.\n` +
        `        A stage reaches ${status} once its gate passes, or once a person has signed every check the gate recorded ` +
        `as failing, and never ${NEVER_SIGNABLE.join(', ')}.\n` +
        `        Run "SPOCK: check what is written, then continue", which runs and records ${g.quality} and names any sign-off it needs.`);
  }

  if (status === 'accepted') {
    const g = GATES[s.id];
    {
      const contracts = readContracts();
      if (contracts.steps === 0)
        die(`the workflow contracts declare no step, so whether stage ${id} may be accepted cannot be ` +
            `decided — a precondition that cannot be computed must not be waived`);
      const blocked = [];
      for (const [up, owed] of upstreamStages(s.id, contracts)) {
        const ups = st.stages.find(x => Number(x.id) === up);
        if (!ups) continue;
        if (ups.status !== 'accepted') blocked.push(`stage ${up} is "${ups.status}" and owes ${owed.join(', ')}`);
      }
      if (blocked.length)
        stop(`stage ${id} cannot be accepted over an upstream stage nobody has accepted.\n` +
            `        ${blocked.join('\n        ')}\n` +
            `        A stage accepted over an unaccepted one is a run advancing past a gate nobody ran.\n` +
            `        Wait until ${blocked.length === 1 ? 'that stage is' : 'those stages are'} accepted, then run the task again.`);
    }
    if ((!s.quality_gate || s.quality_gate.result !== 'pass') && !coveredBySignature(st, s))
      stop(`stage ${id} cannot be accepted: ${g.quality} has not passed on the record.\n` +
          `        A stage is accepted once its gate passes, or once a person has signed every check the gate recorded as ` +
          `failing, and never ${NEVER_SIGNABLE.join(', ')}.\n` +
          `        Run "SPOCK: check what is written, then continue", which runs and records ${g.quality} and names any sign-off it needs.`);
    const owed = decisionsFor(s.id).filter(id2 => !recordedDecisions(s).some(d => d.id === id2));
    if (owed.length)
      stop(`stage ${id} cannot be accepted: ${owed.join(' and ')} ${owed.length > 1 ? 'are' : 'is'} not recorded.\n` +
          `        A stage accepted without its decision gate is a run advancing past a gate nobody ran.\n` +
          `        The person decides with "SPOCK: approve what is in front of me", which records ${owed.length > 1 ? 'them' : 'it'}.`);
    if (s.status === 'stale') {
      const upstream = st.stale.filter(x => {
        const owner = st.stages.find(o => o.artifacts.includes(x.artifact));
        return owner && owner.id < s.id;
      });
      const unrecorded = upstream.filter(x => !x.accepted_by || !x.accepted_at);
      if (unrecorded.length)
        stop(`stage ${id} is stale and cannot be accepted without a recorded human acceptance.\n` +
            `        Unaccepted stale input(s): ${unrecorded.map(x => x.artifact).join(', ')}.\n` +
            `        A person keeps the stage with "${STALE_TASK.keep}", which records the acceptance, or sends it back with ` +
            `"${STALE_TASK.redo}".`);
    }
  }
  let cascade = null;
  if (status === 'running' && s.status === 'stale') {
    const mine = new Set((s.artifacts || []).map(String));
    st.stale = (st.stale || []).filter(x => !mine.has(String(x.artifact)));
    cascade = { marked: [], downstream: staleDownstream(st, s) };
  } else if (status === 'running' && s.status !== 'pending' && s.status !== 'running' && s.status !== 'q_failed')
    cascade = cascadeFrom(st, s, `stage ${s.id} was re-run from ${s.status} on ${today()}`);

  const wasStatus = s.status;
  s.status = status;
  syncArtifactStatus(runId, s);

  const ownerName = one('owner');
  let ownerHeads = [];
  if (ownerName !== undefined) {
    if (!String(ownerName).trim()) refuse('--owner needs a name. A stage owned by nobody is not attributed, and an empty string reads as one that is');
    const ownerRole = one('role');
    if (!ownerRole || !String(ownerRole).trim()) refuse('--owner needs --role beside it — a name with no role does not say what the person was accountable for');
    {
      const near = nearMissRole(ownerRole, rolesOn(st));
      if (near) refuse(`--role "${ownerRole}" is one or two characters from "${near}", which this run already records. ` +
        `If they are the same role, type it the way the run already spells it. If it really is a different ` +
        `role, name it so it does not read as a slip.`);
      ownerHeads = headsUps({ state: st, role: ownerRole });
    }
    const ownerImpostor = namesProducer(String(ownerName).trim());
    if (ownerImpostor.length)
      refuse(`--owner "${String(ownerName).trim()}" names ${ownerImpostor.join(', ')}, which produces work in this workflow.\n` +
          `        A stage is owned by a person (§6): the trio changes from stage to stage and somebody is accountable for each.\n` +
          `        Name the person who owns this stage's work.`);
    s.owner = { name: String(ownerName).trim(), role: String(ownerRole).trim(), recorded_at: today() };
  }

  if (status === 'accepted')
    writeDecisionBlocks(st, s, (() => { const i = rest.indexOf('--selection'); return i === -1 ? '' : String(rest[i + 1] ?? '').trim(); })(),
      (() => { const i = rest.indexOf('--asked'); return i === -1 ? '' : String(rest[i + 1] ?? '').trim(); })(),
      { fresh: wasStatus !== 'accepted' && envelopeAtApproval(join(RUNS_ROOT, runId)) });

  for (const a of f.artifact || []) if (!s.artifacts.includes(String(a))) s.artifacts.push(String(a));
  const gapsWithdrawn = [];
  for (const k of (f['know-how'] || []).flatMap(v => String(v).split(',')).map(v => v.trim()).filter(Boolean)) {
    const entry = String(k), name = entry.split('@')[0];
    const at = s.know_how.findIndex(e => String(e).split('@')[0] === name);
    if (at === -1) s.know_how.push(entry); else if (!s.quality_gate) s.know_how[at] = entry;
    const gap = (st.know_how_not_read || []).find(w => w && String(w.stage) === String(id)
      && String(w.body || '').replace(/\.md$/, '').split('@')[0] === name);
    if (gap) {
      st.know_how_not_read = st.know_how_not_read.filter(w => w !== gap);
      gapsWithdrawn.push(gap);
    }
  }
  if (!envelopeAtApproval(join(RUNS_ROOT, runId))) for (const g of droppedAtRerun) {
    const carrier = DECISION_CARRIER[g];
    if (carrier) { const touched = writeIntoArtifact(runId, carrier, 'decision', []);
                   if (touched) console.log(`  ${carrier} no longer carries the ${g} record`); }
  }
  save(st);
  console.log(`stage ${id} (${s.name}) → ${status}`);
  if (status === 'accepted' && envelopeAtApproval(join(RUNS_ROOT, runId))) {
    const fin = capture(process.execPath, [join(dirname(fileURLToPath(import.meta.url)), 'assemble.mjs'), runId, '--stage', String(id), '--finalise'],
      { retries: 0 });
    if (fin.code !== 0)
      console.log(`        the envelope of stage ${id}'s documents could not be written: ${String(fin.err || fin.out || '').trim().split('\n')[0]}`);
  }
  for (const g of gapsWithdrawn)
    console.log(`        ${String(g.body).trim()} was declared not read on this stage, and this stage now records reading it.\n` +
                `        The declared gap is withdrawn — it had said: ${String(g.reason || '').trim()}`);
  for (const l of ownerHeads) console.log(l);
  if (cascade && cascade.downstream.length && !cascade.marked.length)
    console.log(`        stage(s) ${cascade.downstream.join(', ')} marked stale, because ${cascade.downstream.length === 1 ? 'it was' : 'each was'} built on stage ${id}.\n` +
      `        Once stage ${id} is accepted again, ${staleRoutes(cascade.downstream.length === 1 ? 'that stage' : 'each of them')}.`);
  else if (cascade && cascade.downstream.length)
    console.log(`        ${cascade.marked.join(', ')} marked stale, and stage(s) ${cascade.downstream.join(', ')} ` +
      `with them — a run does not advance past a stale input without a recorded human acceptance (C30).\n` +
      `        Run \`accept-stale ${runId} <artifact> --by "<name>"\` for each before accepting them again.`);

} else if (cmd === 'gate') {
  const [id, gate, result] = pos;
  const by = one('by');
  const st = load(runId);
  const s = st.stages.find(x => String(x.id) === String(id));
  if (!s) die(`no stage ${id}`);
  if (!['pass', 'fail'].includes(result)) die(`result must be pass or fail, not "${result}"`);
  if (!by) die('--by is required. A gate with no name on it is not a recorded decision');
  const g = GATES[s.id];
  if (gate === g.quality) {
    const keepPass = s.status === 'stale' && result === 'pass';
    const listOf = k => (one(k) || '').split(',').map(x => x.trim()).filter(Boolean);
    const keepFail = s.status === 'stale' && result === 'fail' && coveredBySignature(st, { ...s,
      quality_gate: { id: gate, result, failed: listOf('failed'), on_accepted: listOf('on-accepted'), contradictions: listOf('contradictions') } });
    const carriedPairs = onAcceptedPairs(s.quality_gate && s.quality_gate.on_accepted);
    const afterWithdrawal = f['after-withdrawal'] !== undefined && ['accepted', 'in_review', 'refined'].includes(s.status)
      && (st.decisions || []).some(d => String(d.kind) === 'exception' && d.superseded_by
        && (String(d.stage) === String(s.id)
            || (Number(d.stage) < Number(s.id) && signedChecks(d).some(c => carriedPairs.has(c)))));
    const regate = keepPass || keepFail || afterWithdrawal;
    if (s.status !== 'produced' && !regate)
      die(`stage ${id} is "${s.status}"; a quality gate is recorded on a produced artifact.\n` +
          `        Move the stage to produced first — a gate cannot be run on ${s.status}.`);
    const qAt = one('at') || today();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(qAt)) die(`--at must be a date, not "${qAt}"`);
    const earliest = recordedDecisions(s)[0];
    if (earliest && earliest.decided_at && qAt > String(earliest.decided_at) && !regate)
      die(`stage ${id}: ${gate} would be dated ${qAt}, after ${earliest.id} on ${earliest.decided_at}.\n` +
          `        A decision cannot precede the check that admits the stage to review (WB-24).\n` +
          `        Re-running a gate on an amended stage clears the decision first, or pass --at with the date it ran.`);
    const impostor = namesProducer(by);
    if (impostor.length)
      die(`--by "${by}" names ${impostor.join(', ')}, which produces work in this workflow.\n` +
          `        A quality gate is automated and is never recorded by a producer.\n` +
          `        Name what actually ran the check.`);
    const jt = judgedTally(gate, qAt);
    const failedIds = (one('failed') || '').split(',').map(x => x.trim()).filter(Boolean);
    const badId = failedIds.find(x => !/^C\d+$/.test(x));
    if (badId) die(`--failed takes check ids like C60, not "${badId}"`);
    if (failedIds.length && result !== 'fail')
      die(`--failed names the checks that failed, so it belongs on a fail and not on a ${result}`);
    const onAccepted = [...new Set((one('on-accepted') || '').split(',').map(x => x.trim()).filter(Boolean))];
    const badPair = onAccepted.find(x => !ON_ACCEPTED_ENTRY.test(x));
    if (badPair) die(`--on-accepted takes a failed check and an earlier stage, like C98:4, not "${badPair}"`);
    const strayPair = onAccepted.find(x => !failedIds.includes(x.split(':')[0]) || Number(x.split(':')[1]) >= Number(id));
    if (strayPair)
      die(`--on-accepted names ${strayPair}: each entry is a check --failed names and a stage before stage ${id}`);
    const contradictions = [...new Set((one('contradictions') || '').split(',').map(x => x.trim()).filter(Boolean))];
    const badK = contradictions.find(x => !/^K\d+$/.test(x));
    if (badK) die(`--contradictions takes the ids of recorded contradictions, like K1, not "${badK}"`);
    if (contradictions.length && !failedIds.includes(CONTRADICTION_CHECK))
      die(`--contradictions names the entries ${CONTRADICTION_CHECK} failed on, so it belongs beside --failed naming ${CONTRADICTION_CHECK}`);
    s.quality_gate = { id: gate, result, run_at: qAt, run_by: by,
                       judged_ran: jt.ran, judged_not_run: jt.notRun,
                       judged_reason: jt.notRun ? jt.reason : 'all quality rules decided by a check',
                       ...(failedIds.length ? { failed: failedIds } : {}),
                       ...(onAccepted.length ? { on_accepted: onAccepted } : {}),
                       ...(contradictions.length ? { contradictions } : {}),
                       ...(regate ? { regate: true } : {}) };
    if (result === 'fail' && !afterWithdrawal && !keepFail) {
      if (coveredBySignature(st, s)) {
        console.log(`  ${signatureLine(st, s)}`);
        console.log(`  stage ${id} stays "produced" — every check this gate failed is signed, and the gate ` +
                    `record still reads "fail". Nothing was overridden; a person accepted it.`);
      } else { s.status = 'q_failed'; syncArtifactStatus(runId, s); }
    }
    seeContent(s, gate, result, qAt, st);
  } else if (decisionsFor(s.id).includes(gate)) {
    if (result !== 'pass') die(`a decision gate is a review-and-refine loop, not approve/reject. Record the stage as in_review instead`);
    if (!['in_review', 'refined'].includes(s.status))
      die(`stage ${id} is "${s.status}"; a decision gate is recorded during review (in_review or refined), not on a ${s.status} stage.`);
    {
      const claimed = [];
      const viewed = envelopeAtApproval(join(RUNS_ROOT, runId)) ? envelopeView(join(RUNS_ROOT, runId)).texts : null;
      for (const aid of (s.artifacts || [])) {
        let f; try { f = artifactFile(join(RUNS_ROOT, runId), String(aid)); } catch { continue }
        if (!f || !existsSync(f.abs)) continue;
        const seen = viewed ? viewed.get(String(f.rel).split('\\').join('/')) : undefined;
        const text = seen !== undefined ? seen : readText(f.abs);
        const m = text.match(/^decision:\n(?:[ \t]+.*\n)*/m);
        if (!m) continue;
        if (!new RegExp(`^\\s+gate:\\s*${gate}\\s*$`, 'm').test(m[0])) continue;
        const named = m[0].match(/^\s+-?\s*name:[ \t]*(.+?)[ \t]*$/m);
        const who = named ? unquote(named[1]) : '';
        if (who) claimed.push(`${f.rel} already names ${who.trim()}`);
      }
      if (claimed.length)
        die(`stage ${id}: ${claimed.join('; ')} as having accepted ${gate}, and the run records no ${gate} yet.\n` +
            `        A signature is not collected to match a claim already written. The decision block is the\n` +
            `        generator's, from a gate the run already carries — remove it (\`SPOCK: fill in the envelope\`\n` +
            `        owns that block and will), record ${gate}, and the generator writes it back with the real date.`);
    }
    const at = one('at') || today();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(at)) die(`--at must be a date, not "${at}"`);
    if (s.quality_gate && s.quality_gate.run_at && at < String(s.quality_gate.run_at))
      die(`stage ${id}: ${gate} would be dated ${at}, before ${s.quality_gate.id} on ${s.quality_gate.run_at}.\n` +
          `        A decision cannot precede the check that admits the stage to review (WB-24).\n` +
          `        Record the date the decision was actually taken, or correct the quality gate's date.`);
    const decisionImpostor = namesProducer(by);
    if (decisionImpostor.length)
      die(`--by "${by}" names ${decisionImpostor.join(', ')}, which produces work in this workflow.\n` +
          `        A decision gate is a person's, and an agent never approves, agrees or selects (Rule 1).\n` +
          `        Name the person who decided.`);

    const prior = recordedDecisions(s);
    const kept = prior.filter(d => d.id !== gate);
    const order = decisionsFor(s.id);
    for (const d of kept) {
      if (order.indexOf(d.id) < order.indexOf(gate) && String(d.decided_at) > at)
        die(`stage ${id}: ${gate} would be dated ${at}, before ${d.id} on ${d.decided_at}.\n` +
            `        ${d.id} is signed first; a later decision cannot precede an earlier one.`);
      if (order.indexOf(d.id) > order.indexOf(gate) && String(d.decided_at) < at)
        die(`stage ${id}: ${gate} would be dated ${at}, after ${d.id} on ${d.decided_at}.\n` +
            `        ${gate} is signed first; an earlier decision cannot follow a later one.`);
    }
    s.decision_gates = [...kept, { id: gate, decided_by: by, decided_at: at }]
      .sort((x, y) => order.indexOf(x.id) - order.indexOf(y.id));
    delete s.decision_gate;

    seeContent(s, gate, result, at, st);
  } else {
    die(`stage ${id} has gates ${[g.quality, ...decisionsFor(s.id)].filter(Boolean).join(' and ')}, not "${gate}"`);
  }
  save(st);
  console.log(`stage ${id} ${gate} ${result} — ${by}`);

} else if (cmd === 'supplied-market') {
  const st = load(runId);
  const s = st.stages.find(x => Number(x.id) === 3);
  if (!s) die('this run carries no stage 3, which is the stage a supplied market list is for');
  const file = one('file'), sha256 = one('sha256');
  const bytes = Number(one('bytes')), competitors = Number(one('competitors')), trends = Number(one('trends'));
  if (!file) die('--file is required — the path inside the run, as market-material.mjs printed it');
  if (!/^[0-9a-f]{64}$/.test(String(sha256 || '')))
    die('--sha256 must be the file\'s hash. **A hash nobody compares is decoration**, and one nothing recorded cannot be compared at all');
  for (const [k, v] of [['bytes', bytes], ['competitors', competitors], ['trends', trends]])
    if (!Number.isFinite(v) || v < 0) die(`--${k} must be a count, not "${one(k)}"`);
  if (!competitors)
    die('the list holds no competitor entry. A supplied list is every competitor stage 3 profiles, and this one names none');
  const arrival = one('arrival'), by = one('by');
  if (arrival !== undefined && !['file', 'conversation'].includes(arrival))
    die(`--arrival is file or conversation, not "${arrival}"`);
  if (arrival === 'conversation' && !String(by || '').trim())
    die('--by is required with --arrival conversation: a list taken in from the chat is recorded as the person\'s, under their name');
  const previous = one('previous-sha256'), previousFile = one('previous-file'), changedAt = one('changed-at');
  if (previous !== undefined && !/^[0-9a-f]{64}$/.test(String(previous))) die('--previous-sha256 must be the replaced list\'s hash');
  s.supplied_market = { file, bytes, sha256, competitors, trends, recorded_at: one('at') || today(),
                        ...(arrival === undefined ? {} : { arrival }), ...(by === undefined ? {} : { by: String(by).trim() }),
                        ...(previous === undefined ? {} : { previous_sha256: previous }),
                        ...(previousFile === undefined ? {} : { previous_file: previousFile }),
                        ...(changedAt === undefined ? {} : { changed_at: changedAt }) };
  save(st);
  console.log(`${runId} — stage 3 records ${file}: ${competitors} competitor(s), ${trends} trend(s), ${bytes} bytes`);
  console.log(`  ${sha256}`);
  console.log('  The stage works from these addresses. Nothing is searched, and the artifacts record that rather than the build declaring it.');

} else if (cmd === 'judged') {
  const [id] = pos;
  const st = load(runId);
  const s = st.stages.find(x => String(x.id) === String(id));
  if (!s) refuse(`no stage ${id} — stages are 1…7`);
  const gate = (GATES[Number(id)] || {}).quality;
  if (!gate) refuse(`stage ${id} has no quality gate, so it carries no judged half`);
  if (!s.quality_gate)
    refuse(`stage ${id} is "${s.status}" and carries no gate result — there is no gate here for a person to judge. ` +
        `The judged half answers the gate a stage was put up for approval on, so name that stage.`);
  if (['pending', 'running', 'stale', 'superseded'].includes(s.status))
    refuse(`stage ${id} is "${s.status}" and its ${s.quality_gate.id} result is not one anybody is being asked to approve — ` +
        `there is no gate here for a person to judge. The judged half answers the gate a stage was put up for approval on, so name that stage.`);

  const by = one('by'), role = one('role'), typed = one('verdicts');
  if (!by)   refuse('--by is required — the person who judged it, by name. An agent never records one of these');
  if (!role) refuse('--role is required — the role they judged in. A name with no role does not say what they were accountable for');
  const impostor = namesProducer(by);
  if (impostor.length)
    refuse(`--by "${by}" names ${impostor.join(', ')}, which produces work in this workflow.\n` +
        `        The judged half is a person's verdict on a producer's output, so it is never the producer's.\n` +
        `        Name the person who judged it.`);

  const at = one('at') || today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(at)) die(`--at must be a date, not "${at}"`);
  const asOf = String((s.quality_gate && s.quality_gate.run_at) || at);
  const rules = judgedRulesFor(gate, asOf);
  const qs = questionsFor(gate, asOf);
  if (!rules.length)
    refuse(`${gate} carries no judged rule as of ${asOf} — every one of its quality rules is decided by a check, ` +
        `so there is nothing here for a person to answer.`);
  if (!qs.length)
    refuse(`${gate} asks a person nothing: its ${rules.length} judged rule(s) are technical and are not put to you, ` +
        `and the record goes on counting them as not run. There is nothing here for you to answer.`);
  const plain = qs[0].plain;
  const example = qs.map((_, i) => `${i + 1}${['y', '?', 'n'][i % 3]}`).join(' ');
  const bare = qs.map((_, i) => ['y', '?', 'n'][i % 3]).join(' ');

  const read = readJudgedVerdicts(typed, qs, plain);
  if (read.refusal)
    refuse(plain
      ? `${read.refusal}.\n` + qs.map((x, i) => `        ${i + 1}. ${(runLanguage(dirname(pathFor(runId))) === 'cs' && x.plain && czechQuestion(x.text)) || x.text}`).join('\n') + '\n' +
        `        Answer each one: y for yes, n for no, ? if you cannot tell. As in "${example}", or bare and in order, as in "${bare}".`
      : `${read.refusal}.\n` +
        rules.map((r, i) => `        ${i + 1}. [${r.reach || 'process'}] ${r.rule}`).join('\n') + '\n' +
        `        Answer each one: y if the document satisfies it, n if it does not, ? if the document cannot settle it.`);

  if (s.judged_half && Array.isArray(s.judged_half.verdicts) && s.judged_half.verdicts.length)
    refuse(`stage ${id} already carries a judged half, answered by ${s.judged_half.by} on ${shownDate(s.judged_half.at)}. ` +
        `Replacing a recorded verdict is a decision somebody makes, not a second answer typed over the first.`);

  const verdicts = answersToVerdicts(read.verdicts, qs);
  s.judged_half = { by, role, at, as_of: asOf, asked: qs.length, verdicts };
  save(st);
  if (plain) {
    const word = { yes: 'yes', no: 'no', cannot_tell: 'cannot tell', skipped: 'skipped' };
    console.log(`stage ${id}: your answers to ${gate}'s ${qs.length} question(s) are recorded, by ${by}, ${role}, on ${shownDate(at)}`);
    qs.forEach((x, i) => console.log(`  ${i + 1}. ${word[read.verdicts[i]].padEnd(12)} ${x.text}`));
    const short = verdicts.filter(v => v === 'no').length, unsure = verdicts.filter(v => v === 'cannot_tell').length;
    if (short) console.log(`  ${short} answer(s) say the document falls short. The gate result is untouched; if the stage should go back, say so to the agent in chat.`);
    if (unsure) console.log(`  ${unsure} answer(s) were "?", recorded as the document not settling it: an attestation, never a verification.`);
    if (rules.length > qs.length)
      console.log(`  ${rules.length - qs.length} more rule(s) at ${gate} are technical and are not put to you, and the record goes on counting them as not run.`);
  } else {
    console.log(`stage ${id}: the judged half of ${gate} is answered — ${read.verdicts.length} rule(s), by ${by}, ${role}, on ${shownDate(at)}`);
    rules.forEach((r, i) => console.log(`  ${i + 1}. ${read.verdicts[i].padEnd(11)} ${r.rule}`));
    const unresolved = read.verdicts.filter(v => v === 'cannot_tell').length;
    const failed = read.verdicts.filter(v => v === 'no').length;
    if (failed) console.log(`  ${failed} rule(s) answered "no" — the stage goes back through the route it already has, and the gate result is untouched.`);
    if (unresolved) console.log(`  ${unresolved} recorded as the document not settling it, which is an attestation and never a verification.`);
  }

} else if (cmd === 'agree') {
  const [id] = pos;
  const st = load(runId);
  const s = st.stages.find(x => String(x.id) === String(id));
  if (!s) die(`no stage ${id} in ${runId}`);
  const carrier = AGREEMENT_CARRIER[Number(id)];
  if (!carrier) refuse(entryRefusal({ what: `Nothing was agreed: stage ${id} carries no agreement block — only stage ${Object.keys(AGREEMENT_CARRIER).join(', ')} does`,
    next: `Wait until stage ${Object.keys(AGREEMENT_CARRIER).join(', ')} is the stage in hand and its draft is written, then run the task again.` }));
  if (!['running', 'produced', 'q_failed', 'refined'].includes(s.status))
    refuse(entryRefusal({ what: `Nothing was agreed: stage ${id} is "${s.status}" — an agreement is marked on a stage that has produced and not yet been accepted`,
      next: s.status === 'pending'
        ? 'Wait until the draft is written, then run the task again.'
        : `To change what was agreed, the stage is sent back with "${STALE_TASK.redo}" and agreed again.` }));
  const by = one('by');
  if (!by || !String(by).trim())
    refuse(entryRefusal({ what: 'Nothing was agreed: the box \'Your name\' was empty',
      takes: 'An agreement is recorded under the name of the person agreeing; one nobody is named for is not one.',
      next: 'Run the task again and type your name.' }));
  const impostor = namesProducer(by);
  if (impostor.length)
    refuse(notPersonRefusal(by, 'agreeing the PRD', 'Your name', 'Nothing was agreed'));
  const at = one('at') || today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(at)) die(`--at "${at}" is not a date`);
  const laterThan = recordedDecisions(s).map(d => d.decided_at).filter(Boolean).sort().pop();
  if (laterThan && at > laterThan)
    refuse(entryRefusal({ what: `Nothing was agreed: stage ${id}'s agreement would be dated ${at}, after its decision on ${laterThan}`,
      takes: 'A PRD is agreed before the stage is decided, never after.',
      next: `To agree it again, the stage is sent back with "${STALE_TASK.redo}", which ends the decision first.` }));
  const dir = join(RUNS_ROOT, runId);
  const agreed = agreedFiles(dir, carrier, { by: String(by).trim(), at });
  if (agreed.problem) refuse(`Nothing was recorded. ${agreed.problem}`);
  const replaced = writeAgreedFiles(dir, carrier, agreed);
  if (envelopeAtApproval(dir)) {
    const v = envelopeView(dir);
    for (const rel of [agreed.document.rel, ...agreed.records.map(r => r.rel)]) {
      const t = v.texts.get(rel.split('\\').join('/'));
      if (t !== undefined) writeFileSync(join(dir, rel), t);
    }
  }
  s.agreement = { by: String(by).trim(), at, recorded_at: today() };
  if (s.status === 'running') seeContent(s, 'agreement', 'agreed', at, st, { compared: new Set([carrier.draft]) });
  save(st);
  console.log(`The agreement is recorded in the name of ${String(by).trim()}, on ${shownDate(at)}.`);
  console.log(`The agreed PRD is written from the draft, word for word: ${agreed.document.rel}, with ` +
              `${agreed.records.length === 1 ? 'its record' : 'its records'} ${agreed.records.map(r => r.rel).join(', ')}.`);
  if (replaced.length)
    console.log('An agreed PRD written earlier did not say what the draft now says, and was replaced. Its text is kept in superseded/.');

} else if (cmd === 'seen') {
  const [id] = pos;
  const st = load(runId);
  const s = st.stages.find(x => String(x.id) === String(id));
  if (!s) die(`no stage ${id} in ${runId}`);
  if (!AGREEMENT_CARRIER[Number(id)])
    die(`stage ${id} carries no agreement block — only stage ${Object.keys(AGREEMENT_CARRIER).join(', ')} is put to a person for agreement`);
  if (s.status !== 'running')
    die(`stage ${id} is "${s.status}" — a draft is put to a person for agreement while its stage is running`);
  const read = s.content_seen && typeof s.content_seen === 'object' && !Array.isArray(s.content_seen)
    && Object.keys(s.content_seen).length;
  if (!read) {
    seeContent(s, 'agreement', 'asked', today(), st);
    if (s.content_seen) save(st);
  }

} else if (cmd === 'decide') {
  const [id] = pos;
  const st = load(runId);
  const s = st.stages.find(x => String(x.id) === String(id));
  if (!s) refuse(`no stage ${id} — stages are 1…7`);
  let reopenedSignOffs = [];

  const KINDS = ['choice', 'direction', 'exception'];
  const kind = one('kind'), what = one('what'), by = one('by'), role = one('role');
  if (!kind || !KINDS.includes(kind))
    refuse(`--kind must be one of ${KINDS.join(', ')}.\n` +
        `        choice: the person picked from what the workflow offered.\n` +
        `        direction: the person changed the shape of the work.\n` +
        `        exception: the person signed a check this run cannot satisfy.`);
  const withdrawing = kind === 'exception' && one('supersedes') !== undefined && !String(one('check') ?? '').trim();
  if (kind === 'exception' && one('narrow') !== undefined) narrowSignOff(st, s, one('narrow'), one('drop'));
  {
    const notPerson = personOnly(by, withdrawing ? 'Withdrawing a sign-off'
      : ({ choice: 'A choice', direction: 'A direction', exception: 'A signed exception' })[kind]);
    if (notPerson) refuse(notPerson);
  }
  if (!what && !withdrawing) refuse("--what is required, in the person's own words. A decision with no words is a tick box");
  if (!by)   refuse('--by is required — the person who decided, by name. An agent never writes one of these');
  if (!role) refuse('--role is required — the role they decided in. A name with no role does not say what they were accountable for');
  {
    const near = nearMissRole(role, rolesOn(st));
    if (near) refuse(`--role "${role}" is one or two characters from "${near}", which this run already records. ` +
      `If they are the same role, type it the way the run already spells it. If it really is a different ` +
      `role, name it so it does not read as a slip.`);
  }
  const heads = headsUps({ state: st, by, role, stage: id, gates: kind === 'direction' ? [] : decisionsFor(id) });

  const at = one('at') || today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(at)) die(`--at must be a date, not "${at}"`);

  const check = one('check'), reason = one('reason'), affects = one('affects');
  const supersede = one('supersedes') === undefined ? undefined : storedDate(one('supersedes'));
  const causeTyped = String(one('cause') ?? '').trim();
  const cause = causeTyped
    ? Object.keys(EXCEPTION_CAUSES).find(k => k === causeTyped || EXCEPTION_CAUSES[k] === causeTyped.toLowerCase()) : '';
  if (causeTyped && kind !== 'exception')
    die(`--cause belongs to a sign-off, and this decision is a ${kind}. It says whether the check failed because ` +
        `${Object.values(EXCEPTION_CAUSES).join(' or because ')}.`);
  if (causeTyped && !cause)
    refuse(`--cause is ${Object.keys(EXCEPTION_CAUSES).map(k => `"${k}" (${EXCEPTION_CAUSES[k]})`).join(' or ')}, not "${causeTyped}".`);
  const selection = String(one('selection') ?? '').trim();
  if (selection && kind === 'direction')
    refuse(`--selection belongs to a choice, and this decision is a ${kind}. It names the one a person picked from ` +
        `what the stage offered.\n` +
        `        Leave the selection box empty and say why in the words box.`);
  let resolvedSelection = null, selectionUnchecked = false;
  const checks = [...new Set(String(check == null ? '' : check).split(',').map(s => s.trim()).filter(Boolean))];
  const sameDay = supersede === undefined ? []
    : (st.decisions || []).filter(d => String(d.stage) === String(id) && !d.superseded_by && d.kind === kind && d.at === supersede);
  const target = sameDay.find(d => kind === 'exception' && signedChecks(d).some(c => checks.includes(c))) || sameDay[0];
  if (withdrawing) {
    if (!reason && !what) refuse("--reason is required to withdraw a sign-off — why it no longer stands, in the person's own words");
  } else if (kind === 'exception') {
    if (!checks.length)
      refuse('--check is required on an exception — which check or checks this run cannot satisfy, separated by commas.\n' +
          '        A check is signed off with "SPOCK: sign off a check this run cannot meet". A sign-off is withdrawn with ' +
          '"SPOCK: replace a decision that no longer stands", kind exception, giving the sign-off\'s date.');
    const malformed = checks.filter(c => !/^C\d+$/.test(c));
    if (malformed.length)
      refuse(`--check takes check ids like C126, separated by commas. Not ${malformed.map(c => `"${c}"`).join(', ')}.\n` +
          `        The gate prints the id at the start of every failing line; it is that, never the sentence after it.`);
    if (!reason) refuse("--reason is required on an exception, in the person's own words — why it cannot be satisfied, not that it was not");
    const unsignable = checks.filter(c => NEVER_SIGNABLE.includes(c));
    if (unsignable.length)
      refuse(`${unsignable.join(', ')} cannot be signed away. ${NEVER_SIGNABLE.join(', ')} are what make the record worth ` +
          `reading — who decided, that a person decided, that the record and the artifacts agree, that the ` +
          `gate ran independently, that the workflow and the supplied material are what the release and intake put there. ` +
          `A run that can sign these has no evidence left to offer.\n` +
          unsignable.map(c => `        What fixes ${c}: ${String(unsignableFix(c) || '').replaceAll('<run_id>', st.run_id)}\n`).join('') +
          `        **The whole signature is refused, not the rest of it.** Sign the others on their own.`);
    {
      const recorded = s.quality_gate && String(s.quality_gate.result) === 'fail'
        && Array.isArray(s.quality_gate.failed) ? s.quality_gate.failed.map(String) : null;
      const stray = recorded && recorded.length ? checks.filter(c => !recorded.includes(c)) : [];
      if (stray.length)
        refuse(`stage ${id}'s ${s.quality_gate.id} recorded ${recorded.join(', ')} as failing, and ` +
            `${stray.join(', ')} ${stray.length === 1 ? 'is' : 'are'} not among them.\n` +
            `        A signature answers what the gate found. One naming anything else is recorded, ` +
            `standing and covers nothing, which is how a person comes to hold a signature that changed nothing.\n` +
            `        Sign ${recorded.join(', ')}, or whichever of them this run genuinely cannot satisfy.`);
    }
    const standingSigs = (st.decisions || [])
      .filter(d => d.kind === 'exception' && String(d.stage) === String(id) && !d.superseded_by && d !== target);
    const already = new Set(standingSigs.flatMap(signedChecks));
    const kGate = s.quality_gate && Array.isArray(s.quality_gate.contradictions) ? s.quality_gate.contradictions.map(String) : [];
    const kCovered = new Set(standingSigs.filter(d => signedChecks(d).includes(CONTRADICTION_CHECK)).flatMap(entriesOf));
    reopenedSignOffs = checks.includes(CONTRADICTION_CHECK) && kGate.length && !kGate.every(k => kCovered.has(k))
      ? standingSigs.filter(d => signedChecks(d).length === 1 && signedChecks(d)[0] === CONTRADICTION_CHECK) : [];
    const twice = checks.filter(c => already.has(c) && !(c === CONTRADICTION_CHECK && reopenedSignOffs.length));
    if (twice.length) {
      const standing = standingSigs.filter(d => signedChecks(d).some(c => twice.includes(c)));
      const groups = standing.map(d => ({ at: d.at, checks: twice.filter(c => standing.find(x => signedChecks(x).includes(c)) === d) }))
        .filter(g => g.checks.length);
      const dates = [...new Set(groups.map(g => g.at))];
      const named = groups.map(g => `${g.checks.join(', ')} from ${shownDate(g.at)}`);
      const stands = groups.length === 1 ? `The sign-off of ${named[0]} stands`
        : `The sign-offs of ${named.slice(0, -1).join(', ')} and ${named[named.length - 1]} stand`;
      const giving = dates.length === 1 ? `giving the date ${shownDate(dates[0])}` : 'giving its date';
      const REPLACE = '"SPOCK: replace a decision that no longer stands", kind exception';
      if (twice.length === checks.length) {
        console.log(`${stands}; nothing more is needed.\n` +
          `        Nothing you typed was recorded. To change ${groups.length === 1 ? 'that sign-off' : 'one of them'} instead, ` +
          `replace it with ${REPLACE}, ${giving}.`);
        process.exit(0);
      }
      const rest = checks.filter(c => !twice.includes(c));
      refuse(`${stands}. stage ${id} already carries a standing signed exception for ${twice.join(', ')}, signed on ${dates.map(d => shownDate(d)).join(', ')}. ` +
          `One per check per stage; widening it is a new decision, not a second signature.\n` +
          `        Nothing you typed was recorded. Sign ${rest.join(', ')} on ${rest.length === 1 ? 'its' : 'their'} own with ` +
          `"SPOCK: sign off a check this run cannot meet", or replace the sign-off of ` +
          `${twice.join(groups.length === 1 ? ', ' : ' or ')} with ${REPLACE}, ${giving}.`);
    }
  } else if (kind === 'choice') {
    const cands = choiceCandidates(runId, id);
    if (selection) {
      const r = resolveChoice(selection, cands);
      if (r.refusal) refuse(`stage ${id}: ${choiceRefusal(r, id, 'The selection box')}`);
      resolvedSelection = r.id || selection;
      selectionUnchecked = !r.id;
    } else if (cands) {
      const r = resolveChoice(selection, cands);
      if (r.refusal) refuse(`stage ${id}: ${choiceRefusal(r, id, 'The selection box')}`);
    }
  } else if (check || (reason && supersede === undefined)) {
    die(`--check belongs to an exception, and --reason to an exception or a --supersedes. A ${kind} says what was decided in --what`);
  }

  st.decisions = st.decisions || [];

  let replacedNow = [];
  const restedOn = !withdrawing ? [] : (st.stages || [])
    .filter(x => Number(x.id) > Number(id) && ['accepted', 'in_review', 'refined'].includes(x.status)
      && x.quality_gate && String(x.quality_gate.result) === 'fail')
    .map(x => ({ id: x.id, checks: [...coveringSignatures(st, x)].filter(([, v]) => v.carried && sameDay.includes(v.d)).map(([c]) => c) }))
    .filter(x => x.checks.length);
  if (supersede !== undefined) {
    const mineNow = (st.decisions || []).filter(d => String(d.stage) === String(id) && !d.superseded_by);
    if (!target)
      refuse(`stage ${id} carries no standing ${kind} dated ${shownDate(supersede)}.\n` +
          `        Standing ${kind}(s) on this stage: ${mineNow.filter(d => d.kind === kind).map(d => shownDate(d.at)).join(', ') || 'none'}.\n` +
          `        --supersedes takes the date of the decision this one replaces, so the record says which was replaced rather than losing it.`);
    if (!reason && kind !== 'exception')
      refuse('--reason is required when superseding a decision — why the earlier one no longer stands, in the person\'s own words');
    const replaced = kind === 'choice' ? mineNow.filter(d => d.kind === 'choice') : withdrawing ? sameDay : [target];
    for (const d of replaced) {
      d.superseded_by = at;
      d.superseded_reason = reason || (withdrawing ? what : '') || 'replaced by a later decision on the same stage';
    }
    replacedNow = replaced;
  }

  for (const d of reopenedSignOffs) {
    d.superseded_by = at;
    d.superseded_reason = `signed again over ${CONTRADICTION_CHECK} on ${at}, covering every contradiction open then`;
  }
  if (!withdrawing) st.decisions.push({ stage: String(id), kind, what, by, role, at,
                      ...(affects ? { affects } : {}), ...(kind === 'exception' ? { check: checks } : {}),
                      ...(resolvedSelection ? { selection: resolvedSelection } : {}),
                      ...(kind === 'exception' && reason ? { reason } : {}),
                      ...(kind === 'exception' && cause ? { cause } : {}),
                      ...(kind === 'exception' && checks.includes(CONTRADICTION_CHECK)
                        ? (open => (open.length ? { entries: open } : {}))(recordedContradictions(join(RUNS_ROOT, runId))
                            .filter(k => k.resolution !== 'corrected').map(k => k.id).filter(Boolean)) : {}) });
  save(st);
  const mine = st.decisions.filter(d => String(d.stage) === String(id));
  if (withdrawing) {
    for (const d of replacedNow)
      console.log(`stage ${id}: the sign-off of ${signedChecks(d).join(', ')} recorded by ${d.by} on ${shownDate(d.at)} is withdrawn — ${d.superseded_reason}`);
    console.log(`  it stays on the record with why it no longer stands, and nothing new is recorded`);
    const still = new Set(mine.filter(d => d.kind === 'exception' && !d.superseded_by).flatMap(signedChecks));
    const bare = [...new Set(replacedNow.flatMap(signedChecks))].filter(c => !still.has(c));
    const sNow = st.stages.find(x => String(x.id) === String(id));
    if (sNow && ['accepted', 'in_review', 'refined'].includes(sNow.status) && sNow.quality_gate && String(sNow.quality_gate.result) === 'fail')
      regateAfterWithdrawal(st, sNow);
    else if (bare.length)
      console.log(`  ${bare.join(', ')} ${bare.length === 1 ? 'has' : 'have'} no standing sign-off on stage ${id} now. Where the gate ` +
                  `still finds ${bare.length === 1 ? 'it' : 'them'} failing, ${bare.length === 1 ? 'it is' : 'they are'} fixed, or signed ` +
                  `again with "SPOCK: sign off a check this run cannot meet".`);
    for (const later of restedOn) {
      console.log(`  stage ${later.id} carried ${later.checks.join(', ')} from this sign-off, so its gate runs again too.`);
      regateAfterWithdrawal(st, st.stages.find(x => String(x.id) === String(later.id)), id);
    }
  } else {
    console.log(`stage ${id}: ${kind} recorded — ${what}`);
    console.log(`  decided by ${by}, ${role}, on ${shownDate(at)}`);
    for (const d of replacedNow)
      console.log(`  it replaces the ${d.kind} ${d.by} recorded on ${shownDate(d.at)}${d.selection ? `, which chose ${d.selection}` : ''}: ` +
                  `that one stays on the record with why it no longer stands`);
    if (resolvedSelection && selectionUnchecked)
      console.log(`  the selection is recorded as ${resolvedSelection}, as typed — nothing on this run lists what stage ${id} chooses between, so nothing checked it`);
    else if (resolvedSelection)
      console.log(`  the choice resolves to ${resolvedSelection}, which is what every reader of this run compares against`);
    if (kind === 'exception')
      console.log(`  ${checks.join(', ')} ${checks.length === 1 ? 'is' : 'are'} signed off for this stage, and for the gates of later ` +
                  `stages that find the same failure where it is about a stage already accepted. ` +
                  `The gate still reports ${checks.length === 1 ? 'it' : 'them'}, and its result stays "fail" wherever it is shown.`);
    if (kind === 'exception' && cause === 'workflow')
      console.log(`  ${WORKFLOW_FAULT_WORDS}: the run's front page says so beside the sign-off, and ` +
                  `"SPOCK: how the workflow performed" lists it for whoever maintains the workflow.`);
    else if (kind === 'exception' && cause === 'material')
      console.log(`  recorded as a gap in the material, not a fault in the workflow.`);
  }
  if (!withdrawing && kind === 'choice' && Number(id) === 4 && replacedNow.length && resolvedSelection) {
    const s4 = st.stages.find(x => Number(x.id) === 4);
    const same = replacedNow.every(d => selectedId(d.selection) === selectedId(resolvedSelection));
    if (s4 && String(s4.status) === 'accepted' && !same) {
      const dir = join(RUNS_ROOT, runId);
      const keptAsked = heldAsked(runId, 'A9');
      writeIntoArtifact(runId, 'A9', 'decision', []);
      writeDecisionBlocks(st, s4, resolvedSelection, keptAsked);
      const rec = selectedFromRecord(dir, readBack(st));
      let reads = '';
      if (rec && rec.opts) {
        const w = writeSelected(dir, rec.opts);
        if (w && w.problem) console.log(`  the selected-solution document was not written again: ${w.problem}`);
        const picked = fillSelected(dir, readBack(st));
        if (picked && picked.problem) console.log(`  ${picked.problem}`);
        reads = rec.opts.id;
      } else if (rec && rec.why) console.log(`  ${rec.why}`);
      const later = staleDownstream(st, s4);
      save(st);
      const listed = later.length > 1 ? `${later.slice(0, -1).join(', ')} and ${later[later.length - 1]}` : String(later[0] || '');
      if (reads) console.log(`  The selected-solution document now reads ${reads}.` +
        (later.length ? ` ${later.length === 1 ? 'Stage' : 'Stages'} ${listed} ${later.length === 1 ? 'is' : 'are'} out of date: ` +
          `${later.length === 1 ? 'it is' : 'they are'} redone from ${reads} with SPOCK: continue.` : ''));
      else if (later.length) console.log(`  ${later.length === 1 ? 'Stage' : 'Stages'} ${listed} ${later.length === 1 ? 'is' : 'are'} out of date.`);
    }
  }
  if (kind === 'exception' && selection)
    console.log(`  the selection box is not read on an exception, and what was typed in it is not recorded`);
  console.log(`${mine.length} decision(s) recorded on this stage, ${mine.filter(d => !d.superseded_by).length} standing, ${st.decisions.length} on the run.`);
  for (const l of heads) console.log(l);

} else if (cmd === 'correct-name') {
  const [id] = pos;
  const st = load(runId);
  const s = id === undefined || String(id).trim() === '' ? null : st.stages.find(x => String(x.id) === String(id));
  if (id !== undefined && String(id).trim() !== '' && !s) die(`no stage ${id} — stages are 1…7`);
  const NOTHING = 'Nothing was corrected.';
  const from = String(one('from') ?? '').trim();
  const to = String(one('to') ?? '').trim();
  const by = String(one('by') ?? '').trim();
  const reason = String(one('reason') ?? '').trim();
  if (!from) refuse(`${NOTHING} The box for the name as the record spells it now was empty. Type it exactly as the heads-up or the run's front page shows it.`);
  if (!to)   refuse(`${NOTHING} The box for the name as it should be spelled was empty.`);
  if (!by)   refuse(`${NOTHING} The box for your own name was empty. The record says who made this correction.`);
  if (!reason) refuse(`${NOTHING} The box for why the recorded spelling is wrong was empty, and a correction with no reason cannot be judged later.`);
  if (from === to)
    refuse(`${NOTHING} Both name boxes say "${from}", so there is nothing to correct. The first box is the spelling on the record now and the second is the spelling it should be.`);
  for (const [flag, v] of [['--to', to], ['--by', by]]) {
    const impostor = namesProducer(v);
    if (impostor.length)
      refuse(`${NOTHING} ${flag} "${v}" names ${impostor.join(', ')}, which produces work in this workflow.\n` +
          `        A name on the record is a person's, and correcting one is a person's act and never a producer's.\n` +
          `        Name the person.`);
  }
  const standingOn = sid => (st.decisions || []).filter(d => String(d.stage) === String(sid) && !d.superseded_by);
  const placesOf = (stage, name) => {
    const rewrites = [], keeps = [];
    if (stage.owner && String(stage.owner.name || '') === name) rewrites.push('owner');
    for (const g of recordedDecisions(stage)) if (String(g.decided_by || '') === name) rewrites.push(String(g.id));
    const decs = standingOn(stage.id).filter(d => String(d.by || '') === name);
    if (decs.length) rewrites.push(`${decs.length} decision${decs.length === 1 ? '' : 's'}`);
    if (stage.agreement && String(stage.agreement.by || '') === name) keeps.push('the PRD agreement mark');
    if (stage.judged_half && String(stage.judged_half.by || '') === name) keeps.push("the answers to the gate's questions");
    for (const r of (st.refinements || []).filter(r2 => String(r2.stage) === String(stage.id) && String(r2.by || '') === name))
      keeps.push(`the send-back of ${r.at}`);
    const gone = (st.decisions || []).filter(d => String(d.stage) === String(stage.id) && d.superseded_by && String(d.by || '') === name);
    if (gone.length) keeps.push(`${gone.length} withdrawn decision${gone.length === 1 ? '' : 's'}`);
    return { rewrites, keeps, decs };
  };
  const whoElse = list => {
    const where = test => { const ids = list.filter(e => e.here.rewrites.some(test)).map(e => e.x.id); return ids.length === 1 ? `stage ${ids[0]}` : `stages ${ids.join(' and ')}`; };
    const has = test => list.some(e => e.here.rewrites.some(test));
    const isGate = p => /^G\d/.test(p), isOwner = p => p === 'owner', isDecision = p => /decision/.test(p);
    return [has(isGate) ? `If someone else should have approved ${where(isGate)}, send it back with "SPOCK: send a stage back to be redone" and approve it again.` : '',
      has(isOwner) ? `If someone else owns ${where(isOwner)}, record them with "SPOCK: record who owns this stage".` : '',
      has(isDecision) ? `If someone else made the decision on ${where(isDecision)}, replace it with "SPOCK: replace a decision that no longer stands".` : '']
      .filter(Boolean).map(l => `        ${l}`).join('\n');
  };
  const carrying = st.stages.map(x => ({ x, here: placesOf(x, from) })).filter(e => e.here.rewrites.length);
  if (!carrying.length) {
    const scope = s ? [s] : st.stages;
    const where = s ? `Stage ${id}` : 'This run';
    const keepsOnly = scope.map(x => ({ x, keeps: placesOf(x, from).keeps })).filter(e => e.keeps.length);
    if (keepsOnly.length)
      refuse(`${NOTHING} ${where} records "${from}" only where this task does not rewrite a name: ` +
          `${keepsOnly.map(e => (s ? e.keeps.join(', ') : `on stage ${e.x.id}, ${e.keeps.join(', ')}`)).join('; ')}.\n` +
          `        Those stay as typed. A correction rewrites each stage's owner, its gate entries and the decisions standing on it.`);
    const names = new Map();
    for (const x of scope)
      for (const n of new Set([x.owner && x.owner.name, ...recordedDecisions(x).map(g => g.decided_by),
                               ...standingOn(x.id).map(d => d.by)].map(v => String(v || '')).filter(Boolean))) {
        const w = placesOf(x, n).rewrites.map(p => (s ? p : `stage ${x.id} ${p}`));
        names.set(n, [...(names.get(n) || []), ...w]);
      }
    refuse(`${NOTHING} ${where} records no name spelled "${from}". ` +
        (names.size ? `It records ${[...names].map(([n, w]) => `"${n}" (${w.join(', ')})`).join(', ')}. ` : 'It records no name at all. ') +
        `Type the name exactly as the record spells it.`);
  }
  if (nearMissName(to, new Set([from])) !== from)
    refuse(`${NOTHING} "${to}" is not another spelling of "${from}". This task corrects how a name is spelled, never who decided.\n` +
        whoElse(carrying));

  const at = today();
  const done = [];
  for (const { x, here } of carrying) {
    const rewritten = (here.rewrites.includes('owner') ? 1 : 0)
      + recordedDecisions(x).filter(g => String(g.decided_by || '') === from).length + here.decs.length;
    if (x.owner && String(x.owner.name || '') === from) x.owner.name = to;
    for (const g of recordedDecisions(x)) if (String(g.decided_by || '') === from) g.decided_by = to;
    for (const d of here.decs) {
      if (d.by_as_typed === undefined || d.by_as_typed === '') d.by_as_typed = from;
      d.by = to;
    }
    x.corrections = [...(Array.isArray(x.corrections) ? x.corrections : []), { from, to, by, at, reason, places: here.rewrites.join(', ') }];
    done.push({ x, here, rewritten });
  }
  save(st);
  for (const { x, here, rewritten } of done) {
    const spoken = here.rewrites.map(w => w === 'owner' ? 'the stage owner' : w.replace(/^(\d+) (decisions?)$/, '$1 standing $2'));
    console.log(`stage ${x.id}: "${from}" is now "${to}" in ${rewritten} place(s): ` +
                `${spoken.length > 1 ? `${spoken.slice(0, -1).join(', ')} and ${spoken[spoken.length - 1]}` : spoken[0]}.`);
  }
  console.log(`  the spelling as typed stays on the record, with who corrected it, when and why`);
  for (const { x } of done) {
    if (String(x.status) === 'accepted') writeDecisionBlocks(st, x, '');
    if (Number(x.id) === 4 && String(x.status) === 'accepted') {
      const dir = join(RUNS_ROOT, runId);
      const r = selectedFromRecord(dir, readBack(st));
      if (r && r.opts) { const made = writeSelected(dir, r.opts); if (made && made.changed) console.log(`  A9 carries the G4 record again, under the corrected name`); }
    }
  }
  console.log(`  no stage moved, and nothing is approved again`);
  for (const x of st.stages)
    for (const k of placesOf(x, from).keeps) console.log(`  ${k} on stage ${x.id} keeps "${from}", as typed.`);

} else if (cmd === 'retract') {
  const id = rest[0];
  const st = load(runId);
  const s = st.stages.find(x => String(x.id) === String(id));
  if (!s) die(`stage ${id} is not in this run`);
  const by = one('by'), reason = one('reason');
  if (!by || !String(by).trim())
    refuse(entryRefusal({ what: 'Nothing was sent back: the box \'Your name\' was empty',
      takes: 'Ending an acceptance is a person\'s act, and an unattributed one is not a record.', next: 'Run the task again and type your name.' }));
  { const notPerson = notPersonRefusal(String(by).trim(), 'sending a stage back', 'Your name', 'Nothing was sent back'); if (notPerson) refuse(notPerson); }
  if (!reason || !String(reason).trim())
    refuse(entryRefusal({ what: 'Nothing was sent back: the box \'Why it was sent back, in your own words\' was empty',
      takes: 'A stage returned with no reason cannot be read afterwards.', next: 'Run the task again and say why.' }));
  if (!holdsAResult(s))
    refuse(`Nothing was sent back: stage ${id} is "${s.status}" and carries no gate result, so there is no acceptance here to end. ` +
        ({ pending: 'Nothing has been written for it yet: wait until its agent writes it.',
           running: 'It is being written, and its gate runs on it once it is: wait for that.',
           produced: 'Its gate runs on it when "SPOCK: check what is written, then continue" runs.',
           superseded: 'It was replaced by a later version and stays as it is: nothing needs sending back.' }[s.status]
         || 'Move it back to running with "SPOCK: move a stage", and its agent writes it again.'));
  const typedRole = String(one('role') ?? '').trim();
  if (typedRole) {
    const near = nearMissRole(typedRole, rolesOn(st));
    if (near) refuse(entryRefusal({ what: `Nothing was sent back: the role "${typedRole}" is one or two characters from "${near}", which this run already records`,
      takes: 'The box \'The role you decided in\' takes the role the way the run already spells it, or a different role named so it does not read as a slip.',
      next: 'Run the task again with the role as it should read.' }));
  }
  const role = typedRole || ownRole(st, s, String(by).trim());
  if (!role)
    refuse(entryRefusal({ what: `Nothing was sent back: the role box was empty, and ${String(by).trim()} has recorded no role on this run`,
      takes: 'A stage is sent back in the sender\'s own role, never the stage owner\'s: the box \'The role you decided in\' takes it.',
      next: 'Run the task again and type the role you decided in.' }));

  const had = { gate: !!s.quality_gate, decided: (s.decision_gates || []).map(d => d.id),
                answered: !!(s.judged_half && Array.isArray(s.judged_half.verdicts) && s.judged_half.verdicts.length) };
  delete s.quality_gate;
  delete s.decision_gates;
  delete s.decision_gate;
  if (had.answered) {
    const jh = s.judged_half;
    st.judged_withdrawn = st.judged_withdrawn || [];
    st.judged_withdrawn.push({ stage: String(id), by: jh.by, role: jh.role, at: jh.at, as_of: jh.as_of, asked: jh.asked,
      verdicts: [...jh.verdicts], withdrawn_at: today(), withdrawn_reason: `stage ${id} was sent back: ${String(reason).trim()}` });
  }
  delete s.judged_half;
  if (s.agreement) { delete s.agreement; console.log(`  stage ${id}'s agreement is ended with its acceptance`); }
  const agreedCarrier = AGREEMENT_CARRIER[Number(id)];
  const agreedTakenBack = agreedCarrier
    ? [...runArtifacts(join(RUNS_ROOT, runId)).filter(a => a.id === agreedCarrier.agreed), ...recordsFor(join(RUNS_ROOT, runId), agreedCarrier.agreed)]
    : [];
  for (const f of agreedTakenBack) {
    supersedeFile(join(RUNS_ROOT, runId), f.rel, { reason: 'the agreement it was written from ended with the stage\'s acceptance', by: String(by).trim() });
    console.log(`  ${f.rel} is taken back with the agreement and kept in superseded/`);
  }
  s.status = 'running';

  const withdrawnDecisions = (st.decisions || []).filter(d => String(d.stage) === String(id) && !d.superseded_by);
  for (const d of withdrawnDecisions) {
    d.superseded_by = today();
    d.superseded_reason = `stage ${id} was sent back: ${String(reason).trim()}`;
  }
  st.decisions = st.decisions || [];

  const mine = new Set((s.artifacts || []).map(String));
  const unstaled = (st.stale || []).filter(x => mine.has(String(x.artifact))).length;
  st.stale = (st.stale || []).filter(x => !mine.has(String(x.artifact)));

  const staled = staleDownstream(st, s);

  const reset = [];
  for (const x of st.stages)
    if (x.id > s.id && (x.status === 'stale' || x.status === 'running') && !(x.artifacts || []).some(a => {
      try { const f = artifactFile(join(RUNS_ROOT, runId), a); return !!(f && f.abs && existsSync(f.abs)); } catch { return false; }
    })) {
      x.status = 'pending'; x.know_how = []; delete x.decision_gates; delete x.decision_gate; reset.push(x.id);
    }

  st.decisions.push({ stage: String(id), kind: 'direction', at: today(),
                      what: `Ended stage ${id}'s acceptance and returned it to its skill: ${String(reason).trim()}`,
                      by: String(by).trim(), role });

  if (!envelopeAtApproval(join(RUNS_ROOT, runId))) for (const g of had.decided) {
    const carrier = DECISION_CARRIER[g];
    if (carrier) { const touched = writeIntoArtifact(runId, carrier, 'decision', []);
                   if (touched) console.log(`  ${carrier} no longer carries the ${g} record`); }
  }
  syncArtifactStatus(runId, s);
  save(st);
  console.log(`stage ${id} returned to its skill by ${String(by).trim()}.`);
  console.log(`  dropped: ${had.gate ? 'the quality gate result' : 'no gate result'}` +
              `${had.decided.length ? `, ${had.decided.join(' and ')}` : ''}` +
              `${unstaled ? `, ${unstaled} stale mark(s) on its own outputs` : ''}` +
              `${reset.length ? `, and stage(s) ${reset.join(', ')} back to pending` : ''}.`);
  if (had.answered)
    console.log(`  kept as withdrawn: your answers to ${(GATES[Number(id)] || {}).quality}'s questions, marked with today's date and your reason.`);
  if (withdrawnDecisions.length)
    console.log(`  withdrawn, kept on the record: ${withdrawnDecisions.length} decision(s) on stage ${id}, each marked with today's date and your reason.`);
  const keptStale = staled.filter(x => !reset.includes(x));
  if (keptStale.length) {
    console.log(`  stage(s) ${keptStale.join(', ')} marked stale, because ${keptStale.length === 1 ? 'it was' : 'each was'} built on stage ${id}.`);
    console.log(`  Once stage ${id} is accepted again, ${staleRoutes(keptStale.length === 1 ? 'that stage' : 'each of them')}.`);
  }
  const takeBack = st.stages
    .filter(x => Number(x.id) === Number(s.id) || (Number(x.id) > Number(s.id) && !HOLDS_ITS_RESULT.includes(x.status)))
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map(x => STAGE_DIRS[Number(x.id) - 1] && folderTakeBack(join(RUNS_ROOT, runId), STAGE_DIRS[Number(x.id) - 1]))
    .filter(t => t && t.files.length);
  if (!takeBack.length)
    console.log(`  The ${agreedTakenBack.length ? 'other ' : ''}outputs are not touched here. Take them back with "SPOCK: take something back", which keeps them in superseded/.`);
  else console.log(`  The ${agreedTakenBack.length ? 'other ' : ''}outputs are not touched here, and are kept in superseded/ when you take them back.`);
  for (const t of takeBack) {
    const n = t.files.length;
    console.log(`  Stage ${t.stage} holds ${n} file(s) the take-back would move:`);
    for (const l of takeBackListing(t)) console.log(l);
    console.log(`  To take back stage ${t.stage}'s work in one step, run "SPOCK: take something back" and type ` +
                `\`${takeBackTyped(t.folder, n)}\` in the file box. Its ${n} file${n === 1 ? ' is' : 's are'} listed above.`);
  }

} else if (cmd === 'unread') {
  if (pos.length || Object.keys(f).length) die('unread takes the run and nothing else: it works out from the dates which body each stage could not read.');
  const st = load(runId);
  let producedAt;
  try { producedAt = producedAtOf(join(RUNS_ROOT, runId)); }
  catch (e) { die(`a file in the run cannot be read, so the day each stage ran cannot be worked out: ${String(e.message).split('\n')[0]}`); }
  const bare = b => String(b).replace(/\.md$/, '').split('@')[0];
  st.know_how_not_read = st.know_how_not_read || [];
  const added = [], skipped = [], owed = [];
  for (const s of [...st.stages].sort((a, b) => Number(a.id) - Number(b.id))) {
    if (s.status === 'pending' || s.status === 'superseded') continue;
    if (s.status === 'running' && !(s.know_how || []).length) continue;
    const recorded = new Set((s.know_how || []).map(e => String(e).split('@')[0]));
    const ranAt = stageRanAt(s, st, producedAt);
    const ranDay = ranAt ? String(ranAt).slice(0, 10) : null;
    for (const o of knowHowOwed(s.id, { recorded, ranAt })) {
      if (o.state === 'excused') continue;
      if (st.know_how_not_read.some(w => w && Number(w.stage) === Number(s.id) && bare(w.body) === o.body)) {
        skipped.push(`stage ${s.id}: ${o.body} is already declared not read, so it is not recorded again.`);
        continue;
      }
      const day = d => shownDate(String(d).slice(0, 10));
      const when = o.which === 'first' ? `it first appeared on ${day(o.date)}`
        : o.which === 'bound' ? `it was bound to ${o.skill} on ${day(o.date)}`
        : `it does not say when it first appeared${o.version ? ` (its version ${o.version}${o.dated ? ` is dated ${day(o.dated)}` : ''})` : ''}`;
      if (o.state === 'owed') {
        owed.push(`Stage ${s.id} has not read ${o.body} and has to: ${when}, and stage ${s.id} ran on ${ranDay ? day(ranDay) : 'a day the record does not give'}. ` +
          `The stage reads it when it is redone: the person sends it back with "SPOCK: send a stage back to be redone".`);
        continue;
      }
      added.push({ stage: String(s.id), body: o.body,
        reason: o.which === 'first'
          ? `${o.body} first appeared on ${String(o.date).slice(0, 10)}, the day stage ${s.id} ran, so it may not have existed when the stage read its know-how.`
          : `${o.body} was bound to ${o.skill} on ${String(o.date).slice(0, 10)}, the day stage ${s.id} ran, so the stage may not have been told to read it.` });
    }
  }
  if (owed.length) {
    const waiting = added.length ? `\n        The ${added.length} body/bodies that landed the day their stage ran are recorded when this runs again and no stage owes an older one.` : '';
    refuse(`Nothing was recorded.\n        ${owed.join('\n        ')}${waiting}`);
  }
  for (const l of skipped) console.log(l);
  if (!added.length) {
    console.log('No stage owes a know-how body that landed the day it ran, so there is nothing to record.');
  } else {
    for (const a of added) st.know_how_not_read.push(a);
    save(st);
    for (const a of added) console.log(`stage ${a.stage}: ${a.body} recorded as not read. ${a.reason}`);
    console.log(`  ${st.know_how_not_read.length} declared know-how gap(s) on this run. The run is degraded and says so.`);
  }

} else if (cmd === 'read') {
  if (pos.length || Object.keys(f).length) die('read takes the run and nothing else: it copies what the records list under read_undeclared.');
  const st = load(runId);
  const dir = join(RUNS_ROOT, runId);
  st.read_undeclared = st.read_undeclared || [];
  const blank = v => v === undefined || v === null || String(v).trim() === '';
  const found = [], faults = [];
  for (const rec of runRecords(dir)) {
    let fm;
    try { fm = frontmatter(readFileSync(rec.abs, 'utf8'), rec.rel); }
    catch (e) { die(`${rec.rel} cannot be read, so what it lists cannot be copied: ${String(e.message).split('\n')[0]}`); }
    if (fm.read_undeclared === undefined || fm.read_undeclared === null) continue;
    const entries = Array.isArray(fm.read_undeclared) ? fm.read_undeclared : null;
    if (!entries) { faults.push(`${rec.rel} carries read_undeclared that is not a list of entries, each a document and why.`); continue; }
    const owner = st.stages.find(x => (x.artifacts || []).map(String).includes(String(fm.artifact_id)));
    if (!owner) { faults.push(`${rec.rel} feeds ${fm.artifact_id || 'no artifact'}, which no stage of this run produces, so its reads belong to no stage.`); continue; }
    entries.forEach((e, i) => {
      const x = e && typeof e === 'object' ? e : {};
      if (blank(x.document) || blank(x.why))
        faults.push(`${rec.rel}: read_undeclared entry ${i + 1} names ${blank(x.document) ? 'no document' : 'no why'}. Each entry names the document as you opened it and the declared body that should have answered it.`);
      else found.push({ stage: String(owner.id), document: String(x.document).trim(), why: String(x.why).trim(), from: rec.rel });
    });
  }
  if (faults.length) refuse(`Nothing was recorded.\n        ${faults.join('\n        ')}`);
  const fresh = [];
  for (const x of found)
    if (![...st.read_undeclared, ...fresh].some(r => r && String(r.stage) === x.stage && String(r.document) === x.document)) fresh.push(x);
  if (!fresh.length) {
    console.log('No record lists a read the run record does not already hold, so there is nothing new to record.');
  } else {
    for (const x of fresh) st.read_undeclared.push({ stage: x.stage, document: x.document, why: x.why });
    save(st);
    for (const x of fresh) console.log(`stage ${x.stage}: recorded that ${x.document} was read, from ${x.from}\n  ${x.why}`);
    console.log(`  ${st.read_undeclared.length} undeclared read(s) on this run. This is a gap in what the stage was given, not a fault in reading it.`);
  }

} else if (cmd === 'stale') {
  const artifact = pos[0];
  const reason = one('reason');
  if (!artifact) die('name the artifact that has gone stale');
  if (!reason) die('--reason is required. A staleness mark with no reason cannot be judged later');
  const st = load(runId);
  const owner = st.stages.find(s => s.artifacts.includes(artifact));
  if (!owner)
    die(`${artifact} is produced by no stage — stale marks a stage output that was re-run.\n` +
        `        Known outputs: ${st.stages.flatMap(s => s.artifacts).join(', ')}.`);
  if (owner.status === 'pending' || owner.status === 'running')
    die(`${artifact} has not been produced yet (stage ${owner.id} is ${owner.status}).\n` +
        `        Stale marks a stage output that was re-run, not one that never existed.`);
  const existing = st.stale.find(x => x.artifact === artifact);
  if (existing) { existing.reason = reason; existing.accepted_by = ''; existing.accepted_at = ''; }
  else st.stale.push({ artifact, reason, accepted_by: '', accepted_at: '' });
  staleDownstream(st, owner);
  save(st);
  console.log(`${artifact} marked stale — ${reason}`);
  console.log('a run does not advance past a stale input without a recorded human acceptance (C30)');

} else if (cmd === 'accept-stale') {
  const artifact = pos[0];
  const by = one('by');
  if (!artifact) die('name the stale artifact being accepted');
  if (!by) die('--by is required — a stale acceptance names the human who made it');
  { const notPerson = personOnly(by, 'Accepting a stale input'); if (notPerson) die(notPerson); }
  const at = one('at') || today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(at)) die(`--at must be a date, not "${at}"`);
  const st = load(runId);
  const entry = st.stale.find(x => x.artifact === artifact);
  if (!entry) die(`${artifact} is not marked stale in this run — nothing to accept`);
  entry.accepted_by = by;
  entry.accepted_at = at;
  save(st);
  console.log(`stale ${artifact} accepted — ${by}, ${shownDate(at)}`);

} else if (cmd === 'abandon') {
  const { f } = parse(rest);
  const one = k => (f[k] || [])[0];
  const by = one('by'), reason = one('reason');
  if (!by) die('--by is required — a stop names the human who decided it, never an agent (C14)');
  { const notPerson = personOnly(by, 'Stopping a run'); if (notPerson) die(notPerson); }
  if (!reason || reason === true) die(`--reason is required, one of: ${Object.keys(ABANDON_REASONS).join(' | ')}`);
  if (!ABANDON_REASONS[reason])
    die(`"${reason}" is not a stop reason. One of: ${Object.keys(ABANDON_REASONS).map(k => `${k} (${ABANDON_REASONS[k]})`).join(' | ')}`);
  const at = one('at') || today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(at)) die(`--at must be a date, not "${at}"`);
  const st = load(runId);
  { const stopped = stoppedLine(runId, st); if (stopped) refuse(stopped); }
  st.abandoned_by = by;
  st.abandoned_at = at;
  st.abandoned_reason = reason;
  const note = one('note');
  if (note && note !== true) st.abandoned_note = note;
  save(st);
  console.log(`${runId} stopped at stage ${st.current_stage} — ${reason} (${ABANDON_REASONS[reason]}), ${by}, ${shownDate(at)}`);
  console.log('Artifacts are retained. Nothing is deleted.');

} else if (cmd === 'jira') {
  const key = String(one('key') ?? '').trim();
  const judged = BOX_TYPES.jira_key.check(key === 'true' ? '' : key, { box: BOXES.jiraKey });
  if (judged.refuse) refuse(judged.whole ? `Nothing was recorded. ${judged.whole}`
    : entryRefusal({ what: `Nothing was recorded: the box 'The initiative's Jira key' ${String(judged.refuse).replace(/\.$/, '')}`,
        next: `Run the task again and type the key, as in ${BOXES.jiraKey.example}, or none yet.` }));
  const st = load(runId);
  { const stopped = stoppedLine(runId, st); if (stopped) refuse(stopped); }
  const none = NONE_YET.includes(fold(key));
  const value = none ? 'none yet' : key.toUpperCase();
  const before = st.jira_key && st.jira_key.value ? String(st.jira_key.value) : '';
  st.jira_key = { value, recorded_at: today() };
  save(st);
  console.log(`${runId}: the initiative's Jira key is recorded as ${value}` +
    (before && before !== value ? `, replacing ${before}.` : before ? ', as it already was.' : '.'));
  if (none) console.log('The initiative says it has no Jira key yet. Run "SPOCK: record the Jira key" again when it has one.');

} else if (MAIN) {
  die(`unknown command "${cmd}" — init | stage | gate | agree | seen | decide | correct-name | retract | read | unread | stale | accept-stale | abandon | jira`);
}

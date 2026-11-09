#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, basename, isAbsolute, resolve as resolvePath } from 'node:path';
import { readContracts, upstreamStages, parkedArtifacts, standing, nextStageNeeds, needLines } from './contracts.mjs';
import { blockAgainstRecord, blockFindingLine } from './frame.mjs';
import { envelopeView, envelopeAtApproval } from './envelope.mjs';
import { fanOutFor, slateEntries, briefsOn } from './fanout.mjs';
import { derive as deriveFor, compliancePart, complianceLanguage, areaNames, recordedBuild, buildAtLeast } from './derive.mjs';
import { SURFACES } from './surface.mjs';
import { capture, END_LINE } from './capture.mjs';
import { escapeCell } from './findings.mjs';
import { declaredMaterial } from './run-material.mjs';
import { CARD_PAGE_BUILD, OPPORTUNITY_ID_BUILD, OPPORTUNITY_HEADING_BUILD, INITIATIVE_TITLE_BUILD } from './gates.mjs';
import { UNIVERSAL, QUALITY_GATES, GATES, decisionsFor, recordedDecisions, RETIRED_DECISION_GATES, gateResult, COMPOSED_FLOOR, STATUSES,
         AGENT_BINDINGS, RETIRED_BINDINGS, retiredBindingHeld, RENAMED_AGENT_IDS, canonicalAgent, SKILL_WORKFLOW, WORKFLOWS, namesProducer, PARKED_BINDINGS,
         JUDGED_RULES, judgedFor, judgedTally, JUDGED_ABSENT_REASON, skillsForStage, expectedKnowHow, knowHowOwed, stageRanAt,
         knowHowGap, knowHowHeld,
         INITIATIVE_SECTION_IDS, INITIATIVE_TEMPLATE, couldNotVerify, ABANDON_REASONS,
         IDEA_TEMPLATE, IDEA_SECTIONS, VERDICT_TEMPLATE, SECTIONS_EIGHT, BOUNDS_SPLIT,
         coveredBySignature, signatureLine, NEVER_SIGNABLE, signedExceptions, signedChecks, selectedId,
         headingForId, bareOfId, acceptedStagesOf, stageWords, SIGN_OFF_TASK, unsignableLines, folderRenamed, cannotSign,
         coveringSignatures, onAcceptedOf, SIGN_OFF_CAUSES, signOffLine, signOffBoxLines, CARD_ADDRESS_BUILD,
         RESEARCH_PROVENANCE_BUILD, STATED_COUNT_BUILD, RANKING_BUILD, JIRA_KEY_BUILD, signAgainLine, signAgainClause,
         RELEASE_FLOOR_BUILD, UPDATE_TASK, STALE_TASK, findingsOf, READING_COPY_BUILD, PART_COUNT_BUILD, DECISION_DATE_BUILD, PRD_DRAFT_BUILD,
         shapeOf, shapeLinesOf, chosenSolution, REDUCTION_REF_BUILD, OPENING_BLOCK_BUILD,
         PERIOD_DATE_BUILD, PERIOD_TASK, PERIOD_RE, PERIOD_FORMS, FULL_DATE_RE, confirmedPeriod, suppliedFileKey,
         CONTRADICTION_CHECK, CONTRADICTION_BUILD, contradictionsOf, contradictionIdsOf, contradictionSignOffs,
         NOT_REAL_COPY_BUILD, REQUIREMENT_ID_BUILD } from './gates.mjs';
import { render as renderFixed, wordsRe, wordsCzechFrom, wordsUnicodeFrom, shownDate } from './fixed-messages.mjs';
const wordsFor = (dir, id) => wordsRe(id, { czech: !wordsCzechFrom(id) || buildAtLeast(recordedBuild(dir), wordsCzechFrom(id)),
  unicode: !wordsUnicodeFrom(id) || buildAtLeast(recordedBuild(dir), wordsUnicodeFrom(id)) });
import { driftOf as readingDrift, present as readingPresent, expected as readingExpected } from './reading-copy.mjs';
import { compareWithRelease, differenceLines, inGitClone, listInCommit, RELEASE_LIST } from './release-files.mjs';
import { deriveTrust, ungradable, deriveConfidence, ungradableConfidence } from './trust.mjs';
import { sectionCoverage, coversTemplate, PRD_SECTIONS, PRD_TEMPLATE, agreedBody, splitPrd,
         AGREED_WRITTEN_FROM, draftAgreementFindings, draftFindingProblem, AGREED_TITLE_FROM, draftTitleIn } from './prd.mjs';
import { roster } from './know-how.mjs';
import { runArtifacts, runRecords, runParts, strandedPart, strandedRecord, STAGE_DIRS, SUPPLIED_DIR, CALLER_CWD, RUNS_ROOT, openRuns, runIdOf, superseded as takenBackFiles,
         EXPECTED_TO_DIFFER, ENVELOPE_DERIVED, noOpenRunLine, strayRecordFiles, strayRecordsLine, strayArtifact, strayBesideLine, runLanguage, twoRunsRefusal,
         duplicateIds, duplicateLine, readText, declaredIdIn } from './run-files.mjs';
import { material, suppliedFiles, citesSupplied, measure, citingItems, inUse } from './material.mjs';
const SUPPLIED_JOIN_SINCE = '2026-09-04';
const CONVERSATION_JOIN_BUILD = '1.9';
const DECISIONS_RECORDED_FROM = '2026-09-04';
const PRODUCER_DECLARED_FROM = '2026-09-04';
import { registerOf, schemas, SPEC as FIELDS_SPEC } from './artifact-fields.mjs';
import { fold as foldName } from './decision-block.mjs';
import { registry as screeningRegistry, REGISTRY as SCREENING_REGISTRY, areaCards } from './screening-inputs.mjs';
import { DEVELOPED_LISTS, DEVELOPED_LISTS_SINCE, VOICE_TERMS_SINCE,
         COMPLIANCE_ON_SOLUTION_SINCE, SURFACE_DECLARED_SINCE, INSPIRED_BY_SINCE,
         COMPLIANCE_SUMMARY_SINCE, EDIT_ACCOUNT_SINCE, accountedEdits, editAccountRequired,
         trustRollups, TRUST_SHARE_BUILD, JUDGED_VERDICTS, JUDGED_RECORDED, WAITS_ON_A_PERSON, standingChoices, questionsFor, writtenFromChoice } from './gates.mjs';
import { retained as retainedTraces, TRACE_DIR } from './trace.mjs';
import { YamlError, frontmatter } from './yaml.mjs';
import { splitFm, editedAfterAcceptance, editedLine } from './content-seen.mjs';
import { headingsOf, fold, opensOnProse, closingReport, headingFaults, sectionReport, cardReport,
         DOC_SKELETONS, CLOSING, underStandards, inLanguage, sectionsIn, judgeBlock, BLOCK_KINDS, BLOCK_STAGES, OPENING_FROM,
         headingSet, sectionHeadings, rewriteHeadings, sectionName, withClosing } from './doc-structure.mjs';

const KNOW_HOW = roster();

const cmpVersion = (a, b) => {
  const pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d < 0 ? -1 : 1;
  }
  return 0;
};

let VIEW_ABS = new Map();
let ENVELOPE_AT_APPROVAL = false;
const viewRead = p => { const v = VIEW_ABS.get(resolvePath(p)); return v !== undefined ? v : readFileSync(p, 'utf8'); };
const viewText = p => { const v = VIEW_ABS.get(resolvePath(p)); return v !== undefined ? v : readText(p); };
const runRecordsViewed = d => runRecords(d).map(r => {
  const v = VIEW_ABS.get(resolvePath(r.abs));
  if (v === undefined) return r;
  const rid = v.slice(0, 4096).match(/^record_id:\s*["']?([A-Za-z0-9-]+)["']?\s*$/m);
  return { ...r, recordId: rid ? rid[1] : null, id: declaredIdIn(v) };
});

function bodyOf(rel) {
  const p = join(dir, rel);
  if (!existsSync(p)) return '';
  const v = VIEW_ABS.get(resolvePath(p));
  const t = v !== undefined ? v.replace(/^\ufeff/, '').replace(/\r\n/g, '\n') : readFileSync(p, 'utf8').replace(/^\ufeff/, '').replace(/\r\n/g, '\n');
  if (!t.startsWith('---')) return t;
  const end = t.indexOf('\n---', 3);
  return end === -1 ? t : t.slice(end + 4);
}

const RUN_STATUSES = ['in_progress', 'complete', 'abandoned'];
const OST_ROLES = ['outcome', 'opportunity', 'solution', 'artifact', 'none'];
const REGISTER = existsSync(FIELDS_SPEC) ? registerOf(readFileSync(FIELDS_SPEC, 'utf8')) : {};
const BRIEF_RENAMED_ON = '2026-08-27';
const FANOUT_MATERIALISED_FROM = '2026-09-03';
const GAP_ASKED_FROM = '2026-09-03';
const MATERIAL_MEASURED_FROM = '2026-09-11';
const SUPPLIED_CLAIM_RECORDED_FROM = '2026-09-14';
const REWORK_SEEN_FROM = '2026-09-14';
const INITIATIVE_HEADINGS_WRITTEN_FROM = '2026-09-14';
const SELECTED_WRITTEN_FROM = '2026-09-16';
const PRD_HEADINGS_WRITTEN_FROM = '2026-09-16';
const SCREENING_REASONS = ['not_known', 'not_yet_available', 'not_applicable', 'declined'];
const BRIEF_LEGACY = { product_manager: 'product_owner' };
const BRIEF_REQUIRED = ['title', 'product_manager', 'topic', 'outcome', 'goals',
                        'customer_segment', 'market_scope'];

const arr = v => (Array.isArray(v) ? v : v == null ? [] : [v]);

const NAMING = (it, cap = 12) => {
  const all = [...it].map(String);
  return all.length <= cap ? all.join(', ') : `${all.slice(0, cap).join(', ')} and ${all.length - cap} more`;
};

const RULE_ONCE = (rule, subjects, cap = 30) => {
  const all = [...subjects].map(String);
  if (!all.length) return null;
  const shown = all.length <= cap ? all.join(', ') : `${all.slice(0, cap).join(', ')} and ${all.length - cap} more`;
  return `${rule} — ${all.length}: ${shown}`;
};

let CONTRACTS = undefined;
const contractsOnce = () => {
  if (CONTRACTS === undefined) { try { CONTRACTS = readContracts(); } catch { CONTRACTS = null; } }
  return CONTRACTS;
};

let CONTRACT_STAGE_OF = null;
const STAGE_OF_ARTIFACT_FOR = runState => id => {
  if (CONTRACT_STAGE_OF === null) {
    try { CONTRACT_STAGE_OF = readContracts().producedBy; } catch { CONTRACT_STAGE_OF = new Map(); }
  }
  const fromContract = CONTRACT_STAGE_OF.get(String(id)) ?? CONTRACT_STAGE_OF.get(id);
  if (fromContract !== undefined && fromContract !== null) return Number(fromContract);
  const st = arr(runState && runState.stages).find(s => arr(s.artifacts).map(String).includes(String(id)));
  return st ? Number(st.id) : null;
};

function checks(RAW, runId, runState) {
  const STAGE_OF_ARTIFACT = STAGE_OF_ARTIFACT_FOR(runState);
  const r = [];
  let touched = new Set();
  const seen = new Map();
  const wrap = (id, obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (!seen.has(id)) seen.set(id, new Proxy(obj, { get(t, k) { touched.add(id); return t[k]; } }));
    return seen.get(id);
  };
  const A = new Proxy(RAW, {
    get(t, k) {
      if (typeof k !== 'string' || !/^A\d+[a-z]?$/.test(k)) return t[k];
      touched.add(k);
      return wrap(k, t[k]);
    },
  });
  const RUN_DOCS = runArtifacts(dir);
  const add = (id, applies, ok, detail) => {
    const reads = [...touched];
    r.push({ id, applies, ok, detail, reads, findings: applies && !ok ? findingsOf(id, detail, RUN_DOCS, reads) : [] });
    touched = new Set();
  };
  const all = Object.entries(RAW).map(([id, a]) => wrap(id, a));
  touched = new Set();

  if (!runState) {
    add('C38', true, false,
      'no RUN-STATE.md — the run has no record of where it is, so no precondition can be checked');
  } else {
    const stages = arr(runState.stages);
    const problems = [];
    if (runState.run_id !== runId) problems.push(`record says run_id="${runState.run_id}"`);
    if (!RUN_STATUSES.includes(runState.status)) problems.push(`run status "${runState.status}" is outside ${RUN_STATUSES.join('|')}`);
    const floorExpected = `composed-floor@${COMPOSED_FLOOR.version}`;
    if (runState.behaviours === undefined || runState.behaviours === null)
      problems.push('the run records no composed-behaviour floor — §9.3 requires the version in force on the run');
    else if (runState.behaviours !== floorExpected)
      problems.push(`run records behaviours="${runState.behaviours}", the carrier in force is "${floorExpected}"`);
    {
      const listed = new Set(stages.flatMap(s => arr(s.artifacts).map(String)));
      const unlisted = all
        .filter(a => a && a.artifact_id && !listed.has(String(a.artifact_id))
                     && !a.supplied_by && a.workflow !== 'free-roam')
        .map(a => `${a.artifact_id} (${a.__file})`);
      if (unlisted.length)
        problems.push(`the run carries ${unlisted.join(', ')} and no stage lists ${unlisted.length === 1 ? 'it' : 'them'} ` +
          'in artifacts[] — an artifact no stage claims is outside every check that finds one through its stage');
    }

    for (const twice of duplicateIds(dir)) problems.push(duplicateLine(twice));
    let compared = 0;
    const decisionBuild = recordedBuild(dir);
    const decisionDatesCompared = buildAtLeast(decisionBuild, DECISION_DATE_BUILD);
    let decisionDatesNotCompared = 0, decisionDatesRegated = 0;
    const qpass = s => s.quality_gate && s.quality_gate.result === 'pass';
    const covered = s => coveredBySignature(runState, s);
    const toSign = s => {
      const q = s.quality_gate;
      if (!q || String(q.result) !== 'fail' || !Array.isArray(q.failed) || !q.failed.length) return '';
      const covering = coveringSignatures(runState, s);
      const open = q.failed.map(String).filter(c => !covering.has(c));
      if (!open.length || open.some(c => NEVER_SIGNABLE.includes(c))) return '';
      return signAgainClause(open);
    };
    for (const s of stages) {
      if (!STATUSES.includes(s.status)) { problems.push(`stage ${s.id}: status "${s.status}" is not in the shared vocabulary`); continue; }
      for (const id of arr(s.artifacts)) {
        const a = A[id];
        if (!a) continue;
        compared++;
        const midFlight = s.status === 'running' && a.status === 'produced';
        if (ENVELOPE_AT_APPROVAL) {
          if (s.status === 'accepted' && a.status !== 'accepted') problems.push(`stage ${s.id} is "${s.status}" but ${id} is "${a.status}"`);
        } else if (a.status !== s.status && !midFlight)
          problems.push(`stage ${s.id} is "${s.status}" but ${id} is "${a.status}"`);
      }
      if (s.status === 'accepted') {
        const g = GATES[s.id] || {};
        if (!qpass(s) && !covered(s))
          problems.push(`stage ${s.id} is accepted without ${g.quality || 'its quality gate'} passing${toSign(s)}`);
        const on = new Set(recordedDecisions(s).map(d => d.id));
        const retiredHere = Object.entries(RETIRED_DECISION_GATES)
          .filter(([, r]) => r.stage === s.id).some(([id]) => on.has(id));
        const short = retiredHere ? [] : decisionsFor(s.id).filter(id => !on.has(id));
        if (short.length)
          problems.push(`stage ${s.id} is accepted without ${short.join(' and ')} recorded`);
      }
      if (s.status === 'q_failed' && (!s.quality_gate || s.quality_gate.result !== 'fail'))
        problems.push(`stage ${s.id} is q_failed without a failed quality gate on the record`);
      if ((s.status === 'in_review' || s.status === 'refined') && !qpass(s) && !covered(s))
        problems.push(`stage ${s.id} is ${s.status} without its quality gate passing — nothing reaches review unchecked${toSign(s)}`);
      if (recordedDecisions(s).length && ['pending', 'running', 'produced', 'q_failed'].includes(s.status))
        problems.push(`stage ${s.id} carries a decision gate but is "${s.status}" — a decision on an unreviewed or returned stage`);
      const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
      for (const [slot, field, rec] of [['quality_gate', 'run_at', s.quality_gate],
                                         ...recordedDecisions(s).map(d => ['decision_gate', 'decided_at', d])]) {
        if (!rec) continue;
        const v = rec[field];
        if (v === undefined || v === null || String(v).trim() === '')
          problems.push(`stage ${s.id}: ${rec.id || slot} records no ${field} — a gate with no date cannot be ordered against the other`);
        else if (!ISO_DATE.test(String(v)))
          problems.push(`stage ${s.id}: ${rec.id || slot} ${field}="${v}" is not a YYYY-MM-DD date, so it cannot be compared`);
      }
      if (s.quality_gate && s.quality_gate.id) {
        const rec = s.quality_gate;
        const jt = judgedTally(rec.id, rec.run_at);
        if (rec.judged_ran !== undefined && Number(rec.judged_ran) !== jt.ran)
          problems.push(`stage ${s.id}: ${rec.id} records judged_ran=${rec.judged_ran}, the gate model says ${jt.ran}`);
        if (rec.judged_not_run !== undefined && Number(rec.judged_not_run) !== jt.notRun)
          problems.push(`stage ${s.id}: ${rec.id} records judged_not_run=${rec.judged_not_run}, the gate model says ${jt.notRun}`);
      }
      if (s.quality_gate && s.decision_gate) {
        const q = String(s.quality_gate.run_at), d = String(s.decision_gate.decided_at);
        if (ISO_DATE.test(q) && ISO_DATE.test(d) && d < q)
          problems.push(`stage ${s.id}: ${s.decision_gate.id} is dated ${d}, before ${s.quality_gate.id} on ${q} — ` +
            `a decision cannot precede the check that admits the stage to review`);
      }
      if (s.quality_gate && Array.isArray(s.decision_gates) && s.decision_gates.length) {
        const qg = s.quality_gate, q = String(qg.run_at);
        if (!decisionDatesCompared) decisionDatesNotCompared++;
        else if (qg.regate === true || String(qg.regate) === 'true') decisionDatesRegated++;
        else for (const dg of recordedDecisions(s)) {
          const d = String((dg && dg.decided_at) || '');
          if (ISO_DATE.test(q) && ISO_DATE.test(d) && d < q)
            problems.push(`stage ${s.id}: ${dg.id} is dated ${d}, before ${qg.id} on ${q} — ` +
              `a decision cannot precede the check that admits the stage to review`);
        }
      }
    }
    const firstOpen = stages.find(s => s.status !== 'accepted' && s.status !== 'superseded');
    const expectStage = firstOpen ? String(firstOpen.id) : 'complete';
    if (String(runState.current_stage) !== expectStage)
      problems.push(`current_stage is "${runState.current_stage}" but the stages make it ${expectStage}`);
    if (runState.status === 'in_progress' || runState.status === 'complete') {
      const expectRun = firstOpen ? 'in_progress' : 'complete';
      if (runState.status !== expectRun)
        problems.push(`run status is "${runState.status}" but the stages make it ${expectRun}`);
    } else if (runState.status === 'abandoned' && /^\d{4}-\d{2}-\d{2}$/.test(String(runState.abandoned_at || ''))) {
      const stop = String(runState.abandoned_at);
      const after = (where, what, v) => {
        const d = String(v ?? '');
        if (/^\d{4}-\d{2}-\d{2}$/.test(d) && d > stop)
          problems.push(`${where}: ${what} is dated ${d}, after the run was stopped on ${stop}. Nothing is recorded on a stopped run`);
      };
      for (const s of stages) {
        if (s.quality_gate) after(`stage ${s.id}`, s.quality_gate.id || 'its quality gate', s.quality_gate.run_at);
        for (const d of recordedDecisions(s)) after(`stage ${s.id}`, d.id || 'a decision gate', d.decided_at);
      }
      for (const d of arr(runState.decisions)) after(`stage ${d && d.stage}`, `a ${(d && d.kind) || 'decision'}`, d && d.at);
      for (const r of arr(runState.refinements)) after(`stage ${r && r.stage}`, 'a refinement round', r && r.at);
      for (const x of arr(runState.stale)) after(`${(x && x.artifact) || 'a stale input'}`, 'its stale acceptance', x && x.accepted_at);
    }
    add('C38', true, problems.length === 0,
      problems.length ? problems.join('; ')
        : `run state present; ${compared} artifact status(es) agree with their stage, the snapshot invariants hold, and the floor in force is recorded` +
          (decisionDatesNotCompared ? `; the decisions on ${decisionDatesNotCompared} stage(s) are not compared with their quality gate's date: ` +
            `this run was started on ${decisionBuild ? `build ${decisionBuild}` : 'a build it does not record'}, before a re-gate was marked on the record` : '') +
          (decisionDatesRegated ? `; ${decisionDatesRegated} stage(s) carry a re-gate the workflow wrote after their decisions, so their dates are not compared` : ''));
  }

  {
    const madeOn = String((runState && runState.created_at) || '');
    if (!runState) add('C162', false, true, 'no run record — C38 reports that');
    else if (!madeOn || madeOn < SURFACE_DECLARED_SINCE)
      add('C162', false, true, `the run was created on ${madeOn || 'an unrecorded date'}, before the record carried a surface field on ${SURFACE_DECLARED_SINCE} — it is not asked for something that did not exist when it ran`);
    else {
      const problems = [];
      const declared = runState.surface == null ? null : String(runState.surface).trim();
      const observed = runState.surface_observed == null ? null : String(runState.surface_observed).trim();
      if (!declared) problems.push('the run record carries no `surface` — nothing says which surface this run was driven on, and the count of agent files cannot');
      else if (!SURFACES.includes(declared)) problems.push(`the run record's surface is "${declared}", which is not one of ${SURFACES.join(', ')}`);
      if (!observed) problems.push('the run record carries no `surface_observed` — the declared value stands alone with nothing beside it to disagree');
      else if (declared && SURFACES.includes(declared) && observed !== 'unknown' && observed !== declared)
        problems.push(`the run declares "${declared}" and the process observed "${observed}" — one of the two is wrong and the observation is the one nothing typed`);
      add('C162', true, problems.length === 0, problems.length ? problems.join('; ')
        : observed === 'unknown'
          ? `driven on ${declared} by declaration; nothing observable corroborates it, because ${declared === 'copilot' ? 'no Copilot marker exists' : 'no marker was present'} and the absence of another tool's marker is not evidence of anything`
          : `driven on ${declared}, and the process observed ${observed}`);
    }
  }

  {
    const NEEDS_ASK = new Set(['not_known', 'declined']);
    const problems = [];
    let checked = 0, before = 0;
    for (const a of Object.values(artifacts)) {
      const gaps = arr(a.unknowns).filter(u => u && typeof u === 'object');
      if (!gaps.length) continue;
      const madeOn = String(a.produced_at || a.assembled_at || '');
      if (!madeOn || madeOn < GAP_ASKED_FROM) { before++; continue; }
      for (const u of gaps) {
        const reason = String(u.reason || '').trim();
        if (!NEEDS_ASK.has(reason)) continue;
        checked++;
        if (u.asked !== true)
          problems.push(`${a.__file}: ${u.field || '(unnamed field)'} is recorded "${reason}", which is a claim about what a person said, and nothing says the person was asked`);
      }
    }
    if (!checked && !before) add('C163', false, true, 'no artifact declares a gap whose reason is a claim about what a person said');
    else if (!checked) add('C163', false, true, `${before} artifact(s) declare gaps and were produced before ${GAP_ASKED_FROM}, when nothing recorded whether the person was asked — they are read against the model they were produced under`);
    else add('C163', true, problems.length === 0, problems.length ? problems.join('; ') +
        '. Where the person was asked, add `asked: true` to the gap; put nothing else in the note unless you quote the person\'s own words in `said:`'
      : `${checked} gap(s) recorded as a person's silence, every one saying the person was asked` +
        (before ? `; ${before} artifact(s) predate the field and are not held to it` : ''));
  }

  if (runState) {
    const stop = ['abandoned_by', 'abandoned_at', 'abandoned_reason'];
    const bad = [];
    if (runState.status === 'abandoned') {
      for (const k of stop) if (!runState[k]) bad.push(`a stopped run carries no ${k}`);
      const why = runState.abandoned_reason;
      if (why && !ABANDON_REASONS[why])
        bad.push(`"${why}" is not a stop reason — one of ${Object.keys(ABANDON_REASONS).join(', ')}`);
      if (runState.abandoned_at && !/^\d{4}-\d{2}-\d{2}$/.test(String(runState.abandoned_at)))
        bad.push(`abandoned_at "${runState.abandoned_at}" is not a date`);
    } else {
      for (const k of [...stop, 'abandoned_note'])
        if (runState[k]) bad.push(`the run is "${runState.status}" and carries ${k} — a stop is recorded in full or not at all`);
    }
    add('C78', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : runState.status === 'abandoned'
          ? `stopped by ${runState.abandoned_by} on ${runState.abandoned_at} — ${runState.abandoned_reason} (${ABANDON_REASONS[runState.abandoned_reason]}); artifacts retained`
          : `the run is "${runState.status}" and carries no stop record`);
  } else add('C78', true, false, 'no RUN-STATE.md — nothing records whether this run was stopped');

  {
    const KH = join('.github', 'know-how', 'compliance');
    const REG = join('.github', 'registry', 'regmap.yaml');
    const cards = new Map();
    if (existsSync(REG)) {
      const reg = workflowText(REG);
      const block = reg.slice(reg.indexOf('\nareas:'), reg.indexOf('\nregimes:') === -1 ? undefined : reg.indexOf('\nregimes:'));
      for (const m of block.matchAll(/^  - id:\s*(A\d+)\s*\n(?:\s{4}\S.*\n)*?\s{4}body:\s*(\S+)/gm)) {
        const file = join('.github', 'know-how', m[2]);
        if (!existsSync(file)) continue;
        const text = readFileSync(file, 'utf8');
        const section = (name) => {
          const i = text.search(new RegExp(`^##\\s+\\d+\\.\\s+${name}\\s*$`, 'm'));
          if (i === -1) return '';
          const j = text.slice(i + 3).search(/^##\s/m);
          return j === -1 ? text.slice(i) : text.slice(i, i + 3 + j);
        };
        const ROW = /^\|\s*\*\*([A-Z]\d+)\*\*\s*\|[^|]*\|\s*([^|]*?)\s*\|/gm;
        const subs = new Set([...section('Sub-domains').matchAll(ROW)].map(x => x[1]));
        const triggers = new Map();
        for (const t of section('Triggers').matchAll(ROW))
          triggers.set(t[1], new Set([...t[2].matchAll(/\b[A-Z]\d+\b/g)].map(x => x[0]).filter(x => subs.has(x))));
        cards.set(m[1], { subs, triggers, file });
      }
    }

    const c = [];
    let checked = 0, seen = 0;
    const carriers = [];
    if (A.A1b) carriers.push(['A1b', A.A1b]);
    for (const idea of arr(A.A8 && A.A8.ideas))
      if (idea && idea.compliance && typeof idea.compliance === 'object')
        carriers.push([`A8/${String(idea.id || '?').trim()}`, idea.compliance]);
    for (const id of ['A11', 'A12', 'A13']) if (A[id]) carriers.push([id, A[id]]);
    for (const [id, a] of carriers) {
      seen++;
      for (const area of arr(a.areas)) {
        const card = cards.get(String(area && area.area || '').trim());
        if (!card) {
          if (area && area.area) c.push(`${id} names area ${area.area}, which the regulatory map does not register — it registers ${NAMING(cards.keys())}`);
          continue;
        }
        for (const t of arr(area.triggers_fired)) {
          const tid = String(t && t.trigger || '').trim();
          const declared = card.triggers.get(tid);
          if (!declared) { c.push(`${id}: ${area.area}/${tid} is not a trigger ${card.file} declares`); continue; }
          for (const sub of arr(t.puts_in_play).map(x => String(x).trim())) {
            checked++;
            if (!card.subs.has(sub)) { c.push(`${id}: ${area.area}/${sub} is not a sub-domain ${card.file} declares — it declares ${NAMING(card.subs)}`); continue; }
            if (!declared.has(sub))
              c.push(`${id}: ${tid} is recorded as putting ${sub} in play and ${card.file} says ${tid} puts ` +
                `${[...declared].join(', ') || 'nothing'} in play — a screen claiming an obligation the card ` +
                `does not create is a requirement with nothing behind it`);
          }
        }
      }
      for (const tp of arr(a.compliance_touchpoints)) {
        const card = cards.get(String(tp && tp.area || '').trim());
        if (!card) { if (tp && tp.area) c.push(`${id} names area ${tp.area}, which the regulatory map does not register`); continue; }
        const sub = String(tp.sub_domain || '').trim();
        if (!sub) continue;
        checked++;
        if (!card.subs.has(sub)) c.push(`${id}: touchpoint names ${tp.area}/${sub}, which is not a sub-domain ${card.file} declares`);
        const tid = String(tp.trigger || '').trim();
        if (tid) {
          const declared = card.triggers.get(tid);
          if (!declared) {
            const rows = [...card.triggers].filter(([, s]) => s.has(sub)).map(([t]) => t);
            c.push(`${id}: the touchpoint on ${tp.area}/${sub} gives its trigger as ${tid}, and a trigger is a row of the Triggers table in ` +
              `${card.file}, which has no row ${tid} — ` +
              (rows.length ? `the rows there that put ${sub} in play are ${rows.join(', ')}` : `no row there puts ${sub} in play`));
          }
          else if (!declared.has(sub))
            c.push(`${id}: touchpoint binds ${tid} to ${sub} and ${card.file} says ${tid} puts ` +
              `${[...declared].join(', ') || 'nothing'} in play`);
        }
      }
    }
    add('C153', seen > 0 && cards.size > 0, c.length === 0, c.length ? c.join('; ')
      : seen === 0
        ? 'no screen and no PRD in this run'
        : cards.size === 0
          ? 'no area card resolved from the regulatory map, so no trigger could be joined — a check that cannot compute must not report a conclusion'
          : checked === 0
            ? `${seen} artifact(s) carry compliance touchpoints and none names a sub-domain — this run ` +
              `predates the bound-entry shape, so there was nothing here to join. **That is not the same ` +
              `as a join that held**`
            : `${checked} sub-domain claim(s) across ${seen} artifact(s) resolve to the area card that owns ` +
              `them, and every trigger puts in play what its own card says it does — ${cards.size} card(s) ` +
              `read. **Whether a touchpoint was ADDRESSED stays judged and does not run**; this is the half ` +
              `that is arithmetic`);
  }

  {
    const READS_UNTRUSTED = ['A2b', 'A5', 'A6'];
    const PATTERNS = [
      [/\b(ignore|disregard|forget)\s+(all\s+|the\s+|any\s+)?(previous|above|prior|preceding|earlier)\s+(instruction|rule|prompt|direction)/i,
        'an override of prior instructions'],
      [/\bsystem\s+(prompt|message|instruction)/i, 'a reference to the system prompt'],
      [/\bnew\s+instructions?\b/i, 'a claim of new instructions'],
      [/\byou\s+are\s+now\b/i, 'a re-identification of the reader'],
      [/\b(write|save|edit|create|replace|delete|append|overwrite|put)\b[^.\n]{0,60}\.github\/[A-Za-z0-9._/-]+/i,
        'an instruction to write into the build'],
      [/\bignoruj\w*\s+(předchoz\w+|všechn\w+|výše)/i, 'an override of prior instructions'],
      [/\bnov[éá]\s+instrukce\b/i, 'a claim of new instructions'],
    ];
    const TOOLS = [];
    {
      const reg = '.github/registry/agents.yaml';
      if (existsSync(reg)) {
        const text = workflowText(reg);
        const block = text.slice(text.indexOf('\nsubstrate_tools:'));
        for (const m of block.matchAll(/^\s{2}[a-z]+:\s*\[([^\]]*)\]/gm))
          for (const t of m[1].split(',').map(x => x.trim()).filter(Boolean)) TOOLS.push(t);
      }
    }
    const hits = [];
    let read = 0;
    for (const id of READS_UNTRUSTED) {
      const a = A[id];
      if (!a || !a.__file) continue;
      read++;
      const HOW = /^##\s+(How this was produced|Jak to vzniklo)\s*$/m;
      let body = viewRead(join(dir, a.__file)).replace(/^\ufeff?---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
      const cut = body.search(HOW);
      if (cut !== -1) body = body.slice(0, cut);
      const firstSection = body.search(/^##\s/m);
      const asserted = firstSection === -1 ? body : body.slice(firstSection);
      for (const [re, what] of PATTERNS) {
        const over = what === 'an instruction to write into the build' ? asserted : body;
        const m = over.match(re);
        if (m) hits.push(`${id} carries ${what} — "${m[0].slice(0, 60)}"`);
      }
      for (const t of TOOLS) {
        const camel = /[A-Z]/.test(t);
        const m = camel ? body.match(new RegExp(`\\b${t}\\b`)) : body.match(new RegExp('`' + t + '`'));
        if (m) hits.push(`${id} names the substrate tool ${t}, which material the run did not author has no business naming`);
      }
    }
    add('C151', read > 0, hits.length === 0, hits.length
      ? `${hits.join('; ')} — an instruction that arrived in supplied material and survived into the ` +
        `artifact is the quarantine failing where a person can see it`
      : read === 0
        ? 'no artifact assembled from untrusted content in this run'
        : `${read} artifact(s) assembled from content this run did not author carry no instruction ` +
          `addressed to the agent, no substrate tool name and no path into the build. **This is the ` +
          `visible half only** — an agent that obeyed an injected instruction and left no trace in its ` +
          `output is invisible here, and that rule stays judged and unrun`);
  }

  {
    let c = null;
    try { c = readContracts(); } catch { c = null; }
    if (!runState) {
      add('C143', true, false, 'no RUN-STATE.md — nothing says which stages claim to be accepted');
    } else if (!c || c.steps === 0) {
      add('C143', true, false,
        'the workflow contracts declare no step, so the order a stage stands in could not be read — ' +
        'a precondition that cannot be computed must not be reported as met');
    } else {
      const status = new Map(arr(runState.stages).map(st => [Number(st && st.id), st && st.status]));
      const bad = [];
      let checked = 0;
      for (const st of arr(runState.stages)) {
        if (!st || st.status !== 'accepted') continue;
        checked++;
        for (const [up, owed] of upstreamStages(st.id, c)) {
          const s = status.get(up);
          if (s === undefined) continue;
          if (s !== 'accepted')
            bad.push(`stage ${st.id} is accepted and stage ${up}, which owes it ${owed.join(', ')}, is "${s}"`);
        }
      }
      add('C143', true, bad.length === 0, bad.length
        ? `${bad.join('; ')} — a stage accepted over an upstream stage nobody accepted is a run that advanced past a gate nobody ran`
        : checked === 0
          ? 'no stage is accepted yet, so no stage stands on an unaccepted one'
          : `${checked} accepted stage(s), each standing on upstream stages that are accepted too, derived from the contract's requires:`);
    }
  }

  {
    const stageProduces = new Map();
    const stageSince = new Map();
    const CONTRACTS = '.github/workflow-contracts';
    const readProduces = (file, forStage) => {
      if (!existsSync(file)) return;
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(/^\s*-\s+id:\s*(\S+)([\s\S]*?)(?=^\s*-\s+id:|^[a-z_]+:|(?![\s\S]))/gm)) {
        const body = m[2];
        const own = /^\s*stage:\s*"?(\d)"?\s*$/m.exec(body);
        const stage = forStage ?? (own ? Number(own[1]) : null);
        if (!stage) continue;
        const inline = /^\s*produces:\s*\[([^\]]*)\]\s*$/m.exec(body);
        const ids = inline
          ? inline[1].split(',').map(x => x.trim()).filter(Boolean)
          : (/^\s*produces:\s*$/m.test(body)
              ? [...body.matchAll(/^\s*produces:\s*$([\s\S]*?)(?=^\s{4}[a-z_]+:|(?![\s\S]))/gm)]
                  .flatMap(b => [...b[1].matchAll(/^\s*-\s+(A\d+[a-z]?)\s*$/gm)].map(x => x[1]))
              : []);
        const since = /^\s*since:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m.exec(body);
        if (!stageProduces.has(stage)) stageProduces.set(stage, new Set());
        for (const id of ids) stageProduces.get(stage).add(id);
        if (since) for (const id of ids) stageSince.set(id, since[1]);
        const comp = /^\s*contract:\s*(\S+)\s*$/m.exec(body);
        if (comp) readProduces(comp[1], stage);
      }
    };
    readProduces(join(CONTRACTS, 'discovery.workflow.yaml'), null);

    const parked = parkedArtifacts();

    if (!runState) {
      add('C112', true, false, 'no RUN-STATE.md — nothing says which stages claim to have run');
    } else if (stageProduces.size === 0) {
      add('C112', true, false,
        `${CONTRACTS}/discovery.workflow.yaml declares no artifact for any stage — the contract is the source of record for what a stage produces and it could not be read`);
    } else {
      const CLAIMED = ['produced', 'q_failed', 'in_review', 'refined', 'accepted'];
      const present = new Set(Object.values(A).map(a => a && a.artifact_id).filter(Boolean));
      const bad = [], exempt = [], atAcceptance = [];
      let checked = 0;
      for (const st of arr(runState.stages)) {
        if (!st || !CLAIMED.includes(st.status)) continue;
        const want = stageProduces.get(Number(st.id));
        if (!want || want.size === 0) continue;
        checked++;
        const ran = (st.quality_gate && st.quality_gate.run_at)
          || (recordedDecisions(st)[0] || {}).decided_at
          || runState.updated_at || runState.created_at || null;
        const due = id => { const s0 = stageSince.get(id); return !s0 || !ran || String(ran) >= s0; };
        const later = id => { const w = WAITS_ON_A_PERSON[id]; return Boolean(w) && w.after === 'approval' && Number(w.stage) === Number(st.id) && String(st.status) !== 'accepted'; };
        const missing = [...want].filter(id => due(id) && !present.has(id) && !parked.has(id) && !later(id));
        const excused = [...want].filter(id => !present.has(id) && parked.has(id));
        if (excused.length) exempt.push(`${excused.join(', ')} at stage ${st.id}`);
        const notYet = [...want].filter(id => due(id) && !present.has(id) && !parked.has(id) && later(id));
        if (notYet.length) atAcceptance.push(`${notYet.join(', ')} at stage ${st.id}`);
        if (missing.length)
          bad.push(`stage ${st.id} is "${st.status}" and its contract produces ${[...want].join(', ')} — the run holds no ${missing.join(', no ')}`);
      }
      add('C112', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : checked === 0 ? 'no stage claims to have produced anything yet'
            : `all ${checked} stage(s) claiming to have run carry every artifact their contract produces`
              + (exempt.length ? `; ${exempt.length} excused by a parked binding and named rather than skipped: ${exempt.join('; ')}` : '')
              + (atAcceptance.length ? `; ${atAcceptance.join('; ')} is written when the stage is approved and is not asked for before then` : ''));
    }
  }

  {
    const RESOLUTIONS = ['requirement', 'open_item', 'narrowed_out'];
    const NEEDS = { requirement: ['names'], open_item: ['owner', 'decided_at'], narrowed_out: ['reason'] };
    const bound = a => arr(a && a.compliance_touchpoints)
      .filter(x => x && typeof x === 'object' && String(x.area || '').trim() !== '');
    const carriers = ['A11', 'A12', 'A13'].map(id => [id, A[id]]).filter(([, a]) => a && bound(a).length);
    if (!carriers.length) {
      add('C130', false, true, 'no document carries bound compliance touchpoints — the run predates CR-E and nothing here applies');
      add('C131', false, true, 'no document carries bound compliance touchpoints — the run predates CR-E and nothing here applies');
    } else {
      const cards = areaCards();
      const bad = [], chain = [];
      const byArea = cards ? new Map(cards.areas.map(a => [a.id, a])) : new Map();
      const setOf = new Map();
      for (const [id, a] of carriers) {
        const here = new Map();
        bound(a).forEach((e, i) => {
          const where = `${id} entry ${i + 1}`;
          const area = String(e.area || '').trim();
          const sub = String(e.sub_domain || '').trim();
          const trig = String(e.trigger || '').trim();
          const card = byArea.get(area);
          if (!card) { bad.push(`${where} names area "${area}", which the RegMap does not declare`); return; }
          if (!card.subDomains.includes(sub)) { bad.push(`${where} names sub-domain "${sub}", which ${area}'s card does not declare — a touchpoint written as free text is one no two runs can be compared on`); return; }
          if (!card.triggers.includes(trig))
            bad.push(`${where} ${trig ? `gives its trigger as ${trig}` : 'gives no trigger'}, and a trigger is a row of the Triggers table ` +
              `in ${area}'s card${trig ? `, which has no row ${trig}` : ''}. Its rows are ${NAMING(card.triggers)}`);
          here.set(`${area}.${sub}`, e);
          const res = String(e.resolution || '').trim();
          if (!RESOLUTIONS.includes(res)) { bad.push(`${where} (${area}.${sub}) resolves as "${res}", outside ${RESOLUTIONS.join(' | ')} — a sub-domain with no resolution has been listed rather than addressed`); return; }
          for (const need of NEEDS[res])
            if (!String(e[need] || '').trim()) bad.push(`${where} (${area}.${sub}) resolves as ${res} and carries no ${need}`);
        });
        setOf.set(id, here);
        const named = new Set(arr(a.unexamined_areas).map(u => String(u && u.area || u).trim()));
        for (const card of cards ? cards.areas : [])
          if (!card.filled && !named.has(card.id))
            bad.push(`${id} does not name area ${card.id} as unexamined — an area that examined nothing must say so in the document a person outside this workflow reads`);
      }

      const order = carriers.map(([id]) => id);
      for (let i = 1; i < order.length; i++) {
        const prev = setOf.get(order[i - 1]), here = setOf.get(order[i]);
        const dropped = new Map(arr(A[order[i]].dropped_touchpoints).map(d => [String(d && d.sub_domain || '').trim(), d]));
        for (const key of prev.keys()) {
          if (here.has(key)) continue;
          const d = dropped.get(key) || dropped.get(key.split('.')[1]);
          if (!d) chain.push(`${key} is bound at ${order[i - 1]} and absent at ${order[i]} with nothing saying why — a silent disappearance between two documents is the defect the chain exists to catch`);
          else {
            if (!String(d.reason || '').trim()) chain.push(`${key} is dropped at ${order[i]} with no written reason`);
            if (!String(d.dropped_by || '').trim()) chain.push(`${key} is dropped at ${order[i]} with nobody named`);
          }
        }
        for (const [key, e] of here) {
          if (prev.has(key)) continue;
          if (!String(e.trigger || '').trim()) chain.push(`${key} is added at ${order[i]} and names no trigger that fired it`);
        }
      }

      const n = carriers.reduce((s, [, a]) => s + bound(a).length, 0);
      add('C130', true, bad.length === 0, bad.length ? bad.slice(0, 10).join('; ') + (bad.length > 10 ? `; and ${bad.length - 10} more` : '')
        : `${n} bound touchpoint(s) across ${carriers.length} document(s), each naming a declared area, sub-domain and trigger and resolving to one of ${RESOLUTIONS.length} forms with the field that form requires`);
      add('C131', carriers.length > 1, chain.length === 0,
        carriers.length < 2 ? 'only one document carries bound touchpoints — there is no chain to compare yet'
          : chain.length ? chain.slice(0, 10).join('; ') + (chain.length > 10 ? `; and ${chain.length - 10} more` : '')
            : `the chain holds across ${carriers.length} document(s) — nothing disappeared unstated, and everything added names the trigger that fired it`);
    }
  }

  {
    const bad = [];
    const missing = new Map();
    let items = 0, docs = 0, old = 0, unidentified = 0;
    for (const { artifact, lists, id } of DEVELOPED_LISTS) {
      const a = A[artifact];
      if (!a || !a.__file) continue;
      const abs = join(dir, a.__file);
      if (!existsSync(abs)) continue;
      const madeOn = String(a.produced_at || a.assembled_at || '');
      if (madeOn && madeOn < DEVELOPED_LISTS_SINCE) { old++; continue; }
      docs++;
      const body = bodyOf(a.__file);
      const at = body.search(/^## What we could not establish\s*$/m);
      const gapText = at < 0 ? '' : body.slice(at);
      const main = at < 0 ? body : body.slice(0, at);
      for (const list of lists) {
        for (const e of arr(a[list])) {
          const key = String((e && typeof e === 'object' ? e[id] : e) || '').trim();
          if (!key) { unidentified++; continue; }
          items++;
          const re = new RegExp(`(^|[^A-Za-z0-9_-])${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z0-9_-]|$)`);
          if (re.test(main)) continue;
          if (re.test(gapText)) continue;
          const gk = `${artifact}.${list}|${a.__file}`;
          missing.set(gk, [...(missing.get(gk) || []), key]);
        }
      }
    }
    for (const [gk, keys] of missing) {
      const [where, file] = gk.split('|');
      const m = RULE_ONCE(`${where} declares ${keys.length} item(s) that ${file} never mentions. ` +
        'Name each one in the body, or in "What we could not establish" as one this document does not develop', keys);
      if (m) bad.push(m);
    }
    if (!docs) add('C137', false, true, old
      ? `${old} document(s) carrying a developed list were written before this check and are read against the model they were produced under`
      : 'no artifact carrying a developed list is in this run yet');
    else add('C137', true, bad.length === 0, bad.length ? bad.slice(0, 8).join('; ') + (bad.length > 8 ? `; and ${bad.length - 8} more` : '')
      : `all ${items} item(s) across ${docs} document(s) are reachable in the body a person reads, or named in "What we could not establish" as one it does not develop` +
        (unidentified ? `; ${unidentified} entr(ies) carry no ${DEVELOPED_LISTS.map(d => d.id).join('/')} and were counted rather than read` : ''));
  }

  {
    const TRAIL_FROM = '2026-09-09';
    const idOf = v => {
      const m = String((v && v.touchpoint) || v || '').match(/^\s*([A-Z]{2}-\d+)\b/);
      return m ? m[1] : null;
    };
    const setOf = list => new Set(arr(list).map(idOf).filter(Boolean));
    const A8c = A.A8, A9c = A.A9, A11c = A.A11;
    const made = String((A11c && (A11c.produced_at || A11c.assembled_at)) || '');
    const chosen = (A9c && chosenSolution(dir, runState, { gate: 'G4', fm: A9c }).id) || '';
    if (!A8c || !A9c || !A11c) {
      add('C171', false, true, 'the solution set, the selected solution or the expanded MVP is not in this run yet — the trail needs both ends');
    } else if (!made || made < TRAIL_FROM) {
      add('C171', false, true,
        `the expanded MVP was produced ${made || 'before this rule'} and the trail rule begins ${TRAIL_FROM} — a run that narrowed without recording it broke nothing at the time`);
    } else if (!chosen) {
      add('C171', true, false, 'the selected solution records no selection, so there is no solution whose touchpoints this could follow');
    } else {
      const idea = arr(A8c.ideas).find(x => String((x && x.id) || '') === chosen);
      if (!idea) {
        add('C171', true, false, `the selected solution names ${chosen} and the solution set carries no solution with that id — the trail starts nowhere`);
      } else {
        const fired = setOf(idea.compliance_touchpoints);
        const entries = arr(A11c.compliance_touchpoints);
        const carried = setOf(entries);
        const narrowed = setOf(entries.filter(t => t && String(t.resolution || '') === 'narrowed_out'));
        const lost = [...fired].filter(x => !carried.has(x) && !narrowed.has(x)).sort();
        const m = RULE_ONCE(`the selected solution ${chosen} fired ${fired.size} compliance touchpoint(s) and these are neither carried into the ` +
          'expanded MVP nor named there as narrowed out — a touchpoint that disappears between stages takes its obligation with it', lost);
        add('C171', true, lost.length === 0, m
          || `${chosen} fired ${fired.size} touchpoint(s) and all of them are accounted for on the expansion — ${carried.size} carried, ${narrowed.size} named as narrowed out`);
      }
    }
  }

  {
    const build = recordedBuild(dir);
    const chosen = (A.A9 && chosenSolution(dir, runState, { gate: 'G4', fm: A.A9 }).id) || '';
    const partFile = chosen ? compliancePart(dir, chosen) : '';
    const partText = partFile && existsSync(partFile) ? readFileSync(partFile, 'utf8') : '';
    const fired = [...new Set([...partText.matchAll(/^>\s*\*\*([A-Z]{2}-\d+)\s/gm)].map(m => m[1]))];
    const screened = (/^touchpoints:[ \t]*(\d+)[ \t]*$/m.exec(partText) || [])[1];
    const prd = buildAtLeast(build, PRD_DRAFT_BUILD) && !(A.A13 && A.A13.__file) ? ['the PRD draft', A.A12] : ['the agreed PRD', A.A13];
    const docs = [['the expanded MVP', A.A11], prd].filter(([, a]) => a && a.__file);
    if (!buildAtLeast(build, STATED_COUNT_BUILD))
      add('C185', false, true, (build ? `this run was started on build ${build}, before ${STATED_COUNT_BUILD}, `
        : `this run records no build, so it predates ${STATED_COUNT_BUILD}, `) +
        'when the stages that state a count of compliance touchpoints began taking it from the record — read against the model it ran under');
    else if (!chosen)
      add('C185', false, true, 'no solution is recorded as chosen, so there is no screen whose touchpoints a later document could be counted against');
    else if (!partText)
      add('C185', false, true, `the selected solution ${chosen} has no compliance screen on disk — there is no record for a stated count to come from`);
    else if (!fired.length)
      add('C185', false, true, `the selected solution ${chosen}'s screen fired no compliance touchpoint, so no later document inherits one`);
    else if (!docs.length)
      add('C185', false, true, 'neither the expanded MVP nor the agreed PRD is in this run yet — the count is stated downstream of the screen');
    else if (screened !== undefined && Number(screened) !== fired.length)
      add('C185', true, false, `${partFile} states \`touchpoints: ${screened}\` and names ${fired.length} touchpoint identifier(s) in its own body — ` +
        'the screen every later count is taken from disagrees with itself');
    else {
      const bad = [];
      for (const [what, a] of docs) {
        const text = bodyOf(a.__file);
        const named = fired.filter(t => new RegExp(`(^|[^A-Za-z0-9_-])${t}([^A-Za-z0-9_-]|$)`).test(text));
        const unnamed = fired.filter(t => !named.includes(t));
        if (!unnamed.length) continue;
        const m = RULE_ONCE(`${a.__file}: the selected solution ${chosen} fired ${fired.length} compliance touchpoint(s) and ${what} names ` +
          `${named.length} of them, accounting for the rest nowhere — a smaller number with nothing behind it reads as a recount or as a ` +
          'dropped obligation and a reader cannot tell which. Name each one and say what changed about it', unnamed);
        if (m) bad.push(m);
      }
      add('C185', true, bad.length === 0, bad.length ? bad.join('; ')
        : `${chosen} fired ${fired.length} compliance touchpoint(s) and each of ${docs.length} document(s) downstream of the screen names every one of them by identifier`);
    }
  }

  {
    const words175 = wordsFor(dir, 'run_not_real');
    const SAYS_TEST = new RegExp(words175.source, `${words175.flags}g`);
    const copies175 = A.A14 && A.A14.__file && buildAtLeast(recordedBuild(dir), NOT_REAL_COPY_BUILD)
      ? readingExpected(dir).map(c => c.rel).filter(rel => existsSync(join(dir, rel))) : [];
    const docs = [A.A14, ...copies175.map(rel => ({ __file: rel }))].filter(d => d && d.__file);
    if (!docs.length) {
      add('C175', false, true, 'no initiative in this run — nothing to read for a statement that the run is not real');
    } else {
      const found = [];
      for (const doc of docs) {
        const body = bodyOf(doc.__file);
        const whole = viewRead(join(dir, doc.__file));
        const lines = body.split('\n');
        const off = whole.split('\n').length - lines.length;
        let fenced = false;
        for (let i = 0; i < lines.length; i++) {
          if (/^\s*```/.test(lines[i])) { fenced = !fenced; continue; }
          if (fenced) continue;
          for (const m of lines[i].matchAll(SAYS_TEST)) found.push({ file: doc.__file, line: i + 1 + off, token: m[0] });
        }
      }
      const shown = found.slice(0, 5).map(f => `"${f.token}" at ${f.file}:${f.line}`).join(', ');
      add('C175', true, found.length === 0, found.length
        ? `${found.length} statement(s) in the initiative's body telling its reader the run is not real — ${shown}` +
          `${found.length > 5 ? ', and more' : ''}. Every run is real from 11 September 2026, and this is the document ČS opens`
        : `the initiative says nothing to its reader about being a test, across ${docs.length} file(s)`);
    }
  }

  {
    const bad = [];
    let claims = 0;
    for (const [ck, recs] of FOLD_CLAIMS) {
      claims++;
      if (recs.length < 2) continue;
      const [artifact, field] = ck.split('\u0000');
      const sing = FOLD_SINGULARS[artifact] || {};
      const singular = Object.keys(sing).find(k => sing[k] === field);
      const stageOf = STAGE_OF_ARTIFACT_FOR(runState)(artifact);
      const oneRecord = (() => {
        const ct = contractsOnce();
        if (!ct || stageOf === null) return false;
        return (ct.skills.get(stageOf) || []).length > 0;
      })();
      const head = `${artifact}.${field} is declared by ${recs.length} records (${recs.slice(0, 3).join(', ')}${recs.length > 3 ? ', …' : ''}) ` +
        'and the fold keeps the first — the rest are dropped with no message, which is how three cards ' +
        'were on disk, cited in the body and invisible to every content check. ';
      const remedy = singular
        ? `Write one record per item carrying \`${singular}:\` (singular), which appends rather than replacing.`
        : oneRecord
          ? `§6 declares no singular for \`${field}\`, and this stage's contract declares one record kind — ` +
            `its fan-out writes one file per instance under \`parts/\` and one record from the join. ` +
            `Merge the ${recs.length} records into one; do not split the list.`
          : `§6 declares no singular for \`${field}\`, so this artifact cannot be written one-record-per-item ` +
            `until §6 declares one. Consolidate to one record and raise it.`;
      bad.push(head + remedy +
        ' And if the two records are also one record, two files deriving a single record_id, that is the ' +
        'identity collision C107 names and renaming one record\'s number is the repair, not reshaping the list');
    }
    add('C138', claims > 0, bad.length === 0, bad.length ? bad.join('; ')
      : `${claims} non-empty list claim(s) across this run's records, each made by exactly one record, so the fold drops no content`);
  }

  {
    const cnv = [];
    let carried = 0, none = 0;
    let humanDeclared = 0;
    for (const a of all) {
      const skill = a.produced_by && a.produced_by.skill;
      if (!skill) {
        const decl = contractsOnce() && contractsOnce().producer.get(a.artifact_id);
        const when = a.assembled_at || a.produced_at;
        if (decl && decl.skill && when && String(when) >= PRODUCER_DECLARED_FROM) {
          cnv.push(`${a.__file}: no produced_by.skill, and the contract names ${decl.skill} — run \`SPOCK: fill in the envelope\`, which derives it`);
          continue;
        }
        if (decl && decl.human) {
          humanDeclared++;
          if (a.could_not_verify !== undefined && when && String(when) >= PRODUCER_DECLARED_FROM)
            cnv.push(`${a.__file}: the contract declares this a person's and it carries a could_not_verify list — a claim about rules it has none of`);
          continue;
        }
        none++; continue;
      }
      const want = couldNotVerify(skill, a.assembled_at || a.produced_at);
      const got = arr(a.could_not_verify);
      if (!want.length) {
        if (a.could_not_verify === undefined)
          cnv.push(`${a.__file}: no could_not_verify — every rule of ${skill} is decided by a check, and the artifact must say so rather than stay silent`);
        else if (got.length)
          cnv.push(`${a.__file}: lists ${got.length} unverified rule(s) and every rule of ${skill} is decided by a check`);
        else carried++;
        continue;
      }
      if (a.could_not_verify === undefined) {
        cnv.push(`${a.__file}: no could_not_verify, and ${want.length} of ${skill}'s rules did not run — the reviewer is given no way to see that from the artifact`);
        continue;
      }
      if (got.length !== want.length) {
        cnv.push(`${a.__file}: lists ${got.length} unverified rule(s), the gate model says ${want.length} for ${skill}`);
        continue;
      }
      const bad = [];
      for (let i = 0; i < want.length; i++) {
        const w = want[i], g = got[i] || {};
        if (String(g.rule).trim() !== w.rule) bad.push(`entry ${i + 1} states a rule ${skill} does not carry at that position`);
        else if (String(g.needs).trim() !== w.needs) bad.push(`"${w.rule.slice(0, 40)}…" needs ${w.needs} and the artifact says ${g.needs}`);
        else if ((w.reach || null) !== (g.reach === undefined ? null : g.reach))
          bad.push(`"${w.rule.slice(0, 40)}…" has reach ${w.reach || 'none'} and the artifact says ${g.reach || 'none'}`);
      }
      if (bad.length) cnv.push(`${a.__file}: ${bad.join('; ')}`);
      else carried++;
    }
    add('C65', all.length > 0, cnv.length === 0,
      cnv.length ? cnv.join('; ')
        : `${carried} artifact(s) carry the could-not-verify list their producing skill implies, recomputed here rather than read` +
          (humanDeclared ? `; ${humanDeclared} are a person's and the contract says so` : '') +
          (none ? `; ${none} are supplied to the run and no step produces them` : ''));
  }

  if (!runState) {
    add('C51', false, true, 'no RUN-STATE.md — there is no gate record to check; C38 reports the absence');
  } else {
    const indep = [];
    let recorded = 0;
    for (const s of arr(runState.stages)) {
      const q = s.quality_gate;
      if (!q) continue;
      recorded++;
      const gid = q.id || `stage ${s.id}'s quality gate`;
      const by = q.run_by === undefined || q.run_by === null ? '' : String(q.run_by).trim();
      if (!by) {
        indep.push(`stage ${s.id}: ${gid} records no run_by — a gate that will not say who ran it cannot be shown independent of the producer`);
        continue;
      }
      const own = new Set();
      for (const id of arr(s.artifacts)) {
        const pb = (A[id] || {}).produced_by || {};
        if (pb.agent) { own.add(pb.agent); own.add(canonicalAgent(pb.agent, (A[id] || {}).produced_at)); }
        if (pb.skill) own.add(pb.skill);
      }
      const named = namesProducer(by);
      const mine = named.filter(p => own.has(p));
      if (mine.length)
        indep.push(`stage ${s.id}: ${gid} records run_by="${by}", naming its own producer (${mine.join(', ')}) — ` +
          `the producer cannot record its own gate result`);
      else if (named.length)
        indep.push(`stage ${s.id}: ${gid} records run_by="${by}", naming the registered producer ${named.join(', ')} — ` +
          `a quality gate is automated (§7.5), so nothing that produces work runs one`);
    }
    let decisions = 0;
    for (const s of arr(runState.stages))
      for (const d of arr(s.decision_gates).length ? arr(s.decision_gates) : (s.decision_gate ? [s.decision_gate] : [])) {
        const who = String((d && d.decided_by) || '').trim();
        if (!who) continue;
        decisions++;
        const named = namesProducer(who);
        if (named.length)
          indep.push(`stage ${s.id}: ${d.id || 'a decision gate'} records decided_by="${who}", naming the registered ` +
            `${named.join(', ')} — a decision gate is a person's, and no agent approves, agrees or selects (Rule 1)`);
      }

    let people = 0;
    const NO_TASK_CLEARS = '. No task writes an agent\'s name here since release 1.8, so this was written by hand or on an ' +
      'earlier release, and no task can change it: ask the pilot team';
    const personField = (where, what, field, v, tail = '') => {
      const who = String(v ?? '').trim();
      if (!who) return;
      people++;
      const named = namesProducer(who);
      if (named.length)
        indep.push(`${where}: ${what} records ${field}="${who}", naming the registered ${named.join(', ')}. ` +
          `A decision is a person's, and no agent approves, agrees or selects (Rule 1)${tail}`);
    };
    const stageListing = id => { const s = arr(runState.stages).find(st => st && arr(st.artifacts).includes(id)); return s ? ` (stage ${s.id})` : ''; };
    for (const d of arr(runState.decisions).filter(d => d && !d.superseded_by))
      personField(`stage ${d && d.stage}`, `a ${(d && d.kind) || 'decision'}`, 'by', d && d.by);
    for (const r of arr(runState.refinements)) personField(`stage ${r && r.stage}`, 'a refinement round', 'by', r && r.by, NO_TASK_CLEARS);
    for (const x of arr(runState.stale))
      personField(x && x.artifact ? `${x.artifact}${stageListing(x.artifact)}` : 'a stale input', 'its stale acceptance', 'accepted_by', x && x.accepted_by);
    personField('the run', 'its stop', 'abandoned_by', runState.abandoned_by, NO_TASK_CLEARS);
    for (const s of arr(runState.stages)) personField(`stage ${s.id}`, 'its owner', 'name', s.owner && s.owner.name);

    add('C51', recorded > 0 || decisions > 0 || people > 0, indep.length === 0,
      indep.length ? indep.join('; ')
        : `${recorded} recorded quality gate(s) name a runner, ${decisions} decision gate(s) name a decider and ${people} other ` +
          `person field(s) name a person, and none of them names an agent or skill that produces work`);
  }

  const PAIR_LEFT_OUT = k => EXPECTED_TO_DIFFER.has(k) || ENVELOPE_DERIVED.has(k) || String(k).startsWith('__');
  const canonical = v => (Array.isArray(v) ? v.map(canonical)
    : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, canonical(v[k])])) : v);
  const pairDiff = (draft, agreed) => {
    const found = [];
    const content = x => Object.fromEntries(Object.keys(x || {}).filter(k => !PAIR_LEFT_OUT(k)).sort().map(k => [k, x[k]]));
    const walk = (x, y, path) => {
      if (JSON.stringify(canonical(x)) === JSON.stringify(canonical(y))) return;
      const nested = x && y && typeof x === 'object' && typeof y === 'object' && Array.isArray(x) === Array.isArray(y);
      if (!nested) { found.push({ path, draft: x, agreed: y }); return; }
      const keys = Array.isArray(x)
        ? [...Array(Math.max(x.length, y.length)).keys()]
        : [...new Set([...Object.keys(x), ...Object.keys(y)])].sort();
      for (const k of keys) walk(x[k], y[k], Array.isArray(x) ? `${path}[${k}]` : (path ? `${path}.${k}` : String(k)));
    };
    walk(content(draft), content(agreed), '');
    return found;
  };
  const pairValues = (x, y) => {
    const clean = s => s.replace(/; /g, ', ');
    if (typeof x === 'string' && typeof y === 'string') {
      let i = 0;
      while (i < x.length && i < y.length && x[i] === y[i]) i++;
      const from = Math.max(0, i - 40);
      const cut = s => `"${from ? '…' : ''}${s.slice(from, from + 120)}${s.length > from + 120 ? '…' : ''}"`;
      return [clean(cut(x)), clean(cut(y))];
    }
    const one = v => (v === undefined ? 'absent'
      : clean((s => (s.length > 120 ? `${s.slice(0, 119)}…` : s))(JSON.stringify(v))));
    return [one(x), one(y)];
  };
  const pairNamed = diffs => diffs.slice(0, 3)
    .map(x => { const [was, now] = pairValues(x.draft, x.agreed); return `${x.path} is ${was} on the draft and ${now} on the agreed PRD`; })
    .join(' · ') + (diffs.length > 3 ? ` · and ${diffs.length - 3} more` : '');

  const DECISION_REQUIRED = ['gate', 'by_agent', 'accepted_by', 'accepted_at', 'changed_during_refinement'];
  const ROUND_REQUIRED = ['what', 'reason', 'changed', 'by', 'at'];
  const SELECTS = ['G4', 'G5', 'G5a'];
  const dec = [];
  const carriers = all.filter(a => a.decision != null);

  for (const a of carriers) {
    const d = a.decision;
    if (typeof d !== 'object' || Array.isArray(d)) { dec.push(`${a.__file}: decision is not a record`); continue; }
    const home = arr(runState && runState.stages).find(s => arr(s.artifacts).map(String).includes(String(a.artifact_id)));
    const gatedOn = String((home && home.quality_gate && home.quality_gate.run_at) || '');
    const countKeptByHand = !gatedOn || gatedOn < REWORK_SEEN_FROM;
    for (const k of DECISION_REQUIRED)
      if (d[k] === undefined || d[k] === null || d[k] === '')
        dec.push(`${a.__file}: decision.${k} is missing` +
          (k === 'changed_during_refinement' ? ' — "none" is a legal value, absence is not' : ''));
    if ('by_agent' in d && d.by_agent !== false)
      dec.push(`${a.__file}: decision.by_agent must be false — an agent never records a human decision`);
    const by = arr(d.accepted_by);
    if (by.length === 0) dec.push(`${a.__file}: decision.accepted_by names nobody`);
    for (const p of by)
      if (!p || typeof p !== 'object' || !p.name || !p.role)
        dec.push(`${a.__file}: every decision.accepted_by entry carries a name and a role`);
    if (SELECTS.includes(d.gate) && !d.selection)
      dec.push(`${a.__file}: ${d.gate} selects one of many, so decision.selection is required`);
    if (countKeptByHand && (typeof a.revisions !== 'number' || a.revisions < 0))
      dec.push(`${a.__file}: carries a decision record but no revision count, so "what changed" has no denominator`);

    if (d.refinements === undefined || d.refinements === null)
      dec.push(`${a.__file}: decision.refinements is missing — an empty list is legal, absence is not`);
    else {
      const rounds = arr(d.refinements);
      for (const [i, r] of rounds.entries()) {
        if (!r || typeof r !== 'object' || Array.isArray(r)) {
          dec.push(`${a.__file}: refinement round ${i + 1} is not a record`); continue;
        }
        for (const k of ROUND_REQUIRED)
          if (r[k] === undefined || r[k] === null || String(r[k]).trim() === '')
            dec.push(`${a.__file}: refinement round ${i + 1} records no ${k}` +
              (k === 'reason' ? " — the reviewer's own words are the point of the record" : ''));
        const rb = r.by;
        if (rb && (typeof rb !== 'object' || Array.isArray(rb) || !rb.name || !rb.role))
          dec.push(`${a.__file}: refinement round ${i + 1} names who refined it without a name and a role`);
      }
      const summarised = String(d.changed_during_refinement).trim() === 'none';
      if (summarised && rounds.length > 0)
        dec.push(`${a.__file}: changed_during_refinement is "none" but ${rounds.length} refinement round(s) are recorded`);
      if (!summarised && rounds.length === 0)
        dec.push(`${a.__file}: changed_during_refinement claims "${d.changed_during_refinement}" and no refinement round records it — ` +
          `a change narrated with no trace in the record`);
      const bound = a.artifact_id === 'A13' && A.A12 && typeof A.A12.revisions === 'number'
        ? A.A12.revisions : a.revisions;
      if (countKeptByHand && typeof bound === 'number' && rounds.length > bound)
        dec.push(`${a.__file}: ${rounds.length} refinement round(s) recorded against revisions: ${bound} — ` +
          `a round is a revision, so the rounds cannot outnumber them`);

      if (a.artifact_id === 'A13' && A.A12) {
        const diffs = pairDiff(A.A12, a);
        const differs = diffs.length > 0;
        if (summarised && differs)
          dec.push(`${a.__file}: changed_during_refinement is "none" and A13 differs from A12 — ` +
            `the record says the reviewer changed nothing and the document says otherwise: ${pairNamed(diffs)}`);
        if (!summarised && !differs)
          dec.push(`${a.__file}: changed_during_refinement claims "${d.changed_during_refinement}" and A13 is identical to A12 — ` +
            `a refinement narrated in the record and absent from the artifact`);
      }
    }
  }

  if (A.A12 && A.A13 && A.A13.decision == null) {
    const diffs = pairDiff(A.A12, A.A13);
    if (diffs.length)
      dec.push(`${A.A12.__file}: the agreed PRD is this draft with the agreement added, and the two no longer carry ` +
        `the same content — ${pairNamed(diffs)}. Make any change on the draft, then the person marks the draft agreed again ` +
        `with "SPOCK: mark the PRD agreed", which writes the agreed PRD from it afresh`);
  }

  {
    const agreed = (arr(runState && runState.stages).find(s => Number(s.id) === 6) || {}).agreement;
    if (A.A12 && A.A13 && agreed && agreed.by && String(A.A13.assembled_at || '') >= AGREED_WRITTEN_FROM) {
      const lang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
      const draftText = viewText(join(dir, A.A12.__file));
      const agreedText = viewText(join(dir, A.A13.__file));
      const want = agreedBody((splitPrd(draftText) || { body: draftText }).body, { by: agreed.by, at: agreed.at, lang });
      const have = (splitPrd(agreedText) || { body: agreedText }).body;
      if (typeof want === 'string' && want !== have) {
        const w = want.split('\n'), h = have.split('\n');
        let i = 0;
        while (i < w.length && i < h.length && w[i] === h[i]) i++;
        const line = agreedText.slice(0, agreedText.length - have.length).split('\n').length - 1 + i + 1;
        const shown = v => (v === undefined ? 'nothing'
          : JSON.stringify(v.length > 120 ? `${v.slice(0, 119)}…` : v).replace(/; /g, ', '));
        dec.push(`${A.A12.__file}: the agreed PRD's text is not this draft word for word — line ${line} of the agreed PRD ` +
          `reads ${shown(h[i])} where the draft gives ${shown(w[i])}. Make any change on the draft, then the person marks ` +
          `the draft agreed again with "SPOCK: mark the PRD agreed", which writes the agreed PRD from it afresh`);
      }
    }
  }

  if (runState) {
    for (const s of arr(runState.stages)) {
      const g = GATES[s.id] || {};
      const owed = decisionsFor(s.id);
      const held = arr(s.artifacts).map(id => A[id]).filter(a => a && a.decision != null);
      if (!owed.length) {
        for (const a of held) dec.push(`${a.__file}: stage ${s.id} has no decision gate, so it cannot carry a decision record`);
        continue;
      }
      const retiredHere = Object.entries(RETIRED_DECISION_GATES)
        .filter(([, r]) => r.stage === s.id).map(([id]) => id);
      const legal = [...owed, ...retiredHere];
      if (s.status === 'accepted') {
        const gset = held.map(a => a.decision && a.decision.gate);
        for (const id of owed)
          if (!gset.includes(id)) dec.push(`stage ${s.id} is accepted and no artifact carries the ${id} record`);
        if (held.length > legal.length)
          dec.push(`stage ${s.id} carries ${held.length} decision records; ${legal.join(' and ')} ${legal.length > 1 ? 'are' : 'is'} what it takes`);
      }
      const byGate = new Map(recordedDecisions(s).map(d => [d.id, d]));
      for (const a of held) {
        const d = a.decision;
        if (!legal.includes(d.gate))
          dec.push(`${a.__file}: decision.gate="${d.gate}" but stage ${s.id} is accepted at ${legal.join(' or ')}`);
        const mine = byGate.get(d.gate);
        if (mine && mine.decided_at && d.accepted_at !== mine.decided_at)
          dec.push(`${a.__file}: decision.accepted_at=${d.accepted_at}, the run state records ${mine.decided_at} for ${d.gate} — one decision, two dates`);
      }
      for (const d of recordedDecisions(s))
        if (!legal.includes(d.id))
          dec.push(`stage ${s.id}: the run state records ${d.id}, and stage ${s.id} is accepted at ${legal.join(' or ')}`);
      const mirrored = arr(runState.refinements).filter(x => x && String(x.stage) === String(s.id)).length;
      const onRecord = held.reduce((n, a) => n + arr(a.decision.refinements).length, 0);
      if (mirrored !== onRecord)
        dec.push(`stage ${s.id}: ${onRecord} refinement round(s) across its decision record(s), ` +
          `${mirrored} in the run state — one refinement, two records`);
    }
  }

  if (runState) {
    const stages = arr(runState.stages);
    for (const [i, x] of arr(runState.refinements).entries()) {
      const id = x && x.stage;
      const st = stages.find(s => String(s.id) === String(id));
      if (!st) { dec.push(`run state refinement ${i + 1} names stage "${id}", which this run does not have`); continue; }
      if (!decisionsFor(st.id).length)
        dec.push(`run state refinement ${i + 1} is on stage ${id}, which has no decision gate — ` +
          `there is no review to refine at, and no artifact may carry the round`);
      for (const k of ['what', 'reason', 'changed', 'by', 'role', 'at'])
        if (x[k] === undefined || x[k] === null || String(x[k]).trim() === '')
          dec.push(`run state refinement ${i + 1} records no ${k}`);
    }
  }

  const acceptedWithGate = runState
    ? arr(runState.stages).filter(s => s.status === 'accepted' && decisionsFor(s.id).length).length : 0;
  const pairHeld = Boolean(A.A12 && A.A13);
  add('C40', carriers.length > 0 || acceptedWithGate > 0 || pairHeld, dec.length === 0,
    dec.length ? dec.join('; ')
      : `${carriers.length} decision record(s) in one form — gate, who accepted and in what role, when, and what changed during refinement` +
        (pairHeld ? ', and the agreed PRD carries the draft\'s content field for field' : ''));

  const freeRoam = new Set(all.filter(a => a.workflow === 'free-roam').map(a => a.artifact_id));
  const tainted = new Set(freeRoam);
  for (let changed = true; changed;) {
    changed = false;
    for (const a of all) {
      if (tainted.has(a.artifact_id)) continue;
      if (arr(a.sources).some(s => tainted.has(s))) { tainted.add(a.artifact_id); changed = true; }
    }
  }
  const derived = [...tainted].filter(id => !freeRoam.has(id));

  const c23 = [];
  for (const a of all) {
    if (!derived.includes(a.artifact_id)) continue;
    if (a.free_roam_derived !== true)
      c23.push(`${a.__file}: derives from free-roam material and does not declare free_roam_derived`);
  }
  for (const a of all)
    if (a.free_roam_derived === true && !derived.includes(a.artifact_id) && !freeRoam.has(a.artifact_id))
      c23.push(`${a.__file}: declares free_roam_derived and nothing in its lineage is free-roam`);
  const claimsDerivation = all.some(a => a.free_roam_derived === true);
  add('C23', freeRoam.size > 0 || claimsDerivation, c23.length === 0,
    freeRoam.size === 0 && !claimsDerivation ? 'no free-roam material in this run'
      : c23.length ? c23.join('; ')
        : `${freeRoam.size} free-roam artifact(s) keep their mark; ${derived.length} derived artifact(s) carry the derivation`);

  const adopted = [...freeRoam].filter(id => all.some(a => arr(a.sources).includes(id)));
  const records = runState ? arr(runState.adoptions) : [];
  const CHOICES = ['run_only', 'both', 'free_roam_only'];
  const c25 = [];
  for (const id of adopted) {
    const rec = records.find(r => r && r.artifact === id);
    if (!rec) { c25.push(`${id} was adopted into the run and no decision record says who chose it`); continue; }
    if (rec.by_agent !== false) c25.push(`${id}: an adoption record must carry by_agent: false`);
    if (!rec.decided_by) c25.push(`${id}: the adoption record names nobody`);
    if (!rec.decided_at) c25.push(`${id}: the adoption record has no date`);
    if (!CHOICES.includes(rec.choice))
      c25.push(`${id}: choice "${rec.choice}" is outside ${CHOICES.join('|')} — the three §4.5 offers`);
  }
  for (const r of records)
    if (r && r.artifact && !freeRoam.has(r.artifact))
      c25.push(`an adoption is recorded for ${r.artifact}, which is not free-roam material`);
  add('C25', adopted.length > 0 || records.length > 0, c25.length === 0,
    adopted.length === 0 && records.length === 0 ? 'nothing was adopted from free roam'
      : c25.length ? c25.join('; ')
        : `${adopted.length} adoption(s), each a recorded human choice between the run's artifacts, both, or free roam alone`);

  const offId = all.filter(a => a.run_id !== runId);
  const moved = runState && folderRenamed(runState.run_id, runId) && offId.length && offId.every(a => a.run_id === runState.run_id);
  add('C6', true,
    all.every(a => a.run_id === runId),
    moved ? `the run folder is named "${runId}", and the record and ${offId.length} artifact(s) carry "${runState.run_id}": ` +
            `the folder was renamed, as C38 reports. Rename it back to \`${runState.run_id}\`; rewriting run_id in the documents does not clear C38`
      : offId.map(a => `${a.__file}: run_id="${a.run_id}"`).join('; ')
      || `all ${all.length} artifacts carry ${runId}`);

  const badWf = [];
  for (const a of all) {
    if (!WORKFLOWS.includes(a.workflow)) { badWf.push(`${a.__file}: workflow="${a.workflow}" not a registered workflow`); continue; }
    const skill = a.produced_by && a.produced_by.skill;
    const owner = SKILL_WORKFLOW[skill];
    if (owner && a.workflow !== 'free-roam' && a.workflow !== owner)
      badWf.push(`${a.__file}: workflow="${a.workflow}" but skill "${skill}" belongs to "${owner}"`);
  }
  add('C22', true, badWf.length === 0,
    badWf.length ? badWf.join('; ')
      : `every artifact records a registered workflow matching its producing skill`);

  const badOst = [];
  for (const a of all) {
    if (!OST_ROLES.includes(a.ost_role)) { badOst.push(`${a.__file}: ost_role="${a.ost_role}" is not one of the five`); continue; }
    const declared = REGISTER[a.artifact_id] && REGISTER[a.artifact_id].ost;
    if (declared && a.ost_role !== declared)
      badOst.push(`${a.__file}: ost_role="${a.ost_role}" but the §6.1 register declares ${a.artifact_id} as "${declared}"`);
  }
  add('C28', true, badOst.length === 0,
    badOst.length ? badOst.join('; ')
      : `all ${all.length} artifacts declare the OST role the §6.1 register gives them`);

  add('C19', true,
    all.every(a => STATUSES.includes(a.status)),
    all.filter(a => !STATUSES.includes(a.status)).map(a => `${a.__file}: status="${a.status}"`).join('; ')
      || 'every status in the shared vocabulary');

  const auth = all.filter(a => !['agent', 'human'].includes(a.modified_by))
    .map(a => `${a.__file}: modified_by="${a.modified_by}" is neither agent nor human`);
  const EDITS = join(dir, 'notes', 'marked-edits.md');
  const editsPresent = existsSync(EDITS);
  const { accounted, sections } = editsPresent
    ? accountedEdits(readFileSync(EDITS, 'utf8'))
    : { accounted: new Set(), sections: 0 };
  for (const a of all)
    if (accounted.has(a.artifact_id) && a.modified_by !== 'human')
      auth.push(`${a.__file}: notes/marked-edits.md carries an account of a person editing ${a.artifact_id} ` +
        `and the artifact declares modified_by="${a.modified_by}"`);

  const humanProducer = id => {
    const c = contractsOnce();
    const p = c && c.producer && c.producer.get(String(id));
    return !!(p && p.human);
  };
  let excusedByDate = 0;
  const coveredByDraft = a => String(a.artifact_id) === 'A13' && accounted.has('A12');
  for (const a of all) {
    if (accounted.has(a.artifact_id) || coveredByDraft(a)) continue;
    const owed = editAccountRequired(a, humanProducer(a.artifact_id));
    if (!owed.required) { if (owed.why === 'before-scope') excusedByDate++; continue; }
    auth.push(`${a.__file}: ${a.artifact_id} declares modified_by="human" and nothing in ` +
      `notes/marked-edits.md accounts for a person editing it. If a person changed it, they record the edit with ` +
      `"SPOCK: record that I edited a document", which writes the account, and if nobody did, it is marked ` +
      `modified_by="agent". A claim that a person touched a document is the one thing in this record ` +
      `nobody outside the run can check`);
  }
  if (editsPresent && sections === 0)
    auth.push('notes/marked-edits.md is present and no heading in it names an artifact — the account of ' +
      'what a person changed cannot be compared against what the artifacts declare, and a check that read ' +
      'nothing must not report the same result as one that read everything');
  add('C17', true, auth.length === 0,
    auth.length ? auth.join('; ')
      : `authorship marked on every artifact, both ways${editsPresent
          ? `; notes/marked-edits.md carries ${sections} section(s) naming an artifact, ${accounted.size} of them a person's edit, and each of those declares it`
          : '; the run records no hand edits and carries no account file'}` +
        (excusedByDate
          ? `; ${excusedByDate} artifact(s) declare a person edited them and were produced before ${EDIT_ACCOUNT_SINCE}, when an account became required — they are read against the model they ran under`
          : ''));

  {
    const bad = [], moved = [];
    let answered = 0, skippedAll = 0, silent = 0;
    for (const s of arr(runState && runState.stages)) {
      const gate = (GATES[Number(s.id)] || {}).quality;
      if (!gate) continue;
      const jh = s.judged_half;
      const said = jh && Array.isArray(jh.verdicts) ? jh.verdicts.map(String) : null;
      if (!said || !said.length) { silent++; continue; }
      if (said.every(v => v === 'skipped')) skippedAll++; else answered++;
      const asOf = String(jh.as_of || (s.quality_gate && s.quality_gate.run_at) || '');
      const asked = Number.isFinite(Number(jh.asked)) ? Number(jh.asked) : said.length;
      const nowRules = questionsFor(gate, asOf).length;
      if (said.length !== asked)
        bad.push(`stage ${s.id}: the judged half says ${asked} rule(s) were asked and holds ${said.length} verdict(s) — ` +
          `a gate is answered in full or not at all, never passed with the judged half half-silent`);
      if (nowRules !== asked) moved.push(`stage ${s.id} answered ${asked} rule(s) at ${gate} and ${gate} carries ${nowRules} as of ${asOf} today`);
      const strange = said.filter(v => !JUDGED_RECORDED.includes(v));
      if (strange.length)
        bad.push(`stage ${s.id}: the judged half records ${strange.join(', ')}, and the answers are ${Object.values(JUDGED_VERDICTS).join(', ')}, or skipped for a question left out`);
      if (!String(jh.by || '').trim() || !String(jh.role || '').trim())
        bad.push(`stage ${s.id}: the judged half names ${String(jh.by || '').trim() || 'nobody'} in the role ${String(jh.role || '').trim() || 'nobody stated'} — ` +
          `a verdict without a person and the role they judged in cannot say who was accountable for it`);
    }
    add('C180', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : (answered || skippedAll
            ? `${answered} stage(s) carry a judged half answered in full, ${skippedAll} with every question skipped, and ${silent} report it as not run`
            : `no stage carries a judged half, and every gate goes on reporting it as not run — which is the honest state of ${silent} gate(s) here`)
          + (moved.length ? `; the rule set has moved since it was answered — ${moved.join('; ')}, and the verdicts stand as answers to the rules that were put to them` : ''));
  }

  add('C18', true, all.every(a => 'external_sources' in a),
    all.filter(a => !('external_sources' in a)).map(a => a.__file).join('; ')
      || 'external_sources[] declared on every artifact');

  const bareSkill = s => String(s ?? '').split('@')[0];

  const badProd = [];
  let retired = 0;
  for (const a of all) {
    const pb = a.produced_by || {};
    if (!pb.agent && !pb.skill) {
      const decl = contractsOnce() && contractsOnce().producer.get(a.artifact_id);
      const when = a.assembled_at || a.produced_at;
      if (decl && decl.agent && !decl.human && when && String(when) >= PRODUCER_DECLARED_FROM)
        badProd.push(`${a.__file}: carries no produced_by, and the contract names ${decl.agent}/${decl.skill || '—'} — run \`SPOCK: fill in the envelope\`, which derives it`);
      continue;
    }
    const agentId = canonicalAgent(pb.agent, a.produced_at);
    const bindings = AGENT_BINDINGS[agentId];
    if (!bindings) badProd.push(`${a.__file}: produced_by.agent="${pb.agent}" is not a registered design agent`
      + (RENAMED_AGENT_IDS[pb.agent]
          ? ` — it was renamed to "${RENAMED_AGENT_IDS[pb.agent].now}" on ${RENAMED_AGENT_IDS[pb.agent].renamedOn} and this artifact `
            + `${a.produced_at ? `was produced ${a.produced_at}` : 'records no produced_at'}`
          : ''));
    else if (!bindings.includes(bareSkill(pb.skill))) {
      if (retiredBindingHeld(agentId, bareSkill(pb.skill), a.produced_at)) retired++;
      else badProd.push(`${a.__file}: skill "${pb.skill}" is not a binding of agent "${pb.agent}"`
        + (RETIRED_BINDINGS[bareSkill(pb.skill)]
            ? ` — it was retired on ${RETIRED_BINDINGS[bareSkill(pb.skill)].retiredOn} and this artifact `
              + `${a.produced_at ? `was produced ${a.produced_at}` : 'records no produced_at'}`
            : ''));
    }
  }
  add('C36', true, badProd.length === 0,
    badProd.length ? badProd.join('; ')
      : 'every producer names a registered design agent and one of its bindings, with or without the version suffix both registers carry'
        + (retired ? `; ${retired} name${retired === 1 ? 's' : ''} a binding retired after the artifact was produced` : ''));

  const fromParked = all.filter(a => PARKED_BINDINGS.includes(a.produced_by && a.produced_by.skill));
  add('C57', true, fromParked.length === 0,
    fromParked.length
      ? fromParked.map(a => `${a.__file}: produced by "${a.produced_by.skill}", which is parked — a binding with no allow list does not run`).join('; ')
      : `no artifact was produced by a parked binding (${PARKED_BINDINGS.join(', ')})`);

  const approvals = all.filter(a => a.decision && a.decision.by_agent === true);
  add('C14', true, approvals.length === 0,
    approvals.length ? approvals.map(a => a.__file).join('; ') : 'no document\'s decision is flagged as made by an agent; the names on the run record are C51\'s');

const SCREEN_REGISTRY_NAME = '.github/registry/screening-inputs.yaml';
const SCREEN_STATES = ['in_play', 'not_triggered', 'cannot_determine'];
function screenFaults(screen, label, cards, inputIds, inputBySource, refused) {
  const shape = [], gating = [];
  const areas = arr(screen && screen.areas);
  const byId = new Map(areas.map(a => [String(a && a.area || '').trim(), a]));

  for (const card of cards.areas) {
    const a = byId.get(card.id);
    if (!a) { gating.push(`${label}: area ${card.id} (${card.name}) is not on the screen at all — an area that examined nothing must not be indistinguishable from one that examined everything`); continue; }
    const filled = a.filled === true || String(a.filled) === 'true';
    if (filled !== card.filled)
      gating.push(`${label}: area ${card.id} is marked filled=${a.filled} and the RegMap says ${card.filled}`);
    if (String(a.source || '').trim() !== String(card.source || '').trim())
      gating.push(`${label}: area ${card.id} carries source "${a.source}" and the RegMap says "${card.source}" — the screen names the card it read, and the RegMap records which card that is`);

    if (!card.filled) {
      if (arr(a.sub_domains).length)
        gating.push(`${label}: area ${card.id} has no card and the screen reports ${arr(a.sub_domains).length} sub-domain(s) — an unfilled area returns no map and never returns clean`);
      continue;
    }

    const seen = new Map();
    for (const s of arr(a.sub_domains)) {
      const id = String(s && s.sub_domain || '').trim();
      if (!id) { shape.push(`${label}: area ${card.id} carries a sub-domain entry naming no sub-domain`); continue; }
      if (!card.subDomains.includes(id)) { shape.push(`${label}: area ${card.id} reports "${id}", which its card does not declare — it declares ${NAMING(card.subDomains)}`); continue; }
      seen.set(id, (seen.get(id) || 0) + 1);
      const state = String(s.state || '').trim();
      if (!state) shape.push(`${label}: ${card.id}.${id} carries no state — there is no partial screen`);
      else if (!SCREEN_STATES.includes(state)) shape.push(`${label}: ${card.id}.${id} is "${state}", outside ${SCREEN_STATES.join(' | ')} — there is no fourth state`);
      const because = String(s.because || '').trim();
      if (!because) shape.push(`${label}: ${card.id}.${id} states no reason`);
      if (refused.test(because))
        shape.push(`${label}: ${card.id}.${id} says "not applicable", which is a judgement about the regulation — the middle state says what the description did not contain`);

      const missing = String(s.missing_input || '').trim();
      if (state === 'cannot_determine') {
        if (!missing) gating.push(`${label}: ${card.id}.${id} cannot be determined and names no missing input — a reader is told something was unclear rather than what to go and get`);
        else if (inputIds && !inputIds.has(missing)) {
          const via = inputBySource && inputBySource.get(missing);
          gating.push(`${label}: ${card.id}.${id} names missing input "${missing}", which ${SCREEN_REGISTRY_NAME} does not declare` +
            (via ? ` as a canonical input — it is a card row that "${via}" covers, and the canonical id is what a screen names`
                 : ` — the ${inputIds.size} it declares are ${NAMING(inputIds)}`));
        }
      } else if (missing) {
        gating.push(`${label}: ${card.id}.${id} is "${state}" and names a missing input — only a cannot-determine carries one`);
      }

      if (state === 'in_play') {
        const fired = arr(a.triggers_fired).map(x => String(x && x.trigger || x).trim());
        if (!fired.length) gating.push(`${label}: ${card.id}.${id} is in play and the area records no trigger as fired — a sub-domain in play with nothing behind it is an opinion`);
      }
    }
    for (const [id, n] of seen) if (n > 1) shape.push(`${label}: ${card.id}.${id} appears ${n} times`);
    const blank = card.subDomains.filter(id => !seen.has(id));
    if (blank.length) shape.push(`${label}: area ${card.id} leaves ${blank.length} sub-domain(s) unreported: ${blank.slice(0, 6).join(', ')}${blank.length > 6 ? ', …' : ''}`);

    const inPlay = new Set(arr(a.sub_domains).filter(s => String(s && s.state).trim() === 'in_play').map(s => String(s.sub_domain).trim()));
    for (const tRaw of arr(a.triggers_fired)) {
      const id = String(tRaw && tRaw.trigger || tRaw).trim();
      if (!card.triggers.includes(id)) { gating.push(`${label}: area ${card.id} records trigger "${id}", which its card does not declare — it declares ${NAMING(card.triggers)}`); continue; }
      const named = arr(tRaw && tRaw.puts_in_play).map(x => String(x).trim());
      if (!named.length) gating.push(`${label}: area ${card.id} trigger ${id} fired and names no sub-domain it put in play`);
      for (const n of named) if (!inPlay.has(n)) gating.push(`${label}: area ${card.id} trigger ${id} names ${n}, which the screen does not report in play`);
    }
  }

  for (const id of byId.keys())
    if (!cards.areas.some(a => a.id === id)) gating.push(`${label}: reports area "${id}", which the RegMap does not declare`);

  const uncovered = new Set(arr(screen && screen.uncovered).map(u => String(u && u.area || u).trim()));
  for (const o of cards.outOfScope)
    if (!uncovered.has(o.id)) gating.push(`${label}: does not carry uncovered area ${o.id} — a screen silent about what it does not cover reads as covering everything`);

  return { shape, gating };
}

function escalationFaults(screen, label, cards) {
  const c = [];
  const e = screen && screen.escalation;
  if (e == null) { c.push(`${label}: carries no escalation flag — a screen that says nothing about escalation reads as having found nothing to escalate`); return c; }
  const flag = e.flag === true || String(e.flag) === 'true';
  if (e.flag == null || !['true', 'false'].includes(String(e.flag))) c.push(`${label}: escalation.flag is "${e.flag}" — it is binary and never absent`);
  const fired = arr(e.fired);
  if (flag !== (fired.length > 0))
    c.push(`${label}: escalation.flag is ${e.flag} and ${fired.length} trigger(s) fired — the flag is whether any did`);

  const byArea = new Map(cards.areas.map(a => [a.id, a]));
  const seen = new Set();
  for (const f of fired) {
    const area = String(f && f.area || '').trim();
    const trig = String(f && f.trigger || '').trim();
    const card = byArea.get(area);
    if (!card) { c.push(`${label}: a fired trigger names area "${area}", which the RegMap does not declare — it declares ${NAMING(byArea.keys())}`); continue; }
    const decl = card.escalation.find(x => x.id === trig);
    if (!decl) { c.push(`${label}: ${area} fires "${trig}", which its card's §11 does not declare — it declares ${NAMING(card.escalation.map(x => x.id))}`); continue; }
    seen.add(`${area}.${trig}`);
    if (!String(f.because || '').trim()) c.push(`${label}: ${area}.${trig} fired and states no reason`);
    if (!String(f.routes_to || '').trim())
      c.push(`${label}: ${area}.${trig} names no routes_to — no card carries a role, so the value is "unstated" and saying nothing is not the same claim`);
    if (decl.routesOut && !String(f.note || '').trim())
      c.push(`${label}: ${area}.${trig} routes outside the four areas and says nothing — a reader has to be told that routing is the whole of what this workflow does about it`);
  }

  for (const a of arr(screen.areas)) {
    const card = byArea.get(String(a.area || '').trim());
    if (!card || !card.filled) continue;
    const undet = new Set(arr(a.sub_domains)
      .filter(s => String(s && s.state).trim() === 'cannot_determine')
      .map(s => String(s.sub_domain).trim()));
    for (const x of card.escalation) {
      if (!x.firesOn || !undet.has(x.firesOn)) continue;
      if (!seen.has(`${card.id}.${x.id}`))
        c.push(`${label}: ${card.id}.${x.firesOn} cannot be determined and ${x.id} ("${x.name}") did not fire — this trigger exists to catch that uncertainty and must not be silenced by it`);
    }
  }
  return c;
}

  const A1 = A.A1;
  if (A1) {
    const unknown = new Set(arr(A1.unknowns).map(u => u && u.field));
    const preRename = String(A1.produced_at || '') && String(A1.produced_at) < BRIEF_RENAMED_ON;
    const missing = BRIEF_REQUIRED.filter(f => {
      const names = preRename && BRIEF_LEGACY[f] ? [f, BRIEF_LEGACY[f]] : [f];
      const held = names.some(n => {
        const v = A1[n];
        return !(v == null || v === '' || (Array.isArray(v) && v.length === 0));
      });
      return !held && !names.some(n => unknown.has(n));
    });
    add('C10', true, missing.length === 0,
      missing.length ? `missing and not marked unknown: ${missing.join(', ')}`
                     : `all ${BRIEF_REQUIRED.length} required fields present or marked unknown`);

    const A1b = A.A1b, A8 = A.A8;
    const setMadeOn = String((A8 && (A8.produced_at || A8.assembled_at)) || '');
    const owesSections = !!A8 && setMadeOn >= COMPLIANCE_ON_SOLUTION_SINCE;
    const answersShape = !!A8 && setMadeOn >= SECTIONS_EIGHT;
    if (answersShape) {
      const shape = [], gating = [], esc = [];
      let solutions = 0, answered = 0, firedTot = 0, openTot = 0, escTot = 0;
      const lang = complianceLanguage(dir);
      const inCzech = lang === 'cs' ? ', in Czech, the language the writer wrote them in' : '';
      for (const idea of arr(A8.ideas)) {
        const id = String(idea && idea.id || '?').trim();
        const derFile = compliancePart(dir, id);
        const r = deriveFor(dir, id, lang);
        solutions++;
        for (const x of (r.problems || [])) (/(names no input|no screening input)/.test(x) ? gating : shape).push(x);
        if (!r.body) { shape.push(`${id}: no compliance section could be derived — the answers are not on disk`); continue; }
        if (!existsSync(derFile)) { shape.push(`${id}: the derived compliance section is not on disk — run derive.mjs`); continue; }
        const onDisk = readFileSync(derFile, 'utf8');
        if (onDisk.replace(/\s+/g, ' ').trim() !== r.body.replace(/\s+/g, ' ').trim())
          shape.push(`${id}: the compliance section on disk is not what its answers derive — regenerate it with \`node .github/scripts/derive.mjs ${dir} --write\``);
        if (wordsFor(dir, 'not_applicable').test(onDisk))
          shape.push(`${id}: the compliance section says "not applicable" — that is a compliance judgement and this workflow does not make them`);
        for (const a of areaNames(lang)) if (!new RegExp(`^#### ${a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm').test(onDisk))
          gating.push(`${id}: the compliance section does not report ${a} — an area that fired nothing is still reported, because a missing heading reads as one nobody looked at`);
        answered += r.answered || 0; firedTot += r.fired || 0; openTot += r.open || 0; escTot += r.escalated || 0;
      }
      add('C125', true, shape.length === 0, shape.length ? shape.join('; ')
        : `${solutions} solution(s) answered every question all four cards carry — ${answered} answers, each one of three verdicts, and the section a person reads is what those answers derive${inCzech}`);
      add('C126', true, gating.length === 0, gating.length ? gating.join('; ')
        : `${solutions} solution(s) report all four areas, including any that fired nothing — ${firedTot} touchpoint(s) fired and ${openTot} question(s) unresolved, each naming the declared input that would settle it${inCzech}`);
      add('C129', true, esc.length === 0, esc.length ? esc.join('; ')
        : `${escTot} escalation trigger(s) fired across ${solutions} solution(s), as their derived compliance sections report`);
    } else if (!owesSections && !A1b) {
      const why = A8
        ? `this run's solution set was produced ${setMadeOn || 'with no date'}, before ${COMPLIANCE_ON_SOLUTION_SINCE}, and it holds no A1b`
        : 'no A1b and no solution set in this run';
      add('C125', false, true, `${why} — nothing here applies`);
      add('C126', false, true, `${why} — nothing here applies`);
      add('C129', false, true, `${why} — nothing here applies`);
    } else {
      const cards = areaCards();
      const reg = screeningRegistry();
      const inputIds = reg ? new Set(reg.inputs.map(i => i.id)) : null;
      const inputBySource = reg
        ? new Map(reg.inputs.flatMap(i => (Array.isArray(i.sources) ? i.sources : []).map(x => [String(x).trim(), i.id])))
        : null;
      if (!cards) {
        add('C125', true, false, 'the RegMap registry is absent — the areas a screen must report cannot be resolved');
        add('C126', true, false, 'the RegMap registry is absent — the areas a screen must report cannot be resolved');
        add('C129', true, false, 'the RegMap registry is absent — the escalation triggers cannot be resolved');
      } else {
        const carriers = [];
        const shape = [], gating = [], esc = [];
        if (owesSections) {
          const ideas = arr(A8.ideas);
          if (!ideas.length) shape.push('A8 carries no solutions, so there is no compliance section to read');
          for (const idea of ideas) {
            const id = String(idea && idea.id || '?').trim();
            const sec = idea && idea.compliance;
            if (!sec || typeof sec !== 'object') {
              const fault = `A8/${id} carries no compliance section — a solution set produced on or after `
                + `${COMPLIANCE_ON_SOLUTION_SINCE} carries one per solution (§6.9)`;
              shape.push(fault); gating.push(fault); esc.push(fault);
              continue;
            }
            carriers.push({ carrier: sec, label: `A8/${id}` });
          }
        } else {
          carriers.push({ carrier: A1b, label: 'A1b' });
        }
        for (const { carrier, label } of carriers) {
          const f = screenFaults(carrier, label, cards, inputIds, inputBySource, wordsFor(dir, 'not_applicable'));
          shape.push(...f.shape); gating.push(...f.gating);
          esc.push(...escalationFaults(carrier, label, cards));
        }
        const count = (pick) => carriers.reduce((n, c) =>
          n + arr(c.carrier.areas).reduce((m, a) => m + arr(a.sub_domains).filter(s => String(s && s.state).trim() === pick).length, 0), 0);
        const filledAreas = cards.areas.filter(a => a.filled);
        const examined = filledAreas.reduce((n, a) => n + a.subDomains.length, 0) * (carriers.length || 1);
        const firedN = carriers.reduce((n, c) => n + arr(c.carrier.escalation && c.carrier.escalation.fired).length, 0);
        const declaredN = filledAreas.reduce((n, a) => n + a.escalation.length, 0) * (carriers.length || 1);
        const where = owesSections
          ? [`${carriers.length} compliance section(s), one per solution,`, 'give', 'carry', 'resolve']
          : ['A1b, the retired initiative screen this run was produced under,', 'gives', 'carries', 'resolves'];
        add('C125', true, shape.length === 0, shape.length ? shape.join('; ')
          : `${where[0]} ${where[1]} each of ${examined} sub-domain(s) across ${filledAreas.length} filled area(s) one of ${SCREEN_STATES.length} states, none blank, and ${owesSections ? 'never write' : 'never writes'} the refused phrase`);
        add('C129', true, esc.length === 0, esc.length ? esc.join('; ')
          : `${where[0]} ${where[2]} the flag beside the screen — ${firedN} of ${declaredN} declared escalation trigger(s) fired, each naming its area and its reason, and every trigger that fires on an unresolved sub-domain has been checked against the screen's own`);
        add('C126', true, gating.length === 0, gating.length ? gating.join('; ')
          : `${where[0]} ${where[3]}: ${count('in_play')} sub-domain(s) in play each behind a fired trigger, ${count('cannot_determine')} that cannot be determined each naming a declared input, all ${cards.areas.length} area(s) present and all ${cards.outOfScope.length} uncovered area(s) stated`);
      }
    }

    const KR_ID = /^(NOM|SHD|LVL|INV|TL|AI)-\d+[ab]?$/;
    const basis = KNOW_HOW.find(b => b.name === 'strategy-basis.md');
    let known = null;
    if (basis && basis.present) {
      const txt = readFileSync(join('specifications/definitions/know-how', basis.path), 'utf8');
      known = new Map();
      let section = '';
      for (const line of txt.split('\n')) {
        const h = /^###\s+(\d+\.\d+\s+.*?)\s*$/.exec(line);
        if (h) { section = h[1]; continue; }
        const r = /^\|\s*\*\*((?:NOM|SHD|LVL|INV|TL|AI)-\d+[ab]?)\*\*\s*\|([^|]*)\|([^|]*)\|([^|]*)\|/.exec(line);
        if (!r) continue;
        const clean = v => v.replace(/\*\*/g, '').replace(/`/g, '').trim();
        if (!known.has(r[1])) known.set(r[1], { words: clean(r[2]), direction: clean(r[3]).toLowerCase(), type: clean(r[4]).toUpperCase(), section });
      }
      if (!known.size) known = null;
    }

    const raw = arr(A1.goals);
    const gbad = [];
    raw.forEach((g, i) => {
      if (!g || typeof g !== 'object') {
        gbad.push(`goal ${i + 1} is a bare value — a goal carries its product goal, metric, key_result and link`);
        return;
      }
      for (const part of ['metric', 'key_result', 'link'])
        if (!g[part] || String(g[part]).trim() === '')
          gbad.push(`goal ${i + 1} has no ${part}`);
      const said = v => v !== undefined && v !== null && String(v).trim() !== '';
      if (!said(g.product_goal) && !said(g.north_star))
        gbad.push(`goal ${i + 1} has neither a product_goal nor a north_star — the product goal is the North Star, and one of the two names it`);
      if (g.metric && KR_ID.test(String(g.metric).trim()))
        gbad.push(`goal ${i + 1} names key result ${String(g.metric).trim()} as its own metric — a product measure is never the company measure`);
      const kr = String(g.key_result || '').trim();
      const krm = /^((?:NOM|SHD|LVL|INV|TL|AI)-\d+[ab]?)\b([\s\S]*)$/.exec(kr);
      const krId = krm ? krm[1] : kr, cited = krm ? krm[2] : '';
      if (kr === 'unavailable' && !String(A1.strategy_basis || '').trim() && !String(g.strategy_basis || '').trim())
        gbad.push(`goal ${i + 1} names key_result "unavailable" and the brief carries no strategy_basis saying why — a missing basis is declared, never left to be inferred from a word`);
      else if (kr && kr !== 'unavailable' && known && !known.has(krId))
        gbad.push(`goal ${i + 1} names ${g.key_result}, which is not a key result in the Strategy Basis`);
      else if (kr && kr !== 'unavailable' && known && cited.trim()) {
        const row = known.get(krId);
        const up = wordsFor(dir, 'kr_increase').exec(cited), down = wordsFor(dir, 'kr_decrease').exec(cited);
        const way = up && (!down || up.index <= down.index) ? 'increase' : down ? 'decrease' : null;
        if (way && way !== row.direction)
          gbad.push(`goal ${i + 1} cites ${krId} as ${way} and the Strategy Basis writes it ${row.direction}`);
        const typ = /\btype\s*:?\s*`?([CI])`?\b/i.exec(cited);
        if (typ && typ[1].toUpperCase() !== row.type)
          gbad.push(`goal ${i + 1} cites ${krId} as type ${typ[1].toUpperCase()} and the Strategy Basis writes it type ${row.type}`);
        const sec = /§\s*(\d+\.\d+)/.exec(cited);
        if (sec && !row.section.startsWith(`${sec[1]} `))
          gbad.push(`goal ${i + 1} cites ${krId} under §${sec[1]} and the Strategy Basis writes it under §${row.section}`);
      }
    });

    const kr = known ? 'against the Strategy Basis' : 'without the Strategy Basis, so membership was not checked';
    const none = raw.filter(g => g && typeof g === 'object' && String(g.key_result || '').trim() === 'unavailable').length;
    const carries = none === 0 ? 'a key result'
      : none === raw.length ? 'key_result unavailable with the reason written'
      : `a key result (${raw.length - none}) or key_result unavailable with the reason written (${none})`;
    const rows = known ? raw.map(g => {
        const m = /^((?:NOM|SHD|LVL|INV|TL|AI)-\d+[ab]?)\b/.exec(String((g && g.key_result) || '').trim());
        const row = m && known.get(m[1]);
        return row ? `${m[1]} ${row.words}, ${row.direction}, type ${row.type}, §${row.section}` : '';
      }).filter(Boolean) : [];
    add('C77', true, gbad.length === 0,
      gbad.length ? gbad.join('; ')
        : raw.length ? `all ${raw.length} goal(s) carry a product goal, which is the North Star, a metric that is not a key result, ${carries} and a written link — checked ${kr}` +
                       (rows.length ? ` — ${rows.join('; ')}` : '')
                     : 'the brief carries no goal, which C10 governs');
  } else { add('C10', false, true, 'A1 absent — stage 1 not run');
           add('C77', false, true, 'A1 absent — stage 1 not run'); }

  const { A2, A2b, A3, A4 } = A;

  if (A2) {
    const items = arr(A2.items);
    const bad = items.filter(i => !['file', 'conversation'].includes(i && i.arrival));
    const RESEARCH = ['synthetic', 'human', 'not_stated'];
    const said = v => v !== undefined && v !== null && String(v).trim() !== '';
    const badResearch = items.filter(i => i && said(i.research) && !RESEARCH.includes(String(i.research).trim()));
    const valueOf = i => (i && said(i.research) ? String(i.research).trim() : '');
    const kinds = items.filter(i => ['synthetic', 'human'].includes(valueOf(i))).length;
    const silent = items.filter(i => valueOf(i) === 'not_stated').length;
    const saidProv = i => i && i.provenance !== undefined && i.provenance !== null && String(i.provenance).trim() !== '';
    const researchBuild = recordedBuild(dir);
    const labelled = items.filter(i => ['synthetic', 'human'].includes(valueOf(i)) && !saidProv(i));
    const heldToProvenance = buildAtLeast(researchBuild, RESEARCH_PROVENANCE_BUILD);
    const bareLabel = heldToProvenance ? labelled : [];
    const notHeld = !heldToProvenance && labelled.length
      ? ` — ${labelled.map(i => `${i.ref} records research: ${valueOf(i)} with an empty provenance`).join(', ')}, and ` +
        (researchBuild ? `this run was started on build ${researchBuild}, before ${RESEARCH_PROVENANCE_BUILD}, `
                       : `this run records no build, so it predates ${RESEARCH_PROVENANCE_BUILD}, `) +
        'when a label began carrying the words it was read from, so it is not held to it'
      : '';
    add('C33', true, items.length > 0 && bad.length === 0 && badResearch.length === 0 && bareLabel.length === 0,
      (items.length === 0 ? 'A2 has no items — problem material is required'
        : bad.length || badResearch.length || bareLabel.length ? [
            bad.length ? `items without a valid arrival: ${bad.map(i => i.ref).join(', ')}` : '',
            badResearch.length ? `${badResearch.map(i => `${i.ref} records research: "${i.research}"`).join(', ')} — ` +
              `research is one of synthetic, human or not_stated, and not_stated is the value for a file that does not say` : '',
            bareLabel.length ? `${bareLabel.map(i => `${i.ref} records research: ${valueOf(i)} and an empty provenance`).join(', ')} — ` +
              `a label that says the material is synthetic or human carries the words it was read from in provenance, and ` +
              `where a person stated it, their name, the date and their words with your own reading of the file beside them` : '',
          ].filter(Boolean).join('; ')
        : `${items.length} items, each recording file or conversation` +
          [kinds ? `${kinds} saying whether ${kinds === 1 ? 'it is' : 'they are'} synthetic or human research` : '',
           silent ? `${silent} labelled not_stated, the file not saying` : ''].filter(Boolean).map(x => `, ${x}`).join('')) + notHeld);

    const bad34 = [];
    if (A2.supplied_by !== 'user')
      bad34.push(`supplied_by="${A2.supplied_by}" — must be "user"`);
    if (A2.modified_by !== 'human')
      bad34.push(`modified_by="${A2.modified_by}" — problem material is supplied by a person and is an ` +
        `input to stage 2, never its output; "human" is the only authorship mark A2 may carry`);
    const p34 = A2.produced_by && (A2.produced_by.agent || A2.produced_by.skill);
    if (p34) bad34.push(`produced_by names ${A2.produced_by.agent || '—'}/${A2.produced_by.skill || '—'} ` +
      `— no agent and no skill produces A2`);
    add('C34', true, bad34.length === 0, bad34.length ? bad34.join('; ')
      : `problem material declares supplied_by: user and modified_by: human over ${items.length} item(s), ` +
        `and names no producing agent or skill`);
  } else {
    add('C33', false, true, 'A2 absent — stage 2 not run');
    add('C34', false, true, 'A2 absent — stage 2 not run');
  }

  {
    const supplied = suppliedFiles(dir);
    const items = A2 ? arr(A2.items).filter(inUse) : [];
    const fromFile = items.filter(i => i && String(i.arrival) === 'file');
    const joined = citingItems(items);
    const fromTalk = joined.filter(i => String(i.arrival) !== 'file');
    const talkBuild = recordedBuild(dir);
    const talkHeld = buildAtLeast(talkBuild, CONVERSATION_JOIN_BUILD);
    const onDisk = sp => supplied.some(f => f.rel === sp || f.rel === sp.replace(/^supplied\//, ''));
    const inScope = supplied.length > 0 || String((A2 && A2.produced_at) || '') >= SUPPLIED_JOIN_SINCE;
    const loose = looseMaterial.map(rel =>
      `${rel} is material sitting loose in the stage folder — move it to ${STAGE_DIRS[1]}/${SUPPLIED_DIR}/ ` +
      `so the artifact walk does not read it as a document; to retire a file, move it to the run's superseded/ folder, not into the stage folder`);
    for (const f of material(dir).files.filter(x => !x.artifact && String(x.rel).startsWith('superseded/')))
      loose.push(`${STAGE_DIRS[1]}/${f.rel} is in ${STAGE_DIRS[1]}/superseded/, and a retired file belongs in the run's own superseded/ folder, ` +
        'beside the stage folders, where the take-in finds it');
    const bad = [];
    if (inScope) {
      for (const i of [...fromFile, ...(talkHeld ? fromTalk : [])]) {
        const sp = String(i.source_path || '').trim();
        if (!sp) { bad.push(`${i.ref || 'an item'} declares arrival: file and carries no source_path`); continue; }
        if (!onDisk(sp))
          bad.push(`${i.ref || 'an item'} declares source_path ${sp}, and ${STAGE_DIRS[1]}/ holds no such file`);
      }
      for (const f of supplied)
        if (!joined.some(i => citesSupplied(i, f)))
          bad.push(`${STAGE_DIRS[1]}/${f.rel} was supplied and no item cites it — material nothing reads is material nobody checked`);
    }
    const unheld = inScope && !talkHeld ? fromTalk.filter(i => !onDisk(String(i.source_path).trim())) : [];
    const notHeld = unheld.length
      ? ` — ${unheld.map(i => `${i.ref || 'an item'} came from the conversation and names ${String(i.source_path).trim()}, which ` +
          `${STAGE_DIRS[1]}/ does not hold`).join('; ')}, and ` +
        (talkBuild ? `this run was started on build ${talkBuild}, before ${CONVERSATION_JOIN_BUILD}, `
                   : `this run records no build, so it predates ${CONVERSATION_JOIN_BUILD}, `) +
        'when an item from the conversation began to be held to its file, so it is not held to it'
      : '';
    const all = [...bad, ...loose];

    if (!A2 && !loose.length) add('C159', false, true, 'A2 absent — stage 2 not run');
    else if (!inScope && !loose.length)
      add('C159', false, true,
        `${fromFile.length} item(s) declare arrival: file; this run predates the join key and holds no ` +
        `${SUPPLIED_DIR}/ folder, so its material was not verified to exist`);
    else add('C159', true, all.length === 0, (all.length ? all.join('; ')
      : inScope
        ? `${supplied.length} supplied file(s) and ${joined.length} item(s) citing one, joined both ways by path; ` +
          `nothing loose in ${STAGE_DIRS[1]}/`
        : `nothing loose in ${STAGE_DIRS[1]}/; the join is out of scope on this run and was not read`) + notHeld);
  }

  if (!A2) add('C172', false, true, 'A2 absent — stage 2 not run');
  else {
    const madeOn = String(A2.produced_at || A2.assembled_at || '');
    const fromFile172 = arr(A2.items).filter(i => i && String(i.source_path || '').trim());
    const retired172 = fromFile172.filter(i => !inUse(i));
    const live172 = fromFile172.filter(inUse);
    if (!madeOn || madeOn < MATERIAL_MEASURED_FROM)
      add('C172', false, true,
        `A2 was produced ${madeOn ? `on ${madeOn}` : 'on no recorded date'}, before ${MATERIAL_MEASURED_FROM}, ` +
        'when nothing measured what arrived — it is read against the model it was produced under');
    else if (!fromFile172.length)
      add('C172', false, true, 'no item on A2 cites a supplied file, so there is nothing to measure');
    else {
      const problems = [];
      const DAY = /^\d{4}-\d{2}-\d{2}$/;
      for (const i of retired172) {
        const label = `${i.ref || String(i.source_path).trim()}`;
        const on = String(i.superseded_at ?? i.removed_at ?? '').trim();
        if (!DAY.test(on)) { problems.push(`${label}: is no longer in use and carries no date it was ${i.removed_at !== undefined ? 'removed' : 'replaced'} on`); continue; }
        if (String(i.kept_as || '').trim()) {
          const kept = join(dir, String(i.kept_as).trim()), want = String(i.kept_sha256 || i.sha256 || '').trim();
          const k = existsSync(kept) ? measure(kept) : null;
          if (!k) problems.push(`${label}: is kept as ${String(i.kept_as).trim()}, which is not on disk. Put that file back in the run's superseded/ folder as it was kept`);
          else if (want && k.sha256 !== want) problems.push(`${label}: ${String(i.kept_as).trim()} does not match the fingerprint recorded when it was kept, ${want}. Put back the version kept then`);
        }
      }
      for (const i of live172) {
        const sp = String(i.source_path).trim();
        const label = `${i.ref || sp}`;
        const declared = String(i.sha256 || '').trim();
        const bytes = i.bytes;
        if (!declared || bytes === undefined || bytes === null) {
          problems.push(`${label}: cites ${sp} and records ${!declared ? 'no sha256' : 'no bytes'} — ` +
            'a path with no measurement cannot be compared against the copy the person still holds');
          continue;
        }
        const abs = join(dir, STAGE_DIRS[1], sp);
        if (!existsSync(abs)) { problems.push(`${label}: ${sp} is recorded with a hash and is not on disk. An agent cannot fix this, so do not run the check again. Tell the person what changed and ask them to run "SPOCK: add problem material", which asks them to confirm. To undo the change instead, put back the version with fingerprint ${declared}`); continue; }
        const m = measure(abs);
        if (!m) { problems.push(`${label}: ${sp} could not be read to compare`); continue; }
        const now = m.sha256, nowBytes = m.bytes;
        if (now !== declared)
          problems.push(`${label}: ${sp} does not match what intake recorded — ${nowBytes} bytes now against ` +
            `${bytes} recorded, and the hashes differ. The file changed after the run read it. An agent cannot fix this, so do not run the check again. Tell the person what changed and ask them to run "SPOCK: add problem material", which asks them to confirm. To undo the change instead, put back the version with fingerprint ${declared}`);
      }
      add('C172', true, problems.length === 0, problems.length ? problems.join('; ')
        : `${live172.length} item(s) citing ${new Set(live172.map(i => String(i.source_path).trim())).size} supplied file(s), measured at intake and still matching, byte count and ` +
          'SHA-256 both — and the figures were printed for the person to compare against their own copies' +
          (retired172.length ? `; ${retired172.length} item(s) no longer in use, each dated, and every kept copy matching the fingerprint recorded when it was kept` : ''));
    }
  }

  if (A2b) {
    const obs = arr(A2b.observations);
    const noKey = obs.filter(o => !o || !o.origin_key);
    const badUnest = obs.filter(o => o && o.origin_key === 'unestablished' && o.provenance_complete === true);
    const periodBuild = recordedBuild(dir);
    const heldToPeriod = buildAtLeast(periodBuild, PERIOD_DATE_BUILD);
    const items37 = A2 ? arr(A2.items).filter(Boolean) : [];
    const confirmedFor = ref => {
      const it = items37.find(i => String(i.ref ?? '').trim() === String(ref ?? '').trim());
      if (!it) return '';
      const own = confirmedPeriod(it.period_confirmed);
      if (own) return own;
      const key = suppliedFileKey(it.source_path);
      const sibling = key ? items37.find(i => suppliedFileKey(i.source_path) === key && confirmedPeriod(i.period_confirmed)) : null;
      return sibling ? confirmedPeriod(sibling.period_confirmed) : '';
    };
    const notDate = [], unconfirmed = new Map(), notRead = [];
    let byPeriod = 0;
    for (const o of obs) {
      if (!o || o.provenance_complete !== true) continue;
      const at = String(o.observed_at ?? '').trim();
      if (FULL_DATE_RE.test(at)) continue;
      const id = String(o.id || o.ref || '(unnamed)');
      if (!heldToPeriod) { notRead.push(id); continue; }
      if (!PERIOD_RE.test(at)) { notDate.push({ id, at }); continue; }
      if (confirmedFor(o.ref) === at) { byPeriod++; continue; }
      const k = `${o.ref}\u0000${at}`;
      (unconfirmed.get(k) || unconfirmed.set(k, { ref: o.ref, at, ids: [] }).get(k)).ids.push(id);
    }
    const are = ids => `${ids.join(', ')} ${ids.length === 1 ? 'is' : 'are'}`;
    const badPeriod = [
      ...notDate.map(({ id, at }) => at
        ? `${id} is dated "${at}", which is neither a date nor a period (${PERIOD_FORMS})`
        : `${id} is marked complete and carries no date, and a complete observation is dated by a date or a period (${PERIOD_FORMS})`),
      ...[...unconfirmed.values()].map(u => `${are(u.ids)} dated ${u.at} and marked complete, and the person has not ` +
        `confirmed that period for ${u.ref || 'its item'}. The person confirms it in the box of "${PERIOD_TASK}"; until then ` +
        `mark the observation incomplete`),
    ];
    const old37 = noKey.length ? `${noKey.length} observation(s) carry no origin_key`
      : badUnest.length ? `origin_key "unestablished" cannot have provenance_complete: true (${badUnest.length})` : '';
    add('C37', true, noKey.length === 0 && badUnest.length === 0 && badPeriod.length === 0,
      old37 || badPeriod.length ? [old37, ...badPeriod].filter(Boolean).join('; ')
        : `all ${obs.length} observations carry an origin_key; none unestablished-and-complete` +
          (byPeriod ? `; ${byPeriod} dated by a period the person confirmed` : '') +
          (notRead.length
            ? `; ${notRead.length} complete observation(s) dated other than by a full date, and ` +
              (periodBuild ? `this run was started on build ${periodBuild}, before ${PERIOD_DATE_BUILD}, `
                           : `this run records no build, so it predates ${PERIOD_DATE_BUILD}, `) +
              'when a period began to need the person\'s confirmation, so the dates are not read'
            : ''));
  } else add('C37', false, true, 'A2b absent — intake not run');

  const PROXIMITY = ['first_hand', 'relayed', 'aggregated', 'unestablished'];
  if (A2b) {
    const obs = arr(A2b.observations);
    const bad = obs.filter(o => !o || !PROXIMITY.includes(o.proximity));
    const mismatched = obs.filter(o => o && o.origin_key === 'unestablished' && o.proximity !== 'unestablished');
    add('C39', true, bad.length === 0 && mismatched.length === 0,
      bad.length ? `${bad.length} observation(s) without a valid proximity (${PROXIMITY.join(' | ')})`
        : mismatched.length ? `origin_key "unestablished" requires proximity "unestablished" (${mismatched.length})`
        : `all ${obs.length} observations record a proximity; unestablished origins carry no claim to have witnessed anything`);
  } else add('C39', false, true, 'A2b absent — intake not run');

  if (A2b && A3) {
    const obs = arr(A2b.observations).filter(Boolean).map(o => ({
      id: o.id, ref: o.ref, origin_key: o.origin_key, proximity: o.proximity,
      provenance_complete: o.provenance_complete === true,
    }));
    const blocked = ungradable(obs);
    const hyps = arr(A3.hypotheses).filter(Boolean);
    const wrong = [];
    if (!blocked.length)
      for (const h of hyps) {
        const derived = deriveTrust(obs, arr(h.evidence));
        if (derived !== h.trust)
          wrong.push(`${h.id}: the artifact says "${h.trust}", the arithmetic derives "${derived}"`);
      }
    add('C52', true, blocked.length === 0 && wrong.length === 0,
      blocked.length ? `the tags cannot be derived, so none of them is known to be: ${blocked.join('; ')}`
        : wrong.length ? wrong.join('; ')
        : `all ${hyps.length} trust tag(s) match the arithmetic recomputed from the intake record`);
  } else add('C52', false, true, 'A2b or A3 absent — there is no tag to recompute');

  if (A3 && arr(A3.hypotheses).length) {
    const tally = { strong: 0, weak: 0 };
    for (const h of arr(A3.hypotheses)) {
      const t = String((h && h.trust) || '').toLowerCase();
      if (t in tally) tally[t]++;
    }
    const wrong = [];
    let claims = 0;
    const shares = buildAtLeast(recordedBuild(dir), TRUST_SHARE_BUILD);
    for (const a of [A3, A4]) {
      if (!a || !a.__file) continue;
      for (const r of trustRollups(bodyOf(a.__file), undefined, { shares })) {
        claims++;
        if (r.said !== tally[r.tag])
          wrong.push(`${a.__file} says "${r.claim}" and the record holds ${tally[r.tag]} ${r.tag} of ` +
            `${arr(A3.hypotheses).length} — a roll-up written once and not recomputed after the set changed`);
      }
    }
    add('C177', true, wrong.length === 0,
      wrong.length ? wrong.join('; ')
        : claims
          ? `all ${claims} trust roll-up(s) in the stage-2 documents agree with the ${arr(A3.hypotheses).length} tag(s) on the record`
          : 'the stage-2 documents total their trust tags nowhere, so there is no count of its own output for this to read');
  } else add('C177', false, true, 'A3 absent or carries no hypotheses — there is no set for a roll-up to count');

  const a2Refs = new Set(arr(A2 && A2.items).map(i => i && i.ref));
  const obsRefs = new Set(arr(A2b && A2b.observations).map(o => o && o.ref));
  const obsIdToRef = new Map();
  for (const o of arr(A2b && A2b.observations)) {
    if (!o) continue;
    const id = String(o.id || '').trim();
    if (id) obsIdToRef.set(id, o.ref);
  }
  const itemOf = e => (obsIdToRef.has(e) ? obsIdToRef.get(e) : e);
  const retiredA2 = new Map(arr(A2 && A2.items).filter(i => i && !inUse(i)).map(i => [String(i.ref), i]));
  const retiredWhy = ref => { const i = retiredA2.get(String(ref)); return !i ? null : i.replaced_by
    ? `read ${i.replaced_by}, which replaced ${ref} on ${i.superseded_at}` : i.removed_at !== undefined
    ? `${ref} was removed on ${i.removed_at}; read the material still in use` : `${ref} was retired on ${i.superseded_at}; read the material still in use`; };

  if (A3) {
    const hyps = arr(A3.hypotheses);
    const badC1 = hyps.filter(h => arr(h.evidence).length === 0 && h.trust !== 'unrated');
    add('C1', true, badC1.length === 0,
      badC1.length ? `no evidence and not unrated: ${badC1.map(h => h.id).join(', ')}`
                   : `${hyps.length} hypotheses, each evidenced or unrated`);

    const outside = [];
    const notThroughIntake = [];
    for (const h of hyps) for (const e of arr(h.evidence)) {
      if (!a2Refs.has(itemOf(e))) outside.push(`${h.id}→${e}`);
      if (!obsRefs.has(e) && !obsIdToRef.has(e)) notThroughIntake.push(`${h.id}→${e}`);
    }
    const onRetired = [];
    for (const h of hyps) for (const e of arr(h.evidence))
      if (retiredWhy(itemOf(e))) onRetired.push(`${h.id} rests on ${e}: ${retiredWhy(itemOf(e))}, and replace this evidence`);
    add('C2', true, outside.length === 0 && onRetired.length === 0,
      outside.length ? `references resolving outside A2: ${outside.join(', ')}`
        : onRetired.length ? onRetired.join('; ')
        : 'every evidence reference resolves into A2');

    const orphanObs = [...obsRefs].filter(o => !a2Refs.has(o));
    const staleObs = arr(A2b && A2b.observations).filter(o => o && retiredWhy(o.ref))
      .map(o => `${o.id || o.ref} rests on ${o.ref}: ${retiredWhy(o.ref)}, and replace this observation`);
    const unread = arr(A2 && A2.items).filter(i => i && inUse(i) && String(i.added_at || '').trim() && !obsRefs.has(i.ref))
      .map(i => `${i.ref} (${String(i.source_path || '').trim()}) was added on ${i.added_at} and not read yet: read it and add the observations it holds`);
    add('C35', true, orphanObs.length === 0 && notThroughIntake.length === 0 && staleObs.length === 0 && unread.length === 0,
      orphanObs.length ? `intake observations not resolving into A2: ${orphanObs.join(', ')}`
        : notThroughIntake.length ? `evidence not resolving through intake: ${notThroughIntake.join(', ')}`
        : staleObs.length || unread.length ? [...staleObs, ...unread].join('; ')
        : 'every observation resolves into A2, and every evidence reference resolves through one');
  } else {
    add('C1', false, true, 'A3 absent'); add('C2', false, true, 'A3 absent'); add('C35', false, true, 'A3 absent');
  }

  if (A3) {
    const FROM = '0.5';
    const st2 = arr(runState && runState.stages).find(s => Number(s.id) === 2) || {};
    const ver = arr(st2.know_how).map(String).find(e => e.startsWith('evidence-standards@'));
    const under = ver ? ver.split('@')[1] : null;
    const applies = !under || cmpVersion(under, FROM) >= 0;
    const hyps = arr(A3.hypotheses).filter(Boolean);

    const GENERIC = /^(it |this |the hypothesis )?(could|may|might) be wrong|needs? (further )?(validation|research|testing)|further research|if (users|customers|people) disagree|may not generalis|^(unclear|unknown|tbd|n\/a|-)\.?$/i;
    const bad = [];
    for (const h of hyps) {
      const id = h.id || '(unidentified)';
      const d = String(h.disconfirming || '').trim();
      if (!d) { bad.push(`${id} names nothing that would contradict it`); continue; }
      if (GENERIC.test(d) || d.length < 25)
        bad.push(`${id}'s disconfirming line is generic — "${d.slice(0, 60)}" is a caveat, not an observation somebody could go and get`);
      if (!arr(h.themes).filter(Boolean).length) bad.push(`${id} carries no themes`);
      if (!['true', 'barrier'].includes(String(h.kind || '').trim()))
        bad.push(`${id} is neither a true problem nor a barrier problem — a set where every entry reads alike hides a run promoting only barriers`);
    }
    add('C82', applies && hyps.length > 0, bad.length === 0,
      !applies
        ? `${hyps.length} hypothesis(es) authored under ${ver}; §5.2 states the rule from ${FROM}. Re-running stage 2 records the current body and it applies`
        : bad.length ? bad.join('; ')
          : `all ${hyps.length} hypothesis(es) name what would contradict them, in this run's own terms`);
  } else add('C82', false, true, 'A3 absent — stage 2 has authored nothing');

  if (A4) {
    const p = arr(A4.primary), s = arr(A4.secondary), k = arr(A4.parked);
    const okCard = p.length >= 1 && p.length <= 3 && s.length <= 5;
    const placed = [...p, ...s, ...k];
    const placedIn = A.A3b ? 'opportunity' : 'hypothesis';
    const ids = A.A3b
      ? arr(A.A3b.opportunities).map(o => o && o.id).filter(Boolean)
      : arr(A3 && A3.hypotheses).map(h => h && h.id).filter(Boolean);
    const dupes = placed.filter((x, n) => placed.indexOf(x) !== n);
    const unplaced = ids.filter(i => !placed.includes(i));
    add('C27', true, okCard && dupes.length === 0 && unplaced.length === 0,
      !okCard ? `primary=${p.length} (need 1..3), secondary=${s.length} (need 0..5)`
        : dupes.length ? `placed more than once: ${dupes.join(', ')}`
        : unplaced.length ? `${placedIn}(s) placed nowhere: ${unplaced.join(', ')}`
        : `primary ${p.length}, secondary ${s.length}, parked ${k.length} — every ${placedIn} placed exactly once`);
    const unknown = placed.filter(x => !ids.includes(x));
    const src = A.A3b ? 'A3b' : 'A3';
    add('C53', !!(A.A3b || A3), unknown.length === 0,
      !(A.A3b || A3) ? 'A3 absent — there is nothing for a placement to resolve to'
        : unknown.length ? `placed but not ${placedIn === 'opportunity' ? 'an' : 'a'} ${placedIn} of this run: ${unknown.join(', ')}`
        : `all ${placed.length} placement(s) resolve to ${placedIn === 'opportunity' ? 'an' : 'a'} ${src} ${placedIn}`);
  } else { add('C27', false, true, 'A4 absent — stage 2 not complete'); add('C53', false, true, 'A4 absent — nothing placed yet'); }

  const A5 = A.A5, A6 = A.A6, A7 = A.A7;

  const PARTICIPANT_TYPES = ['direct', 'adjacent', 'substitute'];
  const DOMAIN_KEY = /^[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+$/;
  const isIdentityKey = s => DOMAIN_KEY.test(s)
    || (s.includes(':') && PARTICIPANT_TYPES.includes(s.split(':')[0]));

  if (A7) {
    const cardKeys = new Set(arr(A6 && A6.cards).map(c => c && c.identity_key));
    const els = [...arr(A7.standards), ...arr(A7.patterns), ...arr(A7.trends)];
    const bad = [];
    let toCard = 0, toSource = 0;
    for (const e of els) {
      const traces = arr(e && e.traces_to);
      const label = String((e && e.statement) || '').slice(0, 40);
      if (traces.length === 0) { bad.push(`"${label}…": no trace`); continue; }
      for (const t of traces) {
        const s = typeof t === 'string' ? t.trim() : '';
        if (!s) { bad.push(`"${label}…": an empty or unreadable trace`); continue; }
        if (!isIdentityKey(s)) { toSource++; continue; }
        if (cardKeys.has(s)) toCard++;
        else bad.push(`"${label}…": trace "${s}" is written as an identity_key and resolves to no A6 card`);
      }
    }
    add('C3', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `all ${els.length} synthesis element(s) traced — ${toCard} trace(s) resolve to an A6 card, ${toSource} to a named source`);
  } else add('C3', false, true, 'A7 absent — stage 3 not synthesised');

  if (A5) {
    const parts = arr(A5.participants).filter(Boolean);
    const bad = [];
    const seen = new Set();
    for (const p of parts) {
      const key = String(p.identity_key || '').trim();
      if (!key) bad.push(`participant "${p.name || '(unnamed)'}" carries no identity_key — the join to the store`);
      else if (seen.has(key)) bad.push(`identity_key "${key}" appears twice; the key is what makes two entries one participant`);
      else seen.add(key);
      if (!PARTICIPANT_TYPES.includes(p.type))
        bad.push(`${key || p.name}: type "${p.type}" is outside ${PARTICIPANT_TYPES.join(' | ')}, so it has no freshness threshold`);

      if (key) {
        const fallback = key.includes(':');
        if (fallback) {
          const [kind] = key.split(':');
          if (!PARTICIPANT_TYPES.includes(kind))
            bad.push(`identity_key "${key}" is prefixed "${kind}", which is not one of ${PARTICIPANT_TYPES.join(' | ')} — §5.1 allows a domain or the participant's own type and a slug, and a classification is neither`);
          else if (kind !== p.type)
            bad.push(`identity_key "${key}" is prefixed "${kind}" and the participant is typed "${p.type}" — the fallback names the type the participant already declares`);
        } else if (!DOMAIN_KEY.test(key)) {
          bad.push(`identity_key "${key}" is neither a domain nor a "type:slug" fallback (§5.1) — a key a publisher key can never equal is a card that can never reach high confidence`);
        }
      }
    }
    for (const c of arr(A6 && A6.cards).filter(Boolean)) {
      const key = String(c.identity_key || '').trim();
      if (!key) bad.push(`a card carries no identity_key`);
      else if (!seen.has(key)) bad.push(`card "${key}" matches no participant on the map`);
    }
    add('C54', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `all ${parts.length} participant(s) typed and keyed; every card joins back to one`);
  } else add('C54', false, true, 'A5 absent — stage 3 not mapped');

  if (A.A3) {
    const bad = [];
    const hyps = arr(A.A3.hypotheses).filter(Boolean);
    const rejected = arr(A.A3.rejected).filter(Boolean);

    const reductionsOf = h => {
      const v = h.reduced_from;
      const out = { list: [], noRef: 0, blank: false };
      if (v === undefined || v === null) return out;
      if (typeof v === 'string') { if (v.trim()) out.list.push({ statement: v.trim() }); else out.blank = true; return out; }
      for (const e of (Array.isArray(v) ? v : [v])) {
        if (e === null || e === undefined) continue;
        const ref = typeof e === 'object' ? String(e.ref ?? '').trim() : String(e).trim();
        if (ref) out.list.push({ ref }); else out.noRef++;
      }
      return out;
    };
    const reduced = h => { const r = reductionsOf(h); return r.list.length + r.noRef > 0; };
    const reductionBuild = recordedBuild(dir);
    const heldToRef = buildAtLeast(reductionBuild, REDUCTION_REF_BUILD);
    const unheldRef = [];
    for (const h of hyps) {
      const r = reductionsOf(h);
      if (r.blank)
        bad.push(`${h.id || '(unnamed)'} carries an empty reduced_from — a reduction that names no original is a rewrite with no trail`);
      if (r.noRef && heldToRef)
        bad.push(`${h.id || '(unnamed)'} carries a reduced_from entry with no ref — a reduction names the observation the candidate arrived on`);
      else if (r.noRef) unheldRef.push(h.id || '(unnamed)');
    }
    for (const [i, r] of rejected.entries()) {
      const label = String(r.statement || '').trim() || `rejected[${i}]`;
      if (String(r.statement || '').trim() === '')
        bad.push(`rejected[${i}] carries no statement — the candidate as it arrived is the whole record`);
      if (String(r.reason || '').trim() === '')
        bad.push(`"${label}" is rejected with no reason — a rejection nobody can review is a deletion with extra steps`);
    }
    const hypStatements = new Set(hyps.map(h => String(h.statement || '').trim()).filter(Boolean));
    for (const r of rejected) {
      const st = String(r.statement || '').trim();
      if (st && hypStatements.has(st))
        bad.push(`"${st}" is both a hypothesis and rejected — it is one or the other`);
    }
    const refsOf = h => new Set(arr(h.evidence).filter(Boolean)
      .map(e => String(typeof e === 'object' ? (e.ref ?? '') : e).trim()).filter(Boolean));
    for (const h of hyps) {
      if (!reduced(h)) continue;
      const mine = refsOf(h);
      if (!mine.size) continue;
      const others = new Set(hyps.filter(x => x !== h).flatMap(x => [...refsOf(x)]));
      if ([...mine].every(r => others.has(r)))
        bad.push(`${h.id || '(unnamed)'} is reduced from a solution-shaped candidate and rests only on ` +
          `observations other hypotheses already carry — §5.3: where the need is already stated, the ` +
          `reduction is recorded on the hypothesis that states it rather than becoming a second one`);
    }

    add('C69', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `${hyps.length} hypothesis statement(s), ${rejected.length} recorded as not a problem` +
          (rejected.length ? ` (each with its reason)` : '') +
          `, ${hyps.filter(reduced).length} reduced from a solution-shaped candidate` +
          `, each bringing an observation the rest of the set does not already carry (§5.3)` +
          `${rejected.length === 0 && !hyps.some(reduced)
            ? '. **Both counts are zero and this arm reads only the producer\'s own bookkeeping** — a ' +
              'candidate that was never declared rejected or reduced is invisible to it, and whether a ' +
              'statement names a thing to build is the judged rule at this gate that does not run'
            : ''}` +
          (unheldRef.length
            ? `; ${unheldRef.join(', ')} ${unheldRef.length === 1 ? 'carries' : 'carry'} a reduced_from entry with no ref, and ` +
              (reductionBuild ? `this run was started on build ${reductionBuild}, before ${REDUCTION_REF_BUILD}, `
                              : `this run records no build, so it predates ${REDUCTION_REF_BUILD}, `) +
              'when an entry began to be held to the observation it names, so it is not held to it'
            : ''));
  } else add('C69', false, true, 'A3 absent — stage 2 not run');

  if (A.A3b) {
    const opps = arr(A.A3b.opportunities).filter(Boolean);

    {
      const bad = [];
      const byPerson = o => String(o.origin || '').trim().toLowerCase() === 'person';
      const agents = opps.filter(o => !byPerson(o)), persons = opps.filter(byPerson);
      const framed = agents.map(o => String(o.from || '').trim()).filter(Boolean);
      const seen = new Map();
      for (const f of framed) seen.set(f, (seen.get(f) || 0) + 1);
      for (const [f, n] of seen) if (n > 1) bad.push(`${f} is framed ${n} times — one hypothesis, one opportunity`);
      for (const o of agents) if (!String(o.from || '').trim()) bad.push(`${o.id || '(unnamed)'} names no hypothesis in \`from\` — an opportunity nobody can trace back to a problem`);
      if (A.A3) {
        const hyps = arr(A.A3.hypotheses).filter(Boolean).map(h => String(h.id || '').trim()).filter(Boolean);
        const missing = hyps.filter(h => !seen.has(h));
        const named = [...new Set(opps.map(o => String(o.from || '').trim()).filter(Boolean))];
        const invented = named.filter(f => !hyps.includes(f));
        if (missing.length) bad.push(`${missing.join(', ')} carried into stage 2.3 and came back unframed — every hypothesis is framed, including the ones that will be parked`);
        if (invented.length) bad.push(`${invented.join(', ')} is framed and A3 does not carry it — an opportunity with no hypothesis under it`);
      } else bad.push('A3 absent while A3b is present — the framing has nothing to be read against');
      const oppBuild = recordedBuild(dir);
      let idsSaid = '', headsSaid = '';
      if (buildAtLeast(oppBuild, OPPORTUNITY_ID_BUILD)) {
        const notO = opps.map(o => String(o.id || '').trim() || '(unnamed)').filter(id => !/^O\d+$/.test(id));
        const said = RULE_ONCE('An opportunity\'s id is O and a number, O1, O2 and on, which no hypothesis carries, and these are not', notO);
        if (said) bad.push(`${said}. Give each its own id, numbered on from the highest, and keep the hypothesis it frames in \`from\``);
        else idsSaid = '; each id is O and a number';
      }
      if (buildAtLeast(oppBuild, OPPORTUNITY_HEADING_BUILD)) {
        const rel = A.A3b.__file;
        const text = rel && existsSync(join(dir, rel)) ? viewRead(join(dir, rel)).replace(/^﻿/, '') : '';
        const lines = text.split(/\r?\n/);
        const fmEnd = lines[0] === '---' ? lines.indexOf('---', 1) : -1;
        const heads = lines.map((l, i) => ({ line: i + 1, text: l.replace(/^##[ \t]+/, '').trim(), h2: /^##[ \t]/.test(l) }))
          .filter(h => h.h2 && h.line > fmEnd + 1);
        const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const FROM = wordsFor(dir, 'opportunity_from').source, YOURS = wordsFor(dir, 'opportunity_yours').source;
        const unheaded = [];
        for (const o of opps) {
          const id = String(o.id || '').trim(), from = String(o.from || '').trim();
          if (!id) continue;
          const mark = byPerson(o) ? YOURS : from ? `${FROM}${esc(from)}\\)` : null;
          if (!mark) continue;
          const own = heads.filter(h => h.text.startsWith(`${id}:`));
          if (own.some(h => new RegExp(`^${esc(id)}:[ \\t]*\\S.*?[ \\t]${mark}[ \\t]*$`, 'i').test(h.text))) continue;
          unheaded.push(own.length ? `${id} (line ${own[0].line} reads "## ${own[0].text}")` : `${id} (no heading "## ${id}: …")`);
        }
        const said = RULE_ONCE(`Each opportunity in ${rel} is headed "## O1: <its name> (from H1)", naming the hypothesis in its ` +
          '`from`, or "## O1: <its name> (yours)" where a person brought it, and these are not', unheaded);
        if (said) bad.push(`${said}. Write each of these headings in that form, so a person reading the document sees what each opportunity rests on`);
        else headsSaid = '; each heading names the hypothesis it rests on, or the person who brought it';
      }
      const brought = persons.map(o => String(o.id || '(unnamed)'));
      add('C115', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `${agents.length} opportunit${agents.length === 1 ? 'y' : 'ies'}, one per A3 hypothesis, none added and none dropped` +
            (persons.length ? `; ${persons.length} more a person brought (${brought.join(', ')}), marked origin: person` : '') +
            idsSaid + headsSaid);
    }

    {
      const bad = [];
      let supplied = 0, unknown = 0;
      for (const o of opps) {
        const id = o.id || '(unnamed)';
        const rc = o.root_cause || {};
        const rcBasis = String(rc.basis || '').trim();
        if (String(rc.statement || '').trim() && !rcBasis)
          bad.push(`${id}: a root cause with no basis — a reader cannot tell an analysis from somebody's view`);
        else if (rcBasis && !['analysis', 'assumption', 'unknown'].includes(rcBasis))
          bad.push(`${id}: root_cause.basis="${rcBasis}" is none of analysis, assumption, unknown`);
        else if (rcBasis === 'unknown') unknown++;
        else if (rcBasis) supplied++;
        const im = (o.sizing || {}).impact || {};
        const imBasis = String(im.basis || '').trim();
        if (String(im.statement || '').trim() && !imBasis)
          bad.push(`${id}: a customer impact with no basis — the same claim as a root cause with none`);
        else if (imBasis && !['judgement', 'unknown'].includes(imBasis))
          bad.push(`${id}: sizing.impact.basis="${imBasis}" is neither judgement nor unknown, and no customer was asked`);
        else if (imBasis === 'unknown') unknown++;
        else if (imBasis) supplied++;
      }
      let ranking = '';
      const rankBuild = recordedBuild(dir);
      if (!buildAtLeast(rankBuild, RANKING_BUILD))
        ranking = rankBuild ? `; started on build ${rankBuild}, before ${RANKING_BUILD}, so the ranking is not read`
          : `; this run records no build, so it predates ${RANKING_BUILD} and the ranking is not read`;
      else {
        const m = opps.length;
        const placed = { customers: [], impact: [] };
        for (const o of opps) for (const f of ['customers', 'impact']) {
          const r = ((o.sizing || {})[f] || {}).rank;
          if (r === undefined || r === null || String(r).trim() === '') continue;
          const n = /^\d+$/.test(String(r).trim()) ? Number(String(r).trim()) : NaN;
          if (!(n >= 1 && n <= m)) bad.push(`${o.id || '(unnamed)'}: sizing.${f}.rank=${JSON.stringify(r)} is not a place from 1 to ${m}`);
          else placed[f].push(n);
        }
        const byReach = new Set(placed.customers).size >= 2, byHurt = new Set(placed.impact).size >= 2;
        const a4 = A.A4 && A.A4.__file ? A.A4.__file : '';
        const a4Body = a4 && existsSync(join(dir, a4))
          ? viewRead(join(dir, a4)).replace(/^﻿?---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').replace(/\s+/g, ' ') : null;
        const sentence = String(renderFixed('S2-UNRANKED', runLanguage(dir) === 'cs' ? 'cs' : 'en') || '').replace(/\s+/g, ' ').trim();
        const says = a4Body !== null && Boolean(sentence) && a4Body.includes(sentence);
        if (m < 2) ranking = `; ${m} opportunit${m === 1 ? 'y' : 'ies'}, so there is nothing to rank`;
        else if (!byReach && !byHurt) {
          if (a4Body === null) ranking = '; neither is ranked, and A4 is not written yet to say so';
          else if (!says)
            bad.push(`A4 (${a4}): no opportunity is ranked by reach or by how much it hurts, and the document does not say ` +
              `the order rests on the weight of evidence alone. The sentence is: ${sentence}`);
          else ranking = '; neither is ranked, and A4 says the order rests on the weight of evidence alone';
        } else {
          const n = byReach ? placed.customers.length : 0, k = byHurt ? placed.impact.length : 0;
          if (says)
            bad.push(`A4 (${a4}) says the order rests on the weight of evidence alone, and ${n} of ${m} opportunities are ` +
              `ranked by reach and ${k} of ${m} by how much it hurts: the sentence is for a set nobody could rank`);
          ranking = `; ranked by reach (${n} of ${m}) and by how much it hurts (${k} of ${m})`;
        }
      }
      add('C116', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `${supplied} answer(s) a person supplied carry a basis, so none inherits the opportunity's trust tag` +
            (unknown ? `; ${unknown} marked unknown, which is a gap rather than an answer` : '') + ranking);
    }

    {
      const bad = [];
      let deferred = 0;
      for (const o of opps) {
        const b = String(((o.sizing || {}).market || {}).basis || '').trim();
        if (!b) bad.push(`${o.id || '(unnamed)'}: market factors carries no basis`);
        else if (b === 'unknown') bad.push(`${o.id || '(unnamed)'}: market factors is marked unknown — stage 3 produces it and runs after G2, so the honest mark is deferred_to_stage_3`);
        else if (!['deferred_to_stage_3', 'supplied'].includes(b)) bad.push(`${o.id || '(unnamed)'}: market factors basis="${b}" is neither deferred_to_stage_3 nor supplied`);
        else if (b === 'deferred_to_stage_3') deferred++;
      }
      add('C117', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `${deferred} of ${opps.length} defer market factors to stage 3 and none calls it unknown`);
    }

    {
      const STAGE_FOUR = wordsRe('later_stage_4');
      const bad = [];
      for (const o of opps) {
        const id = o.id || '(unnamed)';
        if (o.alternatives === undefined)
          bad.push(`${id}: no alternatives field — deliberately empty and simply absent are the same to a reader and must not be to a check`);
        else if (Array.isArray(o.alternatives) ? o.alternatives.length : String(o.alternatives || '').trim() && !STAGE_FOUR.test(String(o.alternatives)))
          bad.push(`${id}: alternatives carries a solution direction — stage 4 produces these, and proposing one here pre-empts it`);
      }
      add('C118', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `all ${opps.length} carry alternatives empty with the reason, so stage 4 still has its work`);
    }
  } else {
    for (const c of ['C115', 'C116', 'C117', 'C118'])
      add(c, false, true, 'A3b absent — stage 2.3 not run');
  }

  if (A6) {
    const cards = arr(A6.cards).filter(Boolean);
    const bad = [];

    const SIX_FROM = '0.10';
    const FOUR_FROM = '0.16';
    const SUPPLIED_TWO_FROM = '0.17';
    const stage3 = arr(runState && runState.stages).find(s => Number(s.id) === 3) || {};
    const basis3 = stage3.know_how || [];
    const sVer = arr(basis3).map(String).find(e => e.startsWith('competitive-analysis-standards@'));
    const sUnder = sVer ? sVer.split('@')[1] : null;
    const suppliedFile = stage3.supplied_market ? String(stage3.supplied_market.file || '').trim() : '';
    const supplied = Boolean(suppliedFile) && Boolean(sUnder) && cmpVersion(sUnder, SUPPLIED_TWO_FROM) >= 0;
    const FLOOR = supplied ? 2
      : !sUnder || cmpVersion(sUnder, FOUR_FROM) >= 0 ? 4
      : cmpVersion(sUnder, SIX_FROM) >= 0 ? 6 : 2;
    const primaryHeld = FLOOR > 2 || supplied;
    const suppliedWhy = supplied
      ? `the floor is 2 because a person supplied this market: the run record holds ${STAGE_DIRS[2]}/${suppliedFile} ` +
        `and stage 3 recorded Standards v${sUnder}, and a supplied list is every address the stage reads`
      : '';

    for (const c of cards) {
      const srcs = arr(c.sources).filter(Boolean);
      const label = c.identity_key || c.name || '(unnamed card)';
      const keyless = srcs.filter(x => !String(x.publisher_key || '').trim());
      if (keyless.length) {
        bad.push(`${label}: ${keyless.length} source(s) carry no publisher_key, and prose cannot decide whether two sources are one party (§3.2)`);
        continue;
      }
      const parties = new Set(srcs.map(x => String(x.publisher_key).trim()));
      if (parties.size < FLOOR)
        bad.push(`${label}: ${srcs.length} source(s) resolve to ${parties.size} distinct part${parties.size === 1 ? 'y' : 'ies'} (${[...parties].join(', ')}) — the floor is ${FLOOR} independent of each other, and ${FLOOR === 2 ? 'a single party is an assertion rather than a corroboration' : 'a card below it cannot answer the standards the synthesis grades it against'}`);
      else if (primaryHeld && c.identity_key && !parties.has(String(c.identity_key).trim())
               && !String(c.identity_key).includes(':')
               && !String(c.primary_unreachable || '').trim())
        bad.push(`${label}: ${parties.size} independent part(ies) and none of them the participant itself — §3.2 puts primary material first, and a card with no primary source is that many accounts of a party nobody asked`);
    }
    const excused = cards.filter(c => c && (String(c.identity_key || '').includes(':')
      || String(c.primary_unreachable || '').trim()))
      .map(c => String(c.identity_key || '').includes(':')
        ? `${c.identity_key} is a substitute and has no publisher`
        : `${c.identity_key}: ${c.primary_unreachable}`);
    add('C60', true, bad.length === 0,
      bad.length ? bad.join('; ') + (supplied ? `; ${suppliedWhy}` : '')
        : `all ${cards.length} card(s) rest on ${FLOOR} or more distinct publisher keys` +
          (primaryHeld ? ', each including the participant\'s own material' : ' (floor 2 — stage 3 ran under Standards before v0.10)')
          + (supplied ? `; ${suppliedWhy}` : '')
          + (excused.length ? `; ${excused.length} excused from the primary clause and named rather than passed over: ${excused.join('; ')}` : ''));
  } else add('C60', false, true, 'A6 absent — no cards to weigh');

  if (A6) {
    const cards = arr(A6.cards).filter(Boolean);
    const bad = [];
    const retired = Boolean(underStandards(runState, 3, 'competitive-analysis-standards', '0.13'));
    const opts = { coreGapApplies: !retired };
    for (const c of cards) {
      const label = c.identity_key || c.name || '(unnamed card)';
      const why = ungradableConfidence(c);
      if (why.length) { bad.push(`${label}: ${why.join('; ')}`); continue; }
      const derived = deriveConfidence(c, opts);
      const written = String(c.confidence || '').trim();
      if (written === '')
        bad.push(`${label}: carries no confidence — §3.3 derives one for every card at or above the two-source floor, and an absent value is not the same as a low one`);
      else if (written !== derived)
        bad.push(`${label}: carries confidence '${written}' and the standards derive '${derived}' from its own sources and fields (§3.3)`);
    }
    add('C66', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `all ${cards.length} card(s) carry the confidence §3.3 derives from their own sources — ${cards.map(c => `${c.identity_key}:${deriveConfidence(c, opts)}`).join(', ')}`
          + (retired ? ' (Standards v0.13 or later — two inputs, the core-gap input retired with the fields it read)'
                     : ' (stage 3 ran before Standards v0.13 — three inputs, including the core gap)'));
  } else add('C66', false, true, 'A6 absent — no cards to weigh');

  if (A5) {
    const bad = [];
    for (const p of arr(A5.participants).filter(Boolean)) {
      const label = p.identity_key || p.name || '(unnamed)';
      if (p.deep_dive === undefined || p.deep_dive === null)
        bad.push(`${label}: no deep_dive decision recorded`);
      else if (!String(p.reason || '').trim())
        bad.push(`${label}: ${p.deep_dive ? 'selected' : 'not selected'} for a deep dive with no reason on the record`);
    }
    for (const r of arr(A5.reused).filter(Boolean)) {
      const label = (typeof r === 'string' ? r : r.identity_key) || '(unnamed)';
      if (typeof r === 'string' || !String(r.researched_at || '').trim())
        bad.push(`reused entry ${label} does not display researched_at — inherited research must never be silent`);
    }
    add('C55', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `every deep-dive decision carries a reason; ${arr(A5.reused).length} reused entry(s) display their research date`);
  } else add('C55', false, true, 'A5 absent — stage 3 not mapped');

  if (A5) {
    const n = arr(A5.participants).filter(Boolean).length;
    const FLOOR_FROM = '0.6';
    const PROFILE_FLOOR = 10;
    const HARD_FLOOR = 3;
    const stage3 = arr(runState && runState.stages).find(s => Number(s.id) === 3) || {};
    const basis = stage3.know_how || [];
    const ver = arr(basis).map(String).find(e => e.startsWith('competitive-analysis-standards@'));
    const under = ver ? ver.split('@')[1] : null;
    const floorApplies = !under || cmpVersion(under, FLOOR_FROM) >= 0;
    const SUPPLIED_AIM_FROM = '0.18';
    const suppliedFile = stage3.supplied_market ? String(stage3.supplied_market.file || '').trim() : '';
    const listed = stage3.supplied_market ? Number(stage3.supplied_market.competitors) || 0 : 0;
    const supplied = Boolean(suppliedFile) && Boolean(under) && cmpVersion(under, SUPPLIED_AIM_FROM) >= 0;
    const AIM = supplied ? Math.max(HARD_FLOOR, Math.min(PROFILE_FLOOR, listed)) : PROFILE_FLOOR;
    const suppliedWhy = supplied
      ? `the aim is ${AIM} because a person supplied this market: the run record holds ${STAGE_DIRS[2]}/${suppliedFile} ` +
        `naming ${listed} competitor(s) and stage 3 recorded Standards v${under}, and a supplied list is every competitor the stage profiles` +
        (listed > PROFILE_FLOOR ? `; a list longer than ${PROFILE_FLOOR} is aimed at ${PROFILE_FLOOR}, and C182 holds the number of cards plus names recorded as not profiled, each with a reason, to the number of competitors supplied` : '') +
        (listed < HARD_FLOOR ? `; a list shorter than ${HARD_FLOOR} is aimed at ${HARD_FLOOR}, the hard bottom` : '')
      : '';
    const notReached = !supplied && suppliedFile
      ? `A person supplied this market (${STAGE_DIRS[2]}/${suppliedFile}, ${listed} competitor(s)), and the list's own count ` +
        `becomes the aim only where stage 3 recorded Standards v${SUPPLIED_AIM_FROM} or later; it recorded ${under ? `v${under}` : 'no version'}`
      : '';

    const carded = new Set();
    for (const c of arr(A6 && A6.cards).filter(Boolean))
      if (String(c.identity_key || '').trim()) carded.add(String(c.identity_key).trim());
    for (const r of arr(A5.reused).filter(Boolean)) {
      const k = typeof r === 'string' ? r : r.identity_key;
      if (String(k || '').trim()) carded.add(String(k).trim());
    }
    const profiled = carded.size;
    const selected = arr(A5.participants).filter(Boolean)
      .filter(p => p && (p.deep_dive === true || String(p.deep_dive) === 'true')).length;
    const declared = arr(A6 && A6.unprofiled).filter(Boolean)
      .map(u => (typeof u === 'string' ? u : u.identity_key) || '(unnamed)');
    const deselected = arr(A5.participants).filter(Boolean)
      .filter(p => p && (p.deep_dive === false || String(p.deep_dive) === 'false'))
      .filter(p => String(p.reason || '').trim())
      .map(p => String(p.name || p.identity_key || '(unnamed)'));
    const shortfallStated = declared.length > 0 || deselected.length > 0;
    const subject = A6
      ? `A5 names ${n} participant(s), selects ${selected} for a deep dive and profiles ${profiled}`
      : `A6 is not written yet, so ${profiled} participant(s) carry a card, against ${n} named on A5 and ${selected} selected for a deep dive`;
    const problems = [];
    if (n < 1)
      problems.push('A5 carries no participants and §6.6 declares `1..n` — an empty landscape map is not a ' +
        'landscape map, and everything downstream would be reasoning about a market nobody looked at');
    else if (floorApplies && profiled < HARD_FLOOR)
      problems.push(`${subject} — ` +
        `below ${HARD_FLOOR} the emerging tier cannot fire at all, because a minority of ${profiled} is one. ` +
        'That is arithmetic and no declaration reaches it' +
        (suppliedFile && listed < HARD_FLOOR
          ? `. A person supplied ${listed} competitor(s), and a list is profiled from ${HARD_FLOOR} at the least: add ` +
            `${HARD_FLOOR - listed} to ${STAGE_DIRS[2]}/${suppliedFile} and run "SPOCK: what market material has been supplied" again`
          : ''));
    else if (floorApplies && profiled < AIM && !shortfallStated)
      problems.push(supplied
        ? `${subject}: a person supplied ` +
          `${listed} competitor(s), so Standards §2.4 aims at ${AIM} cards and not ${PROFILE_FLOOR}, and a count below it ` +
          `passes only where the shortfall is declared. A6 declares none, so the map is ${AIM - profiled} card(s) short ` +
          `of the list with nothing saying why; ${suppliedWhy}`
        : `${subject} — ` +
          `Standards §2.4 aims at ${PROFILE_FLOOR} cards and not ${PROFILE_FLOOR} selections, and a count below it ` +
          'passes only where the shortfall is declared. A6 declares none, so this reads as a market with ' +
          `${profiled} players in it rather than a market where ${profiled} were found` +
          (notReached ? `. ${notReached}` : ''));
    add('C75', true, problems.length === 0,
      problems.length ? problems.join('; ')
        : floorApplies
          ? (profiled < AIM
              ? `the landscape map carries ${n} participant(s), ${selected} selected and ${profiled} carrying a card against an aimed-for ${AIM}, `
                + `with the shortfall stated (${[...declared, ...deselected].join(', ')}). **The count is short and it is stated**, which is what §2.4 asks for `
                + 'where the market genuinely holds fewer relevant participants. Whether it genuinely does is not decided here'
                + (supplied ? `; ${suppliedWhy}` : '')
              : supplied
                ? `the landscape map carries ${n} participant(s), ${selected} selected for a deep dive and ${profiled} carrying a card against an aim of ${AIM}; ${suppliedWhy}`
                : `the landscape map carries ${n} participant(s), ${selected} selected for a deep dive and ${profiled} carrying a card against a floor of ${PROFILE_FLOOR}`)
          : `the landscape map carries ${n} participant(s), ${selected} selected and ${profiled} carrying a card. **The floor of ${PROFILE_FLOOR} does not apply**: `
            + `this stage mapped under ${ver}, and §2.4 set the floor at ${FLOOR_FROM}. Re-running stage 3 records the current body and the floor applies`);
  } else add('C75', false, true, 'A5 absent — stage 3 not mapped');

  if (A5) {
    const CLASSES = ['business', 'technology', 'regulatory'];
    const trends = arr(A5.trends).filter(Boolean);
    const bad = [];
    if (trends.length === 0) {
      const PASS_FROM = '0.6';
      const basis3 = (arr(runState && runState.stages).find(s => Number(s.id) === 3) || {}).know_how || [];
      const verT = arr(basis3).map(String).find(e => e.startsWith('competitive-analysis-standards@'));
      const passRequired = !verT
        || Boolean(underStandards(runState, 3, 'competitive-analysis-standards', PASS_FROM));
      if (passRequired)
        add('C81', true, false,
          `A5 carries no trends and §2.1 has required the trend pass since ${PASS_FROM} — a landscape map ` +
          'with no movements in it selects its participants against nothing, and the classes, the counts ' +
          'and the regulatory pair are all satisfied by an absence');
      else
        add('C81', false, true,
          `A5 carries no trends. **The trend pass does not apply**: this stage mapped under ${verT}, and ` +
          `§2.1 added the pass at ${PASS_FROM}. Re-running stage 3 records the current body and the pass is required`);
    } else {
      for (const c of CLASSES) {
        const of = trends.filter(t => String(t.class || '').trim() === c);
        if (of.length === 0) bad.push(`no ${c} trend — §2.1 asks for all three classes`);
        else if (of.length < 3 || of.length > 5) bad.push(`${of.length} ${c} trend(s) — §2.1 asks for 3 to 5`);
      }
      const unknown = trends.filter(t => !CLASSES.includes(String(t.class || '').trim()));
      if (unknown.length) bad.push(`${unknown.length} trend(s) carry a class outside ${CLASSES.join(', ')}`);
      for (const t of trends.filter(t => String(t.class || '').trim() === 'regulatory')) {
        const id = t.id || '(unidentified)';
        if (!String(t.instrument || '').trim())
          bad.push(`regulatory trend ${id} names no instrument — an unnamed regulation cannot be read or dated`);
        if (!String(t.effective || '').trim())
          bad.push(`regulatory trend ${id} carries no effective date, and does not say the date is unsettled`);
      }
      add('C81', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `${trends.length} trend(s) across all three classes, every regulatory one naming its instrument and date`);
    }
  } else add('C81', false, true, 'A5 absent — stage 3 not mapped');

  if (A6) {
    const cards = arr(A6.cards).filter(Boolean);
    const bad = [];
    const inBody = Boolean(underStandards(runState, 3, 'competitive-analysis-standards', '0.12'));

    if (inBody) {
      const heads = headingsOf(bodyOf(A6.__file));
      const lines = bodyOf(A6.__file).split('\n');
      const tops = heads.filter(h => h.level === 2);
      const LEAD = /^\*\*\S/;
      const under = (from, to) => {
        const inner = heads.filter(h => h.level > 2 && h.line > from && h.line < to);
        return (name) => {
          const i = inner.findIndex(h => fold(h.text).includes(fold(name)));
          if (i === -1) return null;
          const start = inner[i].line;
          const stop = i + 1 < inner.length ? inner[i + 1].line : to;
          let n = 0, text = '';
          for (let l = start; l < stop - 1 && l < lines.length; l++) {
            if (LEAD.test(lines[l])) n++;
            text += lines[l];
          }
          return { n, text: text.trim() };
        };
      };
      for (const c of cards) {
        const key = String(c.identity_key || '(unkeyed)');
        const label = String(c.name || c.identity_key || '').trim();
        const i = tops.findIndex(h => label && (fold(h.text).includes(fold(label)) || fold(label).includes(fold(h.text))));
        if (i === -1) { bad.push(`${key} has no section in the body — from Standards v0.12 the profile is the document, not the record (§3.1)`); continue; }
        const at = under(tops[i].line, i + 1 < tops.length ? tops[i + 1].line : lines.length + 1);
        const [OFFER, STANDS, COSTS] = sectionsIn(['What they offer', 'What stands out', 'What it costs'],
                                                  String((A.A1 && A.A1.language) || 'en').trim().toLowerCase());
        const offers = at(OFFER), stands = at(STANDS), costs = at(COSTS);
        if (!offers) bad.push(`${key} has no "${OFFER}" section`);
        else if (offers.n < 5 || offers.n > 10)
          bad.push(`${key} names ${offers.n} capabilit${offers.n === 1 ? 'y' : 'ies'} under "${OFFER}" — §3.1 asks for 5 to 10, each a bolded lead sentence, and below five the card cannot support a standards synthesis`);
        if (!stands) bad.push(`${key} has no "${STANDS}" section`);
        else if (stands.n < 3 || stands.n > 5)
          bad.push(`${key} names ${stands.n} claim(s) under "${STANDS}" — §3.1 asks for 3 to 5, each a bolded lead sentence`);
        if (!costs || !costs.text)
          bad.push(`${key} states nothing under "${COSTS}" — §3.1 requires the shape stated, and unpublished pricing is a market fact rather than a reason to omit it`);
      }
      add('C86', true, bad.length === 0, bad.length ? bad.join('; ')
        : `all ${cards.length} card(s) carry a profile in the body with 5-10 capabilities, 3-5 claims and a stated pricing shape`);
    } else {
      const deep = cards.filter(c => arr(c.features).length > 0);
      if (deep.length) {
        for (const c of cards) {
          const key = String(c.identity_key || '(unkeyed)');
          const f = arr(c.features).length, u = arr(c.usps).length;
          if (f < 5 || f > 10) bad.push(`${key} carries ${f} feature(s) — §3.1 asks for 5 to 10`);
          if (u < 3 || u > 5) bad.push(`${key} carries ${u} USP(s) — §3.1 asks for 3 to 5`);
          if (!String(c.pricing_model || '').trim())
            bad.push(`${key} states no pricing_model — §3.1 requires the shape stated, and unpublished pricing is a market fact rather than a reason to omit the field`);
        }
      }
      add('C86', deep.length > 0, bad.length === 0,
        deep.length === 0
          ? `${cards.length} card(s) carry no features — written before the §3.1 depth bar, and not held to it`
          : bad.length ? bad.join('; ')
            : `all ${cards.length} card(s) carry 5-10 features, 3-5 USPs and a stated pricing shape in the record (stage 3 ran before Standards v0.12 moved the profile into the body)`);
    }
  } else add('C86', false, true, 'A6 absent — stage 3 profiled nothing');

  if (A7) {
    const stds = arr(A7.standards).filter(Boolean);
    const tiered = stds.filter(x => String(x.tier || '').trim());
    const bad = [];
    const profiledCards = A6 ? arr(A6.cards).filter(Boolean).length : 0;

    const graded = Boolean(underStandards(runState, 3, 'competitive-analysis-standards', '0.9'));
    if (tiered.length || graded) {
      const TIERS = ['universal', 'common', 'emerging', 'rare'];
      for (const x of stds) {
        const id = x.key || x.id || (String(x.statement || '').trim()
          ? `"${String(x.statement).trim().slice(0, 60)}"` : '(unidentified)');
        const tier = String(x.tier || '').trim();
        if (!tier) { bad.push(`${id} carries no tier — a flat list of standards cannot be acted on`); continue; }
        if (!TIERS.includes(tier)) { bad.push(`${id}: tier "${tier}" is outside ${TIERS.join(' | ')}`); continue; }
        const sc = String(x.source_count || '').trim();
        const m = sc.match(/^(\d+)\s*(?:of|\/)\s*(\d+)$/);
        if (!m) { bad.push(`${id} carries tier "${tier}" and no readable source_count — the tier is counted, not judged, so "N of M" is what makes it checkable`); continue; }
        const [n, total] = [Number(m[1]), Number(m[2])];
        if (n > total) { bad.push(`${id}: source_count "${sc}" exhibits more participants than its own denominator names`); continue; }
        if (profiledCards && total !== profiledCards) {
          bad.push(`${id}: source_count "${sc}" grades out of ${total} participant(s) and A6 carries ${profiledCards} card(s) — §4.1 counts the tier out of the participants actually profiled, so a denominator the synthesis picks for itself makes the tier a judgement again`);
          continue;
        }
        const floorAtTwo = Boolean(underStandards(runState, 3, 'competitive-analysis-standards', '0.14'));
        const share = n / total;
        const minority = floorAtTwo ? (n > 2 ? 'emerging' : 'rare') : (n >= 2 ? 'emerging' : 'rare');
        const derived = share > 0.8 ? 'universal' : share > 0.5 ? 'common' : minority;
        if (derived !== tier)
          bad.push(`${id}: carries tier "${tier}" and ${sc} derives "${derived}" (§4.1) — the tier follows from the count so two runs over the same cards land on the same value`);
      }
    }
    add('C87', tiered.length > 0 || graded, bad.length === 0,
      bad.length ? bad.join('; ')
        : tiered.length
          ? `all ${stds.length} standard(s) graded, and every tier is the one its own count derives`
            + (profiledCards
              ? `, each counted out of the ${profiledCards} participant(s) A6 profiled`
              : ' — A6 carries no cards, so the denominator each standard states is joined to nothing')
          : graded
            ? 'A7 states no standards, so §4.1 has nothing to grade'
            : `${stds.length} standard(s) carry no tier — stage 3 recorded competitive-analysis-standards before v0.9, where the tier reached A7, and is not held to it`);
  } else add('C87', false, true, 'A7 absent — stage 3 synthesised nothing');

  if (A5) {
    const parts = arr(A5.participants).filter(Boolean);
    const withStanding = parts.filter(p => String(p.standing || '').trim());
    const bad = [];
    const repRule = Boolean(underStandards(runState, 3, 'competitive-analysis-standards', '0.9'));
    if (withStanding.length || repRule) {
      const STANDING = ['leader', 'innovator'];
      for (const p of parts) {
        const key = String(p.identity_key || p.name || '(unnamed)');
        const st = String(p.standing || '').trim();
        if (p.type === 'substitute') continue;
        if (!st) { bad.push(`${key} carries no standing — §2.2 asks whether it leads the trend or is ahead of it`); continue; }
        if (!STANDING.includes(st)) bad.push(`${key}: standing "${st}" is outside ${STANDING.join(' | ')}`);
      }
      const kinds = new Set(withStanding.map(p => String(p.standing).trim()));
      if (kinds.size) for (const k of STANDING)
        if (!kinds.has(k))
          bad.push(`no participant carries standing "${k}" — a map of only ${[...kinds].join(', ')}s is half a market (§2.2)`);

      const represented = new Set(parts.flatMap(p => arr(p.represents).map(String)));
      const unrepresented = arr(A5.unrepresented_trends).map(String);
      for (const t of arr(A5.trends).filter(Boolean)) {
        const id = String(t.id || '').trim();
        if (!id || represented.has(id) || unrepresented.includes(id)) continue;
        bad.push(`trend ${id} has no representative and is not recorded as unanswered — a movement nobody in scope has answered is a finding, not an omission`);
      }
    }
    add('C88', withStanding.length > 0 || repRule, bad.length === 0,
      bad.length ? bad.join('; ')
        : withStanding.length
          ? `${withStanding.length} representative(s) carry a standing, both kinds appear, and every trend is answered or recorded as unanswered`
          : repRule
            ? `${parts.length} participant(s) and no representative among them — §2.2 asks a standing of the participants a map puts forward`
            : `${parts.length} participant(s) carry no standing — stage 3 recorded competitive-analysis-standards before v0.9, where §2.2's standing reached A5, and is not held to it`);
  } else add('C88', false, true, 'A5 absent — stage 3 not mapped');

  {
    const s3 = arr(runState && runState.stages).find(x => Number(x.id) === 3);
    const sm = s3 && s3.supplied_market;
    if (!sm || !sm.file) {
      const claims = all.filter(a => a.__file && String(a.__file).startsWith(`${STAGE_DIRS[2]}/`)
        && String(a.egress_basis || '') === 'supplied');
      const dated = claims.filter(a => String(a.assembled_at || a.produced_at || '') >= SUPPLIED_CLAIM_RECORDED_FROM);
      if (dated.length)
        add('C181', true, false,
          `${dated.map(a => a.__file).join(', ')} ${dated.length === 1 ? 'records' : 'record'} egress_basis="supplied" and this run records no supplied market file — ` +
          `so no hash holds the cards to the list they claim to come from, and a change to that list would go unseen. ` +
          `If a market list was handed over, run "SPOCK: what market material has been supplied", which puts it on the record; ` +
          `if this stage searched, egress_basis says so instead`);
      else if (claims.length)
        add('C181', false, true,
          `${claims.length} stage-3 artifact(s) record egress_basis="supplied" over a record holding no supplied market file, assembled before ` +
          `${SUPPLIED_CLAIM_RECORDED_FROM}, when that claim began to need the record — read against the model they ran under`);
      else
        add('C181', false, true, 'this run records no supplied market file — it searched, or stage 3 has not run, and there is no hash here to compare');
    } else {
      const bad = [];
      const rel = `${STAGE_DIRS[2]}/${sm.file}`;
      const abs = join(dir, rel);
      const m = existsSync(abs) ? measure(abs) : null;
      if (!existsSync(abs)) bad.push(`${rel} is on the record with a hash and is not on disk — the addresses this stage worked from cannot be seen`);
      else if (!m) bad.push(`${rel} is on the record with a hash and could not be read to compare`);
      else {
        const now = m.sha256;
        if (String(sm.sha256) !== now)
          bad.push(`${rel} has changed since the run recorded it — recorded ${String(sm.sha256).slice(0, 12)}…, on disk ${now.slice(0, 12)}… — ` +
            `so the cards came from a list nobody can now read`);
        else if (Number(sm.bytes) !== m.bytes)
          bad.push(`${rel} hashes the same and its size does not match the record, which cannot both be true`);
      }
      add('C181', true, bad.length === 0,
        bad.length ? `${bad.join('; ')}. An agent cannot fix this, so do not run the check again. Tell the person what changed and ask them to run ` +
          '"SPOCK: what market material has been supplied", which asks them to confirm before it records the new version. To undo the change instead, put back the list the run recorded'
          : `${rel} is the file the run recorded, unchanged — ${sm.competitors} competitor(s) and ${sm.trends} trend(s), ${sm.bytes} bytes`);
    }
  }

  {
    const build = recordedBuild(dir);
    if (!buildAtLeast(build, RELEASE_FLOOR_BUILD))
      add('C189', false, true, (build ? `this run was started on build ${build}, before ${RELEASE_FLOOR_BUILD}, `
        : `this run records no build, so it predates ${RELEASE_FLOOR_BUILD}, `) +
        'when the gates began comparing the workflow\'s own files with the release\'s list of them — read against the model it ran under');
    else {
      const r = compareWithRelease();
      const route = inGitClone()
        ? `The workflow's own files change only by an update. The person runs "${UPDATE_TASK}" and picks the second ` +
          'choice, which keeps a copy of the changed files and puts the release\'s back.'
        : 'The workflow\'s own files change only through a release, and the update task cannot restore a copy that was not ' +
          'cloned with git. The person downloads the release again into a new folder, or asks the pilot team.';
      const held = r.absent ? listInCommit() : null;
      if (held)
        add('C189', true, false, `${RELEASE_LIST} is part of release ${held.release} and is not on disk: it is the release's list ` +
          `of the workflow's own files, so nothing here can be compared with the release without it. ${route}`);
      else if (r.absent)
        add('C189', false, true, `there is no ${RELEASE_LIST} here, so this copy was not made by a release and there is nothing ` +
          'to compare its own files against');
      else if (r.unreadable)
        add('C189', true, false, `${RELEASE_LIST} cannot be read as the release's list of its files: ${r.unreadable}. ${route}`);
      else {
        const found = differenceLines(r);
        add('C189', true, found.length === 0, found.length ? `${found.join('; ')}. ${route}`
          : `the workflow's own files match release ${r.release}: ${r.listed} files under .github/ and .vscode/, none changed, none added`);
      }
    }
  }

  {
    const build = recordedBuild(dir);
    if (!buildAtLeast(build, RELEASE_FLOOR_BUILD))
      add('C190', false, true, (build ? `this run was started on build ${build}, before ${RELEASE_FLOOR_BUILD}, `
        : `this run records no build, so it predates ${RELEASE_FLOOR_BUILD}, `) +
        'when the gates began holding every supplied file to what intake read in — read against the model it ran under');
    else {
      const bad = [], unhashed = [], folders = new Set();
      let compared = 0;
      const noHash = shown => `${shown} was recorded before intake measured files, so there is no hash to compare it with`;
      const changed = (shown, recordedBytes, now) => `${shown} changed after intake read it (recorded ` +
        `${recordedBytes === undefined || recordedBytes === null || recordedBytes === '' ? 'no' : recordedBytes} bytes, now ${now ? now.bytes : 'unreadable'})`;
      const citedBy = A2 ? citingItems(arr(A2.items)).filter(inUse) : [];
      for (const f of suppliedFiles(dir)) {
        const shown = `${STAGE_DIRS[1]}/${f.rel}`;
        const citing = citedBy.filter(i => citesSupplied(i, f));
        if (!citing.length) { bad.push(`${shown} was not read in by intake`); folders.add(2); continue; }
        const hashed = citing.filter(i => String(i.sha256 || '').trim());
        if (!hashed.length) { unhashed.push(noHash(shown)); continue; }
        compared++;
        const now = measure(f.path);
        const off = hashed.find(i => !now || String(i.sha256).trim() !== now.sha256);
        if (off) { bad.push(changed(shown, off.bytes, now)); folders.add(2); }
      }
      const s3 = arr(runState && runState.stages).find(x => Number(x.id) === 3);
      const sm = s3 && s3.supplied_market;
      for (const f of suppliedFiles(dir, STAGE_DIRS[2])) {
        const shown = `${STAGE_DIRS[2]}/${f.rel}`;
        if (!sm || !sm.file || !citesSupplied({ source_path: sm.file }, f)) { bad.push(`${shown} was not read in by intake`); folders.add(3); continue; }
        if (!String(sm.sha256 || '').trim()) { unhashed.push(noHash(shown)); continue; }
        compared++;
        const now = measure(f.path);
        if (!now || now.sha256 !== String(sm.sha256).trim()) { bad.push(changed(shown, sm.bytes, now)); folders.add(3); }
      }
      const s2Dir = `${STAGE_DIRS[1]}/${SUPPLIED_DIR}/`, s3Dir = `${STAGE_DIRS[2]}/${SUPPLIED_DIR}/`;
      const byFolder = [
        folders.has(2) ? `For ${s2Dir}, they take out a file intake did not read in and put back the one that was read in ` +
          'where it changed. Material to add, or a changed version under a new name, goes in once stage 2 is sent back with ' +
          `"${STALE_TASK.redo}", and the person then takes it in with "SPOCK: add problem material", which asks them to confirm. An agent cannot fix this, so do not run the check again.` : '',
        folders.has(3) ? (sm && sm.file
          ? `For ${s3Dir}, the folder holds only the list that was recorded, as it was recorded: they put that list back ` +
            `where it changed and take out any other file. A different list once stage 3 is accepted means sending stage 3 ` +
            `back with "${STALE_TASK.redo}".`
          : `For ${s3Dir}, no list was recorded, so the folder holds none: they take out what is there. A market list that ` +
            `arrives after stage 3 has searched means sending stage 3 back with "${STALE_TASK.redo}" before the list is added.`) : '',
      ].filter(Boolean);
      if (bad.length)
        add('C190', true, false, `${bad.join('; ')}. Only the person changes a supplied folder, so each file named here is ` +
          `theirs to take out or put back, whoever put it there. ${byFolder.join(' ')}`);
      else if (!compared)
        add('C190', false, true, 'no supplied file here carries a hash, so there is nothing intake measured to compare' +
          (unhashed.length ? `: ${unhashed.join('; ')}` : ` — neither ${s2Dir} nor ${s3Dir} holds a file`));
      else
        add('C190', true, true, `${compared} supplied file(s) came in through intake and still match what it recorded, SHA-256 and all` +
          (unhashed.length ? `; ${unhashed.join('; ')}` : ''));
    }
  }

  {
    const s3 = arr(runState && runState.stages).find(x => Number(x.id) === 3);
    const sm = s3 && s3.supplied_market;
    if (!sm || !sm.file) {
      add('C182', false, true, 'this run records no supplied market file — it searched, or stage 3 has not run, and there is nothing here it was handed');
    } else {
      const bad = [];
      const cards = arr(A6 && A6.cards).filter(Boolean);
      const supplied = Number(sm.competitors) || 0;
      const unprofiled = arr(A6 && A6.unprofiled).filter(Boolean);
      const reasoned = unprofiled.filter(u => typeof u === 'object' && String(u.reason || '').trim());
      const bare = unprofiled.filter(u => !reasoned.includes(u)).map(u => String((typeof u === 'string' ? u : u.identity_key) || '(unnamed)'));
      if (A6 && cards.length + reasoned.length < supplied)
        bad.push(`${supplied} competitor(s) were supplied and the run carries ${cards.length} card(s) and ${reasoned.length} unprofiled ` +
          `entr${reasoned.length === 1 ? 'y' : 'ies'} with a reason — the cards plus the names recorded in A6's unprofiled[] with a reason ` +
          `must add up to the number of competitors supplied, and they come to ${cards.length + reasoned.length}` +
          (bare.length ? `, because ${bare.join(', ')} ${bare.length === 1 ? 'is' : 'are'} listed there with no reason and do${bare.length === 1 ? 'es' : ''} not count` : '') +
          `. A supplied competitor with neither a card nor a reason is dropped evidence, not a narrowing`);
      const outward = all.filter(a => a.__file && String(a.__file).startsWith(`${STAGE_DIRS[2]}/`) && a.egress_basis);
      const searched = outward.filter(a => String(a.egress_basis) !== 'supplied');
      if (searched.length)
        bad.push(`${searched.map(a => a.__file).join(', ')} records egress_basis="${searched[0].egress_basis}" and this run was handed its market — ` +
          `an artifact claiming it researched through a search endpoint it never reached is the untruth a handed-over build must not carry`);
      add('C182', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `the run was handed ${supplied} competitor(s) and ${Number(sm.trends) || 0} trend(s), carries ${cards.length} card(s)` +
            (reasoned.length ? ` and ${reasoned.length} unprofiled with a reason` : '') + ', ' +
            `and ${outward.length} stage-3 artifact(s) record the regime they actually researched under`);
    }
  }

  {
    const s3 = arr(runState && runState.stages).find(x => Number(x.id) === 3);
    const sm = s3 && s3.supplied_market;
    const build = recordedBuild(dir);
    const created = String((runState && runState.created_at) || '');
    const since = created || String((sm && sm.recorded_at) || '');
    const before = created ? `before this run was created on ${since}` : `before the list was recorded on ${since}`;
    const cards = A6 ? arr(A6.cards).filter(Boolean) : [];
    const reused = cards.filter(c => since && c.researched_at && String(c.researched_at) < since);
    const read = cards.filter(c => !reused.includes(c));
    const reusedSaid = reused.length ? `; ${reused.length} card(s) researched ${before} are reused and not read here` : '';
    const pageHeld = buildAtLeast(build, CARD_PAGE_BUILD);
    const frontPage = a => {
      const s = String(a || '').trim().replace(/[.,;:]+$/, '').replace(/^[a-z][a-z0-9+.-]*:\/\//i, '').replace(/#.*$/, '');
      const q = s.indexOf('?');
      if (q !== -1 && s.slice(q + 1).trim()) return false;
      const path = q === -1 ? s : s.slice(0, q), cut = path.indexOf('/');
      return cut === -1 || /^\/*$/.test(path.slice(cut));
    };
    const DESCRIBED = 'what it is';
    const describedAs = (() => {
      const m = new Map(), p = join(dir, 'sources.md');
      if (!existsSync(p)) return m;
      const SEP = /^\s*\|\s*:?-{3,}/;
      const cells = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()
        .replace(/^`([^`]*)`$/, '$1').replace(/^\*\*(.*)\*\*$/, '$1').replace(/^\[([^\]]*)\]\([^)]*\)$/, '$1').trim());
      const lines = readFileSync(p, 'utf8').split(/\r?\n/);
      let col = -1;
      lines.forEach((l, i) => {
        if (!/^\s*\|/.test(l)) { col = -1; return; }
        if (SEP.test(l)) return;
        if (SEP.test(lines[i + 1] || '')) { col = cells(l).findIndex(c => c.toLowerCase() === DESCRIBED); return; }
        const c = cells(l);
        if (col > 0 && c[0] && c[col]) m.set(c[0], c[col]);
      });
      return m;
    })();
    const fronts = [], unaddressed = [];
    let cited = 0;
    for (const c of read) {
      const who = c.identity_key || c.name || '?';
      for (const s of arr(c.sources).filter(Boolean)) {
        cited++;
        const address = String(s.address || '').trim();
        if (!address) { if (pageHeld) unaddressed.push(`${who} ${s.ref || s.publisher_key || '?'}`); continue; }
        if (pageHeld && frontPage(address)) {
          const ref = s.ref || s.publisher_key || '?';
          const what = describedAs.get(String(s.ref || '')) || s.publisher || '';
          fronts.push(`${who} ${ref}${what ? ` (${what})` : ''} cites ${address}`);
        }
      }
    }
    const frontsSaid = fronts.length
      ? RULE_ONCE('A card source\'s address is the page that was opened and read, and these are a site\'s front page, with no path and no query', fronts) +
        '. Open the page behind each of these sources and record that page\'s address; a search result is not a source, so a source whose page was not opened comes off the card'
      : '';
    if (!sm || !sm.file) {
      if (!pageHeld)
        add('C184', false, true, 'this run records no supplied market file — it searched, or stage 3 has not run, and there is no list to hold a card to; ' +
          `a card source's address is held to a page on every run from build ${CARD_PAGE_BUILD}, and this run ` +
          (build ? `was started on build ${build}` : 'records no build'));
      else if (!A6)
        add('C184', false, true, 'A6 absent — stage 3 has profiled nothing');
      else if (!read.length)
        add('C184', false, true, `every card on A6 was researched ${before}, so all of them are reused and none was researched in this run`);
      else {
        const noneSaid = RULE_ONCE('Each source of a card this run researched records the page that was opened and read, as address, and these record none', unaddressed);
        const said = [noneSaid ? `${noneSaid}. Open the page behind each of these sources and record its address, or take the source off the card` : '', frontsSaid]
          .filter(Boolean).join('; ');
        add('C184', true, !said, said ? said + reusedSaid
          : `${read.length} card(s) this run researched cite ${cited} source(s), each with an address that is a page, none a site's front page${reusedSaid}`);
      }
    }
    else if (!A6)
      add('C184', false, true, 'A6 absent — stage 3 has profiled nothing');
    else if (!buildAtLeast(build, CARD_ADDRESS_BUILD))
      add('C184', false, true, (build ? `this run was started on build ${build}, before ${CARD_ADDRESS_BUILD}, `
        : `this run records no build, so it predates ${CARD_ADDRESS_BUILD}, `) +
        'when a card source began recording the page it read — read against the model it ran under');
    else {
      const rel = `${STAGE_DIRS[2]}/${sm.file}`;
      const abs = join(dir, rel);
      const norm = a => {
        const s = String(a || '').trim().replace(/[.,;:]+$/, '').replace(/^[a-z][a-z0-9+.-]*:\/\//i, '')
          .replace(/^www\./i, '').replace(/#.*$/, '').replace(/\/+$/, '');
        const cut = s.search(/[/?]/);
        return cut === -1 ? s.toLowerCase() : s.slice(0, cut).toLowerCase() + s.slice(cut);
      };
      if (!existsSync(abs)) {
        add('C184', true, false, `${rel} is on the record and not on disk, so no card source can be compared with the list — C181 says why`);
      } else {
        const text = readFileSync(abs, 'utf8');
        const schemed = [...text.matchAll(/\b(?:https?:\/\/|www\.)[^\s<>"'()\[\]]+/gi)].map(m => m[0]);
        const bare = text.split('\n').map(l => (l.match(/^\s*(?:[-*+]|\d+[.)])?\s*((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?:\/[^\s<>"'()\[\]]*)?)\s*$/i) || [])[1])
          .filter(Boolean);
        const listed = new Set([...schemed, ...bare].map(norm).filter(Boolean));
        const under = a => { const n = norm(a); return [...listed].some(l => n === l || n.startsWith(`${l}/`) || n.startsWith(`${l}?`)); };
        const noAddress = [], offList = [];
        let sources = 0;
        for (const c of read) {
          const who = c.identity_key || c.name || '?';
          for (const s of arr(c.sources).filter(Boolean)) {
            sources++;
            const ref = s.ref || s.publisher_key || '?';
            if (!String(s.address || '').trim()) noAddress.push(`${who} ${ref}`);
            else if (!under(s.address)) offList.push(`${who} ${ref} cites ${String(s.address).trim()}`);
          }
        }
        const bad = [
          RULE_ONCE('A card cites only pages on the supplied list or under a listed one, and these do not', offList),
          RULE_ONCE('Each source of a card this run researched carries the page it read, as address, and these carry none', noAddress),
        ].filter(Boolean);
        const listSaid = bad.length ? bad.join('; ') +
          '. Either put the address in the list and record the list again with "SPOCK: what market material has been supplied", or drop the source from the card' : '';
        if (!read.length)
          add('C184', false, true, `every card on A6 was researched ${before}, so all of them are reused and none was researched from this run's list`);
        else
          add('C184', true, bad.length === 0 && fronts.length === 0,
            bad.length || fronts.length
              ? [listSaid, frontsSaid].filter(Boolean).join('; ') + reusedSaid
              : `${read.length} card(s) this run researched cite ${sources} source(s), each a page on the list or under a listed one` +
                `${pageHeld ? ' and none a site\'s front page' : ''}${reusedSaid}`);
      }
    }
  }

  {
    const REG = join('.github', 'registry', 'egress.yaml');
    const reg = existsSync(REG) ? workflowText(REG) : '';
    const namedEndpoint = /^approved_endpoint:\s*(?!null\s*$)\S/m.test(reg);
    const REGIMES = ['approved', 'pilot-test', 'fixture', 'supplied'];
    const bad = [];
    const reached = [A5, A6, A7].filter(a => a && arr(a.external_sources).filter(Boolean).length);
    for (const a of reached) {
      const basis = a.egress_basis;
      if (!basis) bad.push(`${a.__file}: reached outward and carries no egress_basis — which regime it researched under is not recoverable afterwards`);
      else if (!REGIMES.includes(basis)) bad.push(`${a.__file}: egress_basis="${basis}" is not a registered regime`);
      else if (basis === 'approved' && !namedEndpoint)
        bad.push(`${a.__file}: claims egress_basis "approved" and ${REG} names no approved endpoint — a test run marked as an approved one is what this refuses`);
    }
    let materialNote = '';
    if (reached.length) {
      const permits = new Map();
      for (const m of reg.matchAll(/^  - id:\s*(\S+)[\s\S]*?^    permits_real_material:\s*(true|false)\s*$/gm))
        permits.set(m[1], m[2] === 'true');
      const FIX = join('.github', 'registry', 'fixtures.yaml');
      const fixText = existsSync(FIX) ? workflowText(FIX) : '';
      const declared = new Map();
      for (const m of fixText.matchAll(/^  - id:\s*(\S+)\s*\n\s*material:\s*(\S+)/gm)) declared.set(m[1], m[2]);
      const material = declared.get(runId) || null;
      if (!material) materialNote = `; what ${runId} is made of is declared nowhere, so whether its regime permits it was not decided`;
      else {
        materialNote = `; ${runId} declares material "${material}"`;
        for (const a of reached) {
          const p = permits.get(a.egress_basis);
          if (p === undefined) continue;
          if (material === 'real' && p === false)
            bad.push(`${a.__file}: researched under "${a.egress_basis}", which the registry says does not permit real material, and ${runId} declares material "real" — the regime and the run disagree about what may leave`);
        }
      }
    }

    add('C76', reached.length > 0, bad.length === 0,
      reached.length === 0 ? 'no stage-3 artifact reached outward — nothing to attribute to a regime'
        : bad.length ? bad.join('; ')
          : `${reached.length} artifact(s) that reached outward name the egress regime they researched under${materialNote}`);
  }

  if (A7 && A4) {
    const bad = [];
    const floorAtTwo = Boolean(underStandards(runState, 3, 'competitive-analysis-standards', '0.14'));
    for (const st of arr(A7.standards).filter(Boolean)) {
      const label = st.key || st.id || String(st.statement || '').slice(0, 30);
      if (!floorAtTwo) {
        const traces = arr(st.traces_to);
        if (traces.length < 2)
          bad.push(`${label}: rests on ${traces.length} participant(s) — one participant doing something is not a standard`);
        continue;
      }
      const m = String(st.source_count || '').trim().match(/^(\d+)\s*(?:of|\/)\s*(\d+)$/);
      if (!m) { bad.push(`${label}: no readable source_count, so how many participants exhibit it cannot be counted — "N of M" is what makes the floor checkable`); continue; }
      if (Number(m[1]) < 2)
        bad.push(`${label}: ${m[1]} participant(s) exhibit it — one participant doing something is that participant and not the market, and patterns[] is where it goes (§4.1, Standards v0.14)`);
    }
    const answered = new Set([...arr(A7.standards), ...arr(A7.patterns), ...arr(A7.trends)]
      .filter(Boolean).flatMap(e => arr(e.addresses)));
    const noted = arr(A7.absences).filter(Boolean)
      .map(a => (typeof a === 'string' ? a : (a && typeof a === 'object' ? a.problem : a)))
      .filter(v => v !== undefined && v !== null).map(v => String(v));
    const namesId = (text, id) =>
      new RegExp(`(?:^|[^A-Za-z0-9_])${String(id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[^A-Za-z0-9_]|$)`).test(text);
    const absenceFile = A7.__own && A7.__own.has('absences')
      ? A7.__file
      : ((FOLD_CLAIMS.get(`A7\u0000absences`) || [])[0] || A7.__file);
    for (const h of [...arr(A4.primary), ...arr(A4.secondary)])
      if (!answered.has(h) && !noted.some(t => namesId(t, h)))
        bad.push(`${h} is a promoted opportunity that no synthesis element addresses and no absence records — the silence is the finding, and it is not here. An absence is an entry in the synthesis's \`absences:\` list, read here from ${absenceFile}; it records ${h} when its \`problem\` names ${h} as a word of its own, so \`- problem: ${h}\` and \`- problem: "[${h}] why the market says nothing"\` both pass, and an id that appears only inside a longer id does not`);
    add('C56', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `every standard names 2+ participants; every promoted opportunity is either addressed or recorded in absences[]`);
  } else add('C56', false, true, 'A7 or A4 absent — there is no synthesis to weigh against the opportunities');

  if (A5 || A6) {
    const bad = [];
    for (const e of arr(A5 && A5.reused)) if (!e || !e.researched_at) bad.push(`A5 reused "${(e && e.identity_key) || '?'}" has no researched_at`);
    for (const c of arr(A6 && A6.cards)) if (!c || !c.researched_at) bad.push(`A6 card "${(c && c.identity_key) || '?'}" has no researched_at`);
    add('C8', true, bad.length === 0,
      bad.length ? bad.join('; ') : `every card carries researched_at (${arr(A5 && A5.reused).length} reused, ${arr(A6 && A6.cards).length} researched)`);
  } else add('C8', false, true, 'A5/A6 absent — stage 3 not run');

  if (A6) {
    const THRESH = { direct: 180, adjacent: 365, substitute: 365 };
    const refDate = new Date(A6.produced_at);
    const stale = [];
    for (const c of arr(A6.cards)) {
      if (!c || !c.researched_at) continue;
      const days = Math.round((refDate - new Date(c.researched_at)) / 86400000);
      const limit = THRESH[c.type] ?? 180;
      if (days > limit) stale.push(`${c.identity_key}: researched ${days}d before the run (limit ${limit}) and not re-researched`);
    }
    add('C9', true, stale.length === 0,
      stale.length ? stale.join('; ') : 'every card is within its freshness threshold (180d direct, 365d adjacent/substitute)');
  } else add('C9', false, true, 'A6 absent — stage 3 not run');

  {
    const s1writers = all.filter(a => a.store === 'S1');
    const freeRoam = s1writers.filter(a => a.workflow === 'free-roam');
    add('C24', s1writers.length > 0, freeRoam.length === 0,
      s1writers.length === 0 ? 'nothing writes to the competitor store'
        : freeRoam.length ? freeRoam.map(a => `${a.__file}: free-roam output written to S1`).join('; ')
          : `${s1writers.length} store writes, none from free roam`);
  }

  {
    const gone = [];
    for (const st of arr(runState && runState.stale)) {
      const id = typeof st === 'string' ? st : (st && st.artifact);
      if (id && !A[id]) gone.push(`${id} is marked stale but its artifact is gone`);
    }
    for (const s of arr(runState && runState.stages)) if (s.status === 'superseded')
      for (const id of arr(s.artifacts)) if (!A[id]) gone.push(`stage ${s.id} is superseded but ${id} is gone`);
    const A3 = A.A3, A4 = A.A4;
    if (A3 && A4) {
      const A3b = A.A3b;
      const from = A3b ? 'A3b' : 'A3';
      const noun = A3b ? 'opportunity' : 'hypothesis';
      const ids = new Set((A3b ? arr(A3b.opportunities).map(o => o && o.id)
                                : arr(A3.hypotheses).map(h => h && h.id)).filter(Boolean));
      for (const p of arr(A4.parked)) if (!ids.has(p)) gone.push(`parked ${noun} ${p} is not retained in ${from}`);
    }
    add('C29', !!runState, gone.length === 0,
      !runState ? 'no run state — retention cannot be checked'
        : gone.length ? gone.join('; ') : 'nothing removed — stale, superseded and parked material all retained');
  }

  {
    const staleList = arr(runState && runState.stale);
    const unaccepted = [];
    const blank = v => v == null || String(v).trim() === '';
    for (const st of staleList) {
      if (typeof st === 'string') { unaccepted.push(`${st}: stale with no acceptance record`); continue; }
      if (!st) continue;
      if (st.rebuilt === true || String(st.rebuilt) === 'true') continue;
      if (blank(st.accepted_by) || blank(st.accepted_at))
        unaccepted.push(`${st.artifact || 'a stale input'}: advanced past without a recorded human acceptance`);
    }
    add('C30', staleList.length > 0, unaccepted.length === 0,
      staleList.length === 0 ? 'no stale input to advance past'
        : unaccepted.length ? unaccepted.join('; ') : 'every stale input advanced past carries a recorded human acceptance');
  }

  {
    const stagesWithQ = arr(runState && runState.stages).filter(s => s.quality_gate);
    const overridden = [];
    for (const s of stagesWithQ) {
      const q = s.quality_gate;
      if (q.override === true || q.by_agent === true || q.overridden_by || q.by_human === true)
        overridden.push(`stage ${s.id}: quality gate ${q.id} was overridden, not run independently`);
    }
    add('C32', stagesWithQ.length > 0, overridden.length === 0,
      stagesWithQ.length === 0 ? 'no quality gate recorded yet'
        : overridden.length ? overridden.join('; ') : `${stagesWithQ.length} quality gate(s) recorded, none overridden by a human`);
  }

  const ideaLang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
  const ideaHeading = id => sectionsIn([IDEA_TEMPLATE.find(s => s.id === id).heading], ideaLang)[0];

  const A8 = A.A8, A8b = A.A8b, A9 = A.A9, A10 = A.A10, A11 = A.A11;
  const strayClause = (i, id, slug) => {
    const stray = strayRecordFiles(dir, STAGE_DIRS[i]);
    const mine = stray.filter(f => strayArtifact(f) === id);
    const said = mine.length ? mine : stray.filter(f => !strayArtifact(f));
    return said.length ? ` — ${strayRecordsLine(STAGE_DIRS[i], said, id, slug)}` : '';
  };

  {
    const problems = [];
    if (A8) {
      const made = String(A8.produced_at || A8.assembled_at || '');
      const ceiling = made && made >= BOUNDS_SPLIT ? 10 : made && made >= SECTIONS_EIGHT ? 12 : 7;
      const n = arr(A8.ideas).length;
      if (n < 3 || n > ceiling) problems.push(`A8 has ${n} solutions (need 3..${ceiling})` + strayClause(3, 'A8', 'solution-set'));
    }
    if (A10) { const n = arr(A10.options).length; if (n < 2 || n > 6) problems.push(`A10 has ${n} options (need 2..6)` + strayClause(4, 'A10', 'mvp-options')); }
    add('C4', !!(A8 || A10), problems.length === 0,
      !(A8 || A10) ? 'no solution or option set produced yet'
        : problems.length ? problems.join('; ') : 'cardinalities hold — solutions within their bound, options within theirs');
  }

  if (A8) {
    const probIds = new Set([...arr(A4 && A4.primary), ...arr(A4 && A4.secondary), ...arr(A4 && A4.parked)]);
    const synIds = new Set([...arr(A7 && A7.standards), ...arr(A7 && A7.patterns), ...arr(A7 && A7.trends)]
      .map(e => e && (e.key || e.id)).filter(Boolean));
    const bad = [];
    for (const i of arr(A8.ideas)) {
      if (arr(i.solves).length === 0) bad.push(`${i.id}: binds no problem`);
      if (arr(i.supported_by).length === 0) bad.push(`${i.id}: binds no synthesis element`);
      for (const p of arr(i.solves)) if (probIds.size && !probIds.has(p)) bad.push(`${i.id}: problem "${p}" resolves to no A4 problem`);
      for (const e of arr(i.supported_by)) if (synIds.size && !synIds.has(e)) bad.push(`${i.id}: support "${e}" resolves to no A7 element`);
    }
    const synElems = [...arr(A7 && A7.standards), ...arr(A7 && A7.patterns), ...arr(A7 && A7.trends)]
      .filter(Boolean);
    if (synElems.length && !synIds.size)
      bad.push(`A7 carries ${synElems.length} element(s) and none of them names itself — §6.8 gives an element a \`key\` ` +
        'so a solution can bind to it, and with no key on any element every support on this run resolves to nothing and is read by nothing');
    add('C5', true, bad.length === 0, bad.length ? bad.join('; ') : 'every solution binds an opportunity and a synthesis element');
  } else add('C5', false, true, 'A8 absent — stage 4 not run');

  {
    const carriers = [A8, A11, A.A12, A.A13].filter(Boolean);
    const bad = [];
    let counted = 0;
    for (const h of carriers) {
      const tps = h === A8 ? arr(h.ideas).flatMap(i => arr(i.compliance_touchpoints)) : arr(h.compliance_touchpoints);
      for (const t of tps) { counted++; if (t == null || String(t).trim() === '') bad.push(`${h.__file}: a blank compliance touchpoint`); }
    }
    add('C7', carriers.length > 0, bad.length === 0,
      carriers.length === 0 ? 'no compliance-bearing artifact yet'
        : bad.length ? bad.join('; ') : `${counted} compliance touchpoint(s) identified, none left blank`);
  }

  if (A9) {
    const problems = [];
    const ideaIds = new Set(arr(A8 && A8.ideas).map(i => i && i.id));
    const reading = chosenSolution(dir, runState, { gate: 'G4', fm: A9 });
    const g4 = reading.block ? A9.decision : null;
    const selected = reading.from === 'block' ? reading.id : undefined;
    if (A9.idea_id !== undefined)
      problems.push('A9 carries a top-level idea_id — the selection lives on the G4 decision record, and a choice recorded twice can disagree with itself');
    const stage4 = arr(runState && runState.stages).find(s => arr(s.artifacts).map(String).includes('A9'));
    const accepted = stage4 ? String(stage4.status) === 'accepted' : false;
    if (!g4 && accepted) problems.push('A9 carries no G4 decision record — nothing says a person chose this solution');
    else if (g4 && !selected) problems.push('A9\'s G4 decision selects nothing — the gate whose whole purpose is choosing one of many');
    else if (g4 && Array.isArray(selected)) problems.push(`A9's G4 decision selects ${selected.length} solutions; exactly one per run`);
    else if (g4 && ideaIds.size && !ideaIds.has(selected)) problems.push(`A9 selects "${selected}", which is no A8 solution`);
    let carried = null, notCompared = null;
    if (g4 && accepted && selected && !Array.isArray(selected)) {
      const made = String(A9.assembled_at || A9.produced_at || '');
      if (!made || made < SELECTED_WRITTEN_FROM)
        notCompared = `its reason and sections are not compared: written ${made || 'on no recorded date'}, before ${SELECTED_WRITTEN_FROM}`;
      else {
        const lang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
        const names = [...sectionsIn(DOC_SKELETONS.A9.sections, lang), ...CLOSING.map(c => inLanguage(c, lang))];
        const whyName = sectionsIn(['Why this one'], lang)[0];
        const norm = v => String(v == null ? '' : v).replace(/\s+/g, ' ').trim();
        const body = bodyOf(A9.__file);
        const open = '<!-- SELECTED -->', close = '<!-- /SELECTED -->';
        const i = body.indexOf(open), j = body.indexOf(close);
        const outside = i !== -1 && j > i ? `${body.slice(0, i)}\n${open}\n${close}\n${body.slice(j + close.length)}` : body;
        const under = new Map();
        let current = null;
        for (const line of outside.split('\n')) {
          const h = /^##\s+(.*\S)\s*$/.exec(line);
          if (h) { current = names.find(nm => fold(nm) === fold(h[1].replace(/\*\*/g, ''))) || null; if (current && !under.has(current)) under.set(current, []); else if (current) current = null; continue; }
          if (line.includes(open) || line.includes(close)) { current = null; continue; }
          if (current) under.get(current).push(line);
        }
        const textOf = nm => norm((under.get(nm) || []).join('\n').replace(/<!--[\s\S]*?-->/g, ''));
        const choice = standingChoices(runState, stage4.id).find(c => selectedId(c.selection) === selected);
        if (!choice)
          problems.push(`stage 4 is accepted selecting ${selected} and no standing choice of ${selected} is recorded, so the selected solution has no reason to carry. Record it with "SPOCK: record a decision I made", then run "SPOCK: stage 4 — assemble the solution set"`);
        else if (!textOf(whyName).includes(norm(choice.what)))
          problems.push(`the selected solution's "${whyName}" does not carry the reason ${choice.by} recorded on ${choice.at} for choosing ${selected} ("${choice.what}"); the approval copies those words and nobody edits them. Run "SPOCK: stage 4 — assemble the solution set" to write them again from the record`);
        const empty = names.filter(nm => !textOf(nm));
        if (empty.length === 1)
          problems.push(`the selected solution's "${empty[0]}" is empty; the approval writes every section of this document from the record. Run "SPOCK: stage 4 — assemble the solution set" to write it again`);
        else if (empty.length > 1)
          problems.push(`the selected solution's ${empty.slice(0, -1).map(x => `"${x}"`).join(', ')} and "${empty[empty.length - 1]}" are empty; the approval writes every section of this document from the record. Run "SPOCK: stage 4 — assemble the solution set" to write them again`);
        carried = choice;
      }
    }
    add('C11', true, problems.length === 0, problems.length ? problems.join('; ')
      : carried ? `exactly one solution selected (${selected}), carrying the reason ${carried.by} recorded, word for word, with every section written`
      : notCompared ? `exactly one solution selected (${selected}); ${notCompared}`
      : g4 ? `exactly one solution selected (${selected})`
           : 'A9 is written and stage 4 is not accepted yet — the G4 record is written by the acceptance, and its absence before that is not a fault');
  } else add('C11', false, true, 'A9 absent — no selection yet');

  const selectedIdea = A9 ? chosenSolution(dir, runState, { gate: 'G4', fm: A9 }).id : undefined;

  const A14 = A.A14;
  const traceIds = v => arr(v).flatMap(x => String(x ?? '').match(/\bA\d+\b/g) || []);
  if (A11 || A14) {
    const problems = [];
    if (A11) {
    if (!arr(A11.sources).includes('A9')) problems.push('A11 does not name A9 in sources — the selected solution it expands');
    if (!A9) problems.push('A9 absent — the selected solution the expansion must trace to is gone');
    else {
      const idea = arr(A8 && A8.ideas).find(i => i && i.id === selectedIdea);
      if (!idea) problems.push(`A9 selects "${selectedIdea}", which is no A8 solution — the chain breaks at the solution`);
      else {
        const probIds = new Set([...arr(A4 && A4.primary), ...arr(A4 && A4.secondary), ...arr(A4 && A4.parked)]);
        const solved = arr(idea.solves);
        if (solved.length === 0) problems.push(`${idea.id} binds no problem — the chain has no A4 end`);
        else if (probIds.size) {
          const orphan = solved.filter(p => !probIds.has(p));
          if (orphan.length) problems.push(`${idea.id} solves ${orphan.join(', ')}, resolving to no A4 problem`);
        }
      }
    }
    }
    if (A14) {
      const CHAIN = ['A13', 'A11', 'A9', 'A4', 'A2'];
      if (!arr(A14.sources).includes('A13')) problems.push('A14 does not name A13 in sources — the agreed PRD it is authored from');
      const declared = traceIds(A14.traces_to);
      if (declared.length === 0) problems.push('A14 declares no traces_to — the initiative states no lineage');
      else {
        const missing = CHAIN.filter(id => !declared.includes(id));
        if (missing.length) problems.push(`A14 traces_to is missing ${missing.join(', ')} — the chain A13→A11→A9→A4→A2 is broken`);
        const unresolved = declared.filter(id => !A[id]);
        if (unresolved.length) problems.push(`A14 traces to ${unresolved.join(', ')}, which this run does not contain`);
      }
    }
    const prdId = RAW.A13 ? 'A13' : RAW.A12 ? 'A12' : null;
    if (prdId) {
      const reqs = arr(RAW[prdId].requirements);
      if (reqs.length === 0) problems.push(`${prdId} carries no requirements — the chain has nothing to traverse from the PRD`);
      else {
        const untraced = reqs.filter(q => !traceIds(q && q.traces_to).includes('A11'));
        if (untraced.length)
          problems.push(`${prdId} requirement(s) ${untraced.map(q => (q && q.id) || '?').join(', ')} do not resolve to A11 — the PRD's own lineage breaks`);
      }
    }
    const arms = [A11 ? 'A11 → A9 → A4' : null, prdId && !A14 ? `${prdId} → A11` : null,
                  A14 ? 'A14 → A13 → A11 → A9 → A4 → A2' : null].filter(Boolean);
    add('C12', true, problems.length === 0,
      problems.length ? problems.join('; ') : `traceability resolves — ${arms.join(' · ')}`);
  } else add('C12', false, true, 'A11/A14 absent — stages 5 and 7 not run');

  if (A11) {
    const problems = [];
    const expanded = A11.option_id;
    if (expanded == null || expanded === '') problems.push('A11 records no option_id — nothing says which option it expands' + strayClause(4, 'A11', 'expanded-mvp'));
    else if (Array.isArray(expanded)) problems.push('A11 names more than one option_id; the expansion converges on exactly one');
    if (A10) {
      const optIds = new Set(arr(A10.options).map(o => o && o.id));
      const g5a = A10.decision && A10.decision.gate === 'G5a' ? A10.decision : null;
      const stage5choice = arr(runState && runState.decisions)
        .filter(d => d && String(d.stage) === '5' && String(d.kind) === 'choice' && !d.superseded_by)
        .slice(-1)[0];
      const fromDecision = stage5choice ? (stage5choice.selection || selectedId(stage5choice.what)) : undefined;
      const selected = g5a ? selectedId(g5a.selection) : fromDecision;
      const stage5 = arr(runState && runState.stages).find(s => arr(s.artifacts).map(String).includes('A10'));
      const accepted5 = stage5 ? String(stage5.status) === 'accepted' : false;
      if (!selected && accepted5) problems.push('stage 5 is accepted and nothing records which option was chosen — no recorded choice on the run and no G5a block on A10');
      if (stage5choice && stage5choice.at) {
        const g5b = recordedDecisions(stage5 || {}).find(d => d.id === 'G5b');
        if (g5b && g5b.decided_at && String(stage5choice.at) > String(g5b.decided_at))
          problems.push(`the option was chosen on ${stage5choice.at} and G5b accepted the expansion on ${g5b.decided_at} — the expansion cannot be accepted before the option it expands was chosen`);
      }
      else if (!selected && g5a) problems.push('A10 carries a G5a decision that selects nothing — the gate whose whole purpose is choosing one of many');
      if (expanded && !Array.isArray(expanded) && !optIds.has(expanded)) problems.push(`A11 expands "${expanded}", which is no A10 option` + strayClause(4, 'A10', 'mvp-options'));
      if (selected && expanded && !Array.isArray(expanded) && selected !== expanded) problems.push(`A11 expands "${expanded}" but the G5a decision selected "${selected}"`);
    } else problems.push('A10 absent — the option set the expansion must match is gone');
    add('C15', true, problems.length === 0,
      problems.length ? problems.join('; ') : `A11 expands exactly the option the run recorded as chosen (${expanded})`);
  } else add('C15', false, true, 'A11 absent — stage 5 not expanded');

  const PREFERENCE_FIELDS = ['preferred', 'recommended', 'rank', 'order', 'sequence', 'priority'];
  if (A10) {
    const opts = arr(A10.options).filter(Boolean);
    const bad = [];
    for (const o of opts) {
      if (!String(o.differs_by || '').trim())
        bad.push(`${o.id || '(unnamed option)'}: states no differs_by — an option that cannot say how it differs is a rephrasing of another`);
      for (const f of PREFERENCE_FIELDS)
        if (o[f] !== undefined && o[f] !== null && o[f] !== '')
          bad.push(`${o.id}: carries "${f}" — the option set is put to the person at the stage 5 choice, it does not arrive pre-chosen`);
    }
    for (const f of PREFERENCE_FIELDS)
      if (A10[f] !== undefined && A10[f] !== null && A10[f] !== '')
        bad.push(`A10 carries a top-level "${f}" — a preference on the set is the same as one on an option`);
    add('C58', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `all ${opts.length} option(s) state how they differ, and none is preferred or sequenced`);
  } else add('C58', false, true, 'A10 absent — stage 5 has produced no options');

  if (A8) {
    const ideas = arr(A8.ideas).filter(Boolean);
    const bad = [];
    for (const i of ideas)
      for (const f of [...PREFERENCE_FIELDS, 'selected'])
        if (i[f] !== undefined && i[f] !== null && i[f] !== '')
          bad.push(`${i.id}: carries "${f}" — scores are advisory and the choice is the human's at G4`);
    for (const f of [...PREFERENCE_FIELDS, 'selected', 'selection'])
      if (A8[f] !== undefined && A8[f] !== null && A8[f] !== '')
        bad.push(`A8 carries a top-level "${f}" — the selection belongs on A9 with the decision record that made it`);
    add('C59', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `${ideas.length} solution(s), none ranked, recommended or selected — G4 still has a choice to make`);
  } else add('C59', false, true, 'A8 absent — stage 4 has produced no solutions');

  {
    const A12 = A.A12, A13 = A.A13;
    if (!A12 && !A13) add('C13', false, true, 'A12/A13 absent — stage 6 not run');
    else {
      const problems = [];
      const undecidedC13 = [];
      if (A12) {
        const assembled = String(A12.assembled_at || '');
        const text = assembled ? viewRead(join(dir, A12.__file)) : '';
        for (const f of draftAgreementFindings(text, { assembled, block: A12.agreement_block }))
          problems.push(draftFindingProblem(A12.__file, f));
      }
      if (!A13) problems.push('A13 absent — the PRD has a draft but no agreed, signed version');
      else {
        const b = A13.agreement_block;
        if (!b || typeof b !== 'object' || Array.isArray(b)) problems.push('A13 carries no agreement block');
        else {
          if (!b.name || String(b.name).trim() === '') problems.push('A13 agreement block has no name');
          if (!b.date || String(b.date).trim() === '') problems.push('A13 agreement block has no date');
          const st6 = arr(runState && runState.stages).find(x => Number(x.id) === 6);
          const rec = st6 && st6.agreement;
          if (!rec || !rec.by) {
            undecidedC13.push('the run record carries no agreement for stage 6, so the mark in A13 was not corroborated (the run predates `run-state.mjs agree`)');
          } else {
            if (String(b.name || '').trim() !== String(rec.by).trim())
              problems.push(`A13 is marked agreed by "${b.name}" and the run record says "${rec.by}" — one of the two was typed by hand`);
            if (String(b.date || '').trim() !== String(rec.at || '').trim())
              problems.push(`A13's agreement is dated ${b.date} and the run record says ${rec.at}`);
          }
        }
        if (String(A13.assembled_at || '') >= AGREED_TITLE_FROM) {
          const titled = draftTitleIn(viewRead(join(dir, A13.__file)));
          if (titled)
            problems.push(`${A13.__file} line ${titled.line} titles the agreed PRD as a draft ("${titled.said}"). ` +
              'The agreed PRD is written from the draft with the draft marker taken off its title, so a reader would take ' +
              'this one for the draft. Mark the draft agreed again, which writes the agreed PRD from it afresh');
        }
      }
      add('C13', true, problems.length === 0,
        problems.length ? problems.join('; ')
          : `agreement block signed (${A13.agreement_block.name}, ${A13.agreement_block.date})` +
            (undecidedC13.length ? `; ${undecidedC13.join('; ')}` : ', and the run record corroborates it'));
    }
  }

  {
    const A14 = A.A14, A15 = A.A15;
    if (!A14) add('C16', false, true, 'A14 absent — stage 7 not run');
    else {
      const problems = [];
      const undecided = [];
      const init = A14.initiative;
      let titleSaid = '';
      const recordedKey = runState && runState.jira_key && runState.jira_key.value ? String(runState.jira_key.value).trim() : '';
      const noneYet = recordedKey.toLowerCase() === 'none yet';
      const basisNoneYet = init && typeof init === 'object' && String(init.id_basis || '') === 'none_yet';
      if (!init || typeof init !== 'object' || Array.isArray(init)) problems.push('A14 carries no initiative metadata block');
      else {
        if (!init.id || String(init.id).trim() === '' || String(init.id) === '-')
          problems.push('A14 carries no Jira identifier — it is mandatory and is asked for, never invented');
        else if (recordedKey && buildAtLeast(recordedBuild(dir), JIRA_KEY_BUILD)
          && String(init.id).trim().toLowerCase() !== recordedKey.toLowerCase())
          problems.push(`A14's id ${init.id} is not the key recorded with SPOCK: record the Jira key (${recordedKey})`);
        if (!init.jiraLink || String(init.jiraLink).trim() === '' || String(init.jiraLink) === '-')
          problems.push('A14 carries no jiraLink — it is a mandatory template key');
        else if (basisNoneYet && noneYet) {
          if (String(init.jiraLink).trim().toLowerCase() !== 'none yet')
            problems.push(`A14's id_basis is none_yet and its jiraLink reads "${init.jiraLink}" — with no key yet, the link reads none yet`);
        }
        else if (init.id && !new RegExp(`\\[${String(init.id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`).test(String(init.jiraLink)))
          problems.push(`A14's jiraLink does not link its own id "${init.id}" — the two must match exactly`);
        if (buildAtLeast(recordedBuild(dir), INITIATIVE_TITLE_BUILD)) {
          const page = existsSync(join(dir, A14.__file)) ? viewRead(join(dir, A14.__file)).replace(/^﻿/, '') : '';
          const ls = page.split(/\r?\n/);
          const fmEnd = ls[0] === '---' ? ls.indexOf('---', 1) : -1;
          const at = ls.findIndex((l, i) => i > fmEnd && /^#[ \t]+\S/.test(l));
          const title = at === -1 ? '' : ls[at].replace(/^#[ \t]+/, '').trim();
          const key = String(init.id || '').trim();
          if (noneYet || basisNoneYet || key.toLowerCase() === 'none yet') {
            if (/^\[[^\]]*\]/.test(title))
              problems.push(`${A14.__file} line ${at + 1} titles the initiative "${title}": with no Jira key yet the title is the initiative's name alone, "# <name>", with no bracketed key before it`);
            else titleSaid = '; titled with no key, there being none yet';
          } else if (key && key !== '-') {
            if (at === -1) problems.push(`${A14.__file} carries no title line: a keyed initiative is titled "# [${key}] - <name>"`);
            else if (!title.includes(`[${key}]`))
              problems.push(`${A14.__file} line ${at + 1} titles the initiative "${title}", which does not carry its key as [${key}]: a keyed initiative is titled "# [${key}] - <name>"`);
            else titleSaid = `; titled with its key, [${key}]`;
          }
        }
        const ID_BASES = ['jira', 'fixture', 'none_yet'];
        const idBasis = init.id_basis;
        if (!idBasis || String(idBasis).trim() === '' || String(idBasis) === '-')
          problems.push('A14 carries no initiative.id_basis — a reader cannot tell a Jira key from a fixture one, and both are legitimate');
        else if (!ID_BASES.includes(String(idBasis)))
          problems.push(`A14's initiative.id_basis="${idBasis}" is not one of ${ID_BASES.join(', ')}`);
        else if (String(idBasis) === 'none_yet' && !noneYet)
          problems.push(`A14's initiative.id_basis is none_yet and the run record ${recordedKey ? `reads ${recordedKey}` : 'records no Jira key'} — none_yet stands only where SPOCK: record the Jira key recorded none yet`);
        else if (String(idBasis) === 'fixture') {
          const { value: material, source } = declaredMaterial(runId, runState);
          if (material === 'real')
            problems.push(`A14 declares id_basis "fixture" and ${runId} declares material "real" (${source}) — a fabricated ticket number on a real deliverable is what this refuses`);
          else if (!material)
            undecided.push(`what ${runId} is made of is declared nowhere, so whether a fixture key is legitimate was not decided`);
        }
      }
      const TEMPLATE_SECTIONS = INITIATIVE_SECTION_IDS;
      const sections = arr(A14.sections);
      const declared = new Map(sections.filter(s => s && s.id).map(s => [s.id, s.status]));
      const missing = TEMPLATE_SECTIONS.filter(id => !declared.has(id));
      if (missing.length) problems.push(`A14 is missing template section(s): ${missing.join(', ')} — the section set is fixed`);
      const unaddressed = TEMPLATE_SECTIONS.filter(id => declared.has(id) && declared.get(id) !== 'addressed');
      if (unaddressed.length) problems.push(`A14 sections not addressed: ${unaddressed.join(', ')}`);
      const unknown = [...declared.keys()].filter(id => !TEMPLATE_SECTIONS.includes(id));
      if (unknown.length) problems.push(`A14 declares section(s) the template does not have: ${unknown.join(', ')}`);
      let headingsSaid = '';
      {
        const madeOn = String(A14.assembled_at || A14.produced_at || '');
        if (madeOn && madeOn < INITIATIVE_HEADINGS_WRITTEN_FROM)
          headingsSaid = `headings not judged: assembled ${madeOn}, before ${INITIATIVE_HEADINGS_WRITTEN_FROM}, when the envelope step began writing them`;
        else {
          const lang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
          const want = headingSet(INITIATIVE_TEMPLATE, lang);
          const langName = lang === 'cs' ? 'Czech' : 'English';
          const pages = [{ rel: A14.__file, what: 'the document', task: 'SPOCK: fill in the envelope', does: 'which writes them' }];
          const copy = join('read', A14.__file);
          if (existsSync(join(dir, copy)))
            pages.push({ rel: copy, what: 'the reading copy', task: 'SPOCK: stage 7 — the reading copy', does: 'which writes the copy again from the document' });
          const distinct = INITIATIVE_TEMPLATE.filter(r => fold(r.heading) !== fold(r.en));
          const czech = new Set(distinct.map(r => fold(r.heading)));
          const english = new Set(distinct.flatMap(r => [r.en, ...(r.was || [])]).map(fold));
          for (const p of pages) {
            const t = viewRead(join(dir, p.rel)).replace(/^\ufeff/, '');
            const end = t.startsWith('---') ? t.indexOf('\n---', 3) : -1;
            const off = end === -1 ? 0 : t.slice(0, end + 4).split('\n').length - 1;
            const body = end === -1 ? t : t.slice(end + 4);
            const got = sectionHeadings(headingsOf(body), INITIATIVE_TEMPLATE);
            if (got.length === want.length && got.every((h, i) => h.text === want[i].name && h.level === want[i].level)) continue;
            const placed = rewriteHeadings(body, INITIATIVE_TEMPLATE, lang);
            const said = placed.refused
              ? placed.refused.map(x => (x.missing ? `"${x.missing}" is missing` : `line ${x.line + off} reads "${x.text}", which ${x.why}`))
              : got.map((h, i) => (h.text === want[i].name ? null : `line ${h.line + off} reads "${h.text}" and the template's is "${want[i].name}"`)).filter(Boolean);
            const cz = got.filter(h => czech.has(fold(h.text))).length, en = got.filter(h => english.has(fold(h.text))).length;
            const mix = cz && en ? '; the page carries names from both the Czech and the English set, and a document carries one set, never a mixture'
              : (lang === 'cs' ? en : cz) ? `; the page carries the ${lang === 'cs' ? 'English' : 'Czech'} set's names` : '';
            problems.push(`${p.what} (${p.rel}) does not carry the initiative's section headings in ${langName}: ` +
              `${said.join('; ') || 'they are not the template\'s'}${mix} — run \`${p.task}\`, ${p.does}`);
          }
          headingsSaid = `headings read off the page, all ${want.length} in ${langName}, in ` +
            (pages.length > 1 ? 'the document and its reading copy' : 'the document; this run holds no reading copy, so none was read');
        }
      }
      if (arr(A14.sources).includes('A15')) problems.push('A14 sources A15 — the deliverable cannot depend on its own propagation');
      if (arr(A14.traces_to).includes('A15')) problems.push('A14 traces through A15 — the deliverable cannot depend on its own propagation');
      let copySaid;
      {
        const copyBuild = recordedBuild(dir);
        const COPY_TASK = 'SPOCK: stage 7 — the reading copy';
        if (!buildAtLeast(copyBuild, READING_COPY_BUILD))
          copySaid = `reading copy not compared: this run was started on ${copyBuild ? `build ${copyBuild}` : 'a build it does not record'}, ` +
            'before the reading copy was compared on the run itself; C96 compares it on the example runs';
        else if (!readingPresent(dir).length) copySaid = 'no reading copy yet: stage 7 writes it once the initiative is written';
        else {
          const drifted = readingDrift(dir);
          const doc = p => p.source || A14.__file;
          for (const p of drifted)
            problems.push((p.kind === 'differs'
              ? `${p.rel} does not say what ${doc(p)} says now; the first difference is at line ${p.line}`
              : p.kind === 'orphan' ? `${p.rel} copies no document this run carries, so it reads as current and is not`
              : `${p.rel} is missing`) + `; run \`${COPY_TASK}\`, which writes the copy again from the document`);
          copySaid = drifted.length ? '' : `the reading copy says what the initiative says (${readingPresent(dir).join(', ')})`;
        }
      }
      add('C16', true, problems.length === 0,
        problems.length ? problems.join('; ')
          : `A14 is complete on its own (all ${TEMPLATE_SECTIONS.length} template sections addressed, ${A14.initiative.id} from ${A14.initiative.id_basis})` +
            (A15 ? '; A15 present and not depended on' : '; A15 absent, which does not fail the run') +
            (undecided.length ? `; ${undecided.join('; ')}` : '') + `; ${headingsSaid}` + (copySaid ? `; ${copySaid}` : '') + titleSaid);
    }
  }

  {
    const SRC = join(dir, 'sources.md');
    const unmark = s => s.trim().replace(/^`([^`]*)`$/, '$1').replace(/^\*\*(.*)\*\*$/, '$1').trim();
    const refOf = r => {
      if (typeof r === 'object') return String(r.ref || '');
      const s = unmark(String(r));
      const m = s.match(/^([^\s:]+):\s/);
      return m ? unmark(m[1]) : s;
    };
    const cited = new Map();
    for (const a of Object.values(A))
      for (const r of arr(a.external_sources).filter(Boolean)) {
        const ref = refOf(r);
        if (!ref) continue;
        if (!cited.has(ref)) cited.set(ref, { files: [], written: new Set() });
        cited.get(ref).files.push(a.__file);
        if (typeof r !== 'object' && String(r).trim() !== ref) cited.get(ref).written.add(String(r).trim());
      }

    if (cited.size === 0) {
      add('C80', false, true, 'no artifact cites an external source — nothing to resolve');
    } else if (!existsSync(SRC)) {
      add('C80', true, false,
        `${cited.size} citation(s) are named and the run has no sources.md — a ref that resolves nowhere is provenance a reader cannot follow`);
    } else {
      const body = readFileSync(SRC, 'utf8');
      const rowRef = /^\|\s*(?:`([^`|]+)`|\[([^\]|]+)\]\([^)|]*\)|\*\*([^*|]+)\*\*|([^|`*\[][^|]*?))\s*\|/gm;
      const SEPARATOR = /^\|\s*:?-{3,}/;
      const nextLine = at => {
        const eol = body.indexOf('\n', at);
        if (eol < 0) return '';
        const end = body.indexOf('\n', eol + 1);
        return body.slice(eol + 1, end < 0 ? undefined : end);
      };
      const rows = [...body.matchAll(rowRef)]
        .filter(m => !SEPARATOR.test(nextLine(m.index)))
        .map(m => (m[1] || m[2] || m[3] || m[4] || '').trim())
        .filter(x => x && !/^[-:]+$/.test(x));
      const listed = new Set(rows);
      const bad = [];
      for (const [ref, { files, written }] of cited)
        if (!listed.has(ref))
          bad.push(`${ref}${written.size ? ` (written ${[...written].map(w => `"${w}"`).join(', ')})` : ''} is cited by ${[...new Set(files)].join(', ')} and no row in sources.md carries it` +
            (rows.length ? ` — the ${rows.length} row(s) read carry: ${rows.slice(0, 12).join(', ')}${rows.length > 12 ? ', …' : ''}` : ' — no rows could be read from the file at all'));
      const orphans = [...listed].filter(r => !cited.has(r));
      add('C80', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `${cited.size} citation(s) across ${listed.size} source(s) all resolve in sources.md`
            + (orphans.length ? `; ${orphans.length} listed and cited by nothing: ${orphans.join(', ')}` : ''));
    }
  }

  {
    const claimed = new Map();
    const nameTraces = (obj, file) => {
      for (const t of arr(obj.trace_id).filter(Boolean)) {
        const id = String(t);
        if (!claimed.has(id)) claimed.set(id, []);
        claimed.get(id).push(file);
      }
    };
    for (const a of Object.values(A)) nameTraces(a, a.__file);
    for (const rec of runRecordsViewed(dir)) {
      try { nameTraces(frontmatter(viewRead(rec.abs), rec.rel), rec.rel); }
      catch {  }
    }
    const held = new Set(retainedTraces(dir));

    if (claimed.size === 0) {
      add('C92', false, true,
        held.size
          ? `no artifact names a trace, and ${held.size} reduced trace(s) sit in ${TRACE_DIR}/ — reduced and never joined`
          : 'no artifact names a trace, and the run holds none — capture has never run for this run');
    } else {
      const bad = [];
      for (const [id, files] of claimed)
        if (!held.has(id))
          bad.push(`${id} is named by ${[...new Set(files)].join(', ')} and no trace record in ${TRACE_DIR}/ resolves it`);
      const unjoined = [...held].filter(id => !claimed.has(id));
      add('C92', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `${claimed.size} trace identifier(s) named by artifacts all resolve in ${TRACE_DIR}/`
            + (unjoined.length ? `; ${unjoined.length} retained and named by nothing: ${unjoined.join(', ')}` : ''));
    }
  }

  {
    const docs = [A.A12, A.A13].filter(Boolean);
    if (!docs.length) add('C31', false, true, 'A12/A13 absent — stage 6 not run');
    else {
      const bad = [];
      for (const doc of docs) {
        const av = doc.alignment_validation;
        const statement = av && typeof av === 'object' && !Array.isArray(av) ? av.statement : av;
        if (statement == null || String(statement).trim() === '')
          bad.push(`${doc.__file}: no alignment_validation statement — the second alignment pass is mandatory (§8.4)`);
      }
      add('C31', true, bad.length === 0,
        bad.length ? bad.join('; ')
          : `alignment validation statement present on ${docs.map(d => d.__file).join(', ')}`);
    }
  }

  {
    const docs = [A.A12, A.A13].filter(Boolean);
    if (!docs.length) add('C67', false, true, 'A12/A13 absent — stage 6 not run');
    else {
      const failures = [], passes = [];
      for (const doc of docs) {
        const cov = sectionCoverage(arr(doc.sections));
        const problems = [];
        if (cov.missing.length)
          problems.push(`missing template section(s): ${cov.missing.join(', ')} — the set is fixed (PRD Template §2)`);
        if (cov.unreasoned.length)
          problems.push(`section(s) declared not_applicable with no reason: ${cov.unreasoned.join(', ')} — the reason is what a person reads at G6, and without it the section looks decided rather than skipped`);
        if (cov.unknown.length)
          problems.push(`section(s) the template does not have: ${cov.unknown.join(', ')}`);
        if (cov.bad_status.length)
          problems.push(`section(s) whose status is neither present nor not_applicable: ${cov.bad_status.join(', ')}`);

        const reqIds = arr(doc.requirements).map(r => r && r.id).filter(Boolean).map(String);
        if (reqIds.length) {
          const body = bodyOf(doc.__file);
          const stated = arr(doc.requirements).filter(r => r && r.statement != null);
          if (stated.length)
            problems.push(`requirement(s) carrying a statement in the record: ${stated.map(r => r.id).join(', ')} — the statement is prose and belongs in the body once, not in both halves of one file`);
          const unwritten = reqIds.filter(id => !new RegExp(`^#{2,4}\\s+${id}\\b`, 'm').test(body));
          if (unwritten.length)
            problems.push(`requirement(s) declared and not written up: ${unwritten.join(', ')} — each needs its own section in the body`);
        }

        let headingsSaid = '';
        {
          const madeOn = String(doc.assembled_at || doc.produced_at || '');
          if (madeOn && madeOn < PRD_HEADINGS_WRITTEN_FROM)
            headingsSaid = `headings not judged: assembled ${madeOn}, before ${PRD_HEADINGS_WRITTEN_FROM}, when the envelope step began writing them`;
          else {
            const lang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
            const langName = lang === 'cs' ? 'Czech' : 'English';
            const table = withClosing(PRD_TEMPLATE);
            const want = headingSet(PRD_TEMPLATE, lang);
            const t = viewRead(join(dir, doc.__file)).replace(/^\ufeff/, '');
            const end = t.startsWith('---') ? t.indexOf('\n---', 3) : -1;
            const off = end === -1 ? 0 : t.slice(0, end + 4).split('\n').length - 1;
            const body = end === -1 ? t : t.slice(end + 4);
            const got = sectionHeadings(headingsOf(body), table).filter(h => h.row);
            const sections = got.filter(h => !h.row.optional), closing = got.filter(h => h.row.optional);
            const right = sections.length === want.length
              && sections.every((h, i) => h.text === want[i].name && h.level === want[i].level)
              && closing.every(h => h.text === sectionName(h.row, lang));
            if (right)
              headingsSaid = `headings read off the page: the ${want.length} sections` +
                (closing.length ? ` and ${closing.length} closing heading${closing.length === 1 ? '' : 's'}` : '') + `, in ${langName}`;
            else {
              const placed = rewriteHeadings(body, table, lang, { unlisted: 'kept' });
              const said = placed.refused
                ? placed.refused.map(x => (x.missing ? `"${x.missing}" is missing` : `line ${x.line + off} reads "${x.text}", which ${x.why}`))
                : got.map(h => (h.text === sectionName(h.row, lang) ? null
                    : `line ${h.line + off} reads "${h.text}" and the template's is "${sectionName(h.row, lang)}"`)).filter(Boolean);
              const distinct = table.filter(r => fold(r.heading) !== fold(r.cs));
              const czech = new Set(distinct.map(r => fold(r.cs))), english = new Set(distinct.map(r => fold(r.heading)));
              const cz = got.filter(h => czech.has(fold(h.text))).length, en = got.filter(h => english.has(fold(h.text))).length;
              const mix = cz && en ? '; the page carries names from both the Czech and the English set, and a document carries one set, never a mixture'
                : (lang === 'cs' ? en : cz) ? `; the page carries the ${lang === 'cs' ? 'English' : 'Czech'} set's names` : '';
              problems.push(`section headings not the template's in ${langName}: ${said.join('; ') || 'they are not the template\'s'}${mix}. ` +
                'Run `SPOCK: fill in the envelope`, which writes them');
            }
          }
        }

        if (coversTemplate(cov) && problems.length === 0)
          passes.push(`${doc.__file}: all ${PRD_SECTIONS.length} PRD Template sections addressed, ${reqIds.length} requirement(s) written up once in the body, ${headingsSaid}`);
        else
          failures.push(`${doc.__file}: ${problems.length ? problems.join('; ') : 'the PRD Template section set is not addressed in full'}`);
      }

      add('C67', true, failures.length === 0,
        failures.length ? failures.join(' | ') : passes.join('; '));
    }
  }

  if (A8) {
    const SCORING_FIELDS = ['potential', 'difficulty', 'unscored', 'score', 'scores', 'total', 'weighted'];
    const bad = [];
    for (const i of arr(A8.ideas).filter(Boolean))
      for (const f of SCORING_FIELDS)
        if (i[f] !== undefined && i[f] !== null && i[f] !== '')
          bad.push(`${i.id || '(unnamed solution)'}: carries "${f}" — generation produces solutions and scoring produces scores, and they are different artifacts since T9`);
    for (const f of ['scores', 'scores_basis'])
      if (A8[f] !== undefined && A8[f] !== null && A8[f] !== '')
        bad.push(`A8 carries a top-level "${f}" — it belongs on A8b with the scoring that produced it`);
    add('C70', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `${arr(A8.ideas).length} solution(s) as generated, none carrying a score`);
  }

  if (A8) {
    const ideas = arr(A8.ideas).filter(Boolean);
    const body = bodyOf(A8.__file);
    const SECTION_SET_FROM = '2026-08-14';
    const madeOn = String(A8.produced_at || A8.assembled_at || '');
    const inForce = IDEA_TEMPLATE.filter(x => (!x.since || (madeOn && madeOn >= x.since))
                                           && (!x.until || !madeOn || madeOn < x.until));
    const headed = inForce.some(x =>
      new RegExp(`^#{2,4}\\s+${ideaHeading(x.id)}(?!\\w)`, 'mi').test(body));
    const templated = headed || String(A8.produced_at || '') >= SECTION_SET_FROM;
    const bad = [];
    if (templated) {
      const at = new Map();
      for (const idea of ideas) {
        const id = String(idea.id || '').trim();
        if (!id) continue;
        const i = body.search(new RegExp(`^#{1,3}\\s+[^\\n]*\\b${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'm'));
        if (i !== -1) at.set(id, i);
      }
      const starts = [...at.values()].sort((a, b) => a - b);
      const closeAt83 = CLOSING.map(c => body.search(new RegExp(`^#{1,4}\\s+${sectionsIn([c.heading], ideaLang)[0]}(?!\\w)`, 'mi')))
        .filter(i => i >= 0).sort((a, b) => a - b)[0];
      const endOf83 = closeAt83 === undefined ? body.length : closeAt83;
      for (const idea of ideas) {
        const id = String(idea.id || '').trim() || '(unidentified)';
        if (!at.has(id)) { bad.push(`${id} is declared and has no section in the body`); continue; }
        const from = at.get(id);
        const next = starts.find(p => p > from);
        const block = body.slice(from, Math.min(next === undefined ? body.length : next, endOf83 > from ? endOf83 : body.length));
        const missing = inForce.filter(s => !new RegExp(`^#{2,4}\\s+${ideaHeading(s.id)}(?!\\w)`, 'mi').test(block));
        if (missing.length) bad.push(`${id} is missing ${missing.map(s => `### ${ideaHeading(s.id)}`).join(', ')}`);
      }
    }
    add('C83', templated && ideas.length > 0, bad.length === 0,
      !templated
        ? `${ideas.length} solution(s) authored before the five-section set existed — the sections are not required of them`
        : bad.length ? bad.join('; ')
          : `all ${ideas.length} solution(s) carry the ${inForce.length} section(s) in force when they were written, so G4 compares like with like`);
  } else add('C83', false, true, 'A8 absent — stage 4 has generated nothing');

  {
    const A8x = A.A8, A7x = A.A7;
    const madeOn = String((A8x && (A8x.assembled_at || A8x.produced_at)) || '');
    if (!A8x) add('C164', false, true, 'A8 absent — stage 4 has generated nothing');
    else if (!madeOn || madeOn < INSPIRED_BY_SINCE)
      add('C164', false, true, `the solution set was produced on ${madeOn || 'an unrecorded date'}, before the section naming what the market read contributed landed on ${INSPIRED_BY_SINCE} — it is read against the section set it was written under`);
    else {
      const body = bodyOf(A8x.__file);
      const synIds = new Set([...arr(A7x && A7x.standards), ...arr(A7x && A7x.patterns), ...arr(A7x && A7x.trends)]
        .map(e => e && (e.key || e.id)).filter(Boolean));
      const lang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
      const inForce164 = IDEA_TEMPLATE.filter(x => (!x.since || (madeOn && madeOn >= x.since))
                                                && (!x.until || !madeOn || madeOn < x.until));
      const marketSection = (inForce164.find(x => x.id === 'against_the_market')
                          || inForce164.find(x => x.id === 'inspired_by') || { heading: 'Inspired by' }).heading;
      const heading = sectionsIn([marketSection], lang)[0];
      const ideas = arr(A8x.ideas);
      const at = new Map();
      for (const idea of ideas) {
        const id = String(idea.id || '').trim();
        if (!id) continue;
        const i = body.search(new RegExp(`^#{1,3}\\s+[^\\n]*\\b${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'm'));
        if (i !== -1) at.set(id, i);
      }
      const starts = [...at.values()].sort((a, b) => a - b);
      const closeAt = CLOSING.map(c => body.search(new RegExp(`^#{1,4}\\s+${sectionsIn([c.heading], lang)[0]}(?!\\w)`, 'mi')))
        .filter(i => i >= 0).sort((a, b) => a - b)[0];
      const endOfSolutions = closeAt === undefined ? body.length : closeAt;
      const problems = [];
      let compared = 0;
      for (const idea of ideas) {
        const id = String(idea.id || '').trim() || '(unidentified)';
        if (!at.has(id)) continue;
        const from = at.get(id);
        const next = starts.find(x => x > from);
        const hardEnd = endOfSolutions > from ? endOfSolutions : body.length;
        const block = body.slice(from, Math.min(next === undefined ? body.length : next, hardEnd));
        const m = new RegExp(`^#{2,4}\\s+${heading}(?!\\w)([\\s\\S]*?)(?=^#{1,4}\\s|$(?![\\s\\S]))`, 'mi').exec(block);
        if (!m) continue;
        compared++;
        const text = m[1];
        for (const e of arr(idea.supported_by)) {
          const key = String(e).trim();
          if (!key) continue;
          if (!new RegExp(`(^|[^A-Za-z0-9_-])${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z0-9_-]|$)`).test(text))
            problems.push(`${id}: the record rests this solution on ${key} and the section a person reads does not name it`);
        }
        if (synIds.size)
          for (const x of text.matchAll(/(?:^|[^A-Za-z0-9_-])((?:ST|TR|P|S|T)-?\d+[a-z]?)(?![A-Za-z0-9_-])/g))
            if (!synIds.has(x[1]) && !arr(idea.supported_by).map(String).includes(x[1]))
              problems.push(`${id}: the section names ${x[1]}, which resolves to no element of the synthesis`);
      }
      if (!compared) add('C164', false, true, 'no solution carries the section naming what the market read contributed — C83 reports a missing section');
      else add('C164', true, problems.length === 0, problems.length ? [...new Set(problems)].join('; ')
        : `${compared} solution(s) name what the market read contributed, every element the record rests on is in the section a person reads, and every id there resolves to the synthesis`);
    }
  }

  {
    const A8c = A.A8;
    const madeOn = String((A8c && (A8c.assembled_at || A8c.produced_at)) || '');
    if (!A8c) add('C166', false, true, 'A8 absent — stage 4 has generated nothing');
    else if (madeOn >= SECTIONS_EIGHT)
      add('C166', false, true, 'the summary is the first paragraph of a section a script derives, and C125 compares that section against its generator word for word — a second check over the same comparison could only fail when the first one does');
    else if (!madeOn || madeOn < COMPLIANCE_SUMMARY_SINCE)
      add('C166', false, true, `the solution set was produced on ${madeOn || 'an unrecorded date'}, before the compliance section gained a summary on ${COMPLIANCE_SUMMARY_SINCE} — it is read against the section it was written under`);
    else {
      const problems = [];
      let read = 0;
      for (const idea of arr(A8c.ideas)) {
        const id = String(idea && idea.id || '?').trim();
        const sec = idea && idea.compliance;
        if (!sec || typeof sec !== 'object') continue;
        read++;
        const sum = sec.summary;
        const inPlay = arr(sec.areas).filter(a => arr(a && a.sub_domains).some(x => String(x && x.state).trim() === 'in_play'))
          .map(a => String(a.area || '').trim()).filter(Boolean);
        const unresolved = arr(sec.areas).flatMap(a => arr(a && a.sub_domains)
          .filter(x => String(x && x.state).trim() === 'cannot_determine')
          .map(x => ({ area: String(a.area || '').trim(), sub: String(x.sub_domain || '').trim(), input: String(x.missing_input || '').trim() })));
        const escalates = !!(sec.escalation && (sec.escalation.flag === true || String(sec.escalation.flag) === 'true'));
        if (!sum || typeof sum !== 'object') {
          problems.push(`A8/${id}: the compliance section carries no summary — a person choosing between solutions is handed ${arr(sec.areas).reduce((n, a) => n + arr(a.sub_domains).length, 0)} sub-domain entries and nothing that says what to do with them`);
          continue;
        }
        const said = arr(sum.in_play).map(x => String(x).trim()).filter(Boolean);
        const missed = inPlay.filter(a => !said.some(x => x.toLowerCase().includes(a.toLowerCase())));
        const extra = said.filter(x => !inPlay.some(a => x.toLowerCase().includes(a.toLowerCase())));
        if (missed.length) problems.push(`A8/${id}: the screen puts ${missed.join(', ')} in play and the summary does not say so`);
        if (extra.length) problems.push(`A8/${id}: the summary names ${extra.join(', ')} as in play and no sub-domain there is`);
        const escText = String(sum.escalation || '').trim();
        if (!escText) problems.push(`A8/${id}: the summary says nothing about escalation, and whether anything escalates is the one thing that can stop a solution`);
        else if (!escalates && !wordsRe('nothing_escalates').test(escText))
          problems.push(`A8/${id}: no escalation trigger fired and the summary does not say so plainly`);
        const open = arr(sum.open).map(x => String((x && x.what) || x).trim()).filter(Boolean);
        if (open.length !== unresolved.length)
          problems.push(`A8/${id}: ${unresolved.length} sub-domain(s) could not be determined and the summary lists ${open.length} open question(s) — every unresolved entry is something somebody has to go and get`);
        for (const u of unresolved)
          if (u.input && !open.some(o => o.includes(u.input)))
            problems.push(`A8/${id}: ${u.sub} could not be determined without ${u.input}, and the summary does not name it`);
      }
      if (!read) add('C166', false, true, 'no solution carries a compliance section a summary could be read against — C125 reports that');
      else add('C166', true, problems.length === 0, problems.length ? [...new Set(problems)].join('; ')
        : `${read} compliance section(s) say what is in play, whether anything escalates and what nobody could settle, and all three agree with the structure behind them. **The structure is unchanged and is still what makes the screen honest**`);
    }
  }

  if (A8) {
    const ideas = arr(A8.ideas).filter(Boolean);
    const body = bodyOf(A8.__file);
    const bad = [];
    let named = 0;
    for (const idea of ideas) {
      const id = String(idea.id || '').trim();
      if (!id) continue;
      const heading = headingForId(body, id);
      if (!heading) continue;
      if (bareOfId(heading, id)) named++;
      else bad.push(`${id}'s heading is "${heading}" — its bare id. The name its author gave it is nowhere in the run, because no field on the record carries one`);
    }
    add('C106', ideas.length > 0, bad.length === 0,
      bad.length ? bad.join('; ')
        : `all ${named} solution heading(s) carry a name beside the id, so what an author called the solution survives into the artifact`);
  } else add('C106', false, true, 'A8 absent — stage 4 has generated nothing');

  if (A7) {
    const body = bodyOf(A7.__file);
    const vlang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
    const vheads = new Map(VERDICT_TEMPLATE.map(s => [s, sectionsIn([s.heading], vlang)[0]]));
    const present = VERDICT_TEMPLATE.filter(s => new RegExp(`^#{2,4}\\s+${vheads.get(s)}(?!\\w)`, 'mi').test(body));
    const verdictNames = [...new Set(['en', 'cs'].map(l => sectionsIn(['Verdict'], l)[0]))].map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const hasVerdictSection = new RegExp(`^#{1,4}\\s+.*\\b(${verdictNames.join('|')})\\b`, 'mi').test(body);
    const templated = present.length > 0 || hasVerdictSection;
    const missing = VERDICT_TEMPLATE.filter(s => !present.includes(s));
    add('C84', templated, missing.length === 0,
      !templated
        ? 'the synthesis was authored before the verdict existed — its four parts are not required of it'
        : missing.length
          ? `the verdict is missing ${missing.map(s => `### ${vheads.get(s)}`).join(', ')} — a synthesis that stops at findings leaves stage 4 re-deriving what the market means`
          : `the synthesis carries all four parts of its verdict`);
  } else add('C84', false, true, 'A7 absent — stage 3 has synthesised nothing');

  if (A8) {
  } else add('C70', false, true, 'A8 absent — stage 4 has produced no solutions');

  if (A8 && A4) {
    const covered = new Set(arr(A8.ideas).flatMap(i => arr(i.solves)));
    const primaries = arr(A4.primary);
    const uncovered = primaries.filter(p => !covered.has(p));
    const made26 = String(A8.produced_at || A8.assembled_at || '');
    if (made26 && made26 >= SECTIONS_EIGHT) {
      const hit = primaries.filter(p => covered.has(p));
      const need = Math.min(2, primaries.length);
      add('C26', true, hit.length >= need,
        hit.length >= need
          ? `${hit.length} of ${primaries.length} top-priority opportunit${primaries.length === 1 ? 'y is' : 'ies are'} addressed, and the floor is ${need} — an even spread is deliberately not required`
          : `the set addresses ${hit.length} of ${primaries.length} top-priority opportunities and the floor is ${need} — a set where every solution names the same opportunity is one bet, not a comparison`);
    } else
    add('C26', true, uncovered.length === 0,
      uncovered.length ? `primary opportunit${uncovered.length === 1 ? 'y' : 'ies'} no solution addresses: ${uncovered.join(', ')}` : 'every primary opportunity is addressed by a solution');
  } else add('C26', false, true, 'A8 or A4 absent — stage 4 not run');

  if (!runState) {
    add('C62', true, false, 'no RUN-STATE.md — nothing records which know-how any stage read');
  } else {
    const byName = new Map(KNOW_HOW.map(b => [b.name.replace(/\.md$/, ''), b]));
    const bad = [];
    let compared = 0, declared = 0;

    for (const s of arr(runState.stages)) {
      if (s.status === 'pending' || s.status === 'superseded') continue;
      if (!knowHowHeld(s)) continue;
      const recorded = new Map();
      for (const entry of arr(s.know_how)) {
        const [name, version] = String(entry).split('@');
        if (recorded.has(name))
          bad.push(`stage ${s.id} records ${name} at two versions (${recorded.get(name) || 'unversioned'} and ${version || 'unversioned'}) — a stage read one version of a body`);
        recorded.set(name, version || null);
      }

      for (const [name, version] of recorded) {
        const body = byName.get(name);
        if (!body || !body.present) { bad.push(`stage ${s.id} records ${name}, which is not a body on disk`); continue; }
        if (version && body.version && cmpVersion(version, body.version) > 0)
          bad.push(`stage ${s.id} records ${name}@${version}, ahead of the body's own ${body.version}`);
        compared++;
      }

      const waived = new Map(), notRequired = new Map();
      const readHere = new Set(recorded.keys());
      for (const w of arr(runState.know_how_not_read).filter(w => w && Number(w.stage) === Number(s.id))) {
        const gap = knowHowGap(w, { stageIds: arr(runState.stages).map(x => x.id), readAt: () => readHere, bodies: KNOW_HOW });
        const name = String(w.body || '').replace(/\.md$/, '').split('@')[0];
        if (gap.key === 'not-required') { if (!notRequired.has(name)) notRequired.set(name, gap.words); continue; }
        if (!gap.valid) { bad.push(gap.words); continue; }
        waived.set(name, String(w.reason));
      }

      const ranAt = stageRanAt(s, runState, id => A[id] && A[id].produced_at);
      for (const o of knowHowOwed(s.id, { recorded, ranAt, bodies: KNOW_HOW })) {
        if (o.state === 'excused') continue;
        if (waived.has(o.body)) { declared++; continue; }
        bad.push(`stage ${s.id} records no know-how for ${o.body}, which is on disk and declared by its own skills`);
      }

      for (const words of notRequired.values()) bad.push(words);
    }

    for (const w of arr(runState.know_how_not_read)) {
      if (!w) continue;
      const gap = knowHowGap(w, { stageIds: arr(runState.stages).map(s => s.id), held: () => false });
      if (gap.key === 'no-stage') bad.push(gap.words);
    }

    add('C62', true, bad.length === 0,
      bad.length ? bad.join('; ')
        : `every stage's recorded know-how exists, is declared by its own skills and is not ahead of the body — ${compared} entr${compared === 1 ? 'y' : 'ies'} compared`
          + (declared ? `; ${declared} present body/bodies declared not read, with a reason` : ''));
  }

  {
    const parts = runParts(dir);
    if (!parts.length) {
      add('C104', false, true, 'no stage holds a parts/ directory — nothing here was assembled from instance files, and where the contract composes a stage as a fan-out, C160 is the check that carries this');
    } else {
      const flat = t => String(t).replace(/\s+/g, ' ').trim();
      const bad = [];
      let compared = 0;
      const recordHeads = new Map();
      const namedRecords = (artifactId, itemId) => {
        if (!recordHeads.has(artifactId))
          recordHeads.set(artifactId, runRecordsViewed(dir).filter(r => r.id === artifactId)
            .map(r => ({ rel: r.rel, head: viewRead(r.abs).slice(0, 4096) })));
        const all = recordHeads.get(artifactId);
        const lit = String(itemId).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const named = all.filter(r => new RegExp(`^item_id:\\s*["']?${lit}["']?\\s*$`, 'm').test(r.head));
        return (named.length ? named : all).map(r => r.rel);
      };
      for (const p of parts) {
        const text = viewRead(p.abs);
        let fm;
        try { fm = frontmatter(text, p.rel); }
        catch (e) {
          bad.push(`${p.rel} cannot be parsed and was not compared: ${e.message} — a part whose front matter the reader refuses carries values no check can see, and a half-read part looks complete`);
          continue;
        }
        const stranded = strandedPart(p, fm, id => Boolean(A[id]));
        if (stranded) { bad.push(stranded); continue; }
        const target = String(fm.part_of).trim();
        const item = fm && fm.item_id ? String(fm.item_id).trim() : '';
        if (!item) { bad.push(`${p.rel} names no item_id — the id is what a reader of a mismatch needs`); continue; }
        const a = A[target];
        const body = flat(bodyOf(p.rel));
        if (!body) { bad.push(`${p.rel} carries no body to transfer`); continue; }
        compared++;
        if (!flat(bodyOf(a.__file)).includes(body))
          bad.push(`${item}: what ${p.rel} wrote is not in ${a.__file} word for word — the join may add the envelope, reconcile ids and record a failed instance, and may not summarise, normalise or re-title what an invocation produced (R3.6-2)`);

        const head = (bodyOf(p.rel).match(/^##[^#\n].*$/m) || [''])[0].trim();
        if (head) {
          const lit = head.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const times = (bodyOf(a.__file).match(new RegExp(`^${lit}\\s*$`, 'gm')) || []).length;
          if (times > 1)
            bad.push(`${item}: ${a.__file} carries "${head}" ${times} times — a join splices each part once, so a part heading present twice is a region assembled over rather than replaced (R3.6-2)`);
        }

        if (/\.(compliance|derived)\.md$/.test(p.rel)) continue;
        let entry = null, entryKey = 'id';
        for (const key of ['id', 'identity_key']) {
          for (const [k, v] of Object.entries(a)) {
            if (k.startsWith('__') || !Array.isArray(v)) continue;
            const hit = v.find(x => x && typeof x === 'object' && x[key] != null && flat(x[key]) === item);
            if (hit) { entry = hit; entryKey = key; break; }
          }
          if (entry) break;
        }
        const derived = Object.keys(fm).filter(k => k !== 'part_of' && k !== 'item_id');
        if (!derived.length) continue;
        const from = namedRecords(target, item);
        const readFrom = `the front matter of ${a.__file}${from.length ? ` and of ${from.join(', ')}` : `, and this run holds no record naming ${target}`}`;
        if (!entry) {
          bad.push(`${item}: ${p.rel} carries ${derived.join(', ')} in its front matter, and this check compares them with the entry \`id: ${item}\`, or \`identity_key: ${item}\` where the list keys on that as a card record does, in a list on ${target}, read from ${readFrom}; none of them has that entry. The text of ${a.__file} is never read for these values (R3.6-2)`);
          continue;
        }
        const norm = v => Array.isArray(v) ? v.map(norm)
          : v && typeof v === 'object'
            ? Object.fromEntries(Object.entries(v).sort(([x], [y]) => (x < y ? -1 : 1)).map(([kk, w]) => [kk, norm(w)]))
            : flat(v);
        for (const k of derived) if (JSON.stringify(norm(fm[k])) !== JSON.stringify(norm(entry[k])))
          bad.push(`${item}: ${k} on the entry \`${entryKey}: ${item}\` in ${target}, read from ${readFrom}, is not the value ${p.rel} carries. This check compares that entry, never the text of ${a.__file} — the join may add the envelope, reconcile ids and record a failed instance, and may not re-author what an invocation produced (R3.6-2)`);
      }
      add('C104', true, bad.length === 0, bad.length ? bad.join('; ')
        : `${compared} instance file(s) transferred into their artifacts word for word — the prose and the values their front matter derived`);
    }
  }

  {
    const kBuild = recordedBuild(dir);
    const entries = contradictionsOf(A.A3);
    if (!A.A3)
      add('C193', false, true, 'the hypothesis set is not in this run yet, so no contradiction is recorded');
    else if (!buildAtLeast(kBuild, CONTRADICTION_BUILD))
      add('C193', false, true, `this run was started on ${kBuild ? `build ${kBuild}` : 'a build it does not record'}, before ` +
        'a contradiction the agent found in stage 2\'s own documents held the stage');
    else if (!entries.length)
      add('C193', true, true, 'no contradiction recorded');
    else {
      const flat = s => String(s ?? '').replace(/\s+/g, ' ').trim();
      const stage2 = runArtifacts(dir).filter(a => Number(a.stage) === 2);
      const bodyOf = a => {
        try { const t = viewRead(a.abs); const s = splitFm(t); return flat(s ? s.body : t); }
        catch { return ''; }
      };
      const { covered, latest } = contradictionSignOffs(runState, 2);
      const bad = [], fixed = [];
      for (const k of entries) {
        const id = k.id || 'an entry with no id';
        const doc = stage2.find(a => String(a.id) === k.document);
        if (!doc) { bad.push(`${id} names ${k.document || 'no document'}, which this run's stage 2 does not carry`); continue; }
        const file = basename(doc.rel), claim = flat(k.claim), holds = claim !== '' && bodyOf(doc).includes(claim);
        if (k.resolution === 'corrected') {
          if (holds) bad.push(`${id} is marked corrected and ${file} still says "${claim}"`);
          else fixed.push(`${id} in ${file}`);
          continue;
        }
        if (!holds) { bad.push(`${id} quotes a claim ${file} does not hold; quote it word for word`); continue; }
        if (latest && !covered.has(k.id)) {
          bad.push(`${id} was recorded after the sign-off of ${latest.at}, which covers ${[...covered].join(', ') || 'no entry'} only; ` +
            'have it corrected, or sign the check off again with your reason');
          continue;
        }
        bad.push(`${id}: ${file} says "${claim}", and ${k.evidence}. Stage 2 waits on the person: have the claim corrected, ` +
          `or keep it with a reason by signing this check off with "${SIGN_OFF_TASK}"`);
      }
      add('C193', true, bad.length === 0, bad.length ? bad.join('; ')
        : `${fixed.length} contradiction(s) in stage 2's own documents, each corrected: ${fixed.join(', ')}`);
    }
  }

  {
    const partsBuild = recordedBuild(dir);
    const field = (text, k) => ((new RegExp(`^${k}:[ \\t]*(.*?)[ \\t]*$`, 'm').exec(String(text).slice(0, 4096)) || [])[1] || '')
      .replace(/^(["'])(.*)\1$/, '$2').trim();
    const itemRecords = runRecordsViewed(dir).map(rec => {
      const head = viewRead(rec.abs).replace(/\r\n/g, '\n');
      return { art: String(rec.id || field(head, 'artifact_id')), item: field(head, 'item_id'), rid: field(head, 'record_id'), rel: rec.rel };
    }).filter(x => x.item && x.art);
    if (!buildAtLeast(partsBuild, PART_COUNT_BUILD))
      add('C187', false, true, `this run was started on ${partsBuild ? `build ${partsBuild}` : 'a build it does not record'}, before ` +
        'a document\'s entries were counted against their parts; C104 compares the parts that are on disk');
    else if (!itemRecords.length)
      add('C187', false, true, 'no record names an item_id, so no document here says it was assembled from parts');
    else {
      const bad = [];
      const key = (art, item) => `${art}\u0000${item}`;
      const onDisk = new Set(runParts(dir).map(p => {
        const t = viewRead(p.abs).replace(/\r\n/g, '\n');
        return key(field(t, 'part_of'), field(t, 'item_id'));
      }));
      const gone = new Map();
      for (const f of takenBackFiles(dir)) {
        if (!f.stamp || !/\/parts\//.test(`/${f.stamp.from}`)) continue;
        const t = viewRead(f.abs).replace(/\r\n/g, '\n').replace(/^<!--[\s\S]*?-->\s*/, '');
        const k = key(field(t, 'part_of'), field(t, 'item_id'));
        if (!gone.has(k)) gone.set(k, f.stamp);
      }
      let compared = 0, unproduced = 0;
      const carried = new Set();
      const hadParts = art => [...onDisk, ...gone.keys()].some(k => k.startsWith(`${art}\u0000`));
      const counted = itemRecords.filter(r => hadParts(r.art));
      for (const r of counted) {
        const a = A[r.art];
        if (!a) continue;
        const from = arr(a.assembled_from).map(String);
        if (from.length && !from.includes(r.rid)) continue;
        carried.add(key(r.art, r.item));
        if (onDisk.has(key(r.art, r.item))) { compared++; continue; }
        const noted = arr(a.unproduced).some(u => [u && u.id, u && u.item_id, u].some(v => v != null && typeof v !== 'object' && String(v).trim() === r.item)
          && String((u && (u.reason || u.why)) || '').trim());
        if (noted) { unproduced++; continue; }
        const stageOf = (RUN_DOCS.find(d => d.id === r.art) || {}).stage;
        const noun = r.art === 'A6' ? 'card' : 'entry';
        const st = gone.get(key(r.art, r.item));
        const how = st ? `: taken back on ${st.at} by ${st.by}${st.stranded ? ', swept up with the stranded parts rather than named' : ''}` : '';
        bad.push(`${r.art} carries ${noun} ${r.item} and its part is gone${how}. The ${noun} has no record behind it. ` +
          `Send stage ${stageOf || 'its'} back, or take the ${noun} out of ${r.art}`);
      }
      const takenGone = [...gone.keys()].filter(k => !carried.has(k)).length;
      if (!counted.length)
        add('C187', false, true, 'no document whose records name an item_id is one a part on disk or a part taken back names, so no document here was assembled from parts');
      else add('C187', true, bad.length === 0, bad.length ? bad.join('; ')
        : `${compared} part(s) behind the entries their documents carry, ${unproduced} recorded as unproduced, ` +
          `and ${takenGone} taken back whose entry the document no longer carries`);
    }
  }

  {
    const fo = (() => { try { return fanOutFor(4); } catch { return null; } })();
    const A8 = A.A8;
    const madeOn = String((A8 && (A8.produced_at || A8.assembled_at)) || '');
    if (!fo) add('C160', false, true, 'the contract composes no stage as a fan-out — nothing here applies');
    else if (!A8) add('C160', false, true, 'A8 absent — stage 4 not run');
    else if (!madeOn || madeOn < FANOUT_MATERIALISED_FROM)
      add('C160', false, true, `A8 was produced on ${madeOn || 'an unrecorded date'}, before the fan-out acquired a producer on ${FANOUT_MATERIALISED_FROM} — this run was composed as a single pass and is read against the composition it ran under`);
    else {
      const problems = [];
      const stageDir = STAGE_DIRS[3];
      const briefDir = join(dir, stageDir, fo.brief_dir);
      const slate = slateEntries(dir, 4);
      if (slate === null) problems.push(`${stageDir}/${fo.brief_dir}/slate.md is not on disk — the slate phase names the set and nothing here names it`);
      else if (!slate.length) problems.push(`${stageDir}/${fo.brief_dir}/slate.md names no entries, so the authoring phase had nothing to fan out over`);
      const briefs = briefsOn(dir, 4);
      if (!existsSync(briefDir)) problems.push(`${stageDir}/${fo.brief_dir}/ does not exist — the fan-out was not materialised, so stage 4 ran as one pass`);
      if (slate && slate.length) {
        for (const e of slate.filter(x => x.statement))
          problems.push(`slate entry ${e.id} carries a statement — an entry written up on the slate is a solution the authoring phase cannot then author`);
        for (const e of slate) {
          if (!e.solves.length) problems.push(`slate entry ${e.id} names no problem it solves`);
          if (!e.supported_by.length) problems.push(`slate entry ${e.id} names no evidence supporting it`);
        }
        const authors = briefs.filter(b => b.phase === 'author');
        const briefed = new Set(authors.map(b => b.item_id).filter(Boolean));
        const missing = slate.map(e => e.id).filter(id => !briefed.has(id));
        const orphan = [...briefed].filter(id => !slate.some(e => e.id === id));
        if (missing.length)
          problems.push(`${slate.length} slate entr(ies) and ${authors.length} author brief(s) — ${missing.join(', ')} ${missing.length === 1 ? 'was' : 'were'} never briefed, so the authoring phase has no producer for ${missing.length === 1 ? 'it' : 'them'}`);
        if (orphan.length) problems.push(`author brief(s) for ${orphan.join(', ')} name no slate entry`);
        const unproduced = new Set(arr(A8.unproduced).map(u => String((u && u.id) || u)));
        for (const id of briefed) {
          if (existsSync(join(dir, stageDir, 'parts', `${id}.md`))) continue;
          if (unproduced.has(id)) continue;
          problems.push(`${id} was briefed and produced neither a part nor an entry in A8's unproduced[] — an invocation that left no trace is one nobody can tell from one that never ran`);
        }
      }
      add('C160', true, problems.length === 0, problems.length ? problems.join('; ')
        : `stage 4 was composed as ${fo.phases.length} phase(s) over ${slate.length} slate entr(ies), each with its own brief and its own part — ` +
          `how many invocations wrote them is not readable from disk, trace_id[] is the field that would say (C92) and no client has emitted a trace here`);
    }
  }

  {
    const records = runRecordsViewed(dir);
    if (!records.length) {
      const why = 'the run holds no records/ tree — nothing here was assembled from records (§6.0)';
      add('C107', false, true, why);
      add('C108', false, true, why);
      add('C109', false, true, why);
    } else {
      const CITE = /\[rec:([A-Za-z0-9-]+)\]/g;
      const byRecordId = new Map();
      for (const r of records) {
        if (!r.recordId) continue;
        if (!byRecordId.has(r.recordId)) byRecordId.set(r.recordId, []);
        byRecordId.get(r.recordId).push(r.rel);
      }
      const known = new Set(byRecordId.keys());
      const assembled = new Set(records.map(r => r.id).filter(Boolean));

      const dangling = [];
      let cites = 0;
      for (const r0 of records) {
        if (!r0.recordId) dangling.push(`${r0.rel} declares no record_id — a record nothing can be cited by is a record nothing can check`);
        if (!r0.id) dangling.push(`${r0.rel} declares no artifact_id — a record that does not say which document it feeds cannot be joined to one`);
        else { const stranded = strandedRecord(r0, id => Boolean(A[id])); if (stranded) dangling.push(stranded); }
      }
      for (const id of assembled) {
        const a = A[id]; if (!a) continue;
        for (const m of bodyOf(a.__file).matchAll(CITE)) {
          cites++;
          if (!known.has(m[1])) dangling.push(`${a.__file} cites ${m[1]}, and this run holds no such record`);
        }
        for (const rid of arr(a.assembled_from).map(String)) {
          if (!known.has(rid)) dangling.push(`${a.__file} lists ${rid} in assembled_from, and this run holds no such record`);
        }
      }
      for (const [rid, files] of byRecordId) {
        if (files.length < 2) continue;
        dangling.push(`${files.join(' and ')} both declare record_id ${rid} — a record store cannot hold ` +
          `one identity twice, and every join in this build resolves a citation by membership, so a ` +
          `citation to ${rid} reports success against whichever of them it reaches first. Rename one of ` +
          `them to a number no other record of that artifact uses — the body, the fields and the history ` +
          `are kept, only the number moves. Records are retained, never deleted, so renaming is the ` +
          `whole of the repair.`);
      }
      add('C107', true, dangling.length === 0, dangling.length ? dangling.join('; ')
        : `${cites} citation(s) across ${assembled.size} assembled document(s) resolve to one of ` +
          `${byRecordId.size} distinct record identit${byRecordId.size === 1 ? 'y' : 'ies'}, and no two of ` +
          `this run's ${records.length} record(s) derive the same one`);

      const dropped = [];
      for (const id of assembled) {
        const a = A[id]; if (!a) continue;
        const body = bodyOf(a.__file);
        const listed = new Set(arr(a.assembled_from).map(String));
        const bodyCites = id !== 'A14';
        for (const r0 of records.filter(x => x.id === id && x.recordId)) {
          if (bodyCites && !body.includes(`[rec:${r0.recordId}]`))
            dropped.push(`${r0.rel} feeds ${id} and ${a.__file} never cites it — a record the document does not carry is research that was done and thrown away in silence`);
          if (!listed.has(r0.recordId))
            dropped.push(`${r0.rel} feeds ${id} and is not in ${a.__file}'s assembled_from`);
        }
      }
      add('C108', true, dropped.length === 0, dropped.length ? dropped.join('; ')
        : `every one of ${records.length} record(s) is cited by the document it feeds and listed in its assembled_from`);

      const PRODUCTION_FIELDS = ['produced_at', 'bounds_hit', 'trace_id',
        'scores_basis', 'constraint_basis', 'confidence_basis', 'structure_basis'];
      const hybrid = [];
      for (const id of assembled) {
        const a = A[id]; if (!a) continue;
        const carried = PRODUCTION_FIELDS.filter(f => a.__own && a.__own.has(f));
        if (carried.length)
          hybrid.push(`${a.__file} carries ${carried.join(', ')} — a production field belongs to the record that made it (§6.0)`);
        if (a.assembled_at === undefined) hybrid.push(`${a.__file} names no assembled_at`);
        if (a.assembled_from === undefined) hybrid.push(`${a.__file} names no assembled_from`);
      }
      add('C109', true, hybrid.length === 0, hybrid.length ? hybrid.join('; ')
        : `${assembled.size} assembled document(s) carry identity and acceptance only, and every production field sits on a record`);
    }
  }

  if (A8) {
    const LADDER_FROM = '2026-08-19';
    const made103 = String(A8.produced_at || A8.assembled_at || '');
    const ideas = arr(A8.ideas).filter(Boolean);
    const sets = ideas.map(i => ({
      id: String(i.id || '(unidentified)'),
      solves: new Set(arr(i.solves).filter(Boolean).map(String)),
      byPerson: String(i.origin || '').trim().toLowerCase() === 'person',
    })).filter(x => x.solves.size);
    const bad = [];
    for (const a of sets) for (const b of sets) {
      if (a.id === b.id) continue;
      if (a.byPerson || b.byPerson) continue;
      const subset = [...a.solves].every(p => b.solves.has(p));
      if (!subset) continue;
      if (a.solves.size === b.solves.size) {
        if (a.id < b.id && !(made103 && made103 >= SECTIONS_EIGHT))
          bad.push(`${a.id} and ${b.id} solve exactly the same problems (${[...a.solves].sort().join(', ')}) — that is one solution written twice`);
      } else if (!(made103 && made103 >= SECTIONS_EIGHT) && String(A8.produced_at || '') >= LADDER_FROM) {
        bad.push(`${a.id} solves ${[...a.solves].sort().join(', ')} and ${b.id} solves ${[...b.solves].sort().join(', ')} — ${a.id} is ${b.id} with an opportunity taken off it, and a gate comparing them is choosing how much of one solution to do rather than between two`);
      }
    }
    if (made103 && made103 >= SECTIONS_EIGHT) {
      const byKey = new Map();
      for (const x of sets) {
        const k = [...x.solves].sort().join('|');
        byKey.set(k, [...(byKey.get(k) || []), x.id]);
      }
      for (const [k, ids] of byKey)
        if (ids.length > 3)
          bad.push(`${ids.length} solutions share one opportunity list (${k.split('|').join(', ')}): ${ids.join(', ')} — three is the most that reads as different angles on the same opportunity; variants of one solution belong to the MVP options at stage 5`);
    }
    add('C103', sets.length > 1, bad.length === 0, bad.length ? bad.join('; ')
      : made103 && made103 >= SECTIONS_EIGHT
        ? `${sets.length} solution(s), no more than three of them on one identical opportunity list`
        : `${sets.length} solution(s), none of them another with an opportunity added or taken off`
          + (String(A8.produced_at || '') >= LADDER_FROM ? '' : ' (authored before 2026-08-19; only identical sets are refused)'));
  } else add('C103', false, true, 'A8 absent — stage 4 not run');

  if (A8 && arr(A8.unproduced).filter(Boolean).length) {
    const lost = arr(A8.unproduced).filter(Boolean);
    const ideaIds = new Set(arr(A8.ideas).filter(Boolean).map(i => String(i.id || '').trim()).filter(Boolean));
    const bad = [];
    const seen = new Set();
    const GENERIC = wordsFor(dir, 'generic_reason');
    for (const u of lost) {
      const id = String(u.id || '').trim();
      if (!id) { bad.push('an unproduced entry names no solution — the id is what a re-run is keyed on'); continue; }
      if (seen.has(id)) bad.push(`${id} is recorded unproduced twice`);
      seen.add(id);
      if (ideaIds.has(id))
        bad.push(`${id} is both a solution and an unproduced one — the record cannot say both, and a reader takes whichever half they open`);
      const r = String(u.reason || '').trim();
      if (!r) bad.push(`${id} is recorded unproduced with no reason — an unexplained loss is the silence this field exists to replace`);
      else if (GENERIC.test(r) || r.length < 20)
        bad.push(`${id}'s reason is generic — "${r.slice(0, 40)}" says an invocation failed and not what a re-run would do differently`);
    }
    const total = ideaIds.size + seen.size;
    const authoredOn = String(A8.produced_at || A8.assembled_at || '');
    const authoredCeiling = authoredOn && authoredOn >= BOUNDS_SPLIT ? 5 : 7;
    if (total < 3 || total > authoredCeiling)
      bad.push(`${ideaIds.size} solution(s) and ${seen.size} unproduced make ${total} — the 3..${authoredCeiling} bound is read against the set the stage set out to author, not against the part of it that came back`);

    add('C102', true, bad.length === 0, bad.length ? bad.join('; ')
      : `${seen.size} unproduced solution(s), each with an id and an actionable reason, and ${total} in the set the stage set out to author`);
  } else add('C102', false, true,
    A8 ? 'A8 declares no unproduced solutions — either every instance came back or the set predates the fan-out'
      : 'A8 absent — stage 4 not run');

  {
    const DOC_FROM = '0.1';
    const docLang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
    const stageOfArtifact = STAGE_OF_ARTIFACT;
    const scoped = [];
    for (const a of all) {
      if (!a || !a.artifact_id || !a.__file) continue;
      const stage = stageOfArtifact(a.artifact_id);
      if (stage === null) continue;
      if (underStandards(runState, stage, 'documentation-standards', DOC_FROM)) scoped.push(a);
    }
    const outOfScope = 'no stage records documentation-standards@' + DOC_FROM +
      ' or later — every artifact here was written before the body existed, and a stage is not held to a bar written after it ran';

    if (!scoped.length) {
      add('C97', false, true, outOfScope);
      add('C98', false, true, outOfScope);
      add('C99', false, true, outOfScope);
      add('C100', false, true, outOfScope);
    } else {
      const bodies = new Map(scoped.map(a => [a, bodyOf(a.__file)]));
      const heads = new Map(scoped.map(a => [a, headingsOf(bodies.get(a))]));

      {
        const bad = [];
        const opensOnBlock = buildAtLeast(recordedBuild(dir), OPENING_BLOCK_BUILD);
        for (const a of scoped) {
          const v = opensOnProse(bodies.get(a));
          if (!v.ok) bad.push(`${a.__file}: ${v.why} — the finding comes first, with no heading above it (§1 rule 1)`);
          const st = stageOfArtifact(a.artifact_id);
          if (opensOnBlock && BLOCK_KINDS.includes(a.artifact_id) && BLOCK_STAGES.includes(Number(st))
              && underStandards(runState, st, 'documentation-standards', OPENING_FROM) && !judgeBlock(bodies.get(a), docLang).length)
            bad.push(`${a.__file}: no "${inLanguage({ heading: 'For you to judge', cs: 'K vašemu posouzení' }, docLang)}" lines in the opening block — ` +
              'the document opens with what its approver is asked to judge and where (§1 rule 1)');
        }
        add('C97', true, bad.length === 0, bad.length ? bad.join('; ')
          : `all ${scoped.length} artifact(s) in scope open on the finding rather than on a heading`);
      }

      {
        const CLOSING_EXEMPT = new Set(['A12', 'A13', 'A14']);
        const bad = [];
        let exempt = 0;
        for (const a of scoped) {
          if (CLOSING_EXEMPT.has(a.artifact_id)) { exempt++; continue; }
          const rep = closingReport(heads.get(a), docLang);
          if (rep.missing.length)
            bad.push(`${a.__file}: no "${rep.missing.join('" and no "')}" section — every document closes with both, under these exact names (§1 rule 2)`);
          if (rep.order)
            bad.push(`${a.__file}: "${inLanguage(CLOSING[1], docLang)}" does not follow "${inLanguage(CLOSING[0], docLang)}" — the order is fixed`);
          if (rep.trailing.length)
            bad.push(`${a.__file}: section(s) after the closing pair: ${rep.trailing.join(', ')} — the pair closes the document`);
        }
        add('C98', true, bad.length === 0, bad.length ? bad.join('; ')
          : `all ${scoped.length - exempt} artifact(s) in scope close on the two sections, in order` +
            (exempt ? `; ${exempt} exempt: the initiative carries its template's sections (§3.11), and the PRD's closing pair is read by its template` : ''));
      }

      {
        const bad = [];
        for (const a of scoped) {
          const faults = headingFaults(heads.get(a), runId, docLang);
          for (const f of faults) bad.push(`${a.__file}: ${f}`);
        }
        add('C99', true, bad.length === 0, bad.length ? bad.join('; ')
          : `every heading across ${scoped.length} artifact(s) in scope names its subject, carries no number and no machinery`);
      }

      {
        const bad = [];
        let compared = 0;
        for (const a of scoped) {
          const skel = DOC_SKELETONS[a.artifact_id];
          if (skel) {
            compared++;
            const rep = sectionReport(heads.get(a), sectionsIn(skel.sections, docLang));
            if (rep.missing.length)
              bad.push(`${a.__file}: ${skel.name} is missing ${rep.missing.join(', ')} — the set is fixed (Documentation Standards ${skel.at})`);
            else if (rep.misordered)
              bad.push(`${a.__file}: ${skel.name} carries every section out of the order ${skel.at} fixes — ` +
                `it reads ${rep.found.join(' · ')}, and the order is ${rep.expected.join(' · ')}`);
          }
          const perMember = (ids, what, at) => {
            if (!ids.length) return;
            compared++;
            const tops = heads.get(a).filter(h => h.level === 2).map(h => h.text);
            const absent = ids.filter(id => !tops.some(t => new RegExp(`(^|[^A-Za-z0-9-])${id}([^A-Za-z0-9-]|$)`).test(t)));
            if (absent.length)
              bad.push(`${a.__file}: ${absent.join(', ')} ${absent.length === 1 ? 'is' : 'are'} in the record and ${absent.length === 1 ? 'has' : 'have'} no section of ${absent.length === 1 ? 'its' : 'their'} own (${what}, Documentation Standards ${at})`);
          };
          const trailing = (heading, what, at) => {
            const want = sectionsIn([heading], docLang)[0];
            const tops = heads.get(a).filter(h => h.level === 2).map(h => fold(h.text));
            if (!tops.some(t => t.includes(fold(want))))
              bad.push(`${a.__file}: no "${want}" section — ${what} (Documentation Standards ${at})`);
          };

          if (a.artifact_id === 'A3')
            perMember(arr(a.hypotheses).map(h => h && h.id).filter(Boolean), 'one section per hypothesis, named for the problem', '§3.3');

          if (a.artifact_id === 'A8b') {
            perMember(arr(a.scores).map(sc => sc && (sc.id || sc.idea)).filter(Boolean), 'one section per solution scored', '§3.8');
            trailing('The comparison', 'the scores open with the comparison, and the denominators come after it rather than before', '§3.8');
          }

          if (a.artifact_id === 'A10') {
            perMember(arr(a.options).map(o => o && o.id).filter(Boolean), 'one section per option', '§3.9');
            trailing('How to choose between them', 'the option set says what running each would teach, without naming a favourite', '§3.9');
          }

          if (a.artifact_id === 'A6') {
            const names = arr(a.cards).filter(Boolean)
              .map(c => String(c.name || c.identity_key || '').trim()).filter(Boolean);
            if (names.length) {
              compared++;
              for (const c of cardReport(heads.get(a), names, docLang)) {
                if (c.absent) bad.push(`${a.__file}: ${c.name} is declared in the record and has no section in the body (§3.6)`);
                else if (c.missing.length) bad.push(`${a.__file}: ${c.name} is missing ${c.missing.join(', ')} (§3.6)`);
              }
            }
          }
        }
        add('C100', true, bad.length === 0, bad.length ? bad.join('; ')
          : compared ? `${compared} artifact(s) carry the section set §3 fixes for their type, in order`
            : 'no artifact in scope has a §3 skeleton this check holds — A12/A13 are C67\'s, A14\'s sections are ČS\'s, and A7\'s two bodies disagree');
      }
    }
  }

  {
    const VOICE_FROM = '0.1';
    const stageOfArtifact = STAGE_OF_ARTIFACT;
    const scoped = [];
    for (const a of all) {
      if (!a || !a.artifact_id || !a.__file) continue;
      if (a.supplied_by) continue;
      const stage = stageOfArtifact(a.artifact_id);
      if (stage === null) continue;
      if (underStandards(runState, stage, 'output-voice', VOICE_FROM)) scoped.push(a);
    }
    const outOfScope = 'no stage records output-voice@' + VOICE_FROM +
      ' or later — every artifact here was written before the body existed, and a stage is not held to a bar written after it ran';

    const a14src = scoped.find(a => a.artifact_id === 'A14');
    const READ_COPY = a14src ? join('read', a14src.__file) : null;
    const READ_COPY_PRESENT = !!(READ_COPY && existsSync(join(dir, READ_COPY)));
    if (READ_COPY_PRESENT)
      scoped.push({ artifact_id: 'A14-read', __file: READ_COPY });

    const offsetOf = rel => {
      const t = existsSync(join(dir, rel)) ? viewRead(join(dir, rel)).replace(/^\ufeff/, '') : '';
      if (!t.startsWith('---')) return 0;
      const end = t.indexOf('\n---', 3);
      return end === -1 ? 0 : t.slice(0, end + 4).split('\n').length - 1;
    };

    {
      const BANNED = {
        vocabulary: ['leverage', 'leverages', 'leveraging', 'utilise', 'utilises', 'utilising',
                     'harness', 'harnesses', 'foster', 'fosters', 'robust', 'seamless', 'seamlessly',
                     'comprehensive', 'delve', 'delves', 'myriad', 'plethora', 'transformative',
                     'game-changing', 'meticulous', 'intricate'],
        phrase: ['it is important to note', 'it is worth mentioning', 'it should be noted',
                 "in today's rapidly changing market", 'as the industry continues to evolve',
                 'imagine a scenario where', 'let us look at', 'in conclusion', 'now more than ever',
                 'stay ahead of the curve', 'future-proof', 'testament to'],
        hedging: ['arguably', 'it could be argued', 'perhaps', 'it may be the case that',
                  'relatively', 'fairly', 'quite', 'somewhat', 'in our view'],
      };
      const CONDITIONAL = ['drive', 'navigate', 'realm', 'landscape', 'pivotal', 'crucial', 'critical',
                           'unlock', 'empower', 'enable', 'underscore', 'highlight'];
      const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const unquoted = line => line
        .replace(/`[^`]*`/g, ' ')
        .replace(/"[^"]*"/g, ' ')
        .replace(/\u201c[^\u201d]*\u201d/g, ' ');

      const hits = [];
      let predating = 0;
      for (const a of scoped) {
        const madeOn = String(a.produced_at || a.assembled_at || '');
        if (madeOn && madeOn < VOICE_TERMS_SINCE) { predating++; continue; }
        if (a.artifact_id === 'S3' || /\/sources\.md$/.test(a.__file) || a.__file === 'sources.md') continue;
        const off = offsetOf(a.__file);
        const lines = bodyOf(a.__file).split('\n');
        let fenced = false;
        for (let i = 0; i < lines.length; i++) {
          if (/^\s*```/.test(lines[i])) { fenced = !fenced; continue; }
          if (fenced) continue;
          if (/^\s*>/.test(lines[i])) continue;
          const text = unquoted(lines[i]);
          for (const [kind, list] of Object.entries(BANNED))
            for (const w of list)
              if (new RegExp(`(^|[^A-Za-z-])${esc(w)}([^A-Za-z-]|$)`, 'i').test(text))
                hits.push({ file: a.__file, line: i + 1 + off, w, kind });
        }
      }
      const shown = hits.slice(0, 6).map(h => `${h.w} (${h.kind}) at ${h.file}:${h.line}`).join(', ');
      if (!scoped.length) add('C139', false, true, outOfScope);
      else if (predating && !hits.length && predating === scoped.length)
        add('C139', false, true, `${predating} document(s) were written before this check and are read against the bar they were produced under`);
      else add('C139', true, hits.length === 0, hits.length
        ? `${hits.length} banned term(s) in prose this workflow wrote — ${shown}${hits.length > 6 ? ', and more' : ''} (Output Voice §2.1, §2.2, §2.5)`
        : `no banned vocabulary, phrase or hedge in the prose of ${scoped.length} document(s), outside quotations, blockquotes and the bibliography. ` +
          `${CONDITIONAL.length} further term(s) are banned only in a sense a string search cannot see — ${CONDITIONAL.slice(0, 4).join(', ')} and others — and are a reader's, not this check's`);
    }

    const a14s = scoped.filter(a => a.artifact_id === 'A14' || a.artifact_id === 'A14-read');
    const a14 = a14s[0];
    if (!a14) {
      add('C111', false, true, scoped.length
        ? 'A14 is not in scope — stage 7 records no output-voice@' + VOICE_FROM + ' or later, or the run has not reached the initiative'
        : outOfScope);
    } else {
      const IDENT = /\b(A\d{1,2}[a-z]?|H\d+|OPT-[A-Z]\b|ID-\d+|R-A\d{1,2}[a-z]?-\d+|R\d+|[GQ][1-7][a-z]?|C\d{1,3})\b(?!\s*\d{4})/g;
      const requirementIds = buildAtLeast(recordedBuild(dir), REQUIREMENT_ID_BUILD);
      const found = [];
      for (const doc of a14s) {
        const off = offsetOf(doc.__file);
        const lines = bodyOf(doc.__file).split('\n');
        let fenced = false;
        for (let i = 0; i < lines.length; i++) {
          if (/^\s*```/.test(lines[i])) { fenced = !fenced; continue; }
          if (fenced) continue;
          for (const m of lines[i].matchAll(IDENT))
            if (requirementIds || !/^R\d+$/.test(m[1])) found.push({ file: doc.__file, line: i + 1 + off, token: m[1] });
        }
      }
      const shown = found.slice(0, 6).map(f => `${f.token} at ${f.file}:${f.line}`).join(', ');
      add('C111', true, found.length === 0, found.length
        ? `${found.length} internal identifier(s) in the initiative's body — ${shown}${found.length > 6 ? ', and more' : ''}. A ČS reader has never seen these and should not meet them in a document addressed to them (Output Voice §5)`
        : `the initiative carries no internal identifier in its body across ${a14s.length} file(s) — ${a14s.length > 1 ? 'the document and, since D-D, the reading copy the bank is actually handed' : 'the document; this run holds no reading copy, so none was read'}. Other documents are outside this check because §5 scopes the rule to the initiative, not because of their language`);
    }
  }

  {
    const declared = String((A.A1 && A.A1.language) || '').trim().toLowerCase();
    const LEGAL = ['cs', 'en'];
    const MARK = {
      cs: /(?:\b(?:se|je|jsou|že|pro|na|které|který|nebo|při|podle|této|tato|tento|jako|jeho|jejich|byla|bylo|nelze|aby|ale|což|takto|své|svých)\b|[ěščřžýáíéúůňťď])/gi,
      en: /\b(?:the|and|of|in|is|for|that|with|are|as|by|from|this|which|been|will|not|its|their|would|these|such)\b/gi,
    };
    const MIN = 20;
    if (!declared) {
      add('C122', false, true, 'A1 declares no language — the run predates §6.2\'s field and nothing here applies');
    } else if (!LEGAL.includes(declared)) {
      add('C122', true, false, `A1 declares language "${declared}", which is outside ${LEGAL.join(' | ')} — the set is closed, and a value nothing recognises leaves every producer to guess`);
    } else {
      const other = declared === 'cs' ? 'en' : 'cs';
      const bad = [], thin = [];
      let read = 0;
      for (const a of all) {
        if (!a || !a.__file || a.supplied_by) continue;
        const body = bodyOf(a.__file);
        const mine = (body.match(MARK[declared]) || []).length;
        const theirs = (body.match(MARK[other]) || []).length;
        if (mine + theirs < MIN) { thin.push(a.__file); continue; }
        read++;
        if (theirs > mine)
          bad.push(`${a.__file}: the run declares ${declared} and the body reads as ${other} — ${theirs} ${other} function word(s) against ${mine} ${declared} (Output Voice §5)`);
      }
      add('C122', true, bad.length === 0, bad.length ? bad.join('; ')
        : `${read} document(s) are written in ${declared}, the language A1 declared` +
          (thin.length ? `; ${thin.length} too short to judge and reported rather than passed: ${thin.slice(0, 3).join(', ')}${thin.length > 3 ? ', and more' : ''}` : ''));
    }
  }

  {
    const build = recordedBuild(dir);
    const lang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase() === 'cs' ? 'cs' : 'en';
    const statusOf = n => String(((arr(runState && runState.stages).find(s => Number(s.id) === Number(n))) || {}).status || '');
    if (!buildAtLeast(build, OPENING_BLOCK_BUILD))
      add('C206', false, true, build ? `this run was started on build ${build}, before ${OPENING_BLOCK_BUILD}, when no document opened on the block`
        : `this run records no build, so it predates ${OPENING_BLOCK_BUILD}, when no document opened on the block`);
    else {
      const bad = [];
      let read = 0;
      for (const a of all) {
        if (!a || !a.artifact_id || !a.__file || !BLOCK_KINDS.includes(a.artifact_id)) continue;
        const st = STAGE_OF_ARTIFACT(a.artifact_id);
        if (!BLOCK_STAGES.includes(Number(st)) || statusOf(st) !== 'accepted') continue;
        if (!underStandards(runState, st, 'documentation-standards', OPENING_FROM)) continue;
        const r = blockAgainstRecord(dir, st, bodyOf(a.__file), lang);
        if (!r) continue;
        read++;
        for (const f of r.findings) bad.push(`${a.__file}: the opening block reads ${blockFindingLine(f)}`);
      }
      add('C206', read > 0, bad.length === 0, bad.length ? bad.join('; ')
        : read ? `the opening block of ${read} accepted document(s) carries what the record holds`
        : 'no accepted document of this run carries the opening block yet; the envelope step keeps a block to the record until its stage is accepted');
    }
  }

  if (A.A7 && underStandards(runState, 3, 'competitive-analysis-standards', '0.10')) {
    const FLOOR = 4;
    const heads = headingsOf(bodyOf(A.A7.__file));
    const lines = bodyOf(A.A7.__file).split('\n');
    const fileLine = (() => { try { return viewRead(join(dir, A.A7.__file)).split('\n').length - lines.length; } catch { return 0; } })();
    const TIER = /^\*\*\[(universal|common|emerging|rare)\]/i;
    const problemIds = [...new Set([
      ...arr(A.A3 && A.A3.hypotheses).map(h => h && h.id),
      ...arr(A.A4 && A.A4.primary).map(p => (p && p.id) || p),
      ...arr(A.A4 && A.A4.secondary).map(p => (p && p.id) || p),
    ].filter(Boolean).map(String))];
    const NONE = wordsRe('bears_on_none');
    const noneLang = String((A.A1 && A.A1.language) || 'en').trim().toLowerCase();
    const nonePhrase = noneLang.startsWith('cs') ? 'Nedotýká se žádné z příležitostí tohoto runu.' : 'Bears on none of this run\'s opportunities.';

    const tops = heads.filter(h => h.level === 2);
    const findings = [];
    for (let i = 0; i < lines.length; i++) if (TIER.test(lines[i])) findings.push(i + 1);

    const bad = [];
    const facets = [];
    const unnamed = [];
    for (let i = 0; i < tops.length; i++) {
      const from = tops[i].line, to = i + 1 < tops.length ? tops[i + 1].line : lines.length + 1;
      const mine = findings.filter(l => l > from && l < to);
      if (!mine.length) continue;
      facets.push({ name: tops[i].text, count: mine.length });
      if (mine.length < FLOOR)
        bad.push(`"${tops[i].text}" carries ${mine.length} finding(s) — the floor is ${FLOOR}, because one paragraph per facet is an inventory (§4.0)`);
      for (let n = 0; n < mine.length; n++) {
        const start = mine[n] - 1, stop = (n + 1 < mine.length ? mine[n + 1] : to) - 1;
        const block = lines.slice(start, stop).join(' ');
        const named = problemIds.some(id => new RegExp(`\\b${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(block));
        if (!named && !NONE.test(block)) unnamed.push(mine[n]);
      }
    }
    {
      const m = RULE_ONCE(`§4.0 — every finding names a problem it bears on, or says it bears on none ("${nonePhrase}"). ` +
        `A finding that names neither is an observation about a market nobody asked about. Lines of ${A.A7.__file}`, unnamed.map(l => l + fileLine));
      if (m) bad.push(m);
    }
    if (!facets.length)
      bad.push(`${A.A7.__file}: no section carries a tier-labelled finding — §4.0 fixes the facet shape at a summary, four findings each carrying its tier, then the evidence table`);

    add('C101', true, bad.length === 0, bad.length ? bad.join('; ')
      : `${facets.length} facet(s), each carrying ${FLOOR} or more tier-labelled findings, and every finding names the opportunities it bears on or states it bears on none`);
  } else add('C101', false, true,
    A.A7 ? 'stage 3 did not record competitive-analysis-standards@0.10 or later — §4.0 fixed the facet shape at that version, and a stage is not held to a bar written after it ran'
      : 'A7 absent — no synthesis to weigh');

  {
    const stages = arr(runState && runState.stages);
    const bad = [];
    let joined = 0;
    for (const [aid, a] of Object.entries(A)) {
      const d = a && a.decision;
      if (!d || typeof d !== 'object') continue;
      const gate = String(d.gate || '');
      if (!/^G\d/.test(gate)) continue;
      const stage = stages.find(x => arr(x.artifacts).map(String).includes(String(aid)));
      if (!stage) continue;
      const ranAt = String((stage.quality_gate && stage.quality_gate.run_at) || '');
      if (!ranAt || ranAt < DECISIONS_RECORDED_FROM) continue;
      joined++;
      const recorded = arr(stage.decision_gates).concat(stage.decision_gate ? [stage.decision_gate] : []);
      const hit = recorded.find(g => String(g.id) === gate);
      const names = arr(d.accepted_by).map(x => String((x && x.name) || x || '')).filter(Boolean);
      if (!hit) {
        bad.push(`${a.__file}: decision ${gate} names ${names.join(', ') || 'an accepter'} and stage ${stage.id} records no ${gate} — ` +
          `an acceptance the run does not carry is a signature nobody gave (the artifact is where this is written and the run is what says it happened)`);
        continue;
      }
      const said = String(hit.decided_by || '');
      if (names.length && said && !names.some(n => n === said))
        bad.push(`${a.__file}: decision ${gate} names ${names.join(', ')} and the run records ${gate} decided by ${said}`);
      const at = String(d.accepted_at || ''), on = String(hit.decided_at || '');
      if (at && on && at !== on)
        bad.push(`${a.__file}: decision ${gate} is dated ${at} and the run records ${gate} on ${on}`);
    }
    for (const st of stages) {
      const ranAt = String((st.quality_gate && st.quality_gate.run_at) || '');
      if (!ranAt || ranAt < DECISIONS_RECORDED_FROM) continue;
      for (const g of arr(st.decision_gates).concat(st.decision_gate ? [st.decision_gate] : [])) {
        const written = Object.values(A).some(a => a && a.decision && String(a.decision.gate) === String(g.id));
        if (!written) { joined++;
          bad.push(`stage ${st.id} records ${g.id} decided by ${g.decided_by} and no artifact this stage carries writes that decision down — the run says a person decided and nothing they decided about shows it`); }
      }
    }
    add('C169', joined > 0, bad.length === 0, bad.length ? bad.join('; ')
      : `${joined} acceptance(s) join the run record both ways — every signature written on an artifact is one the run says happened, by the same person on the same day`);
  }

  {
    const trim = v => String(v == null ? '' : v).replace(/\s+/g, ' ').trim();
    const decisions = arr(runState && runState.decisions);
    const KINDS = ['choice', 'direction', 'exception'];
    const stageIds = arr(runState && runState.stages).map(x => String(x.id));
    const bad = [];
    decisions.forEach((d, i) => {
      const where = `decision ${i + 1}${d && d.stage ? ` on stage ${d.stage}` : ''}`;
      if (!d || typeof d !== 'object') { bad.push(`${where} is not a record`); return; }
      if (!stageIds.includes(String(d.stage))) bad.push(`${where} names stage ${d.stage}, which this run does not carry`);
      if (!KINDS.includes(String(d.kind))) bad.push(`${where} is kind "${d.kind}" — the kinds are ${KINDS.join(', ')}`);
      if (!trim(d.what)) bad.push(`${where} records no words — a decision with no words is a tick box`);
      if (!trim(d.by)) bad.push(`${where} names no person`);
      if (!trim(d.role)) bad.push(`${where} names ${trim(d.by) || 'a person'} and no role — a name with no role does not say what they were accountable for`);
      if (d.by_agent !== false) bad.push(`${where} does not carry by_agent: false — an agent never records a human decision`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(d.at || ''))) bad.push(`${where} is dated "${d.at}"`);
      if (String(d.kind) === 'exception') {
        const named = signedChecks(d);
        if (!named.length || named.some(c => !/^C\d+$/.test(c)))
          bad.push(`${where} is an exception naming check ${JSON.stringify(d.check)} — an exception says which check or checks, each by its id`);
        if (!trim(d.reason)) bad.push(`${where} is an exception with no reason — why it cannot be satisfied, not that it was not`);
        if (d.cause !== undefined && !SIGN_OFF_CAUSES.includes(trim(d.cause)))
          bad.push(`${where} is an exception giving its cause as "${trim(d.cause)}" — the causes are ${SIGN_OFF_CAUSES.join(' and ')}`);
      } else if (d.check || d.reason || d.cause !== undefined) {
        bad.push(`${where} is a ${d.kind} carrying check/reason/cause — those belong to an exception`);
      }
    });
    const byPerson = new Map();
    for (const d of decisions) {
      const n = trim(d && d.by); if (!n) continue;
      const k = foldName(n); if (!byPerson.has(k)) byPerson.set(k, new Set());
      byPerson.get(k).add(n);
    }
    const multi = [...byPerson.values()].filter(v => v.size > 1).map(v => [...v].join(' / '));
    const withdrawn = decisions.filter(d => d && d.superseded_by).length;
    add('C167', decisions.length > 0, bad.length === 0, bad.length ? bad.join('; ')
      : `${decisions.length} decision(s) recorded outside the gates, ${decisions.length - withdrawn} standing and ${withdrawn} withdrawn, by ${byPerson.size} named person(s), each with the role they decided in` +
        (multi.length ? `; one person is recorded under more than one spelling: ${multi.join('; ')}` : ''));
  }

  {
    const bad = [];
    let looked = 0;
    const C170_CONTRACTS = contractsOnce();
    for (const [stage, kinds] of ((C170_CONTRACTS && C170_CONTRACTS.records) || new Map())) {
      if (!kinds.size) continue;
      const sd = STAGE_DIRS[stage - 1];
      if (!sd) continue;
      const docs = existsSync(join(dir, sd))
        ? readdirSync(join(dir, sd)).filter(f => f.endsWith('.md')).length : 0;
      if (!docs) continue;
      looked++;
      const rdir = join(dir, 'records', sd);
      const recs = existsSync(rdir) ? readdirSync(rdir).filter(f => f.endsWith('.record.md')).length : 0;
      const stray = strayRecordFiles(dir, sd);
      const owned = arr((arr(runState && runState.stages).find(x => Number(x.id) === Number(stage)) || {}).artifacts).map(String);
      const groups = new Map();
      for (const f of stray) { const id = strayArtifact(f, owned); groups.set(id, [...(groups.get(id) || []), f]); }
      const named = existsSync(rdir) ? readdirSync(rdir).filter(f => f.endsWith('.record.md')) : [];
      const slugOf = id => { const f = RAW[id] && RAW[id].__file; return f ? basename(String(f), '.md').replace(/^\d+-/, '') : '<what>'; };
      const said = [...groups].map(([id, files]) => {
        const has = id && named.find(f => f.startsWith(`${id}-r`));
        return has ? strayBesideLine(sd, files, has) : strayRecordsLine(sd, files, id, id ? slugOf(id) : '<what>');
      }).join('; ');
      if (!recs) bad.push(stray.length
        ? `stage ${stage} carries ${docs} document(s) and no record — ${said}`
        : `stage ${stage} carries ${docs} document(s) and no record — it declares ${[...kinds].join(', ')} and \`records/${sd}/\` is empty, so what a gate reads was assembled from nothing this run can show`);
      else if (stray.length) bad.push(`stage ${stage} carries ${recs} record(s) and misnamed files beside them — ${said}`);
    }
    add('C170', looked > 0, bad.length === 0, bad.length ? bad.join('; ')
      : `${looked} stage(s) with documents on disk each carry at least one record, as the \`records:\` line of their contract step declares`);
  }

  {
    const trim = v => String(v == null ? '' : v).replace(/\s+/g, ' ').trim();
    const decisions = arr(runState && runState.decisions);
    const stages = arr(runState && runState.stages);
    const failing = new Set(r.filter(x => x.applies && !x.ok).map(x => x.id));
    const bad = [];
    let checked = 0;

    for (const d of decisions.filter(x => String(x.kind) === 'exception' && !x.superseded_by)) {
      checked++;
      const named = signedChecks(d);
      const stale = named.filter(c => !failing.has(c));
      if (stale.length)
        bad.push(`stage ${d.stage} carries a signed exception for ${named.join(', ')} and ${stale.join(', ')} ${stale.length === 1 ? 'is' : 'are'} not failing on this run — an exception outliving its failure is a switch left on (the shape C149 refuses for the corpus). Withdraw it with "SPOCK: replace a decision that no longer stands", kind exception, giving the sign-off's date, ${shownDate(d.at)}`);
      const owner = stages.find(x => String(x.id) === String(d.stage));
      const rec = owner && owner.quality_gate && Array.isArray(owner.quality_gate.failed)
        ? owner.quality_gate.failed.map(String) : null;
      const elsewhere = rec && rec.length ? named.filter(c => !rec.includes(c)) : [];
      if (elsewhere.length)
        bad.push(`stage ${d.stage} carries a signed exception for ${elsewhere.join(', ')} and its own gate recorded ${rec.join(', ')} as failing — a signature answers the stage it was signed on, never a failure somewhere else in the run. Withdraw it with "SPOCK: replace a decision that no longer stands", kind exception, giving the sign-off's date, ${shownDate(d.at)}`);
    }

    for (const s of stages) {
      const ranAt = String((s.quality_gate && s.quality_gate.run_at) || '');
      if (!ranAt || ranAt < DECISIONS_RECORDED_FROM) continue;
      if (String((s.quality_gate && s.quality_gate.result) || '') !== 'pass') continue;
      if (!arr(s.artifacts).map(String).includes('A9') || !RAW.A9) continue;
      checked++;
      const gated = arr(s.decision_gates).length > 0 || (s.decision_gate ? 1 : 0);
      const chose = decisions.some(d => String(d.stage) === String(s.id) && String(d.kind) === 'choice');
      if (!gated && !chose)
        bad.push(`stage ${s.id} carries A9, which exists because a person selected one solution, and the run records neither a decision gate nor a choice on that stage — the decision happened and is on nobody's record`);
    }

    for (const d of decisions.filter(x => String(x.kind) === 'choice')) {
      if (d.superseded_by) continue;
      const at = String(d.at || '');
      if (!at || at < DECISIONS_RECORDED_FROM) continue;
      const s = stages.find(x => String(x.id) === String(d.stage));
      if (!s) continue;
      for (const aid of arr(s.artifacts).map(String)) {
        if (writtenFromChoice(d.stage).includes(aid)) continue;
        const a = A[aid];
        if (!a) continue;
        const made = String(a.produced_at || a.assembled_at || '');
        if (!made) continue;
        checked++;
        if (made > at)
          bad.push(`stage ${d.stage} records a choice on ${at} and ${aid} was produced on ${made} — ` +
            `the artifact is newer than the decision about it, so what a person chose is not what the ` +
            `stage now holds. Re-take the decision or say why the old one still stands`);
      }
    }

    add('C168', checked > 0, bad.length === 0, bad.length ? bad.join('; ')
      : `${checked} exception and selection claim(s) join both ways — every signed exception names a check this run still fails, every selection a stage carries is a decision somebody is recorded as making, and no recorded choice is older than the artifact it decided`);
  }

  return r;
}

const argv = process.argv.slice(2);
const flag = n => { const i = argv.indexOf(`--${n}`); return i === -1 ? null : (argv[i + 1] ?? ''); };
const has = n => argv.includes(`--${n}`);

const wantedDoc = argv.includes('--document') ? argv[argv.indexOf('--document') + 1] : null;
let dir = argv.find(a => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--gate'
                                            && argv[argv.indexOf(a) - 1] !== '--document');
if (argv.includes('--estate')) {
  const { runDirs: allRuns, FIXTURES_ROOT: CORPUS } = await import('./run-files.mjs');
  for (const d of allRuns(CORPUS)) {
    const r = capture('node', [process.argv[1], d, '--estate-line'], { endsWith: END_LINE });
    if (!r.complete || r.code !== 0) { console.log(`${basename(d)}\t\t${r.why || `exit ${r.code}`}`); continue; }
    console.log(r.out.split('\n').find(l => l.includes('\t')) ?? `${basename(d)}\t\tno line was produced`);
  }
  console.log(END_LINE);
  process.exit(0);
}

let finishedLine = null;
if (!dir && !has('estate')) {
  const open = (() => { try { return openRuns() } catch { return [] } })();
  if (open.length === 1) dir = open[0];
  else if (open.length > 1)
    console.error(twoRunsRefusal(open, RUNS_ROOT));
  else {
    finishedLine = noOpenRunLine();
    if (!finishedLine) {
      console.error('There is no run in progress, so there is nothing to check. Start one with the task "SPOCK: start a run".');
      process.exit(2);
    }
  }
}

if (!dir && finishedLine) {
  const { runDirs: finishedDirs } = await import('./run-files.mjs');
  const owes = finishedDirs(RUNS_ROOT).map(d => {
    try { return [basename(d), signAgainLine(frontmatter(readFileSync(join(d, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'))]; }
    catch { return [basename(d), null]; }
  }).filter(([, line]) => line);
  console.log(owes.length ? `${finishedLine}. ` + owes.map(([id, line]) => `${owes.length > 1 ? id : 'It'} fails C38: ${line}.`).join(' ')
    : `${finishedLine}. There is nothing unfinished for this task to check.`);
  process.exit(owes.length && !has('gates') ? 1 : 0);
}

if (!dir) {
  console.error('usage: node .github/scripts/check.mjs [{runs_root}/<run_id>] [--gate Q2] [--gates] [--document A3]');
  console.error('       with no run named, the run that is unfinished');
  console.error('       --gate Q2      run one named quality gate and report only that gate');
  console.error('       --gates        report which of Q1–Q7 the build can actually run');
  console.error('       --document A3  what this run\'s checks say about one document, as it lands. Not a gate');
  process.exit(2);
}
if (!isAbsolute(dir) && !existsSync(dir) && existsSync(resolvePath(CALLER_CWD, dir))) dir = resolvePath(CALLER_CWD, dir);
if (!existsSync(dir) || !statSync(dir).isDirectory()) { console.error(`no such run directory: ${dir}`); process.exit(2); }

let wanted = flag('gate');
const wantedAuto = wanted === '';
if (wantedAuto) wanted = null;
if (wanted !== null && !QUALITY_GATES[wanted]) {
  console.error(`no such quality gate: "${wanted}". The gates are ${Object.keys(QUALITY_GATES).join(', ')}`);
  process.exit(2);
}

const runId = basename(dir);
const artifacts = {};
let runState = null;
let parseFailed = false;
let recordParseFailed = false;
const unreadHere = [];
const refuseUnread = what => {
  if (has('findings')) {
    for (const u of unreadHere) console.log(['UNREAD', escapeCell(u.rel), escapeCell(u.why)].join('\t'));
    console.log(END_LINE);
  }
  console.error(`\nRefusing to report gate results on unparsed ${what}.`);
  process.exit(2);
};
const looseMaterial = [];

const stateFile = join(dir, 'RUN-STATE.md');
if (existsSync(stateFile)) {
  try {
    runState = frontmatter(readFileSync(stateFile, 'utf8'), 'RUN-STATE.md');
    runState.__file = 'RUN-STATE.md';
  } catch (e) {
    console.error(`  PARSE FAIL  RUN-STATE.md\n              ${e.message}`);
    unreadHere.push({ rel: 'RUN-STATE.md', why: e.message });
    parseFailed = true;
  }
}
if (runState) {
  ENVELOPE_AT_APPROVAL = envelopeAtApproval(dir);
  if (ENVELOPE_AT_APPROVAL) VIEW_ABS = new Map([...envelopeView(dir).texts].map(([rel, t]) => [resolvePath(dir, rel), t]));
}

if (wantedAuto) {
  const open = (Array.isArray(runState && runState.stages) ? runState.stages : [])
    .map(x => ({ ...x, id: Number(x.id) })).sort((x, y) => x.id - y.id)
    .find(x => x.status !== 'accepted' && x.status !== 'superseded');
  if (!open) { console.log(`every stage of ${runId} is accepted — there is no gate left to run.`); process.exit(0); }
  wanted = (GATES[open.id] || {}).quality;
  if (!wanted) { console.error(`stage ${open.id} declares no quality gate.`); process.exit(2); }
  console.log(`${runId} is at stage ${open.id} (${open.status}), so the gate to run is ${wanted}.\n`);
}

for (const a of runArtifacts(dir)) {
  try {
    const fm = frontmatter(viewRead(a.abs), a.rel);
    fm.__file = a.rel;
    if (!fm.artifact_id) throw new YamlError(`${a.rel}: no artifact_id`);
    artifacts[fm.artifact_id] = fm;
  } catch (e) {
    const loose = /no frontmatter \(first line must be ---\)/.test(e.message)
                  && a.rel.startsWith(STAGE_DIRS[1] + '/');
    if (loose) { looseMaterial.push(a.rel); continue; }
    console.error(`  PARSE FAIL  ${a.rel}\n              ${e.message}`);
    unreadHere.push({ rel: a.rel, why: e.message });
    parseFailed = true;
  }
}

if (parseFailed) refuseUnread('artifacts');

const found = Object.keys(artifacts).sort();
if (!argv.includes('--for-writer') && !has('estate-line') && !has('reads'))
  console.log(`\nRun ${runId} — ${found.length} artifacts: ${found.join(' ')}\n`);

const NEVER_FOLDED = new Set(['run_id', 'artifact_id', 'record_id', 'item_id', '__file', '__own',
  'bounds_hit', 'trace_id', 'scores_basis', 'constraint_basis',
  'confidence_basis', 'structure_basis', 'workflow', 'modified_by', 'revisions',
  'sources', 'external_sources', 'could_not_verify', 'standards_basis', 'egress_basis', 'status',
  'ost_role', 'store', 'scope', 'decision', 'assembled_at', 'assembled_from',
  'read_undeclared']);
const FOLD_SINGULARS = (() => {
  try {
    const { shapes } = schemas();
    const out = {};
    for (const [id, sh] of Object.entries(shapes || {})) {
      const m = {};
      for (const f of (sh || [])) if (f && f.list && f.singular) m[f.singular] = f.name;
      out[id] = m;
    }
    return out;
  } catch { return { A6: { card: 'cards' } }; }
})();

for (const a of Object.values(artifacts)) a.__own = new Set(Object.keys(a));

const FOLD_CLAIMS = new Map();

for (const rec of runRecordsViewed(dir)) {
  const a = rec.id && artifacts[rec.id];
  if (!a) continue;
  let fm;
  try { fm = frontmatter(viewRead(rec.abs), rec.rel); }
  catch (e) { console.error(`  PARSE FAIL  ${rec.rel}\n              ${e.message}`); unreadHere.push({ rel: rec.rel, why: e.message }); recordParseFailed = true; continue; }
  for (const [k, v] of Object.entries(fm)) {
    if (NEVER_FOLDED.has(k)) continue;
    const sing = FOLD_SINGULARS[rec.id] || {};
    const key = sing[k] || k;
    if (sing[k]) { (a[key] ||= []).push(v); continue; }
    const ck = `${rec.id}\u0000${key}`;
    if (Array.isArray(v) && v.length) FOLD_CLAIMS.set(ck, [...(FOLD_CLAIMS.get(ck) || []), rec.rel]);
    if (a[key] === undefined) a[key] = v;
  }
}

if (recordParseFailed) refuseUnread('records');

const laterBeingWritten = new Set();
if (wanted && runState && QUALITY_GATES[wanted]) {
  const at = Number(QUALITY_GATES[wanted].stage);
  const holdsAResult = s => s.status === 'accepted' || !!s.quality_gate || arr(s.decision_gates).length > 0;
  for (const s of arr(runState.stages)) if (Number(s.id) > at && !holdsAResult(s)) laterBeingWritten.add(Number(s.id));
}
const results = checks(artifacts, runId, runState);
for (const r of laterBeingWritten.size ? results : []) {
  if (!r.applies || r.ok || !Array.isArray(r.findings) || !r.findings.length) continue;
  const keep = r.findings.filter(f => !(f.stage !== null && f.stage !== undefined && laterBeingWritten.has(Number(f.stage))));
  if (keep.length === r.findings.length) continue;
  const left = [...new Set(r.findings.filter(f => !keep.includes(f)).map(f => Number(f.stage)))].sort((x, y) => x - y);
  if (keep.length) { r.findings = keep; r.detail = keep.map(f => f.fragment).join('; '); continue; }
  r.ok = true; r.findings = [];
  r.detail = `its findings are about stage ${left.join(' and ')}, still being written, which ${left.length === 1 ? 'its' : 'their'} own gate reads`;
}
const gateContradictions = g => ((g && Array.isArray(g.failed) && g.failed.includes(CONTRADICTION_CHECK))
  ? contradictionIdsOf((results.find(x => x.id === CONTRADICTION_CHECK) || {}).detail) : []);

if (has('reads')) {
  for (const r of results)
    console.log([r.id, r.applies ? 'applies' : 'not-applicable', [...new Set(r.reads || [])].sort().join(',') || '-'].join('\t'));
  console.log(END_LINE);
  process.exit(0);
}

const width = Math.max(...results.map(r => r.id.length));

const printShapes = r => {
  for (const l of shapeLinesOf(r.id, r.findings)) console.log(`       ${l.document ? `passes in ${l.document}` : 'passes'}: ${l.text}`);
};

const stageHoldsFor = (() => {
  let c = null;
  try { c = readContracts(); } catch { c = null; }
  const present = new Set(Object.keys(artifacts));
  return gateId => {
    if (!c || c.steps === 0) return null;
    const stage = Number(QUALITY_GATES[gateId] && QUALITY_GATES[gateId].stage);
    const owes = [...(c.produces.get(stage) || [])];
    return { owes, has: owes.filter(id => present.has(id)) };
  };
})();

const gateRunAt = gateId => {
  if (!runState) return undefined;
  for (const st of (Array.isArray(runState.stages) ? runState.stages : [])) {
    const q = st && st.quality_gate;
    if (q && q.id === gateId && q.run_at) return String(q.run_at);
    const d = recordedDecisions(st).find(x => x && x.id === gateId);
    if (d && d.decided_at) return String(d.decided_at);
  }
  return undefined;
};

const IMPLEMENTED = new Set([...readFileSync(new URL(import.meta.url)).toString().matchAll(/add\(\s*'(C\d+)'/g)].map(m => m[1]));

if (has('gates')) {
  console.log('Quality gates — what the build can run today\n');
  let complete = 0;
  const unwritten = new Set();
  for (const id of Object.keys(QUALITY_GATES)) {
    const g = gateResult(id, results, stageHoldsFor(id), gateRunAt(id));
    if (!g.missing.length) complete++;
    g.missing.forEach(c => unwritten.add(c));
    const mark = g.missing.length ? '--' : 'ok';
    const detail = g.missing.length
      ? `${g.required.length - g.missing.length}/${g.required.length} checks written — missing ${g.missing.join(' ')}`
      : `all ${g.required.length} checks written`;
    console.log(`  ${mark}  ${id}  stage ${g.stage} ${g.name.padEnd(11)} ${detail}`);
  }
  console.log(`\n${complete}/7 quality gates can be run in full. ${unwritten.size} distinct checks are unwritten.`);
  console.log('A gate naming a check the build has not written cannot report that stage well formed.');

  const bound = JUDGED_RULES.filter(r => r.gate);
  const ranAll = bound.filter(r => r.instrument === 'mechanical').length;
  const judgedAll = bound.filter(r => r.instrument === 'judged').length;
  const mechAll = bound.filter(r => r.instrument === 'mechanisable').length;
  const gatesJudged = Object.keys(QUALITY_GATES)
    .filter(id => { const t = judgedTally(id); return t.judged > 0 && t.notRun === 0; }).length;
  const gatesWithNoJudgedHalf = Object.keys(QUALITY_GATES)
    .filter(id => judgedTally(id).judged === 0);
  console.log('\nQuality rules — which half of each gate runs\n');
  for (const id of Object.keys(QUALITY_GATES)) {
    const t = judgedTally(id);
    const mark = t.notRun ? '--' : 'ok';
    console.log(`  ${mark}  ${id}  ${String(t.ran).padStart(2)}/${t.total} decided by a check` +
      (t.notRun ? ` — ${t.notRun} not run (${t.judged} ${t.judged === 1 ? 'needs' : 'need'} a judge, ` +
        `${t.mechanisable} ${t.mechanisable === 1 ? 'needs' : 'need'} a check nobody wrote)`
        : ' — every rule at this gate; it has no judged half'));
  }
  const un = judgedTally(null);
  if (un.total) console.log(`  --  ungated  ${un.ran}/${un.total} decided by a check — ${un.notRun} not run (methodology-guidance owns no gate)`);
  console.log(`\n${gatesJudged}/7 quality gates run their judged half. ` +
    `${ranAll} of ${bound.length} gate-bound rules are decided by a check; ${judgedAll} need a judge and ${mechAll} need a check nobody has written.`);
  if (gatesWithNoJudgedHalf.length)
    console.log(`${gatesWithNoJudgedHalf.join(', ')} ${gatesWithNoJudgedHalf.length === 1 ? 'has' : 'have'} no judged half at all — ` +
      'every rule there is decided by a check. That is not the same as a judged half that ran, and it is not counted as one.');
  console.log(`Why the judged half does not run: ${JUDGED_ABSENT_REASON}, and ${mechAll} rules need only a check nobody has written.`);
  console.log('A gate that reports a pass without naming what it could not check is the failure this build exists to stop.\n');
  process.exit(0);
}

if (wantedDoc) {
  const id = String(wantedDoc).trim();
  if (!/^A\d+[a-z]?$/.test(id)) {
    console.error(`--document takes an artifact id like A3, not "${wantedDoc}"`);
    process.exit(2);
  }
  const held = Boolean(artifacts[id]);
  const about = results.filter(r => (r.reads || []).includes(id));
  const forWriter = argv.includes('--for-writer');
  if (!forWriter) console.log(`${id} — ${runId}${held ? '' : ', which this run does not hold'}\n`);

  if (!held) {
    console.log(`Nothing to check. ${id} has not been written yet.`);
    console.log(`\nThis is not a gate. It says what the checks read, not whether a stage may be accepted.\n`);
    process.exit(3);
  }

  if (forWriter) {
    const ownFile = (artifacts[id] || {}).__file || null;
    const namesMe = new RegExp(`^${id}(?=[/:\\s])`);
    const forThisDocument = r =>
      (r.reads || []).length <= 3
      || (ownFile && String(r.detail || '').includes(ownFile))
      || namesMe.test(String(r.detail || ''));
    const signedHere = new Set(signedExceptions(runState, STAGE_OF_ARTIFACT_FOR(runState)(id))
      .flatMap(signedChecks).filter(c => !NEVER_SIGNABLE.includes(c)));
    const docsForStage = runArtifacts(dir);
    const myStage = STAGE_OF_ARTIFACT_FOR(runState)(id);
    const signedThere = r => {
      if (NEVER_SIGNABLE.includes(String(r.id))) return false;
      const stages = acceptedStagesOf(r.detail, docsForStage, runState, myStage);
      return stages.some(m => {
        const st = ((runState && runState.stages) || []).find(x => Number(x.id) === m);
        return Boolean(st) && coveringSignatures(runState, st).has(String(r.id));
      });
    };
    const scopeOf = r => signedHere.has(String(r.id)) || signedThere(r) ? 'signed' : forThisDocument(r) ? 'doc' : 'run';
    const rows = [];
    for (const r of about) {
      if (!r.applies || r.ok) continue;
      const fs = r.findings && r.findings.length ? r.findings : [{ fragment: String(r.detail == null ? '' : r.detail), document: null }];
      const scope = scopeOf(r);
      for (const f of fs)
        rows.push([scope === 'run' && f.document === id ? 'doc' : scope, f.fragment, r.id, f.document || '-', shapeOf(r.id, f.document) || '-']);
    }
    for (const row of rows) console.log(row.join('\t'));
    console.log(END_LINE);
    process.exit(rows.some(row => row[0] === 'doc') ? 1 : 0);
  }

  const width = Math.max(...about.map(r => r.id.length), 4);
  let bad = 0, skipped = 0;
  for (const r of about) {
    if (!r.applies) { console.log(`  --   ${r.id.padEnd(width)}  ${r.detail}`); skipped++; continue; }
    if (r.ok) console.log(`  ok   ${r.id.padEnd(width)}  ${r.detail}`);
    else { console.log(`  FAIL ${r.id.padEnd(width)} ${r.detail}`); printShapes(r); bad++; }
  }

  const unattributed = results.filter(r => !(r.reads || []).length).length;
  console.log('');
  if (!about.length) {
    console.log(`**No check in this build read ${id}.** That is not a pass — nothing has examined it.`);
    console.log(`\nThis is not a gate. It says what the checks read, not whether a stage may be accepted.\n`);
    process.exit(3);
  }
  const swept = about.filter(r => (r.reads || []).length > 3).length;
  console.log(`${about.length} check(s) read ${id} — ${about.length - bad - skipped} passed, ${bad} failed, ` +
    `${skipped} did not apply.`);
  console.log(`${unattributed} of this run's ${results.length} checks read no document at all and are not counted here.`);
  if (swept) console.log(`${swept} of them examined several documents at once, so a verdict above may concern another.`);
  const sweptBad = about.filter(r => r.applies && !r.ok && (r.reads || []).length > 3).length;
  if (bad && sweptBad) console.log(`${sweptBad} of the ${bad} failure(s) came from a check examining several documents — read the detail before assuming ${id} is the one at fault.`);
  console.log(`\nThis is not a gate. ${bad ? 'Fix what failed, then' : 'When the stage is complete,'} ` +
    `run the stage's gate, which is what decides.\n`);
  process.exit(bad ? 1 : 0);
}

if (wanted) {
  const g = gateResult(wanted, results, stageHoldsFor(wanted), gateRunAt(wanted));
  const findingsView = has('findings');
  if (findingsView && has('record')) {
    console.error('\n--findings is a view of the gate and records nothing; record the gate without it.\n');
    process.exit(2);
  }
  console.log(`${g.id} — stage ${g.stage} ${g.name}\n`);
  for (const c of g.required) {
    const r = results.find(x => x.id === c);
    if (findingsView) {
      if (r && r.applies && !r.ok)
        for (const f of (r.findings.length ? r.findings : [{ fragment: String(r.detail == null ? '' : r.detail), document: null, stage: null }]))
          console.log(['FINDING', c, f.document || '-', f.stage == null ? '-' : f.stage, escapeCell(f.fragment), escapeCell(shapeOf(c, f.document) || '-')].join('\t'));
      continue;
    }
    if (!r) {
      const written = IMPLEMENTED.has(c);
      console.log(`  ${(written ? '--' : 'MISSING').padEnd(7)}${c.padEnd(width)} ` +
        (written
          ? 'did not run — this stage has produced nothing for it to read'
          : 'not implemented — this gate cannot be run in full'));
      continue;
    }
    if (!r.applies) { console.log(`  --   ${c.padEnd(width)}  ${r.detail}`); continue; }
    if (r.ok) console.log(`  ok   ${c.padEnd(width)}  ${r.detail}`);
    else { console.log(`  FAIL ${c.padEnd(width)} ${r.detail}`); printShapes(r); }
  }
  if (findingsView) {
    const failing = g.required.map(c => results.find(x => x.id === c)).filter(r => r && r.applies && !r.ok);
    const docsHere = runArtifacts(dir);
    const statusOf = n => { const s = arr(runState && runState.stages).find(x => Number(x.id) === Number(n)); return s && s.status ? String(s.status) : '-'; };
    for (const id of [...new Set(failing.flatMap(r => r.findings.map(f => f.document)).filter(Boolean))]) {
      const d = docsHere.find(x => String(x.id) === String(id));
      if (d) console.log(['DOCUMENT', id, escapeCell(d.rel), d.stage == null ? '-' : d.stage, d.stage == null ? '-' : statusOf(d.stage)].join('\t'));
    }
    const renamedHere = folderRenamed(runState && runState.run_id, basename(dir));
    const rid = (runState && runState.run_id) || basename(dir);
    const gs = arr(runState && runState.stages).find(x => Number(x.id) === Number(g.stage));
    const onAcc = g.verdict === 'fail' && !g.missing.length && !g.empty
      ? onAcceptedOf(failing.map(r => ({ id: r.id, detail: r.detail })), docsHere, runState, g.stage) : [];
    const covered = gs ? coveringSignatures(runState, { ...gs, quality_gate: { ...(gs.quality_gate || {}), id: g.id, result: 'fail',
      failed: g.failed, on_accepted: onAcc, contradictions: gateContradictions(g) } }) : new Map();
    for (const r of failing) {
      const c = String(r.id), v = covered.get(c);
      const route = cannotSign(c, renamedHere) ? ['never', unsignableLines([c], rid, renamedHere)[1].replace(/^\s*C\d+: /, '')]
        : v ? ['signed', `${c} is ${Number(v.d.stage) === Number(g.stage) ? 'signed on this stage' : `carried from stage ${v.d.stage}'s sign-off`} ` +
            `by ${v.d.by}, so nobody signs it again.`]
        : ['open', '-'];
      console.log(['SIGN', c, route[0], escapeCell(route[1])].join('\t'));
    }
    const cleanView = g.verdict === 'fail' && !g.missing.length && !g.empty;
    console.log(['GATE', g.id, g.verdict, cleanView ? 'yes' : 'no', g.failed.length ? g.failed.join(',') : '-'].join('\t'));
  }
  for (const r of judgedFor(wanted).filter(r => !findingsView && r.instrument !== 'mechanical')) {
    console.log(`  ??   ${(r.instrument === 'judged' ? 'judged' : r.blocked_by ? 'blocked' : 'unwritten').padEnd(width)}  not run — ${r.rule}` +
      (r.blocked_by ? `\n       ${' '.repeat(width)}  blocked on ${r.blocked_by}` : ''));
  }
  const ok = g.ran.length - g.failed.length;
  const unwritten = g.missing.filter(c => !IMPLEMENTED.has(c));
  const silent = g.missing.filter(c => IMPLEMENTED.has(c));
  console.log(`\n${ok}/${g.ran.length} of ${g.id}'s runnable checks passed` +
    (g.skipped.length ? `, ${g.skipped.length} not applicable` : '') +
    (silent.length ? `, ${silent.length} written and produced no result on this run` : '') +
    (unwritten.length ? `, ${unwritten.length} not implemented` : '') + '.');
  if (!findingsView) {
    const heads = needLines(nextStageNeeds(null, g.stage, dir), 'gate');
    if (heads.length) console.log(`\n${heads.join('\n')}`);
  }
  const onAccepted = g.verdict === 'fail' && !g.missing.length && !g.empty
    ? onAcceptedOf(g.failed.map(c => ({ id: c, detail: (results.find(x => x.id === c) || {}).detail })), runArtifacts(dir), runState, g.stage)
    : [];
  if (has('record')) {
    const by = flag('by');
    if (!by) {
      console.error('\n--record needs --by "<who or what ran it>" — a gate record with no runner is what C51 refuses.\n');
      process.exit(2);
    }
    const verdict = g.verdict === 'pass' ? 'pass' : 'fail';
    const cleanFail = verdict === 'fail' && !g.missing.length && !g.empty;
    const failedArg = cleanFail && g.failed.length
      ? ['--failed', g.failed.join(','), ...(onAccepted.length ? ['--on-accepted', onAccepted.join(',')] : []),
         ...(gateContradictions(g).length ? ['--contradictions', gateContradictions(g).join(',')] : [])] : [];
    if (g.verdict === 'incomplete') {
      console.error(`\n${g.id} is INCOMPLETE and there is no verdict to record. Incomplete is not a pass, ` +
        'and recording it as a fail would say a check found something wrong.\n');
      process.exit(3);
    }
    const w = capture('node', ['.github/scripts/run-state.mjs', 'gate', basename(dir), String(g.stage), g.id, verdict, '--by', by, ...failedArg]);
    if (w.code !== 0) {
      console.error(`\nthe writer refused the record: ${(w.out + w.err).trim()}\n`);
      process.exit(1);
    }
    if (!w.complete) {
      console.error(`\nthe recorder ran and its answer could not be read in full — ${w.why}.\n` +
        `        The record may or may not have been written. Read ${join(basename(dir), 'RUN-STATE.md')} ` +
        `back before recording ${g.id} again.\n`);
      process.exit(2);
    }
    console.log(`\nRecorded, not retyped: ${w.out.trim()}`);
  }

  if (g.verdict === 'fail') {
    const gs = (Array.isArray(runState && runState.stages) ? runState.stages : [])
      .find(x => Number(x.id) === Number(g.stage));
    const syn = gs && { ...gs, quality_gate: { ...(gs.quality_gate || {}), id: g.id, result: 'fail', failed: g.failed, on_accepted: onAccepted,
      contradictions: gateContradictions(g) } };
    const line = syn && signatureLine(runState, syn);
    if (line) {
      console.log(`\n${g.id} failed, and every check it failed is signed.\n${line}\n` +
        `The stage advances carrying the failure. The gate result stays "fail" wherever it is shown, ` +
        `and ${NEVER_SIGNABLE.join(', ')} can never be signed.\n`);
    } else {
      const docsOnDisk = runArtifacts(dir);
      const coveredBy = new Map();
      for (const [c, v] of (syn ? coveringSignatures(runState, syn) : new Map())) coveredBy.set(v.d, [...(coveredBy.get(v.d) || []), c]);
      const coveredIds = [...coveredBy.values()].flat();
      const coveredLine = [...coveredBy].map(([d, cs]) => `${cs.join(', ')} ${cs.length === 1 ? 'is' : 'are'} ` +
        `${Number(d.stage) === Number(g.stage) ? 'signed on this stage' : `carried from stage ${d.stage}'s sign-off`} by ` +
        `${d.by}, so nobody signs ${cs.length === 1 ? 'it' : 'them'} again.\n`).join('');
      const about = g.failed.filter(c => !coveredIds.includes(c)).map(c => ({ id: c,
        stages: acceptedStagesOf((results.find(x => x.id === c) || {}).detail, docsOnDisk, runState, g.stage) }));
      const wholly = about.length && about.every(a => a.stages.length) && !g.missing.length && !g.empty;
      const stages = wholly ? [...new Set(about.flatMap(a => a.stages))] : [];
      const which = `${stageWords(stages)}, which ${stages.length === 1 ? 'is' : 'are'} already accepted`;
      const renamed = folderRenamed(runState && runState.run_id, basename(dir));
      const never = about.map(a => a.id).filter(id => cannotSign(id, renamed));
      const one = about.length === 1;
      const signable = about.map(a => a.id).filter(id => !cannotSign(id, renamed));
      const fixes = unsignableLines(never, (runState && runState.run_id) || basename(dir), renamed).join('\n');
      const signLater = signable.length ? `${signOffLine(signable, true)}\n` : '';
      if (wholly && never.length) {
        console.log(`\n${g.id} failed on ${one ? 'a finding' : 'findings'} about ${which}, so it does not go back to the skill.\n` +
          `${fixes}\n${signLater}`);
      } else if (never.length) {
        console.log(`\n${g.id} failed.${signable.length ? ` The stage returns to the skill for ${signable.join(', ')}.` : ''}\n` +
          `${fixes}\n${signLater}`);
      } else if (wholly) {
        console.log(`\n${g.id} failed on ${one ? 'a finding' : 'findings'} about ${which}, so it does not go back to the skill. Where the run ` +
          `cannot meet ${one ? 'it' : 'them'}, a person signs ${one ? 'it' : 'them'} check by check and the stage advances carrying the failure — "${SIGN_OFF_TASK}".\n`);
      } else {
        const boxes = signable.length ? `${signOffBoxLines(signable).join('\n')}\n` : '';
        console.log(`\n${g.id} failed. The stage does not reach a person. It returns to the skill.\n` +
          `Where the run genuinely cannot satisfy one of these, a person signs it check by check and the ` +
          `stage advances carrying the failure — "SPOCK: sign off a check this run cannot meet".\n${boxes}`);
      }
      if (coveredLine) console.log(coveredLine);
    }
    if (findingsView) console.log(END_LINE);
    process.exit(1);
  }
  if (g.verdict === 'incomplete') {
    if (g.empty)
      console.log(`\n${g.id} is INCOMPLETE — stage ${g.stage} holds none of ${g.owes.join(', ')}. ` +
        `A gate cannot pass on a stage that has produced nothing.`);
    if (g.missing.length)
      console.log(`\n${g.id} is INCOMPLETE — ` +
        (unwritten.length ? `${unwritten.join(', ')} ${unwritten.length === 1 ? 'is' : 'are'} not implemented` : '') +
        (unwritten.length && silent.length ? '; ' : '') +
        (silent.length ? `${silent.join(', ')} ${silent.length === 1 ? 'is' : 'are'} written and produced no result on this run` : '') + '.');
    console.log('Nothing here failed, and that is not the same as the stage being well formed.\n');
    if (findingsView) console.log(END_LINE);
    process.exit(3);
  }
  const jt = g.judged;
  if (jt.notRun) {
    console.log(`\n${g.id} passed its mechanical half. ${jt.notRun} of its ${jt.total} quality rules did not run ` +
      `(${jt.judged} ${jt.judged === 1 ? 'needs' : 'need'} a judge, ` +
      `${jt.mechanisable} ${jt.mechanisable === 1 ? 'needs' : 'need'} a check nobody has written).`);
    console.log(`Reason: ${jt.reason}. This is a pass on the stage's form, not on its quality.\n`);
  } else {
    console.log(`\n${g.id} passed, both halves. Ready for its human decision gate.\n`);
  }
  if (findingsView) console.log(END_LINE);
  process.exit(0);
}

if (has('estate-line')) {
  const failing = results.filter(r => r.applies && !r.ok).map(r => r.id);
  console.log(`${basename(dir)}\t${failing.join(' ')}`);
  console.log(END_LINE);
  process.exit(0);
}

let failed = 0;
for (const r of results) {
  if (!r.applies) { console.log(`  --  ${r.id.padEnd(width)}  ${r.detail}`); continue; }
  if (r.ok) console.log(`  ok  ${r.id.padEnd(width)}  ${r.detail}`);
  else { console.log(`  FAIL ${r.id.padEnd(width)} ${r.detail}`); printShapes(r); failed++; }
}

const applied = results.filter(r => r.applies).length;
const skipped = results.length - applied;
console.log(`\n${applied - failed}/${applied} checks passed${skipped ? `, ${skipped} not applicable` : ''}.`);
if (runState && resolvePath(join(RUNS_ROOT, runId)) === resolvePath(dir)) {
  const edited = editedAfterAcceptance(runId, runState);
  if (edited.length) {
    console.log('\nReported, not a failure:');
    for (const e of edited) console.log(`  ${editedLine(e).join(' ')}`);
  }
}

{
  const registered = new Set([...Object.values(QUALITY_GATES).flatMap(g => g.checks), ...UNIVERSAL]);
  const dated = results.filter(r => !r.applies && /\bpostdates?\b|\bpredates?\b|\bor later\b|written before/i.test(String(r.detail || ''))).length;
  console.log(`Read against ${applied} of the ${registered.size} registered checks. ` +
    `Of the ${skipped} that did not apply, ${dated} ${dated === 1 ? 'says' : 'say'} the rule postdates ` +
    `this run and ${skipped - dated} ${skipped - dated === 1 ? 'says' : 'say'} the artifact it reads is ` +
    `not here — taken from the reasons the checks gave, not from a property of the check. A run is only ` +
    `ever read against the checks its own artifacts and its own date reach.`);
}

const gatesComplete = Object.keys(QUALITY_GATES).filter(id => !gateResult(id, results, stageHoldsFor(id)).missing.length);
console.log(`${gatesComplete.length}/7 quality gates can be run in full` +
  (gatesComplete.length ? `: ${gatesComplete.join(' ')}` : ' — every gate names a check nobody has written') +
  '. See --gates.');

const notRunTotal = JUDGED_RULES.filter(r => r.gate && r.instrument !== 'mechanical').length;
console.log(`${notRunTotal} of ${JUDGED_RULES.filter(r => r.gate).length} gate-bound quality rules did not run. See --gates.`);

if (failed) {
  console.log('\nThe stage does not reach a person. It returns to the skill.');
  console.log('Where the run genuinely cannot satisfy a check, a person signs it and the stage advances');
  console.log('carrying the failure — "SPOCK: sign off a check this run cannot meet". The result stays "fail".');
  process.exit(1);
}

if (!Object.keys(artifacts).length) {
  console.log('\nThis run holds no artifact. Nothing failed, and nothing was checked that needed one — ' +
    `${skipped} of the ${results.length} checks did not apply because there was nothing for them to read.`);
  console.log('A gate cannot pass on a run that has produced nothing, and this is not a pass.\n');
  process.exit(3);
}
{
  const have = new Map();
  for (const a of runArtifacts(dir)) (have.get(Number(a.stage)) || have.set(Number(a.stage), new Set()).get(Number(a.stage))).add(a.id);
  const now = runState ? standing(runState, have) : null;
  if (now && now.stage === null) {
    console.log('Mechanical half passed, and every stage of this run is accepted.\n');
    process.exit(0);
  }
  const owed = now ? [...now.agent, ...now.person.map(p => p.id), ...now.later.map(l => l.id)] : [];
  if (owed.length) {
    console.log(`Mechanical half passed. Stage ${now.stage} is not ready for a decision: it still owes ${owed.join(', ')}.\n`);
    process.exit(0);
  }
}
console.log('Mechanical half passed. Ready for its human decision gate.\n');

#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { frontmatter } from './yaml.mjs';
import { runArtifacts, runRecords, runDirs, superseded, RUNS_ROOT, FIXTURES_ROOT } from './run-files.mjs';
import { retainedRecords } from './trace.mjs';
import { envelopeSplit, SPEC } from './artifact-fields.mjs';
import { recordedDecisions, accountedEdits, GATES, questionsFor, signedChecks, WORKFLOW_FAULT_WORDS } from './gates.mjs';
import { shownDate } from './fixed-messages.mjs';   // r1.13 · W44 · BD-133: a date a person reads is day first
import { envelopeView, envelopeAtApproval } from './envelope.mjs';

const ENVELOPE = (() => {
  const e = envelopeSplit(readFileSync(SPEC, 'utf8'));
  return new Set([...e.recordOnly, ...e.outputOnly, ...e.both, ...e.recordOwn, ...e.assembly]);
})();

const BASELINE = join('.github', 'registry', 'baseline.yaml');

const days = (a, b) => {
  const t0 = Date.parse(`${a}T00:00:00Z`), t1 = Date.parse(`${b}T00:00:00Z`);
  return Number.isFinite(t0) && Number.isFinite(t1) ? Math.round((t1 - t0) / 86400000) : null;
};
const arr = v => (Array.isArray(v) ? v : v == null ? [] : [v]);
const isDate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v.trim());

function runState(dir) {
  const p = join(dir, 'RUN-STATE.md');
  if (!existsSync(p)) return null;
  return frontmatter(readFileSync(p, 'utf8'), p);
}

function materialOf(artifacts) {
  const regimes = artifacts.map(a => a.fm.egress_basis).filter(Boolean);
  const PERMITS_REAL = ['approved', 'supplied'];
  const permitted = regimes.find(r => PERMITS_REAL.includes(r));
  if (permitted) return { kind: 'research regime permits real material', basis: permitted };
  if (regimes.length) return { kind: 'research regime not approved for real material', basis: regimes[0] };
  return { kind: 'no outward research', basis: 'nothing left the build' };
}

export function measure(dir) {
  const st = runState(dir);
  if (!st) return null;
  const viewed = envelopeAtApproval(dir) ? envelopeView(dir).texts : null;
  const textOf = x => { const v = viewed ? viewed.get(String(x.rel).split('\\').join('/')) : undefined; return v !== undefined ? v : readFileSync(x.abs, 'utf8'); };
  const artifacts = runArtifacts(dir)
    .map(a => ({ ...a, fm: frontmatter(textOf(a), a.rel) }))
    .filter(a => a.id);

  const records = runRecords(dir)
    .map(r => ({ ...r, fm: frontmatter(textOf(r), r.rel) }))
    .filter(r => r.id);
  const halves = [...artifacts, ...records];

  const stages = arr(st.stages).map(s => {
    const own = halves.filter(a => arr(s.artifacts).includes(a.id));
    const made = own.map(a => a.fm.produced_at).filter(isDate).sort();
    const q = s.quality_gate || {};
    const decisions = recordedDecisions(s).map(x => ({
      id: x.id || null,
      decided_at: isDate(x.decided_at) ? x.decided_at : null,
      decided_by: x.decided_by || null,
    }));
    const signed = decisions.map(x => x.decided_at).filter(Boolean).sort();
    const from = made[0] || null;
    const to = signed[signed.length - 1] || (isDate(q.run_at) && q.run_at) || null;
    return {
      id: s.id, name: s.name, status: s.status,
      artifacts: arr(s.artifacts),
      produced: from, quality_gate: q.id || null, quality_at: isDate(q.run_at) ? q.run_at : null,
      quality_result: q.result || null,
      judged_ran: Number(q.judged_ran || 0), judged_not_run: Number(q.judged_not_run || 0),
      decisions, decided_at: signed[signed.length - 1] || null,
      owner: s.owner && s.owner.name ? `${s.owner.name} (${s.owner.role || 'role not stated'})` : null,
      elapsed_days: from && to ? days(from, to) : null,
    };
  });

  const rounds = artifacts.flatMap(a => arr(a.fm.decision && a.fm.decision.refinements)
    .map(r => ({ artifact: a.id, gate: a.fm.decision.gate, what: r.what, by: r.by && r.by.name })));
  const notesDir = join(dir, 'notes');
  const refused = existsSync(notesDir)
    ? readdirSync(notesDir).filter(f => f.endsWith('.md') && f !== 'marked-edits.md').length : 0;

  const seenStages = arr(st.stages).filter(s => s.content_seen && typeof s.content_seen === 'object' && !Array.isArray(s.content_seen));
  const seenIds = new Set(seenStages.flatMap(s => arr(s.artifacts).map(String)));
  const seen = seenStages.length
    ? seenStages.flatMap(s => arr(s.rework).map(r => ({ stage: Number(s.id), after: (r && r.after) || null,
                                                        at: (r && r.at) || null, changed: (r && r.changed) || null })))
    : null;
  const revised = artifacts.filter(a => !seenIds.has(String(a.id)) && Number(a.fm.revisions) > 0);

  const editsFile = join(dir, 'notes', 'marked-edits.md');
  const { accounted } = existsSync(editsFile)
    ? accountedEdits(readFileSync(editsFile, 'utf8'))
    : { accounted: new Set() };
  const humanTouched = artifacts.filter(a => a.fm.modified_by === 'human');

  const unverified = artifacts.flatMap(a => arr(a.fm.could_not_verify).map(c => ({ artifact: a.id, ...c })));

  const seenGap = new Set();
  const unknowns = halves.flatMap(a => arr(a.fm.unknowns)
    .map(u => ({ artifact: a.id, field: (u && u.field) || String(u || '') }))
    .filter(u => {
      const k = `${u.artifact}|${u.field}`;
      if (seenGap.has(k)) return false;
      seenGap.add(k);
      return true;
    }));
  const bounds = [...new Set(halves.filter(a => arr(a.fm.bounds_hit).length).map(a => a.id))];

  const dates = [...stages.map(s => s.produced), ...stages.map(s => s.quality_at),
                 ...stages.flatMap(s => s.decisions.map(x => x.decided_at))].filter(Boolean).sort();

  return {
    run: basename(dir),
    status: st.status,
    stages_total: stages.length,
    stages_accepted: stages.filter(s => s.status === 'accepted').length,
    completed: st.status === 'complete',
    material: materialOf(artifacts),
    first: dates[0] || null,
    last: dates[dates.length - 1] || null,
    span_days: dates.length ? days(dates[0], dates[dates.length - 1]) : null,
    stages,
    artifacts: [...new Set(halves.map(a => a.id))].sort().map(id => ({
      id,
      rel: (artifacts.find(a => a.id === id) || halves.find(a => a.id === id)).rel,
      keys: [...new Set(halves.filter(a => a.id === id).flatMap(a => Object.keys(a.fm)))].sort(),
    })),
    quality_gates: stages.filter(s => s.quality_result).length,
    quality_passed: stages.filter(s => s.quality_result === 'pass').length,
    decision_gates: stages.reduce((n, s) => n + s.decisions.filter(x => x.id && x.decided_at).length, 0),
    judged_ran: stages.reduce((n, s) => n + s.judged_ran, 0),
    judged_not_run: stages.reduce((n, s) => n + s.judged_not_run, 0),
    rework: { rounds, refused, revised: revised.map(a => a.id), seen, superseded: superseded(dir).length },
    degradation: {
      know_how_not_read: arr(st.know_how_not_read).map(k => ({ stage: k.stage, body: k.body })),
      stale: arr(st.stale).length,
      could_not_verify: unverified.length,
      unknowns,
      bounds_hit: bounds,
      human_touched: humanTouched.map(a => a.id),
      accounted_for: humanTouched.filter(a => accounted.has(a.id)).map(a => a.id),
    },
    judged: arr(st.stages).flatMap(s => {
      const gate = (GATES[Number(s.id)] || {}).quality;
      const answers = (jh, extra = {}) => {
        if (!jh || !Array.isArray(jh.verdicts) || !jh.verdicts.length) return [];
        const qs = questionsFor(gate, String(jh.as_of || ''));
        return jh.verdicts.map((verdict, i) => ({
          stage: Number(s.id), gate, verdict,
          by: jh.by, role: jh.role, at: jh.at,
          rule: qs[i] ? qs[i].rule.rule : null,
          reach: qs[i] ? (qs[i].rule.reach || 'process') : null,
          question: qs[i] && qs[i].plain ? qs[i].text : null,
          ...extra,
        }));
      };
      return [...answers(s.judged_half),
        ...arr(st.judged_withdrawn).filter(w => w && String(w.stage) === String(s.id))
          .flatMap(w => answers(w, { withdrawn: w.withdrawn_at || null, withdrawn_reason: w.withdrawn_reason || null }))];
    }),
    cost: cost(dir),
    ...(() => {
      const faults = arr(st.decisions).filter(d => d && String(d.kind) === 'exception' && String(d.cause || '').trim() === 'workflow')
        .map(d => ({ stage: Number(d.stage), checks: signedChecks(d), reason: d.reason || null, by: d.by || null, role: d.role || null,
                     at: d.at || null, withdrawn: d.superseded_by || null }));
      return faults.length ? { workflow_faults: faults } : {};
    })(),
  };
}

function cost(dir) {
  const N = v => (typeof v === 'number' && Number.isFinite(v) ? v : Number.isFinite(Number(v)) ? Number(v) : null);
  const recs = retainedRecords(dir);
  const by_source = {};
  let anyUsage = false;
  for (const r of recs) {
    const src = r.source || 'otel';
    const b = by_source[src] || (by_source[src] = {
      traces: 0, model_calls: 0, tool_calls: 0,
      prompt_tokens: 0, completion_tokens: 0, cache_read_tokens: 0, cache_write_tokens: 0,
      credits: null, models: [],
    });
    b.traces++;
    b.model_calls += arr(r.chat).length;
    b.tool_calls += arr(r.execute_tool).length;
    for (const c of arr(r.chat)) {
      const inTok = N(c['gen_ai.usage.input_tokens'] ?? c.promptTokens);
      const outTok = N(c['gen_ai.usage.output_tokens'] ?? c.completionTokens);
      const cr = N(c['gen_ai.usage.cache_read_input_tokens']);
      const cw = N(c['gen_ai.usage.cache_creation_input_tokens']);
      if (inTok !== null) { b.prompt_tokens += inTok; anyUsage = true; }
      if (outTok !== null) { b.completion_tokens += outTok; anyUsage = true; }
      if (cr !== null) b.cache_read_tokens += cr;
      if (cw !== null) b.cache_write_tokens += cw;
      const cred = N(c.copilotCredits);
      if (cred !== null) b.credits = (b.credits || 0) + cred;
      const m = c['gen_ai.response.model'] || c.modelId;
      if (m && !b.models.includes(m)) b.models.push(m);
    }
  }
  for (const b of Object.values(by_source)) b.models.sort();
  return {
    state: !recs.length ? 'absent' : anyUsage ? 'measured' : 'partial',
    traces: recs.length,
    by_source,
  };
}

function judgedAcrossRuns(all) {
  const byRule = new Map();
  for (const m of all)
    for (const v of (m.judged || [])) {
      const key = v.rule || `${v.gate} position unresolved`;
      if (!byRule.has(key)) byRule.set(key, { gate: v.gate, stage: v.stage, reach: v.reach, yes: 0, no: 0, cannot_tell: 0, skipped: 0, withdrawn: 0, runs: new Set() });
      const e = byRule.get(key);
      if (v.verdict in e && v.verdict !== 'withdrawn') e[v.verdict]++;
      if (v.withdrawn) e.withdrawn++;
      e.runs.add(m.run);
    }
  return [...byRule].map(([rule, e]) => ({ rule, ...e, runs: e.runs.size }))
    .sort((a, b) => (b.no - a.no) || (b.cannot_tell - a.cannot_tell) || a.rule.localeCompare(b.rule));
}

function faultsAcrossRuns(all) {
  const byCheck = new Map();
  for (const m of all)
    for (const f of (m.workflow_faults || []))
      for (const check of (f.checks && f.checks.length ? f.checks : ['(no check named)'])) {
        if (!byCheck.has(check)) byCheck.set(check, { check, signed: 0, withdrawn: 0, runs: new Set(), behind: [] });
        const e = byCheck.get(check);
        if (f.withdrawn) e.withdrawn++; else e.signed++;
        e.runs.add(m.run);
        e.behind.push({ run: m.run, stage: f.stage, by: f.by || null, role: f.role || null, at: f.at || null,
                        withdrawn: f.withdrawn || null, reason: f.reason || null });
      }
  return [...byCheck.values()].map(e => ({ ...e, runs: [...e.runs].sort() }))
    .sort((a, b) => (b.signed - a.signed) || (b.withdrawn - a.withdrawn) || a.check.localeCompare(b.check));
}

function shapes(all) {
  const byId = new Map();
  for (const m of all)
    for (const a of m.artifacts) {
      if (!byId.has(a.id)) byId.set(a.id, []);
      byId.get(a.id).push({ run: m.run, keys: new Set(a.keys) });
    }
  const out = [];
  for (const [id, entries] of [...byId].sort()) {
    if (entries.length < 2) continue;
    const union = new Set(entries.flatMap(e => [...e.keys]).filter(k => !ENVELOPE.has(k)));
    const common = [...union].filter(k => entries.every(e => e.keys.has(k)));
    const divergent = [...union].filter(k => !entries.every(e => e.keys.has(k)))
      .map(k => ({ field: k, carried_by: entries.filter(e => e.keys.has(k)).map(e => e.run) }));
    out.push({ id, runs: entries.length, agreed: common.length, divergent });
  }
  return out;
}

function baselineState() {
  if (!existsSync(BASELINE)) return 'missing';
  const m = workflowText(BASELINE).match(/^state:\s*(\w+)/m);
  return m ? m[1] : 'unreadable';
}

function render(all) {
  const L = [];
  const base = baselineState();
  L.push(`Discovery metrics — ${all.length} committed run(s), read from the run records.`);
  L.push('');
  L.push(base === 'absent'
    ? 'S4 (speed) and S5 (quality) are comparative and the baseline record reads `absent`, so every'
    : `S4 and S5 compare against a baseline recorded as \`${base}\`.`);
  if (base === 'absent') L.push('duration below is one side of a comparison with no other side.');
  L.push('');

  for (const m of all) {
    L.push('─'.repeat(78));
    L.push(`${m.run}`);
    L.push(`  ${m.status} · ${m.stages_accepted} of ${m.stages_total} stage(s) accepted · ` +
           `${m.material.kind} (${m.material.basis})`);
    if (m.first) L.push(`  Dates on the record: ${shownDate(m.first)} → ${shownDate(m.last)}, ${m.span_days} calendar day(s)`);
    L.push('');
    L.push('  Stage                     produced     Q gate        decision        days  owner');
    for (const s of m.stages) {
      L.push(`  ${String(s.id).padEnd(2)} ${String(s.name || '').padEnd(22)} ` +
             `${(s.produced ? shownDate(s.produced) : '—').padEnd(12)} ` +
             `${(s.quality_gate ? `${s.quality_gate} ${s.quality_result || '—'}` : '—').padEnd(13)} ` +
             `${(s.decisions.length ? s.decisions.map(x => `${x.id} ${x.decided_at ? shownDate(x.decided_at) : '—'}`).join(' + ') : 'none').padEnd(15)} ` +
             `${String(s.elapsed_days == null ? '—' : s.elapsed_days).padEnd(5)} ` +
             `${s.owner || '—'}`);
    }
    L.push('');
    L.push(`  Gates: ${m.quality_passed}/${m.quality_gates} quality gate(s) passed · ` +
           `${m.decision_gates} human decision(s) recorded · ` +
           `${m.judged_not_run} of ${m.judged_ran + m.judged_not_run} gate-bound judged rule(s) did not run`);
    const rw = m.rework;
    L.push(`  Rework: ${rw.rounds.length} refinement round(s) · ` +
           `${rw.superseded} superseded artifact(s) · ` +
           `${rw.refused} file(s) retained in notes/, which no gate reads · ` +
           (rw.seen === null
             ? `${rw.revised.length} artifact(s) with revisions > 0`
             : `${rw.seen.length} round(s) of rework seen between gates` +
               (rw.revised.length ? ` and ${rw.revised.length} artifact(s) with revisions > 0 on stages the build did not see` : '')));
    for (const r of m.rework.rounds) L.push(`    ${r.gate} on ${r.artifact}: ${r.what} (${r.by || 'unnamed'})`);
    const d = m.degradation;
    L.push(`  Declared gaps: ${d.know_how_not_read.length} know-how gap(s) · ${d.stale} stale input(s) · ` +
           `${d.could_not_verify} unverifiable rule(s) · ${d.unknowns.length} unknown field(s) · ` +
           `${d.bounds_hit.length} artifact(s) that hit a bound`);
    const wf = m.workflow_faults || [];
    if (wf.length) {
      L.push(`  Sign-offs ${WORKFLOW_FAULT_WORDS}: ${wf.length}`);
      for (const f of wf)
        L.push(`    stage ${f.stage} · ${f.checks.join(', ')} · ${f.by || 'unnamed'}, ${f.role || 'no role'}, ${f.at ? shownDate(f.at) : 'undated'}` +
               `${f.withdrawn ? ` · withdrawn on ${shownDate(f.withdrawn)}` : ''}: ${f.reason || 'no reason given'}`);
    }
    if (d.human_touched.length)
      L.push(`  Edited by a person: ${d.human_touched.length} artifact(s) carry modified_by: human, ` +
             `${d.accounted_for.length} of them with an account in notes/marked-edits.md`);
    const c = m.cost;
    if (c.state === 'absent')
      L.push('  Cost: no trace retained — this run\'s tokens were never captured, and any figure for it came from outside the build.');
    else if (c.state === 'partial')
      L.push(`  Cost: ${c.traces} trace(s) retained and no usage attribute on any chat span — the reduction ran and the emitter sent no token counts.`);
    else {
      for (const [src, b] of Object.entries(c.by_source)) {
        L.push(`  Cost (${src}): ${b.prompt_tokens.toLocaleString('en-GB')} prompt · ` +
               `${b.completion_tokens.toLocaleString('en-GB')} completion · ` +
               `${b.cache_read_tokens.toLocaleString('en-GB')} cache read · ` +
               `${b.cache_write_tokens.toLocaleString('en-GB')} cache write`);
        L.push(`    ${b.model_calls} model call(s), ${b.tool_calls} tool call(s) over ${b.traces} trace(s)` +
               `${b.models.length ? ` — ${b.models.join(', ')}` : ''}`);
        L.push(b.credits === null
          ? '    Credits: not emitted by this source, and not derivable from tokens.'
          : `    Credits: ${b.credits.toFixed(1)}, measured per request rather than inferred.`);
      }
      if (Object.keys(c.by_source).length > 1) {
        L.push('    The sources are two measurements of the same requests and are never added together.');
        L.push('    Tokens differ by source and both are right: the journal counts once per turn, the trace');
        L.push('    counts every model call. Quote the journal for what a run cost, because credits are');
        L.push('    only measured there; quote the trace for what was actually processed.');
      }
    }
    L.push('');
  }

  const sh = shapes(all);
  if (sh.length) {
    L.push('─'.repeat(78));
    L.push('S3 · the same stage in two runs produces the same shape');
    L.push('');
    for (const s of sh) {
      L.push(`  ${s.id.padEnd(4)} ${s.runs} run(s) · ${s.agreed} field(s) agreed` +
             (s.divergent.length ? ` · ${s.divergent.length} divergent` : ' · no divergence'));
      for (const dv of s.divergent)
        L.push(`        ${dv.field} — carried by ${dv.carried_by.join(', ')} only`);
    }
    L.push('');
  }

  const done = all.filter(m => m.completed).length;
  const degraded = all.filter(m => m.degradation.know_how_not_read.length || m.degradation.stale ||
                                   m.degradation.could_not_verify || m.degradation.unknowns.length).length;
  L.push('─'.repeat(78));
  const rounds = all.reduce((n, m) => n + m.rework.rounds.length, 0);
  const reworked = all.reduce((n, m) => n + (m.rework.seen || []).length + m.rework.revised.length, 0);
  L.push(`S1 · ${done} of ${all.length} run(s) reached a delivery-ready initiative.`);
  L.push(rounds === 0 && reworked === 0
    ? 'Refinement rounds recorded across every run and every gate: 0. **No reviewer has ever sent a stage\nback**, and the field that would record it sits on every decision. Either the artifacts were good\nenough each time, or the most expensive signal this workflow produces has never been spent.'
    : `Refinement rounds recorded across every run and every gate: ${rounds}.`);
  L.push(`Degraded runs: ${degraded} of ${all.length} carry at least one declared gap. **A degraded run is`);
  L.push('a run that said what it could not establish**, which is the behaviour this pilot wants, so this');
  L.push('number going up is not on its own a fault.');
  const faults = faultsAcrossRuns(all);
  if (faults.length) {
    L.push('');
    L.push(`Sign-offs ${WORKFLOW_FAULT_WORDS}, across the runs read — where a person said the build was at fault.`);
    L.push('');
    L.push('  signed  withdrawn  runs  check');
    for (const f of faults) {
      L.push(`  ${String(f.signed).padStart(6)}  ${String(f.withdrawn).padStart(9)}  ${String(f.runs.length).padStart(4)}  ${f.check}`);
      for (const b of f.behind)
        L.push(`        ${b.run} · stage ${b.stage} · ${b.by || 'unnamed'}, ${b.role || 'no role'}` +
               `${b.withdrawn ? ` · withdrawn on ${b.withdrawn}` : ''}: ${b.reason || 'no reason given'}`);
    }
    L.push('');
    L.push('A check signed off against the workflow on several runs names a rule the build gets wrong, not a run');
    L.push('that went badly. A check signed and then withdrawn says the same thing twice and is counted apart.');
  }
  L.push('');
  return L.join('\n');
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const named = args.filter(a => !a.startsWith('--'));
  const roots = [...new Set([FIXTURES_ROOT, RUNS_ROOT])];
  const dirs = named.length ? named : roots.flatMap(r => runDirs(r)).sort();
  if (!dirs.length) {
    console.error('no committed run to measure — a reader that reports nothing must say so, not print zeroes');
    process.exit(2);
  }
  const all = dirs.map(measure).filter(Boolean);
  if (!all.length) {
    console.error(`no run record found in: ${dirs.join(', ')}`);
    process.exit(2);
  }
  const judged = judgedAcrossRuns(all);
  const workflow_faults = faultsAcrossRuns(all);
  console.log(json ? JSON.stringify({ runs: all, shapes: shapes(all), judged, workflow_faults }, null, 2) : render(all));
  if (!json && judged.length) {
    console.log('\nThe judged half, across the runs read — what a person said about the rules no check can settle.\n');
    console.log('  no  ?   sk  yes  wd  runs  gate  rule');
    for (const r of judged)
      console.log(`  ${String(r.no).padStart(2)}  ${String(r.cannot_tell).padStart(2)}  ${String(r.skipped).padStart(2)}  ${String(r.yes).padStart(3)}  ${String(r.withdrawn).padStart(2)}  ${String(r.runs).padStart(4)}  ${String(r.gate).padEnd(4)}  ${r.rule}`);
    console.log('\nAnswers given before a stage was sent back are counted, and the wd column says how many.');
    console.log('\nA rule answered "no" across several runs names a body of know-how to fix, not a document to redraft.');
    console.log('A rule two people answer differently on the same kind of document is a badly worded rule, and that goes to the know-how too.');
  }
}

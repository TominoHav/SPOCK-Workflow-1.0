#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, runArtifacts } from './run-files.mjs';
import { frontmatter } from './yaml.mjs';
import { readContracts, upstreamStages } from './contracts.mjs';
import { GATES, decisionsFor, recordedDecisions, signedExceptions, signedChecks,
         NEVER_SIGNABLE, STALE_TASK, coveringSignatures, onAcceptedOf,
         unsignableLines, signOffLine, cannotSign, folderRenamed, personOnly, stoppedLine } from './gates.mjs';
import { shownDate } from './fixed-messages.mjs';   // r1.13 · W44 · BD-133: a date a person reads is day first
import { nearMissRole, rolesOn } from './decision-block.mjs';
import { entryRefusal, notPersonRefusal } from './boxes.mjs';
import { gateFindings, failuresOf } from './findings.mjs';

const say = m => console.log(m);
const refuse = lines => { say(''); for (const l of lines) say(l); process.exit(3); };
const die = m => { console.error(`\nkeep: ${m}\n`); process.exit(2); };

function run(script, args) {
  try {
    return { code: 0, out: execFileSync('node', [join('.github', 'scripts', script), ...args],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) };
  } catch (e) { return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') }; }
}

export function unacceptedUpstream(state, n) {
  const stages = (state.stages || []).map(s => ({ ...s, id: Number(s.id) }));
  return (state.stale || [])
    .filter(x => x && !String(x.accepted_by || '').trim() && String(x.rebuilt) !== 'true')
    .filter(x => {
      const owner = stages.find(s => (s.artifacts || []).map(String).includes(String(x.artifact)));
      return owner && owner.id < Number(n);
    })
    .map(x => String(x.artifact));
}

export function ownRole(state, stage, who) {
  const w = String(who || '').trim(), v = x => String(x || '').trim();
  if (!w) return '';
  const said = [];
  for (const d of (state && state.decisions) || []) if (v(d.by) === w && v(d.role)) said.push([String(d.stage), v(d.role)]);
  for (const r of (state && state.refinements) || []) if (v(r.by) === w && v(r.role)) said.push([String(r.stage), v(r.role)]);
  for (const s of (state && state.stages) || []) {
    if (s.owner && v(s.owner.name) === w && v(s.owner.role)) said.push([String(s.id), v(s.owner.role)]);
    if (s.judged_half && v(s.judged_half.by) === w && v(s.judged_half.role)) said.push([String(s.id), v(s.judged_half.role)]);
  }
  const here = said.find(([id]) => id === String(stage && stage.id));
  return (here || said[said.length - 1] || [])[1] || '';
}

function main() {
  const argv = process.argv.slice(2);
  const byIdx = argv.indexOf('--by'), whyIdx = argv.indexOf('--why'), roleIdx = argv.indexOf('--role');
  const valueOf = i => (i !== -1 ? String(argv[i + 1] ?? '').trim() : '');
  const takesValue = new Set([byIdx, whyIdx, roleIdx].filter(i => i !== -1).map(i => i + 1));
  const [runId, stageArg] = argv.filter((a, i) => !a.startsWith('--') && !takesValue.has(i));
  if (!runId || !stageArg)
    die('usage: node .github/scripts/keep.mjs <run_id> <stage> --by "<your name>" --why "<why it still stands>" [--role "<your role>"]');
  const dir = join(RUNS_ROOT, runId);
  if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`${dir} has no RUN-STATE.md`);
  const n = Number(stageArg);
  if (!GATES[n]) die(`"${stageArg}" is not a stage. The stages are 1 to 7`);
  const by = valueOf(byIdx), why = valueOf(whyIdx);
  if (!by) refuse([entryRefusal({ what: 'Nothing was kept: the box \'Your name\' was empty',
    takes: 'A stage is kept by a person, and the record names who.', next: 'Run the task again and type your name.' })]);
  const notPerson = notPersonRefusal(by, 'keeping a stage', 'Your name', 'Nothing was kept');
  if (notPerson) refuse([notPerson]);
  if (!why) refuse([entryRefusal({ what: 'Nothing was kept: the box \'Why the stage still stands as it is, in your own words\' was empty',
    takes: 'A stage kept as it is says, in the person\'s own words, why it still stands.', next: 'Run the task again and say why.' })]);

  const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
  { const stopped = stoppedLine(runId, state); if (stopped) refuse([stopped]); }
  const stages = (state.stages || []).map(s => ({ ...s, id: Number(s.id) }));
  const st = stages.find(s => s.id === n);
  if (!st) die(`stage ${n} is not on this run's record`);
  const gate = GATES[n].quality;

  if (st.status !== 'stale')
    refuse([`Nothing was kept. Stage ${n} is "${st.status}", and only a stage marked stale is kept this way.`,
            'A stage is marked stale when a stage it is built on is sent back or re-run after it was accepted.',
            'Nothing needs keeping: "SPOCK: continue" says what the stage in hand needs.']);

  const blocked = [...upstreamStages(n, readContracts()).keys()]
    .map(up => stages.find(s => s.id === up)).filter(u => u && u.status !== 'accepted');
  if (blocked.length)
    refuse([`Nothing was kept. Stage ${n} is built on ${blocked.map(u => `stage ${u.id}, which is "${u.status}"`).join(', and ')}.`,
            `Keep stage ${n} once ${blocked.length === 1 ? 'that stage is' : 'those stages are'} accepted again.`]);

  const owed = decisionsFor(n).filter(id => !recordedDecisions(st).some(d => d && d.id === id));
  if (owed.length)
    refuse([`Nothing was kept. Stage ${n} was not accepted before it was marked stale, so there is nothing to keep as it is.`,
            `Send it back to be redone with "${STALE_TASK.redo}", and its agent writes it again.`]);

  const inputs = unacceptedUpstream(state, n);
  const view = gateFindings(dir, gate);
  const g = { code: view.complete || view.code === 2 ? view.code : 2 };
  const failures = failuresOf(view);
  if ((view.unread || []).length) {
    const files = view.unread.map(u => u.rel), one = files.length === 1;
    const named = one ? files[0] : `${files.slice(0, -1).join(', ')} and ${files[files.length - 1]}`;
    refuse([`Nothing was kept. The checker could not read ${named}, so ${gate} records nothing on stage ${n}, and the result recorded before is not taken in its place.`,
            ...view.unread.map(u => `  ${u.rel}: ${u.why}`),
            `The agent that writes ${one ? 'that file changes it so it reads' : 'those files changes them so they read'}, and "SPOCK: check what is written, then continue" runs ${gate} again. ` +
            `Then keep the stage with "${STALE_TASK.keep}". Nothing else is asked of you until then.`]);
  }
  let carried = [], clean = true, carriedAbout = [];
  const fromEarlier = new Map();
  if (g.code !== 0) {
    clean = false;
    const failed = failures.map(f => f.id);
    const signed = new Set(signedExceptions(state, n).flatMap(signedChecks));
    const ran = { ...st, quality_gate: { id: gate, result: 'fail', failed: [...new Set(failed)],
      on_accepted: onAcceptedOf(failures, runArtifacts(dir), state, n) } };
    for (const [id, v] of coveringSignatures(state, ran)) if (v.carried) { signed.add(id); fromEarlier.set(id, v); }
    const c30 = (failures.find(f => f.id === 'C30') || {}).detail || '';
    const named = [...c30.matchAll(/\b(A\d+[a-z]?): (?:advanced past without|stale with no acceptance)/g)].map(m => m[1]);
    const answered = id => id === 'C30' && named.length > 0 && named.every(a => inputs.includes(a));
    const coverable = g.code === 1 && failed.length > 0
      && failed.every(id => answered(id) || (signed.has(id) && !NEVER_SIGNABLE.includes(id)));
    const renamed = folderRenamed(state.run_id, runId);
    const never = [...new Set(failed.filter(id => cannotSign(id, renamed)))];
    const signable = g.code === 1 ? [...new Set(failed.filter(id => !answered(id) && !signed.has(id) && !cannotSign(id, renamed)))] : [];
    const routes = never.length + signable.length > 0;
    if (!coverable)
      refuse([`Nothing was kept. ${gate} does not pass on stage ${n} as it stands, so it cannot be kept:`,
              ...[...failures.map(f => `  FAIL ${f.id.padEnd(4)} ${f.detail}`),
                  ...view.unread.map(u => `  ${u.rel} could not be read: ${u.why}`),
                  ...(view.verdict !== 'pass' && !view.clean && view.count ? [`  ${view.count}`] : [])].slice(0, 12),
              ...unsignableLines(never, state.run_id || runId, renamed),
              ...(signable.length ? [signOffLine(signable, never.length > 0)] : []),
              ...(routes ? [`Then keep the stage again with "${STALE_TASK.keep}".`] : []),
              `${routes ? 'Or send' : 'Send'} it back to be redone with "${STALE_TASK.redo}", and its agent writes it again.`]);
    carried = [...new Set(failed.filter(id => !answered(id)))];
    carriedAbout = ran.quality_gate.on_accepted.filter(e => carried.includes(e.split(':')[0]));
  }

  const typedRole = valueOf(roleIdx);
  const near = typedRole ? nearMissRole(typedRole, rolesOn(state)) : '';
  if (near)
    refuse([`Nothing was kept: the role "${typedRole}" is one or two characters from "${near}", which this run already records. ` +
            'If they are the same role, type it the way the run already spells it. If it really is a different role, ' +
            'name it so it does not read as a slip.']);
  const role = typedRole || ownRole(state, st, by);
  if (!role)
    refuse([`Nothing was kept: the role box was empty, and ${by} has recorded no role on this run. A stage is kept in the ` +
            'keeper\'s own role, never the stage owner\'s: type the role you decided in.']);
  const what = `Kept stage ${n} as it is after ${gate} ran on it again` +
    (clean ? ' and passed' : '') +
    (carried.length ? `, carrying the signed ${carried.join(', ')}` : '') +
    (inputs.length ? `, accepting the stale input ${inputs.join(', ')}` : '') + `: ${why}`;
  const recordPass = clean && !(st.quality_gate && String(st.quality_gate.result) === 'pass');
  const recordFail = carried.length > 0;
  const steps = [
    ...(recordPass ? [['gate', runId, String(n), gate, 'pass', '--by', 'check.mjs, run independently of the producer']] : []),
    ...(recordFail ? [['gate', runId, String(n), gate, 'fail', '--by', 'check.mjs, run independently of the producer',
      '--failed', carried.join(','), ...(carriedAbout.length ? ['--on-accepted', carriedAbout.join(',')] : [])]] : []),
    ['decide', runId, String(n), '--kind', 'direction', '--what', what, '--by', by, '--role', role],
    ...inputs.map(a => ['accept-stale', runId, a, '--by', by]),
    ['stage', runId, String(n), 'accepted'],
  ];
  for (const s of steps) {
    const r = run('run-state.mjs', s);
    if (r.code) die(`stage ${n} was not kept: the record refused \`${s[0]}\` — ${r.out.trim()}\n` +
                    'This is a fault in the run; tell whoever maintains the workflow.');
  }
  if (clean) say(`${gate} passed again on stage ${n} as it stands.`);
  else if (carried.length)
    say(`${gate} ran again on stage ${n} and failed only on ${carried.join(', ')}, which a person signed, so it is kept carrying ${carried.length === 1 ? 'that failure' : 'those failures'}.`);
  else say(`${gate} ran again on stage ${n}, and the only thing it found was a stale input nobody had accepted yet.`);
  for (const [id, v] of fromEarlier)
    say(`${id} is carried from stage ${v.from}'s sign-off by ${v.d.by}, ${v.d.role}, on ${shownDate(v.d.at)}: its finding is about an earlier stage, not stage ${n}.`);
  if (inputs.length)
    say(`The stale input${inputs.length === 1 ? '' : 's'} it is built on, ${inputs.join(', ')}, ${inputs.length === 1 ? 'is' : 'are'} accepted in ${by}'s name.`);
  say(`Stage ${n} is kept as it is and accepted again, kept by ${by}, and the record says why.`);
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) main();

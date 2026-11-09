import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { spawnSync } from 'node:child_process';
import { writeFileSync, writeSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { openRuns, runDirs, runIdOf, RUNS_ROOT, runArtifacts, languageLine as languageLineOf, STAGE_DIRS, SUPPLIED_DIR, twoRunsRefusal,
         readTakeBackTyped, folderTakeBack } from './run-files.mjs';
import { resolveDocument } from './hand-edit.mjs';
import { suppliedFiles } from './material.mjs';
import { standing } from './contracts.mjs';
import { questionsFor, stageHeadline, GATES, STALE_TASK, coveringSignatures,
         unrecordedBlock, unrecordedOf, keptFailuresOf, keptFailure, keptAfter, keptSection, keptOwnSection, WRITTEN_STOP_LINE } from './gates.mjs';
import { frontmatter } from './yaml.mjs';
import { render as renderReadme, OUT_NAME as README_NAME, needingChanges, failureOnAccepted } from './run-readme.mjs';
import { readInputs, TASK_ENV, ranSection } from './task-page.mjs';
import { BOX_ENV, BOX_WORD } from './box-words.mjs';
import { BOXES, BOX_TYPES, refusalLine, signableAt, signedAt, boxPrompt } from './boxes.mjs';
import { namesOn } from './decision-block.mjs';
import { shownDate } from './fixed-messages.mjs';

export const LAST = '.github/last-task.md';

const argv = process.argv.slice(2);
const say = (text, fd = 1) => {
  const buf = Buffer.from(String(text), 'utf8');
  let off = 0;
  while (off < buf.length) {
    try { off += writeSync(fd, buf, off, buf.length - off); }
    catch (e) { if (e.code === 'EAGAIN') continue; if (e.code === 'EPIPE') return; throw e; }
  }
};
const refuse = text => say(`${text}\n`, 2);
class Refusal extends Error {}
const stop = text => { throw new Refusal(text); };

if (!argv.length) {
  refuse('usage: node .github/scripts/task.mjs <script.mjs> [args...] [:: <script.mjs> [args...]]...');
  process.exit(2);
}

const runDir = () => {
  const open = openRuns();
  if (open.length === 1) return open[0];
  if (!open.length) {
    const all = runDirs();
    if (all.length === 1) return all[0];
    if (all.length > 1) {
      stop(`\nNo run is unfinished and ${all.length} finished runs are here, so this task cannot tell which one you mean:\n` +
                    all.map(d => `  ${runIdOf(d)}`).join('\n') +
                    `\nMove the runs you are not working on out of ${RUNS_ROOT}/, to a place that is not shared, then run this task again.\n`);
    }
    stop(`\nThere is no run in progress, so there is nothing for this task to act on.\n` +
                  `Start one with the task "SPOCK: start a run", which is the one place you name it.\n`);
  }
  stop(`\n${twoRunsRefusal(open, RUNS_ROOT)}\n`);
};
const stageOf = () => {
  cached = cached || runDir();
  const t = readFileSync(join(cached, 'RUN-STATE.md'), 'utf8');
  const m = t.match(/^current_stage:\s*(\S+)/m);
  const v = m ? m[1] : '';
  if (!/^[1-7]$/.test(v)) {
    stop(`\nThis run's current stage reads "${v || 'nothing'}", so there is no stage in flight for ` +
                  `this task to act on.\nA stage of a finished run is redone by sending it back with ` +
                  `"${STALE_TASK.redo}", which asks you which one.\n`);
  }
  return v;
};

const flagValue = f => { const i = argv.indexOf(f); return i >= 0 && i + 1 < argv.length ? argv[i + 1] : null; };
const signingOff = argv[0] === 'run-state.mjs' && argv[1] === 'decide' && flagValue('--kind') === 'exception'
  && flagValue('--check') !== null && !argv.includes('--supersedes');
const signOffStage = () => {
  cached = cached || runDir();
  const state = frontmatter(readFileSync(join(cached, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
  const typed = [...new Set(String(expand(flagValue('--check'))).split(',').map(x => x.trim()).filter(Boolean))];
  const failedOn = s => (s && s.quality_gate && String(s.quality_gate.result) === 'fail' && Array.isArray(s.quality_gate.failed)
    ? s.quality_gate.failed.map(String) : []);
  const stages = state.stages || [];
  const flight = stages.find(s => String(s.id) === String(state.current_stage));
  if (typed.length && !typed.some(c => failedOn(flight).includes(c))) {
    const stranded = stages.filter(s => s !== flight && ['accepted', 'in_review', 'refined'].includes(s.status))
      .filter(s => typed.every(c => failedOn(s).includes(c)) && typed.some(c => !coveringSignatures(state, s).has(c)))
      .map(s => Number(s.id)).sort((a, b) => a - b);
    if (stranded.length) return String(stranded[0]);
  }
  return stageOf();
};

let cached = null;
const boxWords = argv.map((a, i) => ({ m: BOX_WORD.exec(a), i })).filter(x => x.m).map(x => ({ id: x.m[1], i: x.i }));
const typedBox = Object.fromEntries(boxWords.map(b => [b.id, process.env[BOX_ENV + b.id] ?? '']));
const boxValue = { ...typedBox };
const boxSaid = [];
let boxRefused = null;
const ACTS = { 'promote-competitors.mjs': 'Keeping a run\'s competitors', 'keep.mjs': 'Keeping a stage', 'advance.mjs': 'An approval',
  'hand-edit.mjs': 'An account of an edit', 'withdraw.mjs': 'Taking something back', 'pasted.mjs': 'Taking in what was pasted',
  'run-state.mjs init': 'Starting a run', 'run-state.mjs stage': 'Recording who owns a stage', 'run-state.mjs decide': 'A decision',
  'run-state.mjs retract': 'Sending a stage back', 'run-state.mjs judged': 'Answering a gate\'s questions',
  'run-state.mjs agree': 'Marking the PRD agreed', 'run-state.mjs correct-name': 'Correcting a name' };
const expand = a => {
  const box = BOX_WORD.exec(a);
  if (box) return boxValue[box[1]] ?? '';
  if (a === 'run:stage') return signingOff ? signOffStage() : stageOf();
  if (a !== 'run:id' && a !== 'run:dir') return a;
  cached = cached || runDir();
  return a === 'run:id' ? runIdOf(cached) : cached;
};

const steps = [[]];
let refused = null;
try {
if (boxWords.length) {
  const inputs = (() => { try { return readInputs(); } catch { return new Map(); } })();
  const quietRun = () => {
    const named = argv.find(a => /^[\w-]+$/.test(String(a)) && existsSync(join(RUNS_ROOT, String(a), 'RUN-STATE.md')));
    if (named) return join(RUNS_ROOT, named);
    try {
      const open = openRuns();
      if (open.length === 1) return open[0];
      const all = open.length ? [] : runDirs();
      return all.length === 1 ? all[0] : null;
    } catch { return null; }
  };
  let stateRead = false, state = null, stateDir = null;
  const stateNow = () => {
    if (!stateRead) {
      stateRead = true;
      stateDir = quietRun();
      try { state = stateDir ? frontmatter(readFileSync(join(stateDir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md') : null; } catch { state = null; }
    }
    return state;
  };
  const act = ACTS[`${argv[0]} ${argv[1]}`] || ACTS[argv[0]] || 'What this task records';
  const stageFor = () => {
    const st = stateNow();
    if (!st) return null;
    const n = typedBox.stage ? String(typedBox.stage).trim()
      : signingOff ? (() => { try { return signOffStage(); } catch (e) { if (e instanceof Refusal) throw e; return null; } })() : String(st.current_stage || '');
    return (st.stages || []).find(s => String(s.id) === String(n)) || null;
  };
  const listFor = box => {
    const st = stateNow();
    if (!st) return null;
    if (box.list === 'failing') {
      const s = stageFor();
      if (!s) return null;
      const items = signableAt(st, s);
      return { items: [...items, ...signedAt(st, s)], says: items.length
        ? `The checks you can sign off at stage ${s.id} are ${items.join(', ')}: stage ${s.id}'s gate recorded them failing and no sign-off covers them.`
        : `Stage ${s.id}'s gate recorded no failing check that a sign-off could cover, so there is nothing to sign off at stage ${s.id}.` };
    }
    if (box.list === 'decisionDates') {
      const s = stageFor();
      if (!s) return null;
      const items = [...new Set((st.decisions || []).filter(d => String(d.stage) === String(s.id) && !d.superseded_by).map(d => String(d.at || '')).filter(Boolean))];
      return { items, says: items.length ? `The decisions stage ${s.id} records are dated ${items.map(d => shownDate(d)).join(', ')}.` : `Stage ${s.id} records no decision to replace.` };
    }
    if (box.list === 'names') {
      const items = [...namesOn(st), ...(st.person && st.person.name ? [String(st.person.name)] : [])];
      return { items: [...new Set(items)], says: `The names this run records are ${[...new Set(items)].join(', ') || 'none'}.` };
    }
    if (box.list === 'documents' || box.list === 'files') {
      const t = String(boxValue[box.id] || '').trim();
      const typedBack = box.list === 'files' ? readTakeBackTyped(t) : null;
      const there = !!t && !!stateDir && (existsSync(join(stateDir, t))
        || (typedBack ? !!folderTakeBack(stateDir, typedBack.folder) : false)
        || (box.list === 'documents' ? !!resolveDocument(stateDir, t).doc : false));
      return { items: there ? [t] : [], says: box.list === 'files'
        ? `The file must be one of this run's, by its path inside the run, as in ${box.example}, or a stage's folder with the count its listing printed, as in 4-solutions (12 files).`
        : `The document must be one of this run's, by its path inside the run, as in ${box.example}, by its file name, or by its id, as in A1.` };
    }
    return null;
  };
  for (const { id, i } of boxWords) {
    const box = BOXES[id];
    if (!box || boxRefused) continue;
    const input = inputs.get(id) || {};
    const flag = i > 0 && String(argv[i - 1]).startsWith('--') ? argv[i - 1] : '--by';
    const nameBoxes = [].concat(box.nameBox || []);
    const name = nameBoxes.map(n => typedBox[n]).find(v => v !== undefined && String(v).trim()) || '';
    const needsState = ['role', 'reason', 'pick', 'name'].includes(box.type);
    const r = BOX_TYPES[box.type].check(boxValue[id], {
      box, state: needsState ? stateNow() : null, values: typedBox, act, flag, name,
      options: Array.isArray(input.options) ? input.options.map(String) : null,
      list: box.type === 'pick' ? listFor(box) : null, exists: p => !!p && existsSync(p) });
    const prompt = boxPrompt(input.description || id);
    if (r.refuse) boxRefused = { id, line: refusalLine(prompt, r.refuse, r.noExample ? false : box.example, r.meant || null), whole: r.whole || null };
    else if (r.fill !== undefined) { boxValue[id] = r.fill; boxSaid.push(r.said); }
  }
}
if (!boxRefused) for (const a of argv) { if (a === '::') steps.push([]); else steps[steps.length - 1].push(expand(a)); }
} catch (e) {
  if (!(e instanceof Refusal)) throw e;
  refused = e.message;
  steps.splice(0, steps.length);
}

const started = shownDate(new Date());
const transcript = [];
let code = 0, ran = 0, lastScript = '', lastOut = '', lastArgs = [];
let failHeading = '', failOut = '';
if (refused !== null) {
  code = 2;
  lastScript = argv[0] || '';
  lastOut = refused.trim();
  failHeading = `## ${lastScript} — not run, the task refused before any step`;
  failOut = lastOut;
  transcript.push(`${failHeading}\n\n${lastOut}`);
  refuse(refused);
} else if (boxRefused) {
  code = 3;
  lastScript = argv[0] || '';
  lastOut = [boxRefused.whole, boxRefused.line].filter(Boolean).join('\n');
  failHeading = `## ${lastScript} — not run, a box was refused`;
  failOut = lastOut;
  transcript.push(`${failHeading}\n\n${lastOut}`);
  say(`\n${lastOut}\n`);
} else for (const l of boxSaid) { transcript.push(l); say(`${l}\n`); }

const previousUnrecorded = boxWords.length ? null
  : (() => { try { return existsSync(LAST) ? unrecordedOf(readFileSync(LAST, 'utf8')) : null; } catch { return null; } })();
const stepEnv = { ...process.env, SPOCK_UNRECORDED: previousUnrecorded ? JSON.stringify(previousUnrecorded) : '' };
for (const step of steps) {
  if (!step.length) continue;
  const [script, ...args] = step;
  const r = spawnSync(process.execPath, [resolve('.github/scripts', script), ...args], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024, env: stepEnv,
  });
  const out = (r.stdout || '') + (r.stderr || '');
  ran++;
  code = r.error ? 1 : (r.status ?? 1);
  lastScript = script;
  lastOut = out;
  lastArgs = args;
  failHeading = `## ${script}${args.length ? ' ' + args.join(' ') : ''} — exit ${code}`;
  failOut = out;
  transcript.push(`${failHeading}\n\n${out.trimEnd() || '(said nothing)'}`);
  say(out.replace(WRITTEN_STOP_LINE, ''));
  if (r.error) {
    transcript.push(`\nThe step could not be run: ${r.error.code || r.error.message}`);
    failOut = `${out.trimEnd()}\nThe step could not be run: ${r.error.code || r.error.message}`;
    break;
  }
  if (code !== 0) {
    if (ran < steps.filter(s => s.length).length)
      transcript.push(`\n${steps.filter(s => s.length).length - ran} later step(s) did not run, because this one exited ${code}.`);
    break;
  }
}

const where = (() => {
  try {
    const open = openRuns();
    if (open.length !== 1) return open.length ? `${open.length} runs unfinished` : 'no unfinished run';
    const st = readFileSync(join(open[0], 'RUN-STATE.md'), 'utf8');
    const stage = (st.match(/^current_stage:\s*(.+)$/m) || [])[1] || '?';
    return `${runIdOf(open[0])}, stage ${stage.trim()}`;
  } catch { return 'run not resolved' }
})();

const standingNow = () => {
  const named = lastArgs.find(a => /^\d{4}-\d{2}-[a-z0-9-]+$/.test(String(a))
    || (/^[\w-]+$/.test(String(a)) && existsSync(join(RUNS_ROOT, String(a), 'RUN-STATE.md'))));
  const open = named ? [] : openRuns();
  const dir = named ? join(RUNS_ROOT, named) : (open.length === 1 ? open[0] : null);
  if (!dir || !existsSync(join(dir, 'RUN-STATE.md'))) return null;
  const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
  const have = new Map();
  for (const a of runArtifacts(dir)) (have.get(Number(a.stage)) || have.set(Number(a.stage), new Set()).get(Number(a.stage))).add(a.id);
  return { dir, state, s: standing(state, have) };
};
const materialFolderOf = ({ dir, s }) => (s && s.stage === 2 && s.status === 'running' && !suppliedFiles(dir).length
  ? `${STAGE_DIRS[1]}/${SUPPLIED_DIR}/` : null);
const stateHeadline = () => {
  try {
    const now = standingNow();
    if (!now) return stageHeadline(null, { lastOut });
    const { dir, state, s } = now;
    const st = s.stage === null ? null : (state.stages || []).find(x => Number(x.id) === s.stage);
    const answered = st && st.judged_half && Array.isArray(st.judged_half.verdicts) && st.judged_half.verdicts.length;
    const questions = st && !answered && (GATES[s.stage] || {}).quality
      ? questionsFor(GATES[s.stage].quality, st.quality_gate && st.quality_gate.run_at) : [];
    const shown = s.status === 'q_failed' && new RegExp(`^\\S+ — ${s.gate} did not pass\\.$`, 'm').test(lastOut);
    const failed = shown ? failureOnAccepted(dir, s.stage) : null;
    const failures = failed && !/The stage goes back to /.test(lastOut) ? failed.found : [];
    const needsChanges = s.status === 'running' && (s.person || []).length && !(s.agent || []).length ? needingChanges(dir) : [];
    return stageHeadline(s, { lastOut, questions, accepted: failures.length ? failures : null, materialFolder: materialFolderOf(now), needsChanges,
      failing: failed ? failed.failed : [], nobodySigns: failed ? failed.nobodySigns : [] });
  } catch { return stageHeadline(null, { lastOut }); }
};
const owedWords = () => {
  try {
    const now = standingNow();
    const s = now && now.s;
    return s && s.stage !== null && (s.agent || []).length ? { n: s.stage, list: s.agent.join(', '), folder: materialFolderOf(now) } : null;
  } catch { return null; }
};
const HEADLINE_3 = { 'advance.mjs': 'Nothing was recorded.', 'keep.mjs': 'Nothing was recorded.', 'hand-edit.mjs': 'Nothing was recorded.',
  'run-state.mjs': 'Nothing was recorded.', 'pasted.mjs': 'Nothing you pasted was saved.', 'update.mjs': 'Nothing was changed.',
  'withdraw.mjs': 'Nothing was taken back.',
  'problem-material.mjs': lastArgs.includes('--typed') ? 'Nothing you typed was written.'
    : lastArgs.includes('--periods') ? 'Nothing you typed was recorded.' : 'Nothing was added.' };
const firstRefusal = out => {
  const lines = String(out || '').split('\n').map(l => l.trim().replace(/^[a-z][\w-]*: /, '')).filter(l => l && !/^Heads-up:/.test(l));
  const at = Math.max(0, lines.findIndex(l => /^Nothing\b/.test(l)));
  if (!/^Nothing\b[^.]*\.$/.test(lines[at] || '')) return lines[at] || '';
  const why = lines[at + 1] || lines.find((l, i) => i !== at && !/^Nothing\b/.test(l));
  return why ? `${lines[at]} ${why}` : lines[at];
};
const refusedVerdict = () => {
  if (boxRefused) return `Nothing was recorded. ${boxRefused.line}`;
  const line = firstRefusal(lastOut);
  if (/^Nothing\b[^.]*\./.test(line)) return line;
  return `${HEADLINE_3[lastScript]}${line ? ` ${line}` : ' The task output says why.'}`;
};
const verdict = code === 0
  ? ((lastScript === 'advance.mjs' || lastScript === 'written.mjs') ? stateHeadline() : 'Everything ran.')
  : lastScript === 'written.mjs' && code === 3
    ? ((o => o
        ? `Nothing failed. Stage ${o.n} still owes ${o.list}, which the agent for this stage writes` +
          (o.folder ? ` from the problem material, which only you can supply, as files in ${o.folder}. ` : '. ')
        : 'Nothing failed. Nothing is written for this stage yet, and the task output lists what it owes. ')(owedWords()) +
      'The task stops here so the next step does not run over unfinished work.')
  : lastScript === 'written.mjs' && code === 1
    ? ((o => o
        ? `Nothing failed. What is written still needs changes and stage ${o.n} still owes ${o.list}; the task output says which and why. `
        : 'Nothing failed. What is written still needs changes, and the task output says which and why. ')(owedWords()) +
      'The task stops here so the next step does not run over unfinished work.')
  : code === 3 && (boxRefused || HEADLINE_3[lastScript])
    ? refusedVerdict()
    : (lastScript === 'check.mjs' || lastScript === 'explain.mjs') && code === 1
    ? 'Checks fail on this run, and the task output names them.'
    : lastScript === 'setup-check.mjs' && code === 3
    ? 'Nothing is broken; the output says what to do.'
    : `${lastScript} stopped with exit ${code}. The task output says why.`;

const outstanding = lastScript === 'written.mjs' && (code === 3 || code === 1);
const exitCode = outstanding ? 0 : code;
const languageLine = (() => {
  try {
    const now = standingNow();
    return now ? languageLineOf(now.dir) : null;
  } catch { return null; }
})();

say(`\n${verdict}\n${languageLine ? `\n${languageLine}\n` : ''}`);

const refusalLines = () => {
  if (boxRefused) return [boxRefused.line];
  const raw = String(lastOut || '').replace(/\r\n/g, '\n').split('\n');
  const bare = l => l.trim().replace(/^[a-z][\w-]*: /, '');
  let at = raw.findIndex(l => /^Nothing\b/.test(bare(l)));
  if (at === -1) at = raw.findIndex(l => bare(l) && !/^Heads-up:/.test(bare(l)));
  if (at === -1) return [];
  let first = bare(raw[at]).replace(/^Nothing\b[^.]*\.\s*/, ''), i = at + 1;
  while (!first && i < raw.length) first = bare(raw[i++]);
  const rest = [];
  for (; i < raw.length && raw[i].trim() && rest.length < 12; i++) rest.push(raw[i].replace(/\s+$/, ''));
  const pad = rest.length ? Math.min(...rest.map(l => l.length - l.trimStart().length)) : 0;
  return [first, ...rest.map(l => l.slice(pad))].filter(l => l.trim());
};
const unrecorded = boxWords.length && (boxRefused || (ran === 1 && code !== 0))
  ? (() => { let about = null; try { const now = standingNow(); about = now ? runIdOf(now.dir) : null; } catch { about = null; }
             return unrecordedBlock(refusalLines(), about); })()
  : '';

const head = `# What the last task said\n\n` +
  `Run at ${started}. ${lastScript || 'the task'} exited ${code}, and this task exits ${exitCode}. ${verdict} About: ${where}.\n\n` +
  (unrecorded ? `${unrecorded}\n\n` : '') +
  `**This file is the task's output.** The task tool hands the agent that output, and this file keeps all of\n` +
  `it. It is written again by every task, which keeps from it only an earlier task that failed and has not passed since.\n` +
  `Read it to the end after every task you run, before you tell anyone what the task did: a headline read alone can send a person to approve a stage that is not ready.\n\n` +
  (languageLine ? `${languageLine}\n\n` : '');

const ranText = ranSection(process.env[TASK_ENV]);
const keyOf = (n => (n && n.trim() ? n : `task.mjs ${argv.join(' ')}`))(process.env[TASK_ENV]);
const previousKept = (() => { try { return existsSync(LAST) ? keptFailuresOf(readFileSync(LAST, 'utf8')) : []; } catch { return []; } })();
const failure = exitCode !== 0
  ? keptFailure({ key: keyOf, at: started, where, verdictLine: `${lastScript || 'the task'} exited ${code}, and this task exits ${exitCode}. ${verdict}`,
                  heading: failHeading || `## ${lastScript || 'the task'} — exit ${code}`, out: failOut || lastOut })
  : null;
const kept = keptAfter(previousKept, { key: keyOf, runId: (/^(\S+), stage \S+$/.exec(where) || [])[1] || null, failure });
const earlierText = keptSection(kept.earlier);

mkdirSync(dirname(LAST), { recursive: true });
writeFileSync(LAST, head + `${ranText}\n\n` + (earlierText ? `${earlierText}\n\n` : '') + transcript.join('\n\n') +
  (kept.own ? `\n\n${keptOwnSection(kept.own)}` : '') + '\n', 'utf8');

if (lastScript !== 'update.mjs' && lastScript !== 'setup-check.mjs') try {
  const now = standingNow();
  const pageDir = now ? now.dir : cached;
  const page = pageDir ? renderReadme(pageDir) : null;
  if (page !== null) {
    const path = join(pageDir, README_NAME);
    if (!existsSync(path) || readFileSync(path, 'utf8') !== page) writeFileSync(path, page);
  }
} catch {  }
process.exit(exitCode);

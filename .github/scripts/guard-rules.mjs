import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, appendFileSync, renameSync, unlinkSync,
         openSync, readSync, fstatSync, closeSync } from 'node:fs';
import { join, resolve, relative, isAbsolute, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { REPO_ROOT, RUNS_ROOT, RUN_ID_RE, STAGE_DIRS, RECORDS_DIR, SUPPLIED_DIR, RECORD_SUFFIX, runDirs, openRuns,
         declaredId, declaredIdIn, runArtifacts, runLanguage, languageLine } from './run-files.mjs';
import { readContracts, CONTRACTS, standing } from './contracts.mjs';
import { readTasks, RAN_HEADING } from './task-page.mjs';
import { frontmatter } from './yaml.mjs';
import { recordedDecisions, STALE_TASK, WAITS_ON_A_PERSON, PERSON_TASK, GUARD_TWO_BUILD, lastTaskHeadEnd, CHECKER_READ_BUILD,
         KEPT_HEADING, unrecordedOf } from './gates.mjs';
import { recordedBuild, buildAtLeast } from './derive.mjs';
import { BLOCKS, render, GRAMMAR } from './fixed-messages.mjs';
import { listedFiles } from './market-material.mjs';   // r1.15 · W56 · LF-52: SG4's refusal reads the folder as the opening does

export const NOTES_DIR = '.github/.guard';
export const LOG_FILE = 'decisions.jsonl';
export const LAST_TASK = '.github/last-task.md';
export const TASKS_FILE = '.vscode/tasks.json';
export const NOTE_DAYS = 7;
export const SG2_LIMIT = 12000;

export const TOOLS = Object.freeze({
  read: Object.freeze(['read_file']),
  write: Object.freeze(['create_file', 'replace_string_in_file', 'multi_replace_string_in_file', 'insert_edit_into_file', 'apply_patch']),
  task: Object.freeze(['run_task']),
  outward: Object.freeze(['fetch_webpage', 'vscode-websearchforcopilot_webSearch']),
});
export const toolKind = name => Object.keys(TOOLS).find(k => TOOLS[k].includes(String(name))) || null;

export const RELEASED_DIRS = ['fixtures', 'specifications', 'governing-documents'];
export const RELEASED_FILES = ['README.md', 'SETUP.md'];
export const WORKFLOW_DIRS = ['.github', '.vscode'];
export const RUN_SOURCES = 'sources.md';
export const PASTE_TASK = 'SPOCK: take in what I pasted in the chat';
export const TASK_WRITTEN = { files: ['RUN-STATE.md', 'README.md'], dirs: ['read'], stageDirs: ['briefs'] };

export function options(opts = {}) {
  const root = resolve(opts.root || REPO_ROOT);
  return {
    root,
    runsRoot: resolve(root, opts.runsRoot || RUNS_ROOT),
    notesDir: resolve(root, opts.notesDir || process.env.SPOCK_GUARD_NOTES_TEST_OVERRIDE || NOTES_DIR),
    tasksFile: resolve(root, opts.tasksFile || TASKS_FILE),
    lastTask: resolve(root, opts.lastTask || LAST_TASK),
    agentsDir: resolve(root, opts.agentsDir || AGENTS_DIR),
    agentsRegistry: resolve(root, opts.agentsRegistry || AGENTS_REGISTRY),
    cwd: opts.cwd ? resolve(String(opts.cwd)) : root,
    now: typeof opts.now === 'function' ? opts.now : () => Date.now(),
  };
}

export class GuardError extends Error {}

const deny = reason => ({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason } });
const context = text => ({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: text } });

const posix = p => String(p).split('\\').join('/');
function below(parent, child) {
  const r = relative(String(parent).normalize('NFC'), String(child).normalize('NFC'));
  if (!r || r.startsWith('..') || isAbsolute(r)) return null;
  return posix(r);
}
function absOf(p, o) {
  let s = String(p);
  if (/^file:\/\//i.test(s)) { try { s = fileURLToPath(s); } catch {  } }
  return isAbsolute(s) ? resolve(s) : resolve(o.cwd, s);
}
function shownOf(abs, o) {
  const inRoot = below(o.root, abs);
  if (inRoot) return inRoot;
  const inRuns = below(dirname(o.runsRoot), abs);
  return inRuns || posix(abs);
}

export function placeOf(abs, o) {
  const shown = shownOf(abs, o);
  const inRuns = below(o.runsRoot, abs);
  if (inRuns) {
    const parts = inRuns.split('/');
    if (parts.length >= 2 && RUN_ID_RE.test(parts[0]) && existsSync(join(o.runsRoot, parts[0], 'RUN-STATE.md')))
      return { where: 'run', runId: parts[0], runDir: join(o.runsRoot, parts[0]), parts: parts.slice(1), abs, shown };
  }
  const inRoot = below(o.root, abs);
  if (inRoot) return { where: 'repo', parts: inRoot.split('/'), abs, shown };
  return { where: 'outside', parts: [], abs, shown };
}

export function writesOf(tool, input) {
  const i = input && typeof input === 'object' ? input : {};
  const str = v => (v == null ? '' : String(v));
  switch (tool) {
    case 'create_file': return [{ path: i.filePath, create: true, content: str(i.content), text: str(i.content) }];
    case 'replace_string_in_file': return [{ path: i.filePath, create: false, content: null, text: str(i.newString) }];
    case 'insert_edit_into_file': return [{ path: i.filePath, create: false, content: null, text: str(i.code) }];
    case 'multi_replace_string_in_file':
      return (Array.isArray(i.replacements) ? i.replacements : [])
        .map(r => ({ path: r && r.filePath, create: false, content: null, text: str(r && r.newString) }));
    case 'apply_patch': {
      const out = [];
      let cur = null;
      for (const line of str(i.input).split(/\r?\n/)) {
        const f = /^\*\*\*\s+(Add|Update|Delete)\s+File:\s*(.+?)\s*$/.exec(line);
        const mv = /^\*\*\*\s+Move to:\s*(.+?)\s*$/.exec(line);
        if (f) { cur = { path: f[2], create: f[1] === 'Add', content: f[1] === 'Add' ? '' : null, text: '' }; out.push(cur); continue; }
        if (mv) { cur = { path: mv[1], create: false, content: null, text: '' }; out.push(cur); continue; }
        if (/^\*\*\*/.test(line)) { cur = null; continue; }
        if (cur && line.startsWith('+')) {
          if (cur.create) cur.content += `${line.slice(1)}\n`;
          cur.text += `${line.slice(1)}\n`;
        }
      }
      return out;
    }
  }
  return [];
}

const byId = (a, b) => {
  const n = s => /^A(\d+)([a-z]?)$/.exec(s) || [s, '0', s];
  const x = n(a), y = n(b);
  return Number(x[1]) - Number(y[1]) || String(x[2]).localeCompare(String(y[2]));
};
const keyIn = (text, key) => {
  const m = new RegExp(`^${key}:[ \\t]*["']?([^"'\\s#]+)["']?[ \\t]*(?:#.*)?$`, 'm').exec(String(text || '').slice(0, 4096));
  return m ? m[1] : null;
};
const headOf = abs => { try { return readFileSync(abs, 'utf8').slice(0, 4096); } catch { return ''; } };
const diskId = abs => { try { return existsSync(abs) ? declaredId(abs) : null; } catch { return null; } };
export function recordName(name) {
  const m = /^([A-Za-z0-9]+)-r(\d+)(?:-[^/]*)?\.record\.md$/.exec(String(name));
  return m && String(name).endsWith(RECORD_SUFFIX) ? { id: m[1], nn: Number(m[2]) } : null;
}

let contractCache = null;
export function contractView(o) {
  if (contractCache && contractCache.root === o.root) return contractCache.view;
  let c;
  try { c = readContracts(join(o.root, CONTRACTS, 'discovery.workflow.yaml')); }
  catch (e) { throw new GuardError(`the workflow contracts could not be read (${e.message})`); }
  if (!c.steps) throw new GuardError('the workflow contracts declare no step the guard can read');
  const takenIn = new Map();
  for (const [stage, set] of c.requires) takenIn.set(stage, new Set([...set].filter(id => !c.producedBy.has(id))));
  const phases = [];
  let files = [];
  try { files = readdirSync(join(o.root, CONTRACTS)).filter(f => f.endsWith('.yaml')); } catch { files = []; }
  for (const f of files) {
    const text = readFileSync(join(o.root, CONTRACTS, f), 'utf8');
    for (const m of text.matchAll(/^[ \t]*-\s+id:\s*(\S+)([\s\S]*?)(?=^[ \t]*-\s+id:|^[a-z_]+:|(?![\s\S]))/gm)) {
      const sk = /^\s*skill:\s*([a-z][a-z-]*)\s*$/m.exec(m[2]);
      const wr = /^\s*writes:\s*"([^"]+)"/m.exec(m[2]);
      if (!sk || !wr) continue;
      const path = wr[1].split(/\s+—\s+/)[0].trim();
      const stage = STAGE_DIRS.indexOf(path.split('/')[0]) + 1;
      if (!stage) continue;
      const re = new RegExp(`^${path.split(/\{[^}]+\}/).map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[^/]+')}$`);
      phases.push({ id: m[1], skill: sk[1], stage, path, re });
    }
  }
  const view = { c, produces: c.produces, producer: c.producer, takenIn, phases };
  contractCache = { root: o.root, view };
  return view;
}

let registerCache = null;
function documentName(id, o) {
  if (!registerCache) {
    registerCache = {};
    try {
      const spec = readFileSync(join(o.root, 'specifications', 'PILOT-BUSINESS-LOGIC.md'), 'utf8');
      const table = spec.slice(spec.indexOf('<!-- REGISTER-TABLE -->'), spec.indexOf('<!-- /REGISTER-TABLE -->'));
      for (const line of table.split('\n')) {
        const cells = line.split('|').map(c => c.trim().replace(/\*\*/g, ''));
        if (cells.length > 3 && /^A\d+[a-z]?$/.test(cells[1])) registerCache[cells[1]] = cells[2];
      }
    } catch {  }
  }
  return registerCache[id] || '';
}

export function runStateOf(runDir) {
  try { return frontmatter(readFileSync(join(runDir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md') || {}; }
  catch (e) { throw new GuardError(`${posix(join(runDir, 'RUN-STATE.md'))} could not be read (${String(e.message).split('\n')[0]})`); }
}
export function stageInFlight(state) {
  const v = String((state && state.current_stage) ?? '');
  return /^[1-7]$/.test(v) ? Number(v) : null;
}
const isFinished = state => {
  const stages = (state && state.stages) || [];
  return String(state && state.current_stage) === 'complete' || (stages.length > 0 && stages.every(s => s.status === 'accepted'));
};

function tasksOf(o) {
  try { return readTasks(o.tasksFile); }
  catch (e) { throw new GuardError(`${TASKS_FILE} could not be read (${String(e.message).split('\n')[0]})`); }
}
export function taskOf(input, o) {
  const id = String((input && (input.id ?? input.label ?? input.task)) || '');
  if (!id) return null;
  const tasks = tasksOf(o);
  const by = new Map(tasks.map(t => [t.label, t]));
  return by.get(id) || by.get(id.replace(/^[a-z]+:\s*/i, '')) || null;
}
function commandsOf(o) {
  try {
    const raw = readFileSync(o.tasksFile, 'utf8').replace(/^\s*\/\/.*$/gm, '');
    return new Map((JSON.parse(raw).tasks || []).filter(t => t && t.label)
      .map(t => [t.label, [String(t.command || ''), ...(t.args || []).map(a => (a && typeof a === 'object' ? a.value : a))].join(' ')]));
  } catch { return new Map(); }
}
function scriptsOf(label, o, commands = commandsOf(o)) {
  const words = commands.get(label) || '';
  return [...words.matchAll(/([a-z][a-z0-9-]*\.mjs)/g)].map(m => m[1]).filter(s => s !== 'task.mjs');
}
const stop = s => String(s).trim().replace(/[.\s]+$/, '');
function taskWithBoxes(label, o) {
  let t = null;
  try { t = tasksOf(o).find(x => x.label === label) || null; } catch { t = null; }
  if (!t || !t.boxes.length) return `"${label}"`;
  return `"${label}", which opens ${t.boxes.length} ${t.boxes.length === 1 ? 'box' : 'boxes'}: ` +
    t.boxes.map((b, i) => `${i + 1}. ${stop(b.description || b.id)}`).join(' · ');
}

export function personTaskReason(t) {
  const n = t.boxes.length;
  return `"${t.label}" opens ${n} ${n === 1 ? 'box' : 'boxes'} that only the person fills: ` +
    `${t.boxes.map((b, i) => `${i + 1}. ${stop(b.description || b.id)}`).join(' · ')}. ` +
    'A task that opens a box is the person\'s to run. Name the task and each box for them, and end your turn.';
}
function loopReason(label, o) {
  const scripts = scriptsOf(label, o);
  const isCheck = scripts.some(s => ['check.mjs', 'written.mjs', 'advance.mjs'].includes(s));
  let explain = null;
  try { explain = (tasksOf(o).find(t => scriptsOf(t.label, o).includes('explain.mjs')) || {}).label || null; } catch { explain = null; }
  const next = isCheck && explain && explain !== label
    ? `Run "${explain}", read ${LAST_TASK} to the end, and change the document it names.`
    : `Read ${LAST_TASK} to the end and change what it names.`;
  return `"${label}" has run three times in this chat with nothing in the run changed between the runs, and it will ` +
    `answer the same way again. ${next} If you cannot see what to change, tell the person the stage is stuck on ` +
    `"${label}" and name the Workflow Support agent in that sentence.`;
}
function skillReason(shown, what, skill) {
  return `This writes ${shown}, which is ${what}. The procedure for it is ${skill}. Open .github/skills/${skill}/SKILL.md ` +
    'in this chat, then write it again. The write goes through once the skill is open.';
}
function suppliedReason(shown, folder) {
  return `${shown} is in a supplied folder, which only the person fills: what is there is recorded as theirs. For a ` +
    `file they gave you in the chat, ask them to put it in ${folder}/ themselves. For a list or text they pasted in ` +
    `the chat, name the task "${PASTE_TASK}" and its box. For a file in the wrong folder, name it and the folder it ` +
    'belongs in, for them to move.';
}
const workflowReason = shown => `${shown} is one of the workflow's own files, which no agent changes: a change here ` +
  'changes every run, and the next update puts the release\'s version back. If a task or check refuses something you ' +
  'believe is right, tell the person what it refused and name the Workflow Support agent in that sentence.';
const releasedReason = shown => `${shown} is part of the workflow as released. Read it; do not change it.`;
const taskWrittenReason = shown => `${shown} is written by the workflow's tasks. Record what you mean to record through ` +
  'the task for it, and change the document the page reads rather than the page.';
function acceptedReason(shown, n, o) {
  return `${shown} belongs to stage ${n}, which is accepted, and no agent writes into an accepted document, even when ` +
    'the person asks. Tell the person their two ways: they edit it themselves, and the edit is recorded as theirs at ' +
    `the next gate; or they send stage ${n} back with ${taskWithBoxes(STALE_TASK.redo, o)}.`;
}
function finishedReason(shown, o) {
  return `${shown} belongs to a finished run: every stage is accepted, and no agent writes into an accepted document, ` +
    'even when the person asks. Tell the person their two ways: they edit it themselves, and the edit is recorded as ' +
    `theirs at the next gate; or they send the stage it belongs to back with ${taskWithBoxes(STALE_TASK.redo, o)}.`;
}
const TRY_OUTSIDE = 'To try something out, write it outside the runs folder. Anything in a run is read as the run\'s own.';
const produced = ids => (ids.length ? ids.join(', ') : 'no document');
const flightLine = (n, ids) => (n ? `The stage in flight is stage ${n}, which produces ${produced(ids)}.` : 'No stage is in flight in this run.');
const placeReason = (shown, n, ids) => {
  if (!n) return `${shown} is not a document, record or part of a stage in flight: no stage is in flight in this run. ${TRY_OUTSIDE}`;
  const f = STAGE_DIRS[n - 1];
  return `${shown} is not where a document, record or part of stage ${n}, the stage in flight, goes: a document is a .md ` +
    `file directly in ${f}/, a part is in ${f}/parts/, and a record is in records/${f}/. Stage ${n} produces ${produced(ids)}. ` +
    TRY_OUTSIDE;
};
const stageReason = (shown, stage, n, ids) => `${shown} belongs to stage ${stage}, which is not in flight, and only the ` +
  `stage in flight is written. ${flightLine(n, ids)}`;
const runReason = (shown, runId, other) => `${shown} is in the run ${runId}, and the front matter names the run ${other}: ` +
  `what is written in a run carries that run's own run_id, ${runId}, and content from another run or an example is not ` +
  `this run's. ${TRY_OUTSIDE}`;
const noIdReason = (shown, n, ids, runId) => `${shown} declares no artifact_id, on disk or in this write, so no reader ` +
  `takes it for one of stage ${n}'s documents (${produced(ids)}). Where it is one of them and its front matter was lost, ` +
  `put the front matter back in this write, with artifact_id: and its id, and run_id: ${runId}. ${TRY_OUTSIDE}`;
const idReason = (shown, how, bad, n, ids) => `${shown} ${how} ${bad.join(', ')}, which stage ${n} does not produce ` +
  `(it produces ${produced(ids)}). A file is read by the id it declares, so no reader takes it for one of this stage's.`;
const recordNameReason = (shown, folder) => `${shown} is not named as a record is: <id>-r<number>-<what it is>.record.md, ` +
  `numbered from r01, in records/${folder}/.`;
const recordNoIdReason = (shown, id, runId) => `${shown} would declare no artifact_id after this write, and a record is ` +
  `read by the id inside it, so it would be read as no record. Write it with its front matter: run_id: ${runId} and ` +
  `artifact_id: ${id}.`;

export function writeRule(w, o) {
  const pl = placeOf(absOf(w.path, o), o);
  if (pl.where === 'outside') return null;
  const lower = pl.parts.map(s => s.toLowerCase());
  const sup = lower.indexOf(SUPPLIED_DIR);
  if (pl.where === 'repo') {
    if (sup !== -1) return { refuse: suppliedReason(pl.shown, pl.parts.slice(0, sup + 1).join('/')), guard: 'write', pl };
    if (WORKFLOW_DIRS.includes(lower[0]) && pl.parts.length > 1) return { refuse: workflowReason(pl.shown), guard: 'write', pl };
    if ((RELEASED_DIRS.includes(lower[0]) && pl.parts.length > 1) || (pl.parts.length === 1 && RELEASED_FILES.map(f => f.toLowerCase()).includes(lower[0])))
      return { refuse: releasedReason(pl.shown), guard: 'write', pl };
    return null;
  }

  const p = pl.parts;
  const runShown = pl.shown.slice(0, pl.shown.length - p.join('/').length).replace(/\/$/, '');
  if (sup !== -1) return { refuse: suppliedReason(pl.shown, `${runShown}/${p.slice(0, sup + 1).join('/')}`), guard: 'write', pl };
  if ((p.length === 1 && TASK_WRITTEN.files.includes(p[0])) || TASK_WRITTEN.dirs.includes(p[0]))
    return { refuse: taskWrittenReason(pl.shown), guard: 'write', pl };

  const state = runStateOf(pl.runDir);
  const stages = state.stages || [];
  const finished = isFinished(state);
  const flight = stageInFlight(state);
  const cv = contractView(o);

  let stage = null, kind = 'other';
  const si = STAGE_DIRS.indexOf(p[0]);
  if (si !== -1) {
    stage = si + 1;
    if (p.length === 2 && p[1].toLowerCase().endsWith('.md')) kind = 'document';
    else if (p.length === 3 && p[1] === 'parts') kind = 'part';
    else if (p.length === 3 && TASK_WRITTEN.stageDirs.includes(p[1])) kind = 'brief';
  } else if (p[0] === RECORDS_DIR && p.length === 3 && STAGE_DIRS.includes(p[1])) {
    stage = STAGE_DIRS.indexOf(p[1]) + 1; kind = 'record';
  } else if (p.length === 1 && p[0] === RUN_SOURCES) kind = 'sources';

  const st = stage ? stages.find(s => Number(s.id) === stage) : null;
  if (stage && (finished || (st && st.status === 'accepted'))) return { refuse: acceptedReason(pl.shown, stage, o), guard: 'write', pl };
  if (finished) return { refuse: finishedReason(pl.shown, o), guard: 'write', pl };

  const phase = kind === 'brief' || kind === 'part' ? cv.phases.find(x => x.stage === stage && x.re.test(p.join('/'))) || null : null;
  if (kind === 'brief' && !phase) return { refuse: taskWrittenReason(pl.shown), guard: 'write', pl };
  if (kind === 'sources') return { allow: true, kind, pl };

  const owed = flight ? [...(cv.produces.get(flight) || [])].sort(byId) : [];
  const other = reason => ({ refuse: reason, guard: 'write', pl });
  if (!stage || kind === 'other') return other(placeReason(pl.shown, flight, owed));
  if (stage !== flight) return other(stageReason(pl.shown, stage, flight, owed));

  const made = new Set(owed);
  const takenIn = cv.takenIn.get(flight) || new Set();
  const onDisk = w.create ? '' : headOf(pl.abs);
  const now = w.create ? w.content : onDisk;
  const edited = w.create ? null : keyIn(w.text, 'artifact_id');
  const runs = [keyIn(now, 'run_id'), keyIn(w.text, 'run_id')].filter(Boolean);
  const elsewhere = runs.find(r => r !== pl.runId);
  if (elsewhere) return other(runReason(pl.shown, pl.runId, elsewhere));

  if (kind === 'document') {
    const ids = [...new Set([declaredIdIn(now), edited].filter(Boolean))];
    if (!ids.length) return other(noIdReason(pl.shown, flight, owed, pl.runId));
    const bad = ids.filter(id => !(made.has(id) || (!w.create && takenIn.has(id))));
    if (bad.length) return other(idReason(pl.shown, 'declares', bad, flight, owed));
    return { allow: true, kind, stage, id: ids[0], pl };
  }
  if (kind === 'record') {
    const name = recordName(p[2]);
    if (!name || name.nn === 0) return other(recordNameReason(pl.shown, p[1]));
    const inside = declaredIdIn(now);
    if (w.create && !inside) return other(recordNoIdReason(pl.shown, name.id, pl.runId));
    const ids = [...new Set([name.id, inside, edited].filter(Boolean))];
    const bad = ids.filter(id => !made.has(id));
    if (bad.length) return other(idReason(pl.shown, 'names', bad, flight, owed));
    return { allow: true, kind, stage, id: name.id, pl };
  }
  if (kind === 'part') {
    const of = [...new Set([keyIn(now, 'part_of'), w.create ? null : keyIn(w.text, 'part_of')].filter(Boolean))];
    const bad = of.filter(id => !made.has(id));
    if (bad.length) return other(idReason(pl.shown, 'is a part of', bad, flight, owed));
    return { allow: true, kind, stage, id: of[0] || null, phase, pl };
  }
  return { allow: true, kind, stage, id: keyIn(now, 'part_of'), phase, pl };
}

export function skillFor(r, o) {
  if (!r || !r.allow || r.kind === 'sources') return null;
  const cv = contractView(o);
  const who = r.id ? cv.producer.get(r.id) : null;
  const skill = (who && who.skill) || (r.phase && r.phase.skill) || null;
  if (!skill) return null;
  const name = r.id ? documentName(r.id, o) : '';
  const doc = name ? `the ${name}` : 'its document';
  const what = r.id
    ? `${r.id}, ${r.kind === 'record' ? `a record of ${doc}` : r.kind === 'part' ? `a part of ${doc}` : r.kind === 'brief' ? `the ${r.phase ? r.phase.id : 'fan-out'} of ${doc}` : doc}`
    : `what the ${r.phase.id} phase of stage ${r.stage} writes`;
  return { skill, what };
}

const chatOf = input => String((input && input.session_id) || '').replace(/[^A-Za-z0-9._-]/g, '_');
const notePath = (o, chat) => join(o.notesDir, `${chat}.json`);
const blankNote = chat => ({ chat, reads: 0, skills: [], tasks: {}, files: {} });
export function readNote(o, chat) {
  if (!chat) return blankNote('');
  try {
    const n = JSON.parse(readFileSync(notePath(o, chat), 'utf8'));
    return { ...blankNote(chat), ...n, skills: Array.isArray(n.skills) ? n.skills : [], tasks: n.tasks || {}, files: n.files || {} };
  } catch { return blankNote(chat); }
}
function saveNote(o, chat, change) {
  if (!chat) return;
  mkdirSync(o.notesDir, { recursive: true });
  const path = notePath(o, chat);
  const fresh = !existsSync(path);
  const note = readNote(o, chat);
  change(note);
  const tmp = `${path}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(note));
  renameSync(tmp, path);
  if (fresh) {
    const old = o.now() - NOTE_DAYS * 24 * 3600 * 1000;
    for (const f of readdirSync(o.notesDir).filter(x => x.endsWith('.json') && x !== basename(path))) {
      try { if (statSync(join(o.notesDir, f)).mtimeMs < old) unlinkSync(join(o.notesDir, f)); } catch {  }
    }
  }
}
export function logLine(o, entry) {
  try {
    mkdirSync(o.notesDir, { recursive: true });
    appendFileSync(join(o.notesDir, LOG_FILE), `${JSON.stringify({ at: new Date(o.now()).toISOString(), ...entry })}\n`);
  } catch {  }
}

export function fingerprint(runDir, cache = {}) {
  const files = [];
  const walk = (abs, rel, top) => {
    let entries = [];
    try { entries = readdirSync(abs, { withFileTypes: true }); } catch { return; }
    for (const e of entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
      if (e.name.startsWith('.')) continue;
      if (e.isDirectory()) { if (top && TASK_WRITTEN.stageDirs.includes(e.name)) continue; walk(join(abs, e.name), `${rel}/${e.name}`, false); }
      else if (e.isFile()) files.push([`${rel}/${e.name}`, join(abs, e.name)]);
    }
  };
  for (const d of STAGE_DIRS) walk(join(runDir, d), d, true);
  walk(join(runDir, RECORDS_DIR), RECORDS_DIR, false);
  const h = createHash('sha256');
  const seen = new Set();
  for (const [rel, abs] of files) {
    const s = statSync(abs);
    const key = `${s.size}:${s.mtimeMs}`;
    let hash = cache[rel] && cache[rel][0] === key ? cache[rel][1] : null;
    if (!hash) { hash = createHash('sha256').update(readFileSync(abs)).digest('hex').slice(0, 16); cache[rel] = [key, hash]; }
    seen.add(rel);
    h.update(`${rel}\0${hash}\n`);
  }
  for (const k of Object.keys(cache)) if (!seen.has(k)) delete cache[k];
  const state = runStateOf(runDir);
  const acts = {
    decisions: state.decisions || [], refinements: state.refinements || [], stale: state.stale || [],
    know_how_not_read: state.know_how_not_read || [], read_undeclared: state.read_undeclared || [],
    judged_withdrawn: state.judged_withdrawn || [],
    stages: (state.stages || []).map(s => ({ id: s.id, gates: recordedDecisions(s), agreement: s.agreement || null,
      judged_half: s.judged_half || null, owner: s.owner || null, corrections: s.corrections || null,
      supplied_market: s.supplied_market || null })),
  };
  h.update(JSON.stringify(acts));
  return h.digest('hex').slice(0, 16);
}

function taskRun(o) {
  const open = openRuns(o.runsRoot);
  if (open.length > 1) throw new GuardError(`${open.length} runs are unfinished, so which run the task acts on is not known`);
  const dir = open[0] || (runDirs(o.runsRoot).length === 1 ? runDirs(o.runsRoot)[0] : null);
  return dir ? { dir, id: basename(dir) } : null;
}

export const CHECKER_DIR = '.github/scripts/';
export const checkerReadReason = shown => `${shown} is the workflow's own code, and what a check wants is not read there. ` +
  'Every check a gate fails prints what passes on the line under it, beginning "passes", and the report you read after ' +
  'each write gives it as "What passes". For the whole gate, run "SPOCK: explain what the gate failed" and read ' +
  `${LAST_TASK} to the end: for each document it gives what failed, what passes and what to do. If the document ` +
  'already has that shape and the check still fails, tell the person which check, what the document holds and why it ' +
  'should pass, and name the Workflow Support agent in that sentence.';

export const SG2_OPEN = `What the last task said, in full, from ${LAST_TASK}. Act on all of it, not on its first line.`;
export const SG2_CUT_OPEN = `What the last task said, from ${LAST_TASK}: its header and verdict, and every line that ` +
  'names a document, a task or what the stage owes. Act on all of it, not on its first line.';
export const SG2_REST = `The rest is in ${LAST_TASK}.`;
const NAMED_LINE = /\bA\d{1,2}[a-z]?\b|SPOCK: |\bowe[sd]?\b|\.md\b|^## /;

export function lastTaskContext(text) {
  const t = String(text);
  if (t.length <= SG2_LIMIT) return `${SG2_OPEN}\n\n${t}`;
  const i = lastTaskHeadEnd(t);
  const head = (i === -1 ? t.slice(0, 2000) : t.slice(0, i)).trimEnd();
  const kept = [];
  let size = SG2_CUT_OPEN.length + head.length + SG2_REST.length + 8;
  for (const line of (i === -1 ? '' : t.slice(i)).split('\n')) {
    if (!NAMED_LINE.test(line) || kept[kept.length - 1] === line) continue;
    if (size + line.length + 1 > SG2_LIMIT) break;
    kept.push(line);
    size += line.length + 1;
  }
  return `${SG2_CUT_OPEN}\n\n${head}\n\n${kept.join('\n')}\n\n${SG2_REST}`;
}

export const HELD_WHILE_OWED = Object.freeze(['approval', 'choice', 'agreement']);
export const OPENING_FIRST = true;
export const REASON_LANGUAGE = 'en';

export const TRANSCRIPT_VERSION = 1;
export const TURN_BYTES = 2 * 1024 * 1024;

export const plainText = s => String(s == null ? '' : s)
  .replace(/[“”„‟″]/g, '"')
  .replace(/[‘’‚‛′]/g, "'")
  .replace(/[*_`]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const lineType = l => String((l && l.type) || '');
const lineData = l => (l && l.data && typeof l.data === 'object' ? l.data : {});
const parseLines = text => String(text).split('\n').map(l => {
  if (!l.trim()) return null;
  try { const x = JSON.parse(l); return x && typeof x === 'object' && !Array.isArray(x) ? x : null; } catch { return null; }
}).filter(Boolean);

export function readTranscript(path, { tail = false } = {}) {
  if (!path) throw new GuardError('the hook named no transcript, so the chat cannot be read');
  let fd;
  try { fd = openSync(String(path), 'r'); }
  catch (e) { throw new GuardError(`the chat's transcript could not be read (${e.code || String(e.message).split('\n')[0]})`); }
  let head = '', body = '';
  try {
    const size = fstatSync(fd).size;
    const read = (from, len) => { const b = Buffer.alloc(len); const n = readSync(fd, b, 0, len, from); return b.subarray(0, n).toString('utf8'); };
    if (tail && size > TURN_BYTES) {
      const h = read(0, Math.min(size, 65536));
      head = h.split('\n')[0];
      const t = read(size - TURN_BYTES, TURN_BYTES);
      body = t.slice(t.indexOf('\n') + 1);
    } else { head = body = read(0, size); }
  } finally { closeSync(fd); }
  const lines = parseLines(body);
  const heads = head === body ? lines : parseLines(head);
  if (!lines.length && !heads.length) throw new GuardError('the chat\'s transcript holds no line the guard can parse');
  const start = heads.find(l => lineType(l) === 'session.start');
  if (!start) throw new GuardError('the chat\'s transcript holds no session.start line, so its version is not known');
  const v = lineData(start).version;
  if (v !== TRANSCRIPT_VERSION) throw new GuardError(`the chat's transcript is version ${JSON.stringify(v ?? null)}, and the guards read version ${TRANSCRIPT_VERSION}`);
  return lines;
}

export function turnOf(lines) {
  let from = -1;
  lines.forEach((l, i) => { if (lineType(l) === 'user.message') from = i; });
  const turn = lines.slice(from + 1).filter(l => lineType(l) === 'assistant.message').map(lineData);
  const end = turn[turn.length - 1];
  const asks = m => Array.isArray(m.toolRequests) && m.toolRequests.length > 0;
  return { messages: turn.map(m => String(m.content || '')), last: end && !asks(end) ? String(end.content || '') : null };
}
export const chatMessages = lines => lines.filter(l => lineType(l) === 'assistant.message').map(l => String(lineData(l).content || ''));

export function heldRun(o) {
  const open = openRuns(o.runsRoot);
  if (open.length > 1) throw new GuardError(`${open.length} runs are unfinished, so which run this chat is about is not known`);
  if (!open.length || !buildAtLeast(recordedBuild(open[0]), GUARD_TWO_BUILD)) return null;
  return { dir: open[0], id: basename(open[0]) };
}

function tableBlock(id) {
  const b = BLOCKS.find(x => x.id === id);
  if (!b || !Array.isArray(b.rows) || !b.rows.length) throw new GuardError(`the two-language table holds no block ${id}`);
  return b;
}

export const AGENTS_DIR = '.github/agents';
export const AGENTS_REGISTRY = '.github/registry/agents.yaml';
export const AGENT_TOOLS = Object.freeze({
  readFile: Object.freeze(['read_file']),
  listDirectory: Object.freeze(['list_dir']),
  createFile: Object.freeze(['create_file']),
  editFiles: Object.freeze(['replace_string_in_file', 'multi_replace_string_in_file', 'insert_edit_into_file', 'apply_patch']),
  fetch: Object.freeze(['fetch_webpage']),
  websearch: Object.freeze(['vscode-websearchforcopilot_webSearch']),
  runTask: Object.freeze(['run_task']),
  getTaskOutput: Object.freeze(['get_task_output']),
});
const AGENT_TOOLS_SHOWN = { editFiles: 'the four edit tools' };
export const NOTE_OPEN = 'From the workflow, at the start of this chat.';
export const NOTE_TOOL_RULE = 'Your agent file lists your tools, and a tool listed there is yours.';
const installedSentence = name => `${name} comes from an extension installed separately on each computer: where it is ` +
  'among the tools you can call, this computer has it, and where it is not, it has not.';

export function agentRows(o) {
  let files;
  try { files = readdirSync(o.agentsDir).filter(f => f.endsWith('.agent.md')); }
  catch (e) { throw new GuardError(`${AGENTS_DIR} could not be read (${e.code || String(e.message).split('\n')[0]})`); }
  const rows = [];
  for (const f of files) {
    const fm = (/^﻿?---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(join(o.agentsDir, f), 'utf8')) || [])[1] || '';
    const name = (/^name:[ \t]*["']?([^"'\r\n]*?)["']?[ \t]*$/m.exec(fm) || [])[1];
    const list = (/^tools:[ \t]*\[([^\]\r\n]*)\]/m.exec(fm) || [])[1];
    if (!name || list === undefined) continue;
    rows.push({ name, tools: list.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean) });
  }
  return rows.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}
export function installedTools(o) {
  let text;
  try { text = readFileSync(o.agentsRegistry, 'utf8'); }
  catch (e) { throw new GuardError(`${AGENTS_REGISTRY} could not be read (${e.code || String(e.message).split('\n')[0]})`); }
  const m = /^[ \t]*installed:[ \t]*\[([^\]\r\n]*)\]/m.exec(text);
  return m ? m[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean) : [];
}
const toolShown = t => (AGENT_TOOLS[t] ? `${t} (${AGENT_TOOLS_SHOWN[t] || AGENT_TOOLS[t].join(', ')})` : t);

export function chatNote(o, agentType = '') {
  const rows = agentRows(o);
  if (!rows.length) throw new GuardError(`no agent file under ${AGENTS_DIR} names its tools`);
  const mine = rows.filter(r => r.name === String(agentType || ''));
  const shown = mine.length === 1 ? mine : rows;
  const tools = [
    `${NOTE_OPEN} The tools each of this workflow's agents holds, as its agent file lists them` +
      (shown === rows ? '; yours is the row with your name:' : ':'),
    ...shown.map(r => `- ${r.name}: ${r.tools.map(toolShown).join(', ')}`),
    '',
    ...installedTools(o).map(installedSentence),
    NOTE_TOOL_RULE,
  ].join('\n');
  const parts = [tools];
  const open = openRuns(o.runsRoot);
  const lang = open.length === 1 ? languageLine(open[0]) : null;
  if (lang) parts.push(lang);
  return parts.join('\n\n');
}

export const SG4_STAGE = 3;
export const OPENING_BLOCK = 'Z53-S3';
export const OPENING_SUPPLIED = 'listSupplied';
export const MARKET_TASK = 'SPOCK: what market material has been supplied';
export function openingSentences() {
  const rows = tableBlock(OPENING_BLOCK).rows;
  const of = w => rows.filter(r => r.when === undefined || r.when === w);
  const plain = of(`!${OPENING_SUPPLIED}`), listed = of(OPENING_SUPPLIED);
  const pick = [plain[0], ...plain.filter(r => /^\d+\.\s/.test(String(r.en))), plain[plain.length - 1]];
  const own = listed.filter(r => r.when === OPENING_SUPPLIED && r.starts === 'para' && !/\{[^{}]*\}/.test(String(r.en)));
  const named = [listed[0], ...own, listed[listed.length - 1]];
  return { en: pick.map(r => r.en), cs: pick.map(r => r.cs), supplied: { en: named.map(r => r.en), cs: named.map(r => r.cs) } };
}
export function carriesOpening(text, s = openingSentences()) {
  const t = plainText(text);
  const holds = set => ['en', 'cs'].some(l => set[l].every(x => t.includes(plainText(x))));
  return holds(s) || (!!s.supplied && holds(s.supplied));
}
export function stageWritten(runDir, n) {
  const folder = STAGE_DIRS[n - 1];
  const any = (abs, top) => {
    let es;
    try { es = readdirSync(abs, { withFileTypes: true }); } catch { return false; }
    return es.some(e => !e.name.startsWith('.') && !(top && e.isDirectory() && e.name.toLowerCase() === SUPPLIED_DIR)
      && (e.isFile() || (e.isDirectory() && any(join(abs, e.name), false))));
  };
  return any(join(runDir, folder), true) || any(join(runDir, RECORDS_DIR, folder), false);
}
function openingHeld(lines) {
  if (!OPENING_FIRST) return true;
  const s = openingSentences();
  return chatMessages(lines).some(m => carriesOpening(m, s));
}
export function openingReason(runDir = null) {
  const folder = `${STAGE_DIRS[SG4_STAGE - 1]}/${SUPPLIED_DIR}/`;
  const send = 'Send the opening the workflow printed for this stage as it stands (run "SPOCK: continue", which prints it, where this chat ' +
    'did not open with it), and end your turn.';
  if (runDir && listedFiles(join(runDir, STAGE_DIRS[SG4_STAGE - 1], SUPPLIED_DIR)).length)
    return `Stage ${SG4_STAGE} has not begun: nothing of it is written, and this chat does not hold its opening, the message ` +
      `that tells the person their list in ${folder} is the one researched and names the task that takes it in, "${MARKET_TASK}". ` +
      `Nothing is searched or fetched before they have read it. ${send} Fetch the addresses on their list once they have run that task.`;
  return `Stage ${SG4_STAGE} has not begun: nothing of it is written, and this chat does not hold its opening, the message ` +
    `that tells the person the stage's two ways of working, their own list in ${folder} ` +
    `or a search. Nothing is searched or fetched before they have read it. ${send} Search or fetch once they say to begin.`;
}

export function actTasks(o) {
  const commands = commandsOf(o);
  const approve = [...commands].filter(([, words]) => words.split(/\s::\s/)
    .some(step => /\badvance\.mjs\b/.test(step) && /(?:^|\s)--approve(?:\s|$)/.test(step))).map(([label]) => label);
  const byAct = { approval: approve, choice: [PERSON_TASK.choice], agreement: [PERSON_TASK.agreement] };
  return [...new Set(HELD_WHILE_OWED.flatMap(a => byAct[a] || []))].filter(Boolean);
}
export function driverTask(o) {
  const commands = commandsOf(o);
  const t = [...commands.keys()].find(label => scriptsOf(label, o, commands).includes('written.mjs'));
  if (!t) throw new GuardError(`no task in ${TASKS_FILE} runs written.mjs, so the task that says when the stage is ready is not known`);
  return t;
}
function standingOf(runDir) {
  const state = runStateOf(runDir);
  const have = new Map();
  for (const a of runArtifacts(runDir)) (have.get(Number(a.stage)) || have.set(Number(a.stage), new Set()).get(Number(a.stage))).add(a.id);
  return { state, s: standing(state, have) };
}
export function namedTask(text, labels) {
  const t = plainText(text);
  const at = labels.map(l => ({ l, i: t.indexOf(plainText(l)) })).filter(x => x.i !== -1).sort((a, b) => a.i - b.i);
  return at.length ? at[0].l : null;
}
export const FOLDED = 'The person will not see the message you just wrote: when a turn is sent back, VS Code folds it into the ' +
  'turn\'s collapsed steps.';
export const WHOLE_AGAIN = 'Send the whole message again, complete, with these lines put back word for word where they belong, ' +
  'and nothing added before it.';

export function owedReason(task, n, ids, driver, o) {
  const owed = ids.map(id => { const name = documentName(id, o); return name ? `${id} (${name})` : id; }).join(', ');
  return `Your last message sends the person to "${task}", and stage ${n} still owes ${owed}, which you write: nothing ` +
    'is asked of a person while the stage owes a document. ' +
    `${FOLDED} Send that message again, whole, with nothing added before it, and where it sends them to "${task}", tell ` +
    `them in its place, in one sentence, not to run it yet. Then write what is owed and run "${driver}", which says when ` +
    'the stage is ready for them; or, where you cannot write it, tell them the stage is not ready and what is missing, ' +
    'and name no task for them.';
}

export const REVIEW_BLOCK = 'Z53-M2';
export function reviewAsk() {
  const rows = tableBlock(REVIEW_BLOCK).rows.filter(r => !r.part);
  const others = BLOCKS.filter(b => b.id !== REVIEW_BLOCK);
  const elsewhere = { en: plainText(others.map(b => render(b.id, 'en')).join('\n')), cs: plainText(others.map(b => render(b.id, 'cs')).join('\n')) };
  const onlyWhere = r => ['questions', 'set', 'gaps', 'finding', 'opening'].includes(String(r.when || '').replace(/^!/, ''));
  const markers = {};
  for (const l of ['en', 'cs']) {
    markers[l] = [...new Set(rows.filter(r => !onlyWhere(r) && !/[{}]/.test(String(r[l])) && /^[\p{Lu}\d]/u.test(String(r[l]))
      && !elsewhere[l].includes(plainText(r[l]))).map(r => r[l]))];
  }
  const one = rows.findIndex(r => /^1\.\s/.test(String(r.en)));
  if (one === -1 || !rows.some(r => r.when === 'prd')) throw new GuardError(`${REVIEW_BLOCK} in the two-language table is not in the shape SG6 reads`);
  const forms = { ordinary: rows.filter(r => r.when !== 'prd'), prd: [...rows.slice(0, one + 1), ...rows.slice(one + 1).filter(r => r.when === 'prd' || !r.when)] };
  const stars = {};
  for (const [f, set] of Object.entries(forms))
    stars[f] = { en: [...new Set(set.filter(r => r.star).map(r => r.en))], cs: [...new Set(set.filter(r => r.star).map(r => r.cs))] };
  const example = BLOCKS.filter(b => b.printed).flatMap(b => b.rows).find(r => /\bas in "\{[^{}]*\}", or "\{[^{}]*\}"/i.test(String(r.en)));
  return { markers, stars, example: example ? { en: example.en, cs: example.cs } : null };
}
export function isReviewAsk(text, ask = reviewAsk()) {
  const t = plainText(text);
  return ['en', 'cs'].some(l => ask.markers[l].some(m => t.includes(plainText(m))));
}
const prdStages = () => Object.values(WAITS_ON_A_PERSON).filter(w => w.after === 'agreement').map(w => Number(w.stage));
export function printedQuestions(lines) {
  const ls = (lines || []).map(String);
  if (ls.length < 2) return { questions: [], examples: null };
  const end = ls.findIndex(l => /^Answer (?:it|them) in box 3 of the approval\b/.test(l));
  const questions = ls.slice(1, end === -1 ? ls.length : end).map(l => l.trim()).filter(l => /^\d+\.\s/.test(l));
  const ex = [...(ls.find(l => /\bas in "/i.test(l)) || '').matchAll(/"([^"]*)"/g)].map(m => m[1]);
  return { questions, examples: ex.length === 2 ? ex : null };
}
export function missingLines(text, { form, lang, printed, ask = reviewAsk() }) {
  const t = plainText(text);
  const has = s => t.includes(plainText(s));
  const out = ask.stars[form][lang].filter(s => !has(s));
  for (const q of printed.questions) if (!has(q.replace(/^\d+\.\s+/, ''))) out.push(q);
  if (printed.examples && ask.example && !printed.examples.every(has)) {
    const k = printed.questions.length, form = k === 1 ? 0 : k < 5 ? 1 : 2;
    const fill = { them: GRAMMAR.them[form][lang], example: printed.examples[0], bare: printed.examples[1] };
    out.push(String(ask.example[lang]).replace(/\{([^{}]*)\}/g, (m, key) => fill[key] ?? m));
  }
  return out;
}
export function printedAsk(o, ask = reviewAsk()) {
  let text;
  try { text = readFileSync(o.lastTask, 'utf8').replace(/\r\n/g, '\n'); } catch { return null; }
  const parts = [...text.matchAll(/^Message to send, as it stands:\n([\s\S]*?)\nEnd of message\.$/gm)].map(m => m[1]);
  return parts.find(p => isReviewAsk(p, ask)) || null;
}
export const LIST_MARKER = /^(?:\d+[.)]|[-*>])(?:\s+|$)/;
export const heldText = (s, link = 'text') => plainText(String(s == null ? '' : s)
  .replace(/\[([^\][\n]*)\]\(([^()\s]*)\)/g, (m, label, at) => (link === 'address' && at ? at : label))
  .replace(/<((?:https?:\/\/|runs\/)[^<>\s]*)>/g, '$1'));
const heldEnd = s => s.replace(/[\s.!?:;,…]+$/u, '');
const words = s => String(s).toLowerCase().match(/[\p{L}\d]+/gu) || [];
export const JOIN_WORDS = {
  en: ['a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'at', 'as', 'by', 'with', 'into', 'it', 'its', 'is', 'are',
    'was', 'were', 'be', 'this', 'that', 'these', 'those', 'they', 'them', 'their', 'you', 'your', 'i', 'me', 'my', 'we'],
  cs: ['a', 'i', 'v', 've', 'na', 'z', 'ze', 's', 'se', 'k', 'ke', 'do', 'o', 'u', 'za', 'pro', 'jako', 'je', 'jsou', 'to',
    'ten', 'ta', 'ty', 'že', 'který', 'která', 'které', 'jak'],
};
const joinWords = new Set([...JOIN_WORDS.en, ...JOIN_WORDS.cs]);
const contentWords = s => words(heldText(s)).filter(w => !joinWords.has(w));
const inOrder = (have, need) => { let i = 0; for (const w of have) if (i < need.length && w === need[i]) i++; return i === need.length; };
export function missingPrinted(text, printed) {
  const ts = ['text', 'address'].map(k => heldText(text, k));
  const sentences = String(printed).split('\n').map(l => l.trim().replace(LIST_MARKER, '').trim()).filter(Boolean)
    .flatMap(l => l.split(/(?<=[.!]|\S\?)\s+(?=\S)/)).map(s => s.trim()).filter(s => /[\p{L}\d]/u.test(s) && !/^\d+[.)]$/.test(s));
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const found = s => {
    const h = heldEnd(heldText(s));
    return !!h && ts.some(t => new RegExp(`(?<![\\p{L}\\d])${esc(h)}(?=[.!?:;…]|$| [\\p{Lu}\\d"'(\\[*>-])`, 'u').test(t));
  };
  const left = sentences.map(s => !found(s));
  const turn = String(text == null ? '' : text).split('\n').flatMap(l => ['text', 'address'].flatMap(k => heldText(l, k).split(/(?<=[.!?])\s+/)))
    .map(words).filter(w => w.length);
  const joined = (a, b) => { const need = [...contentWords(a), ...contentWords(b)]; return need.length > 0 && turn.some(w => inOrder(w, need)); };
  const kept = left.map((l, i) => l && !((i > 0 && joined(sentences[i - 1], sentences[i])) || (i + 1 < sentences.length && joined(sentences[i], sentences[i + 1]))));
  return [...new Set(sentences.filter((s, i) => kept[i]))];
}

export const SIGNING_BLOCK = 'Z53-M3';
export function signingAsk() {
  const rows = tableBlock(SIGNING_BLOCK).rows.filter(r => !r.part && r.when === undefined);
  const others = BLOCKS.filter(b => b.id !== SIGNING_BLOCK);
  const markers = {};
  for (const l of ['en', 'cs']) {
    const elsewhere = plainText(others.map(b => render(b.id, l)).join('\n'));
    markers[l] = [...new Set(rows.filter(r => !/[{}]/.test(String(r[l])) && /^[\p{Lu}\d]/u.test(String(r[l]))
      && !elsewhere.includes(plainText(r[l]))).map(r => r[l]))];
  }
  return { markers };
}
export function isSigningAsk(text, sign = signingAsk()) {
  const t = plainText(text);
  return ['en', 'cs'].some(l => sign.markers[l].some(m => t.includes(plainText(m))));
}
export function printedSigning(o, head) {
  let text;
  try { text = readFileSync(o.lastTask, 'utf8').replace(/\r\n/g, '\n'); } catch { return null; }
  const at = text.indexOf(`\n${head}\n`);
  if (at === -1) return null;
  const rest = text.slice(at + head.length + 2);
  const end = rest.search(/^End of message\.$/m);
  return end === -1 ? null : rest.slice(0, end).replace(/\n$/, '');
}
export const QUOTED_FILLS = ['finding', 'judge', 'gap'];
export function fixedLines(printed, id = REVIEW_BLOCK) {
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const quoted = tableBlock(id).rows.filter(r => {
    const keys = [...String(r.en).matchAll(/\{([^{}]*)\}/g)].map(m => m[1]);
    return keys.length > 0 && keys.every(k => QUOTED_FILLS.includes(k)) && !/[\p{L}\d]/u.test(String(r.en).replace(/\{[^{}]*\}/g, ''));
  });
  const res = quoted.flatMap(r => ['en', 'cs'].map(l => new RegExp(`^${String(r[l]).split(/\{[^{}]*\}/).map(esc).join('.+')}$`)));
  return String(printed).split('\n').filter(l => !res.some(re => re.test(l.trim()))).join('\n');
}

export const missingReason = (lines, ask = 'for a review') => `Your ask ${ask} leaves out lines the person reads word for word: ` +
  `${lines.map((l, i) => `${i + 1}. "${l}"`).join(' · ')}. ${FOLDED} ${WHOLE_AGAIN}`;

const block = reason => ({ hookSpecificOutput: { hookEventName: 'Stop', decision: 'block', reason } });

export async function openingNote(o) {
  const open = openRuns(o.runsRoot);
  if (open.length > 1) return '';
  const { messageLines } = await import('./messages.mjs');
  let lines;
  if (!open.length) lines = messageLines(null, 'opening', { stage: 1 });
  else {
    const dir = open[0];
    const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
    const n = Number(state.current_stage);
    const st = (state.stages || []).find(s => Number(s.id) === n);
    if (!st || !['pending', 'running'].includes(String(st.status)) || stageWritten(dir, n)) return '';
    lines = messageLines(dir, n === 3 ? 'market' : 'opening', { stage: n });
  }
  return [OPENING_NOTE_LEAD, ...lines].join('\n');
}
export const OPENING_NOTE_LEAD = 'This chat opens a stage. Your first message is the stage\'s opening below, sent as it stands, before anything is searched, fetched or written:';

async function startAnswer(o, inp, chat) {
  try {
    const note = chatNote(o, inp.agent_type);
    let opening = '';
    try { opening = await openingNote(o); } catch { opening = ''; }
    logLine(o, { chat, guard: 'note', decision: 'context', tool: '', target: '' });
    return { hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: opening ? `${note}\n\n${opening}` : note } };
  } catch (e) {
    logLine(o, { chat, guard: 'note', decision: 'step-aside', tool: '', target: '', why: String((e && e.message) || e).split('\n')[0].slice(0, 300) });
    return {};
  }
}

const lastTaskTime = o => { try { return statSync(o.lastTask).mtimeMs; } catch { return 0; } };

export function chatStartOf(path) {
  if (!path) return null;
  let fd;
  try { fd = openSync(String(path), 'r'); } catch { return null; }
  try {
    const b = Buffer.alloc(65536);
    const n = readSync(fd, b, 0, b.length, 0);
    const first = parseLines(b.subarray(0, n).toString('utf8').split('\n')[0])[0];
    if (!first || lineType(first) !== 'session.start') return null;
    const t = Date.parse(String(lineData(first).startTime || first.timestamp || ''));
    return Number.isFinite(t) ? t : null;
  } finally { closeSync(fd); }
}

export function relayHead(text) {
  const t = String(text || '').replace(/\r\n/g, '\n');
  const end = lastTaskHeadEnd(t);
  const head = end === -1 ? t : t.slice(0, end);
  const kept = head.search(new RegExp(`^${KEPT_HEADING.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'));
  return (kept === -1 ? head : head.slice(0, kept)).trimEnd();
}
export function ranLabel(head) {
  const t = String(head || '');
  const i = t.indexOf(`${RAN_HEADING}\n`);
  if (i === -1) return null;
  const line = t.slice(i + RAN_HEADING.length).split('\n').map(l => l.trim()).find(Boolean) || '';
  return (/^`([^`]+)`$/.exec(line) || [])[1] || null;
}
export const printedMessages = text => [...String(text || '').replace(/\r\n/g, '\n')
  .matchAll(/^Message to send, as it stands:\n([\s\S]*?)\nEnd of message\.$/gm)].map(m => m[1]);

export function personRun(o, note, since) {
  if (since === null || since === undefined) return null;
  let at;
  try { at = statSync(o.lastTask).mtimeMs; } catch { return null; }
  if (!(at > since)) return null;
  const text = readFileSync(o.lastTask, 'utf8').replace(/\r\n/g, '\n');
  const head = relayHead(text);
  const label = ranLabel(head);
  const t = label ? tasksOf(o).find(x => x.label === label) || null : null;
  if (label && (!t || !t.boxes.length)) {
    const started = note && note.tasks && note.tasks[label] ? note.tasks[label].started : null;
    const previous = note && note.stop ? note.stop.at : null;
    if (started && (previous === null || started >= previous)) return null;
  }
  return { label, head, messages: printedMessages(text), refused: !!unrecordedOf(head) };
}
function relayRun(o) {
  const run = taskRun(o);
  return run && buildAtLeast(recordedBuild(run.dir), GUARD_TWO_BUILD) ? run : null;
}
const sinceOf = (note, inp) => (note.stop ? note.stop.lastTask : chatStartOf(inp.transcript_path));

export function relayContext(r) {
  const named = r.label ? `"${r.label}"` : 'a task';
  const send = r.messages.length
    ? ': it printed a message for them, below between "Message to send, as it stands:" and "End of message.", which you send as it stands'
    : '';
  return [`The person ran ${named} since your last message, and ${LAST_TASK} holds what it said. Before anything else, tell ` +
    `them what it said${send}. Read the run record after that. The head of ${LAST_TASK}:`,
  r.head, ...r.messages.map(m => `Message to send, as it stands:\n${m}\nEnd of message.`)].join('\n\n');
}
export const relayReason = (label, lines) => `The person ran ${label ? `"${label}"` : 'a task'} before your last message, and it ` +
  `printed a message for them in ${LAST_TASK} that your turn leaves out: ${lines.map((l, i) => `${i + 1}. "${l}"`).join(' · ')}. ` +
  `${FOLDED} ${WHOLE_AGAIN}`;

function promptAnswer(o, inp, chat) {
  const log = e => logLine(o, { chat, guard: 'SG7', tool: '', target: '', ...e });
  try {
    if (!relayRun(o)) return {};
    const note = readNote(o, chat);
    const since = sinceOf(note, inp);
    if (since === null) {
      if (existsSync(o.lastTask)) log({ decision: 'step-aside', why: 'the chat has no end of a turn noted and its transcript gives no start, so which task ran since is not known' });
      return {};
    }
    const ran = personRun(o, note, since);
    if (!ran) return {};
    log({ decision: 'context', target: ran.label || '' });
    return { hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: relayContext(ran) } };
  } catch (e) {
    log({ decision: 'step-aside', why: String((e && e.message) || e).split('\n')[0].slice(0, 300) });
    return {};
  }
}

async function stopAnswer(o, inp, chat) {
  let g = 'stop';
  const log = e => logLine(o, { chat, guard: g, tool: '', target: '', ...e });
  try {
    const note = readNote(o, chat);
    try { saveNote(o, chat, n => { n.stop = { at: o.now(), lastTask: lastTaskTime(o) }; }); }
    catch (e) { log({ decision: 'step-aside', why: `the chat's note could not be written (${String((e && e.message) || e).split('\n')[0].slice(0, 200)})` }); }
    if (inp.stop_hook_active === true) { log({ decision: 'end', why: 'the turn was sent back once already, so it ends' }); return {}; }
    const run = heldRun(o);
    const relayAt = relayRun(o);
    if (!run && !relayAt) return {};
    const turn = turnOf(readTranscript(inp.transcript_path, { tail: true }));
    if (turn.last === null) { log({ decision: 'step-aside', why: 'the turn\'s last message still asks for a tool, so the turn ends unread' }); return {}; }

    g = 'SG7';
    const ran = relayAt ? personRun(o, note, sinceOf(note, inp)) : null;
    if (ran && !ran.refused && ran.messages.length) {
      let ask = null;
      try { ask = reviewAsk(); } catch { ask = null; }
      const held = ran.messages.map(m => (ask && isReviewAsk(m, ask) ? fixedLines(m) : m));
      const left = missingPrinted(turn.messages.join('\n\n'), held.join('\n'));
      if (left.length) { log({ decision: 'block', target: ran.label || '' }); return block(relayReason(ran.label, left)); }
    }
    if (!run) return {};
    const { state, s } = standingOf(run.dir);

    g = 'SG5';
    const task = namedTask(turn.last, actTasks(o));
    if (task && (s.agent || []).length) {
      const reason = owedReason(task, s.stage, s.agent, driverTask(o), o);
      log({ decision: 'block', target: task });
      return block(reason);
    }

    g = 'SG6';
    const text = turn.messages.join('\n\n');
    const ask = reviewAsk();
    const review = isReviewAsk(text, ask), signing = isSigningAsk(text);
    if (s.stage === null || (!review && !signing)) return {};
    const left = [];
    if (review) {
      const printedMessage = printedAsk(o, ask);
      if (printedMessage) left.push(...missingPrinted(text, fixedLines(printedMessage)));
      else {
        const lang = runLanguage(run.dir) === 'cs' ? 'cs' : 'en';
        const form = prdStages().includes(s.stage) ? 'prd' : 'ordinary';
        left.push(...missingLines(text, { form, lang, printed: { questions: [], examples: null }, ask }));
      }
    }
    if (signing) {
      const { WRAP } = await import('./messages.mjs');
      const printedSign = printedSigning(o, WRAP.signature);
      if (printedSign) for (const l of missingPrinted(text, printedSign)) if (!left.includes(l)) left.push(l);
    }
    if (!left.length) return {};
    log({ decision: 'block', target: left[0].slice(0, 200) });
    return block(missingReason(left, review ? 'for a review' : 'for the signature'));
  } catch (e) {
    log({ decision: 'step-aside', why: String((e && e.message) || e).split('\n')[0].slice(0, 300) });
    return {};
  }
}

export function decide(event, input, opts = {}) {
  const inp = input && typeof input === 'object' ? input : {};
  const o = options({ cwd: inp.cwd, ...opts });
  const chat = chatOf(inp);
  const tool = String(inp.tool_name || '');
  let args = inp.tool_input;
  if (typeof args === 'string') { try { args = JSON.parse(args); } catch { args = {}; } }
  if (!args || typeof args !== 'object') args = {};
  const kind = toolKind(tool);
  let guard = null, target = '';
  const stepAside = (g, why) => { logLine(o, { chat, guard: g, decision: 'step-aside', tool, target, why }); return {}; };
  const refuse = (g, reason) => { logLine(o, { chat, guard: g, decision: 'deny', tool, target, why: reason.slice(0, 200) }); return deny(reason); };
  if (event === 'SessionStart') return startAnswer(o, inp, chat);
  if (event === 'Stop') return stopAnswer(o, inp, chat);
  if (event === 'UserPromptSubmit') return promptAnswer(o, inp, chat);
  try {
    if (!kind) return {};

    if (event === 'PreToolUse' && kind === 'outward') {
      guard = 'SG4';
      const run = heldRun(o);
      if (!run) return {};
      if (stageInFlight(runStateOf(run.dir)) !== SG4_STAGE || stageWritten(run.dir, SG4_STAGE)) return {};
      if (openingHeld(readTranscript(inp.transcript_path))) return {};
      return refuse('SG4', openingReason(run.dir));
    }

    if (event === 'PreToolUse' && kind === 'task') {
      guard = 'SG1';
      const t = taskOf(args, o);
      target = t ? t.label : String(args.id || '');
      if (!t) return {};
      if (t.boxes.length) return refuse('SG1', personTaskReason(t));
      guard = 'loop';
      if (!chat) return stepAside('loop', 'the hook named no chat, so there is nowhere to count its runs');
      const run = taskRun(o);
      if (!run) return {};
      let refused = false;
      saveNote(o, chat, n => {
        const cache = (n.files[run.id] = n.files[run.id] || {});
        const fp = fingerprint(run.dir, cache);
        const was = n.tasks[t.label];
        const unchanged = was && was.run === run.id && was.fp ? (was.fp === fp ? (was.unchanged || 0) + 1 : 0) : 0;
        n.tasks[t.label] = { run: run.id, fp: was && was.run === run.id ? was.fp || null : null, unchanged, started: o.now() };
        refused = unchanged >= 3;
      });
      return refused ? refuse('loop', loopReason(t.label, o)) : {};
    }

    if (event === 'PostToolUse' && kind === 'task') {
      guard = 'SG2';
      const t = taskOf(args, o);
      target = t ? t.label : String(args.id || '');
      let started = null;
      if (t && chat) {
        try {
          const run = taskRun(o);
          saveNote(o, chat, n => {
            const was = n.tasks[t.label] || {};
            started = was.started || null;
            if (!run) return;
            const cache = (n.files[run.id] = n.files[run.id] || {});
            n.tasks[t.label] = { ...was, run: run.id, fp: fingerprint(run.dir, cache), unchanged: was.run === run.id ? was.unchanged || 0 : 0 };
          });
        } catch (e) { stepAside('loop', String((e && e.message) || e).split('\n')[0].slice(0, 300)); }
      }
      guard = 'SG2';
      if (!existsSync(o.lastTask)) return {};
      if (started && statSync(o.lastTask).mtimeMs < started - 2000) return {};
      return context(lastTaskContext(readFileSync(o.lastTask, 'utf8')));
    }

    if (event === 'PreToolUse' && kind === 'read') {
      guard = 'checker';
      if (!args.filePath) return {};
      const rel = below(o.root, absOf(args.filePath, o));
      if (!rel || !rel.startsWith(CHECKER_DIR)) return {};
      target = rel;
      const run = taskRun(o);
      if (!run || !buildAtLeast(recordedBuild(run.dir), CHECKER_READ_BUILD)) return {};
      return refuse('checker', checkerReadReason(rel));
    }

    if (event === 'PostToolUse' && kind === 'read') {
      guard = 'SG3';
      if (!chat || !args.filePath) return {};
      const rel = below(o.root, absOf(args.filePath, o));
      const m = rel ? /^\.github\/skills\/([^/]+)\/SKILL\.md$/i.exec(rel) : null;
      saveNote(o, chat, n => {
        n.reads = (n.reads || 0) + 1;
        if (m && !n.skills.includes(m[1])) n.skills.push(m[1]);
      });
      return {};
    }

    if (event === 'PreToolUse' && kind === 'write') {
      guard = 'write';
      const writes = writesOf(tool, args).filter(w => w.path);
      const allowed = [];
      for (const w of writes) {
        target = String(w.path);
        const r = writeRule(w, o);
        if (r && r.refuse) { target = r.pl.shown; return refuse('write', r.refuse); }
        if (r && r.allow) allowed.push(r);
      }
      guard = 'SG3';
      const needs = allowed.map(r => ({ r, need: skillFor(r, o) })).filter(x => x.need);
      if (!needs.length) return {};
      target = needs[0].r.pl.shown;
      if (!chat) return stepAside('SG3', 'the hook named no chat, so which skills were opened is not known');
      const note = readNote(o, chat);
      if (!note.reads) return stepAside('SG3', 'no read of any file is noted in this chat, so the read tool may have been renamed');
      for (const { r, need } of needs) {
        if (!note.skills.includes(need.skill)) { target = r.pl.shown; return refuse('SG3', skillReason(r.pl.shown, need.what, need.skill)); }
      }
      return {};
    }
    return {};
  } catch (e) {
    return stepAside(guard || 'guard', String((e && e.message) || e).split('\n')[0].slice(0, 300));
  }
}

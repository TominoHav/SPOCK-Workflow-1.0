#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { BLOCKS } from './fixed-messages.mjs';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REPO_ROOT, RUNS_ROOT, runDirs } from './run-files.mjs';
import { SURFACES, UNSET, SURFACE_FILE, declaredSurface } from './surface.mjs';

export const TOOLS = [
  { pick: 'GitHub Copilot', value: 'copilot' },
  { pick: 'another agent tool', value: 'other-agent-tool' },
];
export const NODE_MAJORS = ['20', '22'];
export const NODE_GET = 'Install Node.js 22, an LTS version, from nodejs.org';
export const TASK = 'SPOCK: check my setup';
export const UPDATE_TASK = 'SPOCK: update this copy to the latest release';
const AGENTS_REG = join('.github', 'registry', 'agents.yaml');
const AGENTS_DIR = join('.github', 'agents');
const INSTRUCTIONS = join('.github', 'copilot-instructions.md');
const FROM_FILE = join('.github', 'update-from');
const BUILD_FILE = join('.github', 'build');
const GET_AGAIN = 'Get this copy again, as step 2 of SETUP.md says';

export function nodeLine(version = process.versions.node) {
  const [major = '?', minor = '0'] = String(version).replace(/^v/, '').split('.');
  const shown = `${major}.${minor}`;
  if (NODE_MAJORS.includes(major)) return { line: `Node.js ${shown}: in place.` };
  return { line: `Node.js: missing: Node.js ${shown} is installed; SPOCK is tested on ${NODE_MAJORS.join(' and ')}. ${NODE_GET}.`,
           todo: `${NODE_GET}, reopen VS Code, and run this task again.` };
}

const pickOf = value => (TOOLS.find(t => t.value === value) || {}).pick || null;

export function agentRoster(reg = AGENTS_REG) {
  const text = workflowText(reg);
  const files = new Map();
  for (const m of text.matchAll(/agent_file:\s*(\S+)[\s\S]*?design_agent:\s*(\S+)/g))
    if (!files.has(m[2])) files.set(m[2], m[1]);
  return [...text.matchAll(/^  - id: (\S+)\n    name: (.+)$/gm)]
    .map(m => ({ id: m[1], name: m[2].trim(), file: files.get(m[1]) || `${AGENTS_DIR.split('\\').join('/')}/${m[1]}.agent.md` }));
}

export function modelNamed() {
  const flat = f => (existsSync(f) ? readFileSync(f, 'utf8').replace(/\s+/g, ' ') : '');
  const row = ((BLOCKS.find(b => b.id === 'Z53-M1') || { rows: [] }).rows.find(r => /meant to run on/.test(r.en)) || {}).en || '';
  const opening = /This workflow is meant to run on (.+?), chosen in the model picker/.exec(row) || /This workflow is meant to run on (.+?), chosen in the model picker/.exec(flat(INSTRUCTIONS));
  if (opening) return opening[1];
  const setup = /choose the model in the model picker on the chat box: (.+?)\.\*\*/.exec(flat('SETUP.md'));
  return setup ? setup[1] : null;
}

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const count = n => WORDS[n] || String(n);

function main() {
  const argv = process.argv.slice(2);
  const at = argv.indexOf('--tool');
  const said = at >= 0 && at + 1 < argv.length ? String(argv[at + 1]).trim() : null;
  const tool = said === null ? null : TOOLS.find(t => t.pick === said);
  if (said !== null && !tool) {
    console.log(`usage: node .github/scripts/setup-check.mjs [--tool <${TOOLS.map(t => `"${t.pick}"`).join(' | ')}>]\n` +
                `"${said}" is not one of the choices.`);
    process.exit(2);
  }

  const todo = [];
  const say = line => console.log(line);

  const node = nodeLine();
  say(node.line);
  if (node.todo) todo.push(node.todo);

  if (tool) {
    const want = `${tool.value}\n`;
    let failed = null;
    try {
      if (!existsSync(SURFACE_FILE) || !readFileSync(SURFACE_FILE).equals(Buffer.from(want, 'utf8'))) writeFileSync(SURFACE_FILE, want, 'utf8');
    } catch (e) { failed = e.code || e.message; }
    const back = failed ? null : declaredSurface(SURFACE_FILE, {});
    if (back === tool.value) say(`Your tool: ${tool.pick}, saved.`);
    else {
      say(`Your tool: missing: ${tool.pick} could not be saved in ${SURFACE_FILE}${failed ? ` (${failed})` : ''}.`);
      todo.push(`Check that this folder is not read-only, then run ${TASK} again and pick ${tool.pick}.`);
    }
  } else {
    const declared = declaredSurface(SURFACE_FILE, {});
    if (SURFACES.includes(declared)) say(`Your tool: ${pickOf(declared)}, as ${SURFACE_FILE} says.`);
    else {
      say(`Your tool: missing: ${SURFACE_FILE} reads "${declared === UNSET ? UNSET : declared}", so no tool is set.`);
      todo.push(`Run the task ${TASK} (Terminal › Run Task…) and pick the tool you use SPOCK in.`);
    }
  }

  const GIT_ENV = { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never', GIT_LITERAL_PATHSPECS: '1', GIT_OPTIONAL_LOCKS: '0' };
  const git = args => {
    const r = spawnSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8', env: GIT_ENV, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
    return !r.error && r.status === 0;
  };
  const release = existsSync(BUILD_FILE) ? readFileSync(BUILD_FILE, 'utf8').trim() : '';
  const hasGit = git(['--version']);
  const cloned = hasGit && git(['rev-parse', '--show-toplevel']) && git(['ls-files', '--error-unmatch', '--', '.github/build']);
  const releaseCopy = existsSync(FROM_FILE);
  if (!release) {
    say(`This copy: missing: it holds no ${BUILD_FILE.split('\\').join('/')}, so it is not a whole SPOCK copy.`);
    todo.push(`${GET_AGAIN}.`);
  } else if (!hasGit)
    say(`This copy: release ${release}. Git was not found on this computer. SPOCK runs without it; you need it to update this copy. Install it from git-scm.com.`);
  else if (cloned && releaseCopy)
    say(`This copy: release ${release}, cloned, so it updates with ${UPDATE_TASK}.`);
  else if (cloned)
    say(`This copy: release ${release}, cloned, but not made from a SPOCK release, so ${UPDATE_TASK} has nothing to update it from.`);
  else
    say(`This copy: release ${release}, a download rather than a clone, so it updates by downloading the new version into a new folder (SETUP.md, step 8).`);

  let roster = [];
  try { roster = agentRoster(); } catch { roster = []; }
  if (!roster.length) {
    say(`The agents: missing: ${AGENTS_REG.split('\\').join('/')} is not in this folder, so this check cannot say which agents it needs.`);
    todo.push(`${GET_AGAIN}.`);
  } else {
    const gone = roster.filter(a => !existsSync(a.file));
    const n = count(roster.length);
    const listed = `Open the Copilot chat's agent picker: these ${n} must be listed: ${roster.map(a => a.name).join(', ')}.`;
    if (!gone.length) say(`The ${n} agents are in this folder. ${listed}`);
    else {
      for (const a of gone) say(`The agents: missing: ${a.file} is not in this folder, so the ${a.name} cannot be listed.`);
      say(listed);
      todo.push(cloned && releaseCopy
        ? `Run ${UPDATE_TASK} and pick its second choice: it keeps a copy of the workflow's files changed on this computer and puts the release's back, ${gone.map(a => a.file).join(', ')} among them.`
        : `${GET_AGAIN}: ${gone.map(a => a.file).join(', ')} ${gone.length === 1 ? 'is' : 'are'} missing from this one.`);
    }
  }

  const model = modelNamed();
  say(model ? `The model to pick in the chat: ${model}.` : 'The model to pick in the chat: the one step 6 of SETUP.md names.');

  const runs = runDirs(RUNS_ROOT).length;
  say(`Your runs are kept in ${String(RUNS_ROOT).replace(/[\\/]+$/, '')}/ (${runs ? `${runs} run${runs === 1 ? '' : 's'}` : 'none yet'}).`);

  if (!todo.length) {
    say('\nEverything SPOCK needs is in place. Start your first run: SETUP step 6.');
    process.exit(0);
  }
  say(`\nSomething SPOCK needs is missing. What to do:\n${[...new Set(todo)].map((t, i) => `${i + 1}. ${t}`).join('\n')}`);
  say('Then run this task again, until its last line says everything SPOCK needs is in place.');
  process.exit(3);
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) main();

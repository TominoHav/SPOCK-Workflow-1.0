import { readFileSync, writeFileSync, rmSync, mkdirSync, existsSync, readdirSync, statSync, renameSync } from 'node:fs';
import { join, dirname, isAbsolute } from 'node:path';
import { createHash } from 'node:crypto';

export const JOURNAL = '.suite-journal';
export const SELF_ENTRY = 'suite.json';

const STARTED = new Date().toISOString();

const alive = pid => {
  try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; }
};

const entryFile = (path, root = '.') =>
  join(root, JOURNAL, `${createHash('sha256').update(path).digest('hex').slice(0, 16)}.json`);

const writeEntry = (file, entry) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(`${file}.tmp`, `${JSON.stringify(entry, null, 2)}\n`);
  renameSync(`${file}.tmp`, file);
};

const readEntries = (root = '.') => {
  const dir = join(root, JOURNAL);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.json')).sort().map(name => {
    try { return { name, ...JSON.parse(readFileSync(join(dir, name), 'utf8')) }; }
    catch { return { name, unreadable: true }; }
  });
};

const inside = path => typeof path === 'string' && path !== '' && !isAbsolute(path)
  && !path.split(/[\\/]/).includes('..');

const holding = path => {
  if (!existsSync(path)) return null;
  return statSync(path).isDirectory() ? undefined : readFileSync(path, 'utf8');
};

const restore = (path, original) => {
  if (original === null) { rmSync(path, { recursive: true, force: true }); return; }
  mkdirSync(dirname(path) || '.', { recursive: true });
  writeFileSync(path, original);
};

export const otherSuite = (root = '.') => {
  const live = readEntries(root).filter(e => Number.isInteger(e.pid) && e.pid !== process.pid && alive(e.pid));
  if (!live.length) return null;
  return { pid: live[0].pid, changed: live.some(e => e.name !== SELF_ENTRY) };
};

export const stopIfSuiteRunning = (root = '.') => {
  const other = otherSuite(root);
  if (!other) return;
  console.log(`  another suite (process ${other.pid}) is running in this checkout${other.changed ? ' and has files changed' : ''}; ` +
    'let it finish, or stop it, before running this one');
  process.exit(1);
};

export const claimCheckout = (root = '.') => {
  const file = join(root, JOURNAL, SELF_ENTRY);
  writeEntry(file, { pid: process.pid, started: STARTED });
  process.on('exit', () => {
    try {
      if (existsSync(file) && JSON.parse(readFileSync(file, 'utf8')).pid === process.pid) rmSync(file, { force: true });
    } catch {  }
  });
};

export const restoreStranded = (root = '.') => {
  const restored = [];
  for (const e of readEntries(root)) {
    if (e.name === SELF_ENTRY) continue;
    const file = join(root, JOURNAL, e.name);
    if (e.unreadable || !inside(e.path) || !(e.original === null || typeof e.original === 'string')) {
      console.log(`  a journal entry could not be read and was left in place: ${file}`);
      continue;
    }
    const at = join(root, e.path);
    try {
      if (holding(at) !== e.original) { restore(at, e.original); restored.push(e.path); }
    } catch (err) {
      console.log(`  could not put back ${e.path} (${err.code || err.message}); its journal entry is left: ${file}`);
      continue;
    }
    rmSync(file, { force: true });
  }
  if (restored.length)
    console.log(`  restored ${restored.length} file${restored.length === 1 ? '' : 's'} a stopped suite left changed: ${restored.join(', ')}`);
  return restored;
};

const owned = new Map();
let putSinceTurn = [];

export const journalled = path => {
  const now = holding(path);
  if (now === undefined) return undefined;
  const stack = owned.get(path);
  if (stack) { stack.push(now); return now; }
  writeEntry(entryFile(path), { path, original: now, pid: process.pid, started: STARTED });
  owned.set(path, [now]);
  return now;
};

export const putBack = path => {
  const stack = owned.get(path);
  if (!stack) return;
  restore(path, stack.pop());
  if (stack.length) return;
  owned.delete(path);
  rmSync(entryFile(path), { force: true });
  putSinceTurn.push(path);
};

const STOP_CODES = { SIGINT: 130, SIGTERM: 143, SIGHUP: 143 };
let trap = null;

export const holdStops = () => {
  if (trap) return;
  putSinceTurn = [];
  trap = signal => {
    for (const path of [...owned.keys()]) while (owned.has(path)) putBack(path);
    const files = [...new Set(putSinceTurn)];
    try {
      console.log(`stopped: put back ${files.length} file${files.length === 1 ? '' : 's'} the suite had changed` +
        `${files.length ? ` (${files.join(', ')})` : ''}`);
    } catch {  }
    process.exit(STOP_CODES[signal]);
  };
  for (const s of Object.keys(STOP_CODES)) process.on(s, trap);
};

export const releaseStops = () => {
  if (!trap) return;
  for (const s of Object.keys(STOP_CODES)) process.removeListener(s, trap);
  trap = null;
};

export const turn = () => new Promise(r => setImmediate(() => { putSinceTurn = []; r(); }));

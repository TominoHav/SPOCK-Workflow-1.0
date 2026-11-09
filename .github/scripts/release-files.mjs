#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, realpathSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const COPY_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const RELEASE_LIST = '.github/release-files.json';
export const OWN_FOLDERS = ['.github', '.vscode'];
export const LEFT_OUT = ['.github/surface', '.github/runs-root', '.github/store/', RELEASE_LIST,
  '.github/last-task.md', '.github/runs-held', '.github/.guard/'];
export const HELD_FOLDERS = ['.github/scripts/', '.github/skills/', '.github/agents/', '.github/instructions/',
  '.github/workflow-contracts/', '.github/hooks/', '.github/registry/', '.github/know-how/', '.vscode/'];

const gitIgnored = rel => {
  const parts = rel.split('/');
  const name = parts[parts.length - 1];
  return parts.slice(1).some(p => p.startsWith('.')) || parts.includes('node_modules') || /\.log$/.test(name) || name === 'insights.md';
};

export const leftOut = rel => LEFT_OUT.some(p => (p.endsWith('/') ? `${rel}/`.startsWith(p) : rel === p)) || gitIgnored(rel);

export function ownFiles(root = COPY_ROOT) {
  const out = [];
  const walk = rel => {
    let names;
    try { names = readdirSync(join(root, rel)); } catch { return; }
    for (const name of names.sort()) {
      const r = `${rel}/${name}`;
      if (leftOut(r)) continue;
      let st;
      try { st = statSync(join(root, r)); } catch { continue; }
      if (st.isDirectory()) walk(r);
      else if (st.isFile()) out.push(r);
    }
  };
  for (const top of OWN_FOLDERS) walk(top);
  return out.sort();
}

export function textHash(abs) {
  const b = readFileSync(abs);
  let lf = b;
  if (b.includes(13)) {
    lf = Buffer.allocUnsafe(b.length);
    let n = 0;
    for (let i = 0; i < b.length; i++) if (!(b[i] === 13 && b[i + 1] === 10)) lf[n++] = b[i];
    lf = lf.subarray(0, n);
  }
  return createHash('sha256').update(lf).digest('hex');
}

export const releaseOf = (root = COPY_ROOT) => {
  try { return readFileSync(join(root, '.github', 'build'), 'utf8').split(/\r?\n/)[0].trim(); } catch { return ''; }
};

export function render(root = COPY_ROOT) {
  const rows = ownFiles(root).map(p => `    { "path": ${JSON.stringify(p)}, "sha256": "${textHash(join(root, p))}" }`);
  return `{\n  "release": ${JSON.stringify(releaseOf(root))},\n  "files": [\n${rows.join(',\n')}\n  ]\n}\n`;
}

export function compareWithRelease(root = COPY_ROOT) {
  const at = join(root, RELEASE_LIST);
  if (!existsSync(at)) return { absent: true };
  let list;
  try { list = JSON.parse(readFileSync(at, 'utf8')); } catch (e) { return { unreadable: `it does not parse: ${e.message}` }; }
  if (!list || typeof list !== 'object' || typeof list.release !== 'string' || !list.release.trim() || !Array.isArray(list.files)
      || list.files.some(f => !f || typeof f.path !== 'string' || !/^[0-9a-f]{64}$/.test(String(f.sha256))
        || !OWN_FOLDERS.some(t => f.path.startsWith(`${t}/`)) || f.path.split('/').includes('..')))
    return { unreadable: 'it does not hold a release, and a path under .github/ or .vscode/ and a SHA-256 for every file' };
  const recorded = new Map(list.files.map(f => [f.path, f.sha256]));
  const changed = [], missing = [];
  for (const [path, sha256] of recorded) {
    const abs = join(root, path);
    let isFile = false;
    try { isFile = statSync(abs).isFile(); } catch { isFile = false; }
    if (!isFile) { missing.push(path); continue; }
    const now = textHash(abs);
    if (now !== sha256) changed.push({ path, recorded: sha256, now });
  }
  const added = ownFiles(root).filter(p => !recorded.has(p) && HELD_FOLDERS.some(h => p.startsWith(h)));
  return { release: list.release.trim(), listed: recorded.size, changed, missing, added };
}

export function inGitClone(root = COPY_ROOT) {
  for (let d = resolve(root); ; d = dirname(d)) {
    if (existsSync(join(d, '.git'))) return true;
    if (dirname(d) === d) return false;
  }
}

export function listInCommit(root = COPY_ROOT) {
  const env = { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never', GIT_OPTIONAL_LOCKS: '0' };
  for (const k of ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE']) delete env[k];
  const r = spawnSync('git', ['cat-file', 'blob', `HEAD:./${RELEASE_LIST}`], { cwd: root, encoding: 'utf8', env,
    maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  if (r.error || r.status !== 0) return null;
  let named = '';
  try { named = String(JSON.parse(r.stdout).release || '').trim(); } catch { named = ''; }
  return { release: named || releaseOf(root) };
}

export function differenceLines({ release, changed, missing, added }) {
  return [
    ...changed.map(c => `${c.path} differs from release ${release} (${c.recorded.slice(0, 12)}…, on disk ${c.now.slice(0, 12)}…)`),
    ...missing.map(p => `${p} is part of release ${release} and is not on disk`),
    ...added.map(p => `${p} is not part of release ${release}`),
  ];
}

const realPath = p => { try { return realpathSync(p); } catch { return resolve(p); } };
if (process.argv[1] && realPath(fileURLToPath(import.meta.url)) === realPath(process.argv[1])) {
  if (process.argv.includes('--write')) {
    const text = render();
    writeFileSync(join(COPY_ROOT, RELEASE_LIST), text);
    console.log(`wrote ${RELEASE_LIST} — release ${releaseOf()}, ${(text.match(/"path":/g) || []).length} files under ${OWN_FOLDERS.join('/ and ')}/`);
    process.exit(0);
  }
  const r = compareWithRelease();
  if (r.absent) {
    const held = listInCommit();
    console.log(held ? `${RELEASE_LIST} is part of release ${held.release} and is not on disk, so nothing can be compared.`
      : `There is no ${RELEASE_LIST} here, so this copy was not made by a release and there is nothing to compare.`);
    process.exit(1);
  }
  if (r.unreadable) { console.log(`${RELEASE_LIST} cannot be read: ${r.unreadable}.`); process.exit(1); }
  const lines = differenceLines(r);
  if (!lines.length) { console.log(`The workflow's own files match release ${r.release}: ${r.listed} files, none changed, none added.`); process.exit(0); }
  for (const l of lines) console.log(`  ${l}`);
  console.log(`${lines.length} difference(s) from release ${r.release}.`);
  process.exit(1);
}

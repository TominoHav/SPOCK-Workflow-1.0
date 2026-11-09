#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, rmSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { RUNS_ROOT, REPO_ROOT, runDirs, openRuns, runIdOf } from './run-files.mjs';
import { compareWithRelease, RELEASE_LIST } from './release-files.mjs';
import { shownDate } from './fixed-messages.mjs';

export const HOW = ['update', "update, and set aside my changes to the workflow's own files"];
export const FROM_FILE = '.github/update-from';
export const SETTINGS = ['.github/surface', '.github/runs-root'];
export const STORE_DIR = '.github/store/';

const say = text => console.log(text);
const done = code => process.exit(code);

const argv = process.argv.slice(2);
const howAt = argv.indexOf('--how');
const howSaid = howAt >= 0 && howAt + 1 < argv.length ? String(argv[howAt + 1]).trim() : '';
if (howSaid && !HOW.includes(howSaid)) {
  say(`usage: node .github/scripts/update.mjs --how <${HOW.map(h => `"${h}"`).join(' | ')}>\n` +
      `"${howSaid}" is not one of the two choices.`);
  done(2);
}
const setAside = howSaid === HOW[1];

const GIT_ENV = { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never',
                  GIT_LITERAL_PATHSPECS: '1', GIT_OPTIONAL_LOCKS: '0' };
const git = args => {
  const r = spawnSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8', env: GIT_ENV, maxBuffer: 64 * 1024 * 1024,
                                     stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  return { ok: !r.error && r.status === 0, error: r.error || null, out: r.stdout || '', err: r.stderr || '' };
};
const lastLine = s => String(s).trim().split(/\r?\n/).filter(Boolean).pop() || 'git said nothing';
const zList = s => String(s).split('\0').filter(Boolean);
const short = sha => String(sha).slice(0, 7);
const day = iso => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso)); return m ? shownDate(m[0]) : 'date unknown'; };
const commitDay = rev => day(git(['log', '-1', '--format=%cI', rev, '--']).out.trim());
const readOr = (file, none) => { try { return readFileSync(file, 'utf8').trim() || none; } catch { return none; } };
const compareReleases = (a, b) => {
  const pa = String(a).split('.'), pb = String(b).split('.');
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = pa[i] ?? '0', y = pb[i] ?? '0';
    const nx = /^\d+$/.test(x) ? Number(x) : NaN, ny = /^\d+$/.test(y) ? Number(y) : NaN;
    const d = !Number.isNaN(nx) && !Number.isNaN(ny) ? nx - ny : x.localeCompare(y);
    if (d) return d;
  }
  return 0;
};

let asideAt = null;
const refuse = text => {
  say(`\n${asideAt ? text.replace('Nothing was changed.', `Nothing else was changed: the files set aside are in ${asideAt}.`) : text}`);
  done(3);
};

if (!existsSync(FROM_FILE))
  refuse('This copy was not made from a SPOCK release, so there is nothing to update it from.');
const [remote, branch] = readFileSync(FROM_FILE, 'utf8').trim().split(/\s+/);
if (!remote || !branch || [remote, branch].some(w => w.startsWith('-')))
  refuse(`${FROM_FILE} does not name a remote and a branch, so this task cannot tell where to update from. ` +
         'Nothing was changed. Ask the pilot team.');

const version = git(['--version']);
if (!version.ok)
  refuse('Git was not found on this computer\'s PATH, so this task cannot run it. VS Code can use a Git of its own ' +
         'that is not on the PATH, so Source Control may still work. Nothing was changed. Ask the pilot team: they ' +
         'put Git on the PATH with you, or bring this copy to the release.');
const ZIP = 'This folder is not a clone of the SPOCK repository, so it cannot be updated in place: a ZIP download is ' +
            'updated by unzipping the new version into a new folder (SETUP.md, step 8).';
if (!git(['rev-parse', '--show-toplevel']).ok) refuse(ZIP);
if (!git(['ls-files', '--error-unmatch', '--', '.github/build']).ok) refuse(ZIP);
const prefix = git(['rev-parse', '--show-prefix']).out.replace(/\r?\n$/, '');
const inFolder = p => (p.startsWith(prefix) ? p.slice(prefix.length) : null);
const shown = p => inFolder(p) ?? `${p} (outside this folder)`;

const head = git(['rev-parse', '--verify', 'HEAD^{commit}']).out.trim();
if (!head) refuse(ZIP);
const releaseBefore = readOr('.github/build', 'unknown');
say(`This copy is on release ${releaseBefore} (lab commit ${short(head)}, ${commitDay(head)}).`);

const own = git(['rev-list', 'HEAD', '--not', '--remotes']);
const ownCommits = own.out.split('\n').filter(Boolean);
if (!own.ok || ownCommits.length) {
  const subjects = git(['log', '--format=%s', '-n', '5', 'HEAD', '--not', '--remotes']).out.split('\n').filter(Boolean);
  refuse(`This copy holds ${ownCommits.length || 'some'} change(s) committed on this computer that the lab does not ` +
         `hold: ${subjects.map(s => `"${s}"`).join('; ') || 'their subjects could not be read'}. Updating would take ` +
         'this folder away from them. Nothing was changed. Ask whoever gave you the SPOCK repository address to look ' +
         'at this copy before you update.');
}

const statusOf = pathspecs => {
  const parts = zList(git(['status', '--porcelain=v1', '-z', '--untracked-files=all', '--', ...pathspecs]).out);
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const e = parts[i], x = e[0], y = e[1], p = e.slice(3);
    if (x === 'R' || x === 'C') {
      out.push({ path: p, kind: 'added' });
      if (x === 'R') out.push({ path: parts[++i], kind: 'removed' }); else i++;
      continue;
    }
    out.push({ path: p, kind: e.startsWith('??') || x === 'A' ? 'added' : (x === 'D' || y === 'D') ? 'removed' : 'changed' });
  }
  return out;
};
const inHead = rel => git(['cat-file', '-e', `HEAD:${prefix}${rel}`]).ok;
const workflowChanges = () => {
  const r = compareWithRelease();
  if (r.absent) return inHead(RELEASE_LIST) ? [{ rel: RELEASE_LIST, kind: 'removed' }] : [];
  if (r.unreadable) return [{ rel: RELEASE_LIST, kind: 'changed' }];
  return [...r.changed.map(c => ({ rel: c.path, kind: 'changed' })), ...r.missing.map(p => ({ rel: p, kind: 'removed' })),
    ...r.added.map(p => ({ rel: p, kind: 'added' }))];
};

const changed = workflowChanges();
if (changed.length && !setAside)
  refuse(`These files of the workflow were changed on this computer:\n${changed.map(e => `  ${e.rel}, ${e.kind}`).join('\n')}\n` +
         'The update would replace them with the release\'s. Nothing was changed. If you did not mean to change them, ' +
         'run this task again and pick the second choice: it keeps a copy of each and puts the release\'s back.');
if (setAside) {
  if (!changed.length) say('No file of the workflow was changed on this computer, so nothing was set aside.');
  else {
    const p = n => String(n).padStart(2, '0');
    const d = new Date();
    const base = join(RUNS_ROOT, `set-aside-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`);
    let at = base;
    for (let n = 2; existsSync(at); n++) at = `${base}-${n}`;
    const putAside = set => {
      for (const e of set) {
        if (e.kind === 'removed' || !existsSync(e.rel) || statSync(e.rel).isDirectory()) continue;
        mkdirSync(dirname(join(at, e.rel)), { recursive: true });
        copyFileSync(e.rel, join(at, e.rel));
      }
      const tracked = set.filter(e => inHead(e.rel)).map(e => e.rel);
      const added = set.filter(e => !inHead(e.rel)).map(e => e.rel);
      if (tracked.length) git(['checkout', 'HEAD', '--', ...tracked]);
      for (const rel of added) {
        git(['rm', '--cached', '-q', '--ignore-unmatch', '--', rel]);
        rmSync(rel, { force: true });
      }
    };
    putAside(changed);
    asideAt = at;
    if (changed.some(e => e.rel === RELEASE_LIST)) {
      const hidden = workflowChanges();
      putAside(hidden);
      changed.push(...hidden);
    }
    const left = workflowChanges();
    if (left.length)
      refuse(`These files of the workflow could not be put back to the release's: ${left.map(e => e.rel).join(', ')}. ` +
             'Nothing was changed. Ask the pilot team.');
    say(`A copy of each workflow file changed on this computer is kept in ${at}, and the release's are back:\n` +
        changed.map(e => `  ${e.rel}, ${e.kind}`).join('\n'));
  }
}

const fetched = git(['fetch', '--quiet', '--no-tags', remote, branch]);
if (!fetched.ok)
  refuse(`The lab repository could not be reached: ${lastLine(fetched.err)}. Nothing was changed. Check that you can ` +
         'open the repository in your browser, then run this task again.');
const target = git(['rev-parse', '--verify', 'FETCH_HEAD^{commit}']).out.trim();

if (target === head) {
  say(`\nThis copy is already on release ${releaseBefore} (${short(head)}, ${commitDay(head)}). There is nothing to update.`);
  done(0);
}
const theirs = git(['show', `${target}:${prefix}.github/build`]);
const releaseAfter = theirs.ok ? theirs.out.trim() : '';
if (!releaseAfter)
  refuse(`The lab's ${branch} holds no SPOCK release in this folder (${prefix || 'the top of the repository'}), so ` +
         'there is nothing to update it to. Nothing was changed. Ask the pilot team.');
if (releaseBefore !== 'unknown' && compareReleases(releaseAfter, releaseBefore) < 0)
  refuse(`The lab holds release ${releaseAfter}, older than this copy's ${releaseBefore}. Nothing was changed.`);

const unfinished = openRuns(RUNS_ROOT).map(runIdOf);
if (unfinished.length) {
  const one = unfinished.length === 1;
  const stays = `${one ? `The run ${unfinished[0]} is` : `The runs ${unfinished.join(', ')} are`} not finished, and a run is ` +
    `finished on the release it started on, so this copy stays on release ${releaseBefore}.`;
  const later = `Release ${releaseAfter} is in the lab: run this task again once ${one ? 'the run is' : 'they are'} finished.`;
  if (asideAt) {
    say(`\n${stays} ${later}`);
    say('Close the chats you have open and reload VS Code (Command Palette › Developer: Reload Window), so they work ' +
        'from the files that were put back.');
    done(0);
  }
  refuse(`${stays} Nothing was changed. ${later}`);
}

const addedHere = statusOf(['.']).filter(e => e.kind === 'added').map(e => inFolder(e.path)).filter(Boolean);
const sameName = addedHere.filter(rel => git(['cat-file', '-e', `${target}:${prefix}${rel}`]).ok);
if (sameName.length)
  refuse(`These files were added on this computer, and release ${releaseAfter} brings its own file under the same ` +
         `name: ${sameName.join(', ')}. The update would put the release's in its place. Nothing was changed. Move ` +
         'each of yours out of this folder, or rename it, then run this task again.');
const leftHere = addedHere.filter(rel => /^\.(github|vscode)\//.test(rel) && !SETTINGS.includes(rel) && !rel.startsWith(STORE_DIR));
if (leftHere.length) say(`Left as they are, since they are not the workflow's own files: ${leftHere.join(', ')}.`);

const kept = new Map(SETTINGS.map(f => [f, existsSync(f) ? readFileSync(f) : null]));
const storeHeld = new Map(statusOf([STORE_DIR.replace(/\/$/, '')]).filter(e => e.kind !== 'added').map(e => inFolder(e.path)).filter(Boolean)
  .map(rel => [rel, existsSync(rel) ? readFileSync(rel) : null]));
const putBack = () => {
  for (const [f, text] of kept) if (text !== null && (!existsSync(f) || !readFileSync(f).equals(text))) writeFileSync(f, text);
  for (const [f, text] of storeHeld) {
    if (text === null) rmSync(f, { force: true });
    else { mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, text); }
  }
};
for (const f of [...SETTINGS, STORE_DIR.replace(/\/$/, '')]) if (inHead(f)) git(['checkout', 'HEAD', '--', f]);

say('Updating.');
const moved = git(['reset', '--keep', target]);
if (!moved.ok) {
  const local = new Set(statusOf([]).map(e => e.path));
  const both = zList(git(['diff', '--name-only', '-z', head, target]).out).filter(p => local.has(p))
    .sort((a, b) => (inFolder(a) === null) - (inFolder(b) === null));
  putBack();
  refuse(both.length
    ? `These files, changed on this computer, are also changed by the new release: ${both.map(shown).join(', ')}. ` +
      'Nothing was changed. Keep your own copy of each somewhere else and undo the change, then run this task again.'
    : `The update could not be made: ${lastLine(moved.err)}. Nothing was changed. Ask the pilot team.`);
}

for (const [f, text] of kept) if (text !== null && (!existsSync(f) || !readFileSync(f).equals(text))) writeFileSync(f, text);

const corpus = join('.github', 'store', 'corpus');
const keptRuns = existsSync(corpus) ? readdirSync(corpus).filter(d => existsSync(join(corpus, d, 'KEPT.md'))).length : 0;
const env = { ...process.env };
delete env.SPOCK_RUNS_TEST_OVERRIDE;
const store = spawnSync(process.execPath, [join('.github', 'scripts', 'store.mjs'), '--write'],
  { cwd: REPO_ROOT, encoding: 'utf8', env, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
const storeSaid = store.error || store.status !== 0
  ? 'the competitor store could not be rebuilt now, and it is rebuilt at the next stage 3'
  : keptRuns ? `the competitor store, rebuilt from the competitors you kept (${keptRuns} run${keptRuns === 1 ? '' : 's'})`
             : 'the competitor store, rebuilt';

const surface = readOr('.github/surface', 'unset');
const runs = runDirs(RUNS_ROOT).length;
say(`\nThis copy is now on release ${readOr('.github/build', releaseAfter)} (lab commit ${short(target)}, ${commitDay(target)}).`);
say(`Kept: your setting: ${surface}; your runs folder: ${RUNS_ROOT}, ${runs} run${runs === 1 ? '' : 's'}; ${storeSaid}.`);
if (surface === 'unset') say('.github/surface reads unset: run SPOCK: check my setup and pick your tool, as SETUP.md step 4 says, before you start a run.');
say('What is new is in RELEASE-NOTES.md.');
say('Close the chats you have open and reload VS Code (Command Palette › Developer: Reload Window). A chat opened ' +
    'before the update keeps working from the old instructions.');
done(0);

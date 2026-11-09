#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, STAGE_DIRS, runArtifacts, runParts, runRecords, strandedPart, strandedRecord, stoppedRun, stageStatuses,
         IN_FLIGHT, HOLDS_ITS_RESULT, folderTakeBack, takeBackTyped, readTakeBackTyped, takeBackListing } from './run-files.mjs';
import { frontmatter } from './yaml.mjs';

const die = m => { console.error(`\nwithdraw: ${m}\n`); process.exit(2); };
const refuse = lines => { console.log(`\n${lines.join('\n')}\n`); process.exit(3); };
const FLIGHT_WORDS = { running: 'running', produced: 'written and waiting for its gate', q_failed: 'being written again after its gate',
                       in_review: 'in review', refined: 'in review' };

export function supersedeFile(dir, rel, { reason, by = 'the workflow', why = null } = {}) {
  const out = join(dir, 'superseded');
  mkdirSync(out, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const base = rel.replace(/\//g, '__');
  let name = base, round = 1;
  while (existsSync(join(out, name))) { round++; name = base.replace(/\.md$/, `.r${round}.md`); }
  const target = join(out, name);
  const abs = resolve(join(dir, rel));

  const text = readFileSync(abs, 'utf8');
  const stamp = `<!-- WITHDRAWN ${today} from ${rel} by ${by}\n     ${reason}\n` +
    (why ? `     Found stranded: ${why}\n` : '') +
    `     Kept rather than deleted: a run that cannot say what it took back cannot be read\n     afterwards. -->\n\n`;
  writeFileSync(target, stamp + text, 'utf8');
  if (!existsSync(target)) throw new Error(`the copy of ${rel} into superseded/ did not land — the original is untouched`);
  unlinkSync(abs);
  return { name };
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) main();

function main() {
const argv = process.argv.slice(2);
const one = k => { const i = argv.indexOf(`--${k}`); return i >= 0 && !String(argv[i + 1] ?? '').startsWith('--') ? argv[i + 1] : undefined; };
const flags = new Set();
for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) { flags.add(i); flags.add(i + 1); }
const runId = argv.find((a, i) => !flags.has(i));

if (!runId) die('usage: withdraw.mjs <run_id> --file <path inside the run, or "" to take back every stranded part> --reason "why"');
const dir = join(RUNS_ROOT, runId);
if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`${dir} has no RUN-STATE.md — name a run that exists`);
{ const stopped = stoppedRun(dir); if (stopped) { console.log(`\n${stopped}\n`); process.exit(3); } }

const rel = one('file');
const reason = one('reason');
const by = one('by') || 'the workflow';
const needReason = () => {
  if (!reason) die('--reason is required, in words — "it failed" is not a reason. Say what a reader should\n' +
                   '        understand about why this is not part of the run any more');
};

let targets;
const kept = [];
if (rel) {
  const typed = readTakeBackTyped(rel);
  const asked = typed ? typed.folder : rel;
  const t = folderTakeBack(dir, asked);
  if (t) {
    const status = stageStatuses(dir).get(t.stage);
    if (HOLDS_ITS_RESULT.includes(status))
      refuse([`Nothing was taken back: stage ${t.stage} is ${status === 'stale' ? 'marked stale and still holds its result' : 'accepted'}, ` +
              'and the later stages and their checks read its documents.',
              '        Send it back first with "SPOCK: send a stage back to be redone"; its output then prints the line that takes its work back.']);
    const n = t.files.length;
    const again = `To take back these ${n}, run this task again and type \`${takeBackTyped(t.folder, n)}\` in the file box.`;
    if (!n) refuse([`${t.folder} holds no file this would take back.`, ...takeBackListing(t), '        Nothing was taken back.']);
    if (!typed) refuse([`${t.folder} holds ${n} file(s) this would take back:`, ...takeBackListing(t), `        Nothing was taken back. ${again}`]);
    if (typed.count !== n)
      refuse([`${t.folder} now holds ${n} file(s) this would take back, not ${typed.count}. Nothing was taken back. They are:`,
              ...takeBackListing(t), `        ${again}`]);
    targets = t.files.map(f => ({ rel: f, why: null }));
  } else targets = [{ rel: asked, why: null }];
} else {
  const carried = new Set();
  for (const a of runArtifacts(dir)) {
    try { const fm = frontmatter(readFileSync(a.abs, 'utf8'), a.rel); if (fm && fm.artifact_id) carried.add(String(fm.artifact_id)); }
    catch {  }
  }
  targets = [];
  let unread = 0;
  for (const p of runParts(dir)) {
    let fm;
    try { fm = frontmatter(readFileSync(p.abs, 'utf8'), p.rel); } catch { unread++; continue; }
    const why = strandedPart(p, fm, id => carried.has(id));
    if (why) targets.push({ rel: p.rel, why });
  }
  const statuses = stageStatuses(dir);
  for (const r of runRecords(dir)) {
    const why = strandedRecord(r, id => carried.has(id));
    if (!why) continue;
    const status = statuses.get(Number(r.stage));
    if (IN_FLIGHT.includes(status))
      kept.push(`${r.rel} kept: stage ${r.stage} is ${FLIGHT_WORDS[status] || status}, and its document may not be written yet. ` +
                `To restart the stage, take back its folder, ${STAGE_DIRS[r.stage - 1]}.`);
    else targets.push({ rel: r.rel, why });
  }
  if (!targets.length)
    die(`nothing in this run is stranded${kept.length ? ' outside the stage in flight' : ''}: every part under a stage's parts/ ` +
        `names a document this run carries, and so does every record under records/${kept.length ? ' of another stage' : ''}, ` +
        `so an empty file box has nothing to take back.` +
        (kept.length ? `\n        ${kept.join('\n        ')}` : '') +
        (unread ? `\n        ${unread} part(s) could not be read and are never taken back unnamed.` : '') +
        `\n        To take back something else, give its path inside the run in the file box.`);
}

for (const t of targets) {
  t.abs = resolve(join(dir, t.rel));
  if (!t.abs.startsWith(resolve(dir) + sep)) die(`${t.rel} resolves outside ${dir} — a withdrawal moves a file inside its own run and nowhere else`);
  const want = t.rel.replace(/\/+$/, '');
  const holds = () => {
    const out = [];
    const walk = (abs, rel) => {
      for (const e of readdirSync(abs, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
        if (e.name.startsWith('.')) continue;
        const r = rel ? `${rel}/${e.name}` : e.name;
        if (r === 'superseded') continue;
        if (e.isDirectory()) walk(join(abs, e.name), r);
        else if (e.name.endsWith('.md')) out.push(r);
      }
    };
    walk(dir, '');
    return out;
  };
  const listed = fs => fs.map(f => `          ${f}`).join('\n');
  const orEmpty = 'Give one of these in the file box, or leave the box empty to take back only what the checks\n' +
                  '        report joined to nothing.';
  if (!existsSync(t.abs)) {
    const all = holds();
    const folderOf = f => (f.includes('/') ? f.slice(0, f.lastIndexOf('/')) : '');
    const near = all.filter(f => f === want || f.endsWith(want) || f.startsWith(`${want}/`) || folderOf(f).endsWith(want));
    if (near.length) die(`${t.rel} is not in this run. Matched on its ending, this run holds:\n${listed(near)}\n        ${orEmpty}`);
    const folders = [...new Set(all.map(folderOf).filter(Boolean))];
    die(`${t.rel} is not in this run, and nothing in it ends with that path.\n` +
        `        It was matched against the ${all.length} file(s) this run holds, under: ${folders.join(', ') || '(no folder)'}.\n` +
        `        Give a path the run holds in the file box, or leave the box empty to take back only what the\n` +
        `        checks report joined to nothing.`);
  }
  if (statSync(t.abs).isDirectory()) {
    const inside = holds().filter(f => f.startsWith(`${want}/`));
    die(inside.length
      ? `${t.rel} is a folder, so nothing was taken back. It holds:\n${listed(inside)}\n        ${orEmpty}`
      : `${t.rel} is a folder, so nothing was taken back, and it holds no file this task could take back.\n` +
        `        Give a file's path inside the run in the file box, or leave the box empty to take back only what\n` +
        `        the checks report joined to nothing.`);
  }
  const first = t.rel.split('/').filter(Boolean);
  if (first.includes('supplied')) die('material under `supplied/` is the customer\'s and is never withdrawn here.\n' +
                                      '        Whatever is wrong with it is a fact about the run, not a file to move.');
  if (first[0] === 'superseded') die(`${t.rel} is already withdrawn`);
}

needReason();
for (const t of targets) {
  let name;
  try { ({ name } = supersedeFile(dir, t.rel, { reason, by, why: t.why })); }
  catch (e) { die(e.message); }

  console.log(`withdrawn: ${t.rel} → superseded/${name}`);
  if (t.why) console.log(`  found stranded: ${t.why}`);
}
console.log(`  ${reason}`);
console.log(`  Nothing was deleted. ${targets.length === 1 ? 'The file is' : `The ${targets.length} files are`} in the run's own superseded/, stamped with who took`);
console.log(`  it back and why, so what the run took back is still readable afterwards.`);
for (const k of kept) console.log(`  ${k}`);
}

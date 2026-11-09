#!/usr/bin/env node

import './stdout-sync.mjs';
import { readFileSync, existsSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, SUPPLIED_DIR, STAGE_DIRS, KEEP_FILE, KEEP_TEXT } from './run-files.mjs';
import { looseFiles } from './material.mjs';
import { frontmatter } from './yaml.mjs';
import { shownDate } from './fixed-messages.mjs';   // r1.13 · W44 · BD-133: a date a person reads is day first

export const STAGE = STAGE_DIRS[2];
const die = m => { console.error(`market-material: ${m}`); process.exit(1); };

export const COMPETITOR_ENTRY = "a name, and addresses from two or more different publishers, one of them the competitor's own site";
export const TREND_ENTRY = 'a class (business, technology or regulatory, three to five in each), a name and one or more addresses, and a regulatory trend names its instrument and the date it takes effect, or says that date is not settled';

export function shapeOf(text) {
  const lines = String(text || '').split('\n');
  let section = null, current = null, entry = null;
  const count = { competitors: 0, trends: 0 };
  const sections = [], competitors = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      const t = h2[1].toLowerCase();
      section = /competitor|konkuren/.test(t) ? 'competitors' : /trend/.test(t) ? 'trends' : null;
      current = { heading: h2[1], read_as: section, entries: 0, list_lines: 0 };
      sections.push(current);
      entry = null;
      continue;
    }
    const h3 = line.match(/^###\s+(\S.*?)\s*$/);
    if (h3) {
      if (current) current.entries++;
      if (section) count[section]++;
      entry = section === 'competitors' ? { name: h3[1], hosts: [] } : null;
      if (entry) competitors.push(entry);
      continue;
    }
    if (current && /^\s*(?:[-*]|\d+\.)\s+\S/.test(line)) current.list_lines++;
    if (entry)
      for (const m of line.matchAll(/https?:\/\/([^\s/?#<>()[\]"'`]+)/gi)) {
        const p = publisherOf(m[1]);
        if (p && !entry.hosts.includes(p)) entry.hosts.push(p);
      }
  }
  return { ...count, sections, thin: competitors.filter(e => e.hosts.length < 2) };
}

export function publisherOf(authority) {
  const host = String(authority || '').replace(/^[^@]*@/, '').replace(/[.,;:!]+$/, '').replace(/:\d*$/, '')
    .replace(/\.+$/, '').toLowerCase();
  const labels = host.split('.').filter(Boolean);
  return labels.length ? labels.slice(-2).join('.') : '';
}

const EXAMPLE = ['## Konkurenti', '### Air Bank', 'https://www.airbank.cz/', 'https://www.mesec.cz/banky/air-bank/'];
const TREND_SHAPE = [
  'The shape is two "##" sections, one naming competitors and one naming trends, with a "###"',
  'entry under each, and the stage\'s gate holds each entry to this:',
  `  a competitor: ${COMPETITOR_ENTRY}`,
  `  a trend: ${TREND_ENTRY}`,
  'Type, standing, impact and horizon are the stage\'s job and stay the stage\'s job.'];
export const CLOSING = {
  file: 'Change the heading, or add the `###` headings, in your own file, save it, and run this task again.',
  pasted: 'Write your list in this shape in the chat, copy it, and run this task again, or save it as a file in ' +
    `${STAGE}/${SUPPLIED_DIR}/.`,
};
const counted = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const readAs = x => !x.read_as
  ? `${x.entries ? counted(x.entries, 'entry', 'entries') : x.list_lines ? counted(x.list_lines, 'list line', 'list lines') : 'nothing under it'}, ` +
    'not read: its heading names neither competitors nor trends'
  : x.entries ? `${counted(x.entries, 'entry', 'entries')}, read as ${x.read_as}`
  : x.list_lines ? `${counted(x.list_lines, 'list line', 'list lines')} and no \`###\` entry: each ` +
    `${x.read_as === 'competitors' ? 'competitor' : 'trend'} needs its own \`###\` heading`
  : 'no `###` entry under it';

export function listProblem(shape, where, route = 'file') {
  const s = shape || {};
  if (Number(s.competitors) > 0) return null;
  const t = Number(s.trends) || 0;
  const sections = Array.isArray(s.sections) ? s.sections : [];
  return [
    t ? `${where} holds ${counted(t, 'trend entry', 'trend entries')} and no competitor entry, so nothing was recorded.`
      : `${where} holds no competitor or trend entry, so nothing was recorded.`,
    'The sections it holds, and how each was read:',
    ...(sections.length ? sections.map(x => `  ## ${x.heading} — ${readAs(x)}`)
      : ['  no `##` section: the list needs a competitors section and a trends section']),
    'A competitors section is headed with a word holding "competitor" or "konkuren", for example `## Competitors` or ' +
      '`## Konkurenti`, with a `###` heading for each competitor under it and its addresses on the lines below:',
    '', ...EXAMPLE.map(l => `    ${l}`), '',
    ...(t ? [] : [...TREND_SHAPE, '']),
    CLOSING[route] || CLOSING.file,
  ].join('\n');
}

export function takenIn(got, route = 'file') {
  const L = [
    `  ${got.competitors} competitor(s) and ${got.trends} trend(s), counted off the headings and not read`,
    `  ${got.bytes} bytes  ${got.sha256}`,
    '\nThe stage\'s gate holds each entry to this, and counting the headings does not check it:',
    `  a competitor: ${COMPETITOR_ENTRY}`,
    `  a trend: ${TREND_ENTRY}`,
    '\n**Check that against your own copy before the stage runs.** You are the only one who still',
    'holds the original, and a hash nobody compares is decoration.',
    '  That line is the file\'s fingerprint: the same file gives the same one, and one changed byte changes it.',
  ];
  const thin = Array.isArray(got.thin) ? got.thin : [];
  if (thin.length)
    L.push(`\n${thin.length} of the ${got.competitors} competitors carry addresses from fewer than two publishers:`,
      ...thin.map(e => `  ${e.name} — ${e.hosts.length ? `1 publisher (${e.hosts[0]})` : 'no address written in full from https://'}`),
      'Stage 3 reads only the addresses on your list and searches for nothing else, so it cannot find a second publisher ' +
      'for these. The gate holds each card to two, and a card short of them is refused there. ' +
      (route === 'pasted'
        ? 'Add an address from another publisher to each in your list in the chat and copy it, take ' +
          `${STAGE}/${got.file} out of the folder (right-click it in the Explorer and choose Delete), and run this task ` +
          'again, or go ahead as it is.'
        : 'Add an address from another publisher to each in your own file and run this task again, or go ahead as it is.'));
  if (got.competitors < 3)
    L.push(`\nYour list names ${got.competitors} competitor(s). Stage 3 profiles at least three, so the gate will ask for ` +
      `${3 - got.competitors} more.`);
  return L;
}

export function suppliedFile(dir) {
  const sup = join(dir, STAGE, SUPPLIED_DIR);
  if (!existsSync(sup))
    return { problem: `${STAGE}/${SUPPLIED_DIR}/ does not exist, because this run was started before init made it.\n` +
      '        Run "SPOCK: what market material has been supplied", which makes it; then put the file there and run that task again.' };
  const loose = looseFiles(dir, STAGE).map(f => `${STAGE}/${f.rel} sits outside ${SUPPLIED_DIR}/. If it is the list you meant to ` +
    `supply, move it into ${STAGE}/${SUPPLIED_DIR}/ (drag it there in the Explorer), then run this task again. Nothing here ` +
    'moves it for you, because only you know whether it is the list.');
  const files = listedFiles(sup);
  if (!files.length)
    return loose.length ? { problem: loose.join('\n') }
      : { none: `nothing in ${STAGE}/${SUPPLIED_DIR}/: no market list has been supplied, so nothing is recorded. A run that searches for its market needs nothing here.` };
  if (files.length > 1)
    return { problem: `${files.length} files in ${STAGE}/${SUPPLIED_DIR}/ — ${files.join(', ')}.\n` +
      '        This records one supplied list. Where one of them is a new version of the list, move the old one to the run\'s superseded/ folder (drag it there in the Explorer), and run this task again.' };
  const rel = `${SUPPLIED_DIR}/${files[0]}`;
  const abs = join(sup, files[0]);
  const buf = readFileSync(abs);
  const text = buf.toString('utf8');
  const shape = shapeOf(text);
  const problem = listProblem(shape, rel, 'file');
  if (problem) return { problem };
  return { file: rel, bytes: buf.length, sha256: createHash('sha256').update(buf).digest('hex'),
           competitors: shape.competitors, trends: shape.trends, thin: shape.thin, loose };
}

export function recordedAs(dir, got) {
  let sm;
  try {
    const st = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
    sm = (((st && st.stages) || []).find(s => String(s.id) === '3') || {}).supplied_market;
  } catch { return null; }
  if (!sm || !got || String(sm.file || '').trim() !== got.file || String(sm.sha256 || '').trim() !== got.sha256) return null;
  const at = String(sm.recorded_at || '').trim();
  return { arrival: sm.arrival ? String(sm.arrival).trim() : undefined, by: sm.by ? String(sm.by).trim() : undefined,
           recorded_at: /^\d{4}-\d{2}-\d{2}$/.test(at) ? at : undefined };
}

export function changedFrom(dir, got) {
  let sm, status = null;
  try {
    const st = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
    const s3 = ((st && st.stages) || []).find(s => String(s.id) === '3') || {};
    sm = s3.supplied_market; status = s3.status ? String(s3.status) : null;
  } catch { return null; }
  if (!sm || !sm.file || !got) return null;
  if (String(sm.file).trim() === got.file && String(sm.sha256 || '').trim() === got.sha256) return null;
  return { was: sm, status };
}

export function changeSaid(was, got) {
  return [`The list changed since the run recorded it${String(was.file).trim() !== got.file ? `: it was ${STAGE}/${String(was.file).trim()} and is now ${STAGE}/${got.file}` : ''}.`,
    `  competitors  ${was.competitors} before and ${got.competitors} now`,
    `  trends       ${was.trends} before and ${got.trends} now`,
    `  bytes        ${was.bytes} before and ${got.bytes} now`,
    `  fingerprint  ${String(was.sha256).trim()} before and ${got.sha256} now`];
}

export function listedFiles(sup) {
  return existsSync(sup) ? readdirSync(sup).sort().filter(f => !f.startsWith('.') && statSync(join(sup, f)).isFile()) : [];
}

const isMain = process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1]);
if (isMain) {
  const argv = process.argv.slice(2);
  const write = argv.includes('--write');
  const runId = argv.find(a => !a.startsWith('-'));
  if (!runId) die('usage: market-material.mjs <run_id> [--write]');

  const dir = join(RUNS_ROOT, runId);
  if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`${dir} has no RUN-STATE.md`);

  if (write && !existsSync(join(dir, STAGE, SUPPLIED_DIR))) {
    mkdirSync(join(dir, STAGE, SUPPLIED_DIR), { recursive: true });
    writeFileSync(join(dir, STAGE, SUPPLIED_DIR, KEEP_FILE), KEEP_TEXT);
    console.log(`${runId} — made ${STAGE}/${SUPPLIED_DIR}/, which this run was started without. The market list goes in it.`);
  }
  const got = suppliedFile(dir);
  if (got.none) { console.log(`${runId} — ${got.none}`); process.exit(0); }
  if (got.problem) die(got.problem);
  const ci = argv.indexOf('--confirm');
  const confirm = ci === -1 ? undefined : String(argv[ci + 1] ?? '').trim();
  const change = changedFrom(dir, got);
  const recorded = recordedAs(dir, got);
  if (write && recorded && !change) {
    console.log(`${runId} — ${STAGE}/${got.file} is already recorded, and nothing changed. Nothing was written.`);
    if (recorded.arrival === 'conversation')
      console.log(`  Still recorded as pasted in the chat by ${recorded.by}${recorded.recorded_at ? ` on ${shownDate(recorded.recorded_at)}` : ''}: ` +
        'the file is the one that was recorded, unchanged.');
    process.exit(0);
  }
  if (change) {
    for (const l of changeSaid(change.was, got)) console.log(l);
    if (write && ['in_review', 'refined', 'accepted'].includes(String(change.status))) {
      console.error(`market-material: stage 3 is "${change.status}", so a person has been shown the cards made from the recorded list, and nothing was recorded.\n` +
        '        Send stage 3 back first with "SPOCK: send a stage back to be redone", then run this task again to take the new list in.');
      process.exit(3);
    }
    if (write && confirm === undefined) {
      console.error('market-material: a changed list is taken in only on the person\'s confirmation, so nothing was recorded.\n' +
        '        The person runs "SPOCK: what market material has been supplied", which asks them to confirm before it records the new version.');
      process.exit(3);
    }
  }
  if (write && confirm !== undefined && confirm !== 'yes') {
    console.error(`market-material: you answered "${confirm}" in the box, so nothing was recorded.`);
    process.exit(3);
  }

  console.log(`${runId} — ${STAGE}/${got.file}`);
  console.log(takenIn(got).join('\n'));
  if (got.loose.length) console.log(`\n${got.loose.join('\n')}`);

  if (!write) {
    console.log('\nRun again with --write to put it on the run record.');
  } else {
    const kept = recorded;
    const how = kept ? [...(kept.arrival ? ['--arrival', kept.arrival] : []), ...(kept.by ? ['--by', kept.by] : []),
      ...(kept.recorded_at ? ['--at', kept.recorded_at] : [])] : ['--arrival', 'file'];
    if (change) how.push('--previous-sha256', String(change.was.sha256).trim(), '--changed-at', new Date().toISOString().slice(0, 10),
      ...(String(change.was.file).trim() !== got.file ? ['--previous-file', String(change.was.file).trim()] : []));
    const { execFileSync } = await import('node:child_process');
    try {
      execFileSync('node', ['.github/scripts/run-state.mjs', 'supplied-market', runId,
        '--file', got.file, '--bytes', String(got.bytes), '--sha256', got.sha256,
        '--competitors', String(got.competitors), '--trends', String(got.trends), ...how],
        { stdio: 'inherit' });
    } catch { process.exit(1); }
    if (kept && kept.arrival === 'conversation')
      console.log(`  Still recorded as pasted in the chat by ${kept.by}${kept.recorded_at ? ` on ${shownDate(kept.recorded_at)}` : ''}: ` +
        'the file is the one that was recorded, unchanged.');
  }
}

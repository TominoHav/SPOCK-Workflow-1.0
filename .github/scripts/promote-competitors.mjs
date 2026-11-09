#!/usr/bin/env node

import './stdout-sync.mjs';
import { existsSync, readdirSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, FIXTURES_ROOT, STAGE_DIRS, openRuns } from './run-files.mjs';
import { CORPUS_ROOT, cardIn } from './store.mjs';
import { personOnly } from './gates.mjs';
import { frontmatter, unquote } from './yaml.mjs';

const STAGE = STAGE_DIRS[2];
const die = m => { console.error(`promote-competitors: ${m}`); process.exit(1); };

export function promotable(runDir) {
  const from = join(runDir, 'records', STAGE);
  if (!existsSync(from)) return { from, files: [], a5: 0, a6: 0 };
  const files = readdirSync(from).filter(f => /^A[56]-r\d+.*\.record\.md$/.test(f)).sort();
  return { from, files,
    a5: files.filter(f => f.startsWith('A5-')).length,
    a6: files.filter(f => f.startsWith('A6-')).length };
}

export const WHY_CONFIDENTIAL = 'marked confidential';
export const WHY_SUPPLIED = 'built on supplied material not marked public';

export function suppliedMarket(runDir) {
  const state = frontmatter(readFileSync(join(runDir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md') || {};
  const s3 = (Array.isArray(state.stages) ? state.stages : []).find(x => Number(x.id) === 3);
  return !!(s3 && s3.supplied_market && String(s3.supplied_market.file || '').trim());
}

const fmRange = lines => {
  if (!/^﻿?---\r?$/.test(lines[0] || '')) return null;
  const end = lines.findIndex((l, i) => i > 0 && l.replace(/\r$/, '') === '---');
  return end === -1 ? null : [1, end];
};
const valueOf = s => unquote(String(s).replace(/\r$/, '')).trim();

export function entriesOf(lines) {
  const r = fmRange(lines);
  if (!r) return [];
  const out = [];
  let list = null, cur = null;
  for (let i = r[0]; i < r[1]; i++) {
    const l = lines[i];
    if (/^\S/.test(l)) {
      if (cur) { cur.end = i; cur = null; }
      const m = /^([A-Za-z_]\w*):\s*$/.exec(l.replace(/\r$/, ''));
      list = m ? m[1] : null;
      continue;
    }
    if (!list) continue;
    if (/^ {2}- /.test(l)) {
      if (cur) cur.end = i;
      cur = { list, start: i, end: r[1], key: null, confidential: null, addresses: [] };
      out.push(cur);
    }
    if (!cur) continue;
    const own = l.match(/^(?: {2}- | {4})([A-Za-z_]\w*):\s*(.*)$/);
    if (own && own[1] === 'identity_key') cur.key = valueOf(own[2]);
    if (own && own[1] === 'confidential') cur.confidential = valueOf(own[2]);
    const ad = l.match(/^\s+(?:- )?address:\s*(.*)$/);
    if (ad) cur.addresses.push(valueOf(ad[1]));
  }
  return out;
}

function cardAddresses(lines) {
  const at = lines.findIndex(l => /^card:\s*$/.test(l.replace(/\r$/, '')));
  const out = [];
  if (at === -1) return out;
  for (let i = at + 1; i < lines.length && !/^\S/.test(lines[i]); i++) {
    const ad = lines[i].match(/^\s+(?:- )?address:\s*(.*)$/);
    if (ad) out.push(valueOf(ad[1]));
  }
  return out;
}

export function staysWhy(card, supplied) {
  const c = String((card && card.confidential) || '').trim().toLowerCase();
  if (c === 'yes') return WHY_CONFIDENTIAL;
  const offWeb = ((card && card.addresses) || []).some(a => a && !/^https?:\/\//i.test(a));
  return (supplied || offWeb) && c !== 'no' ? WHY_SUPPLIED : null;
}

export function withoutEntries(text, keys) {
  if (!keys.size) return text;
  const lines = text.split('\n');
  const drop = entriesOf(lines).filter(e => e.key && keys.has(e.key));
  if (!drop.length) return text;
  const gone = new Set(drop.flatMap(e => Array.from({ length: e.end - e.start }, (_, k) => e.start + k)));
  return lines.filter((_, i) => !gone.has(i)).join('\n');
}

export function keepPlan(runDir) {
  const { from, files } = promotable(runDir);
  const supplied = suppliedMarket(runDir);
  const kept = new Set(), stay = [];
  const a6 = [];
  for (const f of files.filter(x => x.startsWith('A6-'))) {
    const text = readFileSync(join(from, f), 'utf8');
    const lines = text.split('\n');
    const single = cardIn(text);
    if (single) {
      const why = staysWhy({ confidential: single.confidential, addresses: cardAddresses(lines) }, supplied);
      if (why) stay.push({ key: single.identity_key, why });
      else { kept.add(single.identity_key); a6.push({ file: f, text }); }
      continue;
    }
    const cards = entriesOf(lines).filter(e => e.list === 'cards' && e.key);
    let keptHere = 0;
    for (const c of cards) {
      const why = staysWhy(c, supplied);
      if (why) stay.push({ key: c.key, why }); else { kept.add(c.key); keptHere++; }
    }
    if (!cards.length || keptHere) a6.push({ file: f, text });
  }
  const participantsOf = text => entriesOf(text.split('\n')).filter(e => e.list === 'participants' && e.key).map(e => e.key);
  const a5 = files.filter(x => x.startsWith('A5-')).map(f => ({ file: f, text: readFileSync(join(from, f), 'utf8') }));
  const removed = new Set(stay.map(s => s.key));
  if (supplied) for (const r of a5) for (const k of participantsOf(r.text)) removed.add(k);
  for (const k of kept) removed.delete(k);
  const copies = [...a5, ...a6].sort((x, y) => (x.file < y.file ? -1 : 1)).map(r => {
    const text = withoutEntries(r.text, removed);
    return { file: r.file, text: text === r.text ? null : text };
  });
  return { supplied, copies, kept: [...kept], stay, removed: [...removed] };
}

export const stayLine = stay => (stay.length
  ? `${stay.length} card(s) stay in this run and are not kept: ${stay.map(s => `${s.key} (${s.why})`).join(', ')}.` : '');

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  const write = argv.includes('--write');
  const keptIdx = argv.indexOf('--kept-by');
  const keptBy = keptIdx === -1 ? '' : String(argv[keptIdx + 1] || '').trim();
  const named = argv.find((a, i) => !a.startsWith('--') && i !== keptIdx + 1);
  if (write && !keptBy)
    die('--kept-by is required and is asked for, never supplied by an agent. The corpus is what every later ' +
        'run starts from, so keeping a run in it is a person\'s decision and the record carries their name. ' +
        'Run the task "SPOCK: keep this run\'s competitors" and type it into the box.');
  const notPerson = personOnly(keptBy, 'Keeping a run\'s competitors', '--kept-by');
  if (notPerson) die(notPerson);
  const open = openRuns();
  const runId = named || (open.length === 1 ? basename(open[0]) : null);
  if (!runId) die(open.length ? `${open.length} runs are open — name the one to keep` : 'no open run, and none named');

  const runDir = join(RUNS_ROOT, runId);
  if (!existsSync(join(runDir, 'RUN-STATE.md'))) die(`${runDir} is not a run`);
  if (existsSync(join(FIXTURES_ROOT, runId)))
    die(`${runId} is also the id of a committed fixture. The store joins on the run id alone, so a promotion ` +
        `under this name would be folded into that fixture's rows: one entry in seen_in_runs for two ` +
        `different runs, and pointers that resolve into whichever root is read first. Rename the run first.`);

  const { from, files, a5, a6 } = promotable(runDir);
  if (!files.length) die(`no A5 or A6 records under ${from} — this run mapped no market`);
  if (!a5) die(`${a6} card record(s) and no landscape record. The store reads participants off A5 and never ` +
               `off the cards alone, so promoting these would add nothing and say it had.`);

  let plan;
  try { plan = keepPlan(runDir); }
  catch (e) { die(`${runDir}/RUN-STATE.md could not be read (${String(e.message).split('\n')[0]}), so this task cannot tell whether the run took supplied market material, and keeps nothing`); }
  const stays = stayLine(plan.stay);
  const noneLeft = !plan.kept.length && (plan.stay.length > 0 || plan.supplied);
  const to = join(CORPUS_ROOT, runId, 'records', STAGE);
  console.log(`${runId} — ${a5} landscape record(s) and ${a6} card record(s)`);
  for (const c of noneLeft ? [] : plan.copies) console.log(`  ${c.file}`);
  if (!write) {
    if (stays) console.log(`\n${stays}`);
    console.log(`\nnothing copied — pass --write to keep these in ${CORPUS_ROOT}/`);
    process.exit(0);
  }
  if (!keptBy)
    die('--kept-by is required and is asked for, never supplied by an agent. The corpus is what every later ' +
        'run starts from, so keeping a run in it is a person\'s decision and the record carries their name. ' +
        'Run the task "SPOCK: keep this run\'s competitors" and type it into the box.');

  const runCopy = join(CORPUS_ROOT, runId);
  const hadCopy = runId === basename(runId) && !/^\.+$/.test(runId) && existsSync(runCopy);
  if (hadCopy) rmSync(runCopy, { recursive: true, force: true });
  if (noneLeft)
    die(`${stays ? `${stays}\n  ` : ''}Nothing was copied: no card is left to keep, and the store reads participants off A5 beside ` +
        `their cards, so promoting the landscape alone would add nothing and say it had.` +
        (hadCopy ? ` The copy an earlier keep of this run left in ${runCopy}/ is removed, so none of it stays in the store.` : ''));

  mkdirSync(to, { recursive: true });
  for (const c of plan.copies)
    if (c.text === null) copyFileSync(join(from, c.file), join(to, c.file));
    else writeFileSync(join(to, c.file), c.text);
  const keptA6 = plan.copies.filter(c => c.file.startsWith('A6-')).length;
  writeFileSync(join(CORPUS_ROOT, runId, 'KEPT.md'),
    `---\nrun_id: ${runId}\nkept_by: ${JSON.stringify(keptBy)}\nkept_at: ${new Date().toISOString().slice(0, 10)}\n` +
    `records: ${plan.copies.length}\n---\n\n# Kept for the estate\n\n` +
    `${keptBy} kept this run's market research so later runs start from it. ` +
    `${a5} landscape record(s) and ${keptA6} card record(s), and nothing else about the run travels. ` +
    `${plan.stay.length} card(s) stayed in the run.\n`);
  console.log(`\ncopied ${plan.copies.length} record(s) into ${to}/, kept by ${keptBy}`);
  if (stays) console.log(stays);
}

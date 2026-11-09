#!/usr/bin/env node

import './stdout-sync.mjs';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, extname } from 'node:path';
import { RUNS_ROOT, SUPPLIED_DIR, STAGE_DIRS, runLanguage, stoppedRun } from './run-files.mjs';
import { frontmatter, fenceAt } from './yaml.mjs';
import { suppliedFiles, addRefusal, freeName, looseFiles, materialChanges, changeLines, inUse, measure as measureFile,
         itemLines, measureItems } from './material.mjs';
export { itemLines, measureItems };
import { supersedeFile } from './withdraw.mjs';
import { convert } from './convert.mjs';
import { shownDate } from './fixed-messages.mjs';   // r1.13 · W44 · BD-133: a date a person reads is day first
import { PERIOD_TASK, PERIOD_RE, PERIOD_FORMS, DATE_IN_TEXT_RE, confirmedPeriod, suppliedFileKey } from './gates.mjs';

const STAGE = STAGE_DIRS[1];
const OUT = '1-problem-material.md';

const die = m => { console.error(`problem-material: ${m}`); process.exit(1); };
const refuse = m => { console.error(`problem-material: ${m}`); process.exit(3); };
const today = () => new Date().toISOString().slice(0, 10);
const sha256Of = b => createHash('sha256').update(b).digest('hex');

export function formOf(file) {
  const e = extname(file).toLowerCase();
  if (['.vtt', '.srt'].includes(e)) return 'transcript';
  return 'document';
}

export { suppliedFiles, addRefusal };

const FROM_CONVERSATION = /^supplied\/(typed|from-chat)-(\d{4}-\d{2}-\d{2})(?:-\d+)?\.md$/;
export function conversationOf(rel, by = '') {
  const m = FROM_CONVERSATION.exec(String(rel || ''));
  if (!m) return null;
  const who = String(by || '').trim();
  return { arrival: 'conversation', form: 'text',
           provenance: `${m[1] === 'typed' ? 'typed in the task box' : 'pasted in the chat'}${who ? ` by ${who}` : ''}, saved on ${m[2]}` };
}

export function itemsFrom(dir) {
  return suppliedFiles(dir)
    .map((f, i) => {
      const said = conversationOf(f.rel);
      return {
        ref: `A2-item-${i + 1}`,
        form: said ? said.form : formOf(f.rel),
        arrival: said ? said.arrival : 'file',
        source_path: f.rel,
        bytes: f.bytes ?? null,
        sha256: f.sha256 || null,
        ...(said ? { provenance: said.provenance } : {}),
      };
    });
}

const A2_WORDS = {
  en: n => ['# Problems | Problem material — what the person supplied',
    '',
    `**${n} file(s) were supplied and each has an item above.** The envelope and one item per`,
    'file are written by the workflow from the folder; **nothing here was read.**',
    '',
    '**`provenance` is empty on purpose and intake fills it.** One supplied file often carries several',
    'distinct pieces of material — an interview, a workshop synthesis, a testing brief — and every',
    'observation later cites an item by number. **A folder listing cannot see that and intake can**, because',
    'intake is the binding permitted to read this material. Where a file holds more than one piece, intake',
    'adds items and numbers them on from the last.',
    '',
    '**Intake also gives each item a `research` label**: `synthetic`, `human` or `not_stated`, from what the file',
    'says about itself, and never `human` by default.',
    '',
    '**Where you say what the material is, your answer sets the label** and intake records it as yours — your name,',
    'the date and your words — with its own reading of the file beside it, in the same `provenance`, so the item',
    'carries both.'],
  cs: n => ['# Problems | Vstupní materiál: co dodal uživatel',
    '',
    `**Dodané soubory: ${n}. Každý má výše svou položku.** Obálku a jednu položku na soubor`,
    'zapisuje workflow ze složky; **obsah souborů se při tom nečetl.**',
    '',
    '**Pole `provenance` je záměrně prázdné a vyplní ho příjem materiálu.** Jeden dodaný soubor často obsahuje',
    'několik samostatných podkladů, například rozhovor, shrnutí workshopu nebo zadání testování, a každé',
    'pozdější zjištění cituje položku podle čísla. **Výpis složky to nerozpozná, příjem materiálu ano**, protože',
    'jen příjem materiálu smí tento materiál číst. Kde soubor obsahuje víc podkladů, příjem materiálu doplní',
    'položky a očísluje je od poslední dál.',
    '',
    '**Příjem materiálu dá každé položce také štítek `research`**: `synthetic`, `human` nebo `not_stated` podle toho,',
    'co o sobě soubor sám říká, a nikdy ne automaticky `human`.',
    '',
    '**Když řeknete, co materiál je, určuje štítek vaše odpověď** a příjem materiálu ji zapíše jako vaši — vaše',
    'jméno, datum a vaše slova — a vedle ní své vlastní čtení souboru, do stejného pole `provenance`, takže',
    'položka nese obojí.'],
};

const RESEARCH_LINE = '\n**Intake also gives each item a `research` label**: synthetic, human or not_stated, from what the file' +
  '\nsays about itself, and never human by default.' +
  '\n**Where you say what the material is, your answer sets the label** and intake records it as yours — your name,' +
  '\nthe date and your words — with its own reading of the file beside it, in the same provenance, so the item' +
  '\ncarries both.';

export function render(runId, items, date = today(), lang = 'en') {
  const L = ['---', `run_id: ${runId}`, 'artifact_id: A2', 'modified_by: human', 'supplied_by: user',
             'ost_role: none', 'status: produced', 'workflow: problems', 'revisions: 0', `produced_at: ${date}`,
             'sources: []', 'external_sources: []', 'items:'];
  for (const it of items)
    L.push(`  - ref: ${it.ref}`, `    form: ${it.form}`, `    arrival: ${it.arrival}`,
           `    source_path: ${JSON.stringify(String(it.source_path))}`,
           ...(it.bytes === null || it.bytes === undefined ? [] : [`    bytes: ${it.bytes}`]),
           ...(it.sha256 ? [`    sha256: ${it.sha256}`] : []),
           it.provenance ? `    provenance: ${JSON.stringify(String(it.provenance))}`
             : `    provenance: ""                     # intake fills this in — see the note below`);
  L.push('---', '', ...(A2_WORDS[lang] || A2_WORDS.en)(items.length), '');
  return L.join('\n') + '\n';
}

export function appendItems(text, files, date = today()) {
  const lines = text.split('\n');
  const end = String(lines[0] ?? '').trim() === '---' ? fenceAt(lines) : -1;
  let fm = null;
  try { fm = end > 0 ? frontmatter(text, OUT) : null; } catch { fm = null; }
  const items = Array.isArray(fm && fm.items) ? fm.items : [];
  const L = end > 0 ? itemLines(lines, end) : null;
  if (!fm || !L || L.starts.length !== items.length) return null;
  const refs = new Set(items.map(i => String((i && i.ref) || '').trim()));
  let next = 1 + Math.max(0, ...items.map(i => Number((/^A2-item-(\d+)$/.exec(String((i && i.ref) || '').trim()) || [])[1] || 0)));
  const pad = ' '.repeat(L.dash), field = ' '.repeat(L.field);
  const added = [], block = [];
  for (const f of files) {
    while (refs.has(`A2-item-${next}`)) next++;
    const it = { ref: `A2-item-${next++}`, form: f.form || formOf(f.rel), arrival: f.arrival || 'file', source_path: f.rel,
                 bytes: f.bytes, sha256: f.sha256, provenance: f.provenance || '',
                 ...(f.added_at ? { added_at: f.added_at } : {}), ...(f.replaces ? { replaces: f.replaces } : {}) };
    refs.add(it.ref);
    added.push(it);
    block.push(`${pad}- ref: ${it.ref}`, `${field}form: ${it.form}`, `${field}arrival: ${it.arrival}`, `${field}source_path: ${JSON.stringify(String(it.source_path))}`,
               ...(it.bytes === null || it.bytes === undefined ? [] : [`${field}bytes: ${it.bytes}`]),
               ...(it.sha256 ? [`${field}sha256: ${it.sha256}`] : []),
               ...(it.added_at ? [`${field}added_at: ${it.added_at}`] : []),
               ...(it.replaces ? [`${field}replaces: ${JSON.stringify(String(it.replaces))}`] : []),
               it.provenance ? `${field}provenance: ${JSON.stringify(String(it.provenance))}` : `${field}provenance: ""                     # intake fills this in`);
  }
  let last = L.stop - 1;
  while (last > L.at && !lines[last].trim()) last--;
  lines.splice(last + 1, 0, ...block);
  if (fm.produced_at === undefined && fm.assembled_at === undefined) lines.splice(L.at, 0, `produced_at: ${date}`);
  let t = lines.join('\n').replace(/\n*$/, '\n');
  t += `\n**${added.length} more file(s) were added on ${date}**, each with an item above, numbered on from the last. ` +
       'Nothing here was read, and no item already on the record was renumbered.\n';
  return { text: t, added };
}

export function stampItems(text, stamps) {
  const lines = text.split('\n');
  const end = String(lines[0] ?? '').trim() === '---' ? fenceAt(lines) : -1;
  let fm = null;
  try { fm = end > 0 ? frontmatter(text, OUT) : null; } catch { fm = null; }
  const items = Array.isArray(fm && fm.items) ? fm.items : [];
  const L = end > 0 ? itemLines(lines, end) : null;
  if (!fm || !L || L.starts.length !== items.length) return null;
  const inserts = [];
  items.forEach((it, k) => {
    const add = stamps.get(String((it && it.ref) || ''));
    if (!add || !add.length) return;
    let last = (L.starts[k + 1] ?? L.stop) - 1;
    while (last > L.starts[k] && !lines[last].trim()) last--;
    inserts.push([last + 1, add.map(([key, v]) => `${' '.repeat(L.field)}${key}: ${/^[A-Za-z0-9._-]+$/.test(String(v)) ? v : JSON.stringify(String(v))}`)]);
  });
  for (const [at, add] of inserts.sort((x, y) => y[0] - x[0])) lines.splice(at, 0, ...add);
  return lines.join('\n');
}

export const CONFIRM_YES = 'yes';

const READABLE = /\.(md|txt|csv|tsv|json|ya?ml|log|vtt|srt)$/i;
const CONVERTED = /\.(docx|pptx|xlsx)\.md$/i;

export function yearNamed(text) {
  const counts = new Map();
  for (const m of String(text).matchAll(/(?<!\d)((?:19|20)\d{2})(?!\d)/g)) counts.set(m[1], (counts.get(m[1]) || 0) + 1);
  let best = '', n = 0;
  for (const [y, c] of counts) if (c > n || (c === n && y > best)) { best = y; n = c; }
  return best;
}

export function undatedFiles(dir, items) {
  const cited = new Map();
  for (const it of items || []) {
    const key = suppliedFileKey(it && it.source_path);
    if (key && String((it && it.source_path) || '').trim()) (cited.get(key) || cited.set(key, []).get(key)).push(it);
  }
  const readAt = new Map();
  for (const f of suppliedFiles(dir)) {
    const key = suppliedFileKey(f.rel);
    if (!cited.has(key)) continue;
    if (CONVERTED.test(f.rel)) readAt.set(key, f.path);
    else if (READABLE.test(f.rel) && !readAt.has(key)) readAt.set(key, f.path);
  }
  const out = [];
  for (const [key, path] of readAt) {
    const its = cited.get(key);
    if (its.some(i => confirmedPeriod(i.period_confirmed))) continue;
    let text = '';
    try { text = readFileSync(path, 'utf8'); } catch { continue; }
    if (DATE_IN_TEXT_RE.test(key) || DATE_IN_TEXT_RE.test(text)) continue;
    out.push({ key, year: yearNamed(`${key}\n${text}`), refs: its.map(i => String(i.ref)) });
  }
  return out;
}

export function periodLines(list) {
  if (!list.length) return [];
  const w = Math.max(...list.map(e => `${e.key}: ${e.year}`.length));
  return ['',
    `**${list.length} file(s) carry no date**, as anonymised material often arrives. Nothing from ${list.length === 1 ? 'it' : 'them'} ` +
      'counts as dated until you confirm the period each comes from: a year, a quarter or a month, as in 2026, 2026-Q2 for ' +
      'the second quarter of 2026, or 2026-04.',
    ...list.map((e, i) => `  ${i + 1}. ${`${e.key}: ${e.year}`.padEnd(w)}   ${e.year ? '(the year the file names)' : '(the file names no year)'}`),
    `Confirm them with "${PERIOD_TASK}". Its first box holds "as listed", which takes the periods above as they stand; ` +
      `correct or complete a line by adding it after a semicolon, as in: as listed; ${list[0].key}: 2026-Q2. ` +
      'A file left without a period stays undated. Its second box is your name.'];
}

export function parsePeriods(box, listed, items) {
  const known = new Set((items || []).map(i => suppliedFileKey(i && i.source_path)).filter(Boolean));
  const set = new Map();
  for (const part of String(box ?? '').split(/[;\n]/).map(s => s.trim()).filter(Boolean)) {
    if (/^as listed$/i.test(part)) { for (const e of listed) if (e.year) set.set(e.key, e.year); continue; }
    const at = part.lastIndexOf(':');
    if (at < 0) return { error: `"${part}" is neither "as listed" nor a line of the form file: period, as in ${listed.length ? listed[0].key : 'notes.md'}: 2026-Q2` };
    const name = part.slice(0, at).trim(), period = part.slice(at + 1).trim();
    const key = /^\d+$/.test(name) && listed[Number(name) - 1] ? listed[Number(name) - 1].key : suppliedFileKey(name);
    if (!known.has(key))
      return { error: `"${name}" is not a file the problem material cites. The files it cites are: ${[...known].join(', ')}` };
    if (!period) { set.delete(key); continue; }
    if (!PERIOD_RE.test(period))
      return { error: `"${period}" for ${key} is not a period. A period is a year, a quarter or a month: ${PERIOD_FORMS}` };
    set.set(key, period);
  }
  return { set };
}

export function writePeriods(text, set, stamp) {
  const lines = text.split('\n');
  const end = String(lines[0] ?? '').trim() === '---' ? fenceAt(lines) : -1;
  let fm = null;
  try { fm = end > 0 ? frontmatter(text, OUT) : null; } catch { fm = null; }
  const items = Array.isArray(fm && fm.items) ? fm.items : [];
  const L = end > 0 ? itemLines(lines, end) : null;
  if (!fm || !L || L.starts.length !== items.length) return null;
  const edits = [], wrote = new Map();
  items.forEach((it, k) => {
    const key = suppliedFileKey(it && it.source_path);
    if (!key || !set.has(key)) return;
    const a = L.starts[k], z = L.starts[k + 1] ?? L.stop;
    const line = `${' '.repeat(L.field)}period_confirmed: ${JSON.stringify(`${stamp}: ${set.get(key)}`)}`;
    let at = -1;
    for (let i = a + 1; i < z; i++) if (/^\s*period_confirmed:/.test(lines[i])) { at = i; break; }
    if (at >= 0) edits.push([at, 1, line]);
    else { let last = z - 1; while (last > a && !lines[last].trim()) last--; edits.push([last + 1, 0, line]); }
    (wrote.get(key) || wrote.set(key, []).get(key)).push(String(it.ref));
  });
  for (const [at, n, line] of edits.sort((x, y) => y[0] - x[0])) lines.splice(at, n, line);
  return { text: lines.join('\n'), wrote };
}

export function periodRefusal(status, hasRecord) {
  if (!hasRecord)
    return 'there is no problem-material record yet, so there is no file to date.\n' +
      `        Put the files in ${STAGE}/${SUPPLIED_DIR}/ and run "SPOCK: read in the problem material" first.`;
  if (['pending', 'running', 'q_failed'].includes(status)) return null;
  const shown = { in_review: 'is waiting on a decision', refined: 'is in review, with changes', accepted: 'is accepted' }[status];
  if (shown)
    return `stage 2 ${shown}, so a person has already been shown what it holds, and a period changes which observations count underneath their decision.\n` +
      '        Send stage 2 back first with "SPOCK: send a stage back to be redone", then date the material, and the stage is written again with it.';
  return `stage 2 is "${status}", and material is dated only until stage 2 is put in front of a person: before it starts, while it runs, or after it fails its check.`;
}

const argv = process.argv.slice(2);
const write = argv.includes('--write');
const measure = argv.includes('--measure');
const typedAt = argv.indexOf('--typed');
const typed = typedAt === -1 ? undefined : String(argv[typedAt + 1] ?? '');
const valueAt = flag => { const i = argv.indexOf(flag); return i === -1 ? -1 : i + 1; };
const fromChatAt = valueAt('--from-chat'), byAt = valueAt('--by');
const confirmAt = valueAt('--confirm');
const confirm = confirmAt === -1 ? undefined : String(argv[confirmAt] ?? '').trim();
const fromChat = fromChatAt === -1 ? null : String(argv[fromChatAt] ?? '').trim();
const by = byAt === -1 ? '' : String(argv[byAt] ?? '').trim();
const periodsAt = valueAt('--periods');
const periodsBox = periodsAt === -1 ? undefined : String(argv[periodsAt] ?? '');
const periodsBy = by;
const add = argv.includes('--add') || typedAt !== -1;
const runId = argv.find((a, i) => !a.startsWith('-') && !(typedAt !== -1 && i === typedAt + 1) && i !== fromChatAt && i !== byAt && i !== periodsAt && i !== confirmAt);
if (!runId) die('usage: problem-material.mjs <run_id> [--write | --measure | --add [--typed "<words>" | --from-chat <file> --by "<name>"] | --periods "<box>" --by "<name>"]');

const dir = join(RUNS_ROOT, runId);
if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`${dir} has no RUN-STATE.md`);
{ const stopped = stoppedRun(dir); if (stopped) { console.log(`\n${stopped}\n`); process.exit(3); } }

const out = join(dir, STAGE, OUT);

if (periodsBox !== undefined) {
  let status = 'missing';
  try {
    const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
    const s2 = ((state && state.stages) || []).find(s => String(s.id) === '2');
    if (s2) status = String(s2.status);
  } catch (e) { die(`the run record could not be read, so no period was recorded: ${String(e.message).split('\n')[0]}`); }
  const refused = periodRefusal(status, existsSync(out));
  if (refused) refuse(`${refused}\n        Nothing you typed was recorded.`);
  if (!periodsBy)
    refuse('nothing was typed in the name box, so no period was recorded. A period is recorded as the statement of the person who gave it, under their name.');
  const text = readFileSync(out, 'utf8');
  let items;
  try { items = frontmatter(text, OUT).items || []; } catch (e) { die(`${STAGE}/${OUT} could not be read, so no period was recorded: ${String(e.message).split('\n')[0]}`); }
  const listed = undatedFiles(dir, items);
  const read = parsePeriods(periodsBox, listed, items);
  if (read.error) refuse(`${read.error}.\n        Nothing you typed was recorded; run the task again with the line corrected.`);
  if (!read.set.size)
    refuse('no file was given a period, so nothing was recorded and ' +
      (listed.length ? `${listed.map(e => e.key).join(', ')} ${listed.length === 1 ? 'stays' : 'stay'} undated.` : 'every file stays as it is.'));
  const stamp = `${periodsBy}, ${today()}`;
  const w = writePeriods(text, read.set, stamp);
  if (!w) die(`${STAGE}/${OUT} could not be read as a list of items, so no period was recorded.`);
  writeFileSync(out, w.text);
  console.log(`${runId} — recorded the period ${w.wrote.size === 1 ? 'one file comes' : `${w.wrote.size} files come`} from on ${STAGE}/${OUT}, as the statement of ${periodsBy}, ${shownDate(today())}:`);
  for (const [key, refs] of w.wrote) console.log(`  ${key}: ${read.set.get(key)}   on ${refs.join(', ')}`);
  const left = listed.filter(e => !read.set.has(e.key)).map(e => e.key);
  if (left.length) console.log(`\nNo period was given for ${left.join(', ')}, so ${left.length === 1 ? 'it stays' : 'they stay'} undated.`);
  console.log('\nIntake dates each observation from these files by its period, as in observed_at: ' +
    `${[...read.set.values()][0]}, and marks it complete where the rest of its provenance is.` +
    '\nA file with no period stays undated, and its observations stay incomplete.');
  process.exit(0);
}

if (measure) {
  if (!existsSync(out)) {
    console.log(`${runId} — there is no problem-material record yet, so there is nothing to measure.`);
    process.exit(0);
  }
  const m = measureItems(readFileSync(out, 'utf8'), dir);
  if (m.unread) die(`${STAGE}/${OUT} could not be measured: ${m.unread}. Nothing was written.`);
  if (!m.filled.length) {
    console.log(`${runId} — every item on ${STAGE}/${OUT} that cites a supplied file carries its measurement.`);
    process.exit(0);
  }
  writeFileSync(out, m.text);
  console.log(`${runId} — measured ${m.filled.length} item(s) on ${STAGE}/${OUT} that cite a supplied file and carried no measurement:`);
  for (const f of m.filled)
    console.log(`  ${f.ref}  ${String(f.bytes).padStart(9)} bytes  ${f.sha256}  ${f.source_path}  (from ${f.from})`);
  process.exit(0);
}

if (add) {
  let status = 'missing';
  try {
    const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
    const s2 = ((state && state.stages) || []).find(s => String(s.id) === '2');
    if (s2) status = String(s2.status);
  } catch (e) { die(`the run record could not be read, so nothing was added: ${String(e.message).split('\n')[0]}`); }
  const refused = addRefusal(status, existsSync(out));
  if (refused) refuse(refused + (typed === undefined ? '' : '\n        Nothing you typed was written.'));
  const text = readFileSync(out, 'utf8');
  if (!appendItems(text, []))
    die(`${STAGE}/${OUT} could not be read as a list of items, so nothing was added` +
        (typed === undefined ? '.' : ' and nothing you typed was written.'));
  const date = today();
  let typedRel = null;
  if (typed !== undefined) {
    const words = typed.trim();
    if (!words) refuse('nothing was typed, so nothing was written and nothing was added.');
    const sup = join(dir, STAGE, SUPPLIED_DIR);
    mkdirSync(sup, { recursive: true });
    const name = freeName(sup, 'typed', date);
    writeFileSync(join(sup, name), words + '\n');
    typedRel = `${SUPPLIED_DIR}/${name}`;
  }
  const changes = materialChanges(dir, frontmatter(text, OUT).items || []);
  const takesChanges = typed === undefined && !fromChat;
  const retire = takesChanges ? changes.changed.length + changes.moved.length + changes.removed.length + changes.follows.length : 0;
  const fresh = changes.new;
  if (!fresh.length && !retire)
    refuse(`every file in ${STAGE}/${SUPPLIED_DIR}/ is already on the record, so there is nothing to add.\n` +
        '        Put the new files in that folder first, then run this again.');
  const listing = ['What changed in the supplied material since it was read in:', ...changeLines({ ...changes, ...(takesChanges ? {} : { changed: [], moved: [], removed: [], follows: [] }) })];
  if (confirm !== undefined && confirm !== CONFIRM_YES)
    refuse(`${listing.join('\n')}\n        You answered "${confirm}" in the box, so nothing was recorded, and the record still reads the material as it was read in.\n` +
      '        Where the change should stand, run "SPOCK: add problem material" again and confirm it; to undo it instead, put back the version the record names.');
  if (retire && confirm === undefined)
    refuse(`${listing.join('\n')}\n        A change to material already read in is taken in only on the person's confirmation, so nothing was recorded.\n` +
      '        The person runs "SPOCK: add problem material", which asks them to confirm and takes every change in at once.');
  const stamps = new Map();
  const stamp = (ref, kv) => { if (!stamps.has(ref)) stamps.set(ref, []); stamps.get(ref).push(...kv); };
  const reconvert = [];
  if (retire) {
    for (const x of changes.follows) {
      const moved = supersedeFile(dir, `${STAGE}/${x.copy}`, { by: 'SPOCK: add problem material',
        reason: `${x.original} ${x.how === 'changed' ? 'changed, so its text copy is converted again' : x.how === 'moved' ? 'was moved to superseded/' : 'was removed'}, and the copy goes with it` });
      const keptAs = `superseded/${moved.name}`, m = measureFile(join(dir, keptAs));
      for (const ref of x.refs) stamp(ref, [['superseded_at', date], ['kept_as', keptAs], ['kept_sha256', m ? m.sha256 : '']]);
      if (x.how === 'changed') reconvert.push(x);
    }
    for (const x of changes.moved) for (const ref of x.refs) stamp(ref, [['superseded_at', date], ['kept_as', x.keptAs]]);
    for (const x of changes.removed) for (const ref of x.refs) stamp(ref, [['removed_at', date]]);
  }
  const converted = reconvert.length ? convert(dir, { only: reconvert.map(x => x.original) }) : { failed: [] };
  const entries = [
    ...fresh.map(f => ({ ...f, ...(conversationOf(f.rel, f.rel === fromChat ? by : '') || {}), ...(f.rel === typedRel ? { form: 'text' } : {}), added_at: date })),
    ...(retire ? changes.changed.map(x => ({ rel: x.path, bytes: x.now.bytes, sha256: x.now.sha256, replaces: x.refs.join(', '), added_at: date })) : []),
    ...reconvert.filter(x => existsSync(join(dir, STAGE, x.copy))).map(x => {
      const m = measureFile(join(dir, STAGE, x.copy)) || {};
      return { rel: x.copy, bytes: m.bytes, sha256: m.sha256, ...(x.refs.length ? { replaces: x.refs.join(', ') } : {}), added_at: date };
    }),
  ];
  const appended = entries.length ? appendItems(text, entries, date) : { text, added: [] };
  for (const it of appended.added)
    if (it.replaces) for (const ref of String(it.replaces).split(', ')) {
      const was = stamps.get(ref);
      if (!was || !was.some(([k]) => k === 'superseded_at')) stamp(ref, [['superseded_at', date]]);
      stamp(ref, [['replaced_by', it.ref]]);
    }
  const stamped = stamps.size ? stampItems(appended.text, stamps) : appended.text;
  if (stamped === null) die(`${STAGE}/${OUT} could not be read as a list of items, so nothing was recorded.`);
  const measured = measureItems(stamped, dir);
  writeFileSync(out, measured.text);
  if (retire) {
    console.log(`${runId} — took in every change on ${STAGE}/${OUT}, as you confirmed. Nothing was renumbered, reordered or deleted from the record:`);
    for (const l of changeLines(changes)) console.log(l);
    for (const x of changes.moved) console.log(`  ${x.refs.join(', ')} ${x.refs.length === 1 ? 'is' : 'are'} kept as ${x.keptAs}, and no longer in use.`);
    for (const x of changes.removed) console.log(`  ${x.refs.join(', ')} ${x.refs.length === 1 ? 'was' : 'were'} removed on ${shownDate(date)}, and ${x.refs.length === 1 ? 'is' : 'are'} no longer in use; the fingerprint stays on the record.`);
    for (const f of converted.failed) console.log(`  ! ${f.rel} changed and would not convert again: ${f.why}`);
    console.log('');
  }
  console.log(`${runId} — added ${appended.added.length} item(s) to ${STAGE}/${OUT}, numbered on from the last. Nothing already on it was renumbered:`);
  for (const it of appended.added) console.log(`  ${it.ref}  ${it.form.padEnd(10)} ${it.source_path}${it.replaces ? `, replacing ${it.replaces}` : ''}`);
  if (retire) console.log('\nThe agent reads each new version and replaces what it drew from a replaced or removed one: the checks name every observation and problem statement still resting on one.');
  if (typedRel) console.log(`\nWhat you typed is in ${STAGE}/${typedRel}, exactly as you typed it.`);
  console.log('\n**What the run now holds for each, to check against your own copies where you have one.**');
  for (const it of appended.added)
    console.log(`  ${String(it.bytes ?? '?').padStart(9)} bytes  ${it.sha256 || '(unreadable)'}  ${it.source_path}`);
  console.log('\n  Each line is that file\'s fingerprint: the same file gives the same one, and one changed byte changes it.');
  if (measured.filled.length)
    console.log(`\nAlso measured ${measured.filled.length} item(s) that cite a supplied file and carried no measurement: ${measured.filled.map(f => f.ref).join(', ')}.`);
  const told = appended.added.filter(it => it.provenance);
  console.log(told.length === appended.added.length
    ? `\n**\`provenance\` on ${told.length === 1 ? 'the new item says' : 'each new item says'} how it came from the conversation, and intake adds its own reading beside it.** Intake reads the new material next,` +
      '\nadds items and observations for it numbered on from the last, and renumbers nothing already on the record.'
    : '\n**`provenance` is empty on each new item and intake fills it in.** Intake reads the new material next,' +
      '\nadds items and observations for it numbered on from the last, and renumbers nothing already on the record.' +
      (told.length ? `\n${told.map(it => it.ref).join(', ')} came from the conversation, and ${told.length === 1 ? 'its' : 'their'} provenance says how.` : ''));
  console.log(RESEARCH_LINE);
  let recorded = [];
  try { recorded = frontmatter(measured.text, OUT).items || []; } catch { recorded = []; }
  for (const l of periodLines(undatedFiles(dir, recorded))) console.log(l);
  process.exit(0);
}

if (existsSync(out))
  die(`${STAGE}/${OUT} already exists and this never overwrites it.\n` +
      '        That file is the one artifact a customer wrote. Withdraw it deliberately if it is wrong.\n' +
      '        Material that arrived since goes in the supplied folder and is added with "SPOCK: add problem material".');

const loose = then => looseFiles(dir).map(f => `${STAGE}/${f.rel} is material sitting loose in the stage folder, outside ${SUPPLIED_DIR}/, ` +
  `so it is not read in. If it is material you meant to supply, move it into ${STAGE}/${SUPPLIED_DIR}/ (drag it there in the ` +
  `Explorer), then ${then}. Nothing here moves it for you, because only you know whether it is material.`);
const items = itemsFrom(dir);
if (!items.length)
  die(`nothing in ${STAGE}/${SUPPLIED_DIR}/ — put the problem material there first, as files, and run this again.\n` +
      '        This stage does not start without it, and it is the one thing the workflow cannot produce for you.' +
      loose('run this task again').map(l => `\n${l}`).join(''));

const text = render(runId, items, today(), runLanguage(dir));
if (write) {
  writeFileSync(out, text);
  console.log(`${runId} — wrote ${STAGE}/${OUT} with ${items.length} item(s), one per supplied file:`);
  for (const it of items) console.log(`  ${it.ref}  ${it.form.padEnd(10)} ${it.source_path}`);
  console.log('\n**Check these against your own copies before the run goes further.** Each line is what the' +
              '\nrun now holds; you are the only one who still has the original.');
  for (const it of items)
    console.log(`  ${String(it.bytes ?? '?').padStart(9)} bytes  ${it.sha256 || '(unreadable)'}  ${it.source_path}`);
  console.log('\n  Each line is that file\'s fingerprint: the same file gives the same one, and one changed byte changes it.');
  console.log('\n**`provenance` is empty on every item and intake fills it in.** A file holding several' +
              '\ndistinct pieces of material gets an item each, added by intake, numbered on from the last.');
  const told = items.filter(it => it.provenance);
  if (told.length)
    console.log(`${told.map(it => it.ref).join(', ')} came from the conversation, and ${told.length === 1 ? 'its' : 'their'} provenance already says how.`);
  console.log(RESEARCH_LINE);
  for (const l of periodLines(undatedFiles(dir, items))) console.log(l);
  for (const l of loose('run "SPOCK: add problem material"')) console.log(`\n${l}`);
} else {
  console.log(text);
  console.log('Run again with --write.');
}

#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { frontmatter } from './yaml.mjs';
import { stoppedLine } from './gates.mjs';

export function stoppedRun(dir) {
  let state;
  try { state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'); } catch { return ''; }
  return stoppedLine(basename(resolve(dir)), state);
}

export const unixText = s => String(s).replace(/^\ufeff/, '').replace(/\r\n/g, '\n');
export const readText = p => (existsSync(p) ? unixText(readFileSync(p, 'utf8')) : '');

export const STAGE_DIRS = [
  '1-brief',
  '2-problems',
  '3-competitive-analysis',
  '4-solutions',
  '5-mvp',
  '6-prd',
  '7-initiative',
];

export const RETAINED_DIRS = ['notes', 'superseded', 'traces', 'read', 'parts', 'supplied', 'briefs'];

export const SUPPLIED_DIR = 'supplied';
export const KEEP_FILE = '.keep';
export const KEEP_TEXT = 'This file keeps the folder when the run is copied. Put your material beside it; SPOCK does not read this file.\n' +
  'Tento soubor drží složku při kopírování běhu. Materiál dejte vedle něj; SPOCK tento soubor nečte.\n';
export const handOverLine = root => `If you took over a colleague's run, move your own unfinished run out of ${root}/, then run ` +
  'this task again: right-click its folder in the Explorer, choose Reveal in Finder (Reveal in File Explorer on Windows), and ' +
  'move the folder from there to a folder outside this workspace.';
export const twoRunsRefusal = (open, root) => `${open.length} runs are unfinished, so this task cannot tell which one you mean:\n` +
  open.map(d => `  ${runIdOf(d)}`).join('\n') + `\n${handOverLine(root)}`;

export const RECORDS_DIR = 'records';

export const RECORD_FILES = ['RUN-STATE.md', 'README.md', 'sources.md'];

export const RETIRED_VIEWS = ['solutions-with-scores.md'];

export const EXPECTED_TO_DIFFER = new Set([
  'artifact_id', 'status', 'produced_at', 'revisions', 'sources', 'modified_by',
  'created_at',
  'agreement_block',
  'decision',
  'assembled_at', 'assembled_from',
]);

export const ENVELOPE_DERIVED = new Set(['could_not_verify', 'external_sources', 'run_id', 'ost_role', 'workflow',
                                         'produced_by', 'bounds_hit', 'trace_id', 'record_id', 'item_id', 'ideas']);

const ID_RE = /^artifact_id:\s*["']?([A-Za-z0-9]+)["']?\s*$/m;

export const FILL = '[[fill:';
export const isFrame = text => String(text == null ? '' : text).includes(FILL);
export function framePlaces(text) {
  const lines = String(text == null ? '' : text).split(/\r?\n/);
  let count = 0, first = null;
  lines.forEach((l, i) => { const n = l.split(FILL).length - 1; if (n) { count += n; if (first === null) first = i + 1; } });
  return { count, first };
}

export function declaredId(abs) {
  return declaredIdIn(readFileSync(abs, 'utf8'));
}

export function declaredIdIn(text) {
  const m = String(text == null ? '' : text).slice(0, 4096).match(ID_RE);
  return m ? m[1] : null;
}

export function runArtifacts(dir, { frames = false } = {}) {
  const out = [];
  const seen = new Set();

  const take = (stage, sub) => {
    const base = sub ? join(dir, sub) : dir;
    if (!existsSync(base) || !statSync(base).isDirectory()) return;
    for (const f of readdirSync(base).filter(n => n.endsWith('.md')).sort()) {
      if (!sub && RECORD_FILES.includes(f)) continue;
      if (RETIRED_VIEWS.includes(f)) continue;
      const abs = join(base, f);
      if (!statSync(abs).isFile()) continue;
      const rel = sub ? `${sub}/${f}` : f;
      if (seen.has(rel)) continue;
      seen.add(rel);
      const text = readFileSync(abs, 'utf8');
      const frame = isFrame(text);
      if (frame && !frames) continue;
      out.push({ id: declaredIdIn(text), rel, abs, stage, ...(frame ? { frame: true } : {}) });
    }
  };

  STAGE_DIRS.forEach((d, i) => take(i + 1, d));
  take(null, null);
  return out;
}

export function artifact(dir, id) {
  return runArtifacts(dir).find(a => a.id === id) || null;
}

export function duplicateIds(dir) {
  const byId = new Map();
  for (const a of runArtifacts(dir)) {
    if (!a.id) continue;
    if (!byId.has(a.id)) byId.set(a.id, []);
    byId.get(a.id).push(a.rel);
  }
  return [...byId].filter(([, rels]) => rels.length > 1).map(([id, rels]) => ({ id, rels }));
}

export const duplicateLine = ({ id, rels }) =>
  `${rels.length === 2 ? 'Two' : rels.length} files declare ${id}: ${rels.slice(0, -1).join(', ')} and ${rels[rels.length - 1]}. ` +
  'Take back the one that is not the document with SPOCK: take something back, then run this again.';

const RECORD_ID_RE = /^record_id:\s*["']?([A-Za-z0-9-]+)["']?\s*$/m;

export const RECORD_SUFFIX = '.record.md';

export function recordNumber(name) {
  const m = /-r(\d+)(?:-|\.)/.exec(String(name));
  return m ? m[1] : null;
}

export function recordName(artifactId, nn, slug) {
  return `${artifactId}-r${String(nn).padStart(2, '0')}${slug ? `-${slug}` : ''}${RECORD_SUFFIX}`;
}

export function nextRecordNumber(dir, artifactId) {
  const used = recordsFor(dir, artifactId, { frames: true })
    .map(r => recordNumber(r.rel.split('/').pop()))
    .filter(Boolean)
    .map(Number);
  return String((used.length ? Math.max(...used) : 0) + 1).padStart(2, '0');
}

export function runRecords(dir, { frames = false } = {}) {
  const out = [];
  const root = join(dir, RECORDS_DIR);
  if (!existsSync(root) || !statSync(root).isDirectory()) return out;

  const take = (stage, sub) => {
    const base = join(root, sub);
    if (!existsSync(base) || !statSync(base).isDirectory()) return;
    for (const f of readdirSync(base).filter(n => n.endsWith('.md')).sort()) {
      const abs = join(base, f);
      if (!statSync(abs).isFile()) continue;
      const text = readFileSync(abs, 'utf8');
      const frame = isFrame(text);
      if (frame && !frames) continue;
      const head = text.slice(0, 4096);
      const rid = head.match(RECORD_ID_RE);
      out.push({
        recordId: rid ? rid[1] : null,
        id: declaredIdIn(text),
        rel: `${RECORDS_DIR}/${sub}/${f}`,
        abs,
        stage,
        ...(frame ? { frame: true } : {}),
      });
    }
  };

  STAGE_DIRS.forEach((d, i) => take(i + 1, d));
  return out;
}

export function recordsFor(dir, artifactId, opts = {}) {
  return runRecords(dir, opts).filter(r => r.id === artifactId);
}

export function strayRecordFiles(dir, stageDir) {
  const base = join(dir, RECORDS_DIR, stageDir);
  if (!existsSync(base) || !statSync(base).isDirectory()) return [];
  return readdirSync(base)
    .filter(n => !n.startsWith('.') && !n.endsWith(RECORD_SUFFIX) && statSync(join(base, n)).isFile())
    .sort();
}

export function strayArtifact(name, ids = []) {
  return [...String(name).matchAll(/A\d+[a-z]?/g)].map(m => m[0]).find(id => !ids.length || ids.includes(id)) || null;
}

const listOf = files => (files.length === 1 ? files[0] : `${files.slice(0, -1).join(', ')} and ${files[files.length - 1]}`);

export function strayBesideLine(stageDir, files, named) {
  const one = files.length === 1;
  return `\`${RECORDS_DIR}/${stageDir}/\` holds ${listOf(files)}, which ${one ? 'is' : 'are'} not named as ${one ? 'a record' : 'records'}, ` +
    `so nothing reads ${one ? 'it' : 'them'}. The record is already there as \`${named}\`, so all that is left is for a person to ` +
    `take ${one ? 'it' : 'them'} back with "SPOCK: take something back"`;
}

export function strayRecordsLine(stageDir, files, artifactId, slug = '<what>', nn = 1) {
  const list = listOf(files);
  const one = files.length === 1;
  return `\`${RECORDS_DIR}/${stageDir}/\` holds ${list}, which ${one ? 'is' : 'are'} not named as ${one ? 'a record' : 'records'}, ` +
    `so nothing reads ${one ? 'it' : 'them'}. A record is named \`${recordName(artifactId || '<ID>', nn, slug)}\`: write it under ` +
    `that name. The misnamed file${one ? ' stays' : 's stay'} until a person takes ${one ? 'it' : 'them'} back with "SPOCK: take something back"`;
}

export function runLanguageInfo(dir) {
  const files = [...runArtifacts(dir).filter(a => a.id === 'A1').map(a => a.abs), ...recordsFor(dir, 'A1').map(r => r.abs)];
  for (const f of files) {
    const fm = (/^\ufeff?---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(f, 'utf8')) || [])[1] || '';
    const m = fm.match(/^language:\s*["']?([^"'\s#]*)["']?\s*(?:#.*)?$/m);
    if (m && m[1]) return { lang: m[1].toLowerCase(), declared: true };
  }
  return { lang: 'en', declared: false };
}

export function runLanguage(dir) {
  return runLanguageInfo(dir).lang;
}

export const LANGUAGE_LINE = {
  cs: 'Jazyk tohoto běhu je čeština: mluvte s člověkem česky. Zprávu vytištěnou mezi „Message to send“ a „End of message“ pošlete tak, jak je; zbytek výstupu úlohy mu vysvětlete česky vlastními slovy, nevkládejte ho.',
  en: 'This run\'s language is English: speak to the person in English. Send a message printed between "Message to send" and "End of message" as it stands; explain the rest of the task output in your own words rather than pasting it.',
};
export function languageLine(dir) {
  try {
    if (!runArtifacts(dir).some(a => a.id === 'A1') && !recordsFor(dir, 'A1').length) return null;
    return LANGUAGE_LINE[runLanguageInfo(dir).lang] || null;
  } catch { return null; }
}

export function runParts(dir, { frames = false } = {}) {
  const parts = [];
  for (const st of STAGE_DIRS) {
    const base = join(dir, st, 'parts');
    if (!existsSync(base) || !statSync(base).isDirectory()) continue;
    for (const f of readdirSync(base).filter(x => x.endsWith('.md') && !x.endsWith('.answers.md'))) {
      const frame = isFrame(readFileSync(join(base, f), 'utf8'));
      if (frame && !frames) continue;
      parts.push({ rel: `${st}/parts/${f}`, abs: join(base, f), ...(frame ? { frame: true } : {}) });
    }
  }
  return parts;
}

export function strandedPart(part, fm, carries) {
  const target = fm && fm.part_of ? String(fm.part_of).trim() : '';
  if (!target) return `${part.rel} names no part_of — a part that does not say which artifact it was assembled into cannot be compared with one`;
  if (!carries(target)) return `${part.rel} names part_of ${target}, which this run does not carry`;
  return null;
}

export function strandedRecord(record, carries) {
  const id = record && record.id ? String(record.id) : '';
  if (!id || carries(id)) return null;
  return `${record.rel} names artifact_id ${id}, which this run does not carry`;
}

export const IN_FLIGHT = ['running', 'produced', 'q_failed', 'in_review', 'refined'];

export const HOLDS_ITS_RESULT = ['accepted', 'stale'];

export function stageStatuses(dir) {
  let state;
  try { state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'); } catch { return new Map(); }
  return new Map(((state && Array.isArray(state.stages)) ? state.stages : []).map(s => [Number(s.id), String(s.status || '')]));
}

export const SUPPLIED_STAYS = 'the material you supplied, which the gates read and nothing here takes back';
export const NOT_A_DOCUMENT_STAYS = 'not a .md document, so a folder does not take it back; its own path in the file box does';

export function folderTakeBack(dir, folder) {
  const seg = String(folder == null ? '' : folder).replace(/\\/g, '/').split('/').filter(s => s && s !== '.');
  if (seg.includes('..')) return null;
  const stageDir = STAGE_DIRS.includes(seg[0]) ? seg[0]
    : seg[0] === RECORDS_DIR && STAGE_DIRS.includes(seg[1]) ? seg[1] : null;
  if (!stageDir) return null;
  const isDir = rel => existsSync(join(dir, rel)) && statSync(join(dir, rel)).isDirectory();
  const roots = (seg.length === 1 ? [stageDir, `${RECORDS_DIR}/${stageDir}`] : [seg.join('/')]).filter(isDir);
  if (!roots.length) return null;
  const files = [], stays = [];
  const walk = rel => {
    for (const e of readdirSync(join(dir, rel), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (e.name.startsWith('.')) continue;
      const r = `${rel}/${e.name}`;
      if (e.isDirectory()) walk(r);
      else if (r.split('/').includes(SUPPLIED_DIR)) stays.push({ rel: r, why: SUPPLIED_STAYS });
      else if (e.name.endsWith('.md')) files.push(r);
      else stays.push({ rel: r, why: NOT_A_DOCUMENT_STAYS });
    }
  };
  roots.forEach(walk);
  return { folder: seg.join('/'), stage: STAGE_DIRS.indexOf(stageDir) + 1, stageDir, files, stays };
}

export const takeBackTyped = (folder, n) => `${folder} (${n} file${n === 1 ? '' : 's'})`;
export function readTakeBackTyped(typed) {
  const m = /^(.*\S)\s*\((\d+)\s+files?\)\s*$/.exec(String(typed == null ? '' : typed));
  return m ? { folder: m[1].replace(/\/+$/, ''), count: Number(m[2]) } : null;
}

export function takeBackListing(t) {
  return [...t.files.map(f => `          ${f}`),
          ...(t.stays.length ? ['        These stay:', ...t.stays.map(s => `          ${s.rel}: ${s.why}`)] : [])];
}

export function withdrawalStamp(text) {
  const m = /^<!--[ \t]*WITHDRAWN[ \t]+(\d{4}-\d{2}-\d{2})[ \t]+from[ \t]+(\S+)[ \t]+by[ \t]+([^\n]*?)[ \t]*\n([\s\S]*?)-->/
    .exec(String(text == null ? '' : text));
  if (!m) return null;
  const body = m[4].split('\n').map(l => l.trim()).filter(Boolean);
  const stop = body.findIndex(l => /^(Found stranded:|Kept rather than deleted:)/.test(l));
  const found = body.find(l => /^Found stranded:/.test(l));
  return { at: m[1], from: m[2], by: m[3].trim(), reason: (stop === -1 ? body : body.slice(0, stop)).join(' ').trim(),
           stranded: found ? found.replace(/^Found stranded:\s*/, '') || 'found stranded' : null };
}

export function superseded(dir) {
  const base = join(dir, 'superseded');
  if (!existsSync(base)) return [];
  return readdirSync(base).filter(f => f.endsWith('.md')).sort().map(f => {
    const abs = join(base, f);
    let stamp = null;
    try { stamp = withdrawalStamp(readFileSync(abs, 'utf8')); } catch { stamp = null; }
    return { rel: `superseded/${f}`, abs, stamp };
  });
}

export const RUN_ID_RE = /^\d{4}-\d{2}-/;

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const CALLER_CWD = process.cwd();
if (process.cwd() !== REPO_ROOT) process.chdir(REPO_ROOT);

const runsRootFile = () => {
  try { return readFileSync(join('.github', 'runs-root'), 'utf8').trim() || null; } catch { return null; }
};

export const RUNS_ROOT =
  process.env.SPOCK_RUNS_TEST_OVERRIDE || runsRootFile() || process.env.SPOCK_RUNS || 'fixtures';

if (process.env.SPOCK_RUNS && !process.env.SPOCK_RUNS_TEST_OVERRIDE && runsRootFile())
  console.error(`note: SPOCK_RUNS is set to "${process.env.SPOCK_RUNS}" and is ignored — ` +
    `.github/runs-root says "${runsRootFile()}", and the file is the setting both a person and an agent read.`);

export const FIXTURES_ROOT = 'fixtures';

export const runIdOf = p => String(p).replace(/[\\/]+$/, '').split(/[\\/]/).pop() || '';

export function runDirs(root = RUNS_ROOT) {
  if (!existsSync(root)) return [];
  return readdirSync(root)
    .filter(d => RUN_ID_RE.test(d) && existsSync(join(root, d, 'RUN-STATE.md')))
    .sort()
    .map(d => join(root, d));
}

export function openRuns(root = RUNS_ROOT) {
  return runDirs(root).filter(d => {
    try {
      const st = frontmatter(readFileSync(join(d, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
      if (st.status === 'abandoned') return false;
      return (st.stages || []).some(s => s.status !== 'accepted');
    } catch { return false; }
  });
}

export function noOpenRunLine(root = RUNS_ROOT) {
  const done = runDirs(root).map(d => {
    try {
      const st = frontmatter(readFileSync(join(d, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
      const stages = st.stages || [];
      return { id: runIdOf(d), stopped: st.status === 'abandoned',
               complete: stages.length > 0 && stages.every(s => s.status === 'accepted'), n: stages.length };
    } catch { return null; }
  }).filter(r => r && (r.stopped || r.complete));
  if (!done.length) return null;
  const said = r => (r.stopped ? `${r.id} was stopped` : `${r.id} is complete: all ${r.n} stages are accepted`);
  return done.length === 1 ? `${said(done[0])}, and no run is unfinished`
    : `No run is unfinished. ${done.map(said).join('. ')}`;
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const dir = process.argv[2];
  if (!dir) { console.error('usage: node .github/scripts/run-files.mjs {runs_root}/<run_id>'); process.exit(2); }
  for (const a of runArtifacts(dir)) console.log(`${String(a.id || '??').padEnd(5)} ${a.rel}`);
  for (const s of superseded(dir)) console.log(`${'—'.padEnd(5)} ${s.rel}`);
  for (const r of runRecords(dir)) console.log(`${String(r.recordId || '??').padEnd(9)} ${r.rel}`);
}

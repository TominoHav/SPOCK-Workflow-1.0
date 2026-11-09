export const PRD_TEMPLATE = [
  { id: 'overview',         level: 2, heading: 'Overview',                    cs: 'Přehled' },
  { id: 'problem',          level: 2, heading: 'Problem',                     cs: 'Problém' },
  { id: 'users',            level: 2, heading: 'Users',                       cs: 'Uživatelé' },
  { id: 'success_measures', level: 2, heading: 'Success measures',            cs: 'Měřítka úspěchu' },
  { id: 'requirements',     level: 2, heading: 'Requirements',                cs: 'Požadavky' },
  { id: 'non_functional',   level: 2, heading: 'Non-functional requirements', cs: 'Nefunkční požadavky' },
  { id: 'out_of_scope',     level: 2, heading: 'Out of scope',                cs: 'Mimo rozsah' },
  { id: 'dependencies',     level: 2, heading: 'Dependencies',                cs: 'Závislosti' },
];

export const PRD_SECTIONS = PRD_TEMPLATE.map(s => s.id);

const STATES = ['present', 'not_applicable'];

export function sectionCoverage(sections, required = PRD_SECTIONS) {
  const list = Array.isArray(sections) ? sections.filter(s => s && typeof s === 'object') : [];
  const byId = new Map();
  for (const s of list) {
    const id = String(s.id || '').trim();
    if (id) byId.set(id, s);
  }

  const missing = required.filter(id => !byId.has(id));
  const unknown = [...byId.keys()].filter(id => !required.includes(id));

  const bad_status = [];
  const unreasoned = [];
  for (const id of required) {
    const s = byId.get(id);
    if (!s) continue;
    const status = String(s.status || '').trim();
    if (!STATES.includes(status)) { bad_status.push(id); continue; }
    if (status === 'not_applicable' && String(s.reason || '').trim() === '') unreasoned.push(id);
  }

  return { missing, unreasoned, unknown, bad_status };
}

export function coversTemplate(result) {
  return result.missing.length === 0 && result.unreasoned.length === 0
    && result.unknown.length === 0 && result.bad_status.length === 0;
}

export const DRAFT_WORDS = ['draft', 'návrh'];
export const AGREED_WORDS = {
  en: w => `This is the agreed version. ${w.by} agreed the draft on ${w.at}, and this document is that draft word for word, with the agreement added.`,
  cs: w => `Toto je odsouhlasená verze. Souhlas s návrhem: ${w.by}, ${w.at}. Dokument je tento návrh doslovně, s doplněným souhlasem.`,
};

const FRONT = /^\ufeff?---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
export function splitPrd(text) {
  const m = FRONT.exec(String(text));
  return m ? { fm: m[1].split(/\r?\n/), body: String(text).slice(m[0].length) } : null;
}

export const AGREED_WRITTEN_FROM = '2026-09-17';
export const AGREEMENT_SECTION_FROM = '2026-09-17';

const agreementSection = line => {
  const h = /^\s{0,3}#{1,6}\s+(.*?)\s*#*\s*$/.exec(line);
  return Boolean(h) && /^(?:\d+(?:\.\d+)*[.)]?\s+)?[*_`]*\s*(?:agreement|souhlas)\s*[*_`]*\s*:?$/i.test(h[1]);
};

export function draftAgreementFindings(text, { assembled = '', block = null } = {}) {
  const found = [];
  if (block && ((block.name && String(block.name).trim() !== '') || (block.date && String(block.date).trim() !== '')))
    found.push({ kind: 'signed' });
  const day = String(assembled || '');
  if (!(day >= AGREED_WRITTEN_FROM || day >= AGREEMENT_SECTION_FROM)) return found;
  const all = String(text);
  const body = (splitPrd(all) || { body: all }).body;
  const offset = all.slice(0, all.length - body.length).split('\n').length - 1;
  body.split('\n').forEach((line, i) => {
    const said = (line.trim().length > 120 ? `${line.trim().slice(0, 119)}…` : line.trim()).replace(/; /g, ', ');
    if (day >= AGREED_WRITTEN_FROM && /agreement[ _]block|blok souhlasu/i.test(line)) { found.push({ kind: 'block', line: offset + i + 1, said }); return; }
    if (day >= AGREEMENT_SECTION_FROM && agreementSection(line)) found.push({ kind: 'section', line: offset + i + 1, said });
  });
  return found;
}

export function draftFindingProblem(file, f) {
  if (f.kind === 'signed') return 'A12 is the draft but its agreement block is already signed — a draft carries no mark';
  const carried = 'The agreed PRD is this draft word for word and says who agreed it in a paragraph the workflow writes, so this ';
  if (f.kind === 'block')
    return `${file} line ${f.line} describes the draft's own agreement block ("${f.said}"). ` + carried +
      'sentence would be carried into it. Remove it from the draft. Where the draft is already agreed, the person then marks it agreed again';
  return `${file} line ${f.line} opens a section for the draft's own agreement ("${f.said}"). ` + carried +
    'section would be carried into it with its blanks. Remove the section from the draft. Where the draft is already agreed, the person then marks it agreed again';
}

export function draftFindingChange(file, f) {
  if (f.kind === 'signed') return `${file}: its agreement block already carries a name or a date. Leave the block's name and date empty.`;
  if (f.kind === 'block') return `${file} line ${f.line} describes the draft's own agreement block ("${f.said}"). Remove the sentence.`;
  return `${file} line ${f.line} opens a section for the draft's own agreement ("${f.said}"). Remove the section.`;
}

const setKey = (fm, key, lines) => {
  const at = fm.findIndex(l => l.startsWith(`${key}:`));
  if (at === -1) return [...fm, ...lines];
  let end = at + 1;
  while (end < fm.length && /^\s+\S/.test(fm[end])) end++;
  return [...fm.slice(0, at), ...lines, ...fm.slice(end)];
};
const quoted = v => JSON.stringify(String(v));

const WORDS = DRAFT_WORDS.join('|');
const NAMES = 'PRD|product requirements';
const IN_BRACKETS = new RegExp(`\\s*\\((?:${WORDS})\\)`, 'giu');
const AFTER_NAME = new RegExp(`(?<![\\p{L}\\p{N}])(${NAMES})\\s*,?\\s+(?:${WORDS})(?![\\p{L}\\p{N}])`, 'giu');
const BEFORE_NAME = new RegExp(`(?<![\\p{L}\\p{N}])(?:${WORDS})\\s+(${NAMES})(?![\\p{L}\\p{N}])`, 'giu');

export function withoutDraftMarker(title) {
  const t = String(title);
  const lead = /^\s*/.exec(t)[0];
  return lead + t.slice(lead.length).replace(IN_BRACKETS, '').replace(AFTER_NAME, '$1').replace(BEFORE_NAME, '$1').replace(/^\s+/, '');
}

export function draftMarkerIn(title) {
  const t = String(title);
  for (const re of [IN_BRACKETS, AFTER_NAME, BEFORE_NAME]) {
    re.lastIndex = 0;
    const m = re.exec(t);
    if (m) return m[0].trim();
  }
  return null;
}

export const AGREED_TITLE_FROM = '2026-09-17';

export function draftTitleIn(text) {
  const all = String(text);
  const body = (splitPrd(all) || { body: all }).body;
  const offset = all.slice(0, all.length - body.length).split('\n').length - 1;
  const lines = body.split('\n');
  const i = lines.findIndex(l => /^# /.test(l));
  if (i === -1) return null;
  const marker = draftMarkerIn(lines[i].slice(2));
  return marker ? { line: offset + i + 1, said: lines[i].trim().replace(/; /g, ', '), marker } : null;
}
const BLOCK_SCALAR = /^\s*[A-Za-z_][\w.]*:\s*[|>]/;

export function agreedBody(draftBody, { by, at, lang = 'en' } = {}) {
  const words = AGREED_WORDS[String(lang || 'en').trim().toLowerCase()];
  if (!words) return { problem: `The run's language is "${lang}", and the agreed PRD is written in en or cs only.` };
  let titled = false;
  const lines = String(draftBody).split('\n').map(l => {
    if (titled || !/^# /.test(l)) return l;
    titled = true;
    return `# ${withoutDraftMarker(l.slice(2))}`;
  });
  const body = lines.join('\n').replace(/\[rec:R-A12-(\d+)\]/g, '[rec:R-A13-$1]');
  return `${body.replace(/\s*$/, '')}\n\n${words({ by: String(by).trim(), at: String(at).trim() })}\n`;
}

export function agreedPrd({ draftDoc, draftRecords = [], by, at, today, lang = 'en', agreedRel = '6-prd/2-prd-agreed.md' } = {}) {
  const repair = 'The agent for this stage repairs it first.';
  const doc = splitPrd(draftDoc);
  if (!doc) return { problem: `The draft PRD has no front matter block, so it cannot be read. ${repair}` };
  const scalarIn = (fm, what) => {
    const hit = fm.find(l => BLOCK_SCALAR.test(l));
    return hit ? `${what} writes "${hit.trim()}" as a block scalar, which the checks refuse to read. ${repair}` : null;
  };
  if (scalarIn(doc.fm, 'The draft PRD')) return { problem: scalarIn(doc.fm, 'The draft PRD') };
  if (!draftRecords.length)
    return { problem: 'The draft PRD has no record, so the agreed PRD has nothing to be written from. The agent for this stage writes the draft\'s record first.' };
  const agreement = ['agreement_block:', `  name: ${quoted(String(by).trim())}`, `  date: ${quoted(String(at).trim())}`];
  const records = [];
  for (const r of [...draftRecords].sort((x, y) => String(x.name).localeCompare(String(y.name)))) {
    const nn = (/-r(\d+)(?:-|\.)/.exec(String(r.name)) || [])[1];
    const split = splitPrd(r.text);
    if (!nn || !split) return { problem: `${r.name} cannot be read as a record. ${repair}` };
    if (scalarIn(split.fm, r.name)) return { problem: scalarIn(split.fm, r.name) };
    let fm = split.fm;
    fm = setKey(fm, 'record_id', [`record_id: R-A13-${nn}`]);
    fm = setKey(fm, 'artifact_id', ['artifact_id: A13']);
    fm = setKey(fm, 'produced_at', [`produced_at: ${today}`]);
    if (fm.some(l => l.startsWith('created_at:'))) fm = setKey(fm, 'created_at', [`created_at: ${today}`]);
    fm = setKey(fm, 'bounds_hit', ['bounds_hit: []']);
    fm = setKey(fm, 'trace_id', ['trace_id: []']);
    fm = setKey(fm, 'agreement_block', agreement);
    records.push({ nn, name: `A13-r${nn}-prd-agreed.record.md`,
      text: `---\n${fm.join('\n')}\n---\n\n# Record R-A13-${nn} — A13\n\nWritten by the workflow when the draft was agreed: ` +
            `R-A12-${nn} word for word, with the agreement added. Not written for a reader; the document assembled from ` +
            `it is ${agreedRel}.\n` });
  }
  const body = agreedBody(doc.body, { by, at, lang });
  if (typeof body !== 'string') return body;
  let fm = doc.fm;
  fm = setKey(fm, 'artifact_id', ['artifact_id: A13']);
  fm = setKey(fm, 'agreement_block', agreement);
  fm = setKey(fm, 'assembled_at', [`assembled_at: ${today}`]);
  fm = setKey(fm, 'assembled_from', [`assembled_from: [${records.map(r => `R-A13-${r.nn}`).join(', ')}]`]);
  fm = setKey(fm, 'decision', []);
  return { document: `---\n${fm.join('\n')}\n---\n${body}`, records: records.map(({ name, text }) => ({ name, text })) };
}

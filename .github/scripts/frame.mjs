import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
const readdirSyncSafe = d => { try { return readdirSync(d); } catch { return []; } };
import { join, dirname, basename } from 'node:path';
import { FILL, isFrame, framePlaces, STAGE_DIRS, RECORDS_DIR, recordName, nextRecordNumber, runLanguageInfo, runArtifacts,
         runRecords, recordsFor, readText } from './run-files.mjs';
import { readContracts, carriedFacts, chosenOption as optionOf, opportunityShown } from './contracts.mjs';
import { DOC_SKELETONS, CLOSING, CARD_SECTIONS, sectionsIn, inLanguage, sectionName, docName, openingBlock, BLOCK_KINDS,
         BLOCK_STAGES, OPENING_LEADS, openingAt, changeLine, JUDGE_FILL, OPENING_FROM, underStandards } from './doc-structure.mjs';
import { recordedBuild, buildAtLeast } from './derive.mjs';
import { OPENING_BLOCK_BUILD } from './gates.mjs';
import { INITIATIVE_TEMPLATE, VERDICT_TEMPLATE, standingChoices, selectedId } from './gates.mjs';
import { PRD_TEMPLATE } from './prd.mjs';
import { frontmatter } from './yaml.mjs';
import { areas, touchpoints } from './derive.mjs';
import { envelopeOf, envelopeAtApproval } from './envelope.mjs';

const today = () => new Date(Date.now()).toISOString().slice(0, 10);
const fill = what => `${FILL} ${what}]]`;

export const FRAMED = ['A1', 'A2b', 'A3', 'A3b', 'A4', 'A5', 'A6', 'A7', 'A10', 'A11', 'A12', 'A14'];
const BRIEF_PLACE = 'the brief, its title and every section as brief-creation gives them, in the language the person speaks';
const BRIEF_FIELDS = "the brief's content fields, with their nesting, from the A1 skeleton in .github/artifact-fields.yaml";

const WORKFLOW_TITLE = { 2: 'Problems', 3: 'Competitive Analysis' };
export const titleOf = (id, stage, lang) => `# ${WORKFLOW_TITLE[stage] || 'Discovery'} | ${docName(id, lang)}`;

export function outputPath(skill) {
  const f = join('.github', 'skills', String(skill || ''), 'SKILL.md');
  if (!skill || !existsSync(f)) return null;
  const m = /^- \*\*Output:\*\* `\{runs_root\}\/\{run_id\}\/([^`]+\.md)`/m.exec(readFileSync(f, 'utf8'));
  return m ? m[1] : null;
}

function recordSlug(id, skill, step) {
  const f = join('.github', 'skills', String(skill || ''), 'SKILL.md');
  if (skill && existsSync(f)) {
    const m = new RegExp(`^- \\*\\*Record:\\*\\* \`[^\`]*/${id}-r\\d+-([a-z0-9-]+)\\.record\\.md\``, 'm').exec(readFileSync(f, 'utf8'));
    if (m) return m[1];
  }
  if (step && step.records && step.records.length) return step.records[0];
  return docName(id).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function contentFields(id, file = join('.github', 'artifact-fields.yaml')) {
  const text = existsSync(file) ? workflowText(file) : '';
  const lines = text.split('\n');
  const at = lines.findIndex(l => l === `  ${id}:`);
  if (at === -1) return [];
  let i = lines.findIndex((l, k) => k > at && /^ {4}skeleton: \|\s*$/.test(l));
  if (i === -1) return [];
  const body = [];
  for (i++; i < lines.length && (/^ {6}/.test(lines[i]) || /^\s*$/.test(lines[i])); i++) body.push(lines[i].slice(6));
  const from = body.findIndex(l => /^# then the content fields below/.test(l));
  const to = body.findIndex(l => /^# THE OUTPUT/.test(l));
  const fields = body.slice(from + 1, to === -1 ? body.length : to)
    .map(l => l.replace(/\s+#.*$/, '').replace(/\s+$/, '')).filter(l => l.trim() && !/^\s*#/.test(l));
  const indent = l => l.length - l.trimStart().length;
  return fields.map((l, k) => {
    const m = /^(\s*(?:- )?)([A-Za-z_][\w]*):\s*(.*)$/.exec(l);
    if (!m) return l;
    const [, pre, key, value] = m;
    if (value) return l;
    const next = fields[k + 1];
    const childOf = next !== undefined && indent(next) > indent(l) + (pre.includes('-') ? 2 : 0);
    return childOf ? l : `${pre}${key}: "${fill(key)}"`;
  });
}

function chosenOption(dir) {
  let state;
  try { state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'); } catch { return null; }
  return optionOf(state);
}

function idsOf(dir, id, key) {
  const a = runArtifacts(dir).find(x => x.id === id);
  for (const f of [...(a ? [a.abs] : []), ...recordsFor(dir, id).map(r => r.abs)]) {
    let fm;
    try { fm = frontmatter(readFileSync(f, 'utf8'), f); } catch { continue; }
    const v = fm && fm[key];
    if (Array.isArray(v) && v.length)
      return v.map(x => String((x && typeof x === 'object' ? x.id : x) ?? '').trim()).filter(Boolean);
  }
  return [];
}

export function documentBody(dir, id, stage, lang, { opening = null } = {}) {
  if (id === 'A1') return [fill(BRIEF_PLACE)];
  const L = [titleOf(id, stage, lang), ''];
  if (opening) L.push(...opening, '');
  L.push(fill('the finding, two to four sentences on what this document establishes'), '');
  const section = (name, what = name, level = 2) => L.push(`${'#'.repeat(level)} ${name}`, '', fill(what), '');
  const fixed = names => sectionsIn(names, lang).forEach(n => section(n));
  const members = id === 'A3' && envelopeAtApproval(dir) ? idsOf(dir, 'A3', 'hypotheses') : [];
  if (members.length) for (const h of members) L.push(`## ${h}: ${fill('the hypothesis, named for the problem')}`, '', fill(h), '');
  else if (id === 'A3') L.push(fill('one section per hypothesis in the record, headed "## {its id}: the hypothesis, named for the problem"'), '');
  if (id === 'A3b')
    for (const h of idsOf(dir, 'A3', 'hypotheses')) L.push(`## ${fill(`the opportunity framed from ${h}, as "O{n}: its name (from ${h})"`)}`, '', fill(`the opportunity framed from ${h}`), '');
  if (id === 'A4') {
    const opps = idsOf(dir, 'A3b', 'opportunities');
    const names = sectionsIn(DOC_SKELETONS.A4.sections, lang);
    const shown = opportunityShown(dir, lang);
    section(names[0], opps.length ? `the opportunities solved first; place each of ${opps.map(shown).join(', ')} in exactly one of the first three sections` : names[0]);
    names.slice(1).forEach(n => section(n));
  } else if (DOC_SKELETONS[id] && id !== 'A7') fixed(DOC_SKELETONS[id].sections);
  if (id === 'A7') {
    L.push(fill('one section per facet the run was asked for'), '');
    const [evidence, verdict] = sectionsIn(DOC_SKELETONS.A7.sections, lang);
    section(evidence);
    L.push(`## ${verdict}`, '');
    for (const v of VERDICT_TEMPLATE) section(sectionsIn([v.heading], lang)[0], v.heading, v.level);
  }
  if (id === 'A10') {
    L.push(fill('one section per option, headed "## {its id}: its name"'), '');
    fixed(['The comparison', 'How to choose between them']);
  }
  if (id === 'A12') {
    const opps = [...idsOf(dir, 'A4', 'primary'), ...idsOf(dir, 'A4', 'secondary')];
    const option = chosenOption(dir);
    for (const r of PRD_TEMPLATE) {
      if (r.id !== 'requirements') { section(sectionName(r, lang), r.heading); continue; }
      L.push(`## ${sectionName(r, lang)}`, '');
      const traced = [...opps, ...(option ? [option] : [])];
      if (!traced.length) L.push(fill('the requirements'), '');
      for (const t of traced) L.push(fill(`the requirements that answer ${t}`), '');
    }
  }
  if (id === 'A14') {
    for (const r of INITIATIVE_TEMPLATE) {
      if (r.container) { L.push(`## ${sectionName(r, lang)}`, ''); continue; }
      section(sectionName(r, lang), r.en || r.heading, r.level);
    }
    return L;
  }
  L.push(`## ${inLanguage(CLOSING[0], lang)}`, '', fill('what the material, the market or the research could not settle'), '');
  L.push(`## ${inLanguage(CLOSING[1], lang)}`, '', fill('the procedure: inputs, reductions, rules no check decided, edits'), '');
  return L;
}

export const carriesBlock = (id, stage) => BLOCK_KINDS.includes(id) && BLOCK_STAGES.includes(Number(stage));

export function openingFor(dir, id, stage, lang) {
  if (!carriesBlock(id, stage)) return null;
  return openingBlock({ ...blockFacts(dir, stage, lang), lang });
}

export function blockFacts(dir, stage, lang) {
  const { facts, changes } = carriedFacts(dir, stage, { lang });
  return { carried: facts.map(f => ({ label: lang === 'cs' ? f.cs : f.label, value: f.value, fact: f })), changed: changes };
}

function writtenPart(body, lang) {
  const lines = String(body || '').split('\n');
  const at = openingAt(body);
  if (!at) return null;
  const lead = `**${inLanguage(OPENING_LEADS.judge, lang)}**`;
  let to = lines.findIndex((l, i) => i > at.from && i < at.to && l.trim() === lead);
  if (to === -1) to = at.to;
  return { lines, from: at.from + 1, to, part: lines.slice(at.from + 1, to) };
}
const trimEnd = xs => { const a = [...xs]; while (a.length && !a[a.length - 1].trim()) a.pop(); return a; };

export function blockAgainstRecord(dir, stage, body, lang) {
  const w = writtenPart(body, lang);
  if (!w) return null;
  const facts = blockFacts(dir, stage, lang);
  const want = openingBlock({ ...facts, judge: [], lang });
  const part = want.slice(1, want.findIndex(l => l === `**${inLanguage(OPENING_LEADS.judge, lang)}**`));
  const have = trimEnd(w.part), wanted = trimEnd(part);
  const differs = have.join('\n') !== wanted.join('\n');
  const findings = [];
  if (differs) {
    const lines = have.filter(l => /^- /.test(l.trim())).map(l => l.trim());
    for (const f of facts.carried) {
      const line = `- ${f.label}: ${f.value}`;
      if (lines.includes(line)) continue;
      const found = lines.find(l => l.startsWith(`- ${f.label}:`));
      findings.push({ line: found || null, holds: `${f.label}: ${f.value}`, stage: f.fact.stage, where: f.fact.where, task: f.fact.task });
    }
    const changeLines = facts.changed.map(changeLine(lang));
    facts.changed.forEach((ch, i) => {
      if (lines.includes(changeLines[i])) return;
      findings.push({ line: null, holds: changeLines[i].slice(2), stage: ch.stage, where: `the decision recorded at stage ${ch.stage}`, task: 'SPOCK: record a decision I made' });
    });
    const wantedLines = wanted.map(l => l.trim());
    for (const l of lines.filter(x => !wantedLines.includes(x) && !findings.some(f => f.line === x)))
      findings.push({ line: l, holds: null, stage: null, where: null, task: null });
  }
  return { differs, findings, part: wanted };
}

export function writeBack(dir, stage, body, lang) {
  const w = writtenPart(body, lang);
  if (!w) return { changed: false, body, findings: [] };
  const r = blockAgainstRecord(dir, stage, body, lang);
  if (!r.differs) return { changed: false, body, findings: [] };
  const lines = [...w.lines.slice(0, w.from), ...r.part, ...(r.part.length ? [''] : []), ...w.lines.slice(w.to)];
  return { changed: true, body: lines.join('\n'), findings: r.findings };
}

export function blockHeld(dir, state, id, stage) {
  return BLOCK_KINDS.includes(id) && BLOCK_STAGES.includes(Number(stage)) && buildAtLeast(recordedBuild(dir), OPENING_BLOCK_BUILD)
    && Boolean(underStandards(state, stage, 'documentation-standards', OPENING_FROM));
}

export function insertBlock(dir, stage, body, lang) {
  if (openingAt(body)) return { changed: false, body };
  const lines = String(body).split('\n');
  const at = lines.findIndex(l => /^#\s+\S/.test(l));
  if (at === -1) return { changed: false, body };
  const block = openingBlock({ ...blockFacts(dir, stage, lang), judge: [JUDGE_FILL], lang });
  return { changed: true, body: [...lines.slice(0, at + 1), '', ...block, ...lines.slice(at + 1)].join('\n') };
}

export const blockFindingLine = f => f.holds
  ? `${f.line ? `"${f.line}"` : 'nothing'} where the record holds "${f.holds}", decided at stage ${f.stage} in ${f.where}; change it there with "${f.task}", never in the block`
  : `"${f.line}", which the record does not hold; the block is written from the record, so change the fact where it was decided`;

export function writeFrame(dir, id, { item = null, date = today(), recordOnly = false } = {}) {
  const c = readContracts();
  const stage = c.producedBy.get(id);
  const step = c.stepOf.get(id);
  const producer = c.producer.get(id) || {};
  if (!FRAMED.includes(id) || !stage) return [];
  const newPath = envelopeAtApproval(dir);
  if (id === 'A1' && !newPath) return [];
  const lang = runLanguageInfo(dir).lang === 'cs' ? 'cs' : 'en';
  const runId = basename(dir);
  const written = [];
  const put = (rel, lines) => {
    const abs = join(dir, rel);
    if (existsSync(abs)) return;
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, `${lines.join('\n').replace(/\n+$/, '')}\n`);
    written.push(rel);
  };

  if (id === 'A6' && item) {
    const slug = String(item.key).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    const n = nextRecordNumber(dir, id);
    put(join(STAGE_DIRS[stage - 1], 'parts', `${slug}.md`), [
      '---', 'part_of: A6', `item_id: ${item.key}`, '---', '', `## ${item.name || item.key}`, '', `[rec:R-${id}-${n}]`, '',
      ...sectionsIn(CARD_SECTIONS, lang).flatMap((s, k) => [`### ${s}`, '', fill(CARD_SECTIONS[k]), '']),
    ]);
  } else {
    const rel = outputPath(producer.skill);
    const had = runArtifacts(dir, { frames: true }).some(a => a.id === id);
    if (rel && !had && !recordOnly) {
      const lines = ['---', `run_id: ${runId}`, `artifact_id: ${id}`, '---', '',
                     ...documentBody(dir, id, stage, lang, { opening: openingFor(dir, id, stage, lang) })];
      put(rel, newPath ? enveloped(dir, id, stage, rel, lines) : lines);
    }
  }

  if (id === 'A6' && !item) return written;
  const itemId = item ? String(item.key) : '';
  const hasRecord = runRecords(dir, { frames: true }).some(r => {
    if (r.id !== id) return false;
    if (!item) return true;
    return new RegExp(`^item_id:\\s*["']?${itemId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?\\s*$`, 'm').test(readText(r.abs));
  });
  if (!hasRecord) {
    const nn = nextRecordNumber(dir, id);
    const slug = item ? String(item.key).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()
      : recordSlug(id, producer.skill, step);
    const fields = id === 'A1' ? [`# ${fill(BRIEF_FIELDS)}`] : contentFields(id).map(l => {
      if (id === 'A11' && /^option_id: /.test(l)) { const o = chosenOption(dir); return o ? `option_id: ${o}` : l; }
      return l;
    }).filter(l => !newPath || !/^(?:run_id|record_id|artifact_id|item_id|produced_at|bounds_hit|trace_id|sources|external_sources):/.test(l));
    put(join(RECORDS_DIR, STAGE_DIRS[stage - 1], recordName(id, nn, slug)), [
      '---', `run_id: ${runId}`, `record_id: R-${id}-${nn}`, `artifact_id: ${id}`, `item_id: "${itemId}"`,
      `produced_at: ${date}`, 'bounds_hit: []', 'trace_id: []',
      `sources: [${((step && step.requires) || []).join(', ')}]`, 'external_sources: []',
      ...fields, '---',
    ]);
  }
  return written;
}

function enveloped(dir, id, stage, rel, lines) {
  let state;
  try { state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'); } catch { return lines; }
  const st = (state.stages || []).map(s => ({ ...s, id: Number(s.id) })).find(s => s.id === Number(stage));
  if (!st) return lines;
  const held = recordsFor(dir, id, { frames: true }).map(r => (/-r(\d+)/.exec(r.rel) || [])[1]).filter(Boolean);
  const recordIds = (held.length ? held : id === 'A6' ? [] : [nextRecordNumber(dir, id)]).map(nn => `R-${id}-${nn}`);
  const r = envelopeOf(dir, state, st, id, { text: `${lines.join('\n').replace(/\n+$/, '')}\n`, rel, recordIds });
  return r.refusal ? lines : r.text.split('\n');
}

export const frameBrief = dir => writeFrame(dir, 'A1');

export function addMembers(dir, id) {
  if (id !== 'A3' || envelopeAtApproval(dir)) return [];
  const doc = runArtifacts(dir, { frames: true }).find(a => a.id === id && a.frame);
  if (!doc) return [];
  const ids = idsOf(dir, 'A3', 'hypotheses');
  if (!ids.length) return [];
  const text = readText(doc.abs);
  const lang = runLanguageInfo(dir).lang === 'cs' ? 'cs' : 'en';
  const missing = ids.filter(h => !new RegExp(`^## ${h}\\b`, 'm').test(text));
  if (!missing.length) return [];
  const close = `\n## ${inLanguage(CLOSING[0], lang)}\n`;
  const at = text.indexOf(close);
  const add = missing.map(h => `\n## ${h}: ${fill('the hypothesis, named for the problem')}\n\n${fill(h)}\n`).join('');
  writeFileSync(doc.abs, at === -1 ? `${text.replace(/\n*$/, '\n')}${add}` : `${text.slice(0, at)}${add}${text.slice(at)}`);
  return missing;
}

export function framesAt(dir, stage) {
  const out = [];
  for (const a of runArtifacts(dir, { frames: true }).filter(x => x.frame && Number(x.stage) === Number(stage)))
    out.push({ id: a.id, rel: a.rel, ...framePlaces(readText(a.abs)) });
  return out;
}

export function frameOwed(dir, id, have, c = readContracts()) {
  addMembers(dir, id);
  const onDisk = x => [...have.values()].some(s => s && s.has(x));
  const docFrames = runArtifacts(dir, { frames: true }).filter(a => a.id === id && a.frame);
  const frames = [...docFrames, ...runRecords(dir, { frames: true }).filter(r => r.id === id && r.frame)];
  if (docFrames.length) {
    const places = frames.map(f => ({ rel: f.rel, ...framePlaces(readText(f.abs)) }));
    const count = places.reduce((n, p) => n + p.count, 0);
    const first = places.find(p => p.count);
    return { kind: 'filling', line: `  filling ${id.padEnd(5)} ${count} place${count === 1 ? '' : 's'} still to fill, the first at line ${first.first} of ${first.rel}` };
  }
  if (!FRAMED.includes(id)) return null;
  const step = c.stepOf.get(id);
  const unmet = ((step && step.requires) || []).filter(r => c.producedBy.has(r) && !onDisk(r));
  if (unmet.length) return null;
  if (id === 'A3' && envelopeAtApproval(dir) && !idsOf(dir, 'A3', 'hypotheses').length) {
    const recs = frames.filter(f => f.id === id);
    if (recs.length) {
      const p = { rel: recs[0].rel, ...framePlaces(readText(recs[0].abs)) };
      return { kind: 'filling', line: `  filling ${id.padEnd(5)} ${p.count} place${p.count === 1 ? '' : 's'} still to fill, the first at line ${p.first} of ${p.rel}` };
    }
    const wrote = writeFrame(dir, id, { recordOnly: true });
    if (!wrote.length) return null;
    return { kind: 'framed', line: `  framed  ${id.padEnd(5)} record at ${wrote.join(' and ')}; fill it, and the document's frame follows with one section per hypothesis once it names them` };
  }
  const wrote = writeFrame(dir, id);
  if (!wrote.length) return null;
  return { kind: 'framed', line: `  framed  ${id.padEnd(5)} at ${wrote.join(' and ')}; fill each [[fill: …]] and nothing else` };
}

export function frameCards(dir) {
  const a5 = runArtifacts(dir).find(a => a.id === 'A5');
  if (!a5) return [];
  let people = [];
  for (const f of [a5.abs, ...recordsFor(dir, 'A5').map(r => r.abs)]) {
    let fm;
    try { fm = frontmatter(readFileSync(f, 'utf8'), f); } catch { continue; }
    if (Array.isArray(fm && fm.participants) && fm.participants.length) { people = fm.participants; break; }
  }
  const partsDir = join(dir, STAGE_DIRS[2], 'parts');
  const held = new Set();
  for (const p of existsSync(partsDir) ? runArtifactsParts(partsDir) : []) held.add(p);
  const out = [];
  for (const p of people.filter(x => x && (x.deep_dive === true || String(x.deep_dive) === 'true'))) {
    const key = String(p.identity_key || '').trim();
    if (!key || held.has(key)) continue;
    out.push(...writeFrame(dir, 'A6', { item: { key, name: String(p.name || key) } }));
  }
  return out;
}
function runArtifactsParts(partsDir) {
  const out = [];
  for (const f of (existsSync(partsDir) ? readdirSyncSafe(partsDir) : []).filter(x => x.endsWith('.md'))) {
    const m = /^item_id:\s*["']?([^"'\n]+?)["']?\s*$/m.exec(readText(join(partsDir, f)));
    if (m) out.push(m[1]);
  }
  return out;
}

export function frameIdeas(dir, ids, headings, { date = today() } = {}) {
  const c = readContracts();
  const step = c.stepOf.get('A8');
  const stageDir = STAGE_DIRS[3];
  const runId = basename(dir);
  const written = [];
  const questions = areas().flatMap(a => { const t = touchpoints(a.body); return t.keys ? [...t.keys()] : t.map(x => x.id); });
  for (const id of ids) {
    const partRel = join(stageDir, 'parts', `${id}.md`);
    const held = runRecords(dir, { frames: true }).find(r => r.id === 'A8'
      && new RegExp(`^item_id:\\s*["']?${id}["']?\\s*$`, 'm').test(readText(r.abs)));
    const nn = held ? (/-r(\d+)/.exec(held.rel) || [])[1] : nextRecordNumber(dir, 'A8');
    if (!existsSync(join(dir, partRel))) {
      mkdirSync(join(dir, stageDir, 'parts'), { recursive: true });
      writeFileSync(join(dir, partRel), ['---', 'part_of: A8', `item_id: ${id}`, `statement: "${fill('the solution in one sentence')}"`, '---', '',
        `## ${id}: ${fill('the solution\'s name')}`, '', `[rec:R-A8-${nn}]`, '',
        ...headings.flatMap(h => [h, '', fill(h.replace(/^#+\s*/, '')), ''])].join('\n').replace(/\n+$/, '\n'));
      written.push(partRel);
    }
    if (!held) {
      const rel = join(RECORDS_DIR, stageDir, recordName('A8', nn, 'idea-set'));
      mkdirSync(join(dir, RECORDS_DIR, stageDir), { recursive: true });
      writeFileSync(join(dir, rel), ['---', `run_id: ${runId}`, `record_id: R-A8-${nn}`, 'artifact_id: A8', `item_id: ${id}`,
        `produced_at: ${date}`, 'bounds_hit: []', 'trace_id: []', `sources: [${((step && step.requires) || []).join(', ')}]`,
        'external_sources: []', '---', '', `# The compliance sweep for ${id}`, '', `All ${questions.length} touchpoints, answered against ${id}.`, '',
        ...questions.map(q => `${q} · ${fill('yes, no or cannot_tell, and after cannot_tell the input id that would settle it')}`)].join('\n') + '\n');
      written.push(rel);
    }
  }
  return written;
}

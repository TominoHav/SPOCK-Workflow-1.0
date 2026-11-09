import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { runArtifacts, recordsFor, recordNumber, recordName, nextRecordNumber, runLanguageInfo,
         STAGE_DIRS, strayRecordFiles, strayRecordsLine, readText } from './run-files.mjs';
import { frontmatter } from './yaml.mjs';
import { readContracts, owedAt } from './contracts.mjs';
import { couldNotVerify, SKILL_WORKFLOW, INITIATIVE_TEMPLATE, accountedEdits, chosenSolution, ENVELOPE_AT_APPROVAL_BUILD } from './gates.mjs';
import { PRD_TEMPLATE } from './prd.mjs';
import { rewriteHeadings, withClosing } from './doc-structure.mjs';
import { schemas } from './artifact-fields.mjs';
import { roundsFor, resolveRole, renderDecisionBlock, askedOn } from './decision-block.mjs';
import { framesAt, writeBack, blockHeld, insertBlock } from './frame.mjs';
import { recordedBuild, buildAtLeast } from './derive.mjs';
import { measureItems } from './material.mjs';

export class EnvelopeRefusal extends Error {}
const refuse = m => { throw new EnvelopeRefusal(m); };
const today = () => new Date(Date.now()).toISOString().slice(0, 10);

export const envelopeAtApproval = dir => buildAtLeast(recordedBuild(dir), ENVELOPE_AT_APPROVAL_BUILD);

function split(text, file) {
  const m = /^\ufeff?---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) refuse(`assemble: ${file} has no front matter block. Write the document first; this fills it in. ` +
    'If this document is still to be started, run `SPOCK: check what is written, then continue` and the workflow writes its frame.');
  return { fm: m[1].split(/\r?\n/), body: text.slice(m[0].length) };
}

function setKey(fm, key, rendered) {
  const at = fm.findIndex(l => new RegExp(`^${key}:`).test(l));
  const lines = rendered.split('\n');
  if (at === -1) return [...fm, ...lines];
  let end = at + 1;
  while (end < fm.length && /^\s+\S/.test(fm[end])) end++;
  return [...fm.slice(0, at), ...lines, ...fm.slice(end)];
}

function dropKey(fm, key) {
  const at = fm.findIndex(l => new RegExp(`^${key}:`).test(l));
  if (at === -1) return fm;
  let end = at + 1;
  while (end < fm.length && /^\s+\S/.test(fm[end])) end++;
  return [...fm.slice(0, at), ...fm.slice(end)];
}

const SOURCES_GATHERED = '2026-09-09';

const fmValue = (fm, key) => {
  const l = fm.find(x => new RegExp(`^${key}:`).test(x));
  return l === undefined ? null : l.slice(key.length + 1).trim();
};

const refsIn = lines => {
  const out = [];
  let depth = null;
  for (const l of lines) {
    const open = l.match(/^(\s*)sources:\s*$/);
    if (open) { depth = open[1].length; continue; }
    if (depth === null) continue;
    const indent = l.match(/^\s*/)[0].length;
    if (l.trim() && indent <= depth) { depth = null; continue; }
    const m = l.match(/^\s+ref:\s*["']?([^"'\s#]+)/);
    if (m) out.push(m[1]);
  }
  return out;
};

const has = (fm, key) => fm.some((l, i) =>
  new RegExp(`^${key}:\\s*\\S`).test(l) ||
  (new RegExp(`^${key}:\\s*$`).test(l) && /^\s+\S/.test(fm[i + 1] || '')));

function refuseBlockScalars(fm, file) {
  const bad = fm.filter(l => /^\s*[A-Za-z_][\w.]*:\s*[|>]/.test(l)).map(l => l.trim().split(':')[0]);
  if (!bad.length) return;
  refuse(`${file} — ${bad.map(k => '`' + k + ':`').join(' and ')} ${bad.length > 1 ? 'are' : 'is'} written as a ` +
      `block scalar (\`|\` or \`>\`), which this repository's YAML reader refuses rather than half-reads. ` +
      `Put each value on one line, quoted if it carries a colon or a hash, or write it as a \`- item\` list ` +
      `under the key — the wording is kept, only the line breaks go. Inside double quotes, write a quote as ` +
      `\`\\"\` and a backslash as \`\\\\\`. \`.github/artifact-fields.yaml\` ` +
      `delivers every skeleton inside a \`|\` block of its own: that \`|\` is the carrier's packaging and ` +
      `is not part of what you copy.`);
}

const MERGED_LISTS = ['sources', 'external_sources', 'bounds_hit', 'trace_id'];
const OVERWRITTEN = ['run_id', 'record_id', 'artifact_id', 'ost_role', 'workflow', 'produced_by',
                     'assembled_at', 'assembled_from', 'could_not_verify'];

const inlineItems = value => {
  const inner = value.trim().replace(/^\[/, '').replace(/\]$/, '');
  const items = [];
  let cur = '', quote = null;
  for (const ch of inner) {
    if (quote) { cur += ch; if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; cur += ch; continue; }
    if (ch === ',') { if (cur.trim()) items.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) items.push(cur.trim());
  return items;
};

function oneOfEachKey(fm, rel) {
  const copies = new Map();
  for (let i = 0; i < fm.length; i++) {
    const k = /^([A-Za-z_][\w.]*):/.exec(fm[i]);
    if (!k) continue;
    let end = i + 1;
    while (end < fm.length && /^\s+\S/.test(fm[end])) end++;
    if (!copies.has(k[1])) copies.set(k[1], []);
    copies.get(k[1]).push({ at: i, end, text: fm.slice(i, end).join('\n') });
  }
  const where = cs => cs.map(c => `line ${c.at + 2} reads \`${c.text.split('\n')[0]}\``).join(', ');
  const replaced = new Map();
  for (const [key, cs] of copies) {
    if (cs.length < 2) continue;
    const value = c => c.text.slice(key.length + 1).trim();
    let kept;
    if (cs.every(c => c.text === cs[0].text)) kept = cs[0].text;
    else if (MERGED_LISTS.includes(key)) {
      if (cs.every(c => c.end === c.at + 1 && /^\[.*\]$/.test(value(c)))) {
        const items = [];
        for (const c of cs) for (const x of inlineItems(value(c))) if (!items.includes(x)) items.push(x);
        kept = `${key}: [${items.join(', ')}]`;
      } else {
        const full = cs.filter(c => !/^\[\s*\]$/.test(value(c)));
        if (full.length !== 1)
          refuse(`assemble: ${rel} — \`${key}:\` is written ${cs.length} times and at least one copy is a block list: ${where(cs)}. ` +
              `A block cannot be joined to another list without rewriting the entries, so this file was not written. ` +
              `Put every entry under one \`${key}:\` and run this again.`);
        kept = full[0].text;
      }
    } else if (OVERWRITTEN.includes(key)) kept = cs[0].text;
    else
      refuse(`assemble: ${rel} — \`${key}:\` is written ${cs.length} times in the front matter and the copies disagree: ${where(cs)}. ` +
          `A YAML reader keeps one of them without saying which, and choosing is choosing your answer, so this file was not written. ` +
          `Delete the copy that is wrong and run this again.`);
    replaced.set(cs[0].at, { end: cs[0].end, lines: kept.split('\n') });
    for (const c of cs.slice(1)) replaced.set(c.at, { end: c.end, lines: [] });
  }
  if (!replaced.size) return fm;
  const out = [];
  for (let i = 0; i < fm.length;) {
    const r = replaced.get(i);
    if (r) { out.push(...r.lines); i = r.end; } else out.push(fm[i++]);
  }
  return out;
}

const PRD_HEADINGS = {
  stage: 6, table: withClosing(PRD_TEMPLATE), unlisted: 'kept', whose: "the PRD's", from: 'the PRD Template',
  after: "A heading of your own is left as you wrote it: a requirement's own heading, or a section of your own such " +
    'as an alignment note. A line above that is not a section is named only because a section is missing, in case it is that one.',
};
const HEADINGS_WRITTEN = {
  A14: { stage: 7, table: INITIATIVE_TEMPLATE, unlisted: 'refused', whose: "the initiative's", from: 'its template',
         after: 'A heading deeper than these inside a section, such as one criterion or one risk, is yours and is left as it is.' },
  A12: PRD_HEADINGS,
  A13: PRD_HEADINGS,
};

function headingRefusal(rel, id, w, r, { lang, declared }, offset) {
  const said = r.refused.map(p => (p.missing
    ? `  "${p.missing}" is missing`
    : `  line ${p.line + offset} reads "${p.text}", which ${p.why}`));
  const language = `${lang === 'cs' ? 'Czech' : 'English'}, ${declared ? 'the language the run declared' : 'because the run declares no language'}`;
  return `assemble: ${rel} — this step writes ${w.whose} section headings from ${w.from}, and it cannot ` +
    `place the ones below, so nothing was written for ${id}:\n${said.join('\n')}\n\n` +
    `Write every section under a heading of its own, in this order, as its id or its name in either language, ` +
    `and run this again; each heading is then written in ${language}:\n` +
    r.expected.map(h => `  ${'#'.repeat(h.level)} ${h.name}`).join('\n') +
    `\n\n${w.after}`;
}

const PRODUCTION_ONLY = ['produced_at', 'bounds_hit', 'trace_id', 'record_id', 'item_id', 'created_at'];

function producerOf(contracts, register, id) {
  return contracts.producer.get(id)
    || ((register[id] || {}).produced === 'human' ? { human: true, supplied: true } : null);
}

function contextOf(dir, state, st, contracts = readContracts()) {
  const EDITS = join(dir, 'notes', 'marked-edits.md');
  const { accounted } = existsSync(EDITS) ? accountedEdits(readFileSync(EDITS, 'utf8')) : { accounted: new Set() };
  return { dir, runId: basename(dir), state, st, contracts, register: schemas().register, accounted, newPath: envelopeAtApproval(dir) };
}

function headingsFor(c, id, raw, rel) {
  const w = HEADINGS_WRITTEN[id];
  if (!w || c.st.id !== w.stage) return null;
  const language = runLanguageInfo(c.dir);
  if (!['cs', 'en'].includes(language.lang))
    refuse(`assemble: A1 declares \`language: ${language.lang}\`, and ${w.whose} section headings exist in ` +
        `\`cs\` and \`en\` only, so nothing was written for ${id}. The run's language has to be one of the two.`);
  const { fm: onDisk, body } = split(raw, rel);
  const r = rewriteHeadings(body, w.table, language.lang, { unlisted: w.unlisted });
  if (r.refused) refuse(headingRefusal(rel, id, w, r, language, onDisk.length + 2));
  return { ...r, offset: onDisk.length + 2 };
}

export function recordEnvelopeOf(c, id, rec, text, byNumber = new Map()) {
  let { fm, body } = split(text, rec.rel);
  refuseBlockScalars(fm, rec.rel);
  fm = oneOfEachKey(fm, rec.rel);
  const nn = recordNumber(basename(rec.abs));
  if (nn === null) refuse(`${rec.rel} — a record filename must carry its number as \`-r<NN>\`, either ` +
               `before a hyphen (${recordName(id, 1, 'selection')}) or before the suffix ` +
               `(${recordName(id, 1)}). Nothing else in this build resolves a record by filename, so ` +
               `there is no second opinion to fall back on and a guess here renames the record. ` +
               `The next free number for ${id} in this run is ${nextRecordNumber(c.dir, id)}.`);
  const recordId = `R-${id}-${nn}`;
  if (byNumber.has(nn))
    refuse(`${byNumber.get(nn)} and ${rec.rel} both derive ${recordId}, and a record store cannot hold ` +
        `one identity twice. Rename one of them to a number no other ${id} record uses — the body, ` +
        `the fields and the history are kept, only the number moves. Records are retained, never ` +
        `deleted, so renaming is the whole of the repair.`);
  byNumber.set(nn, rec.rel);
  const refs = refsIn(fm);
  fm = setKey(fm, 'run_id', `run_id: ${c.runId}`);
  fm = setKey(fm, 'record_id', `record_id: ${recordId}`);
  fm = setKey(fm, 'artifact_id', `artifact_id: ${id}`);
  if (!has(fm, 'item_id')) fm = setKey(fm, 'item_id', 'item_id: ""');
  if (!has(fm, 'produced_at')) fm = setKey(fm, 'produced_at', `produced_at: ${today()}`);
  for (const k of ['bounds_hit', 'trace_id', 'sources', 'external_sources'])
    if (!has(fm, k)) fm = setKey(fm, k, `${k}: []`);
  return { text: `---\n${fm.join('\n')}\n---\n${body}`, recordId, refs };
}

function documentEnvelope(c, id, { text, rel, recordIds, refs, headings, producer, finalise = false }) {
  const { st, state, register, accounted, dir } = c;
  const notes = [];
  if (c.newPath && id === 'A2') { const m = measureItems(text, dir); if (!m.unread) text = m.text; }
  let { fm, body } = split(text, rel);
  refuseBlockScalars(fm, rel);
  if (headings) body = headings.body;
  let backs = [];
  if (st.status !== 'accepted' || finalise) {
    const lang = runLanguageInfo(dir).lang === 'cs' ? 'cs' : 'en';
    const wb = writeBack(dir, st.id, body, lang);
    if (wb.changed) { body = wb.body; backs = wb.findings; }
    else if (blockHeld(dir, state, id, st.id)) {
      const ib = insertBlock(dir, st.id, body, lang);
      if (ib.changed) { body = ib.body; backs = [{ inserted: true }]; }
    }
  }
  fm = oneOfEachKey(fm, rel);
  fm = setKey(fm, 'run_id', `run_id: ${c.runId}`);
  fm = setKey(fm, 'artifact_id', `artifact_id: ${id}`);
  const ost = register[id] && register[id].ost;
  if (ost) fm = setKey(fm, 'ost_role', `ost_role: ${ost}`);
  if (!has(fm, 'status')) fm = setKey(fm, 'status', 'status: produced');
  const wf = SKILL_WORKFLOW[producer.skill] || (producer.supplied ? st.workflow : undefined);
  if (wf) fm = setKey(fm, 'workflow', `workflow: ${wf}`);
  if (c.newPath && accounted.has(id)) fm = setKey(fm, 'modified_by', 'modified_by: human');
  else if (!has(fm, 'modified_by'))
    fm = setKey(fm, 'modified_by', `modified_by: ${producer.human || accounted.has(id) ? 'human' : 'agent'}`);
  if (!has(fm, 'revisions')) fm = setKey(fm, 'revisions', 'revisions: 0');
  if (producer.human) fm = dropKey(fm, 'produced_by');
  else if (producer.agent && producer.skill)
    fm = setKey(fm, 'produced_by', `produced_by:\n  agent: ${producer.agent}\n  skill: ${producer.skill}`);
  for (const k of ['sources', 'external_sources']) if (!has(fm, k)) fm = setKey(fm, k, `${k}: []`);
  if (refs.length && today() >= SOURCES_GATHERED) {
    const already = new Set((fmValue(fm, 'external_sources') || '').replace(/^\[|\]$/g, '')
      .split(',').map(s => s.trim()).filter(Boolean));
    const all = [...already, ...refs.filter(r => !already.has(r))];
    fm = setKey(fm, 'external_sources', `external_sources: [${all.join(', ')}]`);
  }
  if (!c.newPath || !has(fm, 'assembled_at')) fm = setKey(fm, 'assembled_at', `assembled_at: ${today()}`);
  if (recordIds.length)
    fm = setKey(fm, 'assembled_from', `assembled_from: [${recordIds.join(', ')}]`);

  if (producer.human) fm = dropKey(fm, 'could_not_verify');
  const cnvAt = c.newPath ? String(fmValue(fm, 'assembled_at') || today()).replace(/^["']|["']$/g, '') : today();
  const cnv = producer.skill ? couldNotVerify(producer.skill, cnvAt) : null;
  if (cnv) fm = setKey(fm, 'could_not_verify', cnv.length
    ? 'could_not_verify:\n' + cnv.map(r =>
        `  - rule: ${JSON.stringify(r.rule)}\n    needs: ${r.needs}${r.reach ? `\n    reach: ${r.reach}` : ''}`).join('\n')
    : 'could_not_verify: []');

  if (c.newPath && st.status !== 'accepted' && has(fm, 'decision')) {
    const gate0 = String((register[id] && register[id].gate) || '').trim();
    const recorded0 = [...(st.decision_gates || []), ...(st.decision_gate ? [st.decision_gate] : [])].some(g => String(g.id) === gate0);
    if (recorded0) fm = dropKey(fm, 'decision');
  }
  {
    const gate = String((register[id] && register[id].gate) || '').trim();
    if (/^G\d/.test(gate)) {
      const recorded = [...(st.decision_gates || []), ...(st.decision_gate ? [st.decision_gate] : [])]
        .find(g => String(g.id) === gate);
      if (!recorded) {
        if (has(fm, 'decision')) notes.push(`decision block removed — the run records no ${gate}, so nothing on this stage has been accepted yet`);
        fm = dropKey(fm, 'decision');
      } else {
        const who = String(recorded.decided_by || '').trim();
        const decided = (state.decisions || []).filter(d => String(d.stage) === String(st.id) && !d.superseded_by);
        const role = resolveRole(state, st, who);
        if (!who || !role) {
          notes.push(`${gate} is recorded and the run names ${who ? 'no role for ' + who : 'nobody'} — the block is left alone rather than half-written`);
        } else {
          const rounds = roundsFor(state, st.id);
          const reading = chosenSolution(dir, state, { gate, text: `---\n${fm.join('\n')}\n---\n` });
          const chose = decided.find(d => String(d.kind) === 'choice' && String(d.affects || '') === id);
          const held = reading.blockRaw != null && String(reading.blockRaw).trim() !== '' ? String(reading.blockRaw).trim() : null;
          const selection = held || (id === 'A9' ? (reading.from === 'choice' ? String(reading.raw) : null)
            : (chose ? (chose.selection || String(chose.what || '').split(/[,.]/)[0].trim()) || null : null));
          const asked = askedOn(`---\n${fm.join('\n')}\n---\n`);
          const lines = renderDecisionBlock({ gate, who, role, acceptedAt: recorded.decided_at,
                                              selection, rounds, asked });
          fm = setKey(fm, 'decision', lines.join('\n'));
        }
      }
    }
  }

  for (const k of PRODUCTION_ONLY) fm = dropKey(fm, k);
  return { text: `---\n${fm.join('\n')}\n---\n${body}`, fmLength: fm.length, notes, headings, backs };
}

export function envelopeOf(dir, state, st, id, { text, rel, recordIds = [], refs = [], finalise = false, ctx = null } = {}) {
  const c = ctx || contextOf(dir, state, st);
  const producer = producerOf(c.contracts, c.register, id);
  if (!producer) return { text, refusal: null };
  try {
    const headings = headingsFor(c, id, text, rel);
    return { text: documentEnvelope(c, id, { text, rel, recordIds, refs, headings, producer, finalise }).text, refusal: null };
  } catch (e) {
    if (e instanceof EnvelopeRefusal) return { text, refusal: e.message };
    throw e;
  }
}

export function assembleRun(dir, { write = false, stage = null, finalise = false, view = false } = {}) {
  const runId = basename(dir);
  const contracts = readContracts();
  const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
  const stages = (state.stages || []).map(s => ({ ...s, id: Number(s.id) })).sort((a, b) => a.id - b.id);
  const st = stage != null
    ? stages.find(s => s.id === Number(stage))
    : stages.find(s => s.status !== 'accepted');
  if (stage != null && !st)
    return { runId, stage: null, touched: [], files: [], refusals: [], note: `this run has no stage ${stage}` };
  if (!st) return { runId, stage: null, touched: [], files: [], refusals: [], note: 'every stage is accepted; nothing is being written' };
  if (view) write = false;

  const { owed } = owedAt(st.id, contracts, null);
  const atStage = runArtifacts(dir).filter(a => Number(a.stage) === st.id);
  const held = new Map(atStage.map(a => [a.id, a]));
  const unidentified = atStage.filter(a => !a.id).map(a => a.rel);
  const c = contextOf(dir, state, st, contracts);
  const touched = [], files = [], refusals = [];
  const REFUSED = Symbol('refused');
  const guard = (rel, fn) => {
    if (!view) return fn();
    try { return fn(); } catch (e) { if (!(e instanceof EnvelopeRefusal)) throw e; refusals.push({ rel, line: e.message }); return REFUSED; }
  };

  for (const id of owed) {
    const out = held.get(id);
    if (!out) continue;
    const producer = producerOf(contracts, c.register, id);
    if (!producer) { touched.push({ id, note: 'no contract step produces it — nothing to derive from' }); continue; }

    const headings = guard(out.rel, () => headingsFor(c, id, readFileSync(out.abs, 'utf8'), out.rel));
    const docRefused = headings === REFUSED;

    const records = recordsFor(dir, id);
    if (!records.length) {
      const stray = strayRecordFiles(dir, STAGE_DIRS[st.id - 1]);
      const slug = basename(out.rel, '.md').replace(/^\d+-/, '');
      if (stray.length && guard(out.rel, () =>
        refuse(`assemble: ${id} has no record, and ${strayRecordsLine(STAGE_DIRS[st.id - 1], stray, id, slug, nextRecordNumber(dir, id))}. ` +
            `Nothing was written for ${id}.`)) === REFUSED) continue;
    }

    const recordIds = [];
    const gatheredRefs = [];
    const byNumber = new Map();
    for (const rec of records) {
      const text = readText(rec.abs);
      const r = guard(rec.rel, () => recordEnvelopeOf(c, id, rec, text, byNumber));
      if (r === REFUSED) continue;
      recordIds.push(r.recordId);
      for (const x of r.refs) if (!gatheredRefs.includes(x)) gatheredRefs.push(x);
      files.push({ rel: rec.rel, abs: rec.abs, text, next: r.text });
      if (r.text !== text) { if (write) writeFileSync(rec.abs, r.text); touched.push({ id, file: rec.rel }); }
    }

    if (docRefused) continue;
    const text = readText(out.abs);
    const d = guard(out.rel, () => documentEnvelope(c, id, { text, rel: out.rel, recordIds, refs: gatheredRefs, headings, producer, finalise }));
    if (d === REFUSED) continue;
    for (const note of d.notes) touched.push({ id, note });
    files.push({ rel: out.rel, abs: out.abs, text, next: d.text });
    const at = write ? d.fmLength + 2 : (headings && headings.offset);
    const listed = headings ? headings.changes.map(h => ({ line: h.line + at, from: h.from, to: h.to })) : [];
    if (d.text !== text) { if (write) writeFileSync(out.abs, d.text); touched.push({ id, file: out.rel, headings: listed, backs: d.backs }); }
  }
  const a2 = held.get('A2');
  if (c.newPath && st.id === 2 && a2 && !owed.includes('A2')) {
    const text = readText(a2.abs), m = measureItems(text, dir);
    if (!m.unread) {
      files.push({ rel: a2.rel, abs: a2.abs, text, next: m.text });
      if (m.text !== text) { if (write) writeFileSync(a2.abs, m.text); touched.push({ id: 'A2', file: a2.rel }); }
    }
  }
  return { runId, stage: st.id, touched, unidentified, identified: held.size, frames: framesAt(dir, st.id), files, refusals };
}

export function envelopeView(dir) {
  const texts = new Map();
  let r;
  try { r = assembleRun(dir, { view: true }); } catch { return { texts, refusals: [] }; }
  for (const f of r.files || []) if (f.next !== f.text) texts.set(f.rel, f.next);
  return { texts, refusals: r.refusals || [] };
}

export const frameLeftLine = f => `  left    ${f.rel} — still a frame, with ${f.count} place${f.count === 1 ? '' : 's'} to fill, the first at line ${f.first}; ` +
  'it is assembled once every one is filled';

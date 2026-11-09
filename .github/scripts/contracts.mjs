import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WAITS_ON_A_PERSON, personActed, GATES, decisionsFor, recordedDecisions, chosenSolution, standingChoices, selectedId } from './gates.mjs';
import { runArtifacts, recordsFor, runLanguage } from './run-files.mjs';
import { frontmatter } from './yaml.mjs';
import { recordedBuild, buildAtLeast } from './derive.mjs';
import { OPPORTUNITY_SHOWN_BUILD } from './gates.mjs';

export const CONTRACTS = '.github/workflow-contracts';
export const ROOT_CONTRACT = join(CONTRACTS, 'discovery.workflow.yaml');

const listField = (body, field) => {
  const inline = new RegExp(`^\\s*${field}:\\s*\\[([^\\]]*)\\]\\s*(?:#.*)?$`, 'm').exec(body);
  if (inline) return inline[1].split(',').map(x => x.trim()).filter(Boolean);
  if (!new RegExp(`^\\s*${field}:\\s*$`, 'm').test(body)) return [];
  return [...body.matchAll(new RegExp(`^\\s*${field}:\\s*$([\\s\\S]*?)(?=^\\s{4}[a-z_]+:|(?![\\s\\S]))`, 'gm'))]
    .flatMap(b => [...b[1].matchAll(/^\s*-\s+([A-Za-z0-9][\w-]*)\s*(?:#.*)?$/gm)].map(x => x[1]));
};

const mapField = (body, field) => {
  const out = new Map();
  const m = new RegExp(`^(\\s*)${field}:\\s*$([\\s\\S]*?)(?=^\\s{0,4}[a-z_]+:|(?![\\s\\S]))`, 'm').exec(body);
  if (!m) return out;
  for (const e of m[2].matchAll(/^\s*([A-Za-z][\w]*):\s*([a-z][\w-]*)\s*(?:#.*)?$/gm)) out.set(e[1], e[2]);
  return out;
};

export function readContracts(file = ROOT_CONTRACT) {
  const produces = new Map(), requires = new Map(), since = new Map(), producedBy = new Map();
  const records = new Map();
  const producer = new Map();
  const skills = new Map(), agents = new Map();
  const needs = new Map();
  const stepOf = new Map();
  const carries = new Map();
  let steps = 0;
  const walk = (path, forStage) => {
    if (!existsSync(path)) return;
    const text = readFileSync(path, 'utf8');
    if (forStage === null) for (const [s, list] of needsIn(text)) needs.set(s, list);
    if (forStage === null) for (const [s, list] of carriesIn(text)) carries.set(s, list);
    let lastIndent = -1, lastStage = null;
    for (const m of text.matchAll(/^([ \t]*)-\s+id:\s*(\S+)([\s\S]*?)(?=^[ \t]*-\s+id:|^[a-z_]+:|(?![\s\S]))/gm)) {
      const indent = m[1].length;
      const body = m[3];
      const own = /^\s*stage:\s*"?(\d)"?\s*$/m.exec(body);
      const stage = forStage ?? (own ? Number(own[1]) : null);
      if (!stage) {
        if (lastStage !== null && indent > lastIndent) {
          const ph = /^\s*skill:\s*([a-z][a-z-]*)\s*$/m.exec(body);
          if (ph && skills.has(lastStage) && !skills.get(lastStage).includes(ph[1]))
            skills.get(lastStage).push(ph[1]);
        }
        continue;
      }
      lastIndent = indent; lastStage = stage;
      steps++;
      const made = listField(body, 'produces');
      const wants = listField(body, 'requires');
      const keeps = listField(body, 'records');
      if (!produces.has(stage)) produces.set(stage, new Set());
      if (!requires.has(stage)) requires.set(stage, new Set());
      if (!records.has(stage)) records.set(stage, new Set());
      for (const r of keeps) records.get(stage).add(r);
      if (!skills.has(stage)) skills.set(stage, []);
      if (!agents.has(stage)) agents.set(stage, []);
      const ag = /^\s*agent:\s*([a-z][a-z-]*)\s*$/m.exec(body);
      if (ag && !agents.get(stage).includes(ag[1])) agents.get(stage).push(ag[1]);
      const sk = /^\s*skill:\s*([a-z][a-z-]*)\s*$/m.exec(body);
      if (sk && !skills.get(stage).includes(sk[1])) skills.get(stage).push(sk[1]);
      for (const ph of body.matchAll(/^\s+skill:\s*([a-z][a-z-]*)\s*$/gm))
        if (!skills.get(stage).includes(ph[1])) skills.get(stage).push(ph[1]);
      for (const id of made) { produces.get(stage).add(id); producedBy.set(id, stage); }
      if (!/^\s*contract:\s*\S+/m.test(body))
        for (const id of made) stepOf.set(id, { requires: wants, records: keeps, stage });
      const perArtifact = mapField(body, 'producers');
      for (const id of made) {
        const declared = perArtifact.get(id);
        const entry = {
          agent: ag ? ag[1] : null,
          skill: declared === 'human' ? null : (declared || (sk ? sk[1] : null)),
          human: declared === 'human',
          stage,
        };
        const prev = producer.get(id);
        if (!prev || (!prev.agent && !prev.skill && !prev.human)) producer.set(id, entry);
      }
      for (const id of wants) requires.get(stage).add(id);
      const s = /^\s*since:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m.exec(body);
      if (s) for (const id of made) since.set(id, s[1]);
      const comp = /^\s*contract:\s*(\S+)\s*$/m.exec(body);
      if (comp) walk(comp[1], stage);
    }
  };
  walk(file, null);
  for (const [stage, set] of requires)
    for (const id of [...set]) if (producedBy.get(id) === stage) set.delete(id);
  return { produces, requires, records, since, producedBy, producer, skills, agents, needs, carries, stepOf, steps };
}

const NEED_KEYS = ['for_stage', 'measure', 'at_least', 'when_short'];
function needsIn(text) {
  const out = new Map();
  for (const m of text.matchAll(/^  - id:\s*(\S+)\s*$([\s\S]*?)(?=^  - id:|^[a-z_]+:|(?![\s\S]))/gm)) {
    const own = /^ {4}stage:\s*"?(\d)"?\s*$/m.exec(m[2]);
    const blk = /^ {4}next_stage_needs:\s*$([\s\S]*?)(?=^ {0,4}[a-z_]+:|(?![\s\S]))/m.exec(m[2]);
    if (!own || !blk) continue;
    const list = [];
    for (const e of blk[1].matchAll(/^ {6}-\s+id:\s*([\w-]+)\s*$([\s\S]*?)(?=^ {6}-\s+id:|(?![\s\S]))/gm)) {
      const need = { id: e[1] };
      for (const k of NEED_KEYS) {
        const v = new RegExp(`^\\s+${k}:\\s*([\\w-]+)`, 'm').exec(e[2]);
        need[k] = v ? v[1] : null;
      }
      list.push({ ...need, for_stage: Number(need.for_stage), at_least: Number(need.at_least) });
    }
    out.set(Number(own[1]), list);
  }
  return out;
}

function carriesIn(text) {
  const out = new Map();
  for (const m of text.matchAll(/^  - id:\s*(\S+)\s*$([\s\S]*?)(?=^  - id:|^[a-z_]+:|(?![\s\S]))/gm)) {
    const own = /^ {4}stage:\s*"?(\d)"?\s*$/m.exec(m[2]);
    const blk = /^ {4}carries:\s*$([\s\S]*?)(?=^ {0,4}[a-z_]+:|(?![\s\S]))/m.exec(m[2]);
    if (!own || !blk) continue;
    const list = [];
    for (const e of blk[1].matchAll(/^ {6}-\s*\{\s*label:\s*([^,}]+?)\s*,\s*cs:\s*([^,}]+?)\s*,\s*from:\s*([\w.]+)\s*\}\s*$/gm))
      list.push({ label: e[1], cs: e[2], from: e[3] });
    out.set(Number(own[1]), list);
  }
  return out;
}

export function factOrigin(from) {
  const [src] = String(from).split('.');
  if (src === 'A1') return { stage: 1, where: 'the brief', task: 'SPOCK: send a stage back to be redone' };
  if (src === 'A4') return { stage: 2, where: 'the prioritisation', task: 'SPOCK: send a stage back to be redone' };
  if (src === 'G4') return { stage: 4, where: 'the choice at stage 4', task: 'SPOCK: record a decision I made' };
  if (src === 'G5') return { stage: 5, where: 'the choice at stage 5', task: 'SPOCK: record a decision I made' };
  return { stage: null, where: src, task: 'SPOCK: record a decision I made' };
}
const NOT_KNOWN = { en: 'not known (the brief records it as unknown)', cs: 'neznámé (zadání to uvádí jako neznámé)' };
const SEND_BACK_WORDS = /^Ended stage \d+'s acceptance and returned it to its skill:/;

export function carriedFacts(dir, stage, { contracts = null, lang = null } = {}) {
  const c = contracts || readContracts();
  let state = {};
  try { state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md') || {}; } catch { state = {}; }
  const language = lang || runLanguageOf(dir);
  const fmOf = new Map();
  const heads = id => {
    if (fmOf.has(id)) return fmOf.get(id);
    const a = runArtifacts(dir).find(x => x.id === id);
    const list = [];
    for (const f of [...(a ? [a.abs] : []), ...recordsFor(dir, id).map(r => r.abs)]) {
      try { list.push(frontmatter(readFileSync(f, 'utf8'), f) || {}); } catch {  }
    }
    fmOf.set(id, list);
    return list;
  };
  const text = v => (Array.isArray(v) ? v.map(x => (x && typeof x === 'object' ? String(x.id ?? '').trim() : String(x ?? '').trim())).filter(Boolean).join(', ')
    : v && typeof v === 'object' ? '' : String(v ?? '').trim());
  const facts = [];
  for (const d of (c.carries && c.carries.get(Number(stage))) || []) {
    const origin = factOrigin(d.from);
    const [src, field, sub] = String(d.from).split('.');
    let value = '';
    if (src === 'G4') {
      const a9 = runArtifacts(dir).find(x => x.id === 'A9');
      value = chosenSolution(dir, state, { gate: 'G4', ...(a9 ? { text: readFileSync(a9.abs, 'utf8') } : {}) }).id || '';
    }
    else if (src === 'G5') value = chosenOption(state) || '';
    else {
      const unknown = new Set();
      for (const fm of heads(src)) {
        for (const u of Array.isArray(fm.unknowns) ? fm.unknowns : []) if (u && u.field) unknown.add(String(u.field));
        const v = fm[field];
        if (v === undefined || v === null || value) continue;
        if (field === 'screening_inputs' && Array.isArray(v)) value = text((v.find(x => x && String(x.input) === sub) || {}).value);
        else if (sub && Array.isArray(v)) value = v.map(x => text(x && x[sub])).filter(Boolean).join(', ');
        else value = text(v);
      }
      if (src === 'A4' && value && value !== (NOT_KNOWN[language] || NOT_KNOWN.en)) {
        const shown = opportunityShown(dir, language);
        value = value.split(', ').map(shown).join(', ');
      }
      if (src === 'A1' && unknown.has(sub || field)) value = NOT_KNOWN[language] || NOT_KNOWN.en;
    }
    if (!value) continue;
    facts.push({ label: d.label, cs: d.cs, from: d.from, value, ...origin });
  }
  const changes = ((state && state.decisions) || [])
    .filter(x => x && String(x.kind) === 'direction' && !x.superseded_by && Number(x.stage) <= Number(stage)
      && !SEND_BACK_WORDS.test(String(x.what || '')))
    .map(x => ({ stage: Number(x.stage), at: String(x.at || ''), what: String(x.what || '').trim() }));
  return { facts, changes };
}
export function opportunityShown(dir, lang = null) {
  if (!buildAtLeast(recordedBuild(dir), OPPORTUNITY_SHOWN_BUILD)) return id => String(id);
  const yours = (lang || runLanguageOf(dir)) === 'cs' ? 'vaše' : 'yours';
  const shown = new Map();
  const a = runArtifacts(dir).find(x => x.id === 'A3b');
  for (const f of [...(a ? [a.abs] : []), ...recordsFor(dir, 'A3b').map(r => r.abs)]) {
    let fm;
    try { fm = frontmatter(readFileSync(f, 'utf8'), f) || {}; } catch { continue; }
    for (const o of Array.isArray(fm.opportunities) ? fm.opportunities : []) {
      const id = o && typeof o === 'object' ? String(o.id ?? '').trim() : '';
      if (!id || shown.has(id)) continue;
      const from = String(o.from ?? '').trim();
      if (String(o.origin || '').trim().toLowerCase() === 'person') shown.set(id, `${id} (${yours})`);
      else if (from) shown.set(id, `${id} (${from})`);
    }
  }
  return id => shown.get(String(id).trim()) || String(id);
}

export function chosenOption(state) {
  const s = standingChoices(state, 5).filter(d => selectedId(d.selection));
  return s.length ? selectedId(s[s.length - 1].selection) : null;
}
function runLanguageOf(dir) { try { return runLanguage(dir) === 'cs' ? 'cs' : 'en'; } catch { return 'en'; } }

export const NEED_MEASURES = {
  prioritised_opportunities(dir) {
    const a = runArtifacts(dir).find(x => x.id === 'A4');
    if (!a) return null;
    let p, s;
    for (const f of [a.abs, ...recordsFor(dir, 'A4').map(r => r.abs)]) {
      let fm;
      try { fm = frontmatter(readFileSync(f, 'utf8'), f); } catch { continue; }
      if (p === undefined && Array.isArray(fm.primary)) p = fm.primary;
      if (s === undefined && Array.isArray(fm.secondary)) s = fm.secondary;
    }
    if (p === undefined && s === undefined) return null;
    const idOf = x => String((x && typeof x === 'object' ? x.id : x) ?? '').trim();
    return [...new Set([...(p || []), ...(s || [])].map(idOf).filter(Boolean))];
  },
};

export function nextStageNeeds(contracts, stage, dir) {
  const c = contracts || readContracts();
  return ((c.needs && c.needs.get(Number(stage))) || []).map(n => {
    const measure = NEED_MEASURES[n.measure];
    if (!measure) throw new Error(`contracts: stage ${stage}'s need ${n.id} names the measure ${n.measure}, which NEED_MEASURES does not have`);
    const ids = measure(dir);
    const have = ids ? ids.length : null;
    return { id: n.id, for_stage: n.for_stage, have, ids: ids || [], at_least: n.at_least,
             short: have !== null && have > 0 && have < n.at_least, when_short: n.when_short };
  });
}

const COUNT_WORD = ['none', 'one', 'two', 'three'];
const NEED_WORDING = {
  'three-prioritised-opportunities': (ids, form) => {
    const listed = ids.join(', ');
    if (form === 'approval')
      return [`Recorded with the heads-up above: stage 4's three solutions will share ${ids.length === 1 ? ids[0] : `${ids.slice(0, -1).join(', ')} and ${ids[ids.length - 1]}`}.`];
    const open = form === 'gate' ? 'Heads-up:' : 'Heads-up before you approve:';
    const head = `${open} stage 4 forms three solutions from the opportunities prioritised here, and this run prioritises ` +
      `${COUNT_WORD[ids.length] || ids.length} (${listed}).`;
    return [ids.length === 1
      ? `${head} All three solutions will address ${ids[0]} and differ in how they do it, not in which opportunities they take on. ` +
        'You can approve as it is. For solutions that differ in what they address, ask the agent to promote more opportunities first.'
      : `${head} Two solutions can differ in which opportunity they address; the third will share an opportunity with one of them. ` +
        'You can approve as it is. For three solutions that each differ in what they address, ask the agent to promote a third opportunity first.'];
  },
};
export function needLines(needs, form) {
  return (needs || []).filter(n => n.short && n.when_short === 'warn' && NEED_WORDING[n.id])
    .flatMap(n => NEED_WORDING[n.id](n.ids, form));
}

export function parkedArtifacts(file = '.github/registry/skills.yaml') {
  const out = new Map();
  if (!existsSync(file)) return out;
  const text = workflowText(file);
  for (const m of text.matchAll(/^  - id: (\S+)([\s\S]*?)(?=^  - id: |(?![\s\S]))/gm)) {
    const body = m[2];
    if (!/^\s*status:\s*parked\s*(#.*)?$/m.test(body)) continue;
    const reason = key => {
      const r = new RegExp(`^[^\\S\\n]*${key}:[^\\S\\n]*(.+?)[^\\S\\n]*$`, 'm').exec(body);
      return r ? r[1] : '';
    };
    const why = { en: reason('parked_reason'), cs: reason('parked_reason_cs') };
    const pr = /^\s*produces:\s*\[([^\]]*)\]\s*(#.*)?$/m.exec(body);
    for (const id of (pr ? pr[1].split(',') : []).map(x => x.trim()).filter(Boolean)) out.set(id, why);
  }
  return out;
}

export function owedAt(stage, c = readContracts(), ran = null, parked = parkedArtifacts(), status = undefined) {
  const all = [...(c.produces.get(Number(stage)) || [])];
  const due = id => { const s0 = c.since.get(id); return !s0 || !ran || String(ran) >= s0; };
  const owed = all.filter(id => due(id) && !parked.has(id));
  const excused = all.filter(id => due(id) && parked.has(id));
  if (status === undefined || status === null) return { owed, excused };
  const later = id => {
    const w = WAITS_ON_A_PERSON[id];
    return Boolean(w) && w.after === 'approval' && Number(w.stage) === Number(stage) && String(status) !== 'accepted';
  };
  return { owed: owed.filter(id => !later(id)), excused, atAcceptance: owed.filter(later) };
}

export function standing(state, have, c = readContracts(), parked = parkedArtifacts()) {
  const stages = ((state && state.stages) || []).map(s => ({ ...s, id: Number(s.id) })).sort((a, b) => a.id - b.id);
  const st = stages.find(s => s.status !== 'accepted');
  if (!st) return { stage: null, status: 'complete', gate: null, pending: [], owed: [], agent: [], person: [], later: [], excused: [], atAcceptance: [] };
  const n = st.id;
  const ran = (st.quality_gate && st.quality_gate.run_at)
    || (recordedDecisions(st)[0] || {}).decided_at
    || (state && (state.updated_at || state.created_at)) || null;
  const { owed, excused, atAcceptance = [] } = owedAt(n, c, ran, parked, st.status);
  const onDisk = id => [...((have && have.values()) || [])].some(set => set && set.has(id));
  const signed = new Set(recordedDecisions(st).map(d => d.id));
  const pending = decisionsFor(n).filter(id => !signed.has(id));
  const agent = [], person = [], later = [];
  for (const id of owed) {
    if (onDisk(id)) continue;
    const w = WAITS_ON_A_PERSON[id];
    if (!w || Number(w.stage) !== n || (personActed(state, id) && w.writer !== 'workflow')) agent.push(id);
    else if (!onDisk(w.from)) later.push({ id, from: w.from, why: w.why });
    else person.push({ id, after: w.after, why: w.why });
  }
  return { stage: n, status: st.status, gate: (GATES[n] || {}).quality || null, pending, owed, agent,
           person: agent.length ? [] : person, later, excused, atAcceptance };
}

export function upstreamStages(stage, c = readContracts()) {
  const out = new Map();
  for (const id of c.requires.get(Number(stage)) || []) {
    const from = c.producedBy.get(id);
    if (from === undefined || from === Number(stage)) continue;
    if (!out.has(from)) out.set(from, []);
    out.get(from).push(id);
  }
  return new Map([...out].sort((a, b) => a[0] - b[0]));
}

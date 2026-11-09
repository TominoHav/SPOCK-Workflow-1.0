import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, existsSync } from 'node:fs';
import { join, basename, sep } from 'node:path';
import { BLOCKS, STAGES, BOXES, NEEDS, DOCS, THINGS, GRAMMAR, RESTS, czechQuestion, render, shownDate } from './fixed-messages.mjs';
import { CLOSING, judgeBlock, openingAt } from './doc-structure.mjs';
import { runArtifacts, runLanguage, STAGE_DIRS, SUPPLIED_DIR } from './run-files.mjs';
import { suppliedFiles } from './material.mjs';
import { listedFiles } from './market-material.mjs';
import { readContracts, parkedArtifacts } from './contracts.mjs';
import { recordedDecisions, GATES, decisionsFor, questionsFor, choiceSet, WAITS_ON_A_PERSON, PERSON_TASK, signedChecks } from './gates.mjs';
import { resolveRole } from './decision-block.mjs';
import { frontmatter, fenceAt } from './yaml.mjs';
import { expected as readingCopies } from './reading-copy.mjs';
import { BOXES as TASK_BOXES } from './boxes.mjs';   // r1.16 · R16-1: the run id box's own example, as the task shows it

export const CONDITIONS = ['needs', 'nextNeeds', 'market', 'decision', 'sameAgent', 'readingCopy', 'jiraWaits', 'parked', 'exceptions',
  'lastDecision', 'nothingOutstanding', 'questions', 'set', 'gaps', 'prd', 'choice', 'finding', 'opening', 'onlyChosen', 'listSupplied'];
export const LISTS = ['need', 'box', 'parked', 'exception', 'question', 'item', 'gap', 'judge', 'file'];
export const FILLS = ['agent', 'stage', 'Stage', 'purpose', 'work', 'turns', 'thing', 'Thing', 'path', 'run', 'runName', 'supplied',
  'next', 'nextPurpose', 'nextAsk', 'nextAgent', 'task', 'n', 'k', 'box', 'need', 'parked', 'exception', 'gate', 'name', 'role',
  'date', 'initiative', 'readingCopy', 'reason', 'rests', 'question', 'example', 'bare', 'id', 'heading', 'item', 'gap', 'finding',
  'judge', 'them', 'nq', 'things', 'qword', 'act3', 'stageName', 'file'];
export const MOMENTS = { opening: ['Z53-M1'], market: ['Z53-S3'], review: ['Z53-M2', 'Z53-M3'], waiting: ['Z53-M4a'],
  prdLast: ['Z53-M4b'], accepted: ['Z53-M4c'], finished: ['Z53-M6'] };
export const WRAP = {
  open: 'Message to send, as it stands:',
  close: 'End of message.',
  signature: 'Send this once they have said they approve:',
  otherApprover: 'Only if they have said someone else will approve this stage, send this too:',
  changes: 'Only if they asked for changes during this stage, before the document was written or by sending it back after reading it, send this too, with each change on a line of its own, in their words:',
};

const block = id => BLOCKS.find(b => b.id === id);
const stageRow = n => STAGES.find(s => s.stage === Number(n)) || null;

export function agentName(id) {
  const f = join('.github', 'registry', 'agents.yaml');
  if (!id || !existsSync(f)) return null;
  const re = new RegExp(`^\\s*- id:\\s*${id}\\s*$([\\s\\S]*?)(?=^\\s*- id:|^[a-z_]+:)`, 'm');
  const m = re.exec(workflowText(f));
  return m ? (/^\s*name:\s*"?([^"\n#]+?)"?\s*$/m.exec(m[1]) || [])[1] || null : null;
}

export const docName = (id, lang) => (DOCS[id] ? DOCS[id][lang] || DOCS[id].en : null);

export const messageLanguage = dir => (dir ? (runLanguage(dir) === 'cs' ? 'cs' : 'en') : null);

function fillText(text, vals) {
  const missing = [];
  const out = String(text).replace(/\{([^{}]*)\}/g, (m, k) => {
    const v = vals[k];
    if (v === undefined || v === null || String(v).trim() === '') { missing.push(k); return m; }
    return String(v);
  });
  return { out, missing };
}

export function compose(id, lang, ctx, part = null) {
  const b = block(id);
  if (!b) return { missing: `${id} is not in the table` };
  const holds = w => (w === undefined ? true : String(w).startsWith('!') ? !ctx.conds[String(w).slice(1)] : !!ctx.conds[w]);
  const rows = [];
  const kept = b.rows.filter(r => (r.part || null) === part && holds(r.when));
  for (let g = 0; g < kept.length;) {
    let e = g + 1;
    while (kept[g].each && e < kept.length && kept[e].each === kept[g].each) e++;
    const group = kept.slice(g, e);
    const members = kept[g].each ? (ctx.lists[kept[g].each] || []) : [null];
    for (const [i, m] of members.entries())
      for (const r of group) {
        const vals = { ...ctx.vals, k: i + 1, ...(m === null ? {} : typeof m === 'object' ? m : { [r.each]: m }) };
        const f = fillText(lang === 'cs' ? r.cs : r.en, vals);
        if (f.missing.length) return { missing: `${id} needs {${f.missing[0]}}, which ${ctx.why[f.missing[0]] || 'this moment does not supply'}` };
        rows.push({ en: f.out, cs: f.out, starts: r.starts });
      }
    g = e;
  }
  if (!rows.length) return { text: '' };
  rows[0] = { ...rows[0], starts: undefined };
  return { text: render(id, 'en', [{ id, rows }]) };
}

const stateOf = dir => (dir && existsSync(join(dir, 'RUN-STATE.md')) ? frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md') : {});
const artifactPath = (dir, id) => { const a = dir ? runArtifacts(dir).find(x => x.id === id) : null; return a ? join(dir, a.rel) : null; };

export function boxList(kind, lang, { person = null, asks = 0, stands = false } = {}) {
  const pick = r => r[lang] || r.en;
  const hint = (key, v) => (v ? `. ${pick(BOXES[key]).replace(`{${key === 'nameOnRecord' ? 'name' : 'role'}}`, v)}` : '');
  if (kind === 'approval') {
    const [nameBox, roleBox, answersBox, askedBox] = BOXES.approval;
    return [pick(nameBox) + hint('nameOnRecord', person && person.name), pick(roleBox) + hint('roleOnRecord', person && person.role),
      !asks ? pick(BOXES.noQuestions) : stands ? pick(BOXES.answersStand) : pick(answersBox), pick(askedBox)].map(box => ({ box }));
  }
  if (kind === 'choice') {
    const b = BOXES.choice.map(pick);
    b[3] += hint('nameOnRecord', person && person.name);
    b[4] += hint('roleOnRecord', person && person.role);
    return b.map(box => ({ box }));
  }
  return (BOXES[kind] || []).map(r => ({ box: pick(r) }));
}

function contextFor(dir, moment, lang, opts) {
  const n = Number(opts.stage);
  const contracts = opts.contracts || readContracts();
  const s = stageRow(n);
  const who = k => (contracts.agents.get(k) || [])[0] || null;
  const pick = v => (v ? v[lang] || v.en : null);
  const vals = {}, conds = {}, lists = {}, why = {};
  vals.agent = agentName(who(n));
  why.agent = `the registry names no agent carrying stage ${n}`;
  if (s) Object.assign(vals, { stage: pick(s.carry), Stage: pick(s.Stage), purpose: pick(s.purpose), work: pick(s.work), turns: pick(s.turns), thing: pick(s.thing) });
  if (dir) Object.assign(vals, { run: dir, runName: basename(dir) });
  if (dir && n >= 1 && n <= STAGE_DIRS.length) vals.supplied = join(dir, STAGE_DIRS[n - 1], SUPPLIED_DIR) + sep;
  why.run = why.runName = why.supplied = 'no run is open';
  conds.market = n === 3;
  lists.file = n === 3 && dir ? listedFiles(join(dir, STAGE_DIRS[2], SUPPLIED_DIR)) : [];
  conds.listSupplied = lists.file.length > 0;
  const material = !!dir && !suppliedFiles(dir).length;
  const noRun = n === 1 && !dir;
  conds.needs = (n === 2 && material) || noRun;
  conds.nextNeeds = n + 1 === 2 && material;
  if (conds.needs || conds.nextNeeds) lists.need = [noRun ? fillText(pick(NEEDS.run), { example: TASK_BOXES.runId.example }).out
    : fillText(pick(NEEDS.material), { supplied: join(dir, STAGE_DIRS[1], SUPPLIED_DIR) + sep }).out];
  conds.decision = !!opts.decision;
  conds.onlyChosen = moment === 'waiting' && opts.task === PERSON_TASK.choice
    && Object.values(WAITS_ON_A_PERSON).some(w => Number(w.stage) === n && w.after === 'choice');
  if (opts.path) vals.path = opts.path;
  if (opts.document && docName(opts.document, lang)) vals.thing = docName(opts.document, lang);
  why.path = 'the document it is about is not on disk';
  if (opts.task) vals.task = opts.task;
  if (opts.boxes) {
    lists.box = opts.boxes; vals.n = opts.boxes.length;
    vals.things = THINGS[vals.n === 1 ? 0 : vals.n < 5 ? 1 : 2][lang];
  }
  const next = stageRow(n + 1);
  if (next) {
    Object.assign(vals, { next: pick(next.name), nextPurpose: pick(next.purpose), nextAsk: pick(next.ask), nextAgent: agentName(who(n + 1)) });
    why.nextAgent = `the registry names no agent carrying stage ${n + 1}`;
    conds.sameAgent = !!who(n) && who(n) === who(n + 1);
  }
  if (moment === 'review') Object.assign(ctx0(vals, conds, lists, why), reviewContext(dir, n, lang, opts, vals, conds, lists, why, s));
  if (moment === 'waiting' && opts.questions) questionContext(dir, n, lang, stageOf(dir, n), conds, vals, lists);
  if (moment === 'finished') {
    const state = stateOf(dir);
    vals.initiative = artifactPath(dir, 'A14');
    why.initiative = 'the initiative is not on disk';
    const copy = dir ? readingCopies(dir).map(c => join(dir, c.rel)).find(p => existsSync(p)) : null;
    if (copy) { vals.readingCopy = copy; conds.readingCopy = true; }
    const parked = parkedArtifacts();
    const jira = parked.get('A15');
    if (jira) { vals.reason = jira[lang] || jira.en; conds.jiraWaits = !!vals.reason; }
    lists.parked = [...parked.entries()].filter(([id]) => id !== 'A15').map(([, w]) => w[lang] || w.en).filter(Boolean);
    conds.parked = lists.parked.length > 0;
    lists.exception = ((state && state.decisions) || []).filter(d => d && String(d.kind) === 'exception' && !d.superseded_by && String(d.reason || '').trim())
      .map(d => { const ids = signedChecks(d), many = ids.length > 1;
        return lang === 'cs'
          ? `${many ? 'Kontroly' : 'Kontrola'} ${ids.join(', ')}, ${many ? 'podepsané' : 'podepsaná'} ve fázi ${d.stage}, s odůvodněním: „${String(d.reason).trim()}“`
          : `${ids.join(', ')}, signed off at stage ${d.stage}, for this reason: "${String(d.reason).trim()}"`; });
    conds.exceptions = lists.exception.length > 0;
    const seventh = ((state && state.stages) || []).find(x => Number(x.id) === 7);
    const last = recordedDecisions(seventh).filter(d => d && String(d.decided_by || '').trim()).pop();
    if (last) {
      Object.assign(vals, { gate: last.id, name: String(last.decided_by).trim(), date: shownDate(String(last.decided_at || '').trim()),
        role: resolveRole(state, seventh, last.decided_by) || '' });
      conds.lastDecision = !!(vals.gate && vals.name && vals.date && vals.role);
    }
    conds.nothingOutstanding = !jira && !conds.parked && !conds.exceptions;
  }
  Object.assign(conds, opts.conds || {});
  Object.assign(lists, opts.lists || {});
  Object.assign(vals, opts.vals || {});
  return { vals, conds, lists, why };
}

const ctx0 = x => x || {};
const stageOf = (dir, n) => (((stateOf(dir) || {}).stages) || []).find(x => Number(x.id) === Number(n)) || {};
function bodyOf(path) {
  if (!path || !existsSync(path)) return '';
  const lines = readFileSync(path, 'utf8').replace(/^\ufeff/, '').split(/\r?\n/);
  const end = String(lines[0]).trim() === '---' ? fenceAt(lines) : -1;
  return (end === -1 ? lines : lines.slice(end + 1)).join('\n');
}
export function findingOf(body) {
  const blocks = String(body).split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  const i = blocks.findIndex(b => /^# /.test(b));
  const next = blocks[i + 1];
  return next && !/^(#|\||- |\* |> |```|<!--)/.test(next) ? next.replace(/\s*\n\s*/g, ' ') : null;
}
export function gapsOf(body) {
  const names = CLOSING.filter(c => c.id === 'could_not_establish').flatMap(c => [c.heading, c.cs]);
  const lines = String(body).split('\n');
  const at = lines.findIndex(l => names.some(n => new RegExp(`^##\\s+${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`).test(l.trim())));
  if (at === -1) return [];
  let end = lines.findIndex((l, i) => i > at && /^#{1,2}\s/.test(l));
  const section = lines.slice(at + 1, end === -1 ? lines.length : end).join('\n');
  const rule = b => /^(?:[-*_]\s*){3,}$/.test(b);
  const items = [...section.matchAll(/^\s*[-*]\s+(.+)$/gm)].map(m => m[1].trim()).filter(x => !rule(x));
  return items.length ? items : section.split(/\n\s*\n/).map(b => b.trim().replace(/\s*\n\s*/g, ' ')).filter(b => b && !/^(#|\|)/.test(b) && !rule(b));
}
export function setMembers(dir, n) {
  const strip = (id, h) => String(h || '').replace(new RegExp(`^${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[:·.—-]?\\s*`), '').trim();
  if (Number(n) === 2) {
    const a = runArtifacts(dir).find(x => x.id === 'A3b');
    return a ? [...bodyOf(join(dir, a.rel)).matchAll(/^##\s+(O\d+)\s*[:·.—-]?\s*(.*)$/gm)].map(m => ({ id: m[1], heading: m[2].trim() })) : [];
  }
  const set = [4, 5].includes(Number(n)) ? choiceSet(dir, n) : null;
  return (set || []).map(x => ({ id: x.id, heading: strip(x.id, x.heading) || x.id }));
}
function reviewContext(dir, n, lang, opts, vals, conds, lists, why, s) {
  const state = stateOf(dir);
  const st = ((state && state.stages) || []).find(x => Number(x.id) === n) || {};
  const body = bodyOf(opts.path);
  vals.Thing = vals.thing && lang === 'en' ? vals.thing[0].toUpperCase() + vals.thing.slice(1) : vals.thing;
  const at = openingAt(body), lines = String(body).split('\n');
  vals.finding = findingOf(at ? [...lines.slice(0, at.from), ...lines.slice(at.to + 1)].join('\n') : body); conds.finding = !!vals.finding;
  lists.gap = gapsOf(body); conds.gaps = lists.gap.length > 0;
  lists.judge = judgeBlock(body, lang).map(l => l.replace(/^[-*]\s+/, '').trim()).filter(l => l && !l.startsWith('[[fill:'));
  conds.opening = lists.judge.length > 0;
  vals.rests = RESTS[n] ? RESTS[n][lang] || RESTS[n].en : null;
  why.rests = `the table gives stage ${n} nothing it rests on`;
  conds.prd = n === 6;
  const steps = opts.steps || [];
  conds.choice = steps.some(x => x.kind === 'choice');
  if (steps[0] && steps[0].kind === 'approval') questionContext(dir, n, lang, st, conds, vals, lists);
  if (steps[0]) Object.assign(vals, { task: steps[0].task, act3: GRAMMAR.act3[steps[0].kind][lang], n: steps[0].boxes.length }), lists.box = steps[0].boxes;
  vals.stageName = s ? s.name[lang] || s.name.en : null;
  return {};
}

function questionContext(dir, n, lang, st, conds, vals, lists) {
  const gate = (GATES[n] || {}).quality;
  const qs = gate && decisionsFor(n).length ? questionsFor(gate, st.quality_gate && st.quality_gate.run_at) : [];
  const jh = st.judged_half;
  if (!qs.length || (jh && Array.isArray(jh.verdicts) && jh.verdicts.length)) return;
  const k = qs.length, form = k === 1 ? 0 : k < 5 ? 1 : 2;
  conds.questions = true;
  Object.assign(vals, { nq: k, qword: GRAMMAR.qword[form][lang], them: GRAMMAR.them[form][lang],
    example: qs.map((_, i) => `${i + 1}${['y', '?', 'n'][i % 3]}`).join(' '), bare: qs.map((_, i) => ['y', '?', 'n'][i % 3]).join(' ') });
  lists.question = qs.map(q => ({ question: (lang === 'cs' && q.plain && czechQuestion(q.text)) || q.text }));
  lists.item = [2, 4, 5].includes(n) ? setMembers(dir, n) : [];
  conds.set = lists.item.length > 0;
}

export function messageFor(dir, moment, opts = {}) {
  const ids = MOMENTS[moment];
  if (!ids) return { none: `${moment} is not a moment this workflow prints a message for` };
  const langs = dir ? [messageLanguage(dir)] : ['en', 'cs'];
  const parts = [];
  const heads = { 'Z53-M3': WRAP.signature };
  for (const id of ids) {
    const texts = [], others = [];
    for (const lang of langs) {
      const ctx = contextFor(dir, moment, lang, opts);
      const c = compose(id, lang, ctx);
      if (c.missing) return { none: c.missing };
      if (c.text) texts.push(c.text);
      const o = block(id).rows.some(r => r.part === 'otherApprover') ? compose(id, lang, ctx, 'otherApprover') : { text: '' };
      if (o.missing) return { none: o.missing };
      if (o.text) others.push(o.text);
    }
    if (texts.length) parts.push({ head: heads[id] || WRAP.open, text: texts.join('\n\n') });
    if (others.length) parts.push({ head: WRAP.otherApprover, text: others.join('\n\n') });
    const changes = [];
    for (const lang of langs) {
      if (!block(id).rows.some(r => r.part === 'changes')) break;
      const c = compose(id, lang, contextFor(dir, moment, lang, opts), 'changes');
      if (c.missing) return { none: c.missing };
      if (c.text) changes.push(c.text);
    }
    if (changes.length) parts.push({ head: WRAP.changes, text: changes.join('\n\n') });
  }
  return { lang: langs.length === 1 ? langs[0] : 'both', parts };
}

export function messageLines(dir, moment, opts = {}) {
  const m = messageFor(dir, moment, opts);
  if (m.none) return [`No message is printed for this moment: ${m.none}. Write the stop message yourself, as the shared rules give it.`];
  return m.parts.flatMap(p => ['', p.head, ...p.text.split('\n'), WRAP.close]);
}

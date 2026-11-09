import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync } from 'node:fs';
import { frontmatter } from './yaml.mjs';
import { buildAtLeast } from './derive.mjs';

export const q = v => {
  if (v === null || v === undefined) return "''";
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  const s = String(v);
  return /^[A-Za-z0-9][A-Za-z0-9 _.@\/-]*$/.test(s) && !s.includes(' #') ? s : JSON.stringify(s);
};

export function askedOn(text) {
  let fm = null;
  try { fm = frontmatter(String(text || ''), 'decision block'); } catch { return ''; }
  const d = fm && typeof fm === 'object' ? fm.decision : null;
  const v = d && typeof d === 'object' ? d.asked_before_approval : null;
  return v == null ? '' : String(v).trim();
}

export const roundsFor = (state, stageId) =>
  ((state && state.refinements) || []).filter(r => r && String(r.stage) === String(stageId));

export const PLACEHOLDER_ROLES = new Set(['accepted_the_stage', 'not stated']);
const realRole = v => { const s = String(v || '').trim(); return s && !PLACEHOLDER_ROLES.has(s) ? s : ''; };
export function resolveRole(state, stage, who) {
  const all = (state && state.decisions) || [];
  const here = all.filter(d => String(d.stage) === String(stage && stage.id));
  const mine = here.find(d => String(d.by || '') === String(who));
  if (mine && realRole(mine.role)) return realRole(mine.role);
  if (stage && stage.owner && realRole(stage.owner.role)) return realRole(stage.owner.role);
  const anywhere = all.filter(d => String(d.by || '') === String(who) && realRole(d.role));
  const last = anywhere[anywhere.length - 1];
  return last ? realRole(last.role) : recordedRole(state, who);
}

export function recordedRole(state, who) {
  const name = fold(who);
  if (!name || !state) return '';
  if (state.person && fold(state.person.name) === name && realRole(state.person.role)) return realRole(state.person.role);
  const seen = [];
  const take = (by, role, at) => { if (fold(by) === name && realRole(role)) seen.push({ at: String(at || ''), role: realRole(role) }); };
  for (const s of (state.stages || [])) {
    if (s && s.owner) take(s.owner.name, s.owner.role, s.owner.recorded_at || s.owner.at);
    if (s && s.judged_half) take(s.judged_half.by, s.judged_half.role, s.judged_half.recorded_at || s.judged_half.at);
  }
  for (const d of (state.decisions || [])) if (d) take(d.by, d.role, d.at);
  for (const r of (state.refinements || [])) if (r) take(r.by, r.role, r.at || r.recorded_at);
  let best = null;
  for (const x of seen) if (!best || x.at >= best.at) best = x;
  return best ? best.role : '';
}

export const PERSON_ROLE_BUILD = '1.14';

export function rolesOn(state) {
  const out = new Set();
  const take = v => { const s = String(v || '').trim(); if (s) out.add(s); };
  for (const d of (state && state.decisions) || []) take(d.role);
  for (const r of (state && state.refinements) || []) take(r.role);
  for (const s of (state && state.stages) || []) take(s.owner && s.owner.role);
  if (state && state.person && buildAtLeast(state.build, PERSON_ROLE_BUILD)) take(realRole(state.person.role));
  return out;
}

function editDistance(a, b) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 99;
  let prev = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++)
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = row;
  }
  return prev[b.length];
}

const SYNTHESISED = new Set(['not stated', 'accepted_the_stage', 'product manager']);
export function nearMissRole(role, known) {
  const r = String(role || '').trim();
  if (!r || SYNTHESISED.has(r) || known.has(r)) return '';
  if (!plain(r)) return '';
  if ([...known].some(k => fold(k) === fold(r))) return '';
  for (const k of known) {
    if (!plain(k) || fold(r) === fold(k)) continue;
    const d = editDistance(fold(r), fold(k));
    if (d >= 1 && d <= 2) return k;
  }
  return '';
}

export const fold = v => String(v || '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim();
const plain = v => /^[\x20-\x7e]*$/.test(String(v));

export function roleRendering(role, known) {
  const r = String(role || '').trim();
  if (!r || SYNTHESISED.has(r) || known.has(r)) return '';
  for (const k of known) {
    if (r.toLowerCase() === k.toLowerCase()) continue;
    if (fold(r) === fold(k)) return k;
    if (plain(r) && plain(k)) continue;
    const d = editDistance(fold(r), fold(k));
    if (d >= 1 && d <= 2) return k;
  }
  return '';
}

export function namesOn(state) {
  const out = new Set();
  const take = v => { const s = String(v || '').trim(); if (s) out.add(s); };
  for (const d of (state && state.decisions) || []) take(d.by);
  for (const r of (state && state.refinements) || []) take(r.by);
  for (const s of (state && state.stages) || []) {
    take(s.owner && s.owner.name);
    for (const g of (Array.isArray(s.decision_gates) ? s.decision_gates : s.decision_gate ? [s.decision_gate] : []))
      take(g && g.decided_by);
  }
  return out;
}

export function nearMissName(name, known) {
  const n = String(name || '').trim();
  if (!n || known.has(n)) return '';
  for (const k of known) {
    if (fold(n) === fold(k)) return k;
    if (fold(n).length < 5 || fold(k).length < 5) continue;
    const d = editDistance(fold(n), fold(k));
    if (d >= 1 && d <= 2) return k;
  }
  return '';
}

let AGENTS = null;
export function agentNamed(role) {
  if (AGENTS === null) {
    try {
      const text = workflowText(new URL('../registry/agents.yaml', import.meta.url));
      AGENTS = [...text.matchAll(/^  - id: (\S+)\n    name: (.+)$/gm)].map(m => ({ id: m[1], name: m[2].trim() }));
    } catch { AGENTS = []; }
  }
  const f = fold(role);
  const hit = AGENTS.find(a => f === fold(a.name) || f.replace(/[^a-z0-9]+/g, '-') === a.id);
  return hit ? hit.name : '';
}

export const GATE_ROLES = { G1: ['Product Manager'], G2: ['Researcher', 'Product Manager'], G4: ['Product Manager'],
                            G5b: ['Product Manager'], G6: ['Product Manager'], G7: ['Product Manager'] };
const PRODUCT_MANAGER_CS = ['Produktový manažer', 'Produktová manažerka', 'Product manažer', 'Product manažerka'].map(v => fold(v));

export function headsUps({ state, by, role, gates = [], stage = null, act = 'decision' }) {
  const out = [];
  const name = by ? nearMissName(by, namesOn(state)) : '';
  if (name)
    out.push(`Heads-up: the name "${String(by).trim()}" is recorded as typed, and this run already records "${name}". ` +
             `If that is the same person, correct it: open the command palette, choose "Tasks: Run Task", then pick ` +
             `"SPOCK: correct a name on the record". ` +
             (act === 'approval' ? 'The approval stands and is not run again.' : 'The decision stands and nothing is run again.'));
  const r = String(role || '').trim();
  if (!r || r === 'not stated' || r === 'accepted_the_stage') return out;
  const same = roleRendering(r, rolesOn(state));
  if (same)
    out.push(`Heads-up: the role "${r}" is recorded as typed, and this run already records "${same}". ` +
             `If they are the same role, type it the way the run spells it next time.`);
  const holds = w => editDistance(fold(r), fold(w)) <= 2
    || (fold(w) === fold('Product Manager') && PRODUCT_MANAGER_CS.includes(fold(r)));
  const agent = holds('Product Manager') ? '' : agentNamed(r);
  const missed = gates.filter(g => GATE_ROLES[g] && !GATE_ROLES[g].some(holds));
  const givesTo = g => `${g} to the ${GATE_ROLES[g].join(' or the ')}`;
  if (agent && missed.length)
    out.push(`Heads-up: the role "${r}" is the name of the ${agent} agent, and the Pilot Definition gives ` +
             `${missed.map(givesTo).join(', and ')}. It is recorded as typed.`);
  else {
    if (agent)
      out.push(`Heads-up: "${r}" is also the name of a workflow agent, ${agent}. It is recorded as a person's role.`);
    for (const g of missed)
      out.push(`Heads-up: the Pilot Definition gives ${givesTo(g)}, and this is recorded under the role "${r}", as typed.`);
  }
  const held = by ? recordedRole(state, by) : '';
  const pm = v => fold(v) === fold('Product Manager') || PRODUCT_MANAGER_CS.includes(fold(v));
  if (held && fold(held) !== fold(r) && !roleRendering(r, new Set([held])) && !(pm(held) && pm(r)))
    out.push(`Heads-up: this run records ${String(by).trim()} as ${held}, and this is recorded under ${r}, as typed.`);
  return out;
}

export function renderDecisionBlock({ gate, who, role, acceptedAt, selection, rounds = [], asked = '' }) {
  const lines = ['decision:', `  gate: ${q(gate)}`, '  by_agent: false'];
  if (selection) lines.push(`  selection: ${q(selection)}`);
  lines.push('  accepted_by:', `    - name: ${q(who)}`, `      role: ${q(role)}`,
             `  accepted_at: ${q(acceptedAt)}`,
             `  changed_during_refinement: ${q(rounds.length ? rounds.map(r => r.changed).join('; ') : 'none')}`);
  if (String(asked || '').trim()) lines.push(`  asked_before_approval: ${q(String(asked).trim())}`);
  if (!rounds.length) lines.push('  refinements: []');
  else {
    lines.push('  refinements:');
    for (const r of rounds) {
      lines.push(`    - what: ${q(r.what)}`, `      reason: ${q(r.reason)}`, `      changed: ${q(r.changed)}`,
                 `      by:`, `        name: ${q(r.by)}`, `        role: ${q(r.role)}`,
                 `      at: ${q(r.at)}`);
      if (r.amended_after) lines.push(`      amended_after: ${q(r.amended_after)}`);
    }
  }
  return lines;
}

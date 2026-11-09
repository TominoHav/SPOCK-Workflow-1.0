#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, posix, dirname } from 'node:path';
import { parseBlock } from './yaml.mjs';
import { SRC_DIR, declarations } from './know-how.mjs';

export const REGISTRY = join('.github', 'registry', 'regmap.yaml');
export const OUT = join('specifications', 'REGMAP.md');

const link = repoPath => posix.relative(dirname(OUT), repoPath);

export function load() {
  const [doc] = parseBlock(workflowText(REGISTRY).split('\n'), 0, 0);
  return doc;
}

function section(text, heading) {
  const start = text.indexOf(`\n## ${heading}`);
  if (start === -1) return '';
  const rest = text.slice(start + 1);
  const end = rest.indexOf('\n## ', 1);
  return end === -1 ? rest : rest.slice(0, end);
}

const ROWS = /^\| \*\*([A-Z]{1,2}-?\d+)\*\* \|/gm;
const count = s => [...s.matchAll(ROWS)].length;

export function counts(bodyRel) {
  const text = readFileSync(join(SRC_DIR, bodyRel), 'utf8');
  return {
    subDomains: count(section(text, '2. Sub-domains')),
    triggers: count(section(text, '3. Triggers')),
    touchpoints: count(section(text, '6. Product touchpoints')),
  };
}

export function readersOf(bodyRel) {
  const name = posix.basename(bodyRel);
  const out = [];
  for (const [skill, bodies] of declarations()) if (bodies.has(name)) out.push(skill);
  return out.sort();
}

const STATE = {
  in_force: 'in force',
  applies_from: 'applies from a fixed date',
  not_yet_law: '**not yet applicable law**',
  moving: '**moving**',
};

export function render() {
  const doc = load();
  const L = [];
  const areas = doc.areas || [];
  const regimes = doc.regimes || [];

  L.push('# RegMap — where regulation lives in this build');
  L.push('');
  L.push('**Generated. Do not edit.** `node .github/scripts/regmap.mjs --write`');
  L.push('');
  L.push(`**Registry:** [.github/registry/regmap.yaml](${link(REGISTRY)}) · ` +
         `**Date:** ${doc.date} · **Owner:** ${doc.owner}`);
  L.push('');
  L.push('> **What this is.** The signpost. Which regulatory areas exist, which knowledge body carries');
  L.push('> each, which dossier holds the evidence behind it, which skills read it, and which named');
  L.push('> regimes sit inside each area.');
  L.push('>');
  L.push('> **What this is not.** Not knowledge. Nothing here states an obligation, a threshold or a date');
  L.push('> a producer acts on. The area bodies do that.');
  L.push('');
  L.push('---');
  L.push('');

  const mech = doc.mechanism?.body;
  L.push('## The mechanism');
  L.push('');
  L.push(`Area-generic. How a description is screened, what the screen may say, how a complexity value is`);
  L.push(`formed, when an escalation flag fires, and what a producer must do with the result.`);
  L.push('');
  L.push(`| Body | Read by |`);
  L.push(`|---|---|`);
  L.push(`| [${posix.basename(mech)}](${link(posix.join(SRC_DIR, mech))}) | ${readersOf(mech).join(' · ') || '**nobody**'} |`);
  L.push('');
  L.push('---');
  L.push('');

  L.push('## The four areas');
  L.push('');
  L.push('| | Area | Card | Sub-domains | Triggers | Touchpoints |');
  L.push('|---|---|---|---|---|---|');
  for (const a of areas) {
    const c = counts(a.body);
    L.push(`| **${a.id}** | ${a.name} | [${posix.basename(a.body)}](${link(posix.join(SRC_DIR, a.body))}) | ` +
           `${c.subDomains} | ${c.triggers} | ${c.touchpoints} |`);
  }
  const tot = areas.reduce((s, a) => {
    const c = counts(a.body);
    return { s: s.s + c.subDomains, t: s.t + c.triggers, p: s.p + c.touchpoints };
  }, { s: 0, t: 0, p: 0 });
  L.push(`| | **Total** | | **${tot.s}** | **${tot.t}** | **${tot.p}** |`);
  L.push('');
  L.push('### Evidence behind each card');
  L.push('');
  L.push('Read by no producer. It exists so a person can check where a statement on a card came from.');
  L.push('');
  L.push('| | Dossier | Also |');
  L.push('|---|---|---|');
  for (const a of areas) {
    const extra = a.transcript ? `transcript at [${posix.basename(a.transcript)}](${link(a.transcript)})` : '—';
    L.push(`| **${a.id}** | [${posix.basename(a.dossier)}](${link(a.dossier)}) | ${extra} |`);
  }
  L.push('');
  L.push('### Who reads what');
  L.push('');
  L.push('Joined from `.github/registry/skills.yaml`, never asserted here.');
  L.push('');
  L.push('| Body | Read by |');
  L.push('|---|---|');
  for (const a of areas) {
    const r = readersOf(a.body);
    L.push(`| ${posix.basename(a.body)} | ${r.join(' · ') || '**nobody — a body nothing reads**'} |`);
  }
  L.push('');
  for (const a of areas.filter(a => a.note)) L.push(`**${a.id}.** ${a.note}`, '');
  L.push('---');
  L.push('');

  L.push('## Not covered, and which of the two kinds');
  L.push('');
  L.push('**An area nobody chose to cover and an area we meant to cover and could not are different');
  L.push('facts.** Both appear so that silence is never mistaken for clearance.');
  L.push('');
  L.push('| | Not covered | Disposition | Why |');
  L.push('|---|---|---|---|');
  for (const x of doc.out_of_scope || [])
    L.push(`| **${x.id}** | ${x.name} | ${x.disposition === 'routed' ? '**Routed**' : '**Uncovered**'} | ${x.reason} |`);
  L.push('');
  L.push('---');
  L.push('');

  L.push('## The named regimes');
  L.push('');
  const byState = s => regimes.filter(r => r.state === s).length;
  L.push(`**${regimes.length} instruments.** ${byState('in_force')} in force, ` +
         `${byState('applies_from')} with a fixed future date, ${byState('not_yet_law')} not yet applicable ` +
         `law, ${byState('moving')} under revision.`);
  L.push('');
  L.push('**Pointers, not summaries.** What a regime requires is on the area body; why it says so is in the');
  L.push('dossier. `state` is the column to scan.');
  L.push('');
  L.push('| | Regime | Citation | National | Areas | State | Date |');
  L.push('|---|---|---|---|---|---|---|');
  for (const r of regimes) {
    const where = (r.areas && r.areas.length) ? r.areas.join(', ') : `*${r.out_of_scope || 'none'}*`;
    const when = r.applies ? `applies ${r.applies}` : (r.since ? `since ${r.since}` : '—');
    L.push(`| **${r.id}** | ${r.name} | ${r.citation} | ${r.national || '—'} | ${where} | ` +
           `${STATE[r.state] || r.state} | ${when} |`);
  }
  L.push('');
  L.push('### What is moving');
  L.push('');
  L.push('**The rows to check before quoting a date to anybody.**');
  L.push('');
  for (const r of regimes.filter(r => r.note && ['moving', 'not_yet_law', 'applies_from'].includes(r.state)))
    L.push(`- **${r.id} · ${r.name}** — ${r.note}`, '');
  L.push('---');
  L.push('');
  L.push('## Notes carried on regimes in force');
  L.push('');
  for (const r of regimes.filter(r => r.note && r.state === 'in_force'))
    L.push(`- **${r.id} · ${r.name}** — ${r.note}`, '');

  return L.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

export function drift() {
  const want = render();
  if (!existsSync(OUT)) return [`${OUT} does not exist and its registry does`];
  const have = readFileSync(OUT, 'utf8');
  if (have === want) return [];
  const w = want.split('\n'), h = have.split('\n');
  const n = Math.max(w.length, h.length);
  let i = 0;
  while (i < n && w[i] === h[i]) i++;
  const show = s => s === undefined ? '(end of file)' : `"${s.slice(0, 60)}"`;
  return [`${OUT} is not what the generator produces — first difference at line ${i + 1}: ` +
          `has ${show(h[i])}, generator produces ${show(w[i])}`];
}

export function joins() {
  const doc = load();
  const c = [];
  const ids = new Set((doc.areas || []).map(a => a.id));
  const outIds = new Set((doc.out_of_scope || []).map(x => x.id));

  const body = rel => existsSync(join(SRC_DIR, rel));
  const mech = doc.mechanism?.body;
  if (!mech) c.push('the registry names no mechanism body');
  else if (!body(mech)) c.push(`the mechanism names ${mech}, which is not in ${SRC_DIR}`);
  else if (!readersOf(mech).length) c.push(`${mech} is the mechanism and no skill binding declares it`);

  for (const a of doc.areas || []) {
    if (!body(a.body)) c.push(`${a.id} names ${a.body}, which is not in ${SRC_DIR}`);
    else if (!readersOf(a.body).length) c.push(`${a.id}'s body is on disk and no skill binding declares it — nothing reads it`);
    if (!existsSync(a.dossier)) c.push(`${a.id} names the dossier ${a.dossier}, which does not exist`);
    if (a.transcript && !existsSync(a.transcript)) c.push(`${a.id} names the transcript ${a.transcript}, which does not exist`);
    if (a.source !== 'cs_card' && a.source !== 'authored_here')
      c.push(`${a.id} declares source "${a.source}", which is neither cs_card nor authored_here — a reader cannot tell whose card it is`);
  }

  for (const r of doc.regimes || []) {
    for (const a of r.areas || []) if (!ids.has(a)) c.push(`${r.id} is filed under area ${a}, which the registry does not declare`);
    if (r.out_of_scope && !outIds.has(r.out_of_scope))
      c.push(`${r.id} points at out-of-scope entry ${r.out_of_scope}, which the registry does not declare`);
    if (!(r.areas || []).length && !r.out_of_scope)
      c.push(`${r.id} belongs to no area and names no out-of-scope entry — nothing would ever read it`);
    if (!STATE[r.state]) c.push(`${r.id} declares state "${r.state}", which is outside the closed set`);
    if (r.superseded_by && !(doc.regimes || []).some(x => x.id === r.superseded_by))
      c.push(`${r.id} is superseded by ${r.superseded_by}, which the registry does not carry`);
  }

  const declaredHere = new Set([mech, ...(doc.areas || []).map(a => a.body)].map(b => b && posix.basename(b)));
  for (const [skill, bodies] of declarations())
    for (const b of bodies)
      if (/^(area-|compliance-guidelines)/.test(b) && !declaredHere.has(b))
        c.push(`${skill} declares ${b}, a compliance body the RegMap does not signpost`);

  return c;
}

if (process.argv[1] && process.argv[1].endsWith('regmap.mjs')) {
  const problems = [...joins(), ...(process.argv.includes('--write') ? [] : drift())];
  if (process.argv.includes('--write')) {
    if (joins().length) {
      console.log('\nThe registry does not join. Writing a signpost from it would publish the gap:\n');
      for (const p of joins()) console.log(`  ${p}`);
      console.log('');
      process.exit(1);
    }
    writeFileSync(OUT, render());
    const doc = load();
    console.log(`\nwrote ${OUT} — ${doc.areas.length} areas, ${doc.regimes.length} regimes, ${doc.out_of_scope.length} uncovered.\n`);
  } else if (!problems.length) {
    console.log(`\n${OUT} is exactly what the generator produces, and the registry joins. Nothing to write.\n`);
  } else {
    console.log(`\n${problems.length} problem(s):\n`);
    for (const p of problems) console.log(`  ${p}`);
    console.log('');
    process.exit(1);
  }
}

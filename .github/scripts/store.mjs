#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { RUNS_ROOT, FIXTURES_ROOT, artifact as runArtifact, recordsFor } from './run-files.mjs';
import { join, resolve, dirname } from 'node:path';
import { unquote as unquoteYaml } from './yaml.mjs';
import { fileURLToPath } from 'node:url';

export const CORPUS_ROOT = join('.github', 'store', 'corpus');
export const ROOTS = [...new Set([FIXTURES_ROOT, CORPUS_ROOT, RUNS_ROOT])].filter(r => existsSync(r));
export const COMMITTED = [FIXTURES_ROOT, CORPUS_ROOT].filter(r => existsSync(r));
export const RUNS = FIXTURES_ROOT;
export const OUT = join('.github', 'store', 'S1-competitors.md');

export const OWNER = 'to be named by ČS';
export const VERSION = '0.1';
export const RETENTION_UNKNOWN =
  'no retention class is declared for competitor records anywhere in the design (§6.15 requires the field, ' +
  'nothing supplies the value) — carried as unknown rather than invented';

const unquote = v => unquoteYaml(v).trim();

function listOf(src, field) {
  const fm = (src.split(/^\ufeff?---\r?$/m)[1] || '').split(/\r?\n/);
  const out = [];
  for (let i = 0; i < fm.length; i++) {
    const m = fm[i].match(new RegExp(`^(\\s*)${field}:\\s*(\\[\\])?\\s*$`));
    if (!m || m[1].length) continue;
    if (m[2]) return [];
    let cur = null;
    for (let j = i + 1; j < fm.length; j++) {
      const line = fm[j];
      if (!line.trim()) continue;
      const indent = line.match(/^\s*/)[0].length;
      if (indent === 0) break;
      const item = line.trim().match(/^- ([A-Za-z_]\w*):\s*(.*)$/);
      if (item && indent === 2) { cur = {}; out.push(cur); cur[item[1]] = unquote(item[2]); continue; }
      const kv = line.trim().match(/^([A-Za-z_]\w*):\s*(.*)$/);
      if (kv && cur && indent === 4 && kv[2] !== '') cur[kv[1]] = unquote(kv[2]);
    }
    return out;
  }
  return out;
}

export function cardIn(src) {
  const fm = (src.split(/^\ufeff?---\r?$/m)[1] || '').split(/\r?\n/);
  const at = fm.findIndex(l => /^card:\s*$/.test(l));
  if (at === -1) return null;
  const card = {};
  for (let j = at + 1; j < fm.length; j++) {
    const line = fm[j];
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) break;
    const kv = line.trim().match(/^([A-Za-z_]\w*):\s*(.*)$/);
    if (kv && line.match(/^\s*/)[0].length === 2 && kv[2] !== '') card[kv[1]] = unquote(kv[2]);
  }
  return card.identity_key ? card : null;
}

export function participants(roots = ROOTS) {
  const byKey = new Map();
  const pairs = roots.flatMap(root =>
    readdirSync(root).filter(d => /^\d{4}-\d{2}-/.test(d)).sort().map(run => ({ root, run })));
  if (!pairs.length) return [];
  for (const { root: RUNS, run } of pairs) {
    const half = (id, key) => {
      const doc = runArtifact(join(RUNS, run), id);
      if (doc && new RegExp('^' + key + ':\\s*$', 'm').test(readFileSync(doc.abs, 'utf8'))) return doc;
      for (const r of recordsFor(join(RUNS, run), id))
        if (new RegExp('^' + key + ':\\s*$', 'm').test(readFileSync(r.abs, 'utf8'))) return r;
      return doc;
    };
    const a5e = half('A5', 'participants'), a6e = half('A6', 'cards');
    const a5 = a5e && a5e.abs, a6 = a6e && a6e.abs;
    if (!existsSync(a5)) continue;
    const cards = existsSync(a6) ? listOf(readFileSync(a6, 'utf8'), 'cards') : [];
    const confidential = c => String(c.confidential || '').trim().toLowerCase() === 'yes';
    const withheld = new Set(cards.filter(c => c.identity_key && confidential(c)).map(c => c.identity_key));
    const cardByKey = new Map(cards.filter(c => c.identity_key && !confidential(c)).map(c => [c.identity_key, c]));
    const cardSource = new Map();
    for (const r of recordsFor(join(RUNS, run), 'A6')) {
      const c = cardIn(readFileSync(r.abs, 'utf8'));
      if (c && confidential(c)) { withheld.add(c.identity_key); continue; }
      if (c && !cardByKey.has(c.identity_key)) { cardByKey.set(c.identity_key, c); cardSource.set(c.identity_key, r); }
    }

    for (const p of listOf(readFileSync(a5, 'utf8'), 'participants')) {
      if (!p.identity_key) continue;
      if (withheld.has(p.identity_key) && !cardByKey.has(p.identity_key)) continue;
      const card = cardByKey.get(p.identity_key) || null;
      const entry = byKey.get(p.identity_key) || {
        identity_key: p.identity_key, name: p.name, type: p.type,
        landscape_entry: null, card: null, researched_at: null, seen_in_runs: [], disagreements: [],
      };
      if (!entry.seen_in_runs.includes(run)) entry.seen_in_runs.push(run);

      for (const f of ['name', 'type'])
        if (p[f] && entry[f] && p[f] !== entry[f])
          entry.disagreements.push(`${f}: ${run} says "${p[f]}", an earlier run said "${entry[f]}"`);

      const beatsOnDate = card && card.researched_at
        && (!entry.researched_at || card.researched_at > entry.researched_at);

      const cardSrc = a6e || cardSource.get(p.identity_key) || null;
      if (beatsOnDate && cardSrc) {
        if (card.researched_at) entry.researched_at = card.researched_at;
        entry.card = `${run}/${cardSrc.rel}#${p.identity_key}`;
        entry.landscape_entry = `${run}/${a5e.rel}#${p.identity_key}`;
        if (p.name) entry.name = p.name;
        if (p.type) entry.type = p.type;
      }
      if (!entry.card) entry.landscape_entry = `${run}/${a5e.rel}#${p.identity_key}`;
      byKey.set(p.identity_key, entry);
    }
  }
  return [...byKey.values()].sort((a, b) => a.identity_key.localeCompare(b.identity_key));
}

export function render(roots = ROOTS) {
  const ps = participants(roots);
  const q = s => (/^[\w:.@/-]+$/.test(String(s)) ? String(s) : JSON.stringify(String(s)));
  const body = ps.length === 0 ? '  []' : ps.map(p => [
    `  - identity_key: ${q(p.identity_key)}`,
    `    name: ${q(p.name || 'unknown')}`,
    `    type: ${q(p.type || 'unknown')}`,
    `    landscape_entry: ${q(p.landscape_entry)}`,
    `    card: ${p.card ? q(p.card) : 'none'}`,
    `    researched_at: ${p.researched_at ? q(p.researched_at) : 'none'}`,
    `    material: research`,
    `    seen_in_runs:`,
    ...p.seen_in_runs.map(r => `      - ${q(r)}`),
    ...(p.disagreements.length ? ['    disagreements:', ...p.disagreements.map(d => `      - ${q(d)}`)] : []),
  ].join('\n')).join('\n');

  const withCards = ps.filter(p => p.card).length;
  return `---
artifact_id: S1
record: competitor-store
scope: shared
owner: ${JSON.stringify(OWNER)}
version: ${VERSION}
retention: unknown
retention_unknown_reason: ${JSON.stringify(RETENTION_UNKNOWN)}
generated_from: every committed run's Landscape Map (A5) and Competitor Cards (A6)
participants:
${body}
---

# S1 · Competitor store

**GENERATED. Do not edit this file.** Regenerate with \`node .github/scripts/store.mjs --write\`. C74
refuses it when it drifts from the runs it is derived from.

The cross-run memory §6.15 declares: consulted before any research, and what makes reuse visible rather
than silent. **It carries ${ps.length} participant(s) across the committed runs, ${withCards} of them with a card.**

## What to do with it

**Read it before researching a participant.** A participant already here whose \`researched_at\` is inside
the freshness threshold is reused rather than re-researched — **unless the person names it when stage 3
lists what it is about to reuse** — and it goes in the landscape map's \`reused[]\` with its
\`researched_at\` showing, so inherited research is never silent (C8). The thresholds are **180 days for a
direct participant and 365 for adjacent and substitute**.

**\`material\` reads \`research\` on every row and ranks nothing.** It read \`fabricated\` for a participant
seen only in the example runs until 23 September 2026, and that marking is about the customer material a
run carries rather than the competitor research it did, which was searched from public sources about real
institutions.

**\`card\` and \`landscape_entry\` come from one run.** A row carries the most recently researched card and
the landscape entry of that same run, so the two pointers cannot resolve into different pieces of research
about one participant; a row with no card carries the landscape entry of the last run that saw it.

**\`identity_key\` is the join and prose is not.** Two runs naming the same bank differently are one
participant when the keys match and two when they do not. Where two runs disagree about a participant's
name or type, this file carries the most recently researched value and records the disagreement rather
than resolving it quietly.

## What it cannot do

**It is current as of the last commit, not the last sentence.** Write-back during a conversation (§7.6)
extends a card inside the run's own A6; it reaches this file when a person keeps the run's competitors. That is the trade
for a store that cannot silently disagree with the runs it indexes.

## Governance

\`owner\` reads *${OWNER}*. Nobody from the pilot team is named: the store names its owner once
Česká spořitelna names the person who answers for what it accumulates (§6.15).
**\`retention\` is unknown and is carried as unknown.** §6.15 requires the field and no document in this
repository supplies the class, so it is marked with its reason rather than filled with a plausible value.
`;
}

export function drift() {
  if (!existsSync(OUT)) return `${OUT} is not on disk — the store is generated and must be committed`;
  return readFileSync(OUT, 'utf8') === render(COMMITTED) ? null
    : `${OUT} is not what the generator produces — regenerate with \`node .github/scripts/store.mjs --write\``;
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  if (process.argv.includes('--write')) {
    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(OUT, render(COMMITTED));
    console.log(`wrote ${OUT} — ${participants(COMMITTED).length} participant(s) from the committed corpus`);
  } else process.stdout.write(render());
}

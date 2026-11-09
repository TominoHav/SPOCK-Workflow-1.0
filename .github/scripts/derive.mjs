#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { RUNS_ROOT, openRuns, runLanguage, readText, stoppedRun, twoRunsRefusal, isFrame } from './run-files.mjs';
import { unquote } from './yaml.mjs';

const REGMAP = '.github/registry/regmap.yaml';
const INPUTS = '.github/registry/screening-inputs.yaml';
const CARDS = '.github/know-how';
const STAGE = '4-solutions';

const read = readText;

export function areas() {
  const t = read(REGMAP);
  const block = t.slice(t.indexOf('\nareas:'), t.indexOf('\n# ──', t.indexOf('\nareas:')));
  const out = [];
  for (const m of block.matchAll(/^  - id: (\w+)\n((?:    .*\n)*)/gm)) {
    const body = m[2];
    const f = k => (body.match(new RegExp(`^    ${k}:\\s*"?(.+?)"?\\s*$`, 'm')) || [])[1] || '';
    out.push({ id: m[1], name: f('name'), name_cs: f('name_cs'), body: f('body'), source: f('source') });
  }
  return out.filter(a => a.body);
}

export function areaNames(lang = 'en') {
  return areas().map(a => (lang === 'cs' && a.name_cs) || a.name);
}

export const COMPLIANCE_CS_BUILD = '1.3';

export function recordedBuild(dir) {
  const fm = (/^\ufeff?---\r?\n([\s\S]*?)\r?\n---/.exec(read(join(dir, 'RUN-STATE.md'))) || [])[1] || '';
  const m = fm.match(/^build:[ \t]*(.*?)[ \t]*$/m);
  return m ? String(unquote(m[1]) ?? '').trim() : '';
}

export function buildAtLeast(a, b) {
  const parts = s => ((String(s || '').match(/^\s*v?(\d+(?:\.\d+)*)/) || [])[1] || '').split('.').filter(Boolean).map(Number);
  const x = parts(a), y = parts(b);
  if (!x.length) return false;
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
  return true;
}

export function complianceLanguage(dir, build = recordedBuild(dir)) {
  if (runLanguage(dir) !== 'cs') return 'en';
  return buildAtLeast(build, COMPLIANCE_CS_BUILD) ? 'cs' : 'en';
}

export function inputIds() {
  return new Set([...read(INPUTS).matchAll(/^  - id: ([\w-]+)$/gm)].map(m => m[1]));
}

export function touchpoints(cardPath, lang = 'en') {
  const t = read(join(CARDS, cardPath));
  const sec = t.slice(t.indexOf('\n## 6.'), t.indexOf('\n## 7.'));
  const out = new Map();
  let group = '', groupNo = 0;
  for (const line of sec.split('\n')) {
    const g = line.match(/^### 6\.(\d+) (.+)$/);
    if (g) { group = g[2].trim(); groupNo = Number(g[1]); continue; }
    const r = line.match(/^\| \*\*([A-Z]+-\d+)\*\* \|(.+?)\|(.+?)\|(.+?)\|(.+?)\|\s*$/);
    if (!r) continue;
    out.set(r[1], {
      id: r[1], group, groupNo,
      touchpoint: r[2].trim(),
      question: r[3].trim(),
      engages: engagesOf(r[4]),
      means: r[5].trim(),
    });
  }
  if (lang === 'cs') {
    const cs = czechTouchpoints(cardPath);
    for (const [id, r] of out) {
      const c = cs.get(id);
      if (c) out.set(id, { ...r, group: c.group, touchpoint: c.touchpoint, means: c.means });
    }
  }
  return out;
}

const engagesOf = cell => cell.split(',').map(x => x.replace(/\*\*/g, '').trim()).filter(x => /^[A-Z]\d+$/.test(x));

export function czechTouchpoints(cardPath) {
  const t = read(join(CARDS, cardPath));
  const i = t.indexOf('\n## 13.');
  const out = new Map();
  if (i === -1) return out;
  const j = t.indexOf('\n## ', i + 1);
  let group = '', groupNo = 0;
  for (const line of t.slice(i, j === -1 ? undefined : j).split('\n')) {
    const g = line.match(/^### 13\.(\d+) (.+)$/);
    if (g) { group = g[2].trim(); groupNo = Number(g[1]); continue; }
    const r = line.match(/^\| \*\*([A-Z]+-\d+)\*\* \|(.+?)\|(.+?)\|(.+?)\|\s*$/);
    if (r) out.set(r[1], { id: r[1], group, groupNo, touchpoint: r[2].trim(), engages: engagesOf(r[3]), means: r[4].trim() });
  }
  return out;
}

export function czechParity() {
  const out = [];
  for (const a of areas()) {
    const en = touchpoints(a.body), cs = czechTouchpoints(a.body);
    if (!cs.size) { out.push(`${a.body} has no §13, the touchpoints in Czech, so a Czech run cannot quote it`); continue; }
    const missing = [...en.keys()].filter(id => !cs.has(id)), extra = [...cs.keys()].filter(id => !en.has(id));
    if (missing.length) out.push(`${a.body} §13 has no row ${missing.join(', ')}, which §6 holds`);
    if (extra.length) out.push(`${a.body} §13 has a row ${extra.join(', ')}, which §6 does not hold`);
    for (const [id, e] of en) {
      const c = cs.get(id);
      if (!c) continue;
      if (c.engages.join(',') !== e.engages.join(','))
        out.push(`${a.body} §13 gives ${id} the sub-domains ${c.engages.join(', ') || 'none'}, where §6 gives ${e.engages.join(', ')}`);
      if (c.groupNo !== e.groupNo)
        out.push(`${a.body} §13 puts ${id} in group 13.${c.groupNo}, where §6 puts it in 6.${e.groupNo}`);
      if (!c.touchpoint || !c.means) out.push(`${a.body} §13 row ${id} has no touchpoint or no meaning`);
    }
  }
  return out;
}

export function triggers(cardPath) {
  const t = read(join(CARDS, cardPath));
  const i = t.indexOf('\n## 11.');
  if (i === -1) return [];
  const sec = t.slice(i, t.indexOf('\n## 12.', i) === -1 ? undefined : t.indexOf('\n## 12.', i));
  const out = [];
  for (const m of sec.matchAll(/^\| \*\*([A-Z]+-E\d+)\*\* \|(.+?)\|(.+?)\|(.+?)\|\s*$/gm))
    out.push({ id: m[1], name: m[2].trim(), firesOn: m[3].replace(/[—–-]/g, '').trim(), routesTo: m[4].trim() });
  return out;
}

export function answersOf(file) {
  const out = new Map();
  for (const line of read(file).split('\n')) {
    const m = line.match(/^\s*([A-Z]+-\d+)\s*·\s*(yes|no|cannot_tell)\s*(?:·\s*([\w-]+)\s*)?$/);
    if (m) out.set(m[1], { verdict: m[2], input: m[3] || null });
  }
  return out;
}

const sha = s => createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 16);

export const partHash = file => sha(read(file));

export function answersFile(dir, itemId) {
  const recs = join(dir, 'records', STAGE);
  if (existsSync(recs)) {
    for (const f of readdirSync(recs).filter(x => x.endsWith('.md')).sort()) {
      const abs = join(recs, f);
      if (isFrame(read(abs))) continue;
      const head = read(abs).slice(0, 2048);
      if (new RegExp(`^item_id:\\s*["']?${itemId}["']?\\s*$`, 'm').test(head)) return abs;
    }
  }
  const old = join(dir, STAGE, 'parts', `${itemId}.answers.md`);
  return existsSync(old) ? old : null;
}

export function derive(dir, itemId, lang = complianceLanguage(dir)) {
  const partFile = join(dir, STAGE, 'parts', `${itemId}.md`);
  const ansFile = answersFile(dir, itemId);
  const problems = [];
  if (!ansFile) return { problems: [`${itemId} has no answers file — the sweep did not run. They belong in records/${STAGE}/, on the record whose item_id is ${itemId}`] };

  const declared = inputIds();
  const ans = answersOf(ansFile);
  const out = [];
  let fired = 0;
  const open = [], inPlay = [], escalated = [];

  for (const a of areas()) {
    const tps = touchpoints(a.body, lang);
    const areaName = (lang === 'cs' && a.name_cs) || a.name;
    for (const id of tps.keys())
      if (!ans.has(id)) problems.push(`${itemId} did not answer ${id} — an unanswered question is a refusal, not a no`);

    const hits = [...tps.values()].filter(t => (ans.get(t.id) || {}).verdict === 'yes');
    const unresolved = [...tps.values()].filter(t => (ans.get(t.id) || {}).verdict === 'cannot_tell');
    for (const t of unresolved) {
      const got = (ans.get(t.id) || {}).input;
      if (!got) problems.push(`${itemId} cannot tell on ${t.id} and names no input that would settle it`);
      else if (!declared.has(got)) problems.push(`${itemId} names "${got}" on ${t.id} and no screening input is declared under that id`);
      else open.push({ area: areaName, id: t.id, input: got, touchpoint: t.touchpoint });
    }

    fired += hits.length;
    const subs = [...new Set(hits.flatMap(t => t.engages))].sort();
    if (subs.length) inPlay.push({ id: a.id, area: areaName, subs });

    const unresolvedSubs = new Set(unresolved.flatMap(t => t.engages));
    for (const tr of triggers(a.body))
      if (tr.firesOn && unresolvedSubs.has(tr.firesOn))
        escalated.push({ area: areaName, trigger: tr.id, name: tr.name, firesOn: tr.firesOn });

    out.push({ area: a, hits, subs });
  }

  const w = WORDS[lang] || WORDS.en;
  const md = [];
  md.push('### Compliance', '');
  md.push(paragraph(inPlay, escalated, open, w), '');
  md.push(w.count(fired), '');
  for (const { area, hits } of out) {
    md.push(`#### ${(lang === 'cs' && area.name_cs) || area.name}`, '');
    if (!hits.length) { md.push(w.nothing, ''); continue; }
    let group = '';
    for (const t of hits) {
      if (t.group !== group) { group = t.group; md.push(`*${group}*`, ''); }
      const trigger = t.touchpoint.replace(/\*\*/g, '').trim();
      md.push(`> **${t.id} · ${trigger}** · ${w.engages} ${t.engages.join(', ')}`, '>', `> ${t.means}`, '');
    }
  }
  if (open.length) {
    md.push(`#### ${w.openItems}`, '');
    const inputs = [...new Set(open.map(o => o.input))].sort();
    md.push(w.openWhy(open.length, inputs.length, `\`${inputs.join('`, `')}\``), '');
    for (const o of open) md.push(w.openItem(o));
    md.push('');
  }
  const fm = [
    '---', 'part_of: A8', `item_id: ${itemId}`,
    `derived_from: ${partHash(partFile)}`,
    `touchpoints: ${fired}`,
    `areas_in_play: [${inPlay.map(x => x.id).join(', ')}]`,
    `open_items: ${open.length}`,
    `escalations: ${escalated.length}`,
    '---',
  ].join('\n');
  const body = `${fm}\n\n${md.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
  return { problems, body, fired, answered: ans.size, open: open.length, escalated: escalated.length };
}

const WORDS = {
  en: {
    inPlay: s => `In play: ${s}.`,
    noneInPlay: 'Nothing in any of the four areas is in play.',
    escalated: (n, list) => ` ${n} escalation trigger(s) fired: ${list}. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS.`,
    because: x => `${x.trigger} in ${x.area}, because ${x.firesOn} is unresolved`,
    noEscalation: ' No escalation trigger fired.',
    open: n => ` ${n} question(s) could not be answered from the solution as written, each naming the input that would settle it.`,
    noOpen: ' Every question was answerable from the solution as written.',
    count: n => `**# of touchpoints: ${n}**`,
    nothing: 'Nothing in this area was engaged. **It was examined and found nothing**, which is not the same as not being looked at.',
    engages: 'engages',
    openItems: 'Open items',
    openWhy: (n, k, list) => `**These are open because the run has not been asked for the inputs that would settle them, ` +
      `not because the solution is unusual.** ${n} touchpoint(s) wait on ${k} input(s): ${list}. **Supplying those closes ` +
      `them in one pass**, and until somebody does, every entry below is the same answer wearing a different touchpoint id.`,
    openItem: o => `- **${o.id}**, ${o.area} — ${o.touchpoint}. **Settled by \`${o.input}\`**`,
  },
  cs: {
    inPlay: s => `Dotčené oblasti: ${s}.`,
    noneInPlay: 'Žádná ze čtyř oblastí není dotčena.',
    escalated: (n, list) => ` Aktivované eskalační spouštěče (${n}): ${list}. **Žádná karta neuvádí roli, ke které aktivovaný spouštěč směřuje**, takže komu který spouštěč předat, je otevřená otázka pro ČS.`,
    because: x => `${x.trigger} v oblasti ${x.area}, protože ${x.firesOn} není vyřešeno`,
    noEscalation: ' Žádný eskalační spouštěč nebyl aktivován.',
    open: n => ` Otázky, na které z popsaného řešení nešlo odpovědět: ${n}. U každé je uveden vstup, který by ji rozhodl.`,
    noOpen: ' Na každou otázku šlo z popsaného řešení odpovědět.',
    count: n => `**Počet kontaktních bodů: ${n}**`,
    nothing: 'Tato oblast není ničím dotčena. **Byla prověřena a nic se nenašlo**, což není totéž, jako kdyby ji nikdo neprověřil.',
    engages: 'týká se',
    openItems: 'Otevřené body',
    openWhy: (n, k, list) => `**Tyto body jsou otevřené proto, že se na vstupy, které by je rozhodly, nikdo neptal, ` +
      `ne proto, že by řešení bylo neobvyklé.** Kontaktní body, které na vstupy čekají: ${n}. Vstupy, které by je rozhodly ` +
      `(${k}): ${list}. **Jejich doplněním se uzavřou najednou**, a dokud je nikdo nedoplní, je každá položka níže stejná ` +
      `odpověď pod jiným identifikátorem kontaktního bodu.`,
    openItem: o => `- **${o.id}**, ${o.area} – ${o.touchpoint}. **Rozhodne \`${o.input}\`**`,
  },
};

function paragraph(inPlay, escalated, open, w = WORDS.en) {
  const a = inPlay.length ? w.inPlay(inPlay.map(x => `${x.area} (${x.subs.join(', ')})`).join(' · ')) : w.noneInPlay;
  const b = escalated.length ? w.escalated(escalated.length, escalated.map(w.because).join('; ')) : w.noEscalation;
  const c = open.length ? w.open(open.length) : w.noOpen;
  return a + b + c;
}

export const COMPLIANCE_PART = '.compliance.md';
export const COMPLIANCE_PART_WAS = '.derived.md';
export const NOT_AUTHORED = /\.(answers|derived|compliance)\.md$/;
export function compliancePart(dir, itemId) {
  const now = join(dir, STAGE, 'parts', `${itemId}${COMPLIANCE_PART}`);
  if (existsSync(now)) return now;
  const was = join(dir, STAGE, 'parts', `${itemId}${COMPLIANCE_PART_WAS}`);
  return existsSync(was) ? was : now;
}

export function items(dir) {
  const p = join(dir, STAGE, 'parts');
  if (!existsSync(p)) return [];
  return readdirSync(p).filter(f => /\.md$/.test(f) && !NOT_AUTHORED.test(f) && !isFrame(read(join(p, f))))
    .map(f => basename(f, '.md')).sort();
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  let dir = (argv.find(a => !a.startsWith('--')) || '').replace(/\/$/, '');
  if (!dir) {
    const open = openRuns();
    if (!open.length) {
      console.error(`derive: no unfinished run under \`${RUNS_ROOT}\` — name one: ` +
        `node .github/scripts/derive.mjs ${RUNS_ROOT}/<run_id> [--write]`);
      process.exit(1);
    }
    if (open.length > 1) {
      console.error(twoRunsRefusal(open, RUNS_ROOT));
      process.exit(1);
    }
    dir = open[0];
  }
  if (!existsSync(dir)) { console.error('usage: derive.mjs {runs_root}/<run_id> [--write]'); process.exit(1); }
  const write = argv.includes('--write');
  if (write) { const stopped = stoppedRun(dir); if (stopped) { console.log(`\n${stopped}\n`); process.exit(3); } }
  const ids = items(dir);
  if (!ids.length) { console.log(`  --  ${dir}: no stage-4 parts on disk — nothing to derive`); process.exit(0); }
  let bad = 0;
  for (const id of ids) {
    const r = derive(dir, id);
    if (r.problems && r.problems.length) { r.problems.forEach(x => console.log(`  ${x}`)); bad += r.problems.length; }
    if (!r.body) continue;
    const out = join(dir, STAGE, 'parts', `${id}${COMPLIANCE_PART}`);
    if (write) { writeFileSync(out, r.body); console.log(`  wrote ${out} — ${r.fired} touchpoint(s), ${r.open} open, ${r.escalated} escalation(s)`); }
    else console.log(`  ${id}: ${r.fired} touchpoint(s), ${r.open} open, ${r.escalated} escalation(s) — would write ${out}`);
  }
  process.exit(bad ? 1 : 0);
}

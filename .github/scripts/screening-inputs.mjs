import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const REGISTRY = join('.github', 'registry', 'screening-inputs.yaml');
export const KH_DIR = join('.github', 'know-how');

export const REASONS = ['not_known', 'not_yet_available', 'not_applicable', 'declined'];
export const MOMENTS = ['M1', 'M2'];

const read = p => readFileSync(p, 'utf8').replace(/^\ufeff/, '').replace(/\r\n/g, '\n');

export function registry() {
  if (!existsSync(REGISTRY)) return null;
  const text = read(REGISTRY);
  const section = (name, until) => {
    const a = text.indexOf(`\n${name}:\n`);
    if (a < 0) return '';
    const from = a + name.length + 3;
    const b = until ? text.indexOf(`\n${until}:\n`, from) : -1;
    return text.slice(from, b < 0 ? text.length : b);
  };
  const items = block => {
    const out = [];
    let cur = null;
    for (const line of block.split('\n')) {
      const head = line.match(/^ {2}- (\w+): (.*)$/);
      if (head) { cur = {}; out.push(cur); cur[head[1]] = scalar(head[2]); continue; }
      if (!cur) continue;
      const kv = line.match(/^ {4}(\w+): (.*)$/);
      if (kv) cur[kv[1]] = scalar(kv[2]);
    }
    return out;
  };
  const scalar = raw => {
    const v = raw.replace(/\s+#.*$/, '').trim();
    if (v.startsWith('[')) return v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    if (/^".*"$/.test(v)) return v.slice(1, -1);
    if (/^\d+$/.test(v)) return Number(v);
    return v;
  };
  return {
    groups: items(section('groups', 'inputs')),
    inputs: items(section('inputs', 'cards')),
    cards:  items(section('cards')),
  };
}

export function cardRows(body) {
  const p = join(KH_DIR, body);
  if (!existsSync(p)) return null;
  const s4 = read(p).split(/\n## 4\. Required inputs\n/)[1];
  if (s4 === undefined) return null;
  const table = s4.split(/\n## /)[0];
  return [...table.matchAll(/^\| \*\*([A-Z]-I\d+)\*\* \| (.+?) \|$/gm)].map(m => ({ id: m[1], name: m[2].trim() }));
}

export function joins() {
  const c = [];
  const reg = registry();
  if (!reg) return [`${REGISTRY} does not exist — the screening inputs are declared nowhere`];

  const groupIds = new Set(reg.groups.map(g => g.id));
  const inputIds = new Set();
  const claimed = new Map();

  for (const i of reg.inputs) {
    if (inputIds.has(i.id)) c.push(`input "${i.id}" is declared twice`);
    inputIds.add(i.id);
    if (!i.name) c.push(`input "${i.id}" carries no name`);
    if (!i.asked_as) c.push(`input "${i.id}" carries no question — a producer would have to invent one`);
    if (!groupIds.has(i.group)) c.push(`input "${i.id}" names group "${i.group}", which no group declares`);
    if (!MOMENTS.includes(i.knowable_at)) c.push(`input "${i.id}" is knowable_at "${i.knowable_at}", outside ${MOMENTS.join(' | ')}`);
    const srcs = Array.isArray(i.sources) ? i.sources : [];
    if (srcs.length === 0) c.push(`input "${i.id}" covers no card row — nothing requires it and it would be asked for nobody`);
    for (const s of srcs) claimed.set(s, [...(claimed.get(s) || []), i.id]);
  }

  for (const g of reg.groups) {
    if (!g.gated_by) continue;
    const gate = reg.inputs.find(i => i.id === g.gated_by);
    if (!gate) c.push(`group "${g.id}" is gated_by "${g.gated_by}", which no input declares`);
    else if (gate.group !== g.id) c.push(`group "${g.id}" is gated_by "${g.gated_by}", which sits in group "${gate.group}"`);
  }

  for (const card of reg.cards) {
    const rows = cardRows(card.body);
    if (rows === null) { c.push(`${card.body} has no §4 required-inputs table — the rows this registry claims cannot be resolved`); continue; }
    if (Number(card.count) !== rows.length)
      c.push(`${card.body} declares ${card.count} required inputs and its §4 table carries ${rows.length}`);
    const rowIds = new Set(rows.map(r => r.id));
    for (const r of rows) {
      if (!r.id.startsWith(card.prefix)) c.push(`${card.body} row "${r.id}" does not carry this card's prefix "${card.prefix}"`);
      const by = claimed.get(r.id) || [];
      if (by.length === 0) c.push(`${card.body} requires "${r.id}" (${r.name}) and no canonical input covers it — a screen would need a fact nobody is ever asked for`);
      if (by.length > 1) c.push(`${card.body} row "${r.id}" is claimed by ${by.length} inputs (${by.join(', ')}) — it would be asked more than once`);
    }
    for (const s of [...claimed.keys()].filter(s => s.startsWith(card.prefix)))
      if (!rowIds.has(s)) c.push(`the registry claims "${s}" for ${claimed.get(s).join(', ')} and ${card.body} declares no such row`);
  }

  return c;
}

export function bodyDrift() {
  const c = [];
  const reg = registry();
  if (!reg) return c;
  const p = join(KH_DIR, 'compliance', 'screening-inputs.md');
  if (!existsSync(p)) return [`${p} does not exist — brief-creation declares a body that is not there`];
  const text = read(p);
  const rows = new Map();
  for (const m of text.matchAll(/^\| \*\*`(\w+)`\*\* \| (.+?) \| (.+?) \| \*\*(M[12])\*\* \| (.+?) \|$/gm))
    rows.set(m[1], { name: m[2].trim(), moment: m[4], sources: m[5].split('·').map(s => s.trim()) });
  for (const i of reg.inputs) {
    const r = rows.get(i.id);
    if (!r) { c.push(`the body carries no row for "${i.id}"`); continue; }
    if (r.name !== i.name) c.push(`"${i.id}" is "${i.name}" in the registry and "${r.name}" in the body`);
    if (r.moment !== i.knowable_at) c.push(`"${i.id}" is ${i.knowable_at} in the registry and ${r.moment} in the body`);
    const want = (Array.isArray(i.sources) ? i.sources : []).join(' · ');
    if (r.sources.join(' · ') !== want) c.push(`"${i.id}" covers ${want} in the registry and ${r.sources.join(' · ')} in the body`);
  }
  for (const id of rows.keys()) if (!reg.inputs.some(i => i.id === id)) c.push(`the body carries a row for "${id}", which the registry does not declare`);
  return c;
}

export const REGMAP = join('.github', 'registry', 'regmap.yaml');

export function areaCards() {
  if (!existsSync(REGMAP)) return null;
  const text = read(REGMAP);
  const areaBlock = text.split('\nareas:\n')[1].split('\n# ──')[0];
  const areas = [];
  let cur = null;
  for (const line of areaBlock.split('\n')) {
    const h = line.match(/^  - id: (\S+)/);
    if (h) { cur = { id: h[1] }; areas.push(cur); continue; }
    if (!cur) continue;
    const kv = line.match(/^    (\w+): (.*)$/);
    if (kv) cur[kv[1]] = kv[2].replace(/\s+#.*$/, '').trim().replace(/^"|"$/g, '');
  }
  for (const a of areas) {
    const p = join(KH_DIR, a.body || '');
    a.filled = !!a.body && existsSync(p);
    a.subDomains = [];
    a.triggers = [];
    if (!a.filled) continue;
    const txt = read(p);
    const s2 = (txt.split(/\n## 2\. Sub-domains\n/)[1] || '').split(/\n## /)[0];
    a.subDomains = [...s2.matchAll(/^\| \*\*([A-Z]\d+)\*\* \|/gm)].map(m => m[1]);
    const s3 = (txt.split(/\n## 3\. Triggers\n/)[1] || '').split(/\n## /)[0];
    a.triggers = [...s3.matchAll(/^\| \*\*([A-Z]+\d+)\*\* \|/gm)].map(m => m[1]);
    const s11 = (txt.split(/\n## 11\. Escalation triggers\n/)[1] || '').split(/\n## /)[0];
    a.escalation = [...s11.matchAll(/^\| \*\*([A-Z]-E\d+)\*\* \| (.+?) \| (.+?) \| (.+?) \|$/gm)]
      .map(m => ({ id: m[1], name: m[2].trim(), firesOn: m[3].trim() === '—' ? null : m[3].trim(),
                   routesOut: m[4].trim() === '—' ? null : m[4].trim() }));
  }
  const oosBlock = (text.split('\nout_of_scope:\n')[1] || '').split('\n# ──')[0];
  const outOfScope = [...oosBlock.matchAll(/^  - id: (\S+)/gm)].map(m => ({ id: m[1] }));
  return { areas, outOfScope };
}

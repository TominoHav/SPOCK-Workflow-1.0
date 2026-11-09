import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const REGISTRY = join('.github', 'registry', 'scoring.yaml');

export function model() {
  if (!existsSync(REGISTRY)) return null;
  const text = workflowText(REGISTRY);
  return {
    landed: (text.match(/^landed:\s*"?(\d{4}-\d{2}-\d{2})"?/m) || [])[1] || null,
    separatorsSince: (text.match(/^separators_since:\s*"?(\d{4}-\d{2}-\d{2})"?/m) || [])[1] || null,
    scores: items(section(text, 'scores', 'left_out')).map(sc => ({ ...sc, separates: separatorsFor(text, sc.id) })),
    leftOut: items(section(text, 'left_out')),
  };
}

function separatorsFor(text, id) {
  if (!id) return [];
  const at = text.indexOf(`\n  - id: ${id}\n`);
  if (at < 0) return [];
  const next = text.indexOf('\n  - id: ', at + 1);
  const block = text.slice(at, next < 0 ? text.length : next);
  const sep = /^    separates:\s*$([\s\S]*?)(?=^    [a-z_]+:|^  - id:|(?![\s\S]))/m.exec(block);
  if (!sep) return [];
  return [...sep[1].matchAll(/^\s*-\s*\{\s*field:\s*([A-Za-z0-9_]+)\s*,\s*what:\s*"?([^"}]+?)"?\s*\}/gm)]
    .map(m => ({ field: m[1], what: m[2].trim() }));
}

const section = (text, name, until) => {
  const a = text.indexOf(`\n${name}:\n`);
  if (a < 0) return '';
  const from = a + name.length + 3;
  const b = until ? text.indexOf(`\n${until}:\n`, from) : -1;
  return text.slice(from, b < 0 ? text.length : b);
};

function items(block) {
  const out = [];
  let cur = null, folding = null;
  for (const line of block.split('\n')) {
    const head = line.match(/^  - (\w+): (.*)$/);
    if (head) { folding = null; cur = {}; out.push(cur); cur[head[1]] = scalar(head[2]); continue; }
    if (!cur) continue;
    const kv = line.match(/^    (\w+): (.*)$/);
    if (kv) {
      const v = kv[2].replace(/\s+#.*$/, '').trim();
      if (v === '>' || v === '|') { folding = kv[1]; cur[folding] = ''; continue; }
      folding = null; cur[kv[1]] = scalar(kv[2]); continue;
    }
    if (folding && /^      \S/.test(line)) { cur[folding] = (cur[folding] + ' ' + line.trim()).trim(); continue; }
    if (line.trim() === '') continue;
    folding = null;
  }
  return out;
}

const scalar = raw => {
  const v = raw.replace(/\s+#.*$/, '').trim();
  if (v === '>' || v === '|') return '';
  if (/^".*"$/.test(v)) return v.slice(1, -1);
  if (/^\d+$/.test(v)) return Number(v);
  return v;
};

export function faults() {
  const c = [];
  const m = model();
  if (!m) return [`${REGISTRY} does not exist — the scoring model is declared nowhere`];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(m.landed || '')))
    c.push(`${REGISTRY} carries no \`landed\` date — an artifact scored under the old model has to be readable against the model it was scored under, and nothing says where the boundary is`);

  if (m.scores.length !== 2)
    c.push(`${REGISTRY} declares ${m.scores.length} score(s) and the design fixes the number at two, standalone and never combined`);

  const seen = new Set();
  for (const s of m.scores) {
    if (seen.has(s.id)) c.push(`score "${s.id}" is declared twice`);
    seen.add(s.id);
    if (!s.name || !s.asks) c.push(`"${s.id}" carries no name or no question — a score whose subject is unstated is a number`);
    if ('weight' in s || 'denominator' in s)
      c.push(`"${s.id}" carries a weight or a denominator — the two scores stand alone and neither is a fraction of anything`);
    if (!s.bands) c.push(`"${s.id}" names no body for its bands — a score anchored nowhere cannot be given the same way twice`);
    else if (!existsSync(s.bands))
      c.push(`"${s.id}" is anchored to ${s.bands} and that body is absent — a score with no bands behind it is a number with nothing behind it`);
  }

  for (const d of m.leftOut) {
    if (!d.would_have_measured || String(d.would_have_measured).length < 40)
      c.push(`"${d.id}" is out of the model and does not say what it would have measured — five names is a deletion, not a record`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(d.left_out_on || ''))) c.push(`"${d.id}" is out of the model and carries no date`);
    if (!d.left_out_by) c.push(`"${d.id}" is out of the model and names nobody who decided it — an unowned removal is indistinguishable from being forgotten`);
    if ('state' in d && String(d.state) === 'parked')
      c.push(`"${d.id}" is declared parked — parked is a promise to come back, and these five are out of the model rather than waiting on a body that will not be written`);
  }
  return c;
}

export function specTable(spec) {
  const block = spec.match(/<!-- SCORING-TABLE -->([\s\S]*?)<!-- \/SCORING-TABLE -->/);
  if (!block) return null;
  const rows = [];
  for (const m of block[1].matchAll(/^\|(.*?)\|(.*?)\|(.*?)\|$/gm)) {
    const cell = s => s.replace(/\*\*/g, '').trim();
    const [, a, b, c] = m;
    if (!cell(a) || /^-+$/.test(cell(a))) continue;
    if (norm(cell(a)) === 'score-or-sub-dimension') continue;
    rows.push({ id: norm(cell(a)), inModel: cell(b), anchor: cell(c) });
  }
  return rows;
}

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function specDrift(spec) {
  const c = [];
  const m = model();
  if (!m) return c;
  const rows = specTable(spec);
  if (!rows) return ['§8.3 carries no SCORING-TABLE marker block — the table the registry is compared against cannot be found'];
  const byId = new Map(rows.map(r => [r.id, r]));
  const declared = [...m.scores.map(s => ({ id: norm(s.id), kind: 'score', want: 'scored' })),
                    ...m.leftOut.map(d => ({ id: norm(d.id), kind: 'left out', want: 'left out' }))];
  for (const d of declared) {
    const r = byId.get(d.id);
    if (!r) { c.push(`§8.3 has no row for "${d.id}", which the registry declares as ${d.kind}`); continue; }
    if (norm(r.inModel) !== norm(d.want))
      c.push(`§8.3 says "${d.id}" is ${r.inModel} and the registry has it ${d.want}`);
  }
  for (const r of rows)
    if (!declared.some(d => d.id === r.id))
      c.push(`§8.3 carries a row for "${r.id}", which the registry does not declare`);
  return c;
}

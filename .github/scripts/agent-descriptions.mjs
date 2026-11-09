#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { docPhrase } from './doc-structure.mjs';

export const AGENTS = join('.github', 'registry', 'agents.yaml');
export const SKILLS = join('.github', 'registry', 'skills.yaml');
export const COMMAND = 'node .github/scripts/agent-descriptions.mjs --write';
const REACH = ['search', 'retrieve'];

const read = f => readFileSync(f, 'utf8').replace(/\r/g, '');
const list = raw => String(raw || '').replace(/\s+#.*$/, '').trim().replace(/^\[|\]$/g, '')
  .split(',').map(x => x.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);

export function entries(text = read(AGENTS)) {
  const at = text.indexOf('\nsubstrate_mapping:');
  if (at === -1) return [];
  const lines = text.slice(at + 1).split('\n').slice(1);
  const end = lines.findIndex(l => /^[^\s#]/.test(l));
  const block = (end === -1 ? lines : lines.slice(0, end)).join('\n');
  return block.split(/^ {2}- agent_file:/m).slice(1).map(body => {
    const rows = body.split('\n');
    const key = k => { const m = new RegExp(`^ {4}${k}:[ \\t]*(.*)$`, 'm').exec(body); return m ? m[1] : undefined; };
    let purpose = key('purpose');
    if (purpose !== undefined && /^[>|][-+]?\s*$/.test(purpose.trim())) {
      const from = rows.findIndex(l => /^ {4}purpose:/.test(l)) + 1;
      const kept = [];
      for (const l of rows.slice(from)) { if (!/^ {6}\S/.test(l)) break; kept.push(l.trim()); }
      purpose = kept.join(' ');
    } else if (purpose !== undefined) purpose = purpose.trim().replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    const triggers = key('triggers');
    return {
      file: rows[0].trim(),
      design: (key('design_agent') || '').trim(),
      covers: list(key('covers')),
      tools: list(key('tools')),
      purpose: purpose === undefined ? '' : purpose.trim(),
      triggers: triggers === undefined ? [] : list(triggers),
    };
  });
}

export function skills(text = read(SKILLS)) {
  const out = new Map();
  for (const m of text.matchAll(/^ {2}- id:\s*(\S+)\s*\n([\s\S]*?)(?=^ {2}- id:|(?![\s\S]))/gm)) {
    const field = k => { const f = new RegExp(`^ {4}${k}:\\s*(\\[[^\\]]*\\])`, 'm').exec(m[2]); return f ? list(f[1]) : []; };
    out.set(m[1], { requires: field('requires'), produces: field('produces') });
  }
  return out;
}

export function bindings(text = read(AGENTS)) {
  const at = text.indexOf('\nsubstrate_mapping:');
  const lines = (at === -1 ? text : text.slice(0, at)).split('\n');
  const out = new Map();
  lines.forEach((l, i) => {
    const m = /^ {6}- (?:\{\s*)?skill:\s*([a-z][a-z-]*)@/.exec(l);
    if (!m) return;
    let body = l;
    if (!/\{/.test(l)) for (const next of lines.slice(i + 1)) { if (!/^ {8}/.test(next) && next.trim() !== '') break; body += `\n${next}`; }
    const caps = /capabilities:\s*(\[[^\]]*\])/.exec(body);
    out.set(m[1], { capabilities: caps ? list(caps[1]) : [], blocked: /(^|[\s{,])blocked_by:/.test(body) });
  });
  return out;
}

const byId = (a, b) => {
  const pa = /^A(\d+)([a-z]*)$/.exec(a), pb = /^A(\d+)([a-z]*)$/.exec(b);
  if (pa && pb) return (+pa[1] - +pb[1]) || pa[2].localeCompare(pb[2]);
  return pa ? -1 : pb ? 1 : a.localeCompare(b);
};
const and = xs => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

export function facts(entry, sk = skills(), bd = bindings()) {
  const live = entry.covers.filter(id => !(bd.get(id) || {}).blocked);
  const union = k => [...new Set(live.flatMap(id => (sk.get(id) || {})[k] || []))].sort(byId).map(docPhrase);
  const from = union('requires'), writes = union('produces');
  const reach = REACH.filter(r => live.some(id => ((bd.get(id) || {}).capabilities || []).includes(r)));
  return [
    from.length ? `Works from ${and(from)}` : 'Takes no document as its input',
    writes.length ? `writes ${and(writes)}` : 'writes no document',
    reach.length ? `reaches outside the repository only through ${and(reach)}` : 'reaches nothing outside the repository',
    entry.tools.length ? `tools: ${entry.tools.join(', ')}` : 'no tools',
  ].join('; ') + '.';
}

export const quoted = s => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

export function line(entry, sk = skills(), bd = bindings()) {
  if (!entry.purpose || !entry.triggers.length) return null;
  return `description: ${quoted(`${entry.purpose} ${facts(entry, sk, bd)} Trigger phrases: ${entry.triggers.join(', ')}.`)}`;
}

export function faults(es = entries()) {
  const out = [];
  for (const e of es) {
    if (!e.purpose) out.push(`substrate_mapping's entry for ${e.file} carries no purpose — the first half of its description is written there, and without it no description can be generated`);
    if (!e.triggers.length) out.push(`substrate_mapping's entry for ${e.file} carries no triggers — the phrases that call the agent close its description, and without them no description can be generated`);
  }
  return out;
}

export const wrappersOf = e => [e.file].filter(f => existsSync(f));

const descriptionAt = lines => {
  if ((lines[0] || '').replace(/\r$/, '').trim() !== '---') return -1;
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i].replace(/\r$/, '');
    if (l.trim() === '---') return -1;
    if (/^description:/.test(l)) return i;
  }
  return -1;
};

export function drift(es = entries(), sk = skills(), bd = bindings()) {
  const out = [];
  for (const e of es) {
    const want = line(e, sk, bd);
    for (const f of wrappersOf(e)) {
      const lines = readFileSync(f, 'utf8').split('\n');
      const at = descriptionAt(lines);
      const got = at === -1 ? null : lines[at].replace(/\r$/, '');
      if (want === null || got !== want) out.push({ file: f, want, got });
    }
  }
  return out;
}

export function matching(es = entries(), sk = skills(), bd = bindings()) {
  return es.reduce((n, e) => n + wrappersOf(e).length, 0) - drift(es, sk, bd).length;
}

function write(file, want) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const at = descriptionAt(lines);
  if (at !== -1) lines[at] = want + (lines[at].endsWith('\r') ? '\r' : '');
  else {
    const name = lines.findIndex((l, i) => i > 0 && /^name:/.test(l));
    lines.splice(name === -1 ? 1 : name + 1, 0, want);
  }
  writeFileSync(file, lines.join('\n'));
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const writing = process.argv.includes('--write');
  const unknown = process.argv.slice(2).filter(a => a !== '--write');
  if (unknown.length) { console.log(`Unknown argument(s): ${unknown.join(' ')}. This script takes --write or nothing.`); process.exit(2); }
  const es = entries();
  const problems = faults(es);
  const off = drift(es);
  for (const p of problems) console.log(p);
  if (writing) {
    let wrote = 0;
    for (const d of off) if (d.want !== null) { write(d.file, d.want); wrote++; console.log(`wrote ${d.file}`); }
    console.log(`${wrote} description(s) written, ${matching(es)} of ${es.reduce((n, e) => n + wrappersOf(e).length, 0)} now what the registry generates`);
    process.exit(problems.length ? 1 : 0);
  }
  for (const d of off) console.log(`${d.file}: its description is not what the registry generates — run ${COMMAND}`);
  if (!off.length && !problems.length) console.log(`${matching(es)} description(s) are what the registry generates`);
  process.exit(off.length || problems.length ? 1 : 0);
}

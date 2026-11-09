#!/usr/bin/env node

import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';

export const SRC_DIR = 'specifications/definitions/know-how';
export const OUT_DIR = '.github/know-how';

const BANNER = name =>
`<!-- GENERATED from ${SRC_DIR}/${name}. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->
`;

function relink(text, name) {
  const fromDir = posix.join(SRC_DIR, posix.dirname(name));
  const toDir = posix.join(OUT_DIR, posix.dirname(name));
  return text.replace(/\]\((\.[^)]*)\)/g, (whole, href) => {
    const [path, anchor = ''] = href.split(/(#.*)$/);
    if (!path) return whole;
    const fromRepo = posix.normalize(posix.join(fromDir, path));
    const toBuild = posix.relative(toDir, fromRepo);
    return `](${toBuild}${anchor})`;
  });
}

const HISTORY = /^[ \t]*<!--[ \t]*history[ \t]*-->[\s\S]*?^[ \t]*<!--[ \t]*\/history[ \t]*-->[ \t]*\n?/gm;

export function generate(name) {
  const src = readFileSync(join(SRC_DIR, name), 'utf8');
  const stripped = src.replace(HISTORY, '');
  const rule = stripped === src ? src : stripped.replace(/\n{3,}/g, '\n\n');
  return BANNER(name) + '\n' + relink(rule, name);
}

export function sources(dir = '') {
  const out = [];
  for (const e of readdirSync(join(SRC_DIR, dir), { withFileTypes: true })) {
    const rel = dir ? posix.join(dir, e.name) : e.name;
    if (e.isDirectory()) out.push(...sources(rel));
    else if (e.name.endsWith('.md')) out.push(rel);
  }
  return out.sort();
}

export function built(dir = '') {
  const out = [];
  for (const e of readdirSync(join(OUT_DIR, dir), { withFileTypes: true })) {
    const rel = dir ? posix.join(dir, e.name) : e.name;
    if (e.isDirectory()) out.push(...built(rel));
    else if (e.name.endsWith('.md')) out.push(rel);
  }
  return out.sort();
}

export const VERSION_LINE = /^\*\*Version:\*\*\s*([0-9]+\.[0-9]+(?:\.[0-9]+)?)\b/m;

export const DATE_LINE = /\*\*Date:\*\*\s*([0-9]{1,2})\s+([A-Za-z]+)\s+([0-9]{4})/;
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june',
                'july', 'august', 'september', 'october', 'november', 'december'];

export function bodyDate(text) {
  return parseDate(text.match(DATE_LINE));
}

export const FIRST_LINE = /\*\*First version:\*\*\s*([0-9]{1,2})\s+([A-Za-z]+)\s+([0-9]{4})/;
export function firstDate(text) {
  return parseDate(text.match(FIRST_LINE));
}

function parseDate(m) {
  if (!m) return null;
  const mi = MONTHS.indexOf(m[2].toLowerCase());
  if (mi < 0) return null;
  return `${m[3]}-${String(mi + 1).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`;
}

export function roster() {
  const readers = new Map(), bound = new Map();
  let id = null, inBlock = false;
  for (const raw of workflowText(join('.github', 'registry', 'skills.yaml')).split('\n')) {
    const m = raw.match(/^\s*-\s+id:\s*([\w-]+)/);
    if (m) { id = m[1]; inBlock = false; continue; }
    if (/^\s*know_how:\s*$/.test(raw)) { inBlock = true; continue; }
    if (!inBlock) continue;
    const p = raw.match(/^\s*-\s+([^\s#]+)/);
    if (p) {
      const name = p[1].split('/').pop();
      if (!readers.has(name)) readers.set(name, []);
      readers.get(name).push(id);
      const b = raw.match(/#\s*bound:\s*(\d{4}-\d{2}-\d{2})/);
      if (b) { if (!bound.has(name)) bound.set(name, new Map()); bound.get(name).set(id, b[1]); }
    } else if (raw.trim() !== '' && !raw.trim().startsWith('#')) inBlock = false;
  }

  const onDisk = new Map(sources().map(rel => [posix.basename(rel), rel]));
  return [...new Set([...readers.keys(), ...onDisk.keys()])].sort().map(name => {
    const rel = onDisk.get(name);
    const present = rel !== undefined;
    const text = present ? readFileSync(join(SRC_DIR, rel), 'utf8') : '';
    const v = present ? (text.match(VERSION_LINE) || [])[1] : null;
    return { name, path: rel || null, present, version: v || null, date: present ? bodyDate(text) : null,
             firstDate: present ? firstDate(text) : null,
             readers: [...new Set(readers.get(name) || [])].sort(),
             boundAt: Object.fromEntries(bound.get(name) || []) };
  });
}

export function declarations() {
  const out = new Map();
  let id = null, inBlock = false;
  for (const raw of workflowText(join('.github', 'registry', 'skills.yaml')).split('\n')) {
    const m = raw.match(/^\s*-\s+id:\s*([\w-]+)/);
    if (m) { id = m[1]; inBlock = false; if (!out.has(id)) out.set(id, new Set()); continue; }
    if (/^\s*know_how:\s*$/.test(raw)) { inBlock = true; continue; }
    if (!inBlock) continue;
    const p = raw.match(/^\s*-\s+([^\s#]+)/);
    if (p) out.get(id).add(p[1].split('/').pop());
    else if (raw.trim() !== '' && !raw.trim().startsWith('#')) inBlock = false;
  }
  return out;
}

export function drift() {
  const problems = [];
  const made = built();
  const src = sources();

  const byName = new Map();
  for (const rel of src) {
    const name = posix.basename(rel);
    if (byName.has(name))
      problems.push(`${SRC_DIR}/${rel} and ${SRC_DIR}/${byName.get(name)} share the basename ${name} — ` +
        'the roster keys bodies by name, so a run recording that name could mean either');
    else byName.set(name, rel);
  }

  for (const f of made)
    if (!src.includes(f)) problems.push(`${OUT_DIR}/${f} has no source in ${SRC_DIR} — it is not generated, it is authored`);

  for (const name of src) {
    const want = generate(name);
    let have;
    try { have = readFileSync(join(OUT_DIR, name), 'utf8'); }
    catch { problems.push(`${OUT_DIR}/${name} is missing — the source of record has a body the build does not`); continue; }
    if (have !== want) {
      const w = want.split('\n'), h = have.split('\n');
      const n = Math.max(w.length, h.length);
      let i = 0;
      while (i < n && w[i] === h[i]) i++;
      const show = s => s === undefined ? '(end of file)' : `"${s.slice(0, 60)}"`;
      problems.push(`${OUT_DIR}/${name} is not what the generator produces — first difference at line ${i + 1}: ` +
        `has ${show(h[i])}, generator produces ${show(w[i])}`);
    }
  }
  return problems;
}

if (process.argv[1] && process.argv[1].endsWith('know-how.mjs')) {
  const write = process.argv.includes('--write');
  if (write) {
    for (const name of sources()) {
      mkdirSync(dirname(join(OUT_DIR, name)), { recursive: true });
      writeFileSync(join(OUT_DIR, name), generate(name));
      console.log(`wrote ${OUT_DIR}/${name}`);
    }
    console.log(`\n${sources().length} bodies generated from ${SRC_DIR}.\n`);
  } else {
    const problems = drift();
    if (!problems.length) console.log(`\n${OUT_DIR} is exactly what the generator produces. Nothing to write.\n`);
    else {
      console.log(`\n${problems.length} difference(s) — run with --write:\n`);
      for (const p of problems) console.log(`  ${p}`);
      console.log('');
    }
  }
}

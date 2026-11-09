#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join, dirname, relative, posix } from 'node:path';
import { runArtifacts, runDirs as findRunDirs, runLanguage } from './run-files.mjs';
import { envelopeView, envelopeAtApproval } from './envelope.mjs';

export const READ_DIR = 'read';

export const COPIED_ARTIFACT = 'A14';

const BANNER = {
  cs: '> **Čtenářská verze dokumentu iniciativy.** Text pod čarou je shodný se zdrojovým dokumentem. ' +
      'Strojový záznam zůstává ve zdroji a zde se neopakuje. Tento soubor se generuje automaticky, ' +
      'proto jej neupravujte; ruční změna neprojde kontrolou.',
  en: '> **Reading copy of the initiative document.** The text below the line is identical to the source ' +
      'document. The machine record stays in the source and is not repeated here. This file is generated, ' +
      'so do not edit it; a hand edit fails the build.',
};

const FIELD = (src, key) => {
  const m = src.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'));
  return m ? m[1].trim() : null;
};

export function splitArtifact(text) {
  const t = String(text);
  const m = /^\ufeff?---\r?\n([\s\S]*?\r?\n)---\r?\n/.exec(t);
  if (!m) return null;
  return { record: m[1], body: t.slice(m[0].length).replace(/^[\r\n]+/, '') };
}

export function rehomeLinks(body, artRel, copied) {
  const fromDir = posix.dirname(artRel) === '.' ? '' : posix.dirname(artRel);
  const toDir = posix.join(READ_DIR, fromDir);
  return body.replace(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/g, (whole, href) => {
    const [path, hash = ''] = href.split(/(?=#)/);
    if (!path) return whole;
    const target = posix.join(fromDir, path);
    const wanted = copied.has(target) ? posix.join(READ_DIR, target) : target;
    const rel = posix.relative(toDir, wanted) || '.';
    return `](${rel}${hash})`;
  });
}

export function renderCopy(runDir, art, copied, language, text = readFileSync(art.abs, 'utf8')) {
  const split = splitArtifact(text);
  if (!split) return null;

  const head = (language === 'cs' ? BANNER.cs : BANNER.en) + '\n\n---\n\n';
  return head + rehomeLinks(split.body, art.rel, copied);
}

export function expected(runDir) {
  const out = [];
  const arts = runArtifacts(runDir);
  const serve = arts.filter(a => a.id === COPIED_ARTIFACT);
  const copied = new Set(serve.map(a => a.rel));
  const language = runLanguage(runDir);
  const view = serve.length && envelopeAtApproval(runDir) ? envelopeView(runDir).texts : null;
  for (const art of serve) {
    const seen = view ? view.get(String(art.rel).split('\\').join('/')) : undefined;
    const want = renderCopy(runDir, art, copied, language, seen !== undefined ? seen : readFileSync(art.abs, 'utf8'));
    if (want === null) continue;
    out.push({ rel: join(READ_DIR, art.rel), want, source: art.rel });
  }
  return out;
}

export function present(runDir) {
  const base = join(runDir, READ_DIR);
  const out = [];
  if (!existsSync(base)) return out;
  const walk = d => {
    for (const n of readdirSync(d).sort()) {
      const abs = join(d, n);
      if (statSync(abs).isDirectory()) walk(abs);
      else if (n.endsWith('.md')) out.push(relative(runDir, abs));
    }
  };
  walk(base);
  return out;
}

export function drift(runDir) {
  return driftOf(runDir).map(p => (p.kind === 'missing' ? `${p.path} is missing`
    : p.kind === 'differs' ? `${p.path} is not what the generator produces — first difference at line ${p.line}`
    : `${p.path} copies no artifact this run carries — a stale copy reads as current`));
}

export function driftOf(runDir) {
  const want = expected(runDir);
  const have = new Set(present(runDir));
  const problems = [];

  for (const { rel, want: text, source } of want) {
    const path = join(runDir, rel);
    have.delete(rel);
    if (!existsSync(path)) { problems.push({ kind: 'missing', rel, path, source }); continue; }
    if (readFileSync(path, 'utf8') !== text) {
      const a = text.split('\n'), b = readFileSync(path, 'utf8').split('\n');
      const i = a.findIndex((l, n) => l !== b[n]);
      problems.push({ kind: 'differs', rel, path, source, line: i + 1 });
    }
  }
  for (const orphan of have)
    problems.push({ kind: 'orphan', rel: orphan, path: join(runDir, orphan), source: null });

  return problems;
}

function write(runDir) {
  const base = join(runDir, READ_DIR);
  if (existsSync(base)) rmSync(base, { recursive: true });
  let n = 0;
  for (const { rel, want } of expected(runDir)) {
    const path = join(runDir, rel);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, want);
    n++;
  }
  return n;
}

const argv = process.argv.slice(2);
const doWrite = argv.includes('--write');
const target = argv.find(a => !a.startsWith('--'));

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('reading-copy.mjs')) {
  const dirs = target ? [target.replace(/\/$/, '')] : findRunDirs();
  if (!dirs.length) { console.error('no committed run found'); process.exit(1); }

  let bad = 0;
  for (const dir of dirs) {
    if (!existsSync(dir)) { console.error(`${dir} does not exist`); process.exit(1); }
    if (doWrite) {
      console.log(`wrote ${write(dir)} reading cop(ies) into ${join(dir, READ_DIR)}`);
    } else {
      const problems = drift(dir);
      if (problems.length) { bad++; problems.forEach(p => console.log(`  drift  ${p}`)); }
      else console.log(`  ok     ${dir} — ${expected(dir).length} reading cop(ies), none drifted`);
    }
  }
  if (!doWrite && bad) {
    console.log(`\n${bad} run(s) carry a reading copy that disagrees with its artifact. Regenerate with --write.`);
    process.exit(1);
  }
}

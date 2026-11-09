#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { RUNS_ROOT, openRuns, readText, unixText, twoRunsRefusal, stoppedRun, isFrame } from './run-files.mjs';
import { frontmatter } from './yaml.mjs';
import { envelopeView, envelopeAtApproval } from './envelope.mjs';   // r1.16.1 · PC

export const DOC_REL = join('3-competitive-analysis', '2-competitor-cards.md');
export const PARTS_REL = join('3-competitive-analysis', 'parts');
export const CLOSING = ['## What we could not establish', '## Co se nepodařilo zjistit'];

export function partBody(text) {
  const t = String(text);
  const m = /^\ufeff?---\r?\n[\s\S]*?\r?\n---\r?\n/.exec(t);
  return (m ? t.slice(m[0].length) : t).replace(/^[\r\n]+/, '').replace(/\s+$/, '');
}

export const PART_OF = 'A6';

export function parts(runDir) {
  const base = join(runDir, PARTS_REL);
  if (!existsSync(base)) return [];
  const out = [];
  for (const n of readdirSync(base).filter(x => x.endsWith('.md')).sort()) {
    const text = readText(join(base, n));
    if (isFrame(text)) continue;
    let of = null, unreadable = null;
    try { of = String((frontmatter(text, `${PARTS_REL}/${n}`) || {}).part_of || '').trim(); }
    catch (e) { unreadable = e.message; }
    if (unreadable) { out.push({ name: n, body: partBody(text), unreadable }); continue; }
    if (of !== PART_OF) continue;
    out.push({ name: n, body: partBody(text), unreadable: null });
  }
  return out;
}

export function expected(runDir) {
  const docPath = join(runDir, DOC_REL);
  if (!existsSync(docPath)) return { doc: null, applies: false, reason: `${DOC_REL} is not in this run` };
  const ps = parts(runDir);
  if (!ps.length) return { doc: null, applies: false, reason: `${PARTS_REL} holds no part marked part_of: ${PART_OF}` };
  const unreadable = ps.filter(p => p.unreadable);
  if (unreadable.length)
    return { doc: null, applies: true,
      reason: `${unreadable.map(p => p.name).join(', ')} cannot be read: ${unreadable[0].unreadable}` };
  const doc = readText(docPath);

  const heads = ps.map(p => (p.body.match(/^## (.+)$/m) || [])[1]).filter(Boolean);
  if (heads.length !== ps.length) {
    const bad = ps.filter(p => !/^## (.+)$/m.test(p.body)).map(p => p.name);
    return { doc: null, applies: true,
      reason: `${bad.join(', ')} carr${bad.length === 1 ? 'ies' : 'y'} no '## ' heading, so the join has nothing to place ${bad.length === 1 ? 'it' : 'them'} by` };
  }

  const closeAt = Math.max(...CLOSING.map(c => doc.indexOf(`\n${c}`)));
  if (closeAt < 0)
    return { doc: null, applies: true,
      reason: `${DOC_REL} ends at neither closing heading (${CLOSING.join(' / ')}), so the card region has no end — the ninth run failed here on a Czech document` };
  const firstAt = doc.search(new RegExp(`^## (?:${heads.map(esc).join('|')})\\s*$`, 'm'));

  const at = firstAt < 0 || firstAt > closeAt ? closeAt + 1 : firstAt;
  const opening = doc.slice(0, at);
  const closing = doc.slice(closeAt + 1);
  const region = firstAt < 0 || firstAt > closeAt ? '' : doc.slice(at, closeAt);

  const order = [...region.matchAll(/^## (.+)$/gm)].map(m => m[1].trim());
  const byHead = new Map(ps.map((p, i) => [heads[i].trim(), p]));
  const arranged = order.length ? order.map(h => byHead.get(h)).filter(Boolean) : ps;
  if (arranged.length !== ps.length) {
    const noPart = order.filter(h => !byHead.has(h));
    const noHead = heads.filter(h => !order.includes(h));
    return { doc: null, applies: true,
      reason: `the card region lists ${order.length} card heading(s) and ${PARTS_REL} holds ${ps.length} part(s)` +
        (noPart.length ? `; heading(s) with no part: ${noPart.join(', ')}` : '') +
        (noHead.length ? `; part(s) with no heading in the document: ${noHead.join(', ')}` : '') +
        `. To fix it: empty the card region between the opening and the closing heading, then run this again` };
  }

  return { doc: opening + arranged.map(p => p.body).join('\n\n') + '\n\n' + closing, applies: true, reason: null,
           placed: arranged.map(p => (p.body.match(/^## (.+)$/m) || [])[1]) };
}

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function drift(runDir) {
  const e = expected(runDir);
  if (!e.applies) return [];
  if (e.doc === null) return [`${join(runDir, DOC_REL)}: the card region cannot be assembled — ${e.reason}`];
  const want = unixText(e.doc);
  const path = join(runDir, DOC_REL);
  const have = readText(path);
  if (have === want) return [];
  const w = want.split('\n'), h = have.split('\n');
  let i = 0;
  while (i < Math.max(w.length, h.length) && w[i] === h[i]) i++;
  return [`${path}: the card region is not what ${PARTS_REL} holds — first difference at line ${i + 1}`];
}

function write(runDir) {
  const e = expected(runDir);
  if (e.doc === null) return e;
  let doc = e.doc;
  if (envelopeAtApproval(runDir)) {
    writeFileSync(join(runDir, DOC_REL), doc);
    const t = envelopeView(runDir).texts.get(DOC_REL.split('\\').join('/'));
    if (t !== undefined) doc = t;
  }
  writeFileSync(join(runDir, DOC_REL), doc);
  return e;
}

const argv = process.argv.slice(2);
const target = argv.find(a => !a.startsWith('--'));
if (process.argv[1]?.endsWith('card-join.mjs')) {
  let target2 = target;
  if (!target2) {
    const open = openRuns();
    if (!open.length) {
      console.error(`card-join: no unfinished run under \`${RUNS_ROOT}\` — name one: ` +
        `node .github/scripts/card-join.mjs ${RUNS_ROOT}/<run_id> [--write]`);
      process.exit(1);
    }
    if (open.length > 1) {
      console.error(twoRunsRefusal(open, RUNS_ROOT));
      process.exit(1);
    }
    target2 = open[0];
  }
  const dir = target2.replace(/\/$/, '');
  if (!existsSync(dir)) { console.error(`${dir} does not exist`); process.exit(1); }
  if (argv.includes('--write')) {
    { const stopped = stoppedRun(dir); if (stopped) { console.log(`\n${stopped}\n`); process.exit(3); } }
    const e = write(dir);
    if (e.doc !== null) {
      console.log(`spliced the card region of ${join(dir, DOC_REL)} from ${parts(dir).length} part(s)`);
      console.log(`placed, in this order: ${(e.placed || []).join(', ')}`);
    }
    else {
      console.log(`${dir}: nothing spliced — ${e.reason}`);
      if (e.applies) process.exit(1);
    }
  } else {
    const e = expected(dir);
    if (!e.applies) { console.log(`  --  ${dir}: does not apply — ${e.reason}`); process.exit(0); }
    const problems = drift(dir);
    if (problems.length) { problems.forEach(x => console.log(`  ${x}`)); process.exit(1); }
    console.log(`  ok  ${join(dir, DOC_REL)} carries ${parts(dir).length} part(s) word for word`);
  }
}

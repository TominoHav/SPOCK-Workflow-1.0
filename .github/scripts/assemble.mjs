#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, openRuns, stoppedRun, twoRunsRefusal } from './run-files.mjs';
import { startBegunRuns } from './advance.mjs';
import { blockFindingLine } from './frame.mjs';
import { frontmatter } from './yaml.mjs';
import { ENVELOPE_AT_APPROVAL_BUILD } from './gates.mjs';
import { assembleRun, frameLeftLine, EnvelopeRefusal, envelopeAtApproval } from './envelope.mjs';
export { assembleRun, frameLeftLine };

const die = m => { console.error(m); process.exit(2); };

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const write = process.argv.includes('--write') || process.argv.includes('--finalise');
  if (write) for (const started of startBegunRuns()) console.log(`  started ${started} — it held work and no record`);
  const argv = process.argv.slice(2);
  const si = argv.indexOf('--stage');
  const stage = si >= 0 ? argv[si + 1] : null;
  if (si >= 0 && !/^\d+$/.test(String(stage || '')))
    die('assemble: --stage takes a stage number, as in `--stage 6`');
  const arg = argv.filter((a, i) => si < 0 || (i !== si && i !== si + 1)).find(a => !a.startsWith('-'));
  let dir;
  if (arg) {
    dir = join(RUNS_ROOT, arg);
    if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`assemble: ${dir} has no RUN-STATE.md`);
  } else {
    const open = openRuns();
    if (!open.length) die(`assemble: no unfinished run under \`${RUNS_ROOT}\``);
    if (open.length > 1) die(twoRunsRefusal(open, RUNS_ROOT));
    dir = open[0];
  }
  if (write) { const stopped = stoppedRun(dir); if (stopped) { console.log(`\n${stopped}\n`); process.exit(3); } }
  const finalise = argv.includes('--finalise');
  const recorded = (() => { try { return frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md'); } catch { return {}; } })();
  const stagesOn = (recorded.stages || []).map(s => ({ ...s, id: Number(s.id) })).sort((a, b) => a.id - b.id);
  const target = stage != null ? stagesOn.find(s => s.id === Number(stage)) : stagesOn.find(s => s.status !== 'accepted');
  const newPath = envelopeAtApproval(dir);
  if (finalise) {
    if (stage == null) die('assemble: --finalise writes one stage, named as in `--stage 1 --finalise`');
    if (!newPath) die(`assemble: ${basename(dir)} was started before ${ENVELOPE_AT_APPROVAL_BUILD}, where the envelope is filled while the stage is written, so --finalise writes nothing on it`);
    if (!target || target.status !== 'accepted')
      die(`assemble: stage ${stage} of ${basename(dir)} is ${target ? `"${target.status}"` : 'not on its record'}, and --finalise writes only a stage that is accepted`);
  } else if (write && newPath && target && target.status !== 'accepted') {
    let v;
    try { v = assembleRun(dir, { view: true, stage }); }
    catch (e) { if (e instanceof EnvelopeRefusal) die(e.message); throw e; }
    if (v.unidentified && v.unidentified.length) {
      console.error(`${v.runId} — stage ${v.stage}: ${v.unidentified.length} file(s) here carry no readable ` +
        `\`artifact_id\`, so this tool cannot tell which artifact they are:\n` + v.unidentified.map(f => `  ${f}`).join('\n') +
        `\n\nAdd \`artifact_id: <id>\` to the front matter of each and run this again.`);
      process.exit(1);
    }
    for (const f of v.frames || []) console.log(frameLeftLine(f));
    for (const x of v.refusals || []) console.log(`  envelope  ${x.rel} — ${x.line}`);
    if (!(v.refusals || []).length)
      console.log(`${v.runId} — stage ${v.stage}: nothing is written while the stage is being written; the workflow writes the envelope when the stage is approved.`);
    process.exit((v.refusals || []).length ? 1 : 0);
  }
  let r;
  try { r = assembleRun(dir, { write, stage, finalise }); }
  catch (e) { if (e instanceof EnvelopeRefusal) die(e.message); throw e; }
  if (r.note) { console.log(`${r.runId} — ${r.note}`); process.exit(0); }
  if (r.unidentified && r.unidentified.length) {
    console.error(`${r.runId} — stage ${r.stage}: ${r.unidentified.length} file(s) here carry no readable ` +
      `\`artifact_id\`, so this tool cannot tell which artifact they are and has filled nothing for them:\n` +
      r.unidentified.map(f => `  ${f}`).join('\n') +
      `\n\nAdd \`artifact_id: <id>\` to the front matter of each and run this again. ` +
      `**This is not "nothing to change"** — that is what it used to say, and it hid a real defect for eight days.`);
    process.exit(1);
  }
  for (const f of r.frames || []) console.log(frameLeftLine(f));
  if (!r.touched.length) {
    console.log(`${r.runId} — stage ${r.stage}: ${r.identified} document(s) found and identified, ` +
      `and every envelope already matches the registers. Nothing to change.`);
    process.exit(0);
  }
  console.log(`${r.runId} — stage ${r.stage}\n`);
  for (const t of r.touched) {
    console.log(`  ${write ? 'filled ' : 'would fill'} ${t.file ? t.file : t.id}${t.note ? ` — ${t.note}` : ''}`);
    for (const h of t.headings || []) console.log(`    line ${h.line}: "${h.from}" → "${h.to}"`);
    for (const b of t.backs || []) console.log(b.inserted
      ? '    wrote the opening block under the title from the record; fill its "For you to judge" place with what the person decides and where'
      : `    wrote back the opening block: ${blockFindingLine(b)}`);
  }
  console.log(`\n${r.touched.length} file(s) ${write ? 'written' : 'would change'}. ` +
    `The envelope comes from the contract, the registry and the field spec; the body and the answers are yours, ` +
    `except the section headings of the initiative and the PRD.`);
  if (!write) console.log('Run again with --write.\n'); else console.log('');
}

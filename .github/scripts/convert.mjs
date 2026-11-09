import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join, basename, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, openRuns, stoppedRun, twoRunsRefusal } from './run-files.mjs';
import { material } from './material.mjs';
import { extract } from './extract-ooxml.mjs';
import { extractPdf, PdfRefusal, WORD_ROUTE } from './extract-pdf.mjs';

const die = m => { console.error(m); process.exit(2); };

const header = (src, kind) => [
  `<!-- Converted from ${src} by .github/scripts/convert.mjs. Not written by a person in this form. -->`,
  '',
  `# ${src}`,
  '',
  `**This is extracted text, not the document.** ${kind}. Layout, styling, images, comments, tracked`,
  'changes and anything a shape or a chart carried are not here. Go back to the original before quoting',
  'anything whose meaning depends on how it looked.',
  '',
  '---',
  '',
].join('\n');

const KINDS = {
  '.docx': 'Paragraphs in document order, each table row on one line with its cells separated by " | "',
  '.pptx': 'One section per slide, in the deck\'s own order, with the speaker notes under each slide',
  '.xlsx': 'One section per sheet, in the workbook\'s order and named, rows as pipe-separated cells, each under its own column, dates as dates',
  '.pdf': 'One section per page, in page order. Text comes in the order the PDF draws it, so columns and tables read as lines, and form field values are not read',
};
KINDS['.docm'] = KINDS['.docx']; KINDS['.pptm'] = KINDS['.pptx']; KINDS['.xlsm'] = KINDS['.xlsx'];

export function convert(dir, { only = null } = {}) {
  const { root, files } = material(dir);
  const done = [], failed = [], skipped = [];
  for (const f of files.filter(x => (x.kind === 'office' || x.kind === 'pdf') && !x.artifact && (!only || only.includes(x.rel)))) {
    const out = `${f.path}.md`;
    if (existsSync(out)) { skipped.push(f.rel); continue; }
    try {
      const text = f.kind === 'pdf'
        ? extractPdf(f.path).pages.map((t, i) => `## Page ${i + 1}\n\n${t}`).join('\n\n')
        : extract(f.path);
      writeFileSync(out, header(basename(f.rel), KINDS[extname(f.rel).toLowerCase()] || 'Extracted text') + text.trimEnd() + '\n');
      done.push({ rel: `${f.rel}.md`, from: f.rel, bytes: text.length });
    } catch (e) {
      if (e instanceof PdfRefusal) failed.push({ rel: f.rel, why: `${e.message}. ${WORD_ROUTE}`, kind: e.kind });
      else failed.push({ rel: f.rel, why: e.message.split('\n')[0] });
    }
  }
  return { root, done, failed, skipped };
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const arg = process.argv.slice(2).find(a => !a.startsWith('-'));
  let dir;
  if (arg) {
    dir = join(RUNS_ROOT, arg);
    if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`convert: ${dir} has no RUN-STATE.md`);
  } else {
    const open = openRuns();
    if (!open.length) die(`convert: no unfinished run under \`${RUNS_ROOT}\``);
    if (open.length > 1) die(twoRunsRefusal(open, RUNS_ROOT));
    dir = open[0];
  }
  { const stopped = stoppedRun(dir); if (stopped) { console.log(`\n${stopped}\n`); process.exit(3); } }

  const { root, done, failed, skipped } = convert(dir);
  if (!done.length && !failed.length && !skipped.length) {
    console.log(`${basename(dir)} — nothing to convert. No Word, PowerPoint, Excel or PDF file was supplied.`);
    process.exit(0);
  }
  for (const d of done) console.log(`  converted ${d.from} → ${d.rel}`);
  for (const s of skipped) console.log(`  already converted ${s} — left alone`);
  for (const f of failed) console.log(`  ! ${f.rel} ${f.kind ? 'was not read' : 'would not open'}: ${f.why}`);
  console.log(`\n${done.length} file(s) written into ${root}/, readable by path.`);
  if (failed.length) process.exit(1);
}

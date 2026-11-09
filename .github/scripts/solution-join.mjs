#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { selectedId, standingChoices, recordedDecisions, chosenSolution, OPPORTUNITIES_COLUMN_BUILD } from './gates.mjs';
import { compliancePart, NOT_AUTHORED, partHash, recordedBuild, buildAtLeast, areas as complianceAreas } from './derive.mjs';
import { INDEX_LABELS, shownDate } from './fixed-messages.mjs';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, openRuns, runArtifacts, runLanguage, readText, stoppedRun, twoRunsRefusal, isFrame } from './run-files.mjs';
import { frontmatter, unquote } from './yaml.mjs';
import { DOC_SKELETONS, CLOSING, sectionsIn, inLanguage } from './doc-structure.mjs';
import { supersedeFile } from './withdraw.mjs';
import { titleOf, openingFor } from './frame.mjs';
import { opportunityShown } from './contracts.mjs';   // r1.16 · R16-7: `O1 (H1)` where a person reads an opportunity
import { FILL } from './run-files.mjs';

const STAGE = '4-solutions';
export const DOC_REL = join(STAGE, '1-solution-set.md');
const read = readText;
const fm = (t, k) => (t.match(new RegExp(`^${k}:\\s*(.+?)\\s*$`, 'm')) || [])[1] || '';
const bodyOf = t => t.replace(/^\ufeff?---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
export const MARK_OPEN = '<!-- SOLUTIONS -->';
export const MARK_CLOSE = '<!-- /SOLUTIONS -->';
export const region = t => {
  const i = t.indexOf(MARK_OPEN), j = t.indexOf(MARK_CLOSE);
  return i === -1 || j === -1 ? null : t.slice(i + MARK_OPEN.length, j);
};

export const SLATE_REL = join(STAGE, 'briefs', 'slate.md');

export function slateIdeas(dir) {
  const text = read(join(dir, SLATE_REL));
  const list = a => (a || '').replace(/^\[|\]$/g, '').split(',').map(x => x.trim()).filter(Boolean);
  const out = [];
  for (const line of text.split('\n')) {
    const id = (line.match(/^\s*-\s*id:\s*(\S+?)\s*$/) || [])[1];
    if (id) { out.push({ id, solves: [], supported_by: [] }); continue; }
    if (!out.length) continue;
    const m = line.match(/^\s+(solves|supported_by):\s*(.+?)\s*$/);
    if (m) out[out.length - 1][m[1]] = list(m[2]);
  }
  return out;
}

export function order(dir) {
  const slate = read(join(dir, STAGE, 'briefs', 'slate.md'));
  const named = slateIdeas(dir).map(x => x.id);
  if (!named.length) named.push(...[...slate.matchAll(/^\s*[-*]?\s*\**([A-Za-z]+-?\d+)\**\s*[·—:-]/gm)].map(m => m[1]));
  const onDisk = existsSync(join(dir, STAGE, 'parts'))
    ? readdirSync(join(dir, STAGE, 'parts')).filter(f => /\.md$/.test(f) && !NOT_AUTHORED.test(f)
        && !isFrame(read(join(dir, STAGE, 'parts', f))))
        .map(f => basename(f, '.md')).sort()
    : [];
  const hasSlate = existsSync(join(dir, STAGE, 'briefs', 'slate.md'));
  const seen = new Set();
  const out = [];
  for (const id of named) if (onDisk.includes(id) && !seen.has(id)) { seen.add(id); out.push(id); }
  if (!hasSlate) for (const id of onDisk) if (!seen.has(id)) { seen.add(id); out.push(id); }
  return out;
}

export function partFields(dir, id) {
  const t = read(join(dir, STAGE, 'parts', `${id}.md`));
  const head = (t.match(/^\ufeff?---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
  const statement = (head.match(/^statement:\s*(.+?)\s*$/m) || [])[1] || '';
  const origin = (head.match(/^origin:\s*(.+?)\s*$/m) || [])[1] || '';
  const touchpoints = [];
  const i = head.indexOf('compliance_touchpoints:');
  if (i !== -1) for (const line of head.slice(i).split(/\r?\n/).slice(1)) {
    if (!/^\s+-\s/.test(line)) break;
    touchpoints.push(line.replace(/^\s+-\s*/, '').trim());
  }
  return { statement, origin, touchpoints };
}

export function ideasBlock(dir, ideas) {
  return ['ideas:', ...ideas.map(x => {
    const f = partFields(dir, x.id);
    const L = [`  - id: ${x.id}`,
               `    solves: [${x.solves.join(', ')}]`,
               `    supported_by: [${x.supported_by.join(', ')}]`];
    if (f.statement) L.push(`    statement: ${f.statement}`);
    if (f.origin) L.push(`    origin: ${f.origin}`);
    if (f.touchpoints.length) L.push('    compliance_touchpoints:', ...f.touchpoints.map(s => `      - ${s}`));
    return L.join('\n');
  })].join('\n');
}

export function withIdeas(text, block) {
  const m = /^\ufeff?---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return text;
  const nl = m[0].includes('\r\n') ? '\r\n' : '\n';
  const bom = m[0].charCodeAt(0) === 0xfeff ? '\ufeff' : '';
  const head = m[1].split(/\r?\n/);
  const i = head.findIndex(l => /^ideas:/.test(l));
  if (i === -1) return text;
  let j = i + 1;
  while (j < head.length && !/^\S/.test(head[j])) j++;
  const next = [...head.slice(0, i), ...block.split('\n'), ...head.slice(j)].join(nl);
  return `${text.slice(0, m.index)}${bom}---${nl}${next}${nl}---${text.slice(m.index + m[0].length)}`;
}

export function skeleton(dir, ideas) {
  const runId = basename(dir);
  const lang = runLanguage(dir) === 'cs' ? 'cs' : 'en';
  const opening = openingFor(dir, 'A8', 4, lang);
  return [
    '---',
    `run_id: ${runId}`,
    'artifact_id: A8',
    ideasBlock(dir, ideas),
    '---',
    '',
    titleOf('A8', 4, lang),
    '',
    ...(opening ? [...opening, ''] : []),
    `${FILL} the finding, two to four sentences on what this set establishes]]`,
    '',
    MARK_OPEN,
    MARK_CLOSE,
    '',
    `## ${inLanguage(CLOSING[0], lang)}`,
    '',
    `${FILL} what the material, the market or the research could not settle]]`,
    '',
    `## ${inLanguage(CLOSING[1], lang)}`,
    '',
    `${FILL} the procedure: inputs, reductions, rules no check decided, edits]]`,
    '',
  ].join('\n');
}

export const noStatement = id => `${id} has no solution statement: add \`statement:\` to the front matter of ` +
  `4-solutions/parts/${id}.md, then run "SPOCK: stage 4 — derive the compliance sections" and ` +
  `"SPOCK: stage 4 — assemble the solution set"`;

export function expected(dir) {
  const ids = order(dir);
  if (!ids.length) return { applies: false, reason: 'no stage-4 parts on disk' };
  const problems = [], unstated = [];
  const rows = [], blocks = [];
  for (const id of ids) {
    const partFile = join(dir, STAGE, 'parts', `${id}.md`);
    const part = readText(partFile);
    const der = readText(compliancePart(dir, id));
    if (!partFields(dir, id).statement) unstated.push(id);
    if (!der) { problems.push(`${id} has no derived compliance section — run derive.mjs before the join`); continue; }
    const want = partHash(partFile);
    const got = fm(der, 'derived_from');
    if (got !== want)
      problems.push(`${id}'s compliance section was derived from a different version of the solution (${got || 'no hash'} against ${want}) — re-run derive.mjs`);
    const heading = (part.match(/^##\s+(.+)$/m) || [])[1] || id;
    rows.push({
      id, heading: heading.trim(),
      touchpoints: fm(der, 'touchpoints') || '0',
      areas: (fm(der, 'areas_in_play') || '[]').replace(/^\[|\]$/g, '').trim() || 'none',
    });
    blocks.push(`${bodyOf(part)}\n\n${bodyOf(der)}`);
  }
  const cols = indexColumns(dir);
  const solves = new Map(slateIdeas(dir).map(x => [x.id, x.solves]));
  const shown = opportunityShown(dir);
  const header = indexHeader(dir);
  const areasOf = indexAreas(dir);
  const table = [
    `|${header.map(c => (c ? ` ${c} ` : ' ')).join('|')}|`,
    `|${cols.map(() => '---').join('|')}|`,
    ...rows.map(r => `| **${r.id}** | ${r.heading.replace(/^\S+\s*[-–—]\s*/, '')} | ` +
      `${cols.includes(OPPORTUNITIES_COLUMN) ? `${(solves.get(r.id) || []).map(shown).join(', ')} | ` : ''}${r.touchpoints} | ${areasOf(r.areas)} |`),
  ].join('\n');
  return { applies: true, problems, unstated, ids, table, body: `${table}\n\n${blocks.join('\n\n')}\n` };
}

export const OPPORTUNITIES_COLUMN = 'Opportunities';
export function indexColumns(dir) {
  return ['', 'Solution', ...(buildAtLeast(recordedBuild(dir), OPPORTUNITIES_COLUMN_BUILD) ? [OPPORTUNITIES_COLUMN] : []), 'Touchpoints', 'Areas in play'];
}

export function indexHeader(dir) {
  const cols = indexColumns(dir);
  if (!cols.includes(OPPORTUNITIES_COLUMN)) return cols;
  const lang = runLanguage(dir) === 'cs' ? 'cs' : 'en';
  return cols.map(c => (c && INDEX_LABELS[c] ? INDEX_LABELS[c][lang] : c));
}
export function indexAreas(dir) {
  if (!indexColumns(dir).includes(OPPORTUNITIES_COLUMN)) return list => list;
  const lang = runLanguage(dir) === 'cs' ? 'cs' : 'en';
  const names = new Map(complianceAreas().map(a => [a.id, (lang === 'cs' && a.name_cs) || a.name]));
  return list => {
    const ids = String(list || '').split(',').map(s => s.trim()).filter(s => s && s !== 'none');
    return ids.length ? ids.map(id => names.get(id) || id).join('; ') : INDEX_LABELS.none[lang];
  };
}

export const A9_REL = join(STAGE, '2-selected-solution.md');
export const PICK_OPEN = '<!-- SELECTED -->';
export const PICK_CLOSE = '<!-- /SELECTED -->';

export { runLanguage };

const SELECTED_WORDS = {
  en: {
    title: name => `Solutions | Selected solution: ${name}`,
    list: xs => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`),
    opening: w => `${w.by} chose ${w.id}, ${w.statement}. The reason below is ${w.by}'s own, as recorded, and the solution follows it whole.`,
    selected: w => `${w.heading}, chosen by ${w.by}, ${w.role}, on ${w.at}.`,
    solves: w => `${w.statement}. It answers ${w.solves}.`,
    unanswered: opps => `It does not answer ${opps}, which other solutions in the set answer.`,
    notChosen: headings => `Not chosen: ${headings}.`,
    answersAll: 'Every opportunity the set answers, this solution answers too.',
    carries: n => `The solution below, whole and word for word, with its compliance section of ${n} touchpoints.`,
    couldNot: 'This document records a choice and the reason given for it. It does not re-examine the evidence behind the solution; what the solution could not establish is stated inside it, above.',
    produced: w => `Written by the workflow at G4 on ${w.today}, when ${w.signer} approved stage 4 of ${w.runId}. "${w.why}" is copied word for word from the choice ${w.by} recorded on ${w.at} with \`${w.task}\`. The solution is carried word for word from \`4-solutions/parts/${w.id}.md\` and its derived compliance section by \`solution-join.mjs\`. No agent wrote any part of this document.`,
  },
  cs: {
    title: name => `Discovery | Vybraná varianta: ${name}`,
    list: xs => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} a ${xs[xs.length - 1]}`),
    opening: w => `Vybráno je ${w.id}, ${w.statement}. Zdůvodnění níže je doslovně převzaté ze zaznamenané volby (${w.by}) a řešení za ním následuje celé.`,
    selected: w => `${w.heading}. Vybráno: ${w.by}, ${w.role}, ${w.at}.`,
    solves: w => `${w.statement}. Odpovídá na ${w.solves}.`,
    unanswered: opps => `Neodpovídá na ${opps}, na které odpovídají jiná řešení v sadě.`,
    notChosen: headings => `Nevybráno: ${headings}.`,
    answersAll: 'Na každou příležitost, na kterou sada odpovídá, odpovídá i toto řešení.',
    carries: n => `Řešení níže, celé a doslovně, včetně oddílu compliance s ${n} touchpointy.`,
    couldNot: 'Tento dokument zaznamenává volbu a důvod, který k ní byl uveden. Důkazy, na kterých řešení stojí, znovu neposuzuje; co řešení zjistit nedokázalo, je uvedeno přímo v něm, výše.',
    produced: w => `Napsáno workflow u G4 dne ${w.today} při schválení fáze 4 běhu ${w.runId}; schválení: ${w.signer}. Oddíl „${w.why}“ je doslovně převzat z volby zaznamenané dne ${w.at} (${w.by}) úlohou \`${w.task}\`. Řešení je doslovně přeneseno z \`4-solutions/parts/${w.id}.md\` a z jeho odvozeného oddílu compliance skriptem \`solution-join.mjs\`. Žádnou část tohoto dokumentu nenapsal agent.`,
  },
};

export function selectedDocument(dir, { id, choice, signer, status, today, lang = 'en' } = {}) {
  const words = SELECTED_WORDS[String(lang || 'en')];
  if (!words) return { problem: `the run's language is "${lang}", and this document is written in en or cs only` };
  const doc = read(join(dir, DOC_REL));
  let ideas = [];
  try { ideas = doc.trim() ? (frontmatter(doc, DOC_REL) || {}).ideas || [] : []; } catch { ideas = []; }
  ideas = (Array.isArray(ideas) ? ideas : []).filter(x => x && x.id);
  const entry = ideas.find(x => String(x.id) === String(id));
  if (!entry) return { problem: `the solution set carries no entry for ${id}` };
  const part = read(join(dir, STAGE, 'parts', `${id}.md`));
  if (!part) return { problem: `${id} has no part on disk` };
  const reason = choice && choice.what != null ? String(choice.what) : '';
  if (!reason.trim()) return { problem: `the choice recorded for ${id} carries no reason` };

  const headingOf = t => ((t.match(/^##\s+(.+)$/m) || [])[1] || '').trim();
  const heading = headingOf(part) || String(id);
  const name = heading.replace(/^\S+\s*[-–—]\s*/, '');
  const list = v => (Array.isArray(v) ? v : v == null || v === '' ? [] : [v]).map(String).filter(Boolean);
  const statement = String(entry.statement || '').trim().replace(/\.+$/, '');
  if (!statement) return { route: true, problem: partFields(dir, String(id)).statement
    ? `the solution set carries no statement for ${id}. Ask the agent to assemble the solution set again, then approve again`
    : `${id} has no solution statement. Ask the agent to write one for ${id} and to assemble the solution set again, then approve again` };
  const solves = list(entry.solves);
  const unanswered = [...new Set(ideas.filter(x => String(x.id) !== String(id)).flatMap(x => list(x.solves)))]
    .filter(o => !solves.includes(o)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const others = order(dir).filter(x => x !== String(id))
    .map(x => headingOf(read(join(dir, STAGE, 'parts', `${x}.md`)))).filter(Boolean);
  const touchpoints = fm(read(compliancePart(dir, id)), 'touchpoints') || '0';
  const shown = opportunityShown(dir, lang);

  const [selectedH, solvesH, whyH, notH, carriesH] = sectionsIn(DOC_SKELETONS.A9.sections, lang);
  const [couldNotH, producedH] = CLOSING.map(c => inLanguage(c, lang));
  const decs = (() => { try { return frontmatter(read(join(dir, 'RUN-STATE.md')), 'RUN-STATE.md').decisions || []; } catch { return []; } })();
  const replaced = decs.some(d => d && String(d.kind) === 'choice' && String(d.stage) === String(choice.stage ?? 4)
    && d.superseded_by && String(d.superseded_by) === String(choice.at || ''));
  const w = { id: String(id), by: String(choice.by || ''), role: String(choice.role || ''), at: shownDate(String(choice.at || '')),
              task: replaced ? 'SPOCK: replace a decision that no longer stands' : 'SPOCK: record a decision I made',
              statement, heading, solves: words.list(solves.map(shown)), signer: String(signer || ''), today: shownDate(String(today || '')),
              runId: basename(dir), why: whyH };
  const notAddressed = [unanswered.length ? words.unanswered(words.list(unanswered.map(shown))) : null,
                        others.length ? words.notChosen(others.join('; ')) : null].filter(Boolean);
  return [
    '---',
    `run_id: ${basename(dir)}`,
    'artifact_id: A9',
    'ost_role: solution',
    `status: ${status}`,
    'workflow: discovery',
    'modified_by: human',
    'revisions: 0',
    'sources: [A8]',
    'external_sources: []',
    `assembled_at: ${today}`,
    '---',
    '',
    `# ${words.title(name)}`,
    '',
    words.opening(w),
    '',
    `## ${selectedH}`, '', words.selected(w), '',
    `## ${solvesH}`, '', words.solves(w), '',
    `## ${whyH}`, '', reason, '',
    `## ${notH}`, '', notAddressed.length ? notAddressed.join(' ') : words.answersAll, '',
    `## ${carriesH}`, '', words.carries(touchpoints), '',
    PICK_OPEN, '', PICK_CLOSE, '',
    `## ${couldNotH}`, '', words.couldNot, '',
    `## ${producedH}`, '', words.produced(w), '',
  ].join('\n');
}

const splitDoc = t => {
  const m = /^\ufeff?---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(t);
  return m ? { fm: m[1].split(/\r?\n/), body: t.slice(m[0].length) } : { fm: null, body: t };
};
const decisionLines = fmLines => {
  const i = (fmLines || []).findIndex(l => /^decision:/.test(l));
  if (i === -1) return { block: [], rest: fmLines || [] };
  let j = i + 1;
  while (j < fmLines.length && /^\s+\S/.test(fmLines[j])) j++;
  return { block: fmLines.slice(i, j), rest: [...fmLines.slice(0, i), ...fmLines.slice(j)] };
};
const regionOf = body => {
  const opens = body.split(PICK_OPEN).length - 1, closes = body.split(PICK_CLOSE).length - 1;
  const i = body.indexOf(PICK_OPEN), j = body.indexOf(PICK_CLOSE);
  return opens === 1 && closes === 1 && i < j ? { i: i + PICK_OPEN.length, j } : null;
};
const withoutKept = t => {
  const s = splitDoc(t);
  const r = regionOf(s.body);
  const body = r ? s.body.slice(0, r.i) + s.body.slice(r.j) : s.body;
  return s.fm ? `---\n${decisionLines(s.fm).rest.join('\n')}\n---\n${body}` : body;
};

export function writeSelected(dir, opts = {}) {
  const made = selectedDocument(dir, opts);
  if (typeof made !== 'string') return made;
  const out = join(dir, A9_REL);
  const prior = read(out);
  let next = made;
  if (prior.trim()) {
    const keep = String(opts.status) === 'accepted';
    const was = splitDoc(prior), now = splitDoc(made);
    const block = keep ? decisionLines(was.fm).block : [];
    const fmNext = block.length ? [...decisionLines(now.fm).rest, ...block] : now.fm;
    const rWas = keep ? regionOf(was.body) : null, rNow = regionOf(now.body);
    const bodyNext = rWas && rNow ? now.body.slice(0, rNow.i) + was.body.slice(rWas.i, rWas.j) + now.body.slice(rNow.j) : now.body;
    next = `---\n${fmNext.join('\n')}\n---\n${bodyNext}`;
    if (next === prior) return { changed: false };
    if (!keep || withoutKept(prior) !== withoutKept(next)) {
      supersedeFile(dir, A9_REL, { reason: 'replaced by the selected-solution document the workflow writes from the record', by: 'the workflow' });
      console.log(String(opts.status) === 'accepted'
        ? '  replaced a selected-solution document that no longer said what the record says; the earlier text is in superseded/'
        : '  replaced a selected-solution document written before the approval; the earlier text is in superseded/');
    }
  }
  writeFileSync(out, next);
  return { changed: true };
}

export function selectedFromRecord(dir, state) {
  const st4 = ((state && state.stages) || []).find(s => s && Number(s.id) === 4);
  if (!st4 || String(st4.status) !== 'accepted') return { why: null };
  const t = read(join(dir, A9_REL));
  const reading = chosenSolution(dir, state, { gate: 'G4', text: t });
  const choices = reading.choices;
  let id, choice;
  if (reading.from === 'block') {
    id = reading.id;
    choice = reading.choice;
    if (!choice) return { why: `stage 4 is accepted selecting ${id} and no standing choice of ${id} is recorded, so the selected-solution document has no reason to carry and was not written. Record it with "SPOCK: record a decision I made", then run this again` };
  } else if (choices.length === 1) {
    choice = choices[0];
    id = reading.id;
    if (!id) return { why: 'the choice recorded on stage 4 names no solution, so the selected-solution document was not written' };
  } else if (!choices.length) {
    return { why: 'no choice is recorded on stage 4, so the selected-solution document has no reason to carry and was not written. Record it with "SPOCK: record a decision I made", then run this again' };
  } else {
    return { why: `stage 4 records ${choices.length} standing choices (${choices.map(c => `${selectedId(c.selection) || 'none'} on ${shownDate(c.at)}`).join(', ')}), and the document can carry one reason, so it was not written. Replace the one that no longer stands with "SPOCK: replace a decision that no longer stands", then run this again` };
  }
  const g4 = recordedDecisions(st4).find(d => d && d.id === 'G4');
  if (!g4) return { why: 'stage 4 is accepted and no G4 approval is recorded, so the selected-solution document was not written' };
  return { opts: { id, choice, signer: g4.decided_by, status: String(st4.status), today: g4.decided_at, lang: runLanguage(dir) } };
}

export function fillSelected(dir, state = undefined) {
  const out = join(dir, A9_REL);
  const t = read(out);
  if (!t.trim()) return null;
  let st = state;
  if (st === undefined) { try { st = frontmatter(read(join(dir, 'RUN-STATE.md')) || '---\n---\n', 'RUN-STATE.md'); } catch { st = null; } }
  const reading = chosenSolution(dir, st, { gate: 'G4', text: t });
  const raw = reading.raw !== undefined ? reading.raw : reading.blockRaw;
  const id = reading.id;
  if (!raw) return null;
  if (!id) return { problem: `A9 records selection "${raw}" and no identifier can be read from it` };
  const nOpen = t.split(PICK_OPEN).length - 1, nClose = t.split(PICK_CLOSE).length - 1;
  if (nOpen > 1 || nClose > 1)
    return { problem: `A9 carries ${nOpen} opening and ${nClose} closing marker(s); the carried region is ` +
      `bounded by the first of each, so a duplicate silently strands the text after it. Leave exactly one of each` };
  const i = t.indexOf(PICK_OPEN), j = t.indexOf(PICK_CLOSE);
  if (i === -1 || j === -1) return null;
  const part = read(join(dir, STAGE, 'parts', `${id}.md`));
  const der = read(compliancePart(dir, id));
  if (!part) return { problem: `${id} has no part on disk — A9 cannot carry a solution the run does not hold` };
  const body = `${bodyOf(part)}${der ? `\n\n${bodyOf(der)}` : ''}`;
  const next = `${t.slice(0, i + PICK_OPEN.length)}\n\n${body}\n\n${t.slice(j)}`;
  if (next === t) return { id, changed: false };
  writeFileSync(out, next);
  return { id, changed: true };
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  let dir = (argv.find(a => !a.startsWith('--')) || '').replace(/\/$/, '');
  if (!dir) {
    const open = openRuns();
    if (!open.length) {
      console.error(`solution-join: no unfinished run under \`${RUNS_ROOT}\` — name one: ` +
        `node .github/scripts/solution-join.mjs ${RUNS_ROOT}/<run_id> [--write]`);
      process.exit(1);
    }
    if (open.length > 1) {
      console.error(twoRunsRefusal(open, RUNS_ROOT));
      process.exit(1);
    }
    dir = open[0];
  }
  if (!existsSync(dir)) { console.error('usage: solution-join.mjs {runs_root}/<run_id> [--write]'); process.exit(1); }
  if (argv.includes('--write')) { const stopped = stoppedRun(dir); if (stopped) { console.log(`\n${stopped}\n`); process.exit(3); } }
  const e = expected(dir);
  if (!e.applies) { console.log(`  --  ${dir}: does not apply — ${e.reason}`); process.exit(0); }
  const stops = [...e.problems, ...e.unstated.map(noStatement)];
  if (stops.length) { stops.forEach(x => console.log(`  ${x}`)); process.exit(1); }
  const out = join(dir, DOC_REL);
  if (argv.includes('--write')) {
    const ideas = slateIdeas(dir);
    let t = read(out);
    if (!t.trim()) {
      if (!ideas.length) {
        console.error(`  ${out} does not exist and ${SLATE_REL} carries no ideas: block to build it from — ` +
          `run the slate phase before the join`);
        process.exit(1);
      }
      t = skeleton(dir, ideas);
      writeFileSync(out, t);
      console.log(`  created ${out} from the slate — ${ideas.length} idea(s), envelope and region only; ` +
        `fill each [[fill: …]] in it: what the person judges, the finding and the two closing sections`);
    } else if (!/^ideas:/m.test(t.split(/^\ufeff?---\r?$/m)[1] || '')) {
      if (!ideas.length) {
        console.error(`  ${out} carries no ideas: block and ${SLATE_REL} has none to transfer — ` +
          `C4 counts that block and will read this document as holding no solutions`);
        process.exit(1);
      }
      const end = t.indexOf('\n---', 4);
      t = `${t.slice(0, end)}\n${ideasBlock(dir, ideas)}${t.slice(end)}`;
      writeFileSync(out, t);
      console.log(`  transferred ${ideas.length} idea(s) from the slate into ${out}'s front matter`);
    } else if (ideas.length) {
      const next = withIdeas(t, ideasBlock(dir, ideas));
      if (next !== t) {
        t = next;
        writeFileSync(out, t);
        console.log(`  brought ${out}'s ideas: block up to date from the slate and the parts — ${ideas.length} idea(s)`);
      }
    }
    const i = t.indexOf(MARK_OPEN), j = t.indexOf(MARK_CLOSE);
    if (i === -1 || j === -1) {
      console.error(`  ${out} carries no ${MARK_OPEN} … ${MARK_CLOSE} region — the slate writes the envelope and the prose around it, and this script fills what is between`);
      process.exit(1);
    }
    writeFileSync(out, `${t.slice(0, i + MARK_OPEN.length)}\n\n${e.body}\n${t.slice(j)}`);
    console.log(`  assembled the solution region of ${out} from ${e.ids.length} part(s), word for word`);
    const stateText = read(join(dir, 'RUN-STATE.md'));
    let state = null;
    try { state = stateText.trim() ? frontmatter(stateText, 'RUN-STATE.md') : null; } catch { state = null; }
    const rec = selectedFromRecord(dir, state);
    if (rec.why) console.log(`  ${rec.why}`);
    else if (rec.opts) {
      const w = writeSelected(dir, rec.opts);
      if (w.problem) { console.log(`  the selected-solution document was not written: ${w.problem}`); process.exit(1); }
      if (w.changed) console.log(`  wrote the selected-solution document from the record, carrying the reason ${rec.opts.choice.by} recorded on ${shownDate(rec.opts.choice.at)}`);
      else console.log(`  the selected-solution document already says what the record says, in ${rec.opts.lang === 'cs' ? 'Czech' : 'English'}, the run's language, so nothing was written to it`);
    }
    const picked = fillSelected(dir, state);
    if (picked && picked.problem) { console.log(`  ${picked.problem}`); process.exit(1); }
    if (picked && picked.changed) console.log(`  A9 carries solution ${picked.id} word for word, and the rationale stays yours`);
  } else if (!region(readText(out)) || region(readText(out)).trim() !== e.body.trim()) {
    console.log(`  ${out} is not what the parts produce — assemble it rather than editing the document`);
    process.exit(1);
  } else console.log(`  ok  ${out} carries ${e.ids.length} part(s) word for word`);
}

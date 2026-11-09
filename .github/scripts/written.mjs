import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, openRuns, runArtifacts, STAGE_DIRS, noOpenRunLine, twoRunsRefusal } from './run-files.mjs';
import { capture, END_LINE } from './capture.mjs';
import { gateFindings, failuresOf, stagesAbout } from './findings.mjs';
import { frontmatter } from './yaml.mjs';
import { shownDate } from './fixed-messages.mjs';   // r1.13 · W44 · BD-133: a date a person reads is day first
import { readContracts, standing } from './contracts.mjs';
import { frameOwed, frameCards } from './frame.mjs';
import { envelopeView, envelopeAtApproval, assembleRun, EnvelopeRefusal } from './envelope.mjs';
import { recordedBuild } from './derive.mjs';
import { signedExceptions, STATUSES, PERSON_TASK, WAITS_ON_A_PERSON, NEVER_SIGNABLE, SIGN_OFF_TASK, acceptedStagesOf, stageWords, unreadFiles,
         AGREEMENT_CARRIER, GATES, signedChecks, endsWithSignAgain, signableAtGate, waitsOnThePerson, writtenStopMark, contradictionOpens } from './gates.mjs';

const die = m => { console.error(m); process.exit(2); };
const CHECK = '.github/scripts/check.mjs';
const CHAIN = process.argv.includes('--chain');
const LAST_TASK = join('.github', 'last-task.md');

function stopKeyOf(dir, runId, n, findings) {
  const h = createHash('sha256').update(`${runId}\0${n}\0${[...findings].sort().join('\n')}\0`);
  const walk = (abs, rel) => {
    let entries = [];
    try { entries = readdirSync(abs, { withFileTypes: true }); } catch { return; }
    for (const e of entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
      if (e.name.startsWith('.')) continue;
      if (e.isDirectory()) walk(join(abs, e.name), `${rel}/${e.name}`);
      else if (e.isFile()) h.update(`${rel}/${e.name}\0`).update(readFileSync(join(abs, e.name))).update('\0');
    }
  };
  walk(join(dir, STAGE_DIRS[n - 1]), STAGE_DIRS[n - 1]);
  walk(join(dir, 'records', STAGE_DIRS[n - 1]), `records/${STAGE_DIRS[n - 1]}`);
  return h.digest('hex').slice(0, 16);
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const arg = process.argv.slice(2).find(a => !a.startsWith('-'));
  let dir;
  if (arg) {
    dir = join(RUNS_ROOT, arg);
    if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`written: ${dir} has no RUN-STATE.md yet. Run \`SPOCK: fill in the envelope\`, which starts a run that holds work and has no record.`);
  } else {
    const open = openRuns();
    const finished = open.length ? null : noOpenRunLine();
    if (finished) { console.log(`${finished}, so nothing is being written.`); process.exit(0); }
    if (!open.length) die(`written: no unfinished run under \`${RUNS_ROOT}\`. If you have written a document, run \`SPOCK: fill in the envelope\` — it starts a run that holds work and has no record. **Do not run \`SPOCK: start a run\`**: it asks a person for the identifier, and the identifier is not something anyone is asked for.`);
    if (open.length > 1) die(twoRunsRefusal(open, RUNS_ROOT));
    dir = open[0];
  }

  const runId = basename(dir);
  const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
  const stages = (state.stages || []).map(s => ({ ...s, id: Number(s.id) })).sort((a, b) => a.id - b.id);
  const st = stages.find(s => s.status !== 'accepted');
  if (!st) {
    console.log(`${runId} is complete — all ${stages.length} stages accepted. Nothing is being written.`);
    process.exit(0);
  }

  const n = st.id;
  const byStage = new Map();
  for (const a of runArtifacts(dir)) (byStage.get(Number(a.stage)) || byStage.set(Number(a.stage), new Set()).get(Number(a.stage))).add(a.id);
  const contractsNow = readContracts();
  const now = standing(state, byStage, contractsNow);
  if (n === 3) for (const rel of frameCards(dir)) if (/[\\/]parts[\\/]/.test(rel)) console.log(`  framed  A6    card part at ${rel}; fill each [[fill: …]] and nothing else`);
  const { owed, excused, atAcceptance } = now;
  const have = byStage.get(n) || new Set();
  const waiting = [...now.person.map(p => p.id), ...now.later.map(l => l.id)];

  if (n === 2 && !envelopeAtApproval(dir)) {
    try {
      const said = String(execFileSync('node', [join('.github', 'scripts', 'problem-material.mjs'), runId, '--measure'],
        { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })).trim().split('\n')[0] || '';
      if (/ measured \d+ item/.test(said)) console.log(`  ${said.slice(said.indexOf('measured'))}\n`);
    } catch (e) {
      const said = String((e && e.stdout) || '').trim().split('\n')[0]
        || String((e && e.stderr) || '').trim().split('\n')[0] || String((e && e.message) || 'it did not say why');
      console.log(`  ! stage 2's supplied material could not be measured: ${said}\n`);
    }
  }

  console.log(`${runId} — stage ${n}, ${st.status}\n`);
  if (excused.length)
    console.log(`  ${excused.join(', ')} is not asked for — the only skill producing it is parked\n`);
  if (atAcceptance.length)
    console.log(`  ${atAcceptance.join(', ')} is written by the workflow when you approve the stage, so nothing here asks for it\n`);

  let bad = 0, written = 0;
  const refusedLine = (rel, m) => `  envelope  ${rel ? `${rel} — ` : ''}${String(m).split('\n').join('\n            ')}`;
  if (envelopeAtApproval(dir)) {
    for (const x of envelopeView(dir).refusals) { console.log(refusedLine(x.rel, x.line)); bad++; }
  } else if (CHAIN && recordedBuild(dir)) {
    try {
      const r = assembleRun(dir, { write: true });
      for (const t of r.touched || []) if (t.file) console.log(`  filled  ${t.file}`);
    } catch (e) { if (!(e instanceof EnvelopeRefusal)) throw e; console.log(refusedLine(null, e.message)); bad++; }
  }
  const runLevel = new Set();
  const perDoc = new Map();
  const signedOff = new Map();
  const signedOnAccepted = new Map();
  const docOnAccepted = new Map();
  const docsForSigned = runArtifacts(dir);
  const signers = new Map(signedExceptions(state, n).map(d => [String(d.check), d]));
  const movedToWriter = new Set();
  const unwritten = owed.filter(id => !have.has(id));
  const aboutUnwritten = unwritten.length ? new RegExp(`^(?:${unwritten.join('|')})(?=[/:\\s])`) : null;
  const waitsOn = waiting.length ? new RegExp(`^(?:${waiting.join('|')})(?=[/:\\s])`) : null;
  const aboutWaiting = new Set();
  const unreadable = new Map();
  const listed = xs => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0]);
  const checkOf = new Map();
  const cidOf = new Map(), personCalls = new Map();
  const ac = AGREEMENT_CARRIER[n];
  const preview = [];
  if (ac && now.person.some(p => p.after === 'agreement') && have.has(ac.draft)) {
    const g = gateFindings(dir, GATES[n].quality);
    if (g.complete && [0, 1, 3].includes(g.code)) {
      const docs = runArtifacts(dir);
      const stageOf = new Map(docs.map(d => [String(d.id), Number(d.stage)]));
      for (const s of stages) for (const a of Array.isArray(s.artifacts) ? s.artifacts : []) if (!stageOf.has(String(a))) stageOf.set(String(a), s.id);
      const draftDoc = docs.find(d => String(d.id) === ac.draft);
      const esc = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const namesDraft = new RegExp(`\\b${ac.draft}\\b${draftDoc ? `|${esc(draftDoc.rel)}` : ''}`);
      const agreed = new RegExp(`\\b${ac.agreed}\\b|carries no agreement block|agreement block has no (?:name|date)`);
      const signedHere = new Set(signedExceptions(state, n).flatMap(signedChecks));
      for (const f of failuresOf(g)) {
        if (NEVER_SIGNABLE.includes(f.id) || signedHere.has(f.id)) continue;
        for (const x of f.findings) {
          const fr = String(x.fragment || '').trim();
          if (!fr) continue;
          const isDraft = x.document ? x.document === ac.draft : namesDraft.test(fr);
          if (!isDraft || agreed.test(fr) || stagesAbout([x], state, n).length) continue;
          const at = x.stage, code = (/^(A\d+[a-z]?)(?=[\s:])/.exec(fr) || [])[1];
          if ((at !== null && at !== n) || (code && stageOf.has(code) && stageOf.get(code) !== n)) continue;
          if (!preview.includes(fr)) preview.push(fr);
          if (!cidOf.has(fr)) cidOf.set(fr, String(f.id));
        }
      }
    }
  }
  const handedOn = new Map(), checked = new Set();
  const fieldsOf = new Map();
  const partsOf = d => String(d).split('; ');
  for (const id of owed) {
    if (!have.has(id)) {
      const p = now.person.find(x => x.id === id), l = now.later.find(x => x.id === id);
      if (p) console.log(`  waits   ${id.padEnd(5)} on a person, who runs "${PERSON_TASK[p.after]}" first. It is not yours to write yet.`);
      else if (l) console.log(`  waits   ${id.padEnd(5)} on a person, once ${l.from} is written`);
      else {
        const f = frameOwed(dir, id, byStage, contractsNow);
        console.log(f ? f.line : `  owed    ${id.padEnd(5)} not written yet`);
      }
      continue;
    }
    written++;
    checked.add(id);
    const r = capture('node', [CHECK, dir, '--document', id, '--for-writer'], { endsWith: END_LINE });
    const out = r.out + (r.err || ''), code = r.code;
    if (code === 2) {
      const files = unreadFiles(out);
      for (const f of files) unreadable.set(f.rel, f.why);
      console.log(files.length
        ? `  needs   ${id.padEnd(5)} the checker could not read ${listed(files.map(f => f.rel))}`
        : `  ?       ${id.padEnd(5)} the checker could not read it — ${out.trim().split('\n')[0]}`);
      bad++;
      continue;
    }
    if (!r.complete) { console.log(`  ?       ${id.padEnd(5)} the checker's answer could not be read in full — ${r.why}`); bad++; continue; }
    const lines = [];
    const rows = out.split('\n').filter(Boolean).filter(l => l.trim() !== END_LINE).map(l => l.split('\t'));
    const taken = new Set();
    rows.forEach((cols, i) => {
      const cid = String(cols[2] || '').trim();
      if (!['doc', 'run'].includes(cols[0]) || cols.length <= 3 || !waitsOnThePerson(cols[1]) || !signableAtGate(n, cid)) return;
      let j = i;
      while (j > 0 && !contradictionOpens(cid, rows[j][1]) && rows[j - 1][0] === cols[0] && String(rows[j - 1][2] || '').trim() === cid && !taken.has(j - 1)) j--;
      for (let k = j; k <= i; k++) taken.add(k);
      personCalls.set(rows.slice(j, i + 1).map(r => r[1]).join('; '), cid);
    });
    for (const cols of rows.filter((r, i) => !taken.has(i))) {
      const last = lines[lines.length - 1];
      if (cols.length > 3) fieldsOf.set(cols[1], { document: cols[3] && cols[3] !== '-' ? cols[3] : null, shape: cols[4] && cols[4] !== '-' ? cols[4] : null });
      if (last && cols.length > 3 && last.perFinding && last[0] === cols[0] && last[2] === cols[2]) last[1] = `${last[1]}; ${cols[1]}`;
      else lines.push(Object.assign(cols.slice(0, 3), { perFinding: cols.length > 3 }));
    }
    const mine = [];
    for (const [, detail, cid] of lines.filter(([scope]) => scope === 'doc')) {
      const parts = String(detail).split('; ');
      for (const f of parts) if (!cidOf.has(f)) cidOf.set(f, String(cid || '').trim());
      const onAccepted = parts.filter(f => acceptedStagesOf(f, docsForSigned, state, n).length);
      for (const f of onAccepted) docOnAccepted.set(f, String(cid || '').trim());
      const left = parts.filter(f => !onAccepted.includes(f));
      if (!left.length) continue;
      const about = aboutUnwritten ? left.filter(f => aboutUnwritten.test(f)) : [];
      if (!about.length) { mine.push(left.join('; ')); continue; }
      for (const f of about) if (waitsOn && waitsOn.test(f)) aboutWaiting.add(f);
      const rest = left.filter(f => !aboutUnwritten.test(f)).join('; ');
      if (rest) mine.push(rest);
    }
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const ownStatus = new RegExp(`^stage \\d+ is "[^"]*" but ${esc} is "([^"]*)"$`);
    for (const [scope, detail, cid] of lines) {
      if (scope !== 'run') continue;
      runLevel.add(detail);
      for (const fragment of String(detail).split('; ')) {
        checkOf.set(fragment, String(cid || '').trim());
        if (!cidOf.has(fragment)) cidOf.set(fragment, String(cid || '').trim());
        const m = ownStatus.exec(fragment);
        if (m && !STATUSES.includes(m[1])) { mine.push(fragment); movedToWriter.add(fragment); }
      }
    }
    if (ac && id === ac.draft)
      for (const fr of preview) if (!lines.some(([, d]) => String(d || '').includes(fr)) && !mine.includes(fr)) mine.push(fr);
    const signedAll = lines.filter(([scope]) => scope === 'signed')
      .map(([, detail, cid]) => ({ detail, check: String(cid || '').trim() }));
    const signedNow = [];
    for (const r of signedAll) {
      const stages = acceptedStagesOf(r.detail, docsForSigned, state, n);
      if (stages.length) signedOnAccepted.set(r.detail, { ...r, stages });
      else signedNow.push(r);
    }
    if (signedNow.length) signedOff.set(id, signedNow);
    for (let i = mine.length - 1; i >= 0; i--) {
      const keep = [];
      for (const f of partsOf(mine[i])) {
        const x = (fieldsOf.get(f) || {}).document || null;
        if (!x || x === id || !owed.includes(x) || !have.has(x)) { keep.push(f); continue; }
        if (!checked.has(x)) (handedOn.get(x) || handedOn.set(x, []).get(x)).push(f);
        else if (!(perDoc.get(x) || []).some(d => partsOf(d).includes(f))) keep.push(f);
      }
      if (keep.length) mine[i] = keep.join('; '); else mine.splice(i, 1);
    }
    for (const d of handedOn.get(id) || []) if (!mine.some(m => partsOf(m).includes(d))) mine.push(d);
    if (mine.length) { bad++; perDoc.set(id, mine); console.log(`  needs   ${id.padEnd(5)} ${mine.length} thing(s) to change`); }
    else if (signedNow.length) console.log(`  signed  ${id.padEnd(5)} ${signedNow.length} accepted failure(s), nothing for you to change`);
    else if (code === 3) console.log(`  --      ${id.padEnd(5)} no check in this build read it — that is not a pass`);
    else console.log(`  ok      ${id.padEnd(5)} nothing the checks read objects to it`);
  }

  const actionable = new Set([...perDoc.values()].flat().flatMap(partsOf));
  const dropActionable = () => {
    const rest = [...runLevel].map(d => partsOf(d).filter(f => !actionable.has(f)).join('; ')).filter(Boolean);
    runLevel.clear();
    for (const d of rest) runLevel.add(d);
  };
  dropActionable();
  if (aboutWaiting.size) {
    const rest = [...runLevel].map(d => d.split('; ').filter(f => !aboutWaiting.has(f)).join('; ')).filter(Boolean);
    runLevel.clear();
    for (const d of rest) runLevel.add(d);
  }
  if (movedToWriter.size) {
    const rest = [...runLevel].map(d => d.split('; ').filter(f => !movedToWriter.has(f)).join('; ')).filter(Boolean);
    runLevel.clear();
    for (const d of rest) runLevel.add(d);
  }
  const aboutAccepted = new Map();
  {
    const docsOnDisk = runArtifacts(dir);
    for (const [f, cid] of docOnAccepted)
      aboutAccepted.set(f, { check: cid, stages: acceptedStagesOf(f, docsOnDisk, state, n) });
    const rest = [];
    for (const d of runLevel) {
      const parts = d.split('; ');
      const moved = parts.filter(f => acceptedStagesOf(f, docsOnDisk, state, n).length);
      for (const f of moved) aboutAccepted.set(f, { check: checkOf.get(f) || '', stages: acceptedStagesOf(f, docsOnDisk, state, n) });
      const left = parts.filter(f => !moved.includes(f)).join('; ');
      if (left) rest.push(left);
    }
    runLevel.clear();
    for (const d of rest) runLevel.add(d);
    dropActionable();
  }

  const missing = now.agent;
  const wait = ids => `${ids.join(', ')} ${ids.length === 1 ? 'waits' : 'wait'} on a person`;
  console.log('');
  if (!written) {
    console.log(`Nothing is written yet. Stage ${n} owes ${(missing.length ? missing : owed).join(', ')}, in ${join(RUNS_ROOT, runId, STAGE_DIRS[n - 1])}/.` +
                (now.later.length ? ` ${wait(now.later.map(l => l.id))} after that.` : ''));
    console.log(`\nThis is not a gate. It says what the checks read, not whether the stage may be accepted.\n`);
    process.exit(3);
  }
  const unreadDocs = [...have].filter(id => owed.includes(id) && docsForSigned.some(a => a.id === id && unreadable.has(a.rel))).length;
  const unreadClause = unreadDocs ? `; the checker could not read ${unreadDocs} of them, named below`
    : unreadable.size ? `; the checker could not read ${unreadable.size} file(s) behind them, named below` : '';
  console.log(`${written} of ${owed.length} document(s) written${unreadClause}` +
              `${missing.length ? `${unreadClause ? '; ' : ', '}still owed: ${missing.join(', ')}` : ''}` +
              `${waiting.length ? `; waiting on a person: ${waiting.join(', ')}` : ''}.`);

  for (const [id, details] of perDoc) {
    console.log(`\nIn ${id}:`);
    const bySubject = new Map();
    for (const d of details) {
      const c = d.indexOf(': ');
      const head = c > 0 && c <= 60 ? d.slice(0, c) : null;
      const key = head || ` ${bySubject.size}`;
      (bySubject.get(key) || bySubject.set(key, []).get(key)).push(head ? d.slice(c + 2) : d);
    }
    for (const [key, rest] of bySubject) {
      if (key.startsWith(' ') || rest.length === 1) {
        console.log(`  · ${key.startsWith(' ') ? rest[0] : `${key}: ${rest[0]}`}`);
        continue;
      }
      console.log(`  · ${key} — ${rest.length} things are wrong with it, and they may be one fault:`);
      for (const r of rest) console.log(`      · ${r}`);
    }
    for (const shape of [...new Set(details.flatMap(partsOf).map(f => (fieldsOf.get(f) || {}).shape).filter(Boolean))])
      console.log(`  What passes: ${shape}`);
  }

  if (unreadable.size) {
    const one = unreadable.size === 1;
    console.log(`\nThe checker could not read ${one ? 'this file' : 'these files'}, so no check has read what is written and no gate can run on this stage:`);
    for (const [rel, why] of unreadable) console.log(`  · ${rel}: ${why}`);
    console.log(`  Change ${one ? 'it so it reads' : 'each of them so it reads'}. Nothing is asked of a person until ${one ? 'it does' : 'they do'}.`);
  }

  if (runLevel.size) {
    console.log(`\nAbout the run rather than any document you wrote, so not yours to change:`);
    for (const d of runLevel) console.log(`  · ${d}`);
    console.log(`  These clear as the run advances. Do not edit a document to satisfy one.`);
  }
  if (aboutAccepted.size) {
    console.log(`\nAbout a stage that is already accepted, so not yours to change, and it does not clear as the run advances:`);
    const groups = [[...aboutAccepted].filter(([, a]) => !NEVER_SIGNABLE.includes(a.check)),
                    [...aboutAccepted].filter(([f, a]) => NEVER_SIGNABLE.includes(a.check) && endsWithSignAgain(f)),
                    [...aboutAccepted].filter(([f, a]) => NEVER_SIGNABLE.includes(a.check) && !endsWithSignAgain(f))];
    for (const [i, group] of groups.entries()) {
      if (!group.length) continue;
      for (const [f] of group) console.log(`  · ${f}`);
      const stages = new Set(group.flatMap(([, a]) => a.stages));
      const one = group.length === 1;
      console.log(i === 0
        ? `  ${stages.size === 1 ? 'That stage is' : 'Those stages are'} accepted, so nothing written at this stage can change ${one ? 'it' : 'them'}. ` +
          `When this stage's gate records the failure, a sign-off an earlier accepted stage holds for the same finding carries to it; where there is none, the person can accept ${one ? 'it' : 'them'} with "${SIGN_OFF_TASK}". Do not edit a document to satisfy ${one ? 'it' : 'them'}.`
        : i === 1
        ? `  ${stages.size === 1 ? 'That stage is' : 'Those stages are'} accepted, so nothing written at this stage can change ${one ? 'it' : 'them'}, ` +
          `and ${one ? 'the finding says what does' : 'each finding says what does'}: the person signs the check ${one ? 'it names' : 'each names'} again on ${stageWords([...stages])} with "${SIGN_OFF_TASK}". Do not edit a document to satisfy ${one ? 'it' : 'them'}.`
        : `  A person cannot sign ${one ? 'this one' : 'these'} off, and nothing written at this stage changes ${one ? 'it' : 'them'}. Report ${one ? 'it' : 'them'} and name the Workflow Support agent.`);
    }
  }
  if (signedOff.size || signedOnAccepted.size) {
    console.log(`\nAccepted by a person for this stage, so not yours to change and not going to clear:`);
    const signer = r => {
      const who = signers.get(r.check);
      return `    signed by ${who ? `${who.by}, ${who.role}, on ${shownDate(who.at)}` : 'a person, per the run record'}` +
             `${who && who.reason ? `: ${who.reason}` : ''}`;
    };
    for (const [id, rows] of signedOff)
      for (const r of rows) { console.log(`  · ${id} — ${r.detail}`); console.log(signer(r)); }
    for (const r of signedOnAccepted.values()) {
      console.log(`  · About ${stageWords(r.stages)}, which ${r.stages.length === 1 ? 'is' : 'are'} already accepted — ${r.detail}`);
      console.log(signer(r));
    }
    console.log(`  The gate still reports these as failures wherever the result is shown. Do not edit a document to satisfy one.`);
  }

  if (aboutWaiting.size) {
    console.log(`\nWaiting on a person, so not yours to write or change:`);
    for (const d of aboutWaiting) console.log(`  · ${d}`);
    const tasks = new Set(waiting.filter(id => [...aboutWaiting].some(d => new RegExp(`^${id}(?=[/:\\s])`).test(d)))
      .map(id => PERSON_TASK[WAITS_ON_A_PERSON[id].after]).filter(Boolean));
    for (const task of tasks)
      console.log(`  It clears once a person runs "${task}" and the document is written from it. Do not write or edit a document to satisfy it.`);
  }
  const gateQ = GATES[n] ? GATES[n].quality : 'the gate';
  if (personCalls.size) {
    const it = personCalls.size === 1 ? 'it' : 'them';
    console.log(`\nWaiting on the person's decision, so not yours to change:`);
    for (const f of personCalls.keys()) console.log(`  · ${f}`);
    console.log(`  ${gateQ} records ${it} failing when the stage goes on, and the person decides, as ${personCalls.size === 1 ? 'the finding says' : 'each finding says'}. ` +
      `Do not edit a document to satisfy ${it} unless the person asks.`);
  }

  console.log(`\nThis is not a gate and no gate result is yours to report.`);
  const left = [...perDoc.values()].flat().flatMap(partsOf);
  const signableStop = CHAIN && bad > 0 && bad === perDoc.size && !missing.length && left.length > 0
    && left.every(f => signableAtGate(n, cidOf.get(f)));
  const stopKey = signableStop ? stopKeyOf(dir, runId, n, left.map(f => `${cidOf.get(f)}\t${f}`)) : null;
  let goOn = false;
  if (stopKey) try { goOn = existsSync(LAST_TASK) && readFileSync(LAST_TASK, 'utf8').includes(writtenStopMark(stopKey)); } catch { goOn = false; }
  if (goOn) {
    const it = left.length === 1 ? 'it' : 'them';
    console.log(`Every change listed above is to a check a person can sign off at ${gateQ}, and nothing in this stage's documents has changed ` +
      `since this task last stopped on the same findings, so the stage goes on to ${gateQ}, which records ${it} failing. ` +
      `Where this run cannot meet ${it}, the person can accept ${it} with "${SIGN_OFF_TASK}"; ${gateQ}'s lines below name its boxes.`);
    console.log('');
    process.exit(0);
  }
  const todo = [bad ? 'change what is listed above' : null,
                missing.length ? `write ${missing.join(', ')}` : null].filter(Boolean);
  console.log(todo.length ? `${todo.join(', then ')}. The stage does not move until that is done.`
    : waiting.length ? `Nothing is yours to write now: ${wait(waiting)}, and the stage moves once they have acted.`
    : personCalls.size ? `Nothing else is yours to change: the stage goes on to ${gateQ} in the same task.`
    : 'Nothing is outstanding. The stage advances from here in the same task.');
  if (stopKey) console.log(writtenStopMark(stopKey));
  console.log('');
  process.exit(bad ? 1 : missing.length ? 3 : 0);
}

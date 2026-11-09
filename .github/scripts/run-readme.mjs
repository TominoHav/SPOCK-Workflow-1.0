#!/usr/bin/env node

import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runArtifacts, superseded, runDirs as findRunDirs, RUNS_ROOT, STAGE_DIRS, SUPPLIED_DIR, runLanguageInfo } from './run-files.mjs';
import { AGENT_BINDINGS, GATES, decisionsFor, recordedDecisions, coveredBySignature, PERSON_TASK, SIGN_OFF_TASK, standingChoices,
         signatureLine, signedExceptions, signedChecks, WAITS_ON_A_PERSON, personActed, staleRoutes,
         stageWords, folderRenamed, cannotSign, fixFor, coveringSignatures, WORKFLOW_FAULT_WORDS, signAgainLine } from './gates.mjs';
import { parkedArtifacts, standing } from './contracts.mjs';
import { suppliedFiles } from './material.mjs';
import { changedSinceGate, RECORDS_WORDS, editedAfterAcceptance, editedLine, EDIT_TASK } from './content-seen.mjs';
import { STALE_TASK, owesNow, narrowing, waitsOnThePersonWholly, stoppedLine } from './gates.mjs';
import { frontmatter, unquote } from './yaml.mjs';
import { shownDate } from './fixed-messages.mjs';   // r1.13 · W44 · BD-133: a date a person reads is day first
import { gateFindings, aboutAccepted, failuresOf } from './findings.mjs';

let viewCache = null;
const viewOf = (dir, gate) => {
  if (!viewCache) return gateFindings(dir, gate);
  const k = `${dir}\u0000${gate}`;
  if (!viewCache.has(k)) viewCache.set(k, gateFindings(dir, gate));
  return viewCache.get(k);
};

export const OUT_NAME = 'README.md';
export const FRONT_DOOR_TASK = "SPOCK: regenerate the run's front door";

const listed = (xs, and = ' and ') => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')}${and}${xs[xs.length - 1]}` : xs[0]);

export function unreadableFiles(dir, gate) {
  const v = viewOf(dir, gate);
  return v.code === 2 ? v.unread : [];
}

export function failureOnAccepted(dir, stageId) {
  const gate = (GATES[Number(stageId)] || {}).quality;
  if (!gate) return null;
  const v = viewOf(dir, gate);
  const record = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
  const found = aboutAccepted(v, runArtifacts(dir), record, Number(stageId));
  const renamed = folderRenamed(record.run_id, basename(dir));
  const about = found.filter(f => f.stages.length).map(f => ({ id: f.id, stages: f.stages }));
  const wholly = found.length > 0 && found.every(f => f.stages.length) && v.verdict === 'fail';
  return { wholly, about, found, ids: found.map(f => f.id), stages: [...new Set(found.flatMap(f => f.stages))].sort((a, b) => a - b),
           never: found.filter(f => f.never || cannotSign(f.id, renamed)).map(f => f.id),
           failed: [...new Set(v.failed)], nobodySigns: [...new Set(v.failed.filter(id => cannotSign(id, renamed)))],
           persons: v.verdict === 'fail' ? failuresOf(v).filter(waitsOnThePersonWholly).map(f => f.id) : [] };
}

export function needingChanges(dir) {
  const runId = basename(dir);
  if (resolve(join(RUNS_ROOT, runId)) !== resolve(dir)) return [];
  const r = spawnSync(process.execPath, [join(dirname(fileURLToPath(import.meta.url)), 'written.mjs'), runId],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return r.status === 1 ? [...String(r.stdout || '').matchAll(/^ {2}needs {3}(\S+)/gm)].map(m => m[1]) : [];
}

function changedInReview(dir, record, stageId) {
  const runId = basename(dir);
  if (resolve(join(RUNS_ROOT, runId)) !== resolve(dir)) return null;
  const stage = ((record && record.stages) || []).find(s => Number(s.id) === Number(stageId));
  if (!stage) return null;
  const c = changedSinceGate(runId, record, stage);
  const what = [...c.documents, ...(c.decisions ? [`the stage's decisions`] : []), ...(c.records ? [RECORDS_WORDS] : [])];
  return what.length ? (what.length > 1 ? `${what.slice(0, -1).join(', ')} and ${what[what.length - 1]}` : what[0]) : null;
}

const LANGUAGE_NAMES = { cs: 'Czech', en: 'English' };
const READER_SET = [
  ['A1',  'outcome', 'The initiative brief',        'what the run set out to do'],
  ['A13', 'outcome', 'The agreed requirements',     'the signed requirement'],
  ['A14', 'outcome', 'The initiative document',     'the deliverable ČS receives'],
  ['A4',  'asset',   'The prioritised opportunities', 'what the next run starts from'],
  ['A6',  'asset',   'The competitor profiles',     'these enter the shared store if a person keeps the run\'s competitors'],
  ['A7',  'asset',   'The market summary',          'what the solutions were built against'],
  ['A9',  'asset',   'The solution you selected',   'the one chosen at the gate, and why'],
  ['A11', 'asset',   'The expanded MVP',            'what the requirements were written from'],
  ['A3b', 'working', 'The framed opportunities',    'as framed, before they were ordered'],
  ['A5',  'working', 'The market map',              'as mapped, before anyone was profiled'],
  ['A8',  'working', 'The solutions considered',    'all of them, not only the one chosen'],
];

const GROUP_LABEL = {
  outcome: ['What leaves this run', 'Somebody outside the run acts on these.'],
  asset:   ['What outlives this run', 'A later run or a later stage inherits these.'],
  working: ['Why it says what it says', 'The reasoning behind the three above. Read when somebody asks why.'],
};

const DELIVERABLES = lang => (lang === 'cs' ? [
  ['A1',  'Iniciativní zadání',      'co si run dal za cíl'],
  ['A13', 'PRD, odsouhlasené',       'podepsaný požadavek'],
  ['A14', 'Iniciativa, česky',       'výstup, který dostává ČS'],
] : [
  ['A1',  'Initiative brief',        'what the run set out to do'],
  ['A13', 'PRD, agreed',             'the signed requirement'],
  ['A14', lang && lang !== 'en' ? `Initiative, in ${LANGUAGE_NAMES[lang] || lang}` : 'Initiative',
                                     'the deliverable ČS receives'],
]);

function runLanguage(dir) {
  const info = runLanguageInfo(dir);
  return info.declared ? info.lang : null;
}

const STAGE_NAMES = {
  1: 'Brief', 2: 'Opportunities', 3: 'Competitive Analysis', 4: 'Solutions', 5: 'MVP', 6: 'PRD', 7: 'Initiative',
};

const FRONT_WORDS = {
  en: {
    status: (cur, n, status, done) => `**Stage ${cur} of ${n} · run is \`${status}\` · ${done} stage(s) accepted.**`,
    closed: (status, done, n) => `**Run is \`${status}\` · all ${done} of ${n} stages accepted.**`,
    build: b => `Started on build ${b}.`,
    noArtifact: '**This run holds no artifact.** Whatever its record says, nothing has been produced — ' +
      'a stage marked accepted with nothing on disk is a record typed ahead of the work.',
    complete: 'Every stage is accepted and the run is closed.',
    stageIs: (id, status) => `Stage ${id} is \`${status}\`.`,
    readThese: '## Read these three',
    chainWhy: 'Everything else in this directory is the chain that produced them.',
    readHeader: '| | Document | What it is | State |',
    notProduced: '**not produced**',
    signedOff: (by, checks) => `**signed off** by ${by}: ${checks}`,
    decidedStale: (id, at, by) => `${id} decided ${shownDate(at)} by ${by}, out of date`,
    carriedFrom: (stage, by, checks) => `**carried from stage ${stage}'s sign-off** by ${by}: ${checks}`,
    and: ' and ',
    everythingElse: '## Everything else a person reads',
    forAReader: n => `${n} document(s) in this run are written for a reader. The rest of the directory is the machine's record of how they were produced.`,
    groups: GROUP_LABEL,
    readers: null,
    chain: '## The chain',
    chainHeader: '| Stage | | State | Artifacts | Quality gate | Decision gate |',
    stageName: s => s.name || STAGE_NAMES[s.id] || '',
    atApproval: '*(written at the approval)*',
    notProducedCell: '*(not produced)*',
    parkedCell: why => (why && why.en ? `*(parked: ${why.en})*` : '*(parked)*'),
    noneByDesign: 'none by design',
    open: '**open**',
    corrected: (stage, from, to, by, at, why) =>
      `Stage ${stage}: the name "${from}" was corrected to "${to}" by ${by} on ${shownDate(at)}: ${why}`,
    notClaimed: '## What this run does not claim',
    stillOwes: (stage, ids, and) => `**Stage ${stage} still owes ${listed(ids, and)}.** The stage is not finished, and nothing is put to you ` +
      `for review or signature until ${ids.length === 1 ? 'it is' : 'they are'} written.`,
    notWaiting: (stage, ids) => `**Stage ${stage} does not wait on ${ids.join(', ')}:** the workflow writes ${ids.length === 1 ? 'it' : 'them'} ` +
      `when the stage is approved, and nothing asks for ${ids.length === 1 ? 'it' : 'them'} before then.`,
    onceChanged: (ids, and) => ` once ${listed(ids, and)} ${ids.length === 1 ? 'is' : 'are'} changed`,
    waitsForPerson: (stage, id, first, after) => `**Stage ${stage} waits on a person for ${id}${first}:** ` + (after === 'choice'
      ? 'it is written from the option they choose, and nothing asks for it before their choice is recorded.'
      : 'it is written from the draft when they mark it agreed, and nothing asks for it before then.'),
    judgedRules: (total, gates, answered, unanswered, and) =>
      `**${total} quality rule${total === 1 ? '' : 's'} at ${listed(gates, and)} ${total === 1 ? 'is one' : 'are ones'} no check decides.**` +
      (answered.length ? ` A person answered the questions at ${listed(answered, and)}.` : '') +
      (!unanswered.length ? ''
        : answered.length ? ` Nobody answered them at ${listed(unanswered, and)}, so ${unanswered.length === 1 ? 'that gate rests on its' : 'those gates rest on their'} checks alone.`
        : ` Nobody answered the questions about them, so ${unanswered.length === 1 ? 'that gate rests on its' : 'those gates rest on their'} checks alone.`),
    signedHeadline: (stage, line) => `**Stage ${stage} ${line}.**`,
    signedStill: (ids, and) => `**${listed(ids, and)} ${ids.length > 1 ? 'still fail and are' : 'still fails and is'} reported as failing everywhere.**`,
    signedPassesNow: (ids, and) => `**${listed(ids, and)} ${ids.length > 1 ? 'pass now, and their sign-off stands' : 'passes now, and its sign-off stands'} over nothing (C168).**`,
    signedUnread: (ids, and) => `**The checker could not read this run, so whether ${listed(ids, and)} still ${ids.length > 1 ? 'fail' : 'fails'} is not known here.**`,
    narrowedOn: (date, from, dropped, and) => ` Narrowed by the workflow on ${shownDate(date)}: it covered ${listed(from, and)}, and ${listed(dropped, and)} ` +
      `${dropped.length > 1 ? 'pass' : 'passes'} on this run.`,
    signedOn: checks => `On ${checks}`,
    signedCarried: (checks, stage) => `On ${checks}, carried from stage ${stage}`,
    whatAccepted: what => ` What was accepted: ${what}`,
    bodyNotRead: (stage, body, why) => `**Stage ${stage} did not read \`${body}\`,** and says why: ${why}`,
    gapRefused: (stage, why) => `**Stage ${stage} records a gap in its know-how that a check refuses:** ${why}.`,
    gapWhy: {
      'no-stage': (body, stage) => `this run has no stage ${stage}`,
      'no-body': () => 'the entry names no body',
      'no-reason': body => `it did not read \`${body}\` and gives no reason`,
      'read-and-not-read': body => `it records \`${body}\` as read and as not read`,
      'not-required': body => `it did not read \`${body}\`, which this stage is not meant to read`,
    },
    editedAfter: (stage, documents) => (([head, rest]) => `**${head}** ${rest}`)(editedLine({ stage, documents })),
    staleRebuilt: (id, why) => `**${id} was stale and was rebuilt.** ${why}`,
    staleAccepted: (id, by, at, why) => `**${id} is stale and was advanced past**, accepted by ${by} on ${shownDate(at)}. ${why}`,
    staleOpen: (id, why) => `**${id} is stale with no acceptance recorded.** ${why}`,
    retained: n => `**${n} file(s) retained** in \`superseded/\`, read by no gate and by nothing downstream, ` +
      'kept so the run\'s own history survives.',
    takenBack: (k, clauses) => `${k} of them ${k === 1 ? 'was' : 'were'} taken back by a person: ${clauses.join('; ')}.`,
    takenBackFrom: (n, stage, by, at) => `${n} file(s)${stage ? ` of stage ${stage}` : ''}, by ${by} on ${shownDate(at)}`,
    takenBackWhy: rs => `The reason${rs.length === 1 ? '' : 's'} given: ${rs.map(r => `"${r}"`).join('; ')}.`,
    noStamp: (n, some) => (some
      ? `Nothing on the other ${n} says how ${n === 1 ? 'it' : 'they'} left the run.`
      : `Nothing on ${n === 1 ? 'it' : 'them'} says how ${n === 1 ? 'it' : 'they'} left the run.`),
    notesHolds: parts => `**\`notes/\` is read by no gate and holds ${parts.join(', plus ')}.** Retained deliberately, ` +
      'so the reason survives.',
    notesAttempts: n => `${n} attempt(s) and record(s) this run produced and did not commit as an artifact`,
    notesEdits: 'the account of every edit a person made to an agent-produced artifact ' +
      '([`marked-edits.md`](./notes/marked-edits.md))',
    footer: dir => ['**GENERATED. Do not edit this file.** Every line above is derived from `RUN-STATE.md` and the',
      `artifacts beside it. The task "${FRONT_DOOR_TASK}" writes it again.`,
      'C79 refuses it when it drifts, so a hand edit fails the build rather than quietly disagreeing',
      'with the run it describes.'],
  },
  cs: {
    status: (cur, n, status, done) => `**Fáze ${cur}/${n} · běh je ve stavu \`${status}\` · přijaté fáze: ${done}.**`,
    closed: (status, done, n) => `**Běh je ve stavu \`${status}\` · přijaté fáze: ${done}/${n}.**`,
    build: b => `Běh byl založen na buildu ${b}.`,
    noArtifact: '**Tento běh neobsahuje žádný artefakt.** Ať jeho záznam říká cokoli, nic nebylo vytvořeno: fáze ' +
      'označená jako přijatá, ke které na disku nic není, je záznam zapsaný dřív, než proběhla práce.',
    complete: 'Všechny fáze jsou přijaté a běh je uzavřený.',
    stageIs: (id, status) => `Fáze ${id} je ve stavu \`${status}\`.`,
    readThese: '## Přečtěte si tyto tři',
    chainWhy: 'Všechno ostatní v této složce je řetězec, který je vytvořil.',
    readHeader: '| | Dokument | Co to je | Stav |',
    notProduced: '**nevytvořeno**',
    signedOff: (by, checks) => `**podepsáno** (${by}): ${checks}`,
    decidedStale: (id, at, by) => `${id} rozhodnuto ${shownDate(at)}, ${by}, zastaralé`,
    carriedFrom: (stage, by, checks) => `**převzato z podpisu fáze ${stage}** (${by}): ${checks}`,
    and: ' a ',
    everythingElse: '## Co dalšího je psáno pro čtenáře',
    forAReader: n => `Dokumenty v tomto běhu psané pro čtenáře: ${n}. Zbytek složky je strojový záznam o tom, jak vznikly.`,
    groups: {
      outcome: ['Co z tohoto běhu odchází', 'Na jejich základě jedná někdo mimo běh.'],
      asset:   ['Co tento běh přežije', 'Zdědí je pozdější běh nebo pozdější fáze.'],
      working: ['Proč to říká, co říká', 'Úvahy, na kterých stojí tři dokumenty výše. Čtěte je, když se někdo zeptá proč.'],
    },
    readers: {
      A1:  ['Iniciativní zadání',          'co si běh dal za cíl'],
      A13: ['Odsouhlasené požadavky',      'podepsaný požadavek'],
      A14: ['Dokument iniciativy',         'výstup, který dostává ČS'],
      A4:  ['Prioritizované příležitosti', 'z čeho vychází další běh'],
      A6:  ['Profily konkurentů',          'do sdíleného úložiště vstoupí, pokud si je někdo z běhu ponechá'],
      A7:  ['Shrnutí trhu',                'proti čemu byla řešení navržena'],
      A9:  ['Vybrané řešení',              'řešení zvolené na bráně a proč'],
      A11: ['Rozšířené MVP',               'z čeho byly napsány požadavky'],
      A3b: ['Formulované příležitosti',    'jak byly formulovány, než byly seřazeny'],
      A5:  ['Mapa trhu',                   'jak byl trh zmapován, než byl kdokoli profilován'],
      A8:  ['Zvažovaná řešení',            'všechna, nejen to zvolené'],
    },
    chain: '## Řetězec',
    chainHeader: '| Fáze | | Stav | Artefakty | Brána kvality | Rozhodovací brána |',
    stageName: s => STAGE_NAMES_CS[s.id] || s.name || '',
    atApproval: '*(zapíše se při schválení)*',
    notProducedCell: '*(nevytvořeno)*',
    parkedCell: why => (why && why.cs ? `*(odloženo: ${why.cs})*` : '*(odloženo)*'),
    noneByDesign: 'záměrně žádná',
    open: '**otevřená**',
    corrected: (stage, from, to, by, at, why) =>
      `Fáze ${stage}: jméno „${from}“ bylo opraveno na „${to}“ (${by}, ${shownDate(at)}): ${why}`,
    notClaimed: '## Co tento běh netvrdí',
    stillOwes: (stage, ids, and) => `**Fáze ${stage} stále dluží ${listed(ids, and)}.** Fáze není dokončená a nic vám nebude ` +
      `předloženo k revizi ani k podpisu, dokud ${ids.length === 1 ? 'nevznikne' : 'nevzniknou'}.`,
    notWaiting: (stage, ids) => `**Fáze ${stage} nečeká na ${ids.join(', ')}:** workflow ${ids.length === 1 ? 'jej' : 'je'} zapíše ` +
      `při schválení fáze a do té doby ${ids.length === 1 ? 'jej' : 'je'} nikdo nevyžaduje.`,
    onceChanged: (ids, and) => `, jakmile se ${listed(ids, and)} změní`,
    waitsForPerson: (stage, id, first, after) => `**Fáze ${stage} čeká u ${id} na člověka${first}:** ` + (after === 'choice'
      ? 'vzniká z varianty, kterou člověk zvolí, a dokud není jeho volba zaznamenaná, nikdo o něj nežádá.'
      : 'vzniká z návrhu ve chvíli, kdy jej člověk označí za odsouhlasený, a do té doby o něj nikdo nežádá.'),
    judgedRules: (total, gates, answered, unanswered, and) =>
      `**${total} ${total === 1 ? 'pravidlo kvality' : total < 5 ? 'pravidla kvality' : 'pravidel kvality'} na ${listed(gates, and)} ` +
      `${total === 1 ? 'je pravidlo, o kterém' : 'jsou pravidla, o kterých'} nerozhoduje žádná kontrola.**` +
      (answered.length ? ` Otázky na ${listed(answered, and)} člověk zodpověděl.` : '') +
      (!unanswered.length ? ''
        : answered.length ? ` Na ${listed(unanswered, and)} je nikdo nezodpověděl, takže ${unanswered.length === 1 ? 'tato brána stojí jen na svých kontrolách' : 'tyto brány stojí jen na svých kontrolách'}.`
        : ` Otázky o nich nikdo nezodpověděl, takže ${unanswered.length === 1 ? 'tato brána stojí jen na svých kontrolách' : 'tyto brány stojí jen na svých kontrolách'}.`),
    signedHeadline: (stage, line) => `**Fáze ${stage} ${line}.**`,
    signedStill: (ids, and) => (ids.length > 1 ? `**${listed(ids, and)} stále selhávají a všude se hlásí jako selhávající.**`
      : `**${ids[0]} stále selhává a všude se hlásí jako selhávající.**`),
    signedPassesNow: (ids, and) => (ids.length > 1 ? `**${listed(ids, and)} nyní procházejí a podpis nad nimi už nic nekryje (C168).**`
      : `**${ids[0]} nyní prochází a podpis nad ní už nic nekryje (C168).**`),
    signedUnread: (ids, and) => `**Kontrola nemohla tento běh přečíst, takže zde není známo, zda ${listed(ids, and)} stále ${ids.length > 1 ? 'selhávají' : 'selhává'}.**`,
    narrowedOn: (date, from, dropped, and) => ` Pracovní postup podpis ${shownDate(date)} zúžil: pokrýval ${listed(from, and)} a ${listed(dropped, and)} ` +
      `na tomto běhu ${dropped.length > 1 ? 'procházejí' : 'prochází'}.`,
    signedOn: checks => `U ${checks}`,
    signedCarried: (checks, stage) => `U ${checks}, převzato z fáze ${stage}`,
    whatAccepted: what => ` Co bylo přijato: ${what}`,
    bodyNotRead: (stage, body, why) => `**Fáze ${stage} nečetla \`${body}\`** a říká proč: ${why}`,
    gapRefused: (stage, why) => `**Fáze ${stage} uvádí mezeru v know-how, kterou kontrola odmítá:** ${why}.`,
    gapWhy: {
      'no-stage': (body, stage) => `tento běh fázi ${stage} nemá`,
      'no-body': () => 'záznam neuvádí žádný podklad',
      'no-reason': body => `nečetla \`${body}\` a neuvádí důvod`,
      'read-and-not-read': body => `\`${body}\` uvádí jako přečtený i jako nepřečtený`,
      'not-required': body => `nečetla \`${body}\`, který tato fáze číst nemá`,
    },
    editedAfter: (stage, documents) => `**${documents.length > 1 ? 'Dokumenty' : 'Dokument'} ${listed(documents, ' a ')} se po přijetí fáze ${stage} ` +
      `${documents.length > 1 ? 'změnily' : 'změnil'} a žádná úprava není zaznamenaná.** Chcete-li změnu ponechat, pošlete fázi ${stage} zpět ` +
      `úlohou „${STALE_TASK.redo}“ a zaznamenejte ji úlohou „${EDIT_TASK}“; jinak ji vraťte zpět. Běh to nezastaví.`,
    staleRebuilt: (id, why) => `**${id} byl zastaralý a byl znovu vytvořen.** ${why}`,
    staleAccepted: (id, by, at, why) => `**${id} je zastaralý a běh šel dál**, přijal to ${by} dne ${shownDate(at)}. ${why}`,
    staleOpen: (id, why) => `**${id} je zastaralý a není zaznamenané žádné přijetí.** ${why}`,
    retained: n => `**Ponechané soubory: ${n}** ve složce \`superseded/\`; nečte je žádná brána ani nic dál v řetězci ` +
      'a jsou ponechané, aby zůstala zachovaná vlastní historie běhu.',
    takenBack: (k, clauses) => `Z toho ${k} vzal zpět člověk: ${clauses.join('; ')}.`,
    takenBackFrom: (n, stage, by, at) => `${n} soubor(ů)${stage ? ` z fáze ${stage}` : ''} (${by}, ${shownDate(at)})`,
    takenBackWhy: rs => `${rs.length === 1 ? 'Uvedený důvod' : 'Uvedené důvody'}: ${rs.map(r => `„${r}“`).join('; ')}.`,
    noStamp: (n, some) => (some
      ? `U ${n} ${n === 1 ? 'dalšího souboru' : 'dalších souborů'} není zaznamenané, jak z běhu ${n === 1 ? 'odešel' : 'odešly'}.`
      : `Není zaznamenané, jak ${n === 1 ? 'tento soubor z běhu odešel' : 'tyto soubory z běhu odešly'}.`),
    notesHolds: parts => `**Složku \`notes/\` nečte žádná brána a obsahuje ${parts.join(' a dále ')}.** Ponecháno záměrně, ` +
      'aby zůstal zachovaný důvod.',
    notesAttempts: n => `pokusy a záznamy, které tento běh vytvořil a nezapsal jako artefakt (${n})`,
    notesEdits: 'záznam o každé úpravě, kterou člověk provedl v artefaktu vytvořeném agentem ' +
      '([`marked-edits.md`](./notes/marked-edits.md))',
    footer: dir => ['**GENEROVÁNO. Tento soubor neupravujte.** Každý řádek výše je odvozen z `RUN-STATE.md` a z',
      `artefaktů vedle něj. Znovu ho vytvoří úloha „${FRONT_DOOR_TASK}“.`,
      'C79 ho odmítne, když se od běhu rozejde, takže ruční úprava shodí build, místo aby tiše',
      'odporovala běhu, který popisuje.'],
  },
};
const STAGE_NAMES_CS = {
  1: 'Zadání', 2: 'Příležitosti', 3: 'Analýza konkurence', 4: 'Řešení', 5: 'MVP', 6: 'PRD', 7: 'Iniciativa',
};
export const frontWords = dir => (runLanguage(dir) === 'cs' ? FRONT_WORDS.cs : FRONT_WORDS.en);

const CONTRACTS = '.github/workflow-contracts';
const AGENTS_DIR = '.github/agents';


function firstSkillOfStage(stage) {
  const wf = workflowText(join(CONTRACTS, 'discovery.workflow.yaml'));
  for (const m of wf.matchAll(/^  - id: (\S+)\n((?:    .*\n|\s*\n(?=    ))*)/gm)) {
    const body = m[2];
    if (Number((body.match(/^    stage: (\d+)/m) || [])[1]) !== Number(stage)) continue;
    const composed = (body.match(/^    composes: (\S+)/m) || [])[1];
    if (composed) {
      const f = join(CONTRACTS, `${composed}.workflow.yaml`);
      if (existsSync(f)) {
        const sub = workflowText(f);
        const s = (sub.match(/^    skill: (\S+)/m) || [])[1];
        if (s) return s;
      }
    }
    const skill = (body.match(/^    skill: (\S+)/m) || [])[1];
    if (skill) return skill;
    const agent = (body.match(/^    agent: (\S+)/m) || [])[1];
    if (agent) return { agent };
  }
  return null;
}

function wrapperFor(designAgent, skill) {
  const files = readdirSync(AGENTS_DIR).filter(f => f.endsWith('.agent.md'));
  const owns = files.filter(f => new RegExp(`\\*\\*Design agent:\\*\\* \`${designAgent}\``).test(readFileSync(join(AGENTS_DIR, f), 'utf8')));
  if (owns.length === 1) return owns[0];
  const reg = workflowText('.github/registry/agents.yaml');
  for (const m of reg.matchAll(/  - agent_file: (\S+)\n(?:.*\n)*?    covers: \[([^\]]*)\]/g))
    if (m[2].split(',').map(s => s.trim()).includes(skill)) return m[1].split('/').pop();
  return owns[0] || null;
}

function agentForStage(stage) {
  const hit = firstSkillOfStage(stage);
  if (!hit) return null;
  const skill = typeof hit === 'string' ? hit : null;
  const designAgent = skill
    ? Object.entries(AGENT_BINDINGS).find(([, ss]) => ss.includes(skill))?.[0]
    : hit.agent;
  if (!designAgent) return null;
  const f = wrapperFor(designAgent, skill);
  if (!f) return null;
  return (readFileSync(join(AGENTS_DIR, f), 'utf8').match(/^name: "?([^"\n]+)"?/m) || [])[1] || null;
}

function parseRunState(text) {
  text = String(text).replace(/^\ufeff/, '');
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return null;

  const out = { stages: [], stale: [], know_how_not_read: [], decisions: [], judged_withdrawn: [] };
  const scalar = s => unquote(s.trim());
  const list = s => {
    s = s.trim();
    return s === '[]' || s === '' ? [] : s.replace(/^\[|\]$/g, '').split(',').map(scalar).filter(Boolean);
  };
  let cur = null, sub = null, section = null;

  for (const line of text.slice(4, end).split('\n')) {
    if (!line.trim()) continue;
    const ind = line.length - line.trimStart().length;
    const t = line.trim();

    if (ind === 0) {
      cur = null; sub = null; section = null;
      if (t === 'stages:') { section = 'stages'; continue; }
      if (t === 'stale:') { section = 'stale'; continue; }
      if (t === 'know_how_not_read:') { section = 'unread'; continue; }
      if (t === 'refinements:') { section = 'refinements'; continue; }
      if (t === 'decisions:') { section = 'decisions'; continue; }
      if (t === 'judged_withdrawn:') { section = 'judged_withdrawn'; continue; }
      if (/^\w+:\s*\[\]$/.test(t)) continue;
      const c = t.indexOf(':');
      if (c > 0) out[t.slice(0, c)] = scalar(t.slice(c + 1));
      continue;
    }
    if (ind === 2 && t.startsWith('- ')) {
      const c = t.indexOf(':');
      const key = t.slice(2, c).trim(), val = scalar(t.slice(c + 1));
      if (section === 'stale') { cur = { [key]: val }; out.stale.push(cur); }
      else if (section === 'unread') { cur = { [key]: val }; out.know_how_not_read.push(cur); }
      else if (section === 'refinements') { cur = {}; }
      else if (section === 'decisions') { cur = { [key]: val }; out.decisions.push(cur); }
      else if (section === 'judged_withdrawn') { cur = { [key]: val }; out.judged_withdrawn.push(cur); }
      else if (section === 'stages') { cur = { id: Number(val), know_how: [], artifacts: [] }; out.stages.push(cur); }
      else { cur = {}; }
      sub = null; continue;
    }
    if (ind === 4 && cur) {
      const c = t.indexOf(':');
      const k = t.slice(0, c), v = t.slice(c + 1).trim();
      if (v === '') { sub = k; cur[k] = k === 'decision_gates' ? [] : {}; continue; }
      sub = null;
      cur[k] = (k === 'know_how' || k === 'artifacts' || (k === 'check' && v.startsWith('['))
                || (k === 'verdicts' && section === 'judged_withdrawn')) ? list(v) : scalar(v);
      continue;
    }
    if (ind === 6 && sub && cur && t.startsWith('- ')) {
      if (!Array.isArray(cur[sub])) cur[sub] = [];
      const c = t.indexOf(':');
      cur[sub].push({ [t.slice(2, c).trim()]: scalar(t.slice(c + 1)) });
      continue;
    }
    if (ind === 8 && sub && cur && Array.isArray(cur[sub]) && cur[sub].length) {
      const c = t.indexOf(':');
      cur[sub][cur[sub].length - 1][t.slice(0, c)] = scalar(t.slice(c + 1));
      continue;
    }
    if (ind === 6 && sub && cur) {
      const c = t.indexOf(':');
      const k6 = t.slice(0, c), v6 = t.slice(c + 1);
      cur[sub][k6] = (k6 === 'failed' || k6 === 'on_accepted') ? list(v6) : scalar(v6);
    }
  }
  return out;
}

function artifactTitle(dir, file) {
  const txt = readFileSync(join(dir, file), 'utf8').replace(/^\ufeff/, '');
  const body = txt.startsWith('---') ? txt.slice(txt.indexOf('\n---', 3) + 4) : txt;
  const h1 = body.split('\n').find(l => /^#\s+\S/.test(l));
  return h1 ? h1.replace(/^#\s+/, '').trim() : '';
}

function artifactFiles(dir) {
  const map = new Map();
  for (const a of runArtifacts(dir)) if (a.id) map.set(a.id, a.rel);
  return map;
}

function supersededFiles(dir) {
  return superseded(dir);
}

const stageOfPath = p => ((/(?:^|\/)(\d+)-[^/]+\//.exec(String(p == null ? '' : p)) || [])[1] || '');

function takenBackSentence(sup, w) {
  const took = sup.filter(s => s.stamp);
  const unstamped = sup.length - took.length;
  const parts = [w.retained(sup.length)];
  if (took.length) {
    const groups = new Map();
    for (const s of took) {
      const key = [stageOfPath(s.stamp.from), s.stamp.by, s.stamp.at].join('\u0000');
      groups.set(key, (groups.get(key) || 0) + 1);
    }
    const clauses = [...groups].sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, n]) => { const [stage, by, at] = key.split('\u0000'); return w.takenBackFrom(n, stage, by, at); });
    const reasons = [...new Set(took.map(s => s.stamp.reason).filter(Boolean))];
    parts.push(w.takenBack(took.length, clauses));
    if (reasons.length) parts.push(w.takenBackWhy(reasons));
  }
  if (unstamped) parts.push(w.noStamp(unstamped, took.length > 0));
  return parts.join(' ');
}

const endsSentence = t => { const s = String(t == null ? '' : t).trim(); return /[.!?]$/.test(s) ? s : `${s}.`; };
const beforeCause = t => String(t == null ? '' : t).trim().replace(/\.$/, '');

export function render(dir) {
  viewCache = new Map();
  try { return renderPage(dir); } finally { viewCache = null; }
}

function renderPage(dir) {
  const runId = basename(dir);
  const statePath = join(dir, 'RUN-STATE.md');
  if (!existsSync(statePath)) return null;
  const st = parseRunState(readFileSync(statePath, 'utf8'));
  const files = artifactFiles(dir);
  const L = [];

  const brief = files.get('A1');
  const title = brief ? artifactTitle(dir, brief) : '';
  const w = frontWords(dir);
  const lang = runLanguage(dir) === 'cs' ? 'cs' : 'en';

  L.push(`# ${runId}`);
  L.push('');
  if (title) L.push(`**${title}**`);
  L.push('');

  const stages = st.stages || [];
  const current = stages.find(s => Number(s.id) === Number(st.current_stage));
  const done = stages.filter(s => s.status === 'accepted').length;
  L.push(Number.isFinite(Number(st.current_stage))
    ? w.status(st.current_stage, stages.length, st.status, done)
    : w.closed(st.status, done, stages.length));
  if (st.build) L.push(w.build(st.build));

  if (files.size === 0) L.push(w.noArtifact);

  let changesFirst = [];
  if (current) {
    const q = current.quality_gate,
          d = decisionsFor(current.id).some(id => !recordedDecisions(current).some(x => x && x.id === id));
    const renamed = folderRenamed(st.run_id, basename(dir));
    const failedIds = q ? [...new Set((Array.isArray(q.failed) ? q.failed : String(q.failed || '').replace(/^\[|\]$/g, '').split(','))
      .map(x => String(x).trim()).filter(Boolean))] : [];
    const neverIds = failedIds.filter(id => cannotSign(id, renamed)), signableIds = failedIds.filter(id => !cannotSign(id, renamed));
    const whatFixes = ids => {
      const byFix = new Map();
      for (const id of ids) {
        const fix = String(fixFor(id, renamed) || '').replaceAll('<run_id>', st.run_id || basename(dir));
        byFix.set(fix, [...(byFix.get(fix) || []), id]);
      }
      return [...byFix].map(([fix, of]) => `What fixes ${of.join(' and ')}: ${fix}`).join(' ');
    };
    const failuresNow = current.status === 'q_failed' && q && !coveredBySignature(st, current) ? failureOnAccepted(dir, current.id) : null;
    const onAccepted = failuresNow && failuresNow.wholly ? failuresNow : null;
    const accAbout = ((failuresNow && failuresNow.about) || []).filter(f => signableIds.includes(f.id));
    const accIds = accAbout.map(f => f.id), accStages = [...new Set(accAbout.flatMap(f => f.stages))].sort((a, b) => a - b);
    const agentIds = signableIds.filter(id => !accIds.includes(id));
    const them = xs => (xs.length === 1 ? 'it' : 'them');
    const accWords = accIds.length ? `${accIds.join(', ')} ${accIds.length === 1 ? 'is' : 'are'} about ${stageWords(accStages)}, ` +
      `which ${accStages.length === 1 ? 'is' : 'are'} already accepted` : '';
    const aboutAccepted = onAccepted && `${onAccepted.ids.length === 1 ? 'a finding' : 'findings'} about ${stageWords(onAccepted.stages)}, ` +
      `which ${onAccepted.stages.length === 1 ? 'is' : 'are'} already accepted`;
    const signedAdvance = signatureLine(st, current);
    if (signedAdvance)
      L.push(`Stage ${current.id} ${signedAdvance}. **It advanced because a person accepted that, not because it passed.**`);
    else if (current.status === 'in_review' && q && q.result === 'pass' && d)
      L.push(`Stage ${current.id} passed ${q.id} on ${shownDate(q.run_at)} and **waits on its human decision gate.** No agent may take it.`);
    else if (current.status === 'q_failed' && aboutAccepted)
      L.push(`Stage ${current.id} failed ${q.id} on ${aboutAccepted}. **Nothing written at this stage can change what failed.**`);
    else if (current.status === 'q_failed' && (neverIds.length || accIds.length))
      L.push(`Stage ${current.id} failed ${q.id}` + (neverIds.length ? ` on ${neverIds.join(', ')}, which nobody can sign off.` : '.') +
        (accIds.length ? ` ${accWords}: nothing written at this stage changes ${them(accIds)}.` : '') +
        (agentIds.length ? ` **${agentIds.join(', ')} ${agentIds.length === 1 ? 'returns' : 'return'} to the skill** — or a person signs ` +
          `${them(agentIds)} where the run cannot satisfy ${them(agentIds)}, and it advances carrying the failure.`
          : ` **It does not go back to the skill**; the next line says what fixes it.`));
    else if (current.status === 'q_failed')
      L.push(`Stage ${current.id} failed ${q ? q.id : 'its quality gate'}. **The stage does not reach a person; it returns to the skill** — `
        + `or a person signs what the run cannot satisfy, check by check, and it advances carrying the failure.`);
    else if (st.status === 'complete') L.push(w.complete);
    else L.push(w.stageIs(current.id, current.status));

    const gateOf = n => GATES[Number(n)] || { quality: null, decision: null };
    const g = gateOf(current.id);
    const record = frontmatter(readFileSync(statePath, 'utf8'), 'RUN-STATE.md');
    const have = new Map();
    for (const a of runArtifacts(dir)) (have.get(Number(a.stage)) || have.set(Number(a.stage), new Set()).get(Number(a.stage))).add(a.id);
    const now = standing(record, have);
    if (current.status === 'running' && !now.agent.length) changesFirst = needingChanges(dir);
    const who = agentForStage(current.id);
    const agent = who || 'The agent that carries this stage', byAgent = who || 'the agent that carries this stage';
    const words = ids => (ids.length > 1 ? `${ids.slice(0, -1).join(', ')} and ${ids[ids.length - 1]}` : ids[0]);
    const materialFolder = Number(current.id) === 2 && !suppliedFiles(dir).length ? `${STAGE_DIRS[1]}/${SUPPLIED_DIR}/` : null;
    const approveTask = `"SPOCK: approve what is in front of me"`;
    const unreadLine = () => {
      const files = g.quality ? unreadableFiles(dir, g.quality) : [];
      return files.length
        ? `**Next:** the checker could not read ${words(files.map(f => f.rel))}, so ${byAgent} changes ${files.length === 1 ? 'that file so it reads' : 'those files so they read'}, ` +
          `and "SPOCK: check what is written, then continue" runs ${g.quality} again. Nothing is asked of you until then.`
        : null;
    };
    const NEXT = {
      pending:  () => (materialFolder
        ? `**Next:** stage 2 starts from the problem material, which only you can supply, as files in \`${materialFolder}\`. ${agent} writes the stage from it.`
        : `**Next:** ${agent} starts this stage. Nothing is asked of you yet.`),
      running:  () => {
        if (now.agent.length && materialFolder)
          return `**Next:** stage 2 starts from the problem material, which only you can supply, as files in \`${materialFolder}\`. ` +
                 `${agent} writes ${words(now.agent)} from it once it is there.`;
        if (now.agent.length)
          return `**Next:** ${agent} is writing ${words(now.agent)}. Nothing is asked of you until ${now.agent.length === 1 ? 'it is' : 'they are'} written.`;
        if (now.person.length) {
          const needs = changesFirst;
          if (needs.length)
            return `**Next:** ${agent} changes ${words(needs)} first: the checks still object to ${needs.length === 1 ? 'it' : 'them'}, ` +
                   `and "SPOCK: check what is written, then continue" says what. Nothing is asked of you until then.`;
          return `**Next:** stage ${current.id} waits on you, not on the agent: ${now.person[0].id} ${now.person[0].why}. Run "${PERSON_TASK[now.person[0].after]}".`;
        }
        if (changesFirst.length)
          return `**Next:** ${agent} changes ${words(changesFirst)} first: the checks still object to ${changesFirst.length === 1 ? 'it' : 'them'}, ` +
                 `and "SPOCK: check what is written, then continue" says what. Nothing is asked of you until then.`;
        return `**Next:** the stage is written, and "SPOCK: check what is written, then continue" takes it to ${g.quality}. Nothing is asked of you yet.`;
      },
      produced: () => `**Next:** ${g.quality} checks the stage when "SPOCK: check what is written, then continue" runs. Nothing is asked of you until it has.`,
      q_failed: () => {
        if (coveredBySignature(st, current))
          return unreadLine() ||
            `**Next:** every check ${g.quality} failed is signed off, so the stage moves on carrying the failure when "SPOCK: check what is written, then continue" runs.`;
        if (aboutAccepted && onAccepted.never.length)
          return `**Next:** the stage did not pass ${g.quality} on ${aboutAccepted}, and ${onAccepted.never.join(', ')} ` +
            `${onAccepted.never.length === 1 ? 'is a check' : 'are checks'} nobody can sign off. ` + whatFixes(onAccepted.never);
        if (aboutAccepted) {
          const it = onAccepted.ids.length === 1 ? 'it' : 'them';
          return `**Next:** the stage did not pass ${g.quality} on ${aboutAccepted}, so ${byAgent} cannot change ${it} from this stage. ` +
            `If this run cannot meet ${it}, accept ${it} with "${SIGN_OFF_TASK}".`;
        }
        const never = neverIds;
        const accPart = accIds.length ? ` ${accWords}, so ${byAgent} cannot change ${them(accIds)} from this stage: send that stage back ` +
          `with "SPOCK: send a stage back to be redone", or, where the run cannot meet ${them(accIds)}, accept ${them(accIds)} with "${SIGN_OFF_TASK}".` : '';
        const agentPart = agentIds.length ? ` ${agentIds.join(', ')} ${agentIds.length === 1 ? 'goes' : 'go'} back to ${byAgent}, who changes what ` +
          `${g.quality} named; where the run cannot meet ${them(agentIds)}, you can accept ${them(agentIds)} with "${SIGN_OFF_TASK}".` : '';
        if (never.length)
          return `**Next:** the stage did not pass ${g.quality}, and ${never.join(', ')} ${never.length === 1 ? 'is a check' : 'are checks'} ` +
            `nobody can sign off. ` + whatFixes(never) + accPart + agentPart;
        if (accIds.length)
          return `**Next:** the stage did not pass ${g.quality}.` + accPart + agentPart;
        if (failuresNow && failedIds.length && failedIds.every(id => failuresNow.persons.includes(id)))
          return `**Next:** the stage did not pass ${g.quality} on what waits on you, not on ${byAgent}: each finding says what you can do, ` +
            `and what you keep, with your reason, you sign off with "${SIGN_OFF_TASK}".`;
        return `**Next:** the stage did not pass ${g.quality}, so it goes back to ${byAgent}, who changes what ${g.quality} named. ` +
          `Nothing is asked of you until it passes. Where the run cannot meet a check, you can accept that with "${SIGN_OFF_TASK}".`;
      },
      in_review: () => {
        if (!decisionsFor(current.id).length)
          return `**Next:** stage ${current.id} takes no decision: ${g.quality} accepts it on its own once it passes.`;
        const unreadable = unreadLine();
        if (unreadable) return unreadable;
        const changed = changedInReview(dir, record, current.id);
        const again = changed ? ` ${changed[0].toUpperCase()}${changed.slice(1)} changed after ${g.quality} ran, so the approval runs ${g.quality} ` +
          `again first, and records your decision only if the stage passes it or fails only on checks a person signed.` : '';
        if (!now.pending.length) return `**Next:** every decision on this stage is recorded, and approving it accepts it with ${approveTask}.${again}`;
        const choiceFirst = Object.values(WAITS_ON_A_PERSON).some(w => w.after === 'approval' && Number(w.stage) === Number(current.id))
          && !standingChoices(record, current.id).length;
        return `**Next:** the stage waits on your decision at ${now.pending.join(' and ')}. Read the stage's documents, then ` +
          (choiceFirst ? `record which one you choose with "${PERSON_TASK.choice}" and approve it with ${approveTask}.` : `approve it with ${approveTask}.`) + again;
      },
      refined:  () => `**Next:** ${agent} makes the changes this round asked for, and ${g.quality} runs again before the stage comes back to you.`,
      stale:    () => unreadLine() || `**Next:** a stage this one is built on was sent back or re-run after it was accepted. ` +
                      `${(r => r[0].toUpperCase() + r.slice(1))(staleRoutes('this stage'))}.`,
    };
    const stopped = stoppedLine(basename(dir), st);
    if (stopped) {
      L.push(`**Next:** nothing. ${stopped} No task restarts it; a new run starts with "SPOCK: start a run".`);
    } else if (current.status === 'accepted') {
      const nextId = Number(current.id) + 1;
      const next = stages.find(s => Number(s.id) === nextId);
      if (next) {
        const who = agentForStage(nextId);
        L.push(`Stage ${nextId} is **${next.name || STAGE_NAMES[nextId] || `stage ${nextId}`}**` +
               (who ? ` and **${who}** carries it.` : '.') +
               ' It reads what this stage accepted; nothing else has to be carried across.');
      }
    } else if (NEXT[current.status]) {
      L.push(NEXT[current.status]());
    }
  }
  const signAgain = signAgainLine(st);
  if (signAgain) L.push(`**Next:** ${signAgain}.`);
  L.push('');

  L.push(w.readThese);
  L.push('');
  L.push(w.chainWhy);
  L.push('');
  L.push(w.readHeader);
  L.push('|---|---|---|---|');
  const decidedCell = s2 => recordedDecisions(s2).map(d2 => (String(s2.status) === 'stale'
    ? w.decidedStale(d2.id, d2.decided_at, d2.decided_by) : `${d2.id} ${d2.decided_by}, ${shownDate(d2.decided_at)}`)).join('; ');
  const qualityCell = s2 => {
    const q2 = s2.quality_gate;
    if (!q2) return '—';
    const cell = `${q2.id} ${q2.result}, ${shownDate(q2.run_at)}`;
    if (!coveredBySignature(st, s2)) return cell;
    const failed = q2.failed.map(String);
    const covering = coveringSignatures(st, s2);
    const own = failed.filter(c => !(covering.get(c) || {}).carried);
    const parts = own.length ? [w.signedOff([...new Set(signedExceptions(st, s2.id)
      .filter(d2 => signedChecks(d2).some(c => own.includes(c))).map(d2 => d2.by))].join(w.and), own.join(', '))] : [];
    const from = new Map();
    for (const c of failed.filter(c => !own.includes(c))) {
      const v = covering.get(c);
      from.set(v.from, { by: new Set([...((from.get(v.from) || {}).by || []), v.d.by]), cs: [...((from.get(v.from) || {}).cs || []), c] });
    }
    for (const [m, x] of [...from].sort((a, b) => a[0] - b[0]))
      parts.push(w.carriedFrom(m, [...x.by].join(w.and), x.cs.join(', ')));
    return `${cell}, ${parts.join('; ')}`;
  };
  for (const [id, label, what] of DELIVERABLES(runLanguage(dir))) {
    const f = files.get(id);
    if (!f) { L.push(`| ${id} | *${label}* | ${what} | ${w.notProduced} |`); continue; }
    const owner = stages.find(s => (s.artifacts || []).includes(id));
    let state = owner ? `\`${owner.status}\`` : '—';
    if (owner && decidedCell(owner)) state += ` · ${decidedCell(owner)}`;
    else if (owner && owner.quality_gate) state += ` · ${qualityCell(owner)}`;
    L.push(`| ${id} | [${label}](./${f}) | ${what} | ${state} |`);
  }
  L.push('');

  {
    const shown = READER_SET.filter(([id]) => files.get(id));
    if (shown.length) {
      L.push(w.everythingElse);
      L.push('');
      L.push(w.forAReader(shown.length));
      L.push('');
      for (const g of ['outcome', 'asset', 'working']) {
        const rows = shown.filter(([, kind]) => kind === g);
        if (!rows.length) continue;
        const [heading, why] = w.groups[g];
        L.push(`**${heading}.** ${why}`);
        L.push('');
        for (const [id, , label, what] of rows) {
          const [l2, w2] = (w.readers && w.readers[id]) || [label, what];
          L.push(`- [${l2}](./${files.get(id)}) — ${w2}`);
        }
        L.push('');
      }
    }
  }

  const parkedWhy = parkedArtifacts();
  L.push(w.chain);
  L.push('');
  L.push(w.chainHeader);
  L.push('|---|---|---|---|---|---|');
  for (const s of stages) {
    const name = w.stageName(s);
    const arts = (s.artifacts || [])
      .map(a => files.has(a) ? `[${a}](./${files.get(a)})`
        : parkedWhy.has(a) ? `${a} ${w.parkedCell(parkedWhy.get(a))}`
        : writtenAtApproval(s, a) ? `${a} ${w.atApproval}` : `${a} ${w.notProducedCell}`).join(' ') || '—';
    const q = qualityCell(s);
    let d = '—';
    if (decidedCell(s)) d = decidedCell(s);
    else if (Number(s.id) === 3) d = w.noneByDesign;
    else if (s.quality_gate && (s.quality_gate.result === 'pass' || coveredBySignature(st, s))) d = w.open;
    L.push(`| ${s.id} | ${name} | \`${s.status}\` | ${arts} | ${q} | ${d} |`);
  }
  L.push('');

  {
    const lines = stages.flatMap(s2 => (Array.isArray(s2.corrections) ? s2.corrections : [])
      .map(c => w.corrected(s2.id, c.from, c.to, c.by, c.at, c.reason)));
    if (lines.length) { for (const l of lines) L.push(l); L.push(''); }
  }

  const owes = [];

  {
    const parked = parkedArtifacts();
    for (const s2 of stages) {
      const status = String(s2.status || '');
      if (status === 'pending' || status === 'accepted' || status === 'superseded') continue;
      const absent = (s2.artifacts || []).filter(a => !files.has(a) && !parked.has(a));
      const later = absent.filter(a => writtenAtApproval(s2, a));
      const onPerson = absent.filter(a => waitsOnPerson(s2, a));
      const missing = absent.filter(a => !later.includes(a) && !onPerson.includes(a));
      if (missing.length) owes.push(w.stillOwes(s2.id, missing, w.and));
      if (later.length) owes.push(w.notWaiting(s2.id, later));
      const first = current && Number(s2.id) === Number(current.id) && changesFirst.length
        ? w.onceChanged(changesFirst, w.and) : '';
      for (const a of onPerson) owes.push(w.waitsForPerson(s2.id, a, first, WAITS_ON_A_PERSON[a].after));
    }
  }
  function writtenAtApproval(stage, id) {
    const w = WAITS_ON_A_PERSON[id];
    const status = String((stage && stage.status) || '');
    return Boolean(w) && w.after === 'approval' && Number(w.stage) === Number(stage.id) && !['pending', 'accepted', 'superseded'].includes(status);
  }
  function waitsOnPerson(stage, id) {
    const w = WAITS_ON_A_PERSON[id];
    const status = String((stage && stage.status) || '');
    return Boolean(w) && (w.after === 'choice' || w.after === 'agreement') && Number(w.stage) === Number(stage.id)
      && !['pending', 'accepted', 'superseded'].includes(status) && !(personActed(st, id) && w.writer !== 'workflow');
  }

  const judged = stages.filter(s => s.quality_gate && Number(s.quality_gate.judged_not_run) > 0);
  if (judged.length) {
    const total = judged.reduce((n, s) => n + Number(s.quality_gate.judged_not_run), 0);
    const gateName = s => (s.quality_gate && s.quality_gate.id) || `stage ${s.id}`;
    const answered = judged.filter(s => Number(s.quality_gate.judged_answered_by_person) > 0).map(gateName);
    const unanswered = judged.filter(s => !(Number(s.quality_gate.judged_answered_by_person) > 0)).map(gateName);
    owes.push(w.judgedRules(total, judged.map(gateName), answered, unanswered, w.and));
  }
  const owesRead = owesNow(st, gate => viewOf(dir, gate));
  for (const s2 of stages) {
    const line = signatureLine(st, s2, lang);
    if (!line) continue;
    const stands = owesRead.signed.get(Number(s2.id)) || { fails: [], passes: [], unread: [] };
    const failedIds = (s2.quality_gate.failed || []).map(String);
    const why = signedExceptions(st, s2.id)
      .map(d2 => ({ d2, mine: signedChecks(d2).filter(c => failedIds.includes(c)) }))
      .filter(x => x.mine.length);
    const carried = new Map();
    for (const [c, v] of coveringSignatures(st, s2)) if (v.carried) carried.set(v.d, [...(carried.get(v.d) || []), c]);
    const cause = d2 => (String(d2.cause || '').trim() === 'workflow' ? ` (${WORKFLOW_FAULT_WORDS})` : '');
    const narrowed = d2 => { const n = narrowing(st, d2); return n ? w.narrowedOn(n.date, n.from, n.dropped, w.and) : ''; };
    const signOff = (opening, d2) => `\n  - ${opening}: ` +
      endsSentence(cause(d2) ? `${beforeCause(d2.reason)}${cause(d2)}` : d2.reason) +
      (String(d2.what == null ? '' : d2.what).trim() ? w.whatAccepted(endsSentence(d2.what)) : '') + narrowed(d2);
    const standsNow = [stands.fails.length ? w.signedStill(stands.fails, w.and) : '',
      stands.passes.length ? w.signedPassesNow(stands.passes, w.and) : '',
      stands.unread.length ? w.signedUnread(stands.unread, w.and) : ''].filter(Boolean).map(x => ` ${x}`).join('');
    owes.push(w.signedHeadline(s2.id, line) + standsNow +
      [...why.map(x => signOff(w.signedOn(x.mine.join(', ')), x.d2)),
       ...[...carried].map(([d2, cs]) => signOff(w.signedCarried(cs.join(', '), d2.stage), d2))].join(''));
  }
  for (const { entry: k, gap } of owesRead.bodies)
    owes.push(gap.valid ? w.bodyNotRead(k.stage, k.body, k.reason)
      : w.gapRefused(k.stage, w.gapWhy[gap.key](String(k.body || '').replace(/\.md$/, '').split('@')[0], k.stage)));
  for (const x of st.stale || []) {
    if (String(x.rebuilt) === 'true') owes.push(w.staleRebuilt(x.artifact, x.reason));
    else if (x.accepted_by) owes.push(w.staleAccepted(x.artifact, x.accepted_by, x.accepted_at, x.reason));
    else owes.push(w.staleOpen(x.artifact, x.reason));
  }
  if (resolve(join(RUNS_ROOT, basename(dir))) === resolve(dir))
    for (const e of editedAfterAcceptance(basename(dir), frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md')))
      owes.push(w.editedAfter(e.stage, e.documents));
  const sup = supersededFiles(dir);
  if (sup.length) owes.push(takenBackSentence(sup, w));
  if (existsSync(join(dir, 'notes'))) {
    const notes = readdirSync(join(dir, 'notes')).filter(f => f.endsWith('.md'));
    const edits = notes.includes('marked-edits.md');
    const rest = notes.filter(f => f !== 'marked-edits.md').length;
    const parts = [];
    if (rest) parts.push(w.notesAttempts(rest));
    if (edits) parts.push(w.notesEdits);
    owes.push(w.notesHolds(parts));
  }

  if (owes.length) {
    L.push(w.notClaimed);
    L.push('');
    for (const o of owes) L.push(`- ${o}`);
    L.push('');
  }

  L.push('---');
  L.push('');
  L.push(...w.footer(dir));
  L.push('');
  return L.join('\n');
}

export function runDirs(root) { return findRunDirs(root); }

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  const write = argv.includes('--write');
  const targets = argv.filter(a => !a.startsWith('--'));
  const dirs = targets.length ? targets : runDirs();
  if (!targets.length && !dirs.length) {
    console.error(`no run with a RUN-STATE.md under ${RUNS_ROOT} — name a run directory, or point ` +
      `.github/runs-root at the tree that holds them (the committed corpus ships under fixtures)`);
    process.exitCode = 2;
  }
  for (const d of dirs) {
    const out = render(d);
    if (out === null) { console.error(`no RUN-STATE.md in ${d}`); process.exitCode = 2; continue; }
    if (write) { writeFileSync(join(d, OUT_NAME), out); console.log(`wrote ${join(d, OUT_NAME)}`); }
    else console.log(out);
  }
}

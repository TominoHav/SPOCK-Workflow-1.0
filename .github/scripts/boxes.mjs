import { personOnly, NEVER_SIGNABLE, coveringSignatures, namesProducer, signedChecks } from './gates.mjs';
import { GATE_ROLES, agentNamed, rolesOn, namesOn, fold, recordedRole } from './decision-block.mjs';
import { storedDate } from './fixed-messages.mjs';
export { recordedRole };

export const EMPTY_ANSWERS = ['own request', 'my request', 'as agreed', 'as discussed', 'see above', 'no reason', 'ok', 'done',
  'n/a', '-', 'none', 'TBD', 'vlastní žádost', 'moje žádost', 'dle dohody', 'viz výše', 'bez důvodu', 'hotovo', 'nic', 'žádný',
  'nevím'].map(fold);

export const ROLE_WORDS = ['product manager', 'product owner', 'designer', 'product designer', 'researcher', 'analyst',
  'business analyst', 'manager', 'owner', 'PM', 'PO', 'produktový manažer', 'produktová manažerka', 'product manažer',
  'product manažerka', 'produktový vlastník', 'produktová vlastnice', 'designér', 'designérka', 'produktový designér',
  'produktová designérka', 'výzkumník', 'výzkumnice', 'analytik', 'analytička', 'business analytik', 'business analytička',
  'manažer', 'manažerka', 'vlastník', 'vlastnice'].map(fold);

export function isRole(value, state = null) {
  const f = fold(value);
  if (!f) return false;
  if (ROLE_WORDS.includes(f)) return true;
  if (Object.values(GATE_ROLES).flat().some(r => fold(r) === f)) return true;
  if (agentNamed(value)) return true;
  return [...rolesOn(state || {})].some(r => fold(r) === f);
}

const onlyCheckIds = v => /^(?:c\d+[\s,;]*)+$/i.test(String(v).trim());
export const boxPrompt = description => String(description).split(/\.\s(?!\d)|\.$|(?<=\S)\?\s/)[0]
  .replace(/,[^,]*\bas in:? .*$/, '').replace(/,? as in:? .*$/, '').trim();
export const refusalLine = (prompt, why, example, meant = null) => {
  const w = String(why).replace(/\.$/, '');
  return `The box '${prompt}'${/^[A-Z]/.test(w) ? ':' : ''} ${w}.` +
    (meant ? ` Did you mean ${meant}? Run the task again and type it.`
      : example === false ? '' : example ? ` Run the task again and type, for example, ${example}.` : ' Run the task again.');
};

export function entryRefusal({ what, typed = null, takes = '', next = 'Run the task again.' } = {}) {
  const head = String(what || '').trim().replace(/[.:]$/, '');
  const quote = typed === null || typed === undefined ? '' : String(typed).trim();
  const first = quote && !head.includes(`"${quote}"`) ? `${head}: you typed "${quote}".` : `${head}.`;
  return [first, String(takes || '').trim(), String(next || '').trim()].filter(Boolean).join('\n        ');
}

export function notPersonRefusal(by, act, prompt, what) {
  const t = String(by ?? '').trim();
  if (!t) return '';
  if (!/\p{L}/u.test(t))
    return entryRefusal({ what: `${what}: "${t}" is not a name`, takes: `The box '${prompt}' takes a person's name, and ${act} is recorded under it.`,
      next: 'Run the task again and type your name.' });
  const named = namesProducer(t);
  return named.length
    ? entryRefusal({ what: `${what}: "${t}" names ${named.join(', ')}, which produces work in this workflow`,
        takes: `The box '${prompt}' takes a person's name: ${act} is a person's act and never a producer's.`,
        next: 'Run the task again and type the name of the person who decided.' })
    : '';
}

export const BOX_TYPES = {
  name: {
    accepts: 'a person\'s name: letters in any language, spaces, hyphens, apostrophes and dots, at least one letter',
    check(v, ctx) {
      const t = String(v || '').trim();
      if (!t) return { refuse: 'is empty, and what this task records carries the name of the person who typed it' };
      if (isRole(t, ctx.state)) return { refuse: `takes your name, and '${t}' is a role`, whole: `'${t}' is a role. This box takes your name, as in ${ctx.box.example}; the role goes in the role box.` };
      const not = personOnly(t, ctx.act || 'What this task records', ctx.flag || '--by');
      if (not) return { refuse: `refuses this: ${not.replace(/\s*\n\s*/g, ' ')}`, whole: not.replace(/\s*\n\s*/g, ' ') };
      return {};
    } },
  role: {
    accepts: 'the role a person decides in; empty takes the role the run records for the name typed in the same task',
    check(v, ctx) {
      const t = String(v || '').trim();
      const who = String(ctx.name || '').trim();
      if (!t) {
        if (ctx.box.neverEmpty) return { refuse: 'is empty, and a run records the role of the person who starts it' };
        const held = who ? recordedRole(ctx.state, who) : '';
        if (held) return { fill: held, said: `The role box was left empty, so it takes ${held}, the role this run records for ${who}.` };
        return { refuse: who ? `is empty, and this run records no role for ${who} yet` : 'is empty, and no name was typed to fill it from',
          whole: who ? `This run records no role for ${who} yet. Type the role you decide in, as in ${ctx.box.example}.` : null };
      }
      const names = new Set([...namesOn(ctx.state || {})].map(fold));
      if (ctx.state && ctx.state.person && ctx.state.person.name) names.add(fold(ctx.state.person.name));
      if (who) names.add(fold(who));
      if (names.has(fold(t)) && !isRole(t, ctx.state))
        return { refuse: `takes the role you decide in, and '${t}' is a name`, whole: `'${t}' is a name. This box takes the role you decide in, as in ${ctx.box.example}.` };
      return {};
    } },
  reason: {
    accepts: 'words with content: not empty, and not only a name, a role, check ids, a declared empty answer or another box\'s value',
    check(v, ctx) {
      const t = String(v || '').trim();
      const why = `does not say why: a reader of the run cannot learn from it why ${ctx.box.records}`;
      if (!t) return { refuse: `is empty, so it ${why.replace(/^does not say why: /, 'says nothing, and ')}` };
      const f = fold(t);
      const names = new Set([...namesOn(ctx.state || {})].map(fold));
      if (ctx.state && ctx.state.person && ctx.state.person.name) names.add(fold(ctx.state.person.name));
      for (const [id, val] of Object.entries(ctx.values || {}))
        if (id !== ctx.box.id && BOXES[id] && ['name'].includes(BOXES[id].type) && fold(val)) names.add(fold(val));
      const other = Object.entries(ctx.values || {}).some(([id, val]) => id !== ctx.box.id && fold(val) && fold(val) === f);
      if (EMPTY_ANSWERS.includes(f) || names.has(f) || isRole(t, ctx.state) || onlyCheckIds(t) || other)
        return { refuse: `'${t}' ${why}`, whole: `'${t}' ${why}. Write why${ctx.box.example ? `, as in: ${ctx.box.example}` : ''}.` };
      return {};
    } },
  pick: {
    accepts: 'one value from a list the workflow printed',
    check(v, ctx) {
      const t = String(v || '').trim();
      if (!ctx.list) return {};
      const none = ctx.list.items.length ? {} : { noExample: true };
      if (!t) return ctx.box.mayBeEmpty ? {} : { refuse: `is empty. ${ctx.list.says}`, ...none };
      const typed = ctx.box.many ? [...new Set(t.split(',').map(x => x.trim()).filter(Boolean))] : [t];
      const read = ctx.box.dates ? storedDate : x => x;
      const off = typed.filter(x => !ctx.list.items.some(i => fold(i) === fold(read(x))));
      if (!off.length) return {};
      return { refuse: `${ctx.list.says} ${off.join(', ')} ${off.length > 1 ? 'are' : 'is'} not one of them`, whole: `${ctx.list.says} ${off.join(', ')} ${off.length > 1 ? 'are' : 'is'} not one of them.`, ...none };
    } },
  fixed: {
    accepts: 'one of the options VS Code offers',
    check(v, ctx) {
      const opts = ctx.options || [];
      return !opts.length || opts.includes(String(v)) ? {} : { refuse: `takes one of ${opts.map(o => `"${o}"`).join(', ')}, and "${v}" is none of them` };
    } },
  answers: { accepts: 'one answer per printed question: y, n or ?', check: () => ({}) },
  run_id: {
    accepts: 'the year, the month and a short name, in lower case letters, digits and hyphens',
    check(v) {
      return /^\d{4}-\d{2}-[a-z0-9][a-z0-9-]*$/.test(String(v || '').trim()) ? {}
        : { refuse: `takes a run id, and "${v}" is not one`, whole: `A run id is the year, the month and a short name, as in 2026-10-card-freeze.` };
    } },
  jira_key: {
    accepts: 'a Jira key, project letters, a hyphen and a number, in either case; or none yet',
    check(v, ctx) {
      const t = String(v || '').trim();
      if (!t) return { refuse: 'is empty. Type the key Jira shows on the initiative, or none yet if it has no key yet' };
      if (NONE_YET.includes(fold(t))) return {};
      const placeholder = jiraPlaceholder(t, ctx.box.example);
      const meant = placeholder ? '' : jiraMeant(t, ctx.box.example);
      if (meant === NONE_YET_SHOWN)
        return { refuse: `takes the initiative's Jira key or none yet, and '${t}' is neither`, meant,
          whole: `'${t}' is not a Jira key, and not none yet as the box takes it. Did you mean none yet? Type none yet if the initiative has no key yet, or the key Jira shows on it, as in ${ctx.box.example}.` };
      if (meant)
        return { refuse: `takes the initiative's Jira key, and '${t}' is not one`, meant,
          whole: `'${t}' is not a Jira key: a key has a hyphen between the project letters and the number. Did you mean ${meant}? Type the key Jira shows on the initiative, or none yet if it has no key yet.` };
      if (placeholder || !JIRA_KEY.test(t))
        return { refuse: `takes the initiative's Jira key, and '${t}' is ${placeholder ? 'a placeholder' : 'not one'}`,
          whole: `'${t}' is ${placeholder ? 'a placeholder' : 'not a Jira key'}, not a key. Type the key Jira shows on the initiative, as in ${ctx.box.example}, or none yet if it has no key yet.` };
      return {};
    } },
  words: {
    accepts: 'the person\'s own words, saved as typed; empty only where the box says so',
    check(v, ctx) { return String(v || '').trim() || ctx.box.mayBeEmpty ? {} : { refuse: 'is empty, and it takes your own words' }; } },
  file: {
    accepts: 'a file path that exists',
    check(v, ctx) { return ctx.exists && ctx.exists(String(v || '').trim()) ? {} : { refuse: `takes a file that exists, and there is no file at "${v}"` }; } },
};

export const NONE_YET = ['none yet', 'zatím není'].map(fold);

const JIRA_KEY = /^[A-Za-z][A-Za-z0-9]*-\d+$/;
const NONE_YET_SHOWN = 'none yet';
const jiraPlaceholder = (t, example) => /^(tbd|n\/a|-+|\?+|x+|0+|\d+)$/i.test(t) || /^x+-[\dx]+$/i.test(t)
  || /^[a-z][a-z0-9]*-0+$/i.test(t) || t.toUpperCase() === String(example || '').toUpperCase();
const NONE_YET_NEAR = ['none', 'nothing', 'nothing yet', 'not yet', 'no key', 'no key yet', 'no jira key', 'no jira key yet',
  'nic', 'zatím nic', 'není', 'ještě není', 'žádný', 'zatím žádný', 'zatím žádný klíč'].map(fold);
const editDistance = (a, b) => {
  let row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    for (let j = 1; j <= b.length; j++) next[j] = Math.min(row[j] + 1, next[j - 1] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    row = next;
  }
  return row[b.length];
};
export function jiraMeant(typed, example) {
  const t = String(typed || '').trim();
  const f = fold(t);
  if (NONE_YET_NEAR.includes(f) || NONE_YET.some(n => editDistance(f, n) <= 2)) return NONE_YET_SHOWN;
  const m = /^([A-Za-z]+)[\s_.–—]?(\d+)$/.exec(t);
  if (!m) return '';
  const key = `${m[1].toUpperCase()}-${m[2]}`;
  return JIRA_KEY.test(key) && !jiraPlaceholder(key, example) ? key : '';
}

const NAME = 'Petra Nováková';
export const BOXES = {
  runId:           { type: 'run_id', example: '2026-10-card-freeze' },
  personName:      { type: 'name', example: NAME },
  personRole:      { type: 'role', example: 'Product Manager', neverEmpty: true, nameBox: 'personName' },
  stage:           { type: 'fixed', example: '1' },
  status:          { type: 'fixed', example: 'running' },
  decisionKind:    { type: 'fixed', example: 'choice' },
  exceptionCause:  { type: 'fixed', example: 'the workflow looks wrong' },
  stopReason:      { type: 'fixed', example: 'high_risk' },
  updateHow:       { type: 'fixed', example: 'update' },
  setupTool:       { type: 'fixed', example: 'GitHub Copilot' },
  by:              { type: 'name', example: NAME },
  approver:        { type: 'name', example: NAME },
  keeper:          { type: 'name', example: NAME },
  pastedBy:        { type: 'name', example: NAME },
  periodsBy:       { type: 'name', example: NAME },
  editBy:          { type: 'name', example: NAME },
  correctedBy:     { type: 'name', example: NAME },
  stageOwner:      { type: 'name', example: 'Tomáš Havlíček' },
  nameCorrected:   { type: 'name', example: 'Tomáš Havlíček' },
  role:            { type: 'role', example: 'Product Manager', nameBox: ['by', 'approver'] },
  stageOwnerRole:  { type: 'role', example: 'Researcher', nameBox: 'stageOwner' },
  what:            { type: 'reason', example: 'we go ahead without this and ask the analytics team for the figure before the PRD', records: 'the check was signed off' },
  decisionWhy:     { type: 'reason', example: 'SOL2 reaches the clients who leave at the second step, and SOL1 does not', records: 'this was decided' },
  replaceWhy:      { type: 'reason', example: 'SOL2 reaches the clients who leave at the second step, and SOL1 does not', records: 'this was decided' },
  refineReason:    { type: 'reason', example: 'the opportunities rest on one interview, and the survey arrived today', records: 'the stage was sent back' },
  keepWhy:         { type: 'reason', example: 'the new brief changed the title only, and nothing stage 3 found depends on it', records: 'the stage stands as it is' },
  supersedeReason: { type: 'reason', example: 'the pilot budget moved to next year, so the smaller option stands', records: 'the earlier decision no longer stands' },
  exceptionReason: { type: 'reason', example: 'no source publishes this figure for our market, so the document cannot cite one', records: 'the check cannot be met' },
  withdrawReason:  { type: 'reason', example: 'a draft copy of the framed opportunities, kept by mistake', records: 'it is not part of the run any more' },
  editWhat:        { type: 'reason', example: 'shortened the outcome to one sentence', records: 'the document was changed' },
  editWhy:         { type: 'reason', example: 'the committee reads only the first line', records: 'the document was changed' },
  correctWhy:      { type: 'reason', example: 'the record spells my surname without its accents', records: 'the spelling is wrong' },
  selection:       { type: 'pick', example: 'SOL2', list: 'choices', mayBeEmpty: true },
  exceptionCheck:  { type: 'pick', example: 'C60', list: 'failing', many: true },
  supersedesAt:    { type: 'pick', example: '24. 9. 2026', list: 'decisionDates', dates: true },
  nameAsRecorded:  { type: 'pick', example: 'Tomas Havlicek', list: 'names' },
  editDocument:    { type: 'pick', example: '1-brief/initiative-brief.md', list: 'documents' },
  withdrawFile:    { type: 'pick', example: '2-opportunities/opportunities copy.md', list: 'files', mayBeEmpty: true },
  judgedVerdicts:  { type: 'answers', example: '1y 2n', mayBeEmpty: true },
  askedBefore:     { type: 'words', example: '', mayBeEmpty: true },
  takeInChanges:   { type: 'fixed', example: 'yes' },
  jiraKey:         { type: 'jira_key', example: 'PROJ-1234' },
  typedProblem:    { type: 'words', example: '' },
  periods:         { type: 'words', example: 'as listed; tickets.csv: 2026-Q2', mayBeEmpty: true },
  stopNote:        { type: 'words', example: '', mayBeEmpty: true },
  traceFile:       { type: 'file', example: '.copilot-traces/otel.jsonl' },
};
for (const [id, b] of Object.entries(BOXES)) b.id = id;

export function signableAt(state, stage) {
  const q = stage && stage.quality_gate;
  if (!q || String(q.result) !== 'fail' || !Array.isArray(q.failed)) return [];
  const covered = coveringSignatures(state, stage);
  return q.failed.map(String).filter(c => c && !NEVER_SIGNABLE.includes(c) && !covered.has(c));
}

export function signedAt(state, stage) {
  const q = stage && stage.quality_gate;
  if (!q || String(q.result) !== 'fail' || !Array.isArray(q.failed)) return [];
  const here = new Set(((state && state.decisions) || [])
    .filter(d => d && d.kind === 'exception' && String(d.stage) === String(stage.id) && !d.superseded_by).flatMap(signedChecks));
  return q.failed.map(String).filter(c => here.has(c));
}

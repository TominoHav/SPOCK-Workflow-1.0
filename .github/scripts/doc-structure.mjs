export const fold = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export function headingsOf(body) {
  const out = [];
  let fenced = false;
  const lines = String(body || '').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*```/.test(l)) { fenced = !fenced; continue; }
    if (fenced) continue;
    const m = l.match(/^(#{1,6})\s+(.*\S)\s*$/);
    if (m) out.push({ level: m[1].length, text: m[2].replace(/\*\*/g, '').trim(), line: i + 1 });
  }
  return out;
}

export const CLOSING = [
  { id: 'could_not_establish', heading: 'What we could not establish', cs: 'Co se nepodařilo zjistit' },
  { id: 'how_produced',        heading: 'How this was produced',       cs: 'Jak to vzniklo' },
];

export const inLanguage = (entry, lang) =>
  (lang === 'cs' && entry && entry.cs) ? entry.cs : (entry && (entry.heading || entry.en || entry));

export function closingReport(headings, lang) {
  const tops = headings.filter(h => h.level === 2);
  const nameOf = id => inLanguage(CLOSING.find(c => c.id === id), lang);
  const at = id => tops.findIndex(h => fold(h.text) === fold(nameOf(id)));
  const iA = at('could_not_establish'), iB = at('how_produced');
  const missing = CLOSING.filter((c, n) => (n === 0 ? iA : iB) === -1).map(c => inLanguage(c, lang));
  const order = iA !== -1 && iB !== -1 && iB !== iA + 1;
  const last = Math.max(iA, iB);
  const trailing = last === -1 ? [] : tops.slice(last + 1).map(h => h.text);
  return { missing, order, trailing };
}

export function opensOnProse(body) {
  const lines = String(body || '').split('\n');
  let i = 0;
  while (i < lines.length && !/^#\s+\S/.test(lines[i])) i++;
  if (i >= lines.length) return { ok: false, why: 'no title' };
  let fenced = false;
  const block = openingAt(lines.slice(i + 1).join('\n'));
  let skip = -1;
  for (let k = i + 1; block && k < lines.length; k++) {
    if (/^\s*$/.test(lines[k])) continue;
    if (lines[k].trim() === OPENING_OPEN) skip = i + 1 + block.to;
    break;
  }
  for (i++; i < lines.length; i++) {
    const l = lines[i];
    if (i <= skip) continue;
    if (/^\s*```/.test(l)) { fenced = !fenced; continue; }
    if (fenced) continue;
    if (/^\s*$/.test(l)) continue;
    const m = l.match(/^(#{1,6})\s+(.*\S)\s*$/);
    if (m) return { ok: false, why: `opens on the heading "${m[2].replace(/\*\*/g, '').trim()}"` };
    if (/^\s*(>|[-*+]\s|\|)/.test(l)) return { ok: false, why: `opens on "${l.trim().slice(0, 48)}"` };
    return { ok: true };
  }
  return { ok: false, why: 'nothing under the title' };
}

const NUMBERED = /^\(?\d+[a-z]?\)?\s*([.):—–-]|$)/;
const MACHINERY = [
  { what: 'an artifact code',  re: /\b(A1[0-5]|A[1-9]b?|S[1-3])\b/ },
  { what: 'a gate name',       re: /\b([QG][1-7][ab]?)\b/ },
  { what: 'a check id',        re: /\bC\d{1,3}\b/ },
  { what: 'a stage number',    re: /\bstage\s+\d\b/i },
  { what: 'the run identifier', re: null },
];

export function headingFaults(headings, runId = '', lang = 'en') {
  const faults = [];
  const closing = CLOSING.find(c => c.id === 'how_produced');
  const home = inLanguage(closing, lang);
  const names = new Set([home, closing.heading].map(fold));
  const closingLine = (() => {
    const h = headings.find(x => x.level === 2 && names.has(fold(x.text)));
    return h ? h.line : Infinity;
  })();
  for (const h of headings) {
    if (h.level === 1) continue;
    if (h.line >= closingLine) continue;
    if (NUMBERED.test(h.text))
      faults.push(`"${h.text}" is numbered — a heading names the subject, and the number is a second ordering nobody maintains`);
    for (const m of MACHINERY) {
      if (m.re && m.re.test(h.text))
        faults.push(`"${h.text}" carries ${m.what} — it belongs in "${home}" and nowhere above it`);
    }
    if (runId && h.text.includes(runId))
      faults.push(`"${h.text}" carries the run identifier — it belongs in "${home}" and nowhere above it`);
  }
  return faults;
}

export const SECTION_CS = {
  "The outcome we want": "Cílový stav",
  "Who this is for": "Pro koho to je",
  "Why now": "Proč právě teď",
  "What success looks like": "Jak poznáme úspěch",
  "What is in scope, and what is not": "Co je v rozsahu a co ne",
  "What the material says": "Co materiál říká",
  "Where it came from": "Odkud pochází",
  "What we are solving first": "Co řešíme nejdřív",
  "What comes after": "Co následuje",
  "What we are not solving now": "Co teď neřešíme",
  "How we decided the order": "Jak jsme určili pořadí",
  "The market we looked at": "Trh, který jsme zkoumali",
  "Where the market is moving": "Kam se trh posouvá",
  "Who is in it": "Kdo na něm působí",
  "Who we looked at closely, and why": "Koho jsme zkoumali podrobně a proč",
  "Evidence table": "Přehled zjištění",
  "Verdict": "Závěr",
  "What was selected": "Co bylo vybráno",
  "What it solves": "Co to řeší",
  "Why this one": "Proč právě toto",
  "What they offer": "Co nabízejí",
  "What stands out": "Čím se liší",
  "Where the journey stops": "Kde cesta končí",
  "What it costs": "Co to stojí",
  "Confirmed not to do": "Potvrzeno, že nedělají",
  "Diagnosis": "Diagnóza",
  "Parity": "Parita",
  "The opening": "Příležitost",
  "Risk": "Riziko",
  "What it does": "Co to dělá",
  "Who it is for": "Komu to je",
  "Why this bank": "Proč zrovna tahle banka",
  "Inspired by": "Co nás k tomu přivedlo",
  "How it does it": "Jak to dělá",
  "The problem it solves, and for whom": "Jaký problém řeší a komu",
  "Opportunities it is built on": "Příležitosti, na kterých staví",
  "Against the market": "Vůči trhu",
  "Strategic alignment": "Soulad se strategií",
  "Compliance": "Compliance",
  "What it does not address": "Co to neřeší",
  "What this carries into the next stage": "Co přechází do další fáze",
  "What it is": "Co to je",
  "How it works": "Jak to funguje",
  "What the pilot tests": "Co pilot ověřuje",
  "What it means for the strategy": "Co to znamená pro strategii",
  "What has to be handled": "Co je potřeba ošetřit",
  "What the requirement stage needs": "Co potřebuje fáze požadavků",
  "The comparison": "Srovnání",
  "How to choose between them": "Jak mezi nimi vybrat",
  "Later, beyond the brief's horizon": "Později, za horizontem zadání",
};

export const DOC_SKELETONS = {
  A1: { name: 'Brief', cs: 'Zadání iniciativy', at: '§3.1', sections: [
    'The outcome we want', 'Who this is for', 'Why now', 'What success looks like',
    'What is in scope, and what is not'] },

  A2b: { name: 'Intake record', cs: 'Záznam o převzatém materiálu', at: '§3.2', sections: [
    'What the material says', 'Where it came from'] },

  A4: { name: 'Prioritised opportunities', cs: 'Seřazené příležitosti', at: '§3.4', sections: [
    'What we are solving first', 'What comes after', 'What we are not solving now',
    'How we decided the order'] },

  A5: { name: 'Landscape map', cs: 'Mapa trhu', at: '§3.5', sections: [
    'The market we looked at', 'Where the market is moving', 'Who is in it',
    'Who we looked at closely, and why'] },

  A9: { name: 'Selected solution', cs: 'Vybrané řešení', at: '§3.9', sections: [
    'What was selected', 'What it solves', 'Why this one', 'What it does not address',
    'What this carries into the next stage'] },

  A7: { name: 'Competitive synthesis', cs: 'Syntéza trhu', at: '§3.7, restating Competitive Analysis Standards §4.0 and §4.2a',
        sections: ['Evidence table', 'Verdict'] },

  A11: { name: 'Expanded pilot', cs: 'Rozpracovaný pilot', at: '§3.9', sections: [
    'What it is', 'How it works', 'What the pilot tests', 'What it means for the strategy',
    'What has to be handled', 'What the requirement stage needs'] },
};

export const DOC_NAMES = {
  A2:  { name: 'Problem material',     cs: 'Podklady k problému' },
  A3:  { name: 'Problem hypotheses',   cs: 'Hypotézy o problému' },
  A3b: { name: 'Framed opportunities', cs: 'Formulované příležitosti' },
  A6:  { name: 'Competitor cards',     cs: 'Karty konkurentů' },
  A8:  { name: 'Solution set',         cs: 'Návrhy řešení' },
  A10: { name: 'MVP options',          cs: 'Možnosti MVP' },
  A12: { name: 'PRD draft',            cs: 'Návrh PRD' },
  A13: { name: 'Agreed PRD',           cs: 'Odsouhlasené PRD' },
  A14: { name: 'Initiative',           cs: 'Iniciativa' },
};
export function docName(id, lang = 'en') {
  const row = DOC_SKELETONS[id] || DOC_NAMES[id];
  if (!row) return id;
  return lang === 'cs' && row.cs ? row.cs : row.name;
}
export function docPhrase(id) {
  const n = docName(id);
  if (n === id) return String(id);
  return `the ${/^[A-Z][a-z]/.test(n) ? n[0].toLowerCase() + n.slice(1) : n}`;
}

export const OPENING_OPEN = '<!-- opening -->';
export const OPENING_CLOSE = '<!-- /opening -->';
export const OPENING_LEADS = {
  carried: { heading: 'Carried from the stage before:', cs: 'Převzato z předchozí fáze:' },
  changed: { heading: 'Changed by you since the brief:', cs: 'Co jste změnili od zadání:' },
  judge:   { heading: 'For you to judge:',              cs: 'K vašemu posouzení:' },
};
export const BLOCK_STAGES = [1, 2, 4, 5, 6, 7];
export const BLOCK_KINDS = ['A2b', 'A3', 'A3b', 'A4', 'A8', 'A10', 'A11', 'A12', 'A13'];
export const JUDGE_FILL = '[[fill: two to four lines, each naming one thing the person decides here and the section where they will find it]]';

export function openingBlock({ carried = [], changed = [], judge = [JUDGE_FILL], lang = 'en' } = {}) {
  const lead = k => `**${inLanguage(OPENING_LEADS[k], lang)}**`;
  const out = [OPENING_OPEN];
  if (carried.length) out.push(lead('carried'), '', ...carried.map(f => `- ${f.label}: ${f.value}`), '');
  if (changed.length) out.push(lead('changed'), '', ...changed.map(changeLine(lang)), '');
  out.push(lead('judge'), '', ...judge, OPENING_CLOSE);
  return out;
}
export const changeLine = lang => ch => {
  const d = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(ch.at || ''));
  const MON = { en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] };
  const when = d ? (lang === 'cs' ? `${Number(d[3])}. ${Number(d[2])}.` : `${Number(d[3])} ${MON.en[Number(d[2]) - 1]}`) : String(ch.at || '');
  return `- ${lang === 'cs' ? 'fáze' : 'stage'} ${ch.stage}${when ? `, ${when}` : ''}: ${String(ch.what || '').trim()}`;
};

export function judgeBlock(body, lang = 'en') {
  const at = openingAt(body);
  if (!at) return [];
  const lines = String(body || '').split('\n').slice(at.from + 1, at.to);
  const lead = `**${inLanguage(OPENING_LEADS.judge, lang)}**`;
  const i = lines.findIndex(l => l.trim() === lead);
  if (i === -1) return [];
  const leads = Object.values(OPENING_LEADS).flatMap(x => [x.heading, x.cs]).map(x => `**${x}**`);
  const out = [];
  for (const l of lines.slice(i + 1)) { if (leads.includes(l.trim())) break; if (l.trim()) out.push(l.trim()); }
  return out;
}
export const OPENING_FROM = '0.10';

export function openingAt(body) {
  const lines = String(body || '').split('\n');
  const from = lines.findIndex(l => l.trim() === OPENING_OPEN);
  if (from === -1) return null;
  const to = lines.findIndex((l, i) => i > from && l.trim() === OPENING_CLOSE);
  return to === -1 ? null : { from, to };
}

export const CARD_SECTIONS = [
  'What they offer', 'What stands out', 'Where the journey stops', 'What it costs',
  'Confirmed not to do',
];

export const SECTION_EN = {
  ...Object.fromEntries(Object.entries(SECTION_CS).map(([en, cs]) => [cs, en])),
};

export const sectionsIn = (sections, lang) =>
  lang === 'cs' ? sections.map(n => SECTION_CS[n] || n)
                : sections.map(n => SECTION_EN[n] || n);

export function sectionReport(headings, sections) {
  const tops = headings.filter(h => h.level === 2).map(h => fold(h.text));
  const missing = sections.filter(s => !tops.includes(fold(s)));
  const present = sections.filter(s => tops.includes(fold(s)));
  const order = present.map(s => tops.indexOf(fold(s)));
  const misordered = order.some((v, i) => i > 0 && v < order[i - 1]);
  const found = present.slice().sort((a, b) => tops.indexOf(fold(a)) - tops.indexOf(fold(b)));
  return { missing, misordered, expected: sections, found };
}

export function cardReport(headings, names, lang = 'en') {
  const tops = headings.filter(h => h.level === 2);
  const out = [];
  for (const name of names) {
    const i = tops.findIndex(h => fold(h.text).includes(fold(name)) || fold(name).includes(fold(h.text)));
    if (i === -1) { out.push({ name, absent: true, missing: [] }); continue; }
    const from = tops[i].line;
    const to = i + 1 < tops.length ? tops[i + 1].line : Infinity;
    const inside = headings.filter(h => h.level > 2 && h.line > from && h.line < to).map(h => fold(h.text));
    const wanted = sectionsIn(CARD_SECTIONS, lang);
    const missing = wanted.filter(s => !inside.some(t => t.includes(fold(s)) || fold(s).includes(t)));
    out.push({ name, absent: false, missing });
  }
  return out;
}

const namesOf = row => [row.id, row.heading, row.en, row.cs, ...(row.was || [])].filter(Boolean);

export const sectionName = (row, lang) => (lang === 'cs' ? (row.cs || row.heading) : (row.en || row.heading));

export const headingSet = (template, lang) =>
  template.map(r => ({ id: r.id, level: r.level, container: !!r.container, name: sectionName(r, lang) }));

export const withClosing = template =>
  [...template, ...CLOSING.map(c => ({ id: c.id, level: 2, heading: c.heading, cs: c.cs, optional: true }))];

export function headingKeys(template) {
  const keys = new Map();
  for (const r of template)
    for (const n of namesOf(r)) {
      const k = fold(n);
      if (!keys.has(k)) keys.set(k, new Set());
      keys.get(k).add(r.id);
    }
  return keys;
}

export function sectionHeadings(headings, template) {
  const keys = headingKeys(template);
  const rowOf = h => {
    const ids = keys.get(fold(h.text));
    return ids && ids.size === 1 ? template.find(r => r.id === [...ids][0]) : null;
  };
  const out = [];
  let underContainer = false;
  for (const h of headings) {
    if (h.level === 1) { underContainer = false; continue; }
    if (h.level === 2) {
      const row = rowOf(h);
      underContainer = !!(row && row.container);
      out.push({ ...h, row });
    } else if (h.level === 3 && underContainer) out.push({ ...h, row: rowOf(h) });
  }
  return out;
}

export function rewriteHeadings(body, template, lang, { unlisted = 'refused' } = {}) {
  const expected = headingSet(template.filter(r => !r.optional), lang);
  const found = sectionHeadings(headingsOf(body), template);
  const refused = [];
  const kept = [];
  const seen = new Set();
  let furthest = -1;
  for (const h of found) {
    if (!h.row) {
      const open = template.find(r => r.id === 'otevrene_otazky');
      const closing = open && CLOSING.some(c => [c.heading, c.cs].some(n => fold(n) === fold(h.text)));
      const why = closing
        ? `is one of the two closing sections other documents carry; the initiative's sections are its template's, so what it says goes in the open-questions section, "${sectionName(open, lang)}"`
        : 'is not a section of the template';
      (unlisted === 'kept' ? kept : refused).push({ line: h.line, text: h.text, why });
      continue;
    }
    const name = sectionName(h.row, lang);
    if (seen.has(h.row.id)) { refused.push({ line: h.line, text: h.text, why: `is "${name}" a second time` }); continue; }
    seen.add(h.row.id);
    if (h.level !== h.row.level)
      refused.push({ line: h.line, text: h.text, why: `is written at level ${h.level}, and "${name}" is a level ${h.row.level} heading` });
    if (h.row.optional) continue;
    const at = template.indexOf(h.row);
    if (at < furthest)
      refused.push({ line: h.line, text: h.text, why: `is out of order: "${name}" comes before "${sectionName(template[furthest], lang)}"` });
    furthest = Math.max(furthest, at);
  }
  for (const r of template)
    if (!r.optional && !seen.has(r.id)) refused.push({ missing: sectionName(r, lang) });
  if (refused.length) return { refused: refused.some(x => x.missing) ? [...refused, ...kept] : refused, expected };

  const lines = String(body).split('\n');
  const changes = [];
  for (const h of found) {
    if (!h.row) continue;
    const i = h.line - 1;
    const eol = lines[i].endsWith('\r') ? '\r' : '';
    const from = lines[i].slice(0, lines[i].length - eol.length);
    const to = `${'#'.repeat(h.row.level)} ${sectionName(h.row, lang)}`;
    if (from !== to) { changes.push({ line: h.line, from, to }); lines[i] = to + eol; }
  }
  return { body: changes.length ? lines.join('\n') : body, changes, expected };
}

export function underStandards(runState, stageId, body, from) {
  const stages = Array.isArray(runState && runState.stages) ? runState.stages : [];
  const st = stages.find(s => Number(s.id) === Number(stageId));
  const list = Array.isArray(st && st.know_how) ? st.know_how : [];
  const entry = list.map(String).find(e => e.startsWith(`${body}@`));
  if (!entry) return null;
  const v = entry.split('@')[1];
  const parts = s => String(s).split('.').map(Number);
  const [a, b] = [parts(v), parts(from)];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] || 0) - (b[i] || 0);
    if (d) return d > 0 ? v : null;
  }
  return v;
}

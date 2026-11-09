#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sources } from './know-how.mjs';

export const SPEC = join('specifications', 'PILOT-BUSINESS-LOGIC.md');
export const KH = join('specifications', 'definitions', 'know-how');
export const OUT = join('.github', 'artifact-fields.yaml');

export function declaredIn(body) {
  const out = new Set();
  const bullets = [];
  for (const line of body.split('\n')) {
    if (/^\s*- /.test(line)) bullets.push(line);
    else if (bullets.length && /^\s+\S/.test(line)) bullets[bullets.length - 1] += ' ' + line.trim();
    else bullets.push('');
  }
  const take = raw0 => {
    const raw = String(raw0 || '').replace(/\[\]$/, '').trim();
    if (!/^[A-Za-z_][\w.]*$/.test(raw)) return;
    out.add(raw);
    if (raw.includes('.')) out.add(raw.slice(raw.lastIndexOf('.') + 1));
  };
  for (const line of bullets) {
    if (!/^\s*- (?:\*\*)?`/.test(line)) continue;
    take((line.match(/`([^`]+)`/) || [])[1]);
    for (const b of line.matchAll(/\*\*([\s\S]+?)\*\*/g))
      for (const t of b[1].matchAll(/`([^`]+)`/g)) take(t[1]);
    for (const g of line.matchAll(/`\{([^`}]+)\}`/g)) for (const n of g[1].split(',')) take(n);
  }
  return out;
}

function bulletsOf(body) {
  const out = [];
  for (const line of body.split('\n')) {
    if (/^\s*- /.test(line)) out.push({ indent: line.match(/^\s*/)[0].length, text: line });
    else if (out.length && out[out.length - 1] && /^\s+\S/.test(line)) out[out.length - 1].text += ' ' + line.trim();
    else out.push(null);
  }
  return out.filter(Boolean);
}

const MARKERS = new Set(['O']);
const nameTokens = text => [...text.matchAll(/`([^`]+)`/g)]
  .map(m => m[1].trim())
  .filter(t => /^[A-Za-z_][\w.]*(?:\[\])?$/.test(t) && !MARKERS.has(t));

export function valueLists(body) {
  const bs = bulletsOf(body);
  const out = new Set();
  for (let i = 0; i < bs.length; i++) {
    if (!/^\s*- (?:\*\*)?`/.test(bs[i].text)) continue;
    const toks = nameTokens(bs[i].text);
    if (!toks.length || !toks[0].endsWith('[]')) continue;
    let declared = toks.length > 1;
    for (let j = i + 1; j < bs.length && bs[j].indent > bs[i].indent; j++)
      if (nameTokens(bs[j].text).length) declared = true;
    if (!declared) out.add(toks[0].slice(0, -2));
  }
  return out;
}

export function registerOf(spec) {
  const table = spec.slice(spec.indexOf('<!-- REGISTER-TABLE -->'), spec.indexOf('<!-- /REGISTER-TABLE -->'));
  const out = {};
  for (const line of table.split('\n')) {
    const cells = line.split('|').map(c => c.trim().replace(/\*\*/g, ''));
    if (cells.length < 10 || !/^A\d+[a-z]?$/.test(cells[1])) continue;
    const ost = cells[5].replace(/\*/g, '').trim();
    out[cells[1]] = { gate: cells[8], ost: ost === '—' ? 'none' : ost, produced: cells[3] };
  }
  return out;
}

export function envelopeSplit(spec) {
  const s60 = spec.slice(spec.indexOf('### 6.0 '), spec.indexOf('### 6.1 '));
  const group = re => {
    const b = bulletsOf(s60).find(x => re.test(x.text));
    return new Set(b ? nameTokens(b.text).map(t => t.replace(/\[\]$/, '')) : []);
  };
  const recordOnly = group(/\*\*On the record only\*\*/);
  const outputOnly = group(/\*\*On the output only\*\*/);
  const both = group(/\*\*On both, and it is not duplication\*\*/);
  const union = (...sets) => new Set(sets.flatMap(x => [...x]));
  const recordOwn = union(group(/\*\*`record_id`\*\*/), group(/\*\*`item_id`\*\*/));
  const assembly  = union(group(/\*\*`assembled_at`\*\*/), group(/\*\*`assembled_from(\[\])?`\*\*/));
  for (const n of recordOwn) assembly.delete(n);
  const prose = name => {
    const open = new RegExp('^\\s*- \\*\\*`' + name + '`\\*\\*\\s*—\\s*([\\s\\S]+)');
    const b = bulletsOf(s60).find(x => open.test(x.text));
    if (!b) return '';
    return b.text.match(open)[1]
      .replace(/\*\*/g, '').replace(/\s+/g, ' ').split(/\.\s/)[0].replace(/\.$/, '').trim();
  };
  return {
    recordOnly, outputOnly, both, recordOwn, assembly,
    form: { record_id: prose('record_id'), item_id: prose('item_id') },
  };
}

export function shapeOf(body) {
  const bs = bulletsOf(body);
  const retired = i => /written by no producer from/.test(bs[i].text);
  const declaring = i => /^\s*- (?:\*\*)?`/.test(bs[i].text) && nameTokens(bs[i].text).length > 0;
  const leaf = n => ({ name: n.replace(/\[\]$/, ''), list: /\[\]$/.test(n), entries: [] });
  const add = (into, node) => {
    const already = into.find(x => x.name === node.name);
    if (!already) { into.push(node); return; }
    if (node.list) already.list = true;
    for (const c of node.entries) if (!already.entries.some(x => x.name === c.name)) already.entries.push(c);
  };
  const nodeOf = (i, isTop) => {
    const names = nameTokens(bs[i].text);
    const node = leaf(names[0]);
    if (retired(i)) node.retired = true;
    node.list = /\[\]$/.test(names[0]) || /\*\*`[^`]+`\*\*` ?\[\]|`\[\]`/.test(bs[i].text);
    if (!isTop && !node.list) return node;
    const boldSet = new Set([...bs[i].text.matchAll(/\*\*`([^`]+)`\*\*/g)].map(m => m[1].trim()));
    for (const n of names.slice(1)) {
      if (!boldSet.has(n)) continue;
      const bare = n.replace(/\[\]$/, '');
      if (`${bare}s` === node.name) { node.singular = bare; continue; }
      if (bare !== node.name) add(node.entries, leaf(n));
    }
    return node;
  };
  const childrenOf = (i, end) => {
    const idx = [];
    for (let j = i + 1; j < end; j++) if (declaring(j)) idx.push(j);
    if (!idx.length) return [];
    const indent = Math.min(...idx.map(j => bs[j].indent));
    const out = [];
    for (const j of idx) {
      if (bs[j].indent !== indent) continue;
      let k = j + 1;
      while (k < end && bs[k].indent > indent) k++;
      const node = nodeOf(j, false);
      for (const c of childrenOf(j, k)) add(node.entries, c);
      add(out, node);
      const boldHere = new Set([...bs[j].text.matchAll(/\*\*([\s\S]+?)\*\*/g)]
        .flatMap(b => [...b[1].matchAll(/`([^`]+)`/g)].map(t => t[1].trim())));
      for (const n of nameTokens(bs[j].text).slice(1))
        if (boldHere.has(n) && !node.entries.some(x => x.name === n.replace(/\[\]$/, ''))) add(out, leaf(n));
    }
    return out;
  };
  const top = [];
  for (let i = 0; i < bs.length; i++) {
    if (!declaring(i) || bs[i].indent > 0) continue;
    let k = i + 1;
    while (k < bs.length && bs[k].indent > 0) k++;
    const node = nodeOf(i, true);
    for (const c of childrenOf(i, k)) add(node.entries, c);
    add(top, node);
  }
  const names = new Set(top.map(t => t.name));
  const prune = nodes => {
    const kept = nodes.filter(e => !names.has(e.name));
    for (const n of kept) n.entries = prune(n.entries);
    return kept;
  };
  for (const t of top) t.entries = prune(t.entries);

  const DELEG = /^\s*- \*\*`(…[^`]+)`\*\*\s*—\s*([\s\S]+)/;
  const findNode = (nodes, want) => nodes.find(n => n.name === want)
    || nodes.reduce((hit, n) => hit || findNode(n.entries, want), null);
  const bold = i => new Set([...bs[i].text.matchAll(/\*\*`([^`]+)`\*\*/g)]
    .map(m => m[1].replace(/\[\]$/, '').trim()));
  for (let i = 0; i < bs.length; i++) {
    const m = bs[i].text.match(DELEG);
    if (!m) continue;
    const tail = m[2].replace(/\*\*/g, '').replace(/`/g, '').replace(/\s+/g, ' ')
      .split(/\.\s/)[0].replace(/[,.:]$/, '').trim();
    const note = `${m[1]} — ${tail}`;
    const own = (nameTokens(bs[i].text)[0] || '').replace(/\[\]$/, '');
    let owner = own && bold(i).has(own) ? own : '';
    if (!owner) for (let j = i - 1; j >= 0; j--)
      if (declaring(j) && bs[j].indent < bs[i].indent) {
        owner = (nameTokens(bs[j].text)[0] || '').replace(/\[\]$/, ''); break;
      }
    const host = owner ? findNode(top, owner) : null;
    if (host) host.delegation = note;
    else top.push({ name: null, list: false, entries: [], delegation: note });
  }
  return top;
}

export function schemas() {
  const spec = readFileSync(SPEC, 'utf8');
  const envelopeBody = spec.slice(spec.indexOf('**Envelope** — carried by'), spec.indexOf('### 6.1 Register'));
  const decisionBody = spec.slice(spec.indexOf('#### Decision records'), spec.indexOf('### 7.6'));
  const envelope = declaredIn(envelopeBody);
  const decision = declaredIn(decisionBody);
  const lists = { envelope: valueLists(envelopeBody), decision: valueLists(decisionBody) };
  const register = registerOf(spec);

  const khFields = new Set();
  if (existsSync(KH))
    for (const f of sources()) for (const n of declaredIn(readFileSync(join(KH, f), 'utf8'))) khFields.add(n);

  const sections = [...spec.matchAll(/^### 6\.\d+[a-z]? (A\d+[a-z]?)(?=[\s·])[^\n]*$/gm)];
  const heads = [...spec.matchAll(/^### 6\.\d+[a-z]? /gm)].map(h => h.index);
  const artifacts = {};
  const shapes = {};
  for (let i = 0; i < sections.length; i++) {
    const end = heads.find(h => h > sections[i].index) ?? spec.length;
    const body = spec.slice(sections[i].index, end);
    const set = declaredIn(body);
    artifacts[sections[i][1]] = set;
    lists[sections[i][1]] = valueLists(body);
    shapes[sections[i][1]] = shapeOf(body);
    const paired = sections[i][0].match(/→ (A\d+)/);
    if (paired) {
      artifacts[paired[1]] = set; lists[paired[1]] = lists[sections[i][1]];
      shapes[paired[1]] = shapes[sections[i][1]];
    }
  }
  return { envelope, decision, khFields, artifacts, lists, register, split: envelopeSplit(spec), shapes };
}

const RECORD_NOTES = {
  A1: { north_star: 'older briefs carry it as a level above product_goal; the product goal is now the North Star, so a brief written now leaves it out' },
  A6: { unprofiled: 'every entry goes in ONE list, on the A6 record numbered r01; every other A6 record writes unprofiled: []' },
};

function skeleton(id, split, shape, vl, gate) {
  const q = n => `${n}:`;
  const line = (n, v = '') => `    ${q(n)}${v ? ' ' + v : ''}`;
  const L = [];
  L.push('    # THE RECORD — one production. The workflow writes it as a frame from here; only the brief\'s is copied by hand.');
  L.push('    # Every value goes on ONE line — quote it if it carries a colon or a hash.');
  L.push('    # Inside double quotes, write a quote as `\\"` and a backslash as `\\\\`.');
  L.push("    # The `|` that opens this block is the carrier's packaging; a `|` or `>` inside a run file is refused.");
  const F = (split.form || {});
  for (const n of ['run_id', 'record_id', 'artifact_id'])
    L.push(line(n, n === 'record_id' && F.record_id ? `                  # ${F.record_id}` : ''));
  L.push(line('item_id', `""            # ${F.item_id || 'what this record carries where the step ran once per item'}; "" otherwise`));
  const RB = /_basis$/;
  for (const n of [...split.recordOnly])
    L.push(line(n, RB.test(n) ? '                 # per-production reduction marker: only where THIS production took it; omit otherwise'
      : n.endsWith('_hit') || n.endsWith('_id') ? '[]' : ''));
  for (const n of [...split.both]) L.push(line(n, '[]'));
  L.push('    # `produced_by` is NOT here. §6.0 puts it on the output, because it is one value for the');
  L.push('    # whole document however many productions stand behind it.');
  L.push('    # then the content fields below, which are what a gate decides');
  const parents = new Set(shape.map(f => f.name).filter(Boolean));
  const leaves = new Map();
  for (const f of shape) {
    if (!f.name) continue;
    const dot = f.name.lastIndexOf('.');
    if (dot < 0 || !parents.has(f.name.slice(0, dot))) continue;
    const parent = f.name.slice(0, dot);
    if (!leaves.has(parent)) leaves.set(parent, []);
    leaves.get(parent).push(f.name.slice(dot + 1));
  }
  const deleg = (f, pad) => { if (f.delegation) L.push(`${pad}# NOT THE WHOLE SET — ${f.delegation}`); };
  const note = n => ((RECORD_NOTES[id] || {})[n] ? `                # ${RECORD_NOTES[id][n]}` : '');
  const emit = (f, pad, isTop) => {
    if (f.retired) return;
    if (!f.name) { deleg(f, pad); return; }
    if (!f.list) {
      L.push(`${pad}${f.name}:${note(f.name)}`);
      deleg(f, pad + '  ');
      if (isTop) { for (const lf of leaves.get(f.name) || []) L.push(`${pad}  ${lf}:`); return; }
      for (const c of f.entries) emit(c, pad + '  ', false);
      return;
    }
    if (!f.entries.length || (isTop && vl && vl.has(f.name))) {
      L.push(isTop ? line(f.name, `[]            # entries are values, not objects`) : `${pad}${f.name}:`);
      deleg(f, pad + '  ');
      return;
    }
    if (isTop && f.singular) {
      L.push(`${pad}${f.singular}:                # SINGULAR on the record. §6.0: the fold assembles these into \`${f.name}[]\` on the output`);
      for (const c of f.entries) emit(c, pad + '  ', false);
      deleg(f, pad + '  ');
      return;
    }
    L.push(`${pad}${f.name}:${note(f.name)}`);
    const at = L.length;
    for (const c of f.entries) emit(c, pad + '    ', false);
    L[at] = L[at].slice(0, pad.length) + '  - ' + L[at].slice(pad.length + 4);
    deleg(f, pad + '    ');
  };
  for (const f of shape) {
    if (!f.name) { emit(f, '    ', true); continue; }
    const dot = f.name.lastIndexOf('.');
    if (dot >= 0 && parents.has(f.name.slice(0, dot))) continue;
    emit(f, '    ', true);
  }
  L.push('');
  L.push('    # THE OUTPUT — the document a person reads. No production field belongs here.');
  if (id === 'A9') {
    L.push('    #');
    L.push('    # **This document is written by the workflow when stage 4 is approved, every section of it,');
    L.push('    # and no agent writes it.** Why this one is copied from the choice the person recorded with');
    L.push('    # SPOCK: record a decision I made; the chosen solution is carried from its part by');
    L.push('    # solution-join.mjs.');
  }
  for (const n of ['run_id', 'artifact_id', 'ost_role', 'status']) L.push(line(n));
  const MARKER = /_basis$/;
  for (const n of [...split.outputOnly].filter(n => n !== 'produced_by'))
    L.push(line(n, MARKER.test(n) ? '                 # document-level reduction marker: it belongs HERE and never on a record; omit where the reduction was not taken'
      : /_verify$|sources$/.test(n) ? '[]' : ''));
  L.push('    produced_by:');
  L.push('      agent:');
  L.push('      skill:');
  for (const n of [...split.both]) L.push(line(n, '[]'));
  for (const n of [...split.assembly]) L.push(line(n, n === 'assembled_from' ? '[]' : ''));
  if (/^G/.test(gate || '')) {
    L.push('    decision:                     # WRITTEN BY THE ACCEPTANCE, NEVER BY YOU — leave it out entirely');
    L.push('                                  # A person signs and run-state.mjs writes every field below,');
    L.push('                                  # selection included. Writing it yourself, even empty, fails the gate.');
    L.push('      gate:');
    L.push('      by_agent: false             # never anything else');
    L.push('      accepted_by:');
    L.push('        - name:');
    L.push('          role:');
    L.push('      accepted_at:');
    L.push('      changed_during_refinement:  # "none" is a statement; absence is not');
    L.push('      refinements: []');
    if (['G4', 'G5', 'G5a'].includes(gate))
      L.push('      selection:                  # the id chosen, because this gate chooses one of many');
  }
  return L.join('\n');
}

export function entryFieldsOf(shape) {
  const out = new Map();
  const walk = nodes => {
    for (const n of nodes || []) {
      if (!n || !n.name) continue;
      const names = n.entries.map(e => e && e.name).filter(Boolean);
      if (n.list && names.length) out.set(n.name, [...new Set(names)].sort());
      walk(n.entries);
    }
  };
  walk(shape);
  return out;
}

export function render() {
  const { envelope, decision, artifacts, lists, register, split, shapes } = schemas();
  const ids = Object.keys(artifacts).sort((a, b) =>
    (parseInt(a.slice(1)) - parseInt(b.slice(1))) || a.localeCompare(b));

  const block = (set, vl, pad = '    ', ef = null) => {
    let s = `${pad}fields:\n` + [...set].sort().map(f => `${pad}  - ${f}`).join('\n');
    if (vl && vl.size) s += `\n${pad}value_entries:\n` + [...vl].sort().map(f => `${pad}  - ${f}`).join('\n');
    if (ef && ef.size) s += `\n${pad}entry_fields:\n` +
      [...ef.keys()].sort().map(f => `${pad}  ${f}: [${ef.get(f).join(', ')}]`).join('\n');
    return s;
  };

  const skel = id => {
    const r = register[id] || {};
    const sh = shapes[id];
    if (!sh || !split.recordOnly.size || !split.outputOnly.size) return '';
    return `    skeleton: |\n` + skeleton(id, split, sh, lists[id], r.gate)
      .split('\n').map(l => `  ${l}`).join('\n') + '\n';
  };

  const head = id => {
    const r = register[id] || {};
    const g = r.gate;
    const gl = !g || g === '—' ? `    gate: none\n`
      : /^G/.test(g) ? `    gate: ${g}                # DECISION gate — this artifact ALSO carries the \`decision\` fields above\n`
      : `    gate: ${/^Q\d/.test(g) ? g : JSON.stringify(g)}\n`;
    return gl + `    ost_role: ${r.ost || 'none'}\n`;
  };

  return `# GENERATED from §6 of specifications/PILOT-BUSINESS-LOGIC.md. Do not edit this copy.
#   Regenerate: node .github/scripts/artifact-fields.mjs --write
#
# **The field names of the artifact you write.** Use these and no others. Do not invent a name that reads
# reasonably — the shapes an agent infers are reasonable, and four checks failed on three of them in an
# earlier run: \`evidence\` written as objects rather than refs, \`trust_rationale\` for
# \`rationale\`, \`original\` for \`statement\`.
#
# Where §6 delegates a set to a know-how body — the initiative's sections, the PRD's — the body is the
# source and the field is listed here as the delegation marker §6 uses.
#
# \`envelope\` is carried by EVERY artifact in addition to its own set.
#
# **\`gate\` says which gate the artifact carries**, from the §6.1 register. Where it is a \`G\` gate the
# artifact ALSO carries the \`decision\` fields below, under \`decision:\` on the artifact itself. §7.5's
# names are the ones to use — \`accepted_by\` and \`accepted_at\`, never \`decided_by\` or \`decided_at\`. No
# agent records a human decision; \`by_agent\` is always \`false\`.
#
# **\`value_entries\` lists the \`[]\` fields whose entries §6 declares no fields for.** Write each of those
# entries as a single value — the id or the string the §6 line names — never as an object. A4's \`primary\`
# is the case this exists for: its entries are A3 hypothesis ids, the hypotheses themselves stay in A3
# unchanged, and an agent that wrote them out as whole objects failed six checks.
#
# **\`entry_fields\` is the other half of that claim, and it is the half that was missing.** It names, per
# \`[]\` field, exactly what an entry of it carries. **A list not in either set was a list the carrier said
# nothing at all about**: \`reduced_from\` regenerated byte for byte whether §6 declared its entries or not,
# and three agents inferred three shapes for it across two rounds — a list of objects keyed \`from\`, a list
# keyed \`ref\`, a bare list of refs, and a single object. **C73 reads both directions now**: values written
# where an entry set is declared fails, and objects written where \`value_entries\` says otherwise fails, and
# a committed run is what decides either way.
#
# **The frontmatter parser is a small YAML subset and it REFUSES block and folded scalars.** A value
# opening with \`>\` or \`|\` is rejected, and the whole artifact fails to parse — every gate result for the
# run is suppressed, not just the field. Write long values as ordinary quoted scalars instead; length is
# not the problem, the folded form is.
#
# **Two producers have now hit this and neither was told.** The investor run recorded it on 13 August as a
# specification gap in these words: *nothing tells a producer the artifact parser rejects folded YAML*.
# It was left open, and the card-disputes landscape map hit it on 17 August with 13 folded values — a
# clean refusal, no gate results, on an artifact whose research was sound. **Nothing about the rule
# changed between those two dates. What was missing was this paragraph.**
#
# **Where your artifact carries N items, write the file one item per write. Never in one generation.**
# Create it with the envelope and the first item, then append the rest one at a time. **A write that
# exceeds the output ceiling produces nothing at all** — not a truncated file, nothing — while the inputs
# stay on disk, so it reads as work in progress and gets reported as complete. Measured 17 August: the
# competitor cards took 3 attempts at a single generation and wrote 0 bytes, then landed in 8 incremental
# writes; the idea set took 2 attempts and 0 bytes, then landed in 12 writes with 12 landing.
#
# **Then read the file back and confirm it is well formed before reporting, against the check's terms and
# not your intent.** Two steps that day reported complete on artifacts the gate could not parse.

envelope:
${block(envelope, lists.envelope, '  ')}

decision:
${block(decision, lists.decision, '  ')}

artifacts:
${ids.map(id => `  ${id}:\n${head(id)}${block(artifacts[id], lists[id], '    ', entryFieldsOf(shapes[id]))}\n${skel(id)}`).join('\n')}
`;
}

export function drift() {
  if (!existsSync(OUT)) return `${OUT} is not on disk — the carrier is generated and must be committed`;
  return workflowText(OUT) === render() ? null
    : `${OUT} is not what the generator produces — regenerate with \`node .github/scripts/artifact-fields.mjs --write\``;
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  if (argv.includes('--write')) {
    writeFileSync(OUT, render());
    const { artifacts } = schemas();
    console.log(`wrote ${OUT} — ${Object.keys(artifacts).length} artifact schemas`);
  } else if (argv[0] && /^A\d+[a-z]?$/.test(argv[0])) {
    const { envelope, decision, artifacts, lists, register } = schemas();
    const s = artifacts[argv[0]];
    if (!s) { console.error(`§6 declares no schema for ${argv[0]}`); process.exit(2); }
    const r = register[argv[0]] || {};
    console.log(`${argv[0]} — gate ${r.gate || 'none'} · ost_role ${r.ost || 'none'}`);
    console.log(`\nits own fields:\n  ${[...s].sort().join('\n  ')}`);
    const vl = lists[argv[0]];
    if (vl && vl.size)
      console.log(`\nlists whose entries are values, not objects:\n  ${[...vl].sort().join('\n  ')}`);
    console.log(`\nplus the envelope every artifact carries:\n  ${[...envelope].sort().join('\n  ')}`);
    if (/^G/.test(r.gate || ''))
      console.log(`\nand the decision record, because ${r.gate} is a decision gate:\n  ${[...decision].sort().join('\n  ')}`);
  } else process.stdout.write(render());
}

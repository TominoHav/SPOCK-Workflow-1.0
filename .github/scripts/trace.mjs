#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

export const REGISTRY = join('.github', 'registry', 'tracing.yaml');
export const TRACE_DIR = 'traces';

export function declaredSet(file = REGISTRY) {
  if (!existsSync(file)) throw new Error(`${file} does not exist — the attribute set is declared nowhere`);
  const lines = workflowText(file).split('\n');
  const spans = [];
  let cur = null, inKeep = false, open = null;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    const name = line.match(/^ {2}- (?:name|event):\s*(\S+)/);
    if (name) { cur = { name: name[1], keep: [], prefixes: [] }; spans.push(cur); inKeep = false; continue; }
    if (!cur) continue;
    if (/^ {4}keep:\s*$/.test(line)) { inKeep = true; continue; }
    if (/^ {2}\S/.test(line) || /^\S/.test(line)) { cur = null; inKeep = false; continue; }
    if (!inKeep) continue;
    if (open === null && /^ {6}- \{/.test(line)) open = line;
    else if (open !== null) open += ` ${line.trim()}`;
    else continue;
    if ((open.match(/\{/g) || []).length > (open.match(/\}/g) || []).length) continue;
    const whole = open; open = null;

    const entry = whole.match(/^ {6}- \{\s*attribute:\s*"?([^,"]+)"?\s*,(.*)$/);
    if (!entry) continue;
    const attribute = entry[1].trim();
    const rest = entry[2];
    const classification = (rest.match(/classification:\s*([\w_]+)/) || [])[1] || null;
    const derived = /derived:\s*true/.test(rest);
    const prefix = /prefix:\s*true/.test(rest) || attribute.endsWith('*');
    const leaves = (rest.match(/keep_values:\s*\[([^\]]*)\]/) || [])[1];
    if (!classification)
      throw new Error(`${file}: ${cur.name}.${attribute} declares no classification — ` +
        'an attribute whose data class is unestablished is refused rather than kept');
    if (prefix) cur.prefixes.push({
      prefix: attribute.replace(/\*$/, ''),
      classification,
      leaves: leaves ? leaves.split(',').map(x => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean) : null,
    });
    else cur.keep.push({ attribute, classification, derived });
  }
  if (!spans.length) throw new Error(`${file}: no span blocks — nothing declares what a trace may keep`);
  const banned = neverKept(file);
  for (const s of spans) {
    for (const k of s.keep)
      for (const b of banned)
        if (k.attribute === b || k.attribute.startsWith(`${b}.`))
          throw new Error(`${file}: ${s.name} keeps "${k.attribute}", and never_kept names "${b}" — ` +
            'the declared set and the never-kept list contradict each other, and the reduction stops rather than choosing one');
    for (const p of s.prefixes)
      for (const b of banned)
        if (b.startsWith(p.prefix) || p.prefix === b || p.prefix.startsWith(`${b}.`))
          throw new Error(`${file}: ${s.name} keeps the prefix "${p.prefix}*", which would retain "${b}" — ` +
            'never_kept names it, and a prefix wide enough to swallow a never-kept attribute is refused rather than trusted to miss it');
  }
  return spans;
}

export function neverKept(file = REGISTRY) {
  if (!existsSync(file)) throw new Error(`${file} does not exist — the never-kept list is declared nowhere`);
  const out = [];
  let inBlock = false;
  for (const raw of workflowText(file).split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (/^never_kept:\s*$/.test(line)) { inBlock = true; continue; }
    if (!inBlock) continue;
    if (/^\S/.test(line)) break;
    const m = line.match(/^ {2}- "?([^\s"#]+)"?/);
    if (m) out.push(m[1]);
  }
  if (!out.length)
    throw new Error(`${file}: never_kept names nothing — the list that makes an attribute's absence a ` +
      'statement rather than an accident is empty, and the reduction stops rather than running unbounded');
  return out;
}

function valueOf(v) {
  if (v === null || v === undefined) return undefined;
  if (typeof v !== 'object') return v;
  if ('stringValue' in v) return v.stringValue;
  if ('intValue' in v) return Number(v.intValue);
  if ('doubleValue' in v) return Number(v.doubleValue);
  if ('boolValue' in v) return v.boolValue;
  return undefined;
}

function attributesOf(span) {
  const out = {};
  const a = span.attributes;
  if (Array.isArray(a)) for (const kv of a) { const v = valueOf(kv.value); if (v !== undefined) out[kv.key] = v; }
  else if (a && typeof a === 'object') for (const [k, v] of Object.entries(a)) {
    const val = valueOf(v); if (val !== undefined) out[k] = val;
  }
  return out;
}

const nanos = v => (v === undefined || v === null ? null : Number(v));

export function readSpans(file) {
  const text = workflowText(file);
  const out = [];
  const skipped = { metrics: 0, empty: 0 };
  let n = 0;
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    n++;
    let obj;
    try { obj = JSON.parse(t); }
    catch { throw new Error(`${file}: line ${n} is not JSON — the file exporter writes one JSON object per line`); }
    if (Array.isArray(obj.resourceSpans)) {
      for (const rs of obj.resourceSpans)
        for (const ss of rs.scopeSpans || rs.instrumentationLibrarySpans || [])
          for (const s of ss.spans || []) out.push(s);
      continue;
    }
    if (obj.name && (obj.traceId || obj.trace_id)) { out.push(obj); continue; }
    if (obj.attributes && obj.attributes['event.name']) {
      const a = obj.attributes;
      out.push({
        name: String(a['event.name']),
        traceId: (obj.spanContext && obj.spanContext.traceId) || a['session.id'] || 'unattributed',
        spanId: obj.spanContext && obj.spanContext.spanId,
        attributes: a,
        startTimeUnixNano: Array.isArray(obj.hrTime) ? obj.hrTime : undefined,
      });
      continue;
    }
    if (Array.isArray(obj.scopeMetrics) || obj.resourceMetrics) { skipped.metrics++; continue; }
    if (!Object.keys(obj).length) { skipped.empty++; continue; }
    throw new Error(`${file}: line ${n} is none of the four shapes this reducer knows — span, resourceSpans ` +
      'batch, log record, metric batch — and it refuses a shape it does not recognise rather than half-reading it');
  }
  out.skipped = skipped;
  return out;
}

export function reduce(spans, set = declaredSet()) {
  const byName = new Map(set.map(s => [s.name, s]));
  const traces = new Map();
  let droppedAttrs = 0, droppedSpans = 0;

  for (const raw of spans) {
    const name = raw.name;
    const decl = byName.get(name);
    const traceId = raw.traceId || raw.trace_id;
    if (!traceId) { droppedSpans++; continue; }
    if (!decl) { droppedSpans++; continue; }

    const attrs = attributesOf(raw);
    const kept = {};
    for (const k of decl.keep) {
      if (k.derived) continue;
      if (attrs[k.attribute] !== undefined) kept[k.attribute] = attrs[k.attribute];
    }
    for (const p of decl.prefixes)
      for (const [k, v] of Object.entries(attrs)) {
        if (!k.startsWith(p.prefix)) continue;
        const leaf = k.slice(p.prefix.length);
        kept[k] = (!p.leaves || p.leaves.includes(leaf)) ? v : '[value dropped — not a declared locator]';
      }
    droppedAttrs += Object.keys(attrs).length - Object.keys(kept).length;

    const start = nanos(raw.startTimeUnixNano ?? raw.start_time_unix_nano);
    const end = nanos(raw.endTimeUnixNano ?? raw.end_time_unix_nano);
    if (start !== null && end !== null) kept.duration_ms = Math.round((end - start) / 1e6);

    if (!traces.has(traceId))
      traces.set(traceId, { trace_id: traceId, root: null, chat: [], tools: [], turns: [], spans: 0 });
    const t = traces.get(traceId);
    t.spans++;
    if (name === 'invoke_agent' || name === 'copilot_chat.session.start') t.root = kept;
    else if (name === 'chat' || name === 'gen_ai.client.inference.operation.details') t.chat.push(kept);
    else if (name === 'execute_tool' || name === 'copilot_chat.tool.call') t.tools.push(kept);
    else if (name === 'copilot_chat.agent.turn') t.turns.push(kept);
  }

  return {
    traces: [...traces.values()].map(t => ({
      ...t,
      tool_calls: t.tools.length,
      model_calls: t.chat.length,
      turns: t.turns.length,
      input_tokens: t.chat.reduce((n, x) => n + (Number(x['gen_ai.usage.input_tokens']) || 0), 0),
      output_tokens: t.chat.reduce((n, x) => n + (Number(x['gen_ai.usage.output_tokens']) || 0), 0),
      models_used: [...new Set(t.chat.map(x => x['gen_ai.response.model'] || x['gen_ai.request.model']).filter(Boolean))].sort(),
      tools_used: [...new Set(t.tools.map(x => x['gen_ai.tool.name']).filter(Boolean))].sort(),
    })),
    dropped_spans: droppedSpans,
    dropped_attributes: droppedAttrs,
  };
}

export function journalDeclared(file = REGISTRY) {
  if (!existsSync(file)) throw new Error(`${file} does not exist — the journal set is declared nowhere`);
  const lines = workflowText(file).split('\n');
  const keep = [], never = [];
  let inJournal = false, mode = null;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (/^journal:\s*$/.test(line)) { inJournal = true; mode = null; continue; }
    if (!inJournal) continue;
    if (/^\S/.test(line)) break;
    if (/^ {2}keep:\s*$/.test(line)) { mode = 'keep'; continue; }
    if (/^ {2}never_kept:\s*$/.test(line)) { mode = 'never'; continue; }
    if (/^ {2}\S/.test(line)) { mode = null; continue; }
    if (mode === 'keep') {
      const m = line.match(/^\s*- \{\s*attribute:\s*"?([^,"]+)"?\s*,(.*)$/);
      if (m) keep.push({ attribute: m[1].trim(), classification: (m[2].match(/classification:\s*([\w_]+)/) || [])[1] || null });
    } else if (mode === 'never') {
      const m = line.match(/^\s*- "?([^\s"#]+)"?/);
      if (m) never.push(m[1]);
    }
  }
  if (!keep.length) throw new Error(`${file}: the journal block keeps nothing — a reduction with no declared set is unbounded`);
  if (!never.length) throw new Error(`${file}: the journal block names nothing it never keeps — an absence is then an accident rather than a statement`);
  const both = keep.map(k => k.attribute).filter(a => never.includes(a));
  if (both.length)
    throw new Error(`${file}: the journal block both keeps and never keeps ${both.join(', ')} — ` +
      'the reduction stops rather than choosing which of the two the registry meant');
  return { keep, never };
}

export function reduceJournal(file, session, decl = journalDeclared()) {
  if (!existsSync(file)) throw new Error(`${file} does not exist`);
  const allowed = new Set(decl.keep.map(k => k.attribute));
  const chat = [];
  let lines = 0, dropped = 0, unread = 0;
  for (const raw of workflowText(file).split('\n')) {
    if (!raw.trim()) continue;
    lines++;
    let obj;
    try { obj = JSON.parse(raw); } catch { unread++; continue; }
    const found = [];
    const walk = v => {
      if (!v || typeof v !== 'object') return;
      if (Array.isArray(v)) { v.forEach(walk); return; }
      if (v.requestId !== undefined || v.promptTokens !== undefined || v.copilotCredits !== undefined) found.push(v);
      for (const x of Object.values(v)) walk(x);
    };
    walk(obj);
    for (const r of found) {
      const kept = {};
      for (const [k, v] of Object.entries(r)) {
        if (allowed.has(k)) kept[k] = v;
        else dropped++;
      }
      if (Object.keys(kept).length) chat.push(kept);
    }
  }
  return {
    trace_id: `journal-${session}`,
    source: 'vscode_chat_session',
    chat,
    execute_tool: [],
    model_calls: chat.length,
    tool_calls: 0,
    lines_read: lines,
    lines_unreadable: unread,
    dropped_fields: dropped,
  };
}

export function retain(runDir, reduced, { attributeSetVersion }) {
  const dir = join(runDir, TRACE_DIR);
  mkdirSync(dir, { recursive: true });
  const written = [];
  for (const t of reduced.traces) {
    const rec = {
      trace_id: t.trace_id,
      run: basename(runDir),
      reduced_by: '.github/scripts/trace.mjs',
      attribute_set: `tracing.yaml@${attributeSetVersion}`,
      spans_kept: t.spans,
      model_calls: t.model_calls,
      tool_calls: t.tool_calls,
      tools_used: t.tools_used,
      root: t.root,
      chat: t.chat,
      execute_tool: t.tools,
    };
    const p = join(dir, `${t.trace_id}.json`);
    writeFileSync(p, `${JSON.stringify(rec, null, 2)}\n`);
    written.push(p);
  }
  return written;
}

export function retained(runDir) {
  const dir = join(runDir, TRACE_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''));
}

export function retainedRecords(runDir) {
  const dir = join(runDir, TRACE_DIR);
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of readdirSync(dir).filter(x => x.endsWith('.json')).sort()) {
    try { out.push(JSON.parse(readFileSync(join(dir, f), 'utf8'))); }
    catch { out.push({ trace_id: f.replace(/\.json$/, ''), unreadable: true }); }
  }
  return out;
}

function registryVersion() {
  const m = workflowText(REGISTRY).match(/^version:\s*"?([\d.]+)"?/m);
  return m ? m[1] : 'unversioned';
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  const flag = n => { const i = argv.indexOf(n); return i === -1 ? null : argv[i + 1]; };

  const show = flag('--show');
  if (show) {
    const ids = retained(show);
    console.log(ids.length ? `${show}: ${ids.length} retained trace(s)\n  ${ids.join('\n  ')}`
      : `${show}: no retained traces — nothing has been reduced into this run`);
    process.exit(0);
  }

  const journal = flag('--journal'), jrun = flag('--run');
  if (journal) {
    if (!jrun) { console.error('usage: trace.mjs --journal <chatSessions/<session>.jsonl> --run {runs_root}/<run_id> [--write]'); process.exit(2); }
    if (!existsSync(journal)) { console.error(`${journal} does not exist`); process.exit(1); }
    const session = basename(journal).replace(/\.jsonl$/, '');
    let rec;
    try { rec = reduceJournal(journal, session); }
    catch (e) { console.error(`trace: ${e.message}`); process.exit(1); }
    const sum = k => rec.chat.reduce((n, c) => n + (Number(c[k]) || 0), 0);
    console.log(`${rec.lines_read} journal line(s) read · ${rec.chat.length} request(s) · ` +
      `${rec.dropped_fields} field(s) dropped as undeclared` +
      (rec.lines_unreadable ? ` · ${rec.lines_unreadable} line(s) unreadable` : ''));
    console.log(`  ${sum('promptTokens').toLocaleString('en-GB')} prompt · ${sum('completionTokens').toLocaleString('en-GB')} completion · ` +
      `${sum('copilotCredits').toFixed(1)} credit(s)`);
    if (argv.includes('--write')) {
      mkdirSync(join(jrun, TRACE_DIR), { recursive: true });
      const out = join(jrun, TRACE_DIR, `journal-${session}.json`);
      writeFileSync(out, `${JSON.stringify({ ...rec, run: basename(jrun), reduced_by: '.github/scripts/trace.mjs', attribute_set: `tracing.yaml@${registryVersion()}` }, null, 2)}\n`);
      console.log(`wrote ${out}`);
    } else {
      console.log('nothing written — pass --write to retain this into the run');
    }
    process.exit(0);
  }

  const input = flag('--in'), run = flag('--run');
  if (!input || !run) {
    console.error('usage: trace.mjs --in <otel.jsonl> --run {runs_root}/<run_id> [--write]   |   ' +
      '--journal <session.jsonl> --run {runs_root}/<run_id> [--write]   |   --show {runs_root}/<run_id>');
    process.exit(2);
  }
  if (!existsSync(input)) {
    console.error(`${input} does not exist — no session has written a trace here. ` +
      'Capture is switched on only in a person\'s own user settings (github.copilot.chat.otel.*), never by this repository.');
    process.exit(1);
  }
  const set = declaredSet();
  const spans = readSpans(input);
  const reduced = reduce(spans, set);
  console.log(`${spans.length} span(s) read · ${reduced.traces.length} trace(s) · ` +
    `${reduced.dropped_spans} span(s) and ${reduced.dropped_attributes} attribute(s) dropped as undeclared`);
  for (const t of reduced.traces)
    console.log(`  ${t.trace_id}  ${t.model_calls} model call(s), ${t.tool_calls} tool call(s)` +
      (t.tools_used.length ? ` — ${t.tools_used.join(', ')}` : ''));
  if (argv.includes('--write')) {
    const written = retain(run, reduced, { attributeSetVersion: registryVersion() });
    console.log(`wrote ${written.length} trace record(s) into ${join(run, TRACE_DIR)}`);
  } else {
    console.log('nothing written — pass --write to retain these into the run');
  }
}

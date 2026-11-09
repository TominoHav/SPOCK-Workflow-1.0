import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { RUNS_ROOT, EXPECTED_TO_DIFFER, ENVELOPE_DERIVED, artifact as artifactFile, recordsFor } from './run-files.mjs';
import { PICK_OPEN, PICK_CLOSE, ideasBlock, slateIdeas } from './solution-join.mjs';
import { WAITS_ON_A_PERSON, STALE_TASK } from './gates.mjs';
import { buildAtLeast } from './derive.mjs';
import { envelopeView, envelopeAtApproval } from './envelope.mjs';

export function stageView(runId) {
  const dir = join(RUNS_ROOT, runId);
  return envelopeAtApproval(dir) ? envelopeView(dir).texts : null;
}
const viewed = (view, rel, abs) => { const v = view && rel ? view.get(String(rel).split('\\').join('/')) : undefined; return v !== undefined ? v : readFileSync(abs, 'utf8'); };

export function splitFm(text) {
  const m = /^\ufeff?---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  return m ? { fm: m[1].split(/\r?\n/), body: text.slice(m[0].length) } : null;
}

export function contentHash(runId, artifactId, view = null) {
  let a = null;
  try { a = artifactFile(join(RUNS_ROOT, runId), artifactId); } catch { a = null; }
  if (!a || !a.abs || !existsSync(a.abs)) return null;
  return fingerprint(viewed(view, a.rel, a.abs));
}

export function ideasSeen(runId) {
  const dir = join(RUNS_ROOT, runId);
  const slate = slateIdeas(dir);
  if (!slate.length) return '';
  let a = null;
  try { a = artifactFile(dir, 'A8'); } catch { a = null; }
  if (!a || !a.abs || !existsSync(a.abs)) return '';
  const split = splitFm(readFileSync(a.abs, 'utf8'));
  const head = split ? split.fm : [];
  const i = head.findIndex(l => /^ideas:/.test(l));
  let j = i + 1;
  while (i !== -1 && j < head.length && !/^\S/.test(head[j])) j++;
  const own = i === -1 ? '' : head.slice(i, j).join('\n');
  return own === ideasBlock(dir, slate) ? '' : createHash('sha256').update(`ideas\n${own}`, 'utf8').digest('hex').slice(0, 16);
}

function ideasChanged(runId, state, stage, seen) {
  if (!recordsSeenOn(state) || typeof seen.ideas !== 'string' || !((stage.artifacts || []).map(String).includes('A8'))) return false;
  const now = ideasSeen(runId);
  return now !== '' && now !== seen.ideas;
}

function fingerprint(text) {
  const split = splitFm(text) || { fm: [], body: text };
  const kept = [];
  for (let i = 0; i < split.fm.length; i++) {
    const key = /^([A-Za-z_][\w.]*):/.exec(split.fm[i]);
    if (key && (EXPECTED_TO_DIFFER.has(key[1]) || ENVELOPE_DERIVED.has(key[1]))) {
      while (i + 1 < split.fm.length && /^\s+\S/.test(split.fm[i + 1])) i++;
      continue;
    }
    kept.push(split.fm[i]);
  }
  let body = split.body;
  const opens = body.split(PICK_OPEN).length - 1, closes = body.split(PICK_CLOSE).length - 1;
  const from = body.indexOf(PICK_OPEN), upTo = body.indexOf(PICK_CLOSE);
  if (opens === 1 && closes === 1 && from < upTo) body = body.slice(0, from + PICK_OPEN.length) + body.slice(upTo);
  return createHash('sha256').update(`${kept.join('\n')}\n---\n${body.replace(/\r\n/g, '\n')}`, 'utf8').digest('hex').slice(0, 16);
}

export const DECISIONS_SEEN_FROM = '2026-09-17';

export const RECORDS_SEEN_BUILD = '1.12';
export const recordsSeenOn = state => buildAtLeast(state && state.build, RECORDS_SEEN_BUILD);

function writtenAtApproval(stageId) {
  return new Set(Object.entries(WAITS_ON_A_PERSON)
    .filter(([, w]) => w.after === 'approval' && Number(w.stage) === Number(stageId)).map(([id]) => id));
}

export function decisionsSeen(state, stageId) {
  const n = Number(stageId);
  const approvalReads = writtenAtApproval(n).size > 0;
  const standing = ((state && state.decisions) || [])
    .filter(d => d && String(d.stage) === String(n) && !d.superseded_by)
    .filter(d => !(approvalReads && String(d.kind) === 'choice'))
    .map(d => [d.kind, d.at, d.by_as_typed || d.by, d.role, d.selection, d.what, [].concat(d.check ?? []).join(','), d.reason]
      .map(v => String(v ?? '')).join('\u0000'));
  return createHash('sha256').update(standing.join('\n'), 'utf8').digest('hex').slice(0, 16);
}

export function recordsSeen(runId, stage, view = null) {
  const dir = join(RUNS_ROOT, runId);
  const skip = writtenAtApproval(stage && stage.id);
  const parts = [];
  for (const aid of ((stage && stage.artifacts) || []).map(String)) {
    if (skip.has(aid)) continue;
    for (const rec of recordsFor(dir, aid)) {
      let text;
      try { text = viewed(view, rec.rel, rec.abs); } catch { continue; }
      parts.push(`${rec.rel}\u0000${fingerprint(text)}`);
    }
  }
  return createHash('sha256').update(parts.sort().join('\n'), 'utf8').digest('hex').slice(0, 16);
}

export const RECORDS_WORDS = "the stage's records";

function documentsChanged(runId, state, stage, seen, view = null) {
  const skip = writtenAtApproval(stage.id);
  const out = ((stage.artifacts || []).map(String))
    .filter(aid => !skip.has(aid))
    .map(aid => ({ aid, now: contentHash(runId, aid, view) }))
    .filter(d => (typeof seen[d.aid] === 'string' && seen[d.aid] ? seen[d.aid] : null) !== d.now);
  if (!out.some(d => d.aid === 'A8') && ideasChanged(runId, state, stage, seen)) out.push({ aid: 'A8', now: contentHash(runId, 'A8', view) });
  return out;
}

export function changedSinceGate(runId, state, stage) {
  const seen = stage && stage.content_seen;
  if (!seen || typeof seen !== 'object' || Array.isArray(seen) || !seen.gate) return { gate: null, documents: [], decisions: false, records: false };
  const view = String(stage.status) !== 'accepted' ? stageView(runId) : null;
  const documents = documentsChanged(runId, state, stage, seen, view).map(d => d.aid);
  const decisions = String(seen.at || '') >= DECISIONS_SEEN_FROM && typeof seen.decisions === 'string' && seen.decisions !== ''
    && seen.decisions !== decisionsSeen(state, stage.id);
  const records = recordsSeenOn(state) && typeof seen.records === 'string' && seen.records !== ''
    && seen.records !== recordsSeen(runId, stage, view);
  return { gate: String(seen.gate), documents, decisions, records };
}

export const EDITED_REPORT_BUILD = '1.12';
export const EDIT_TASK = 'SPOCK: record that I edited a document';
export function editedLine({ stage, documents }) {
  const docs = documents.length > 1 ? `${documents.slice(0, -1).join(', ')} and ${documents[documents.length - 1]}` : documents[0];
  return [`${docs} changed after stage ${stage} was accepted, and no edit is recorded.`,
    `To keep the change, send stage ${stage} back with "${STALE_TASK.redo}" and record it with "${EDIT_TASK}"; otherwise undo it. This does not stop the run.`];
}
export function editedAfterAcceptance(runId, state) {
  if (!buildAtLeast(state && state.build, EDITED_REPORT_BUILD)) return [];
  const dir = join(RUNS_ROOT, runId);
  const out = [];
  for (const s of (state && state.stages) || []) {
    const seen = s && s.content_seen;
    if (String(s && s.status) !== 'accepted' || !seen || typeof seen !== 'object' || Array.isArray(seen) || !seen.gate) continue;
    const documents = documentsChanged(runId, state, s, seen).filter(d => d.now !== null && typeof seen[d.aid] === 'string' && seen[d.aid])
      .map(d => { let a = null; try { a = artifactFile(dir, d.aid); } catch { a = null; } return (a && a.rel) || d.aid; });
    if (documents.length) out.push({ stage: Number(s.id), documents });
  }
  return out.sort((a, b) => a.stage - b.stage);
}

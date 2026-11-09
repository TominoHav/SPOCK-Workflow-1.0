import { join } from 'node:path';
import { capture, END_LINE } from './capture.mjs';
import { signedExceptions, signedChecks, coveringSignatures, NEVER_SIGNABLE } from './gates.mjs';

const CHECK = join('.github', 'scripts', 'check.mjs');

export const escapeCell = v => String(v == null ? '' : v).replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\r?\n/g, '\\n');
export const unescapeCell = v => String(v == null ? '' : v).replace(/\\([\\tn])/g, (m, c) => (c === 't' ? '\t' : c === 'n' ? '\n' : '\\'));

export function readFindings(out) {
  const lines = String(out || '').split('\n');
  let gate = null, stage = null, name = '', closingAt = -1, row = null, count = '';
  const lead = [], findings = [], documents = new Map(), signing = new Map(), unread = [];
  const dash = v => (v === undefined || v === '-' || v === '' ? null : v);
  const num = v => (dash(v) === null ? null : Number(v));
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const c = l.split('\t');
    if (c[0] === 'UNREAD' && c.length >= 3) { unread.push({ rel: unescapeCell(c[1]), why: unescapeCell(c.slice(2).join('\t')) }); continue; }
    if (!gate) {
      const h = /^(Q\d+) — stage (\d+) ?(.*)$/.exec(l);
      if (h) { gate = h[1]; stage = Number(h[2]); name = h[3].trim(); }
      else if (/ is at stage \d+ /.test(l)) lead.push(l.trim());
      continue;
    }
    if (/^\d+\/\d+ of Q\d+'s runnable checks passed/.test(l)) { closingAt = i + 1; count = l.trim(); break; }
    if (c[0] === 'FINDING' && c.length >= 6)
      findings.push({ check: c[1], document: dash(c[2]), stage: num(c[3]), fragment: unescapeCell(c[4]), shape: dash(unescapeCell(c.slice(5).join('\t'))) });
    else if (c[0] === 'DOCUMENT' && c.length >= 3) documents.set(c[1], { rel: unescapeCell(c[2]), stage: num(c[3]), status: dash(c[4]) });
    else if (c[0] === 'SIGN' && c.length >= 3) signing.set(c[1], { route: c[2], text: dash(unescapeCell(c.slice(3).join('\t'))) });
    else if (c[0] === 'GATE' && c.length >= 5)
      row = { gate: c[1], verdict: c[2], clean: c[3] === 'yes', failed: dash(c[4]) === null ? [] : c[4].split(',').filter(Boolean) };
  }
  const closing = closingAt === -1 ? '' : lines.slice(closingAt).filter(l => l.trim() !== END_LINE).join('\n').trim();
  return { gate, stage, name, lead, findings, documents, signing, row, unread, closing, count,
    ended: String(out || '').trimEnd().endsWith(END_LINE) };
}

export function gateFindings(dir, gate, { env } = {}) {
  const args = [CHECK, ...(dir ? [dir] : []), '--findings', '--gate', ...(gate ? [gate] : [])];
  const r = capture(process.execPath, args, env ? { env } : {});
  const v = readFindings(r.out);
  const row = v.row;
  return {
    code: r.code, complete: r.complete && v.ended, why: r.why || (v.ended ? null : `its answer does not end at ${END_LINE}`),
    gate: v.gate || gate || null, stage: v.stage, name: v.name, lead: v.lead,
    verdict: row ? row.verdict : null, clean: row ? row.clean : false, failed: row ? row.failed : [],
    findings: v.findings, documents: v.documents, signing: v.signing, unread: v.unread, closing: v.closing, count: v.count,
    out: r.out + r.err,
  };
}

export function failuresOf(view) {
  const ids = view && Array.isArray(view.failed) && view.failed.length
    ? view.failed : [...new Set(((view && view.findings) || []).map(f => f.check))];
  return ids.map(id => {
    const findings = ((view && view.findings) || []).filter(f => f.check === id);
    return { id, detail: findings.map(f => f.fragment).join('; '), findings };
  });
}

export function stagesAbout(findings, state = {}, current = null) {
  const list = (findings || []).filter(f => String(f.fragment || '').trim());
  if (!list.length) return [];
  const accepted = new Set(((state && state.stages) || []).filter(s => s && s.status === 'accepted').map(s => Number(s.id)));
  const about = new Set();
  for (const f of list) {
    const n = f.stage === null || f.stage === undefined ? null : Number(f.stage);
    if (n === null || n === Number(current) || !accepted.has(n)) return [];
    about.add(n);
  }
  return [...about].sort((a, b) => a - b);
}

export function aboutAccepted(view, docs = [], state = {}, current = null) {
  void docs;
  const signed = new Set(signedExceptions(state, current).flatMap(signedChecks));
  const rec = ((state && state.stages) || []).find(s => s && String(s.id) === String(current));
  for (const [id, v] of coveringSignatures(state, rec)) if (v.carried) signed.add(id);
  return failuresOf(view).filter(f => !signed.has(f.id))
    .map(f => ({ id: f.id, stages: stagesAbout(f.findings, state, current), never: NEVER_SIGNABLE.includes(f.id) }));
}

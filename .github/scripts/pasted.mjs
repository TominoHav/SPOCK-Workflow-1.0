#!/usr/bin/env node

import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, SUPPLIED_DIR, STAGE_DIRS, stoppedRun } from './run-files.mjs';
import { frontmatter } from './yaml.mjs';
import { addRefusal, freeName } from './material.mjs';
import { shapeOf, listProblem, takenIn, listedFiles } from './market-material.mjs';

export const TASK = 'SPOCK: take in what I pasted in the chat';
export const PASTED_FROM = 'SPOCK_PASTED_FROM';
export const NOTHING_SAVED = 'Nothing was saved.';
const FOLDER = { 2: STAGE_DIRS[1], 3: STAGE_DIRS[2] };
const today = () => new Date().toISOString().slice(0, 10);

export function clipboardCommand(platform = process.platform) {
  if (platform === 'darwin') return { command: 'pbpaste', args: [], env: { ...process.env, LANG: 'en_US.UTF-8' } };
  if (platform === 'win32')
    return { command: 'powershell', env: process.env,
      args: ['-NoProfile', '-NonInteractive', '-Command', '[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Get-Clipboard -Raw'] };
  return null;
}

const utf8 = b => new TextDecoder('utf-8').decode(Buffer.isBuffer(b) ? b : Buffer.from(String(b ?? ''), 'utf8')).replace(/^﻿/, '');

export function clipboardVerdict({ command = 'the clipboard command', error, status, signal, stdout, stderr } = {}, platform = process.platform) {
  if (error) {
    const code = error.code || '';
    return { reason: code === 'ENOENT' ? `${command} is not on this computer`
      : code === 'ETIMEDOUT' ? `${command} did not answer within 20 seconds`
      : `${command} could not be started (${code || String(error.message || error).split('\n')[0]})` };
  }
  const err = utf8(stderr);
  if (err.length) {
    const first = err.split(/\r?\n/).map(l => l.trim()).find(Boolean) || 'a blank line';
    return { reason: `${command} wrote to its error output: ${first.length > 200 ? `${first.slice(0, 200)}…` : first}` };
  }
  if (signal) return { reason: `${command} was stopped (${signal})` };
  if (status !== 0) return { reason: `${command} stopped with exit ${status}` };
  const text = utf8(stdout);
  return { text: platform === 'win32' ? text.replace(/\r?\n$/, '') : text };
}

export function readPasted(env = process.env, platform = process.platform) {
  if (env[PASTED_FROM]) {
    try { return { text: utf8(readFileSync(env[PASTED_FROM])) }; }
    catch (e) { return { reason: `${PASTED_FROM} names ${env[PASTED_FROM]}, which could not be read: ${e.code || e.message}` }; }
  }
  const c = clipboardCommand(platform);
  if (!c) return { reason: `this workflow reads the clipboard on a Mac or on Windows, and this computer is neither (${platform})` };
  const r = spawnSync(c.command, c.args, { env: c.env, timeout: 20000, windowsHide: true, maxBuffer: 64 * 1024 * 1024 });
  return clipboardVerdict({ ...r, command: c.command }, platform);
}

const CZECH = 'áčďéěíňóřšťúůýž';
const ROW_1252 = '€\u0081‚ƒ„…†‡ˆ‰Š‹Œ\u008dŽ\u008f' +
                 '\u0090‘’“”•–—˜™š›œ\u009džŸ';
const as1252 = b => [...b].map(x => (x >= 0x80 && x <= 0x9f ? ROW_1252[x - 0x80] : String.fromCharCode(x))).join('');
const as1250 = (() => { try { const d = new TextDecoder('windows-1250'); return b => d.decode(b); } catch { return null; } })();
export const DOUBLE_DECODED = [...new Set([...CZECH, ...CZECH.toUpperCase()].flatMap(ch => {
  const b = Buffer.from(ch, 'utf8');
  return [as1252(b), ...(as1250 ? [as1250(b)] : [])];
}))];

export function damageIn(text, most = 3) {
  const t = String(text || ''), found = [];
  for (let i = 0; i < t.length && found.length < most; i++) {
    const hit = t[i] === '�' ? '�' : DOUBLE_DECODED.find(f => t.startsWith(f, i));
    if (hit && !found.includes(hit)) found.push(hit);
    if (hit) i += hit.length - 1;
  }
  return found;
}

export const lf = t => String(t).replace(/\r\n?/g, '\n');

const isMain = process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1]);
if (isMain) {
  const die = m => { console.error(`pasted: ${m}`); process.exit(1); };
  const refuse = m => { console.error(`\n${m}\n\n${NOTHING_SAVED}\n`); process.exit(3); };
  const argv = process.argv.slice(2);
  const byAt = argv.indexOf('--by');
  const by = byAt === -1 ? '' : String(argv[byAt + 1] ?? '').trim();
  const [runId, stage] = argv.filter((a, i) => !(byAt !== -1 && i === byAt + 1) && !a.startsWith('--'));
  if (!runId || !stage) die('usage: pasted.mjs <run_id> <stage> --by "<name>"');
  const dir = join(RUNS_ROOT, runId);
  if (!existsSync(join(dir, 'RUN-STATE.md'))) die(`${dir} has no RUN-STATE.md`);
  { const stopped = stoppedRun(dir); if (stopped) refuse(stopped); }

  if (stage !== '2' && stage !== '3')
    refuse(`Stage ${stage} takes no material. Stage 2 takes problem material and stage 3 a market list. ` +
      'Run the task again while stage 2 or stage 3 is the stage being written.');
  const folder = FOLDER[stage];
  const fileRoute = `Save it as a file in ${folder}/${SUPPLIED_DIR}/ instead (File › New File, paste, then Save As into that folder), and tell the agent it is there.`;
  if (!by) refuse('The box for your name was left empty, and what you pasted is recorded as yours, under your name. Run this task again and type your name.');

  const read = readPasted();
  if (read.reason)
    refuse(`Your clipboard could not be read on this computer (${read.reason}). ${fileRoute.replace(/^Save it/, 'Save what you pasted')}`);
  const text = lf(read.text);
  if (!text.trim()) refuse('Your clipboard is empty. Select what you pasted in the chat, copy it, and run this task again.');
  const damaged = damageIn(text);
  if (damaged.length)
    refuse(`What you pasted arrived damaged from the clipboard (${damaged.join(', ')}), so nothing was saved. ${fileRoute}`);

  const date = today();
  const buf = Buffer.from(text, 'utf8');
  const sha256 = createHash('sha256').update(buf).digest('hex');
  const node = args => spawnSync(process.execPath, args, { encoding: 'utf8', env: process.env, maxBuffer: 64 * 1024 * 1024 });
  const firstLines = rel => {
    const lines = text.replace(/\n$/, '').split('\n');
    return [`\nWhat was saved, in ${folder}/${rel}, begins:`, ...lines.slice(0, 5).map(l => `  | ${l}`),
      ...(lines.length > 5 ? [`  … and ${lines.length - 5} more line(s).`] : [])].join('\n');
  };

  if (stage === '3') {
    const sup = join(dir, folder, SUPPLIED_DIR);
    const held = listedFiles(sup);
    if (held.length)
      refuse(`${folder}/${SUPPLIED_DIR}/ already holds ${held.join(', ')}. The stage records one list. Combine the two into ` +
        `${held.length === 1 ? 'that file' : 'one file'} yourself, or take ${held.length === 1 ? 'that file' : 'those files'} out of the folder, then run this task again.`);
    const shape = shapeOf(text);
    const problem = listProblem(shape, 'What you pasted', 'pasted');
    if (problem) refuse(problem);
    mkdirSync(sup, { recursive: true });
    const name = `from-chat-${date}.md`;
    const rel = `${SUPPLIED_DIR}/${name}`;
    writeFileSync(join(sup, name), buf);
    const got = { file: rel, bytes: buf.length, sha256, competitors: shape.competitors, trends: shape.trends, thin: shape.thin };
    const r = node(['.github/scripts/run-state.mjs', 'supplied-market', runId, '--file', rel, '--bytes', String(got.bytes),
      '--sha256', sha256, '--competitors', String(got.competitors), '--trends', String(got.trends),
      '--arrival', 'conversation', '--by', by]);
    if (r.status !== 0) {
      rmSync(join(sup, name), { force: true });
      refuse(`the run record did not take the list, so the file was taken out again:\n${String((r.stderr || '') + (r.stdout || '')).trim()}`);
    }
    console.log(`${runId} — what you pasted is saved as ${folder}/${rel}, exactly as it was with its line ends made LF, and recorded as your list, ${by}.`);
    console.log(takenIn(got, 'pasted').join('\n'));
    process.stdout.write(r.stdout || '');
    console.log(firstLines(rel));
    process.exit(0);
  }

  if (/^\S+$/.test(text.trim())) refuse('Your clipboard holds one word, which is not a problem statement. Copy the whole problem you pasted in the chat, then run the task again.');
  let status = 'missing';
  try {
    const state = frontmatter(readFileSync(join(dir, 'RUN-STATE.md'), 'utf8'), 'RUN-STATE.md');
    const s2 = ((state && state.stages) || []).find(s => String(s.id) === '2');
    if (s2) status = String(s2.status);
  } catch (e) { die(`the run record could not be read: ${String(e.message).split('\n')[0]}`); }
  const refused = addRefusal(status, true);
  if (refused) refuse(refused);
  const sup = join(dir, folder, SUPPLIED_DIR);
  mkdirSync(sup, { recursive: true });
  const name = freeName(sup, 'from-chat', date);
  const rel = `${SUPPLIED_DIR}/${name}`;
  writeFileSync(join(sup, name), buf);
  if (existsSync(join(dir, folder, '1-problem-material.md'))) {
    const r = node(['.github/scripts/problem-material.mjs', runId, '--add', '--from-chat', rel, '--by', by]);
    if (r.status !== 0) {
      rmSync(join(sup, name), { force: true });
      process.stdout.write(r.stdout || '');
      refuse(`the problem material did not take it, so the file was taken out again:\n${String(r.stderr || '').trim()}`);
    }
    process.stdout.write(r.stdout || '');
    console.log(`\nWhat you pasted is in ${folder}/${rel}, exactly as it was with its line ends made LF, recorded as from the conversation, pasted by ${by}.`);
  } else {
    console.log(`${runId} — what you pasted is saved as ${folder}/${rel}, exactly as it was with its line ends made LF.`);
    console.log(`There is no problem-material record yet, so "SPOCK: read in the problem material" takes it in with the rest of ${folder}/${SUPPLIED_DIR}/, marked as from the conversation.`);
  }
  console.log(firstLines(rel));
}

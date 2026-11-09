import { readFileSync, writeSync, appendFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const leave = process.exit.bind(process);
process.exit = code => { throw new Error(`a library the guard loaded tried to exit with ${code}`); };

const say = text => {
  const buf = Buffer.from(String(text), 'utf8');
  let off = 0;
  while (off < buf.length) {
    try { off += writeSync(1, buf, off, buf.length - off); }
    catch (e) { if (e.code === 'EAGAIN') continue; return; }
  }
};

let answer = {};
let input = null;
try {
  const raw = readFileSync(0, 'utf8');
  input = JSON.parse(raw);
  const event = process.argv[2] || (input && input.hook_event_name) || '';
  const rules = await import('./guard-rules.mjs');
  answer = (await rules.decide(event, input)) || {};
} catch (e) {
  answer = {};
  try {
    const dir = process.env.SPOCK_GUARD_NOTES_TEST_OVERRIDE || join(dirname(fileURLToPath(import.meta.url)), '..', '.guard');
    mkdirSync(dir, { recursive: true });
    appendFileSync(join(dir, 'decisions.jsonl'), `${JSON.stringify({
      at: new Date().toISOString(), chat: String((input && input.session_id) || ''), guard: 'entry', decision: 'step-aside',
      tool: String((input && input.tool_name) || ''), target: '', why: String((e && e.message) || e).split('\n')[0].slice(0, 300),
    })}\n`);
  } catch {  }
}
say(JSON.stringify(answer && typeof answer === 'object' ? answer : {}));
leave(0);

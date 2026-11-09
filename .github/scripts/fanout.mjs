import './stdout-sync.mjs';   // must be first: a report that does not survive its own exit is not a report
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RUNS_ROOT, STAGE_DIRS, openRuns, runLanguage, twoRunsRefusal, stoppedRun } from './run-files.mjs';
import { frameIdeas } from './frame.mjs';
import { ROOT_CONTRACT } from './contracts.mjs';
import { frontmatter } from './yaml.mjs';
import { IDEA_TEMPLATE } from './gates.mjs';
import { sectionsIn } from './doc-structure.mjs';

export const BRIEF_DIR = 'briefs';
export const SLATE_REL = `${BRIEF_DIR}/slate.md`;

const die = m => { console.error(m); process.exit(1); };

const AUTHOR_ORDER = ['what_it_is', 'what_it_does', 'how_it_does_it', 'problem_and_whom', 'opportunities',
                      'against_the_market', 'strategic_alignment'];
export function authorHeadings(runDir, today = new Date().toISOString().slice(0, 10)) {
  const at = s => (AUTHOR_ORDER.includes(s.id) ? AUTHOR_ORDER.indexOf(s.id) : AUTHOR_ORDER.length);
  const inForce = IDEA_TEMPLATE.filter(s => s.id !== 'compliance_section' && (!s.since || s.since <= today) && (!s.until || today < s.until))
    .sort((a, b) => at(a) - at(b));
  return sectionsIn(inForce.map(s => s.heading), runLanguage(runDir)).map((h, i) => `${'#'.repeat(inForce[i].level)} ${h}`);
}
const NEXT_PHASE_TASK = { 4: 'SPOCK: stage 4 — the author briefs' };

export function fanOutFor(stage, file = ROOT_CONTRACT) {
  if (!existsSync(file)) return null;
  const text = readFileSync(file, 'utf8');
  const step = new RegExp(`^([ \\t]*)-\\s+id:\\s*\\S+([\\s\\S]*?^[ \\t]+stage:[ \\t]*"?${stage}"?[ \\t]*(?:#.*)?$[\\s\\S]*?)(?=^\\1-\\s+id:|^[a-z_]+:|(?![\\s\\S]))`, 'm').exec(text);
  if (!step) return null;
  const body = step[2];
  const fo = /^(\s*)fan_out:\s*$([\s\S]*?)(?=^\1[a-z_]+:|(?![\s\S]))/m.exec(body);
  if (!fo) return null;
  const block = fo[2];
  const one = (src, key) => (new RegExp(`^\\s*${key}:\\s*(?!>|\\|)"?([^"\\n#]+?)"?\\s*(?:#.*)?$`, 'm').exec(src) || [])[1] || null;
  const phases = [];
  for (const m of block.matchAll(/^\s*-\s+id:\s*(\S+)([\s\S]*?)(?=^\s*-\s+id:|(?![\s\S]))/gm)) {
    phases.push({
      id: m[1],
      invocations: one(m[2], 'invocations'),
      skill: one(m[2], 'skill'),
      effort_bound: one(m[2], 'effort_bound'),
      transfer_only: one(m[2], 'transfer_only') === 'true',
      writes: one(m[2], 'writes'),
    });
  }
  return {
    over: one(block, 'over'),
    bound: one(block, 'bound'),
    brief_dir: one(block, 'brief_dir') || BRIEF_DIR,
    phases,
  };
}

export function expand(invocations, slate = []) {
  const t = String(invocations || '').trim();
  if (t === '1') return 1;
  if (t === 'one_per_slate_entry') return slate.map(e => e.id);
  throw new Error(`unknown invocations token "${t}" — a fan-out phase whose count nothing resolves is the fault this script exists to remove`);
}

export function slateEntries(runDir, stage) {
  const abs = join(runDir, STAGE_DIRS[stage - 1], SLATE_REL);
  if (!existsSync(abs)) return null;
  const out = [];
  const text = readFileSync(abs, 'utf8');
  const list = (src, key) => {
    const inline = new RegExp(`^\\s*${key}:\\s*\\[([^\\]]*)\\]\\s*$`, 'm').exec(src);
    if (inline) return inline[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    const block = new RegExp(`^(\\s*)${key}:\\s*$([\\s\\S]*?)(?=^\\1[a-z_]+:|^\\s*-\\s+id:|(?![\\s\\S]))`, 'm').exec(src);
    return block ? [...block[2].matchAll(/^\s*-\s*"?([^"\n]+?)"?\s*$/gm)].map(m => m[1].trim()).filter(Boolean) : [];
  };
  for (const m of text.matchAll(/^\s*-\s+id:\s*"?([A-Za-z0-9_-]+)"?\s*$([\s\S]*?)(?=^\s*-\s+id:|(?![\s\S]))/gm)) {
    out.push({
      id: m[1],
      solves: list(m[2], 'solves'),
      supported_by: list(m[2], 'supported_by'),
      statement: /^\s*statement:\s*\S/m.test(m[2]) || null,
    });
  }
  return out;
}

export function briefsOn(runDir, stage) {
  const dir = join(runDir, STAGE_DIRS[stage - 1], BRIEF_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).sort().filter(n => n.endsWith('.brief.md')).map(n => {
    let fm = {};
    try { fm = frontmatter(readFileSync(join(dir, n), 'utf8'), n) || {}; } catch { fm = {}; }
    return { name: n, phase: fm.phase || null, item_id: fm.item_id || null };
  });
}

const fm = obj => ['---', ...Object.entries(obj)
  .filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && !v.length))
  .map(([k, v]) => Array.isArray(v) ? `${k}: [${v.join(', ')}]` : `${k}: ${v}`), '---', ''].join('\n');

export function writeBriefs(runDir, stage, phaseId, { write = false } = {}) {
  const fo = fanOutFor(stage);
  if (!fo) throw new Error(`the contract composes no fan-out for stage ${stage}`);
  const phase = fo.phases.find(p => p.id === phaseId);
  if (!phase) throw new Error(`stage ${stage}'s fan-out has no phase "${phaseId}" — it has ${fo.phases.map(p => p.id).join(', ')}`);
  const stageDir = STAGE_DIRS[stage - 1];
  const dir = join(runDir, stageDir, fo.brief_dir);
  const files = [];

  if (phaseId === 'slate') {
    const n = expand(phase.invocations, []);
    if (n !== 1) throw new Error(`the slate phase resolves to ${n} invocations and must resolve to 1`);
    files.push({
      rel: `${stageDir}/${fo.brief_dir}/slate.brief.md`,
      body: fm({ stage, phase: 'slate', skill: phase.skill, invocation: '1 of 1', writes: `${stageDir}/${SLATE_REL}`, bound: fo.bound }) +
        `You are the slate phase of stage ${stage}'s fan-out. You name the set and author none of it.\n\n` +
        `Write \`${stageDir}/${SLATE_REL}\`: one \`- id:\` entry per ${fo.over.replace(/s$/, '')}, within ${fo.bound}, each carrying\n` +
        `\`id\`, \`solves[]\` and \`supported_by[]\` and nothing else.\n\n` +
        `**An entry that carries a \`statement\` is a solution you have authored here**, and the authoring\n` +
        `phase cannot then author it. ${phase.writes ? `The contract says this phase writes: ${phase.writes}.` : ''}\n`,
    });
  } else if (phaseId === 'author') {
    const slate = slateEntries(runDir, stage);
    if (slate === null) throw new Error(`${join(stageDir, SLATE_REL)} is not on disk — run the slate phase first`);
    if (!slate.length) throw new Error(`${join(stageDir, SLATE_REL)} names no entries, so there is nothing to author`);
    const ids = expand(phase.invocations, slate);
    for (const [i, e] of slate.entries()) {
      files.push({
        rel: `${stageDir}/${fo.brief_dir}/${e.id}.brief.md`,
        body: fm({
          stage, phase: 'author', skill: phase.skill, item_id: e.id,
          invocation: `${i + 1} of ${ids.length}`,
          part_path: `${stageDir}/parts/${e.id}.md`,
          effort_bound: phase.effort_bound,
          solves: e.solves, supported_by: e.supported_by,
        }) +
          `You are invocation ${i + 1} of ${ids.length} of stage ${stage}'s authoring phase. **Your id is \`${e.id}\`**, and it is\n` +
          `the only entry on the slate you write up.\n\n` +
          `Write \`${stageDir}/parts/${e.id}.md\` — your own file, never the artifact${phase.writes ? `. ${phase.writes}` : ''}.\n\n` +
          `The slate says this ${fo.over.replace(/s$/, '')} solves ${e.solves.join(', ') || '(nothing recorded)'} and is supported by\n` +
          `${e.supported_by.join(', ') || '(nothing recorded)'}.\n` +
          (Number(stage) === 4
            ? `\nYour sections carry these headings, word for word, in the run's language, in this order:\n\n${authorHeadings(runDir).map(h => `- \`${h}\``).join('\n')}\n\n` +
              `\`${phase.skill}\` says what goes under each. \`Compliance\` is not among them: ` +
              `"SPOCK: stage 4 — derive the compliance sections" writes that section from your answers, beside your file.\n`
            : ''),
      });
    }
  } else if (phaseId === 'join') {
    const slate = slateEntries(runDir, stage);
    if (slate === null) throw new Error(`${join(stageDir, SLATE_REL)} is not on disk — run the slate phase first`);
    files.push({
      rel: `${stageDir}/${fo.brief_dir}/join.brief.md`,
      body: fm({ stage, phase: 'join', skill: phase.skill, invocation: '1 of 1', transfer_only: phase.transfer_only || null }) +
        `You are the join phase of stage ${stage}'s fan-out. ${phase.transfer_only ? '**You transfer and you do not summarise, normalise, re-derive or re-title.**' : ''}\n\n` +
        `The ${slate.length} part(s) to carry across, in order:\n\n` +
        slate.map(e => `- \`${stageDir}/parts/${e.id}.md\``).join('\n') + '\n',
    });
  }

  if (write) {
    mkdirSync(dir, { recursive: true });
    for (const f of files) writeFileSync(join(runDir, f.rel), f.body, 'utf8');
  }
  return files.map(f => f.rel);
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  const one = k => { const i = argv.indexOf(`--${k}`); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : null; };
  const stage = Number(one('stage') || 4);
  const phase = one('phase');
  if (!phase) die(`fanout: --phase names which phase to brief. Stage ${stage}'s are: ` +
    `${(fanOutFor(stage)?.phases || []).map(p => p.id).join(', ') || '(the contract composes no fan-out for it)'}`);

  let target = argv.find(a => !a.startsWith('--') && a !== String(stage) && a !== phase);
  if (!target) {
    const open = openRuns();
    if (!open.length) die(`fanout: no unfinished run under \`${RUNS_ROOT}\` — name one: node .github/scripts/fanout.mjs ${RUNS_ROOT}/<run_id> --stage ${stage} --phase ${phase} --write`);
    if (open.length > 1) die(twoRunsRefusal(open, RUNS_ROOT));
    target = open[0];
  }
  const dir = target.replace(/\/$/, '');
  if (!existsSync(dir)) die(`${dir} does not exist`);
  if (argv.includes('--write')) { const stopped = stoppedRun(dir); if (stopped) { console.log(`\n${stopped}\n`); process.exit(3); } }

  let written;
  try { written = writeBriefs(dir, stage, phase, { write: argv.includes('--write') }); }
  catch (e) { die(`fanout: ${e.message}`); }

  if (argv.includes('--write')) {
    console.log(`stage ${stage}, phase ${phase} — ${written.length} brief(s) written:`);
    for (const r of written) console.log(`  ${r}`);
    if (phase === 'author') {
      const framed = frameIdeas(dir, slateEntries(dir, stage).map(e => e.id), authorHeadings(dir));
      if (framed.length) {
        console.log(`and ${framed.length} frame(s), each place marked [[fill: …]] for the author to fill:`);
        for (const r of framed) console.log(`  ${r}`);
      }
    }
    if (phase === 'slate') console.log(`\nThe slate phase writes ${STAGE_DIRS[stage - 1]}/${SLATE_REL}. ` +
      (NEXT_PHASE_TASK[Number(stage)] ? `Run "${NEXT_PHASE_TASK[Number(stage)]}" once it exists.` : 'Brief the authors once it exists.'));
  } else {
    console.log(`stage ${stage}, phase ${phase} — ${written.length} brief(s) would be written (nothing was; pass --write):`);
    for (const r of written) console.log(`  ${r}`);
  }
}

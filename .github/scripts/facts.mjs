#!/usr/bin/env node

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUALITY_GATES, UNIVERSAL, REPOSITORY_CHECKS, JUDGED_RULES, TOOL_GATES } from './gates.mjs';
import { runDirs, FIXTURES_ROOT } from './run-files.mjs';
import { participants as storeParticipants, COMMITTED as STORE_COMMITTED } from './store.mjs';
import { load as regmapLoad, counts as regmapCounts } from './regmap.mjs';

const read = f => (existsSync(f) ? readFileSync(f, 'utf8') : null);
const countMatches = (text, re) => (text ? [...text.matchAll(re)].length : null);

export function facts() {
  const f = {};
  const put = (id, value, from) => { f[id] = { value, from }; };

  const skills = read(join('.github', 'registry', 'skills.yaml'));
  put('skills', countMatches(skills, /^  - id: [\w-]+$/gm), '.github/registry/skills.yaml');

  const agents = read(join('.github', 'registry', 'agents.yaml'));
  put('design_agents', agents ? countMatches(agents.slice(0, agents.indexOf('\nsubstrate_mapping:')), /^  - id: [\w-]+$/gm) : null,
    '.github/registry/agents.yaml');
  put('agent_files', agents ? countMatches(agents.slice(agents.indexOf('\nsubstrate_mapping:')), /^  - agent_file:/gm) : null,
    '.github/registry/agents.yaml substrate_mapping');
  put('copilot_tool_gates', TOOL_GATES.length, '.vscode/settings.json, and C121 pins the same set');

  const KH = join('.github', 'know-how');
  const bodies = [];
  const walk = d => { for (const e of readdirSync(d).sort()) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p); else if (e.endsWith('.md')) bodies.push(p);
  } };
  if (existsSync(KH)) walk(KH);
  put('know_how_bodies', existsSync(KH) ? bodies.length : null, '.github/know-how/, and C41 proves it matches its source');

  put('checks_registered', new Set([...Object.values(QUALITY_GATES).flatMap(g => g.checks), ...UNIVERSAL]).size,
    'node .github/scripts/register.mjs --verify');
  put('repository_checks', REPOSITORY_CHECKS.length, 'node .github/scripts/repo-check.mjs');
  put('quality_gates', Object.keys(QUALITY_GATES).length, 'node .github/scripts/check.mjs <run> --gates');

  for (const k of ['mechanical', 'mechanisable', 'judged'])
    put(`rules_${k}`, JUDGED_RULES.filter(r => r.instrument === k).length, 'node .github/scripts/check.mjs <run> --gates');
  put('rules_total', JUDGED_RULES.length, '.github/registry/skills.yaml, and C146 compares it to the gate model');
  put('rules_judged_reader_decidable',
    JUDGED_RULES.filter(r => r.instrument === 'judged' && r.reach !== 'process').length,
    'node .github/scripts/facts.mjs');
  put('rules_judged_process_reach',
    JUDGED_RULES.filter(r => r.instrument === 'judged' && r.reach === 'process').length,
    'node .github/scripts/facts.mjs');
  const ic = read(join('.github', 'registry', 'assurance.yaml'));
  const icState = ic && (ic.slice(ic.indexOf('\nindependent_checker:')).match(/^\s*state:\s*(\S+)/m) || [])[1];
  put('gates_running_judged',
    icState === undefined || icState === null ? null
      : icState === 'absent' ? 0
        : Object.keys(QUALITY_GATES).filter(id => JUDGED_RULES.some(r => r.gate === id && r.instrument === 'judged')).length,
    'independent_checker in .github/registry/assurance.yaml, and --gates on any run');

  const runs = runDirs(FIXTURES_ROOT);
  put('runs_committed', runs.length, 'node .github/scripts/metrics.mjs');

  let store = null;
  try { store = storeParticipants(STORE_COMMITTED).length; } catch { store = null; }
  put('store_participants', store, 'node .github/scripts/store.mjs');

  const div = read(join('governing-documents', 'README.md'));
  put('known_divergences', div
    ? countMatches(div.slice(div.indexOf('## Known divergences'), div.indexOf('**A divergence that is written down')), /^\| \*\*/gm)
    : null, 'governing-documents/README.md');

  let rm = null;
  try { rm = regmapLoad(); } catch { rm = null; }
  const areaTotals = rm && rm.areas
    ? rm.areas.reduce((t, a) => {
        const c = regmapCounts(a.body);
        return { s: t.s + c.subDomains, t: t.t + c.triggers, p: t.p + c.touchpoints };
      }, { s: 0, t: 0, p: 0 })
    : null;
  put('regulatory_areas', rm && rm.areas ? rm.areas.length : null, '.github/registry/regmap.yaml');
  put('regulatory_sub_domains', areaTotals ? areaTotals.s : null, 'node .github/scripts/regmap.mjs --write');
  put('regulatory_triggers', areaTotals ? areaTotals.t : null, 'node .github/scripts/regmap.mjs --write');
  put('regulatory_touchpoints', areaTotals ? areaTotals.p : null, 'node .github/scripts/regmap.mjs --write');

  const bl = read(join('specifications', 'PILOT-BUSINESS-LOGIC.md'));
  const blv = bl && bl.match(/^\*\*Version:\*\*\s*([\d.]+)/m);
  put('business_logic_version', blv ? blv[1] : null, 'line 3 of specifications/PILOT-BUSINESS-LOGIC.md');

  const mc = read(join('.github', 'know-how', 'method', 'method-canon.md'));
  const mcv = mc && mc.match(/^\*\*Version:\*\*\s*([\d.]+)/m);
  put('method_canon_version', mcv ? mcv[1] : null, 'the header of .github/know-how/method/method-canon.md');

  return f;
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const f = facts();
  const w = Math.max(...Object.keys(f).map(k => k.length));
  console.log('\nWhat this build can state about itself, computed rather than typed\n');
  for (const [k, v] of Object.entries(f))
    console.log(`  ${k.padEnd(w)}  ${String(v.value ?? 'uncomputable').padEnd(8)}  ${v.from}`);
  console.log('\nA count in a reader-facing document is registered in .github/registry/claims.yaml and C147');
  console.log('fails the build the day it stops being true.\n');
}

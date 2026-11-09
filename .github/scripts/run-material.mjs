#!/usr/bin/env node

import { workflowText } from './yaml.mjs';   // r1.14 · W54 · M-F4: the workflow's own files, Windows line endings set aside
import { readFileSync, existsSync } from 'node:fs';

const FIXTURES_REGISTRY = '.github/registry/fixtures.yaml';

export const MATERIAL = new Set(['fabricated', 'real']);

export function declaredMaterial(runId, runState) {
  const own = runState && String(runState.material || '').trim();
  if (own && MATERIAL.has(own)) return { value: own, source: 'run-state' };

  if (existsSync(FIXTURES_REGISTRY)) {
    let text = '';
    try { text = workflowText(FIXTURES_REGISTRY); } catch { text = ''; }
    for (const m of text.matchAll(/^  - id:\s*(\S+)\s*\n\s*material:\s*(\S+)/gm))
      if (m[1] === runId && MATERIAL.has(m[2])) return { value: m[2], source: 'register' };
  }
  return { value: null, source: null };
}

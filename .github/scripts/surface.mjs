import { readFileSync, existsSync } from 'node:fs';

export const SURFACES = ['copilot', 'other-agent-tool'];
export const UNSET = 'unset';
export const SURFACE_FILE = '.github/surface';

export function observeSurface(env = process.env) {
  if (env.CLAUDECODE === '1') {
    return { observed: 'other-agent-tool', evidence: 'its session marker is set' };
  }
  return { observed: 'unknown', evidence: 'no marker from another agent tool, which is not evidence of Copilot' };
}

export function declaredSurface(file = SURFACE_FILE, env = process.env) {
  if (existsSync(file)) {
    const t = readFileSync(file, 'utf8').trim();
    if (t && t !== UNSET) return t;
  }
  return (env.SPOCK_SURFACE || '').trim() || UNSET;
}

export function resolveSurface(file = SURFACE_FILE, env = process.env) {
  const declared = declaredSurface(file, env);
  const { observed, evidence } = observeSurface(env);
  const agrees = observed === 'unknown' ? 'unverifiable' : observed === declared;
  return { declared, observed, evidence, agrees };
}

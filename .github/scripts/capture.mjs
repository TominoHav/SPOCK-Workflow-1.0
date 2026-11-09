import { spawnSync } from 'node:child_process';

export const END_LINE = '#spock-end';

export function capture(file, args, { endsWith = null, retries = 1, ...opts } = {}) {
  for (let attempt = 0; ; attempt++) {
    const r = spawnSync(file, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 64 * 1024 * 1024,
      ...opts,
    });
    const out = r.stdout || '', err = r.stderr || '';
    let why = null;
    if (r.error) why = `the child could not be run: ${r.error.code || r.error.message}`;
    else if (r.signal) why = `the child was killed by ${r.signal}`;
    else if (r.status === null) why = 'the child produced no exit status';
    else if (endsWith && !out.trimEnd().endsWith(endsWith))
      why = `the capture does not end at ${endsWith} — ${out.length} byte(s) read`;
    if (!why) return { code: r.status, out, err, complete: true, why: null };
    if (attempt < retries && !r.error) continue;
    return { code: r.status ?? 1, out, err, complete: false, why };
  }
}

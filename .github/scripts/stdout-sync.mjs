import { writeSync } from 'node:fs';
import { format } from 'node:util';

function writeAll(fd, text) {
  const buf = Buffer.from(text, 'utf8');
  let off = 0;
  while (off < buf.length) {
    try {
      off += writeSync(fd, buf, off, buf.length - off);
    } catch (e) {
      if (e.code === 'EAGAIN') continue;
      if (e.code === 'EPIPE') return;
      throw e;
    }
  }
}

export function makeStdoutSynchronous() {
  if (console.__spockSync) return;
  console.__spockSync = true;
  console.log = (...args) => writeAll(1, `${format(...args)}\n`);
  console.error = (...args) => writeAll(2, `${format(...args)}\n`);
}

makeStdoutSynchronous();

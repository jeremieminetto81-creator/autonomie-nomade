import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export function htmlFiles(dir = 'dist') {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

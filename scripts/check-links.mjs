// Vérifie que chaque lien interne (a href, script src, link href) pointe vers un fichier de dist/.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { htmlFiles } from './lib.mjs';

let errors = 0;
for (const file of htmlFiles()) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(ref)) continue;
    const path = ref.split('#')[0].split('?')[0];
    if (!path) continue;
    const target = join('dist', path.endsWith('/') ? join(path, 'index.html') : path);
    if (!existsSync(target)) { console.error(`Lien cassé dans ${file} : ${ref}`); errors++; }
  }
}
if (errors) process.exit(1);
console.log('Liens internes : OK');

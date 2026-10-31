// Scan simple de secrets dans les fichiers suivis (hors node_modules, dist, .git, .env.example).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const skip = new Set(['node_modules', 'dist', '.git', '.astro', 'package-lock.json', '.env.example']);
const patterns = [
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(api[_-]?key|secret|token|password)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i,
  /ghp_[A-Za-z0-9]{36}/,
];

const walk = (d) => readdirSync(d).flatMap((f) => {
  if (skip.has(f)) return [];
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

let errors = 0;
for (const file of walk('.')) {
  if (/\.(png|jpe?g|webp|avif|ico|woff2?)$/i.test(file)) continue;
  const txt = readFileSync(file, 'utf8');
  for (const p of patterns) if (p.test(txt)) { console.error(`Secret possible : ${file}`); errors++; }
}
if (errors) process.exit(1);
console.log('Secrets : aucun trouvé');

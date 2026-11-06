// Écrit dist/_redirects : redirections permanentes (301) vers l'adresse propre de chaque page.
// Cloudflare redirige déjà ces variantes, mais en 307 (temporaire) ; le 301 est plus clair pour Google.
// Fichier lu par Cloudflare et par Netlify. Les règles statiques doivent venir avant les règles à joker.
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const pages = [];
const walk = (dir, rel = '') => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory() || name === '_astro' || name.startsWith('.')) continue;
    const path = `${rel}/${name}`;
    if (existsSync(join(full, 'index.html'))) pages.push(path);
    walk(full, path);
  }
};
walk('dist');

const lines = [
  "# Généré au build (scripts/write-redirects.mjs). Une seule adresse par page : redirections permanentes.",
  '/index.html / 301',
  ...pages.sort().map((p) => `${p} ${p}/ 301`),
  '/*/index.html /:splat/ 301',
];
writeFileSync('dist/_redirects', lines.join('\n') + '\n');
console.log(`Redirections : ${pages.length + 2} règles écrites dans dist/_redirects`);

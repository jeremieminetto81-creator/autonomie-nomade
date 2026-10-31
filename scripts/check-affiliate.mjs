// Vérifie dans dist/ que chaque lien amazon.fr a un tag, le bon rel, et que le tag n'est pas le texte de remplacement en production.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});

let errors = 0;
for (const file of walk('dist')) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<a\b[^>]*href="(https:\/\/www\.amazon\.fr[^"]*)"[^>]*>/g)) {
    const tag = m[0];
    if (!/[?&]tag=[^&"]+/.test(m[1])) { console.error(`Sans tag : ${file}`); errors++; }
    if (!/rel="sponsored nofollow noopener"/.test(tag)) { console.error(`rel manquant : ${file}`); errors++; }
    if (process.env.CI_PRODUCTION && m[1].includes('VOTRE-TAG-21')) { console.error(`Tag de remplacement : ${file}`); errors++; }
  }
  if (process.env.CI_PRODUCTION && html.includes('[À COMPLÉTER')) { console.error(`Champ à compléter restant : ${file}`); errors++; }
}
if (errors) process.exit(1);
console.log('Liens affiliés : OK');

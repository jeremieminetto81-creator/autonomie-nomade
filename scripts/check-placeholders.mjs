// Garde-fou de production : refuse un site qui contient encore des valeurs de remplacement.
// Lancé par Netlify pour la production (voir netlify.toml). En local, il échoue tant que le site n'est pas prêt : c'est voulu.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const patterns = [/VOTRE-TAG-21/, /VOTRE-SITE/i, /\[À COMPLÉTER/, /\[NOM DU SITE\]/];
const textExt = /\.(html|xml|txt|js|css|json)$/;

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = join(d, e.name);
  return e.isDirectory() ? walk(p) : textExt.test(e.name) || e.name === 'security.txt' ? [p] : [];
});

const found = new Map();
for (const file of walk('dist')) {
  const txt = readFileSync(file, 'utf8');
  for (const p of patterns) if (p.test(txt)) {
    found.set(p.source, (found.get(p.source) ?? []).concat(file));
  }
}

if (found.size) {
  console.error('Valeurs de remplacement encore présentes, publication refusée :');
  for (const [p, files] of found) console.error(`  ${p} -> ${files.length} fichier(s), ex. ${files[0]}`);
  process.exit(1);
}
console.log('Aucune valeur de remplacement : prêt pour la production.');

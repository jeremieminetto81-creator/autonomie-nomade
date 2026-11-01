// Minifie après le build les scripts copiés tels quels depuis public/ (calculateurs, barre de lecture).
// Les fichiers sources de public/ restent lisibles ; seule la version publiée dans dist/ est compactée.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { transform } from 'esbuild';

let saved = 0;
for (const name of readdirSync('dist').filter((f) => f.endsWith('.js'))) {
  const file = join('dist', name);
  const src = readFileSync(file, 'utf8');
  const { code } = await transform(src, { minify: true, target: 'es2018' });
  writeFileSync(file, code);
  saved += src.length - code.length;
  console.log(`${name} : ${src.length} -> ${code.length} octets`);
}
console.log(`Scripts minifiés (${saved} octets gagnés)`);

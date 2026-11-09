import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { updatedOn } from './src/data/updates.mjs';

// L'adresse publique du site vient d'une variable d'environnement (voir .env.example).
const site = process.env.SITE_URL || 'https://VOTRE-SITE.netlify.app';

export default defineConfig({
  site,
  trailingSlash: 'always',
  // Les pages marquées noindex ne doivent pas figurer dans le sitemap.
  // lastmod : date de dernière révision du contenu de chaque page (src/data/updates.mjs).
  integrations: [sitemap({
    filter: (page) => !/\/(mentions-legales|confidentialite)\/$/.test(page),
    serialize: (item) => ({ ...item, lastmod: new Date(updatedOn(new URL(item.url).pathname)).toISOString() }),
  })],
  build: {
    // Le CSS reste dans un fichier : pas de style inline, donc une CSP stricte.
    inlineStylesheets: 'never',
  },
});

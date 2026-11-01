import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// L'adresse publique du site vient d'une variable d'environnement (voir .env.example).
const site = process.env.SITE_URL || 'https://VOTRE-SITE.netlify.app';

export default defineConfig({
  site,
  trailingSlash: 'always',
  // Les pages marquées noindex ne doivent pas figurer dans le sitemap.
  // lastmod : date de dernière révision du contenu, à mettre à jour quand on modifie les pages.
  integrations: [sitemap({
    filter: (page) => !/\/(mentions-legales|confidentialite)\/$/.test(page),
    lastmod: new Date('2026-11-01'),
  })],
  build: {
    // Le CSS reste dans un fichier : pas de style inline, donc une CSP stricte.
    inlineStylesheets: 'never',
  },
});

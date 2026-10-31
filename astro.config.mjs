import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// L'adresse publique du site vient d'une variable d'environnement (voir .env.example).
const site = process.env.SITE_URL || 'https://VOTRE-SITE.netlify.app';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // Le CSS reste dans un fichier : pas de style inline, donc une CSP stricte.
    inlineStylesheets: 'never',
  },
});

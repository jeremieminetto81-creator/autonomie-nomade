import type { APIRoute } from 'astro';
import { SITE_NAME, SITE_DESCRIPTION, GUIDES, AMAZON_MENTION } from '../config';
import products from '../data/products.json';
import { SELECTIONS, BRANDS, brandSlug } from '../data/selections';

// Résumé du site pour les assistants IA (proposition llms.txt), généré au build à partir des guides et produits.
export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    "Site éditorial en français. Les caractéristiques des produits viennent des fiches des fabricants ou d'Amazon.fr, avec leurs sources. Aucun produit n'a été testé par l'éditeur. Les prix ne sont pas affichés : ils sont à consulter sur Amazon.fr.",
    '',
    '## Guides',
    '',
    ...GUIDES.map((g) => `- [${g.title}](${abs(g.href)}) : ${g.desc}`),
    `- [Notre sélection de stations électriques portables](${abs('/selection/')}) : les modèles présentés, avec leurs caractéristiques clés.`,
    '',
    '## Sélections',
    '',
    ...SELECTIONS.map((x) => `- [${x.title}](${abs(`/selection/${x.slug}/`)}) : ${x.criteria}`),
    ...BRANDS.map((b) => `- [Stations électriques ${b}](${abs(`/marque/${brandSlug(b)}/`)})`),
    '',
    '## Produits présentés',
    '',
    ...products.map((p) => `- ${p.name} (${p.brand}) : capacité (Wh) ${p.capacityWh} ; puissance (W) ${p.outputW} ; batterie ${p.batteryType}.`),
    '',
    '## À propos',
    '',
    `- [Notre méthode et affiliation](${abs('/a-propos/')}) : financement, critères de choix, ce qui a été testé ou non.`,
    `- ${AMAZON_MENTION}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

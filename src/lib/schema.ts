import { SITE_NAME } from '../config';

interface Faq { q: string; a: string }

// Éditeur du site, réutilisé comme auteur et publisher (avec le logo, utile aux moteurs et aux IA).
export function organization(site: URL) {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: new URL('/', site).href,
    logo: new URL('/favicon.svg', site).href,
  };
}

function breadcrumb(site: URL, url: string, crumb: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: new URL('/', site).href },
      { '@type': 'ListItem', position: 2, name: crumb, item: url },
    ],
  };
}

export function articleSchemas(opts: {
  site: URL;
  path: string;
  title: string;
  description: string;
  crumb: string;
  published: string;
  modified: string;
  faq?: Faq[];
}) {
  const url = new URL(opts.path, opts.site).href;
  const out: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: opts.title,
      description: opts.description,
      inLanguage: 'fr',
      datePublished: opts.published,
      dateModified: opts.modified,
      // Même image que le partage sur les réseaux (voir scripts/og-images.mjs).
      image: new URL(`/og/${opts.path.slice(1, -1)}.png`, opts.site).href,
      author: organization(opts.site),
      publisher: organization(opts.site),
      mainEntityOfPage: url,
    },
    breadcrumb(opts.site, url, opts.crumb),
  ];
  if (opts.faq?.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: opts.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return out;
}

// Page de sélection : une liste de produits, sans note ni avis (nous n'en avons pas).
export function listSchemas(opts: { site: URL; path: string; title: string; crumb: string; items: string[] }) {
  const url = new URL(opts.path, opts.site).href;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: opts.title,
      url,
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
    },
    breadcrumb(opts.site, url, opts.crumb),
  ];
}

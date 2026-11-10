import { updatedOn } from '../data/updates.mjs';
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

// Le fil d'Ariane des données doit suivre celui affiché sur la page (voir GuideHero).
interface Parent { href: string; label: string }
function breadcrumb(site: URL, url: string, crumb: string, parent?: Parent) {
  const steps = [
    { name: 'Accueil', item: new URL('/', site).href },
    ...(parent ? [{ name: parent.label, item: new URL(parent.href, site).href }] : []),
    { name: crumb, item: url },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: steps.map((s, i) => ({ '@type': 'ListItem', position: i + 1, ...s })),
  };
}

export function articleSchemas(opts: {
  site: URL;
  path: string;
  title: string;
  description: string;
  crumb: string;
  published: string;
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
      dateModified: updatedOn(opts.path),
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

// Page de sélection : une page de collection. Pas d'ItemList : Google l'interprète comme un
// carrousel, qui exige une page par élément sur ce site (nos produits renvoient vers Amazon).
// Pas de Product non plus : il exigerait prix ou avis, que nous n'avons pas.
export function listSchemas(opts: { site: URL; path: string; title: string; description: string; crumb: string; parent?: Parent; faq?: Faq[] }) {
  const url = new URL(opts.path, opts.site).href;
  const out: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: opts.title,
      description: opts.description,
      url,
      inLanguage: 'fr',
      isPartOf: { '@type': 'WebSite', url: new URL('/', opts.site).href },
    },
    breadcrumb(opts.site, url, opts.crumb, opts.parent),
  ];
  if (opts.faq?.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: opts.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return out;
}

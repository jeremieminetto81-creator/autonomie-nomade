import { SITE_NAME } from '../config';

interface Faq { q: string; a: string }

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
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: new URL('/', opts.site).href },
        { '@type': 'ListItem', position: 2, name: opts.crumb, item: url },
      ],
    },
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

// Réglages du site. Les valeurs à compléter sont volontairement visibles.
export const SITE_NAME = 'Autonomie Nomade';
export const SITE_DESCRIPTION =
  "Guides et comparatifs indépendants pour choisir une station électrique portable, des panneaux solaires portables ou un kit solaire de balcon.";

export const AMAZON_TAG: string = import.meta.env.AMAZON_TAG ?? 'VOTRE-TAG-21';

// Formule relevée dans des sources secondaires (iubenda, wizishop) qui citent la section 5 du contrat.
// À COMPARER MOT POUR MOT avec le contrat actuel dans l'espace Partenaires avant publication (voir docs/CONFORMITE.md).
export const AMAZON_MENTION =
  'En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.';

export const EDITOR_EMAIL = 'mailpro83136@gmail.com';
// Code de validation Google Search Console (balise HTML). Public, ce n'est pas un secret.
export const GOOGLE_SITE_VERIFICATION = '3M1hSo1q-ifrYyXSqHJ_KfUYPSpkOArNGlMB8FCIQPY';
// Code de validation Bing Webmaster Tools (balise msvalidate.01). Vide tant qu'il n'est pas utilisé.
export const BING_SITE_VERIFICATION = '';
export const LAST_UPDATE = '31 octobre 2026';

// Les guides alimentent la navigation, les cartes de l'accueil et le pied de page.
export const GUIDES = [
  {
    href: '/quelle-capacite-station-electrique/',
    short: 'Capacité',
    title: 'Quelle capacité de station électrique choisir ?',
    desc: "Calculez l'énergie dont vous avez besoin en Wh, appareil par appareil.",
    icon: 'battery',
  },
  {
    href: '/station-electrique-portable-vs-groupe-electrogene/',
    short: 'Groupe électrogène',
    title: 'Station électrique ou groupe électrogène ?',
    desc: 'Bruit, autonomie, sécurité : lequel choisir selon votre usage.',
    icon: 'plug',
  },
  {
    href: '/panneau-solaire-portable-station-electrique/',
    short: 'Solaire',
    title: 'Quel panneau solaire pour sa station ?',
    desc: 'Puissance réelle, tension et temps de recharge, avec calculateur.',
    icon: 'sun',
  },
  {
    href: '/station-electrique-portable-1000-wh/',
    short: '1000 Wh',
    title: 'Station électrique 1000 Wh : Jackery ou Anker ?',
    desc: 'Ce que 1000 Wh permettent, et deux modèles comparés sur fiches officielles.',
    icon: 'scale',
  },
] as const;

export const NAV = [
  ...GUIDES.map((g) => ({ href: g.href, label: g.short })),
  { href: '/selection/', label: 'Sélection' },
];

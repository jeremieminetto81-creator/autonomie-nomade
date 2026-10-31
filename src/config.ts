// Réglages du site. Les valeurs à compléter sont volontairement visibles.
export const SITE_NAME = 'Autonomie Nomade';
export const SITE_DESCRIPTION =
  "Guides et comparatifs indépendants pour choisir une station électrique portable, des panneaux solaires portables ou un kit solaire de balcon.";

export const AMAZON_TAG: string = import.meta.env.AMAZON_TAG ?? 'VOTRE-TAG-21';

// Formule relevée dans des sources secondaires (iubenda, wizishop) qui citent la section 5 du contrat.
// À COMPARER MOT POUR MOT avec le contrat actuel dans l'espace Partenaires avant publication (voir docs/CONFORMITE.md).
export const AMAZON_MENTION =
  'En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.';

export const EDITOR_EMAIL = '[À COMPLÉTER : e-mail de contact]';
export const LAST_UPDATE = '31 octobre 2026';

export const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos/', label: 'Notre méthode' },
];

import products from './products.json';

// Sélections thématiques. Chaque critère est objectif et affiché sur la page,
// pour que le visiteur sache pourquoi un modèle y figure.
type Product = (typeof products)[number];
type Scene = 'capacity' | 'generator' | 'solar' | 'compare' | 'selection';

export interface Selection {
  slug: string;
  group: 'usage' | 'capacite';
  short: string;
  title: string;
  description: string;
  kicker: string;
  scene: Scene;
  icon: 'battery' | 'plug' | 'sun' | 'scale' | 'compass' | 'alert';
  intro: string[];
  criteria: string;
  test: (p: Product) => boolean;
  related: string[];
}

export const SELECTIONS: Selection[] = [
  {
    slug: 'camping-randonnee',
    group: 'usage',
    short: 'Camping et randonnée',
    title: 'Stations électriques pour le camping et la randonnée',
    description: "Petites stations électriques portables pour le camping : recharger téléphones, lampes et appareils photo sans prise, avec un poids réduit.",
    kicker: 'Sélection par usage',
    scene: 'solar',
    icon: 'compass',
    intro: [
      "En camping, on recharge surtout de petits appareils : téléphones, lampes, appareil photo, enceinte. Une petite capacité suffit souvent, et le poids compte, car la station se porte.",
      "Un petit panneau solaire permet de la recharger dans la journée. Vérifiez sa compatibilité avec l'entrée solaire de la station.",
    ],
    criteria: 'Modèles de moins de 500 Wh de notre sélection.',
    test: (p) => p.capWh < 500,
    related: ['/quelle-capacite-station-electrique/', '/panneau-solaire-portable-station-electrique/'],
  },
  {
    slug: 'van-camping-car',
    group: 'usage',
    short: 'Van et camping-car',
    title: 'Stations électriques pour van et camping-car',
    description: "Stations électriques portables pour van et camping-car : capacité autour de 1000 Wh pour le frigo, l'éclairage et le télétravail en itinérance.",
    kicker: 'Sélection par usage',
    scene: 'solar',
    icon: 'battery',
    intro: [
      "En van ou en camping-car, la consommation de tous les jours pèse lourd : glacière ou frigo à compresseur, éclairage, recharge d'ordinateur. Une capacité autour de 1000 Wh offre un bon compromis entre autonomie, poids et encombrement.",
      "Pour rester autonome plusieurs jours, la recharge solaire devient importante : regardez la puissance d'entrée solaire de chaque modèle.",
    ],
    criteria: 'Modèles de 1000 à 1200 Wh de notre sélection.',
    test: (p) => p.capWh >= 1000 && p.capWh <= 1200,
    related: ['/station-electrique-portable-1000-wh/', '/panneau-solaire-portable-station-electrique/'],
  },
  {
    slug: 'coupure-de-courant',
    group: 'usage',
    short: 'Coupure de courant',
    title: 'Stations électriques pour les coupures de courant',
    description: "Stations électriques portables pour faire face à une coupure de courant : box internet, éclairage, recharges et petits appareils, à l'abri et sans bruit.",
    kicker: 'Sélection par usage',
    scene: 'capacity',
    icon: 'alert',
    intro: [
      "Lors d'une coupure, une station électrique alimente l'essentiel à l'intérieur, sans bruit ni gaz d'échappement : box internet, éclairage, recharges de téléphones, petits appareils.",
      "Plus la coupure peut durer, plus la capacité compte. Listez le strict nécessaire et calculez son énergie avant de choisir.",
    ],
    criteria: 'Modèles de 1000 Wh et plus de notre sélection.',
    test: (p) => p.capWh >= 1000,
    related: ['/quelle-capacite-station-electrique/', '/station-electrique-portable-vs-groupe-electrogene/'],
  },
  {
    slug: 'chantier',
    group: 'usage',
    short: 'Chantier et outils',
    title: 'Stations électriques pour le chantier et les outils',
    description: "Stations électriques portables puissantes pour le chantier : outils électriques sans prise, avec une puissance de sortie continue d'au moins 1800 W.",
    kicker: 'Sélection par usage',
    scene: 'generator',
    icon: 'plug',
    intro: [
      "Sur un chantier, c'est la puissance de sortie qui compte avant tout : une scie ou un perforateur demande beaucoup de watts, et parfois davantage au démarrage.",
      "Vérifiez la puissance indiquée sur l'étiquette de vos outils et comparez-la à la puissance continue de la station, pas seulement à sa puissance de pointe.",
    ],
    criteria: 'Modèles de notre sélection avec une puissance de sortie continue d\'au moins 1800 W.',
    test: (p) => p.outW >= 1800,
    related: ['/station-electrique-portable-vs-groupe-electrogene/', '/quelle-capacite-station-electrique/'],
  },
  {
    slug: 'moins-de-500-wh',
    group: 'capacite',
    short: 'Moins de 500 Wh',
    title: 'Stations électriques portables de moins de 500 Wh',
    description: "Stations électriques portables de moins de 500 Wh : modèles compacts et légers pour recharger de petits appareils, comparés sur leurs caractéristiques.",
    kicker: 'Sélection par capacité',
    scene: 'capacity',
    icon: 'battery',
    intro: [
      "Sous 500 Wh, les stations restent compactes et faciles à transporter. Elles conviennent aux recharges de téléphones, tablettes et ordinateurs, à l'éclairage et aux petits appareils.",
      "Leur puissance de sortie est limitée : elles ne sont pas faites pour les appareils qui chauffent.",
    ],
    criteria: 'Modèles de moins de 500 Wh de notre sélection.',
    test: (p) => p.capWh < 500,
    related: ['/quelle-capacite-station-electrique/'],
  },
  {
    slug: '1000-a-1500-wh',
    group: 'capacite',
    short: '1000 à 1500 Wh',
    title: 'Stations électriques portables de 1000 à 1500 Wh',
    description: "Stations électriques portables de 1000 à 1500 Wh : le format polyvalent pour le van, le télétravail nomade et les coupures de courant.",
    kicker: 'Sélection par capacité',
    scene: 'compare',
    icon: 'scale',
    intro: [
      "Entre 1000 et 1500 Wh, on trouve les stations les plus polyvalentes : assez de capacité pour un week-end en van ou quelques heures de coupure, tout en restant transportables.",
      "Pour comparer deux modèles en détail, voir notre guide Jackery Explorer 1000 v2 ou Anker SOLIX C1000 Gen 2.",
    ],
    criteria: 'Modèles de 1000 à 1500 Wh de notre sélection.',
    test: (p) => p.capWh >= 1000 && p.capWh <= 1500,
    related: ['/station-electrique-portable-1000-wh/'],
  },
  {
    slug: '2000-wh-et-plus',
    group: 'capacite',
    short: '2000 Wh et plus',
    title: 'Stations électriques portables de 2000 Wh et plus',
    description: "Stations électriques portables de 2000 Wh et plus : grande capacité et forte puissance pour les longues coupures, le chantier ou l'autonomie prolongée.",
    kicker: 'Sélection par capacité',
    scene: 'capacity',
    icon: 'battery',
    intro: [
      "Au-delà de 2000 Wh, les stations visent les besoins importants : longues coupures, outils puissants, autonomie de plusieurs jours avec recharge solaire.",
      "Elles sont aussi plus lourdes : vérifiez le poids sur la fiche du produit si vous devez la déplacer souvent.",
    ],
    criteria: 'Modèles de 2000 Wh et plus de notre sélection.',
    test: (p) => p.capWh >= 2000,
    related: ['/station-electrique-portable-vs-groupe-electrogene/'],
  },
];

export const BRANDS = [...new Set(products.map((p) => p.brand))].sort();
export const brandSlug = (b: string) => b.toLowerCase();

export const idsFor = (test: (p: Product) => boolean) =>
  products.filter(test).sort((a, b) => a.capWh - b.capWh).map((p) => p.id);

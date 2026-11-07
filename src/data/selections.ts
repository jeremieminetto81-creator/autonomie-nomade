import products from './products.json';

// Sélections thématiques. Chaque critère est objectif et affiché sur la page,
// pour que le visiteur sache pourquoi un modèle y figure.
type Product = (typeof products)[number];
type Scene = 'capacity' | 'generator' | 'solar' | 'compare' | 'selection';

export interface Section { id: string; title: string; text: string[] }
export interface Faq { q: string; a: string }

export interface Selection {
  slug: string;
  group: 'usage' | 'capacite';
  short: string;
  title: string;
  // Titre visible (H1), différent du titre de l'onglet pour ne pas faire doublon.
  h1: string;
  description: string;
  kicker: string;
  scene: Scene;
  icon: 'battery' | 'plug' | 'sun' | 'scale' | 'compass' | 'alert';
  intro: string[];
  criteria: string;
  test: (p: Product) => boolean;
  related: string[];
  // Contenu propre à la page, pour qu'aucune sélection ne ressemble à une autre.
  sections?: Section[];
  faq?: Faq[];
  sources?: { label: string; href: string }[];
}

export const SELECTIONS: Selection[] = [
  {
    slug: 'camping-randonnee',
    group: 'usage',
    short: 'Camping et randonnée',
    title: 'Stations électriques pour le camping et la randonnée',
    h1: 'Station électrique camping et randonnée : laquelle emporter ?',
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
    sections: [
      {
        id: 'preparer-son-bilan',
        title: "Préparer son bilan d'énergie",
        text: [
          "Avant de partir, listez ce que vous voulez recharger : téléphones, lampe, enceinte, GPS, appareil photo, éventuellement une glacière électrique. Pour chaque appareil, notez sa puissance en watts et la durée d'utilisation prévue : notre calculateur en déduit l'énergie en Wh.",
          "Sur un week-end, la glacière électrique est souvent le poste le plus gourmand. Elle fonctionne par cycles : calculez-la à part, sans compter 24 heures de fonctionnement continu.",
        ],
      },
      {
        id: 'poids-et-solaire',
        title: 'Poids et recharge solaire des modèles',
        text: [
          "Deux critères comptent en randonnée : ce que l'on porte, et la possibilité de recharger sans prise. Les valeurs « à vérifier » n'ont pas été relevées sur une fiche : consultez la fiche du produit.",
        ],
      },
      {
        id: 'voyager-en-avion',
        title: 'Peut-on voyager avec une station en avion ?',
        text: [
          "Le livret de la Direction générale de l'aviation civile sur les batteries au lithium impose de les garder en cabine. Entre 100 et 160 Wh, la limite est de 2 batteries par passager avec l'accord de la compagnie, et au-delà de 160 Wh le transport est interdit.",
          "Toutes les stations de cette sélection dépassent 160 Wh : elles ne peuvent pas voyager en avion dans vos bagages. En cas de doute, reportez-vous à la documentation de votre compagnie.",
        ],
      },
    ],
    faq: [
      { q: 'Quelle capacité emporter pour un week-end de camping ?', a: "Cela dépend de vos appareils. Additionnez l'énergie de chacun (puissance en watts multipliée par les heures d'usage) puis ajoutez une marge : notre calculateur de capacité le fait pour vous." },
      { q: 'Peut-on recharger une station sans prise, en pleine nature ?', a: "Oui, avec un panneau solaire portable compatible avec l'entrée solaire de la station. La recharge dépend de l'ensoleillement : voir notre guide des panneaux solaires portables." },
      { q: 'Peut-on emporter une station électrique en avion ?', a: "Pas dans les bagages des passagers si sa batterie dépasse 160 Wh, ce qui est le cas de tous les modèles de cette sélection, d'après le livret de la DGAC sur les batteries au lithium." },
    ],
    sources: [{ label: "DGAC, « Batteries lithium : anticiper le risque de feu à bord » (livret cabine ou soute)", href: 'https://www.ecologie.gouv.fr/sites/default/files/documents/Livret_cabine_ou_soute.pdf' }],
  },
  {
    slug: 'van-camping-car',
    group: 'usage',
    short: 'Van et camping-car',
    title: 'Station électrique camping-car et van : notre sélection',
    h1: 'Station électrique camping-car et van : laquelle choisir ?',
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
    sections: [
      {
        id: 'bilan-quotidien',
        title: "Faire le bilan d'une journée en van",
        text: [
          "En itinérance, raisonnez par jour : listez ce qui fonctionne chaque jour (frigo, éclairage, ordinateur, recharges de téléphones), avec la puissance et la durée d'utilisation de chaque appareil. Le total en Wh indique ce que la station doit fournir entre deux recharges.",
          "Le frigo à compresseur est souvent le premier poste de consommation. Il tourne par cycles : sa consommation réelle dépend de la température extérieure et du réglage, et sa notice indique parfois une consommation quotidienne. Notre calculateur de capacité vous aide à faire le total.",
        ],
      },
      {
        id: 'recharge-en-itinerance',
        title: 'Recharger la station en itinérance',
        text: [
          "Trois sources sont possibles : le secteur au camping ou sur une aire de services, le véhicule en roulant si la station accepte une recharge par la prise allume-cigare 12 V, et des panneaux solaires. La recharge par l'allume-cigare est lente et dépend du véhicule : vérifiez la fiche de la station et celle de votre véhicule.",
          "Pour rester plusieurs jours sans branchement, le solaire devient décisif. Comparez l'entrée solaire maximale des modèles : c'est la puissance de panneaux que la station peut accepter, pas ce qu'elle produira réellement. Le poids compte aussi, car la station se déplace dans le véhicule.",
        ],
      },
    ],
    faq: [
      { q: 'Une station électrique remplace-t-elle une batterie auxiliaire de camping-car ?', a: "Elle peut jouer un rôle proche pour alimenter des appareils branchés sur ses prises, sans installation. Elle ne se raccorde pas pour autant au circuit 12 V du véhicule : pour une installation fixe, demandez conseil à un professionnel." },
      { q: 'Quelle capacité pour un week-end en van ?', a: "Cela dépend surtout du frigo et des appareils que vous rechargez chaque jour. Calculez la consommation d'une journée, multipliez-la par le nombre de jours sans recharge, puis ajoutez une marge." },
      { q: 'Peut-on recharger une station électrique en roulant ?', a: "Oui si elle accepte une recharge par la prise allume-cigare 12 V, ce que précise sa fiche. Cette recharge est lente : elle complète le solaire et le secteur plus qu'elle ne les remplace." },
    ],
  },
  {
    slug: 'coupure-de-courant',
    group: 'usage',
    short: 'Coupure de courant',
    title: 'Stations électriques pour les coupures de courant',
    h1: 'Quelle station électrique pour une coupure de courant ?',
    description: "Station électrique en cas de coupure de courant : alimenter box internet, éclairage, recharges et petits appareils à l'abri et sans bruit. Notre sélection.",
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
    sections: [
      {
        id: 'appareils-essentiels',
        title: 'Quels appareils essentiels alimenter ?',
        text: [
          "En cas de coupure, gardez la station pour l'essentiel : l'éclairage avec des lampes LED, la box internet pour rester joignable, la recharge des téléphones et un ordinateur portable. La puissance de chaque appareil figure sur son étiquette ou sur son bloc d'alimentation.",
          "Les appareils qui chauffent, comme un radiateur, un four ou une bouilloire, demandent beaucoup de puissance et vident vite la batterie. Une station ne remplace pas non plus une alimentation médicale vitale : dans ce cas, renseignez-vous auprès de votre fournisseur de matériel médical.",
        ],
      },
      {
        id: 'coupures-prolongees',
        title: 'Pendant une coupure prolongée',
        text: [
          "Une station ne produit pas d'énergie : elle restitue ce qu'elle a stocké. Si la coupure dure, réduisez la consommation au strict nécessaire et débranchez ce qui ne sert pas. Pour recharger la station sans le réseau électrique, il faut des panneaux solaires compatibles avec son entrée solaire, ou la prise allume-cigare d'un véhicule si la station l'accepte.",
          "Contrairement à un groupe électrogène, une station peut s'utiliser à l'intérieur, sans gaz d'échappement. Placez-la dans un endroit ventilé, à l'écart de la chaleur.",
        ],
      },
      {
        id: 'se-preparer',
        title: 'Se préparer avant la prochaine coupure',
        text: [
          "Gardez la station chargée et vérifiez régulièrement son niveau, selon les conseils de stockage de sa notice. Faites un essai à l'avance avec vos appareils : vous saurez combien de temps elle tient et si sa puissance de sortie suffit.",
        ],
      },
    ],
    faq: [
      { q: 'Combien de temps une station électrique tient-elle pendant une coupure ?', a: "Cela dépend de sa capacité et de ce que vous branchez. Divisez sa capacité en Wh par la puissance totale des appareils en W pour obtenir une durée théorique, puis retirez une marge pour les pertes." },
      { q: 'Peut-on brancher un réfrigérateur sur une station électrique ?', a: "C'est possible si la puissance de sortie de la station dépasse celle du réfrigérateur, y compris au démarrage du compresseur. Vérifiez l'étiquette de l'appareil et la fiche de la station, et calculez sa consommation sur la durée de la coupure." },
      { q: 'Une station électrique peut-elle alimenter toute la maison ?', a: "Non. Elle alimente les appareils branchés sur ses prises, dans la limite de sa puissance de sortie. Elle ne se raccorde pas au tableau électrique sans installation spécifique réalisée par un professionnel." },
    ],
  },
  {
    slug: 'chantier',
    group: 'usage',
    short: 'Chantier et outils',
    title: 'Stations électriques pour le chantier et les outils',
    h1: 'Quelle station électrique pour le chantier et les outils ?',
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
    h1: 'Petites stations électriques : moins de 500 Wh',
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
    sections: [
      {
        id: 'limites-de-puissance',
        title: 'Ce que ces stations ne peuvent pas alimenter',
        text: [
          "À cette capacité, la puissance de sortie est limitée, et elle varie du simple au double d'un modèle à l'autre (voir le tableau ci-dessous). Les appareils qui chauffent, comme une bouilloire, un radiateur, un sèche-cheveux ou une plaque de cuisson, demandent souvent plus que ce que ces stations peuvent fournir, et vident une batterie de cette taille en quelques minutes.",
          "Pour ces usages, regardez plutôt les modèles de 1000 Wh et plus, dont la puissance de sortie est plus élevée.",
        ],
      },
      {
        id: 'durees-theoriques',
        title: 'Combien de temps tient une petite station ?',
        text: [
          "Durée pour une station pleine, avec un seul appareil branché : capacité en Wh divisée par la puissance en W. Ce sont des calculs, pas des mesures, et ils ignorent les pertes de conversion. Notre calculateur de capacité les intègre avec une marge réglable.",
        ],
      },
    ],
    faq: [
      { q: 'Combien de temps tient une station de moins de 500 Wh ?', a: "Divisez sa capacité en Wh par la puissance de l'appareil en watts. Avec un appareil de 60 W, une station de 280 Wh tient en théorie environ 4,7 heures, avant de compter les pertes de conversion." },
      { q: 'Une petite station peut-elle alimenter un mini-frigo ?', a: "Un mini-frigo à compresseur de quelques dizaines de watts, oui, pour quelques heures. Il fonctionne par cycles : calculez sa consommation réelle avec notre calculateur plutôt que de compter 24 heures." },
      { q: 'Quelle différence entre 300 W et 600 W de puissance de sortie ?', a: "La puissance de sortie décide des appareils que l'on peut brancher, pas de la durée. Un appareil de 400 W ne fonctionne pas sur une station limitée à 300 W, même si sa batterie est pleine." },
    ],
  },
  {
    slug: '1000-a-1500-wh',
    group: 'capacite',
    short: '1000 à 1500 Wh',
    title: 'Stations électriques portables de 1000 à 1500 Wh',
    h1: 'Stations électriques polyvalentes de 1000 à 1500 Wh',
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
    h1: 'Grandes stations électriques : 2000 Wh et plus',
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

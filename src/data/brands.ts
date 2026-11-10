import type { Faq } from './selections';

// Contenu propre à chaque page marque. Chaque chiffre vient de products.json :
// si une fiche produit change, relire le texte de sa marque et mettre sa date à jour dans updates.mjs.

export interface BrandContent {
  intro: string[];
  chooseTitle: string;
  choose: string[];
  faq: Faq[];
}

export const BRAND_CONTENT: Record<string, BrandContent> = {
  Anker: {
    intro: [
      "Notre sélection compte deux stations de la gamme Anker SOLIX, et elles ne répondent pas du tout au même besoin : la C300X est un modèle d'appoint de 288 Wh, tandis que la C1000 Gen 2 monte à 1024 Wh.",
    ],
    chooseTitle: 'C300X ou C1000 Gen 2 : laquelle choisir ?',
    choose: [
      "La C300X convient quand on veut recharger de petits appareils : ordinateur portable, téléphones, lampes. Son guide officiel annonce 300 W en continu sur ses prises 230 V, et jusqu'à 600 W avec la fonction SurgePad. Elle pèse 4,13 kg et accepte un panneau solaire de 100 W au maximum. Un appareil qui demande plus de 300 W en continu dépasse sa puissance : vérifiez l'étiquette de vos appareils avant de choisir.",
      "La C1000 Gen 2 vise les usages plus exigeants : 2000 W en continu d'après sa fiche Amazon, soit de quoi alimenter des appareils bien plus gourmands, et une entrée solaire de 600 W. Elle pèse 11,3 kg : elle se déplace, mais on ne la porte pas longtemps à la main.",
      "Sa recharge complète annoncée en 49 minutes demande le mode UltraFast, activé depuis l'application. Hors de ce mode, la charge sur secteur est limitée à 1200 W.",
    ],
    faq: [
      {
        q: 'Peut-on ajouter une batterie à la C1000 Gen 2 ?',
        a: "Non, d'après sa fiche Amazon : ce modèle n'accepte pas de batterie d'extension. Si vous pensez avoir besoin de plus de capacité plus tard, regardez plutôt la sélection de 2000 Wh et plus.",
      },
      {
        q: 'La C300X peut-elle remplacer une prise de maison ?',
        a: "Pas pour tous les appareils. Ses prises 230 V sont limitées à 300 W en continu et ses 288 Wh s'épuisent vite avec un appareil puissant. Elle reste un modèle d'appoint.",
      },
    ],
  },
  Bluetti: {
    intro: [
      "Les trois modèles Bluetti de notre sélection couvrent presque tous les formats : la petite EB3A de 268 Wh, l'AC180 de 1152 Wh et l'Elite 200 V2 de 2073 Wh. C'est la plus grande amplitude de capacité de notre sélection pour une même marque.",
    ],
    chooseTitle: 'EB3A, AC180 ou Elite 200 V2 : laquelle choisir ?',
    choose: [
      "L'EB3A correspond à un usage léger : c'est la plus petite capacité de notre sélection, avec 268 Wh, 600 W en continu et une entrée solaire de 200 W d'après Bluetti. Attention : le site Bluetti France indique que sa production est arrêtée. Vérifiez sa disponibilité avant de la retenir.",
      "L'AC180 est le format intermédiaire : 1152 Wh et 1800 W en continu d'après sa fiche officielle, avec une recharge sur secteur jusqu'à 1440 W et une entrée solaire de 500 W. Son tableau technique indique 16 kg, et la garantie est de 5 ans.",
      "L'Elite 200 V2 est la plus puissante de notre sélection, avec 2600 W en continu et jusqu'à 3900 W en mode Power Lifting selon sa fiche officielle. Elle accepte 1000 W de panneaux solaires et pèse 24,2 kg : elle est plutôt faite pour rester à poste, dans un fourgon ou à la maison, que pour être portée souvent.",
    ],
    faq: [
      {
        q: 'Que signifie le mode Power Lifting de l\'AC180 ?',
        a: "D'après Bluetti, ce mode permet de faire fonctionner des appareils chauffants jusqu'à 2700 W, comme un radiateur électrique ou un sèche-cheveux, contre 1800 W en continu sans lui. Nous ne l'avons pas testé : consultez la notice pour les autres types d'appareils.",
      },
      {
        q: 'Quelle Bluetti tient le plus longtemps ?',
        a: "L'Elite 200 V2 a la plus grande capacité des trois, et sa fiche Amazon annonce plus de 6000 cycles. La durée réelle dépend toujours de la puissance demandée.",
      },
    ],
  },
  EcoFlow: {
    intro: [
      "Notre sélection retient deux stations EcoFlow, une par gamme : la River 3 Plus, petite et extensible, et la DELTA 3 Plus, d'environ 1000 Wh, dont la fiche officielle annonce une entrée solaire élevée.",
    ],
    chooseTitle: 'River 3 Plus ou DELTA 3 Plus : laquelle choisir ?',
    choose: [
      "La River 3 Plus démarre à 286 Wh, et peut monter jusqu'à 858 Wh avec une batterie additionnelle. C'est intéressant si vos besoins sont petits aujourd'hui mais peuvent grandir. D'après sa fiche officielle, elle fournit 600 W en continu sur trois prises 230 V, pèse 4,7 kg et se recharge sur secteur en 60 minutes.",
      "La DELTA 3 Plus offre 1024 Wh et 1800 W en continu d'après sa fiche officielle, avec une recharge complète sur secteur annoncée en 56 minutes. Son point marquant est son entrée solaire, jusqu'à 1000 W avec deux entrées de 500 W : aucun modèle de notre sélection n'en annonce davantage. Elle a donc du sens si vous prévoyez plusieurs panneaux, en van ou en camping-car par exemple.",
      "Avant d'acheter des panneaux, calculez ce que votre installation produira vraiment : une entrée solaire de 1000 W est une limite maximale, pas une production garantie.",
    ],
    faq: [
      {
        q: "Peut-on augmenter la capacité d'une EcoFlow ?",
        a: "Oui pour les deux. La River 3 Plus peut atteindre 858 Wh avec une batterie additionnelle, d'après sa fiche officielle. La DELTA 3 Plus est extensible jusqu'à 5 kWh avec des batteries additionnelles compatibles, d'après sa fiche officielle.",
      },
      {
        q: 'Que signifie le mode X-Boost de la River 3 Plus ?',
        a: "La fiche officielle indique 1200 W avec ce mode, contre 600 W en continu sans lui. Il ne convient pas forcément à tous les appareils : consultez la notice du fabricant.",
      },
    ],
  },
  Jackery: {
    intro: [
      "Notre sélection compte trois stations Jackery, de 288 à 2042 Wh. L'Explorer 1000 v2 est celle dont nous avons le plus de détails, car ses valeurs viennent de la fiche officielle du fabricant. Les deux autres ont été vérifiées sur les pages officielles de Jackery, sauf mention contraire.",
    ],
    chooseTitle: 'Explorer 300D, 1000 v2 ou 2000 v2 : laquelle choisir ?',
    choose: [
      "L'Explorer 300D est à part : elle n'a aucune prise 230 V. Elle fournit de l'USB-C, de l'USB-A et du 12 V, et elle est vendue avec un panneau de 100 W. Elle pèse 2,5 kg, n'a pas de ventilateur et accepte un seul panneau de 100 W au maximum. Elle convient aux appareils qui se rechargent en USB, pas à ceux qui se branchent sur une prise classique.",
      "L'Explorer 1000 v2 est le modèle polyvalent : 1070 Wh, 1500 W en continu, 400 W d'entrée solaire et 10,8 kg. Sa fiche officielle annonce une recharge en 1,7 h, ou en 1 h avec le mode urgence de l'application, et 4000 cycles jusqu'à 70 % de capacité.",
      "L'Explorer 2000 v2 s'adresse aux besoins importants : 2042 Wh et 2200 W en continu d'après sa fiche officielle, avec une recharge sur secteur en 1,7 h. Elle n'est pas extensible : il n'existe pas de batterie additionnelle pour ce modèle.",
    ],
    faq: [
      {
        q: "L'Explorer 300D peut-elle alimenter un appareil 230 V ?",
        a: "Non : sa fiche officielle précise qu'elle n'a aucune sortie 230 V, seulement de l'USB-C, de l'USB-A et une sortie 12 V. Pour un appareil à brancher sur une prise classique, il faut un modèle avec prises CA.",
      },
      {
        q: "Quelle garantie pour l'Explorer 1000 v2 ?",
        a: "La fiche officielle de Jackery indique 3 + 2 ans. Consultez ses conditions de garantie pour le détail.",
      },
    ],
  },
};

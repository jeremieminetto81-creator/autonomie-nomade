// Date de dernière modification du CONTENU de chaque page (pas du style).
// Elle alimente la date affichée, les données des articles et le sitemap.
// Quand tu modifies le texte ou les produits d'une page, mets sa date à jour ici.
export const DEFAULT_UPDATE = '2026-11-01';

export const PAGE_UPDATES = {
  '/': '2026-11-10',
  '/station-electrique-portable-1000-wh/': '2026-11-07',
  '/quelle-capacite-station-electrique/': '2026-11-10',
  '/station-electrique-portable-vs-groupe-electrogene/': '2026-11-10',
  '/panneau-solaire-portable-station-electrique/': '2026-11-10',
  '/selection/': '2026-11-10',
  '/selection/camping-randonnee/': '2026-11-10',
  '/selection/van-camping-car/': '2026-11-10',
  '/selection/coupure-de-courant/': '2026-11-10',
  '/selection/chantier/': '2026-11-10',
  '/selection/moins-de-500-wh/': '2026-11-10',
  '/selection/1000-a-1500-wh/': '2026-11-10',
  '/selection/2000-wh-et-plus/': '2026-11-10',
  '/marque/anker/': '2026-11-10',
  '/marque/bluetti/': '2026-11-10',
  '/marque/ecoflow/': '2026-11-10',
  '/marque/jackery/': '2026-11-10',
};

/** Date ISO (AAAA-MM-JJ) de la page, ou la date par défaut. */
export const updatedOn = (path) => PAGE_UPDATES[path] ?? DEFAULT_UPDATE;

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
/** « 2026-11-01 » devient « 1er novembre 2026 ». */
export const frDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d === 1 ? '1er' : d} ${MONTHS[m - 1]} ${y}`;
};

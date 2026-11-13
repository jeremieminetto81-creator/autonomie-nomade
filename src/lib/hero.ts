import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Images d'ambiance des pages (src/assets/hero). Ce sont des illustrations générées par IA :
// elles ne représentent aucun produit réel de la sélection (voir la page « Notre méthode »).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/hero/*.webp', { eager: true });

const BY_PATH: Record<string, string> = {
  '/': 'accueil',
  '/quelle-capacite-station-electrique/': 'capacite',
  '/station-electrique-portable-vs-groupe-electrogene/': 'groupe-electrogene',
  '/panneau-solaire-portable-station-electrique/': 'solaire',
  '/station-electrique-portable-1000-wh/': '1000-wh',
  '/selection/': 'marques',
  '/selection/camping-randonnee/': 'camping',
  '/selection/van-camping-car/': 'van',
  '/selection/coupure-de-courant/': 'coupure',
  '/selection/chantier/': 'chantier',
  '/selection/moins-de-500-wh/': 'moins-500',
  '/selection/1000-a-1500-wh/': '1000-1500',
  '/selection/2000-wh-et-plus/': '2000-wh',
};

const ALT: Record<string, string> = {
  accueil: 'Illustration : station électrique portable posée dans un van, au coucher du soleil',
  capacite: 'Illustration : station électrique portable alimentant un ordinateur, une lampe et un téléphone',
  'groupe-electrogene': 'Illustration : station électrique portable à l\'intérieur, groupe électrogène dehors sous la pluie',
  solaire: 'Illustration : panneau solaire pliable relié à une station électrique portable, en montagne',
  '1000-wh': 'Illustration : deux stations électriques portables côte à côte',
  camping: 'Illustration : station électrique portable et lanterne devant une tente, au crépuscule',
  van: 'Illustration : van aménagé de nuit, une station électrique portable éclaire l\'intérieur',
  coupure: 'Illustration : station électrique portable alimentant une lampe et une box internet pendant une coupure',
  chantier: 'Illustration : station électrique portable alimentant une scie circulaire sur un chantier',
  'moins-500': 'Illustration : petite station électrique portable posée sur un sac à dos, en montagne',
  '1000-1500': 'Illustration : station électrique portable alimentant une cafetière dans un van',
  '2000-wh': 'Illustration : grande station de stockage d\'énergie éclairée par un rayon de soleil',
  marques: 'Illustration : trois stations électriques portables de tailles différentes',
};

export const heroKeyFor = (path: string) => (path.startsWith('/marque/') ? 'marques' : BY_PATH[path]);

/** Image d'ambiance en plusieurs largeurs (WebP), à utiliser avec `sizes`. */
export async function hero(key: string, widths = [640, 1100, 1672]) {
  const meta = files[`../assets/hero/${key}.webp`].default;
  const imgs = await Promise.all(widths.map((w) => getImage({ src: meta, width: w, format: 'webp', quality: 70 })));
  return {
    src: imgs[imgs.length - 1].src,
    srcset: imgs.map((im, i) => `${im.src} ${widths[i]}w`).join(', '),
    width: meta.width,
    height: meta.height,
    alt: ALT[key],
  };
}

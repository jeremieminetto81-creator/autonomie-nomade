// Génère les images de partage (1200 x 630) dans public/og/ avec Chrome, aux couleurs du site.
// À relancer quand on ajoute un guide : node scripts/og-images.mjs
import { mkdirSync } from 'node:fs';
import * as chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

const pages = [
  { slug: 'default', kicker: 'Guides indépendants', title: 'Choisir sa station électrique portable sans se tromper' },
  { slug: 'quelle-capacite-station-electrique', kicker: 'Guide et calculateur', title: 'Quelle capacité de station électrique choisir ?' },
  { slug: 'station-electrique-portable-vs-groupe-electrogene', kicker: 'Comparatif', title: 'Station électrique ou groupe électrogène ?' },
  { slug: 'panneau-solaire-portable-station-electrique', kicker: 'Guide et calculateur', title: 'Quel panneau solaire pour sa station ?' },
  { slug: 'station-electrique-portable-1000-wh', kicker: 'Comparatif', title: 'Station électrique 1000 Wh : Jackery ou Anker ?' },
  { slug: 'selection', kicker: 'Sélection', title: 'Notre sélection de stations électriques portables' },
];

// Espaces insécables avant « ? : ! » et entre un nombre et « Wh », comme en typographie française.
const nbsp = (s) => s.replace(/ ([?:!])/g, ' $1').replace(/(\d) Wh/g, '$1 Wh');

const html = (p) => `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;width:1200px;height:630px;background:#fbf7f2;font-family:"Segoe UI",system-ui,sans-serif;color:#2a211b;display:flex}
.l{flex:1;padding:70px 0 60px 80px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:16px;font-size:34px;font-weight:700}
.mark{width:56px;height:56px;border-radius:12px;background:#b23c0a;display:flex;align-items:center;justify-content:center}
.k{margin-top:auto;font-size:30px;color:#b23c0a;font-weight:700;text-transform:uppercase;letter-spacing:2px}
h1{font-size:62px;line-height:1.12;margin:14px 0 0;max-width:680px}
.r{width:380px;background:#fbe9df;display:flex;align-items:center;justify-content:center}
</style></head><body><div class="l">
<div class="brand"><span class="mark"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM22 11v2M11 9l-2 3h3l-2 3"/></svg></span>Autonomie Nomade</div>
<div class="k">${p.kicker}</div><h1>${nbsp(p.title)}</h1></div>
<div class="r"><svg width="300" height="228" viewBox="0 0 92 70"><rect x="30" y="5" width="32" height="10" rx="3" fill="none" stroke="#b23c0a" stroke-width="3"/><rect x="6" y="14" width="80" height="50" rx="8" fill="#fff" stroke="#b23c0a" stroke-width="3"/><rect x="15" y="25" width="30" height="17" rx="3" fill="#2a211b"/><path d="M31 28l-4 6h4l-3 5" stroke="#fbf7f2" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="57" cy="33" r="4" fill="#b23c0a"/><circle cx="71" cy="33" r="4" fill="#0f766e"/><rect x="15" y="49" width="62" height="6" rx="3" fill="#eadfd2"/></svg></div>
</body></html>`;

mkdirSync('public/og', { recursive: true });
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new'] });
const browser = await puppeteer.connect({ browserURL: `http://localhost:${chrome.port}` });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
for (const p of pages) {
  await page.setContent(html(p));
  await page.screenshot({ path: `public/og/${p.slug}.png` });
  console.log(`public/og/${p.slug}.png`);
}
await browser.disconnect();
await chrome.kill();

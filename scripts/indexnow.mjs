// Signale à IndexNow (Bing, Yandex, Seznam…) les pages du sitemap après une mise en ligne.
// Usage : node scripts/indexnow.mjs   (le fichier de clé public/c3c672cdf9b825cceca407b4e177df9b.txt doit déjà être en ligne)
const SITE = process.env.SITE_URL || 'https://autonomie-nomade.autonomie-nomade.workers.dev';
const KEY = 'c3c672cdf9b825cceca407b4e177df9b';

const xml = await (await fetch(`${SITE}/sitemap-0.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow : ${urlList.length} URL envoyées, réponse ${res.status} ${res.statusText}`);
if (!res.ok) process.exit(1);

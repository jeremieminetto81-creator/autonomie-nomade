// Lighthouse (mobile et desktop) + axe (accessibilité) sur les pages principales, avec un petit serveur local sur dist/.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { readFileSync } from 'node:fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

const MIN = 90;
const pages = ['/', '/quelle-capacite-station-electrique/', '/station-electrique-portable-vs-groupe-electrogene/', '/panneau-solaire-portable-station-electrique/', '/station-electrique-portable-1000-wh/', '/selection/', '/a-propos/'];
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.xml': 'application/xml', '.txt': 'text/plain' };

const server = http.createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = join('dist', p);
  if (!existsSync(file)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  res.end(await readFile(file));
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
let failed = false;

for (const preset of ['mobile', 'desktop']) {
  for (const path of pages) {
    const config = preset === 'desktop' ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined;
    const { lhr } = await lighthouse(base + path, { port: chrome.port, logLevel: 'error', output: 'json' }, config);
    const s = Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
    const low = Object.entries(s).filter(([, v]) => v < MIN);
    console.log(`${preset.padEnd(8)} ${path.padEnd(40)} perf ${s.performance} · a11y ${s.accessibility} · bonnes pratiques ${s['best-practices']} · SEO ${s.seo}`);
    if (low.length) failed = true;
  }
}

const browser = await puppeteer.connect({ browserURL: `http://localhost:${chrome.port}` });
const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
for (const path of pages) {
  const page = await browser.newPage();
  await page.goto(base + path);
  await page.evaluate(axeSource);
  const res = await page.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }));
  console.log(`axe ${path.padEnd(40)} ${res.violations.length} violation(s)`);
  for (const v of res.violations) { console.log(`  - ${v.id} (${v.impact}) : ${v.help} [${v.nodes.length}]`); failed = true; }
  await page.close();
}
await browser.disconnect();
await chrome.kill();
server.close();
if (failed) process.exit(1);
console.log('Lighthouse et axe : OK');

// Vérifie public/_headers (en-têtes de sécurité, CSP stricte) et que les pages construites respectent cette CSP.
import { readFileSync } from 'node:fs';
import { htmlFiles } from './lib.mjs';

let errors = 0;
const fail = (m) => { console.error(m); errors++; };

const headers = readFileSync('public/_headers', 'utf8');
const required = [
  'Strict-Transport-Security',
  'Content-Security-Policy',
  'X-Content-Type-Options: nosniff',
  'X-Frame-Options',
  'Referrer-Policy',
  'Permissions-Policy',
];
for (const h of required) if (!headers.includes(h)) fail(`En-tête manquant : ${h}`);

const csp = (headers.match(/Content-Security-Policy:\s*(.+)/) || [])[1] || '';
for (const bad of ["'unsafe-inline'", "'unsafe-eval'", '*']) {
  if (csp.split(/\s+/).includes(bad)) fail(`CSP trop permissive : ${bad}`);
}
for (const must of ["default-src 'self'", "frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'"]) {
  if (!csp.includes(must)) fail(`CSP sans : ${must}`);
}

// La CSP bloque script/style inline : on s'assure que les pages n'en contiennent pas.
for (const file of htmlFiles()) {
  const html = readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script\b([^>]*)>/g)].map((m) => m[1]);
  for (const attrs of scripts) {
    if (!/\bsrc=/.test(attrs) && !/type="application\/ld\+json"/.test(attrs)) fail(`Script inline : ${file}`);
  }
  if (/<style\b/.test(html)) fail(`Balise <style> inline : ${file}`);
  if (/\sstyle="/.test(html)) fail(`Attribut style inline : ${file}`);
  if (/\son[a-z]+="/.test(html)) fail(`Gestionnaire d'événement inline : ${file}`);
  for (const m of html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)) {
    const host = new URL(m[1]).hostname;
    if (/\.(js|css|woff2?)$/.test(new URL(m[1]).pathname)) fail(`Ressource tierce ${host} dans ${file}`);
  }
}

if (errors) process.exit(1);
console.log('En-têtes de sécurité et CSP : OK');

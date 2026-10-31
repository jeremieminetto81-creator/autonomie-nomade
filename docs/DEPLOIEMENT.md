# Mettre le site en ligne sur Netlify (pas à pas)

Tu fais les actions dans ton compte Netlify. Rien n'est créé ni publié à ta place.

## Avant de commencer : ce qui doit être prêt
1. Compte Programme Partenaires Amazon **approuvé**, avec ton identifiant (ex. `monsite-21`).
2. Mention Amazon comparée mot pour mot au contrat (voir `docs/CONFORMITE.md`).
3. Champs `[À COMPLÉTER]` remplis : e-mail de contact (`src/config.ts`, `public/.well-known/security.txt`), hébergeur dans `src/pages/mentions-legales.astro`, présentation de l'auteur dans `src/pages/a-propos.astro`, politique de confidentialité.
4. Nom du site : remplace `[NOM DU SITE]` dans `src/config.ts`.

Le garde-fou `npm run check:prod` refuse la publication en production tant qu'il reste `VOTRE-TAG-21`, `VOTRE-SITE`, `[À COMPLÉTER` ou `[NOM DU SITE]`. Tu peux le lancer toi-même après `npm run build` pour voir ce qu'il reste.

## Option A : depuis un dépôt GitHub (recommandé)
Les mises à jour se publient à chaque envoi de code, et l'intégration continue tourne.
1. Crée un dépôt GitHub **privé** (compte à ton nom). Dis-moi quand il existe : je ne pousse rien sans ton accord.
2. Sur Netlify : *Add new site* > *Import an existing project* > GitHub > choisis le dépôt.
3. Les réglages viennent de `netlify.toml` (commande de build, dossier `dist`, Node 24). Ne les change pas.
4. Dans *Site configuration* > *Environment variables*, ajoute :
   - `AMAZON_TAG` = ton identifiant partenaire
   - `SITE_URL` = l'adresse publique du site, sans slash final (ex. `https://monsite.netlify.app` puis ton domaine)
5. Lance un déploiement. S'il échoue avec « publication refusée », lis la liste : ce sont les champs à compléter.

## Option B : envoi manuel du dossier `dist`
1. Définis `AMAZON_TAG` et `SITE_URL` dans ton terminal, puis lance `npm run build` et `npm run check:prod`.
2. Sur Netlify : *Add new site* > *Deploy manually* et glisse le dossier `dist`.
   Les en-têtes de sécurité (`_headers`) sont inclus dans `dist`.
3. À refaire à chaque modification.

## Domaine
1. Achète ou ajoute ton domaine dans Netlify : *Domain management* > *Add a domain*.
2. Une fois le domaine actif, remets `SITE_URL` à jour avec le nouveau domaine et relance un déploiement : les adresses canoniques, le sitemap et `robots.txt` en dépendent.
3. Le HTTPS est géré automatiquement par Netlify.

## Après la mise en ligne
- Vérifie les en-têtes sur `https://securityheaders.com` et la CSP dans la console du navigateur (aucune erreur).
- Ouvre `/sitemap-index.xml` et `/robots.txt` pour vérifier l'adresse.
- Ajoute le site à Google Search Console (propriété « domaine » ou « préfixe d'URL ») et envoie `sitemap-index.xml`.
- Ouvre un lien Amazon du site : l'URL doit contenir ton `tag=`.
- Relis les pages légales avec les vraies valeurs.

## Bon à savoir
- Netlify peut être proposé avec des options payantes ou des dépassements : lis les limites de l'offre gratuite avant de t'inscrire.
- Les serveurs de Netlify peuvent se trouver hors de l'Union européenne : renseigne ce point dans la politique de confidentialité après avoir lu la sienne.

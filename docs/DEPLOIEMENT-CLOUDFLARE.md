# Mettre le site en ligne sur Cloudflare (pas à pas)

Tu fais les actions dans ton compte Cloudflare. Rien n'est créé ni publié à ta place.
Ce qui est déjà prêt dans le dépôt : `wrangler.jsonc` (dossier `dist/`, page 404), `.node-version`,
`public/.assetsignore`, `public/_headers` (sécurité) et le script qui écrit les redirections 301 au build.

## Avant de commencer
1. Un compte Cloudflare gratuit (e-mail + mot de passe de ton choix, jamais communiqués à Claude).
2. Ton dépôt GitHub `autonomie-nomade` à jour (la branche `main`).

## Étapes
1. Va sur **dash.cloudflare.com**, crée le compte et valide ton e-mail.
2. Menu **Compute > Workers & Pages** (ou « Workers & Pages »). Si Cloudflare te demande de choisir un sous-domaine
   `workers.dev`, choisis-le : c'est la partie de l'adresse après le nom du site.
3. **Create application** > **Import a repository** (ou « Connect to Git »), connecte GitHub et autorise uniquement le dépôt `autonomie-nomade`.
4. Nom du projet : `autonomie-nomade` **exactement** (il doit être identique au champ `name` de `wrangler.jsonc`, sinon le build échoue).
5. Réglages de build :
   - Build command : `npm run build:prod`
   - Deploy command : `npx wrangler deploy`
   - Branche de production : `main`
6. Variables de build (« Build variables and secrets ») :
   - `SITE_URL` = `https://autonomie-nomade.TON-SOUS-DOMAINE.workers.dev` (sans slash final)
   - `AMAZON_TAG` = ton identifiant Amazon (ex. `monsite-21`)
   - `CI_PRODUCTION` = `true`
7. **Save and Deploy**. L'adresse du site s'affiche quand le déploiement a réussi.
8. Si le premier build échoue avec « publication refusée », c'est le garde-fou : une variable manque ou `SITE_URL` est faux.
   Corrige dans **Settings > Build > Variables and secrets**, puis relance.

## Après la mise en ligne
- Search Console : ajoute une **nouvelle propriété « Préfixe de l'URL »** avec la nouvelle adresse (la balise de validation est dans le site), puis envoie `sitemap-index.xml`.
- Bing Webmaster Tools : importe la nouvelle propriété depuis la Search Console.
- Programme Partenaires Amazon : ajoute la nouvelle adresse dans la liste de tes sites.
- Ancien site Netlify : une fois le nouveau vérifié, supprime-le (ou mets-le hors ligne) pour éviter deux copies du site chez Google.
- Demande à Claude de signaler les nouvelles adresses à IndexNow (`SITE_URL=… npm run indexnow`).

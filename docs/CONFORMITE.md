# Checklist de conformité (base à faire valider, pas une garantie)

Je ne suis pas juriste. Cette liste sert à vérifier point par point avant toute publication.

## Bloquants avant mise en ligne
- [ ] Compte Programme Partenaires Amazon approuvé et tag réel dans `AMAZON_TAG`.
- [ ] Mention Amazon (`src/config.ts`) comparée MOT POUR MOT au contrat opérationnel actuel (section « S'identifier comme Partenaire »). Texte relevé via sources secondaires : iubenda.com, wizishop.fr.
- [ ] Contrat Amazon relu : conditions d'acceptation et de maintien du compte (ventes qualifiantes dans un délai donné), usage des images, interdiction de copier prix et disponibilité.
- [ ] Hébergeur renseigné dans les mentions légales (nom, adresse, téléphone) et identité de l'éditeur communiquée à l'hébergeur (LCEN art. 6-III, statut non professionnel).
- [ ] E-mail de contact renseigné (`EDITOR_EMAIL`).
- [ ] Durée de conservation des journaux et transferts hors UE de l'hébergeur lus dans sa politique.
- [ ] Section « Qui écrit ici » complétée.
- [ ] `security.txt` : contact renseigné.
- [ ] ASIN ouverts un par un sur Amazon.fr et caractéristiques comparées à la fiche constructeur.

## Points à faire valider par un professionnel
- Le statut « non professionnel » reste-t-il vrai si les revenus d'affiliation augmentent ? Des revenus réguliers peuvent changer le régime fiscal et le statut de l'éditeur (service-public.fr, impots.gouv.fr).
- Aucun cookie déposé par ce site : à re-vérifier si un outil est ajouté. Un lien sortant vers Amazon ne dépose pas de cookie sur ce site ; les cookies d'Amazon relèvent de sa propre politique.

## Mesure d'audience (non activée)
Conditions CNIL pour une mesure exemptée de consentement (fiche n°16, cnil.fr) : finalité limitée à la mesure d'audience, dernier octet de l'IP tronqué, traceurs de 13 mois maximum, information des utilisateurs, droit d'opposition, pas de recoupement avec d'autres traitements ni d'autres sites. Ne rien activer sans vérifier l'outil et le mettre à jour dans `confidentialite.astro` et dans la CSP (`public/_headers`).

## Affiliation (DGCCRF, Code de la consommation)
- [x] Mention d'affiliation en en-tête de page (composant `Disclosure`) et en pied de page.
- [x] Page « Notre méthode » : critères, ce qui n'est pas testé, financement.
- [x] Liens en `rel="sponsored nofollow noopener"` (contrôlé par `npm run check:affiliate`).
- [x] Aucun prix écrit en dur.
- [ ] Aucun mot « testé » sauf test réel.
- [ ] Aucune fausse urgence ni fausse promotion.

## Sources consultées
- LCEN art. 6-III : explications de cms.law, gocardless.com, senat.fr (pas Légifrance directement).
- CNIL fiche n°16 : https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications
- Contrat Amazon : sources secondaires uniquement (iubenda.com, wizishop.fr).
- DGCCRF : articles de presse sur les contenus sponsorisés ; rien de spécifique aux liens affiliés trouvé.

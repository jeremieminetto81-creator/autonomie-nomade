# products.json

Un seul fichier pour tous les produits. Les pages le lisent : changer un produit ou un lien ne demande jamais de toucher aux articles.

Champs d'un produit (une donnée inconnue vaut `"à vérifier"`, jamais une valeur devinée) :

```json
{
  "id": "slug-unique",
  "name": "Nom exact du produit",
  "brand": "Marque",
  "asin": "B0XXXXXXXX",
  "capacityWh": "à vérifier",
  "outputW": "à vérifier",
  "batteryType": "à vérifier",
  "solarInputW": "à vérifier",
  "strengths": ["à vérifier"],
  "limits": ["à vérifier"],
  "lastChecked": "AAAA-MM-JJ",
  "source": "URL de la fiche constructeur ou Amazon"
}
```

- Aucun prix ici : Amazon interdit de les copier à la main.
- Si `asin` est `"à vérifier"`, le lien affilié devient une recherche Amazon sur le nom du produit.

import { AMAZON_TAG } from '../config';

export function amazonUrl(product: { asin?: string; name: string }): string {
  const tag = encodeURIComponent(AMAZON_TAG);
  const asin = product.asin?.trim();
  if (asin && /^[A-Z0-9]{10}$/.test(asin)) {
    return `https://www.amazon.fr/dp/${asin}?tag=${tag}`;
  }
  return `https://www.amazon.fr/s?k=${encodeURIComponent(product.name)}&tag=${tag}`;
}

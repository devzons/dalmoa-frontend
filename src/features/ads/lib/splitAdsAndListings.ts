import type { AdItem } from "@/features/ads/types/ad";

function isAdItem(item: unknown): item is AdItem {
  if (!item || typeof item !== "object") return false;

  const value = item as Partial<AdItem>;

  return Boolean(value.adPlan || value.priority);
}

export function splitAdsAndListings<T>(
  items: T[],
): {
  ads: AdItem[];
  listings: T[];
} {
  const ads: AdItem[] = [];
  const listings: T[] = [];

  items.forEach((item) => {
    if (isAdItem(item)) {
      ads.push(item);
      return;
    }

    listings.push(item);
  });

  return { ads, listings };
}
// src/features/ads/lib/selectAds.ts

import type { AdItem } from "@/features/ads/types/ad";
import { sortAdsByPriority } from "./sortAdsByPriority";

type Options = {
  limit?: number;
  diversify?: boolean; // 동일 광고 반복 방지
};

export function selectAds(
  items: AdItem[],
  { limit = 4, diversify = true }: Options = {}
): AdItem[] {
  if (!items || items.length === 0) return [];

  const sorted = sortAdsByPriority(items);

  if (!diversify) {
    return sorted.slice(0, limit);
  }

  const selected: AdItem[] = [];
  const seen = new Set<number>();

  for (const ad of sorted) {
    if (!ad?.id) continue;
    if (seen.has(ad.id)) continue;

    selected.push(ad);
    seen.add(ad.id);

    if (selected.length >= limit) break;
  }

  return selected;
}
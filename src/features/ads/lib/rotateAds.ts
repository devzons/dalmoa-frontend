import type { AdItem } from "@/features/ads/types/ad";

export function rotateAds(items: AdItem[]): AdItem[] {
  if (!items.length) return [];

  const minute = Math.floor(Date.now() / 60000); // 1분 단위 회전
  const offset = minute % items.length;

  return [...items.slice(offset), ...items.slice(0, offset)];
}
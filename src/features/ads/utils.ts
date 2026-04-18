import type { AdItem } from "@/features/ads/types";

export function hasAdThumbnail(item: AdItem) {
  return Boolean(item.thumbnailUrl);
}

export function getAdHref(item: AdItem, locale: "ko" | "en") {
  if (!item.ctaUrl) {
    return `/${locale}/ads`;
  }

  if (item.ctaUrl.startsWith("/")) {
    return item.ctaUrl;
  }

  return item.ctaUrl;
}
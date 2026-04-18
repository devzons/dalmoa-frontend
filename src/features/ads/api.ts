import type { AdItem, AdsResponse } from "@/features/ads/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getAds(locale: "ko" | "en" = "ko") {
  return apiFetch<AdsResponse>(`${endpoints.adsList}?locale=${locale}`, {
    revalidate: 120,
    tags: [cacheTags.adsList],
  });
}

export async function getFeaturedAds(locale: "ko" | "en" = "ko") {
  return apiFetch<AdItem[]>(`${endpoints.adsFeatured}?locale=${locale}`, {
    revalidate: 120,
    tags: [cacheTags.adsFeatured],
  });
}
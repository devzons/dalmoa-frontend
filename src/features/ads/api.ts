import type { AdItem, AdsResponse } from "@/features/ads/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getAds(locale: "ko" | "en" = "ko") {
  return apiFetch<AdsResponse>(`${endpoints.adsList}?locale=${locale}`, {
    next: {
      revalidate: 120,
      tags: [cacheTags.adsList],
    },
  });
}

export async function getFeaturedAds(locale: "ko" | "en" = "ko") {
  return apiFetch<AdItem[]>(`${endpoints.adsFeatured}?locale=${locale}`, {
    next: {
      revalidate: 120,
      tags: [cacheTags.adsFeatured],
    },
  });
}

export async function getAdBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<AdItem>(
    `${endpoints.adsDetail(slug)}?locale=${locale}`,
    {
      next: {
        revalidate: 120,
        tags: [cacheTags.adsDetail(slug)],
      },
    }
  );
}

// SUBSCRIPTION

export async function cancelSubscription(postId: number) {
  return apiFetch<{ ok: boolean }>(`${endpoints.cancelSubscription}`, {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
}

export async function resumeSubscription(postId: number) {
  return apiFetch<{ ok: boolean }>(`${endpoints.resumeSubscription}`, {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
}

export async function syncSubscription(postId: number) {
  return apiFetch<{ ok: boolean }>(`${endpoints.syncSubscription}`, {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
}
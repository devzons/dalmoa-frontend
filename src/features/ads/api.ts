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

// 🔥 추가 (핵심)
export async function getAdBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<AdItem>(
    `${endpoints.adsList}/${slug}?locale=${locale}`
  );
}

// SUBSCRIPTION

export async function cancelSubscription(postId: number) {
  return apiFetch<{ ok: boolean }>(`/dalmoa/v1/subscriptions/cancel`, {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
}

export async function resumeSubscription(postId: number) {
  return apiFetch<{ ok: boolean }>(`/dalmoa/v1/subscriptions/resume`, {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
}

export async function syncSubscription(postId: number) {
  return apiFetch<{ ok: boolean }>(`/dalmoa/v1/subscriptions/sync`, {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
}
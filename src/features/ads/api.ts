import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { AdItem } from "@/features/ads/types/ad";

type AdsResponse = {
  featured: AdItem[];
  standard: AdItem[];
};

export async function getAds(locale: "ko" | "en"): Promise<AdsResponse | null> {
  const searchParams = new URLSearchParams({
    lang: locale,
  });

  return apiFetch<AdsResponse>(`${endpoints.adsList}?${searchParams.toString()}`, {
    next: {
      revalidate: 120,
      tags: ["ads-list"],
    },
  });
}

export async function getAdBySlug(
  slug: string,
  locale: "ko" | "en",
): Promise<AdItem | null> {
  const searchParams = new URLSearchParams({
    lang: locale,
  });

  return apiFetch<AdItem>(
    `${endpoints.adsDetail(slug)}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 0,
        tags: [`ads-${slug}`],
      },
    },
  );
}

export * from "./api/createAdCheckout";
export * from "./api/getAds";
export * from "./api/getFeaturedAds";
export * from "./api/getAdBySlug";
export * from "./api/trackAdEvent";
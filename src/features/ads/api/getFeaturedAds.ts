import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";
import type { AdItem } from "@/features/ads/types/ad";

type PaginatedApiResponse<T> = {
  items?: T[];
};

type MaybePaginated<T> = T[] | PaginatedApiResponse<T>;

function unwrapItems<T>(data: MaybePaginated<T> | null | undefined): T[] {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
}

export async function getFeaturedAds(locale: "ko" | "en"): Promise<AdItem[]> {
  const searchParams = new URLSearchParams({
    lang: locale,
  });

  const data = await apiFetch<MaybePaginated<AdItem>>(
    `${endpoints.adsFeatured}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 120,
        tags: [cacheTags.adsFeatured],
      },
    },
  );

  return unwrapItems(data);
}
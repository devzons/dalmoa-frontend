import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { AdItem } from "@/features/ads/types/ad";

type PaginatedApiResponse<T> = {
  items?: T[];
};

type MaybePaginated<T> = T[] | PaginatedApiResponse<T>;

function normalizeAdItem(item: any) {
  return {
    ...item,
    viewCount: Number(
      item.viewCount ??
        item.view_count ??
        item.impressionCount ??
        item.impression_count ??
        0
    ),
    impressionCount: Number(item.impressionCount ?? item.impression_count ?? 0),
    clickCount: Number(item.clickCount ?? item.click_count ?? 0),
  };
}

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
      cache: "no-store",
    }
  );

  return unwrapItems(data).map(normalizeAdItem);
}
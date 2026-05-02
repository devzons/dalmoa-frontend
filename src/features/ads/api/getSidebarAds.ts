// src/features/ads/api/getSidebarAds.ts

import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { AdItem } from "@/features/ads/types/ad";

export async function getSidebarAds(
  locale: "ko" | "en"
): Promise<AdItem[]> {
  const params = new URLSearchParams();
  params.set("lang", locale);

  const data = await apiFetch<any>(
    `${endpoints.adsSidebar}?${params.toString()}`,
    {
      next: {
        revalidate: 120,
        tags: ["ads-sidebar"],
      },
    }
  );

  const items = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
    ? data
    : [];

  return items.map((item: any) => ({
    id: Number(item.id ?? 0),
    slug: item.slug ?? String(item.id ?? ""),
    title:
      typeof item.title === "string"
        ? item.title
        : item.title?.rendered ?? "",
    excerpt:
      typeof item.excerpt === "string"
        ? item.excerpt
        : item.excerpt?.rendered ?? null,
    thumbnailUrl:
      item.thumbnailUrl ??
      item.thumbnail_url ??
      item.imageUrl ??
      item.image_url ??
      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      null,
    region: item.region ?? item.location ?? null,
    adPlan: item.adPlan ?? item.ad_plan ?? null,
    status: item.status ?? null,
    priority: item.priority ?? null,
    viewCount: Number(
      item.viewCount ??
        item.view_count ??
        item.impressionCount ??
        item.impression_count ??
        0
    ),
    impressionCount: Number(item.impressionCount ?? item.impression_count ?? 0),
    clickCount: Number(item.clickCount ?? item.click_count ?? 0),
    createdAt: item.createdAt ?? item.created_at ?? null,
    startsAt:
      item.startsAt ??
      item.starts_at ??
      item.adStartsAt ??
      item.ad_starts_at ??
      null,
    endsAt:
      item.endsAt ??
      item.ends_at ??
      item.adEndsAt ??
      item.ad_ends_at ??
      item.expiresAt ??
      item.expires_at ??
      null,
    abTest: item.abTest ?? item.ab_test ?? null,
  }));
}
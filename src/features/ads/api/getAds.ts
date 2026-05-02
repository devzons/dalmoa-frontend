import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { AdItem } from "@/features/ads/types/ad";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";

export async function getAds(locale: "ko" | "en") {
  const params = new URLSearchParams();
  params.set("lang", locale);

  const data = await apiFetch<any>(`${endpoints.adsList}?${params.toString()}`, {
    next: {
      revalidate: 120,
      tags: ["ads-list"],
    },
  });

  if (!data) {
    return { featured: [], standard: [], sidebar: null, sidebars: [] };
  }

  const items = Array.isArray(data)
    ? data
    : Array.isArray(data.items)
      ? data.items
      : [];

  const mapItem = (item: any): AdItem => ({
    id: Number(item.id ?? 0),
    slug: item.slug ?? String(item.id ?? ""),
    title:
      typeof item.title === "string" ? item.title : item.title?.rendered ?? "",
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
    priority: item.priority ?? item.adPriority ?? null,
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
    abTest: item.abTest ?? item.ad_test ?? item.ab_test ?? null,
    isSidebarAd: Boolean(item.isSidebarAd ?? item.is_sidebar_ad ?? false),
  });

  const mapped = items.map(mapItem).filter((item) => item.id);

  const featured = sortAdsByPriority(
    mapped.filter(
      (item) =>
        item.adPlan === "premium" ||
        item.adPlan === "premium_monthly" ||
        item.adPlan === "featured" ||
        item.adPlan === "featured_monthly" ||
        item.priority === "premium" ||
        item.priority === "featured"
    )
  );

  const standard = sortAdsByPriority(
    mapped.filter((item) => !featured.some((featuredItem) => featuredItem.id === item.id))
  );

  const sidebars = sortAdsByPriority(
    mapped.filter((item) => item.isSidebarAd === true)
  );

  return {
    featured,
    standard,
    sidebar: sidebars[0] ?? null,
    sidebars,
  };
}
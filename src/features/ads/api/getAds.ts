import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { AdItem } from "@/features/ads/types/ad";

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
    return { featured: [], standard: [] };
  }

  const items = Array.isArray(data) ? data : data.items ?? [];

  const mapItem = (item: any): AdItem => ({
    id: Number(item.id),
    slug: item.slug ?? String(item.id),
    title: item.title ?? "",
    excerpt: item.excerpt ?? null,
    thumbnailUrl:
      item.thumbnailUrl ??
      item.thumbnail_url ??
      item.imageUrl ??
      item.image_url ??
      null,
    region: item.region ?? item.location ?? null,
    adPlan: item.adPlan ?? item.ad_plan ?? null,
    status: item.status ?? null,
    priority: item.priority ?? item.adPriority ?? null,
    createdAt: item.createdAt ?? item.created_at,
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
  });

  const mapped = items.map(mapItem);

  const featured = mapped.filter(
    (item) =>
      item.adPlan === "premium" ||
      item.adPlan === "featured" ||
      item.priority === "premium" ||
      item.priority === "featured"
  );

  const standard = mapped.filter((item) => !featured.includes(item));

  return { featured, standard };
}
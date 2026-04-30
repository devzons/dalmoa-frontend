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
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? null,
    thumbnailUrl: item.thumbnailUrl ?? null,
    region: item.region ?? null,
    adPlan: item.adPlan ?? null,
    status: item.status ?? null,
    priority: item.priority ?? null,
    createdAt: item.createdAt,
    startsAt: item.startsAt ?? null,
    endsAt: item.endsAt ?? null,
    abTest: item.abTest ?? undefined,
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
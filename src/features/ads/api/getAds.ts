import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

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

  const featured = items.filter(
    (item: any) =>
      item.adPlan === "premium" ||
      item.adPlan === "featured" ||
      item.isFeatured === true ||
      item.is_featured === true
  );

  const standard = items.filter((item: any) => !featured.includes(item));

  return { featured, standard };
}
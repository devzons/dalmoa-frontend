import type { RealEstateItem } from "@/features/real-estate/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getRealEstateItems(
  locale: "ko" | "en" = "ko",
  params?: {
    q?: string;
    featured?: boolean;
  }
) {
  const searchParams = new URLSearchParams();
  searchParams.set("locale", locale);

  if (params?.q) {
    searchParams.set("q", params.q);
  }

  if (params?.featured) {
    searchParams.set("featured", "1");
  }

  return apiFetch<RealEstateItem[]>(
    `${endpoints.realEstateList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: [cacheTags.realEstateList],
    }
  );
}

export async function getRealEstateItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<RealEstateItem>(
    `${endpoints.realEstateDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [cacheTags.realEstateDetail(slug)],
    }
  );
}
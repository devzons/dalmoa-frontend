import type { RealEstateItem } from "@/features/real-estate/types";
import type { ListingSearchFilters } from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getRealEstateItems(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
) {
  const searchParams = new URLSearchParams();
  searchParams.set("locale", locale);

  if (filters?.q) {
    searchParams.set("q", filters.q);
  }

  if (filters?.featured) {
    searchParams.set("featured", "1");
  }

  if (filters?.region) {
    searchParams.set("region", filters.region);
  }

  if (filters?.priceMin) {
    searchParams.set("price_min", filters.priceMin);
  }

  if (filters?.priceMax) {
    searchParams.set("price_max", filters.priceMax);
  }

  if (filters?.page && filters.page > 1) {
    searchParams.set("page", String(filters.page));
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
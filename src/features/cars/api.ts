import type { CarItem } from "@/features/cars/types";
import type {
  ListingSearchFilters,
  PaginatedListResponse,
} from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getCars(
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

  return apiFetch<PaginatedListResponse<CarItem>>(
    `${endpoints.carsList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: [cacheTags.carsList],
    }
  );
}

export async function getCarBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<CarItem>(
    `${endpoints.carsDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [cacheTags.carsDetail(slug)],
    }
  );
}
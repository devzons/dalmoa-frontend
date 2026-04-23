import type { RealEstateItem } from "@/features/real-estate/types";
import type {
  ListingSearchFilters,
  PaginatedListResponse,
} from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

function buildSearchParams(
  locale: "ko" | "en",
  filters?: ListingSearchFilters
) {
  const searchParams = new URLSearchParams();
  searchParams.set("locale", locale);

  if (filters?.q) searchParams.set("q", filters.q);
  if (filters?.featured) searchParams.set("featured", "1");
  if (filters?.region) searchParams.set("region", filters.region);
  if (filters?.priceMin) searchParams.set("price_min", filters.priceMin);
  if (filters?.priceMax) searchParams.set("price_max", filters.priceMax);
  if (filters?.page && filters.page > 1) {
    searchParams.set("page", String(filters.page));
  }

  return searchParams;
}

function normalizePaginated<T>(
  raw: T[] | PaginatedListResponse<T>,
  fallbackPage: number
): PaginatedListResponse<T> {
  if (Array.isArray(raw)) {
    return {
      items: raw,
      total: raw.length,
      page: fallbackPage,
      perPage: raw.length,
      totalPages: 1,
    };
  }

  return {
    items: Array.isArray(raw.items) ? raw.items : [],
    total: typeof raw.total === "number" ? raw.total : 0,
    page: typeof raw.page === "number" ? raw.page : fallbackPage,
    perPage: typeof raw.perPage === "number" ? raw.perPage : 0,
    totalPages: typeof raw.totalPages === "number" ? raw.totalPages : 1,
  };
}

export async function getRealEstateItems(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<RealEstateItem[]> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<
    RealEstateItem[] | PaginatedListResponse<RealEstateItem>
  >(`${endpoints.realEstateList}?${searchParams.toString()}`, {
    revalidate: 120,
    tags: [cacheTags.realEstateList],
  });

  return Array.isArray(raw) ? raw : raw.items ?? [];
}

export async function getPaginatedRealEstateItems(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<PaginatedListResponse<RealEstateItem>> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<
    RealEstateItem[] | PaginatedListResponse<RealEstateItem>
  >(`${endpoints.realEstateList}?${searchParams.toString()}`, {
    revalidate: 120,
    tags: [cacheTags.realEstateList],
  });

  return normalizePaginated(raw, filters?.page ?? 1);
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
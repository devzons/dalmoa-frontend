import type { MarketplaceItem } from "@/features/marketplace/types";
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
  if (filters?.category) searchParams.set("category", filters.category);
  if (filters?.priceMin) searchParams.set("price_min", filters.priceMin);
  if (filters?.priceMax) searchParams.set("price_max", filters.priceMax);

  if (filters?.page && filters.page > 1) {
    searchParams.set("page", String(filters.page));
  }

  return searchParams;
}

function normalizePaginated<T>(
  raw: T[] | PaginatedListResponse<T> | null,
  fallbackPage: number
): PaginatedListResponse<T> {
  if (!raw) {
    return {
      items: [],
      total: 0,
      page: fallbackPage,
      perPage: 0,
      totalPages: 1,
    };
  }

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

export async function getMarketplaceItems(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<MarketplaceItem[]> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<
    MarketplaceItem[] | PaginatedListResponse<MarketplaceItem>
  >(`${endpoints.marketplaceList}?${searchParams.toString()}`, {
    next: {
      revalidate: 120,
      tags: [cacheTags.marketplaceList],
    },
  });

  return Array.isArray(raw) ? raw : raw?.items ?? [];
}

export async function getPaginatedMarketplaceItems(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<PaginatedListResponse<MarketplaceItem>> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<
    MarketplaceItem[] | PaginatedListResponse<MarketplaceItem>
  >(`${endpoints.marketplaceList}?${searchParams.toString()}`, {
    cache: "no-store",
  });

  return normalizePaginated(raw, filters?.page ?? 1);
}

export async function getMarketplaceItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<MarketplaceItem>(
    `${endpoints.marketplaceDetail(slug)}?locale=${locale}`,
    {
      next: {
        revalidate: 120,
        tags: [cacheTags.marketplaceDetail(slug)],
      },
    }
  );
}
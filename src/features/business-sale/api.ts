import type { BusinessSaleItem } from "@/features/business-sale/types";
import type {
  ListingSearchFilters,
  PaginatedListResponse,
} from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

function buildBusinessSaleSearchParams(
  locale: "ko" | "en",
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

  return searchParams;
}

export async function getBusinessSaleItems(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
) {
  const searchParams = buildBusinessSaleSearchParams(locale, filters);

  const result = await apiFetch<
    BusinessSaleItem[] | PaginatedListResponse<BusinessSaleItem>
  >(`${endpoints.businessSaleList}?${searchParams.toString()}`, {
    revalidate: 120,
    tags: ["business-sale-list"],
  });

  return Array.isArray(result) ? result : result.items;
}

export async function getBusinessSaleItemsPage(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
) {
  const searchParams = buildBusinessSaleSearchParams(locale, filters);

  const result = await apiFetch<
    BusinessSaleItem[] | PaginatedListResponse<BusinessSaleItem>
  >(`${endpoints.businessSaleList}?${searchParams.toString()}`, {
    revalidate: 120,
    tags: ["business-sale-list"],
  });

  if (Array.isArray(result)) {
    return {
      items: result,
      total: result.length,
      page: filters?.page && filters.page > 0 ? filters.page : 1,
      perPage: result.length || 12,
      totalPages: 1,
    };
  }

  return result;
}

export async function getBusinessSaleItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<BusinessSaleItem>(
    `${endpoints.businessSaleDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [`business-sale-${slug}`],
    }
  );
}
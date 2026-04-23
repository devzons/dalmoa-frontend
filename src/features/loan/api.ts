import type { LoanItem } from "@/features/loan/types";
import type {
  ListingSearchFilters,
  PaginatedListResponse,
} from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export async function getLoanItems(
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

  return apiFetch<PaginatedListResponse<LoanItem>>(
    `${endpoints.loanList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: ["loan-list"],
    }
  );
}

export async function getLoanItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<LoanItem>(
    `${endpoints.loanDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [`loan-${slug}`],
    }
  );
}
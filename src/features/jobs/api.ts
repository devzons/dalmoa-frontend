import type { JobItem } from "@/features/jobs/types";
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
  if (filters?.category) searchParams.set("category", filters.category); // 🔥 추가
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

export async function getJobs(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<JobItem[]> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<JobItem[] | PaginatedListResponse<JobItem>>(
    `${endpoints.jobsList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: [cacheTags.jobsList],
    }
  );

  return Array.isArray(raw) ? raw : raw.items ?? [];
}

export async function getPaginatedJobs(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<PaginatedListResponse<JobItem>> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<JobItem[] | PaginatedListResponse<JobItem>>(
    `${endpoints.jobsList}?${searchParams.toString()}`,
    {
      revalidate: 0,
      tags: [cacheTags.jobsList],
    }
  );

  return normalizePaginated(raw, filters?.page ?? 1);
}

export async function getJobBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<JobItem>(
    `${endpoints.jobsDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [cacheTags.jobsDetail(slug)],
    }
  );
}
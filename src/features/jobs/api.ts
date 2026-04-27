import type { JobItem } from "@/features/jobs/types";
import type {
  ListingSearchFilters,
  PaginatedListResponse,
} from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";
import { cacheTags } from "@/lib/cache/tags";

const JOBS_ENDPOINT = "/wp-json/dalmoa/v1/jobs";

function buildSearchParams(
  locale: "ko" | "en",
  filters?: ListingSearchFilters
) {
  const searchParams = new URLSearchParams();

  searchParams.set("lang", locale);

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
  raw: T[] | PaginatedListResponse<T> | any | null,
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

  const items = Array.isArray(raw.items) ? raw.items : [];
  const total = Number(raw.total ?? raw.found ?? items.length ?? 0);
  const page = Number(raw.page ?? raw.currentPage ?? fallbackPage);
  const perPage = Number(raw.perPage ?? raw.per_page ?? items.length ?? 0);
  const totalPages = Number(
    raw.totalPages ??
      raw.total_pages ??
      (perPage > 0 ? Math.ceil(total / perPage) : 1)
  );

  return {
    items,
    total,
    page,
    perPage,
    totalPages,
  };
}

export async function getJobs(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<JobItem[]> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<JobItem[] | PaginatedListResponse<JobItem>>(
    `${JOBS_ENDPOINT}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 120,
        tags: [cacheTags.jobsList],
      },
    }
  );

  if (!raw) return [];

  return Array.isArray(raw) ? raw : raw.items ?? [];
}

export async function getPaginatedJobs(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<PaginatedListResponse<JobItem>> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<JobItem[] | PaginatedListResponse<JobItem>>(
    `${JOBS_ENDPOINT}?${searchParams.toString()}`,
    {
      cache: "no-store",
    }
  );

  return normalizePaginated(raw, filters?.page ?? 1);
}

export async function getJobBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<JobItem>(`${JOBS_ENDPOINT}/${slug}?lang=${locale}`, {
    next: {
      revalidate: 120,
      tags: [cacheTags.jobsDetail(slug)],
    },
  });
}
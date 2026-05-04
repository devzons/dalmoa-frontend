import type { TownBoardItem } from "@/features/town-board/types";
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

  searchParams.set("lang", locale);

  if (filters?.q) searchParams.set("q", filters.q);
  if (filters?.featured) searchParams.set("featured", "1");

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

export async function getTownBoardItems(
  locale: "ko" | "en" = "ko",
  filters?: ListingSearchFilters
): Promise<PaginatedListResponse<TownBoardItem>> {
  const searchParams = buildSearchParams(locale, filters);

  const raw = await apiFetch<
    TownBoardItem[] | PaginatedListResponse<TownBoardItem>
  >(`${endpoints.townBoardList}?${searchParams.toString()}`, {
    next: {
      revalidate: 120,
      tags: [cacheTags.townBoardList],
    },
  });

  return normalizePaginated(raw, filters?.page ?? 1);
}

export async function getTownBoardItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<TownBoardItem>(
    `${endpoints.townBoardDetail(slug)}?lang=${locale}`,
    {
      next: {
        revalidate: 120,
        tags: [cacheTags.townBoardDetail(slug)],
      },
    }
  );
}
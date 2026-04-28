import type { NewsItem } from "@/features/news/types";
import type { PaginatedListResponse } from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getNews(
  locale: "ko" | "en" = "ko",
  params?: {
    q?: string;
    featured?: boolean;
  }
): Promise<PaginatedListResponse<NewsItem>> {
  const searchParams = new URLSearchParams();
  searchParams.set("locale", locale);

  if (params?.q) searchParams.set("q", params.q);
  if (params?.featured) searchParams.set("featured", "1");

  const raw = await apiFetch<PaginatedListResponse<NewsItem>>(
    `${endpoints.newsList}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 120,
        tags: [cacheTags.newsList],
      },
    }
  );

  return (
    raw ?? {
      items: [],
      total: 0,
      page: 1,
      perPage: 0,
      totalPages: 1,
    }
  );
}

export async function getNewsBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<NewsItem>(`${endpoints.newsDetail(slug)}?locale=${locale}`, {
    next: {
      revalidate: 120,
      tags: [cacheTags.newsDetail(slug)],
    },
  });
}
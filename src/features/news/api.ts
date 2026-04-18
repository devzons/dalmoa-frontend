import type { NewsItem } from "@/features/news/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getNews(
  locale: "ko" | "en" = "ko",
  params?: {
    q?: string;
    featured?: boolean;
  }
) {
  const searchParams = new URLSearchParams();
  searchParams.set("locale", locale);

  if (params?.q) {
    searchParams.set("q", params.q);
  }

  if (params?.featured) {
    searchParams.set("featured", "1");
  }

  return apiFetch<NewsItem[]>(
    `${endpoints.newsList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: [cacheTags.newsList],
    }
  );
}

export async function getNewsBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<NewsItem>(
    `${endpoints.newsDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [cacheTags.newsDetail(slug)],
    }
  );
}
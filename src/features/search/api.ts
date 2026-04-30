import type { SearchResponse } from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";

export async function searchAll(
  q: string,
  locale: "ko" | "en" = "ko"
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    locale,
    q,
  });

  const data = await apiFetch<SearchResponse>(`/search?${params.toString()}`, {
    next: {
      revalidate: 120,
      tags: [`search-${locale}-${q}`],
    },
  });

  return data ?? {
    q,
    total: 0,
    results: [],
  };
}
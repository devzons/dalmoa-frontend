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

  return apiFetch<SearchResponse>(`/search?${params.toString()}`, {
    revalidate: 120,
    tags: [`search-${locale}-${q}`],
  });
}
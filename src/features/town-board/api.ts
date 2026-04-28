import type { TownBoardItem } from "@/features/town-board/types";
import type { PaginatedListResponse } from "@/features/search/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getTownBoardItems(
  locale: "ko" | "en" = "ko",
  params?: {
    q?: string;
    featured?: boolean;
  }
): Promise<PaginatedListResponse<TownBoardItem> | null> {
  const searchParams = new URLSearchParams();
  searchParams.set("locale", locale);

  if (params?.q) searchParams.set("q", params.q);
  if (params?.featured) searchParams.set("featured", "1");

  return apiFetch<PaginatedListResponse<TownBoardItem>>(
    `${endpoints.townBoardList}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 120,
        tags: [cacheTags.townBoardList],
      },
    }
  );
}

export async function getTownBoardItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<TownBoardItem>(
    `${endpoints.townBoardDetail(slug)}?locale=${locale}`,
    {
      next: {
        revalidate: 120,
        tags: [cacheTags.townBoardDetail(slug)],
      },
    }
  );
}
import type {
  DirectoryItem,
  DirectoryQueryParams,
} from "@/features/directory/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

function buildDirectoryQuery(
  locale: "ko" | "en",
  params?: DirectoryQueryParams
) {
  const searchParams = new URLSearchParams();
  searchParams.set("locale", locale);

  if (params?.q) {
    searchParams.set("q", params.q);
  }

  if (params?.category) {
    searchParams.set("category", params.category);
  }

  if (params?.featured) {
    searchParams.set("featured", "1");
  }

  return `${endpoints.directoryList}?${searchParams.toString()}`;
}

export async function getDirectories(
  locale: "ko" | "en" = "ko",
  params?: DirectoryQueryParams
) {
  return apiFetch<DirectoryItem[]>(buildDirectoryQuery(locale, params), {
    revalidate: 300,
    tags: [cacheTags.directoryList],
  });
}

export async function getDirectoryBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<DirectoryItem>(
    `${endpoints.directoryDetail(slug)}?locale=${locale}`,
    {
      revalidate: 300,
      tags: [cacheTags.directoryDetail(slug)],
    }
  );
}
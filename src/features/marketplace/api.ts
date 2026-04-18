import type { MarketplaceItem } from "@/features/marketplace/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getMarketplaceItems(
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

  return apiFetch<MarketplaceItem[]>(
    `${endpoints.marketplaceList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: [cacheTags.marketplaceList],
    }
  );
}

export async function getMarketplaceItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<MarketplaceItem>(
    `${endpoints.marketplaceDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [cacheTags.marketplaceDetail(slug)],
    }
  );
}
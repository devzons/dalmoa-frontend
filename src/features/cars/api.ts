import type { CarItem } from "@/features/cars/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getCars(
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

  return apiFetch<CarItem[]>(
    `${endpoints.carsList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: [cacheTags.carsList],
    }
  );
}

export async function getCarBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<CarItem>(
    `${endpoints.carsDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [cacheTags.carsDetail(slug)],
    }
  );
}
import type { BusinessSaleItem } from "@/features/business-sale/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export async function getBusinessSaleItems(
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

  return apiFetch<BusinessSaleItem[]>(
    `${endpoints.businessSaleList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: ["business-sale-list"],
    }
  );
}

export async function getBusinessSaleItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<BusinessSaleItem>(
    `${endpoints.businessSaleDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [`business-sale-${slug}`],
    }
  );
}
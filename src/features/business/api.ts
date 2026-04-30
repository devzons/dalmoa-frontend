import type { BusinessPage } from "@/features/business/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getBusinessPageBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<BusinessPage>(
    `${endpoints.businessDetail(slug)}?locale=${locale}`,
    {
      next: {
        revalidate: 300,
        tags: [cacheTags.businessDetail(slug)],
      },
    }
  );
}
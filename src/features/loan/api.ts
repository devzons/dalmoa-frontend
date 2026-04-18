import type { LoanItem } from "@/features/loan/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export async function getLoanItems(
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

  return apiFetch<LoanItem[]>(
    `${endpoints.loanList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: ["loan-list"],
    }
  );
}

export async function getLoanItemBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<LoanItem>(
    `${endpoints.loanDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [`loan-${slug}`],
    }
  );
}
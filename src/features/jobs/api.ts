import type { JobItem } from "@/features/jobs/types";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";

export async function getJobs(
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

  return apiFetch<JobItem[]>(
    `${endpoints.jobsList}?${searchParams.toString()}`,
    {
      revalidate: 120,
      tags: [cacheTags.jobsList],
    }
  );
}

export async function getJobBySlug(
  slug: string,
  locale: "ko" | "en" = "ko"
) {
  return apiFetch<JobItem>(
    `${endpoints.jobsDetail(slug)}?locale=${locale}`,
    {
      revalidate: 120,
      tags: [cacheTags.jobsDetail(slug)],
    }
  );
}
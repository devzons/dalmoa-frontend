import { Container } from "@/components/base/Container";
import { CreateListingEntry } from "@/components/common/CreateListingEntry";
import { getJobs } from "@/features/jobs/api";
import { JobGrid } from "@/features/jobs/components/JobGrid";
import ListingActiveFilters from "@/features/search/components/ListingActiveFilters";
import ListingFilters from "@/features/search/components/ListingFilters";
import { parseListingSearchParams } from "@/features/search/url";
import { buildMetadata } from "@/lib/seo/metadata";
import ListingPagination from "@/features/search/components/ListingPagination";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};


export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Jobs" : "구인구직",
    description:
      normalizedLocale === "en"
        ? "Browse job listings in the community."
        : "등록된 구인구직 정보를 확인하세요.",
    path: `/${normalizedLocale}/jobs`,
  });
}

export const revalidate = 120;

export default async function JobsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);
  const items = await getJobs(normalizedLocale, filters);

  return (
    <Container className="py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {normalizedLocale === "en" ? "Jobs" : "구인구직"}
          </h1>
          <p className="mt-2 text-neutral-500">
            {normalizedLocale === "en"
              ? "Browse job listings in the community."
              : "등록된 구인구직 정보를 확인하세요."}
          </p>
        </div>

        <CreateListingEntry locale={normalizedLocale} category="jobs" />
      </div>

      <div className="mb-6">
        <ListingFilters
          domain="jobs"
          initialFilters={filters}
        />
      </div>

      <div className="mb-6">
        <ListingActiveFilters filters={filters} />
      </div>

      <JobGrid items={items} locale={normalizedLocale} />
      <ListingPagination currentPage={filters.page} />
    </Container>
  );
}
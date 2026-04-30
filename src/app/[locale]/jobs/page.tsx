import { Container } from "@/components/base/Container";
import { CreateListingEntry } from "@/components/common/CreateListingEntry";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { getPaginatedJobs } from "@/features/jobs/api";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import ListingActiveFilters from "@/features/search/components/ListingActiveFilters";
import ListingEmptyState from "@/features/search/components/ListingEmptyState";
import ListingFilters from "@/features/search/components/ListingFilters";
import LoadMoreButton from "@/components/listing/LoadMoreButton";
import ListingResultSummary from "@/features/search/components/ListingResultSummary";
import { parseListingSearchParams } from "@/features/search/url";
import { buildMetadata } from "@/lib/seo/metadata";

import { getFeaturedAds } from "@/features/ads/api/getFeaturedAds";
import { injectAdsIntoList } from "@/features/ads/lib/injectAdsIntoList";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";
import { AdSlot } from "@/features/ads/components/AdSlot";

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
  const domain = "jobs";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const [result, ads] = await Promise.all([
    getPaginatedJobs(normalizedLocale, filters),
    getFeaturedAds(normalizedLocale),
  ]);

  const items = Array.isArray(result?.items) ? result.items : [];
  const currentPage = result?.page ?? filters.page ?? 1;
  const total = result?.total ?? 0;
  const totalPages = result?.totalPages ?? 1;
  const hasNextPage = currentPage < totalPages;

  const { featured, regular } =
    currentPage === 1 ? splitFeatured(items) : { featured: [], regular: items };

  const sortedAds = sortAdsByPriority(ads);
  const mergedList = injectAdsIntoList({
    listings: regular,
    ads: sortedAds,
    interval: 6,
  });

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

        <CreateListingEntry locale={normalizedLocale} category={domain} />
      </div>

      <div className="mb-6">
        <ListingFilters domain={domain} initialFilters={filters} />
      </div>

      <div className="mb-6">
        <ListingActiveFilters filters={filters} />
      </div>

      <ListingResultSummary
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        locale={normalizedLocale}
      />

      {items.length > 0 ? (
        <div className="space-y-10">
          {featured.length > 0 && (
            <FeaturedListingGrid
              items={featured}
              locale={normalizedLocale}
              domain={domain}
            />
          )}

          {mergedList.length > 0 && (
            <>
              <div className="grid grid-cols-[1fr_60px] sm:grid-cols-[2fr_3fr_1fr_80px] gap-4 border-b bg-neutral-50 px-4 py-2 mb-2 text-xs font-semibold text-neutral-500">
                <div>제목</div>
                <div className="hidden sm:block">내용</div>
                <div className="hidden sm:block">지역</div>
                <div className="text-right">조회수</div>
              </div>

              {mergedList.map((item: any, index: number) =>
                item?.adPlan ? (
                  <AdSlot
                    key={`ad-${item.id}-${index}`}
                    item={item}
                    locale={normalizedLocale}
                    placement="listing_middle"
                  />
                ) : (
                  <ListingRowItem
                    key={item.id}
                    item={item}
                    locale={normalizedLocale}
                    domain="jobs"
                  />
                ),
              )}
            </>
          )}

          <LoadMoreButton
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            label={normalizedLocale === "en" ? "Load more" : "더 보기"}
          />
        </div>
      ) : (
        <ListingEmptyState locale={normalizedLocale} />
      )}
    </Container>
  );
}
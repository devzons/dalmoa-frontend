import { Container } from "@/components/base/Container";
import { CreateListingEntry } from "@/components/common/CreateListingEntry";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { PageWithSidebar } from "@/components/layout/PageWithSidebar";
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
import { FeaturedAdSection } from "@/features/ads/components/FeaturedAdSection";
import type { AdItem } from "@/features/ads/types/ad";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

function normalizeAdItem(item: any): AdItem {
  return {
    id: Number(item.id ?? 0),
    slug: item.slug ?? String(item.id ?? ""),
    title:
      typeof item.title === "string"
        ? item.title
        : item.title?.rendered ?? "",
    excerpt:
      typeof item.excerpt === "string"
        ? item.excerpt
        : item.excerpt?.rendered ?? null,
    thumbnailUrl:
      item.thumbnailUrl ??
      item.thumbnail_url ??
      item.imageUrl ??
      item.image_url ??
      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      null,
    region: item.region ?? item.location ?? null,
    adPlan: item.adPlan ?? item.ad_plan ?? null,
    status: item.status ?? null,
    priority: item.priority ?? null,
    viewCount: Number(
      item.viewCount ??
        item.view_count ??
        item.impressionCount ??
        item.impression_count ??
        0
    ),
    impressionCount: Number(item.impressionCount ?? item.impression_count ?? 0),
    clickCount: Number(item.clickCount ?? item.click_count ?? 0),
    createdAt: item.createdAt ?? item.created_at ?? undefined,
    startsAt:
      item.startsAt ??
      item.starts_at ??
      item.adStartsAt ??
      item.ad_starts_at ??
      null,
    endsAt:
      item.endsAt ??
      item.ends_at ??
      item.adEndsAt ??
      item.ad_ends_at ??
      item.expiresAt ??
      item.expires_at ??
      null,
    abTest: item.abTest ?? item.ab_test ?? undefined,
  };
}

function isPremiumAd(item: AdItem) {
  return (
    item.adPlan === "premium" ||
    item.adPlan === "premium_monthly" ||
    item.priority === "premium"
  );
}

function isFeaturedAd(item: AdItem) {
  return (
    item.adPlan === "featured" ||
    item.adPlan === "featured_monthly" ||
    item.priority === "featured"
  );
}

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

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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

  const { regular } =
    currentPage === 1 ? splitFeatured(items) : { featured: [], regular: items };

  const allAds = (Array.isArray(ads) ? ads : []).map(normalizeAdItem);

  const sortedPaidAds = sortAdsByPriority(
    allAds.filter((item) => isPremiumAd(item) || isFeaturedAd(item))
  );

  const premiumAds = sortedPaidAds.filter(isPremiumAd);
  const featuredAds = sortedPaidAds.filter(isFeaturedAd);

  return (
    <Container className="py-10">
      <PageWithSidebar locale={normalizedLocale}>
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

        <div className="space-y-12">
          <FeaturedAdSection
            title={normalizedLocale === "en" ? "Premium Ads" : "프리미엄 광고"}
            items={premiumAds}
            locale={normalizedLocale}
            placement="listing_top"
          />

          <FeaturedAdSection
            title={normalizedLocale === "en" ? "Featured Ads" : "추천 광고"}
            items={featuredAds}
            locale={normalizedLocale}
            placement="listing_top"
          />

          {items.length > 0 ? (
            <>
              {regular.length > 0 && (
                <div className="rounded-2xl border border-neutral-200 bg-white">
                  <div className="grid grid-cols-[1fr_60px] gap-2 border-b bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-500 sm:grid-cols-[2fr_3fr_1fr_80px]">
                    <div>{normalizedLocale === "en" ? "Title" : "제목"}</div>
                    <div className="hidden sm:block">
                      {normalizedLocale === "en" ? "Content" : "내용"}
                    </div>
                    <div className="hidden sm:block">
                      {normalizedLocale === "en" ? "Region" : "지역"}
                    </div>
                    <div className="text-right">
                      {normalizedLocale === "en" ? "Clicks" : "클릭수"}
                    </div>
                  </div>

                  {regular.map((item: any) => (
                    <ListingRowItem
                      key={item.id ?? item.slug}
                      item={item}
                      locale={normalizedLocale}
                      domain="jobs"
                    />
                  ))}
                </div>
              )}

              <LoadMoreButton
                currentPage={currentPage}
                hasNextPage={hasNextPage}
                label={normalizedLocale === "en" ? "Load more" : "더 보기"}
              />
            </>
          ) : (
            <ListingEmptyState locale={normalizedLocale} />
          )}
        </div>
      </PageWithSidebar>
    </Container>
  );
}
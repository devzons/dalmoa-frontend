import Link from "next/link";
import { Container } from "@/components/base/Container";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { DirectoryFilterBar } from "@/features/directory/components/DirectoryFilterBar";
import { getDirectories } from "@/features/directory/api";
import { getDirectoryCategories } from "@/features/directory/utils";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import { getFeaturedAds } from "@/features/ads/api/getFeaturedAds";
import { FeaturedAdSection } from "@/features/ads/components/FeaturedAdSection";
import type { AdItem } from "@/features/ads/types/ad";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageWithSidebar } from "@/components/layout/PageWithSidebar";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    featured?: string;
    sort?: string;
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
    title: normalizedLocale === "en" ? "Directory" : "업소록",
    description:
      normalizedLocale === "en"
        ? "Dallas Korean business directory"
        : "달라스 한인 업소록",
    path: `/${normalizedLocale}/directory`,
  });
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function DirectoryPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const resolvedSearchParams = await searchParams;

  const currentSort = resolvedSearchParams.sort === "popular" ? "popular" : "";

  const query = {
    q: resolvedSearchParams.q?.trim() || undefined,
    category: resolvedSearchParams.category?.trim() || undefined,
    featured: resolvedSearchParams.featured === "1",
    sort: currentSort || undefined,
  };

  const [result, ads] = await Promise.all([
    getDirectories(normalizedLocale, query),
    getFeaturedAds(normalizedLocale),
  ]);

  const items = Array.isArray(result)
    ? result
    : Array.isArray((result as any)?.items)
      ? (result as any).items
      : [];

  const allAds = (Array.isArray(ads) ? ads : []).map(normalizeAdItem);

  const sortedPaidAds = sortAdsByPriority(
    allAds.filter((item) => isPremiumAd(item) || isFeaturedAd(item))
  );

  const premiumAds = sortedPaidAds.filter(isPremiumAd);
  const featuredAds = sortedPaidAds.filter(isFeaturedAd);

  const categories = getDirectoryCategories(items, normalizedLocale);
  const { regular } = splitFeatured(items);
  const displayItems = regular.length > 0 ? regular : items;

  const baseParams = new URLSearchParams();

  if (query.q) baseParams.set("q", query.q);
  if (query.category) baseParams.set("category", query.category);
  if (query.featured) baseParams.set("featured", "1");

  const latestHref = `/${normalizedLocale}/directory${
    baseParams.toString() ? `?${baseParams.toString()}` : ""
  }`;

  const popularParams = new URLSearchParams(baseParams.toString());
  popularParams.set("sort", "popular");

  const popularHref = `/${normalizedLocale}/directory?${popularParams.toString()}`;

  return (
    <Container className="py-10">
      <PageWithSidebar locale={normalizedLocale}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {normalizedLocale === "en" ? "Directory" : "업소록"}
          </h1>
          <p className="mt-2 text-neutral-500">
            {normalizedLocale === "en"
              ? "Browse local Korean businesses in Dallas."
              : "지역 업소 정보를 한눈에 확인하세요."}
          </p>
        </div>

        <DirectoryFilterBar locale={normalizedLocale} categories={categories} />

        <div className="mb-5 flex gap-2">
          <Link
            href={latestHref}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              currentSort === ""
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {normalizedLocale === "en" ? "Latest" : "최신순"}
          </Link>

          <Link
            href={popularHref}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              currentSort === "popular"
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {normalizedLocale === "en" ? "Popular" : "인기순"}
          </Link>
        </div>

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

          {displayItems.length > 0 ? (
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

              {displayItems.map((item: any) => (
                <ListingRowItem
                  key={item.id ?? item.slug}
                  item={item}
                  locale={normalizedLocale}
                  domain="directory"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
              {normalizedLocale === "en"
                ? "No directory listings found."
                : "등록된 업소가 없습니다."}
            </div>
          )}
        </div>
      </PageWithSidebar>
    </Container>
  );
}
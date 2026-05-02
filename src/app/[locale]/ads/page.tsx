import { Container } from "@/components/base/Container";
import { PageWithSidebar } from "@/components/layout/PageWithSidebar";
import { FeaturedAdSection } from "@/features/ads/components/FeaturedAdSection";
import { StandardAdsTable } from "@/features/ads/components/StandardAdsTable";
import { getAds } from "@/features/ads/api";
import type { AdItem } from "@/features/ads/types/ad";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
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
    isSidebarAd: Boolean(item.isSidebarAd ?? item.is_sidebar_ad ?? false),
  };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Ads" : "광고",
    description:
      normalizedLocale === "en"
        ? "Featured and standard ads"
        : "추천 광고와 일반 광고 목록",
    path: `/${normalizedLocale}/ads`,
  });
}

export const revalidate = 120;

export default async function AdsPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const data = await getAds(normalizedLocale);

  const allFeaturedAds = Array.isArray(data?.featured)
    ? sortAdsByPriority(data.featured.map(normalizeAdItem))
    : [];

  const premiumAds = allFeaturedAds.filter(
    (item) =>
      item.adPlan === "premium" ||
      item.adPlan === "premium_monthly" ||
      item.priority === "premium"
  );

  const featuredAds = allFeaturedAds.filter(
    (item) => !premiumAds.some((premium) => premium.id === item.id)
  );

  const standardAds = Array.isArray(data?.standard)
    ? sortAdsByPriority(data.standard.map(normalizeAdItem))
    : [];

  return (
    <Container className="py-10">
      <PageWithSidebar locale={normalizedLocale}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {normalizedLocale === "en" ? "Ads" : "광고"}
          </h1>
          <p className="mt-2 text-neutral-500">
            {normalizedLocale === "en"
              ? "Featured and standard ads are separated for clarity."
              : "추천 광고와 일반 광고를 분리해 제공합니다."}
          </p>
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

          <StandardAdsTable items={standardAds} locale={normalizedLocale} />
        </div>
      </PageWithSidebar>
    </Container>
  );
}
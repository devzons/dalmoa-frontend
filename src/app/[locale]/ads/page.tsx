import { Container } from "@/components/base/Container";
import { FeaturedAdSection } from "@/features/ads/components/FeaturedAdSection";
import { StandardAdsTable } from "@/features/ads/components/StandardAdsTable";
import { getAds } from "@/features/ads/api";
import type { AdItem } from "@/features/ads/types/ad";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

function normalizeAdItem(item: any): AdItem {
  return {
    id: Number(item.id),
    slug: item.slug ?? String(item.id),
    title: item.title ?? "",
    excerpt: item.excerpt ?? null,
    thumbnailUrl:
      item.thumbnailUrl ??
      item.thumbnail_url ??
      item.imageUrl ??
      item.image_url ??
      null,
    region: item.region ?? item.location ?? null,
    adPlan: item.adPlan ?? item.ad_plan ?? null,
    status: item.status ?? null,
    priority: item.priority ?? null,
    createdAt: item.createdAt ?? item.created_at ?? null,
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

  const featuredAds = Array.isArray(data?.featured)
    ? data.featured.map(normalizeAdItem)
    : [];

  const standardAds = Array.isArray(data?.standard)
    ? data.standard.map(normalizeAdItem)
    : [];

  return (
    <Container className="py-10">
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
          items={featuredAds}
          locale={normalizedLocale}
          placement="listing_top"
        />

        <StandardAdsTable items={standardAds} locale={normalizedLocale} />
      </div>
    </Container>
  );
}
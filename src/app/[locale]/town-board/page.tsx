import { Container } from "@/components/base/Container";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { PageWithSidebar } from "@/components/layout/PageWithSidebar";
import { getTownBoardItems } from "@/features/town-board/api";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import { getFeaturedAds } from "@/features/ads/api/getFeaturedAds";
import { FeaturedAdSection } from "@/features/ads/components/FeaturedAdSection";
import type { AdItem } from "@/features/ads/types/ad";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

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
    title: normalizedLocale === "en" ? "Town Board" : "타운게시판",
    description:
      normalizedLocale === "en"
        ? "Community posts and local notices"
        : "커뮤니티 게시물 및 공지",
    path: `/${normalizedLocale}/town-board`,
  });
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function TownBoardPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const domain = "town-board";

  const [result, ads] = await Promise.all([
    getTownBoardItems(normalizedLocale),
    getFeaturedAds(normalizedLocale, domain),
  ]);

  const items = Array.isArray(result?.items) ? result.items : [];
  const { regular } = splitFeatured(items);

  const sortedPaidAds = sortAdsByPriority(
    (Array.isArray(ads) ? ads : []).filter(
      (item) => isPremiumAd(item) || isFeaturedAd(item),
    ),
  );

  const premiumAds = sortedPaidAds.filter(isPremiumAd);
  const featuredAds = sortedPaidAds.filter(isFeaturedAd);

  return (
    <Container className="py-10">
      <PageWithSidebar locale={normalizedLocale}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {normalizedLocale === "en" ? "Town Board" : "타운게시판"}
          </h1>
          <p className="mt-2 text-neutral-500">
            {normalizedLocale === "en"
              ? "Community posts and local notices."
              : "커뮤니티 게시물과 공지를 확인하세요."}
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
                  {normalizedLocale === "en" ? "Views" : "조회수"}
                </div>
              </div>

              {regular.map((item: any) => (
                <ListingRowItem
                  key={item.id ?? item.slug}
                  item={item}
                  locale={normalizedLocale}
                  domain={domain}
                />
              ))}
            </div>
          )}
        </div>
      </PageWithSidebar>
    </Container>
  );
}
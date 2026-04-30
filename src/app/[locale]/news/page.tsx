import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { getNews } from "@/features/news/api";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import { getFeaturedAds } from "@/features/ads/api/getFeaturedAds";
import { injectAdsIntoList } from "@/features/ads/lib/injectAdsIntoList";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";
import { AdSlot } from "@/features/ads/components/AdSlot";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "News" : "뉴스",
    description:
      normalizedLocale === "en"
        ? "Community and Texas news"
        : "커뮤니티 및 텍사스 뉴스",
    path: `/${normalizedLocale}/news`,
  });
}

export const revalidate = 120;

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const [result, ads] = await Promise.all([
    getNews(normalizedLocale),
    getFeaturedAds(normalizedLocale),
  ]);

  const items = Array.isArray(result?.items) ? result.items : [];
  const { featured, regular } = splitFeatured(items);

  const mergedList = injectAdsIntoList({
    listings: regular,
    ads: sortAdsByPriority(ads),
    interval: 6,
  });

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "News" : "뉴스"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Community and Texas news updates."
            : "커뮤니티 및 텍사스 뉴스 업데이트."}
        </p>
      </div>

      <div className="space-y-10">
        {featured.length > 0 && (
          <FeaturedListingGrid
            items={featured}
            locale={normalizedLocale}
            domain="news"
          />
        )}

        {mergedList.length > 0 ? (
          <>
            <div className="mb-2 grid grid-cols-[1fr_60px] gap-4 border-b bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-500 sm:grid-cols-[2fr_3fr_1fr_80px]">
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
                  domain="news"
                />
              ),
            )}
          </>
        ) : (
          <div className="rounded-lg border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
            {normalizedLocale === "en"
              ? "No news found."
              : "등록된 뉴스가 없습니다."}
          </div>
        )}
      </div>
    </Container>
  );
}
import { buildMetadata } from "@/lib/seo/metadata";
import { getHomeData } from "@/features/home/api";
import { HomeHero } from "@/features/home/components/HomeHero";
import { HomeSection } from "@/features/home/components/HomeSection";
import type { HomeLocale } from "@/features/home/types";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale: HomeLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Dalmoa Hub" : "달모아 허브",
    description:
      normalizedLocale === "en"
        ? "Dallas Korean community portal for businesses, jobs, marketplace, real estate, cars, and local updates."
        : "달라스 한인 커뮤니티 포털. 업소록, 구인구직, 사고팔기, 부동산, 자동차, 지역 소식을 한 번에 확인하세요.",
    path: `/${normalizedLocale}`,
  });
}

export const revalidate = 120;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale: HomeLocale = locale === "en" ? "en" : "ko";

  const data = await getHomeData(normalizedLocale);

  return (
    <div className="bg-neutral-50">
      <HomeHero locale={normalizedLocale} />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Featured Ads" : "추천 광고"}
        description={
          normalizedLocale === "en"
            ? "Priority promotional placements."
            : "우선 노출되는 프로모션 광고입니다."
        }
        moreHref={`/${normalizedLocale}/ads`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.featuredAds}
      />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Featured Businesses" : "추천 업소"}
        description={
          normalizedLocale === "en"
            ? "Highlighted local businesses."
            : "추천 업소를 먼저 확인하세요."
        }
        moreHref={`/${normalizedLocale}/directory`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.featuredDirectory}
      />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Latest News" : "최신 뉴스"}
        description={
          normalizedLocale === "en"
            ? "Recent local and community updates."
            : "지역과 커뮤니티의 최신 소식입니다."
        }
        moreHref={`/${normalizedLocale}/news`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.latestNews}
      />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Latest Jobs" : "최신 구인구직"}
        description={
          normalizedLocale === "en"
            ? "Recent hiring opportunities."
            : "최근 등록된 채용 정보를 확인하세요."
        }
        moreHref={`/${normalizedLocale}/jobs`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.latestJobs}
      />

            <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Latest Business Sales" : "최신 사업체매매"}
        description={
          normalizedLocale === "en"
            ? "Recently listed business sale opportunities."
            : "최근 등록된 사업체매매 정보입니다."
        }
        moreHref={`/${normalizedLocale}/business-sale`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.latestBusinessSale}
      />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Latest Loans" : "최신 융자"}
        description={
          normalizedLocale === "en"
            ? "Recently added loan and financing information."
            : "최근 등록된 융자 및 금융 정보입니다."
        }
        moreHref={`/${normalizedLocale}/loan`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.latestLoan}
      />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Latest Marketplace" : "최신 사고팔기"}
        description={
          normalizedLocale === "en"
            ? "Recently posted marketplace items."
            : "최근 등록된 사고팔기 게시물입니다."
        }
        moreHref={`/${normalizedLocale}/marketplace`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.latestMarketplace}
      />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Latest Real Estate" : "최신 부동산"}
        description={
          normalizedLocale === "en"
            ? "Recent property listings."
            : "최근 등록된 부동산 매물입니다."
        }
        moreHref={`/${normalizedLocale}/real-estate`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.latestRealEstate}
      />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Latest Cars" : "최신 자동차"}
        description={
          normalizedLocale === "en"
            ? "Recent vehicle listings."
            : "최근 등록된 자동차 게시물입니다."
        }
        moreHref={`/${normalizedLocale}/cars`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.latestCars}
      />

      <HomeSection
        locale={normalizedLocale}
        title={normalizedLocale === "en" ? "Latest Town Board" : "최신 타운게시판"}
        description={
          normalizedLocale === "en"
            ? "Recent community posts and notices."
            : "최근 커뮤니티 글과 공지입니다."
        }
        moreHref={`/${normalizedLocale}/town-board`}
        moreLabel={normalizedLocale === "en" ? "View all" : "전체 보기"}
        items={data.latestTownBoard}
      />
    </div>
  );
}
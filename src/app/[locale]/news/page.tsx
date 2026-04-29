import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { getNews } from "@/features/news/api";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
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

  const result = await getNews(normalizedLocale);
  const items = Array.isArray(result?.items) ? result.items : [];
  const { featured, regular } = splitFeatured(items);

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

        {regular.length > 0 ? (
          <>
            {/* 헤더 */}
            <div className="grid grid-cols-[1fr_60px] sm:grid-cols-[2fr_3fr_1fr_80px] gap-4 border-b bg-neutral-50 px-4 py-2 mb-2 text-xs font-semibold text-neutral-500">
              <div>제목</div>
              <div className="hidden sm:block">내용</div>
              <div className="hidden sm:block">지역</div>
              <div className="text-right">조회수</div>
            </div>

            {/* 리스트 */}
            {regular.map((item) => (
              <ListingRowItem
                key={item.id}
                item={item}
                locale={normalizedLocale}
                domain="jobs"
              />
            ))}
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
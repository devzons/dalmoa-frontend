import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { getTownBoardItems } from "@/features/town-board/api";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

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

export const revalidate = 120;

export default async function TownBoardPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const result = await getTownBoardItems(normalizedLocale);
  const items = Array.isArray(result?.items) ? result.items : [];
  const { featured, regular } = splitFeatured(items);

  return (
    <Container className="py-10">
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

      <div className="space-y-10">
        {featured.length > 0 && (
          <FeaturedListingGrid
            items={featured}
            locale={normalizedLocale}
            domain="town-board"
          />
        )}

        {regular.length > 0 && (
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
        )}
      </div>
    </Container>
  );
}
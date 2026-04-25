import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { getTownBoardItems } from "@/features/town-board/api";
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

  const items = await getTownBoardItems(normalizedLocale);

  const featured = items
    .filter((i: any) => i.featured || i.isFeatured)
    .slice(0, 6);

  const featuredIds = new Set(featured.map((i: any) => i.id));
  const regular = items.filter((i: any) => !featuredIds.has(i.id));

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
        {/* Featured */}
        {featured.length > 0 && (
          <FeaturedListingGrid
            items={featured}
            locale={normalizedLocale}
            domain="town-board"
          />
        )}

        {/* Regular */}
        <div className="divide-y">
          {regular.map((item: any) => (
            <ListingRowItem
              key={item.id}
              item={item}
              locale={normalizedLocale}
              domain="town-board"
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
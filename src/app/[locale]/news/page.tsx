import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { getNews } from "@/features/news/api";
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

  const items = await getNews(normalizedLocale);

  const featured = items
    .filter((i: any) => i.featured || i.isFeatured)
    .slice(0, 6);

  const featuredIds = new Set(featured.map((i: any) => i.id));
  const regular = items.filter((i: any) => !featuredIds.has(i.id));

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
        {/* Featured */}
        {featured.length > 0 && (
          <FeaturedListingGrid
            items={featured}
            locale={normalizedLocale}
            domain="news"
          />
        )}

        {/* Regular */}
        <div className="divide-y">
          {regular.map((item: any) => (
            <ListingRowItem
              key={item.id}
              item={item}
              locale={normalizedLocale}
              domain="news"
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
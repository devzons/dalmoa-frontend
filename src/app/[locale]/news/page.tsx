import { Container } from "@/components/base/Container";
import { NewsGrid } from "@/features/news/components/NewsGrid";
import { getNews } from "@/features/news/api";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
  }>;
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

      <NewsGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
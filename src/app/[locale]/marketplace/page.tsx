import { Container } from "@/components/base/Container";
import { MarketplaceGrid } from "@/features/marketplace/components/MarketplaceGrid";
import { getMarketplaceItems } from "@/features/marketplace/api";
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
    title: normalizedLocale === "en" ? "Marketplace" : "사고팔기",
    description:
      normalizedLocale === "en"
        ? "Community marketplace listings"
        : "커뮤니티 사고팔기 게시물",
    path: `/${normalizedLocale}/marketplace`,
  });
}

export const revalidate = 120;

export default async function MarketplacePage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const items = await getMarketplaceItems(normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Marketplace" : "사고팔기"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Buy and sell with the community."
            : "커뮤니티에서 사고팔기 게시물을 확인하세요."}
        </p>
      </div>

      <MarketplaceGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
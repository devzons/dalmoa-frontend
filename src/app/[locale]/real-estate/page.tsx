import { Container } from "@/components/base/Container";
import { RealEstateGrid } from "@/features/real-estate/components/RealEstateGrid";
import { getRealEstateItems } from "@/features/real-estate/api";
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
    title: normalizedLocale === "en" ? "Real Estate" : "부동산",
    description:
      normalizedLocale === "en"
        ? "Property and lease listings"
        : "매물 및 임대 정보",
    path: `/${normalizedLocale}/real-estate`,
  });
}

export const revalidate = 120;

export default async function RealEstatePage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const items = await getRealEstateItems(normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Real Estate" : "부동산"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Property and lease listings."
            : "매물 및 임대 정보를 확인하세요."}
        </p>
      </div>

      <RealEstateGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
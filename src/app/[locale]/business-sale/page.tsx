import { Container } from "@/components/base/Container";
import { BusinessSaleGrid } from "@/features/business-sale/components/BusinessSaleGrid";
import { getBusinessSaleItems } from "@/features/business-sale/api";
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
    title: normalizedLocale === "en" ? "Business Sale" : "사업체매매",
    description:
      normalizedLocale === "en"
        ? "Business sale opportunities"
        : "사업체매매 정보를 확인하세요.",
    path: `/${normalizedLocale}/business-sale`,
  });
}

export const revalidate = 120;

export default async function BusinessSalePage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const items = await getBusinessSaleItems(normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Business Sale" : "사업체매매"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Explore available business sale listings."
            : "등록된 사업체매매 정보를 확인하세요."}
        </p>
      </div>

      <BusinessSaleGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
import { Container } from "@/components/base/Container";
import { FeaturedAdSection } from "@/features/ads/components/FeaturedAdSection";
import { StandardAdsTable } from "@/features/ads/components/StandardAdsTable";
import { getAds } from "@/features/ads/api";
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
    title: normalizedLocale === "en" ? "Ads" : "광고",
    description:
      normalizedLocale === "en"
        ? "Featured and standard ads"
        : "추천 광고와 일반 광고 목록",
    path: `/${normalizedLocale}/ads`,
  });
}

export const revalidate = 120;

export default async function AdsPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const data = await getAds(normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Ads" : "광고"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Featured and standard ads are separated for clarity."
            : "추천 광고와 일반 광고를 분리해 제공합니다."}
        </p>
      </div>

      <div className="space-y-12">
        <FeaturedAdSection
          items={data.featured}
          locale={normalizedLocale}
          placement="listing_top"
        />

        <StandardAdsTable items={data.standard} locale={normalizedLocale} />
      </div>
    </Container>
  );
}
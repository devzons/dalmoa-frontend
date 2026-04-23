import { Container } from "@/components/base/Container";
import { getRealEstateItems } from "@/features/real-estate/api";
import { RealEstateGrid } from "@/features/real-estate/components/RealEstateGrid";
import ListingActiveFilters from "@/features/search/components/ListingActiveFilters";
import ListingFilters from "@/features/search/components/ListingFilters";
import { parseListingSearchParams } from "@/features/search/url";
import { buildMetadata } from "@/lib/seo/metadata";
import ListingPagination from "@/features/search/components/ListingPagination";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
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

export default async function RealEstatePage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const items = await getRealEstateItems(normalizedLocale, filters);

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

      <div className="mb-6">
        <ListingFilters
          domain="real-estate"
          initialFilters={filters}
        />
      </div>

      <div className="mb-6">
        <ListingActiveFilters filters={filters} />
      </div>

      <RealEstateGrid items={items} locale={normalizedLocale} />
      <ListingPagination currentPage={filters.page} />
    </Container>
  );
}
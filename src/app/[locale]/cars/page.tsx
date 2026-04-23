import { Container } from "@/components/base/Container";
import { getCars } from "@/features/cars/api";
import { CarGrid } from "@/features/cars/components/CarGrid";
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
    title: normalizedLocale === "en" ? "Cars" : "자동차",
    description:
      normalizedLocale === "en"
        ? "Vehicle listings and auto posts"
        : "차량 매물 및 자동차 게시물",
    path: `/${normalizedLocale}/cars`,
  });
}

export const revalidate = 120;

export default async function CarsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const items = await getCars(normalizedLocale, filters);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Cars" : "자동차"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Vehicle listings and auto posts."
            : "차량 매물 및 자동차 게시물을 확인하세요."}
        </p>
      </div>

      <div className="mb-6">
        <ListingFilters
          domain="cars"
          initialFilters={filters}
        />
      </div>

      <div className="mb-6">
        <ListingActiveFilters filters={filters} />
      </div>

      <CarGrid items={items} locale={normalizedLocale} />
      <ListingPagination currentPage={filters.page} />
    </Container>
  );
}
import { Container } from "@/components/base/Container";
import { getMarketplaceItems } from "@/features/marketplace/api";
import { MarketplaceGrid } from "@/features/marketplace/components/MarketplaceGrid";
import ListingActiveFilters from "@/features/search/components/ListingActiveFilters";
import ListingEmptyState from "@/features/search/components/ListingEmptyState";
import ListingFilters from "@/features/search/components/ListingFilters";
import ListingPagination from "@/features/search/components/ListingPagination";
import ListingResultSummary from "@/features/search/components/ListingResultSummary";
import { parseListingSearchParams } from "@/features/search/url";
import { buildMetadata } from "@/lib/seo/metadata";

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
    title: normalizedLocale === "en" ? "Marketplace" : "사고팔기",
    description:
      normalizedLocale === "en"
        ? "Community marketplace listings"
        : "커뮤니티 사고팔기 게시물",
    path: `/${normalizedLocale}/marketplace`,
  });
}

export const revalidate = 120;

export default async function MarketplacePage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const result = await getMarketplaceItems(normalizedLocale, filters);
  const items = result.items;
  const hasNextPage = result.page < result.totalPages;

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

      <div className="mb-6">
        <ListingFilters
          domain="marketplace"
          initialFilters={filters}
        />
      </div>

      <div className="mb-6">
        <ListingActiveFilters filters={filters} />
      </div>

      <ListingResultSummary
        total={result.total}
        currentPage={result.page}
        totalPages={result.totalPages}
        locale={normalizedLocale}
      />

      {items.length > 0 ? (
        <>
          <MarketplaceGrid items={items} locale={normalizedLocale} />
          <ListingPagination
            currentPage={filters.page}
            hasNextPage={hasNextPage}
          />
        </>
      ) : (
        <ListingEmptyState locale={normalizedLocale} />
      )}
    </Container>
  );
}
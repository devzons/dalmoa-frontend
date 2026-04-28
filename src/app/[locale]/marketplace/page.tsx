import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import { getPaginatedMarketplaceItems } from "@/features/marketplace/api";
import ListingActiveFilters from "@/features/search/components/ListingActiveFilters";
import ListingEmptyState from "@/features/search/components/ListingEmptyState";
import ListingFilters from "@/features/search/components/ListingFilters";
import ListingPagination from "@/features/search/components/ListingPagination";
import ListingResultSummary from "@/features/search/components/ListingResultSummary";
import { parseListingSearchParams } from "@/features/search/url";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
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
  const domain = "marketplace";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const result = await getPaginatedMarketplaceItems(normalizedLocale, filters);

  const items = Array.isArray(result?.items) ? result.items : [];
  const currentPage = result?.page ?? filters.page ?? 1;
  const total = result?.total ?? 0;
  const totalPages = result?.totalPages ?? 1;
  const hasNextPage = currentPage < totalPages;

  const { featured, regular } =
    currentPage === 1 ? splitFeatured(items) : { featured: [], regular: items };

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
        <ListingFilters domain={domain} initialFilters={filters} />
      </div>

      <div className="mb-6">
        <ListingActiveFilters filters={filters} />
      </div>

      <ListingResultSummary
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        locale={normalizedLocale}
      />

      {items.length > 0 ? (
        <div className="space-y-10">
          {featured.length > 0 && (
            <FeaturedListingGrid
              items={featured}
              locale={normalizedLocale}
              domain={domain}
            />
          )}

          {regular.length > 0 && (
            <div className="divide-y rounded-lg border border-neutral-200 bg-white">
              {regular.map((item: any) => (
                <ListingRowItem
                  key={item.id ?? item.slug}
                  item={item}
                  locale={normalizedLocale}
                  domain={domain}
                />
              ))}
            </div>
          )}

          <ListingPagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
          />
        </div>
      ) : (
        <ListingEmptyState locale={normalizedLocale} />
      )}
    </Container>
  );
}
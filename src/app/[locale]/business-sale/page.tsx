import { Container } from "@/components/base/Container";
import { CreateListingEntry } from "@/components/common/CreateListingEntry";
import { getPaginatedBusinessSaleItems } from "@/features/business-sale/api";

import ListingActiveFilters from "@/features/search/components/ListingActiveFilters";
import ListingEmptyState from "@/features/search/components/ListingEmptyState";
import ListingFilters from "@/features/search/components/ListingFilters";
import ListingPagination from "@/features/search/components/ListingPagination";
import ListingResultSummary from "@/features/search/components/ListingResultSummary";
import { parseListingSearchParams } from "@/features/search/url";

import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BusinessSalePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const result = await getPaginatedBusinessSaleItems(normalizedLocale, filters);

  const items = result.items || [];
  const page = result.page;

  const hasNextPage = result.page < result.totalPages;

  const featured =
    page === 1
      ? items
          .filter((i: any) => i.featured || i.isFeatured)
          .slice(0, 6)
      : [];

  const featuredIds = new Set(featured.map((i: any) => i.id));

  const regular = items.filter((i: any) => !featuredIds.has(i.id));

  return (
    <Container className="py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {normalizedLocale === "en" ? "Business for Sale" : "사업체 매매"}
          </h1>
          <p className="mt-2 text-neutral-500">
            {normalizedLocale === "en"
              ? "Browse business sale listings."
              : "등록된 사업체 매매 정보를 확인하세요."}
          </p>
        </div>

        <CreateListingEntry
          locale={normalizedLocale}
          category="business-sale"
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <ListingFilters domain="business-sale" initialFilters={filters} />
      </div>

      <div className="mb-6">
        <ListingActiveFilters filters={filters} />
      </div>

      {/* Summary */}
      <ListingResultSummary
        total={result.total}
        currentPage={result.page}
        totalPages={result.totalPages}
        locale={normalizedLocale}
      />

      {/* Content */}
      {items.length > 0 ? (
        <div className="space-y-10">
          {/* Featured */}
          {featured.length > 0 && (
            <FeaturedListingGrid
              items={featured}
              locale={normalizedLocale}
              domain="business-sale"
            />
          )}

          {/* Regular */}
          <div className="divide-y">
            {regular.map((item: any) => (
              <ListingRowItem
                key={item.id}
                item={item}
                locale={normalizedLocale}
                domain="business-sale"
              />
            ))}
          </div>

          {/* Pagination */}
          <ListingPagination
            currentPage={filters.page}
            hasNextPage={hasNextPage}
          />
        </div>
      ) : (
        <ListingEmptyState locale={normalizedLocale} />
      )}
    </Container>
  );
}
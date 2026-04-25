import { Container } from "@/components/base/Container";
import { getPaginatedLoanItems } from "@/features/loan/api";

import ListingActiveFilters from "@/features/search/components/ListingActiveFilters";
import ListingEmptyState from "@/features/search/components/ListingEmptyState";
import ListingFilters from "@/features/search/components/ListingFilters";
import ListingPagination from "@/features/search/components/ListingPagination";
import ListingResultSummary from "@/features/search/components/ListingResultSummary";
import { parseListingSearchParams } from "@/features/search/url";
import { buildMetadata } from "@/lib/seo/metadata";

import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Loan" : "융자",
    description:
      normalizedLocale === "en"
        ? "Loan and financing opportunities"
        : "융자 및 금융 정보를 확인하세요.",
    path: `/${normalizedLocale}/loan`,
  });
}

export const revalidate = 120;

export default async function LoanPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const result = await getPaginatedLoanItems(normalizedLocale, filters);

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Loan" : "융자"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Explore loan and financing opportunities."
            : "등록된 융자 및 금융 정보를 확인하세요."}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <ListingFilters domain="loan" initialFilters={filters} />
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
              domain="loan"
            />
          )}

          {/* Regular */}
          <div className="divide-y">
            {regular.map((item: any) => (
              <ListingRowItem
                key={item.id}
                item={item}
                locale={normalizedLocale}
                domain="loan"
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
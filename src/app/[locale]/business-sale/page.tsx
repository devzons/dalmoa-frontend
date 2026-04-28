import { Container } from "@/components/base/Container";
import { CreateListingEntry } from "@/components/common/CreateListingEntry";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { getPaginatedBusinessSaleItems } from "@/features/business-sale/api";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import ListingActiveFilters from "@/features/search/components/ListingActiveFilters";
import ListingEmptyState from "@/features/search/components/ListingEmptyState";
import ListingFilters from "@/features/search/components/ListingFilters";
import ListingPagination from "@/features/search/components/ListingPagination";
import ListingResultSummary from "@/features/search/components/ListingResultSummary";
import { parseListingSearchParams } from "@/features/search/url";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BusinessSalePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const domain = "business-sale";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const result = await getPaginatedBusinessSaleItems(normalizedLocale, filters);

  const items = Array.isArray(result?.items) ? result.items : [];
  const currentPage = result?.page ?? filters.page ?? 1;
  const total = result?.total ?? 0;
  const totalPages = result?.totalPages ?? 1;
  const hasNextPage = currentPage < totalPages;

  const { featured, regular } =
    currentPage === 1
      ? splitFeatured(items)
      : { featured: [], regular: items };

  return (
    <Container className="py-10">
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

        <CreateListingEntry locale={normalizedLocale} category={domain} />
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
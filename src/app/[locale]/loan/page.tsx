import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import { getPaginatedLoanItems } from "@/features/loan/api";
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
  const domain = "loan";

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filters = parseListingSearchParams(resolvedSearchParams);

  const result = await getPaginatedLoanItems(normalizedLocale, filters);

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
          {normalizedLocale === "en" ? "Loan" : "융자"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Explore loan and financing opportunities."
            : "등록된 융자 및 금융 정보를 확인하세요."}
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
            <>
              {/* 헤더 */}
              <div className="grid grid-cols-[1fr_60px] sm:grid-cols-[2fr_3fr_1fr_80px] gap-4 border-b bg-neutral-50 px-4 py-2 mb-2 text-xs font-semibold text-neutral-500">
                <div>제목</div>
                <div className="hidden sm:block">내용</div>
                <div className="hidden sm:block">지역</div>
                <div className="text-right">조회수</div>
              </div>

              {/* 리스트 */}
              {regular.map((item) => (
                <ListingRowItem
                  key={item.id}
                  item={item}
                  locale={normalizedLocale}
                  domain="jobs"
                />
              ))}
            </>
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
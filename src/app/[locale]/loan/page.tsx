import { Container } from "@/components/base/Container";
import { getLoanItems } from "@/features/loan/api";
import { LoanGrid } from "@/features/loan/components/LoanGrid";
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

  const items = await getLoanItems(normalizedLocale, filters);

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
        <ListingFilters
          domain="loan"
          initialFilters={filters}
        />
      </div>

      <div className="mb-6">
        <ListingActiveFilters filters={filters} />
      </div>

      <LoanGrid items={items} locale={normalizedLocale} />
      <ListingPagination currentPage={filters.page} />
    </Container>
  );
}
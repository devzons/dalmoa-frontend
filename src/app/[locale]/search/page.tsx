import { Container } from "@/components/base/Container";
import {
  SearchFilters,
  type SearchFilterValues,
} from "@/features/search/components/SearchFilters";
import { SearchEmpty } from "@/features/search/components/SearchEmpty";
import { SearchResults } from "@/features/search/components/SearchResults";
import { searchAll } from "@/features/search/api";
import { normalizeSearchQuery } from "@/features/search/utils";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
    featured?: string;
    region?: string;
    price_min?: string;
    price_max?: string;
    page?: string;
  }>;
};

function normalizeFilterValues(searchParams: {
  q?: string;
  featured?: string;
  region?: string;
  price_min?: string;
  price_max?: string;
}): SearchFilterValues {
  return {
    q: normalizeSearchQuery(searchParams.q),
    featured: searchParams.featured === "1",
    region: (searchParams.region ?? "").trim(),
    price_min: (searchParams.price_min ?? "").replace(/[^\d]/g, ""),
    price_max: (searchParams.price_max ?? "").replace(/[^\d]/g, ""),
  };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Search" : "검색",
    description:
      normalizedLocale === "en"
        ? "Search across Dalmoa content"
        : "달모아 통합 검색",
    path: `/${normalizedLocale}/search`,
  });
}

export const revalidate = 120;

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const resolvedSearchParams = await searchParams;

  const filters = normalizeFilterValues(resolvedSearchParams);
  const q = filters.q;

  const data = q
    ? await searchAll(q, normalizedLocale)
    : { q: "", total: 0, results: [] };

  return (
    <Container className="space-y-8 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Search" : "검색"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Search businesses, ads, and business pages."
            : "업소, 광고, 비즈니스 페이지를 검색하세요."}
        </p>
      </div>

      <SearchFilters locale={normalizedLocale} initialValues={filters} />

      {q ? (
        <div className="text-sm text-neutral-500">
          {normalizedLocale === "en"
            ? `${data.total} results for "${q}"`
            : `"${q}" 검색 결과 ${data.total}건`}
        </div>
      ) : null}

      {q ? (
        data.total > 0 ? (
          <SearchResults data={data} locale={normalizedLocale} />
        ) : (
          <SearchEmpty locale={normalizedLocale} />
        )
      ) : null}
    </Container>
  );
}
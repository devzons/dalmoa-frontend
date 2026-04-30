import Link from "next/link";
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
import { getFeaturedAds } from "@/features/ads/api/getFeaturedAds";
import { FeaturedAdSection } from "@/features/ads/components/FeaturedAdSection";

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

  const [data, ads] = await Promise.all([
    q ? searchAll(q, normalizedLocale) : Promise.resolve({ q: "", total: 0, results: [] }),
    getFeaturedAds(normalizedLocale),
  ]);

  return (
    <Container className="space-y-6 py-6 md:space-y-8 md:py-10">
      <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {normalizedLocale === "en" ? "Search" : "검색"}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 md:text-base">
          {normalizedLocale === "en"
            ? "Search jobs, business sale, loan, marketplace, real estate, cars, news, town board, businesses, and ads."
            : "구인구직, 사업체매매, 융자, 사고팔기, 부동산, 자동차, 뉴스, 타운게시판, 업소, 광고를 통합 검색하세요."}
        </p>
      </div>

      <SearchFilters locale={normalizedLocale} initialValues={filters} />

      {ads.length > 0 ? (
        <FeaturedAdSection
          items={ads.slice(0, 3)}
          locale={normalizedLocale}
          placement="search_top"
        />
      ) : null}

      {!q ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-6 text-center md:p-10">
          <h2 className="text-lg font-semibold text-neutral-900">
            {normalizedLocale === "en"
              ? "Enter a keyword to start searching."
              : "검색어를 입력하면 결과가 표시됩니다."}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {normalizedLocale === "en"
              ? "Try Dallas, restaurant, job, loan, apartment, or SUV."
              : "예: Dallas, 식당, 구인, 융자, 렌트, SUV"}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[
              ["jobs", normalizedLocale === "en" ? "Jobs" : "구인구직"],
              [
                "business-sale",
                normalizedLocale === "en" ? "Business Sale" : "사업체매매",
              ],
              ["loan", normalizedLocale === "en" ? "Loan" : "융자"],
              [
                "marketplace",
                normalizedLocale === "en" ? "Marketplace" : "사고팔기",
              ],
              [
                "real-estate",
                normalizedLocale === "en" ? "Real Estate" : "부동산",
              ],
              ["cars", normalizedLocale === "en" ? "Cars" : "자동차"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={`/${normalizedLocale}/${href}`}
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {q ? (
        <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <span>
            {normalizedLocale === "en"
              ? `${data.total} results for "${q}"`
              : `"${q}" 검색 결과 ${data.total}건`}
          </span>
          <Link
            href={`/${normalizedLocale}/search`}
            className="font-medium text-neutral-900 underline underline-offset-4"
          >
            {normalizedLocale === "en" ? "Clear search" : "검색 초기화"}
          </Link>
        </div>
      ) : null}

      {q ? (
        data.total > 0 ? (
          <SearchResults data={data} locale={normalizedLocale} />
        ) : (
          <SearchEmpty locale={normalizedLocale} q={q} />
        )
      ) : null}
    </Container>
  );
}
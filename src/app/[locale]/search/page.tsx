import { Container } from "@/components/base/Container";
import { SearchBar } from "@/features/search/components/SearchBar";
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
  }>;
};

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

export default async function SearchPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const resolvedSearchParams = await searchParams;
  const q = normalizeSearchQuery(resolvedSearchParams.q);

  const data = q
    ? await searchAll(q, normalizedLocale)
    : { q: "", total: 0, results: [] };

  return (
    <Container className="py-10 space-y-8">
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

      <SearchBar locale={normalizedLocale} />

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
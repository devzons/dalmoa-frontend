import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";

export function SearchEmpty({
  locale,
  q,
}: {
  locale: "ko" | "en";
  q: string;
}) {
  const suggestions =
    locale === "en"
      ? ["restaurant", "job", "loan", "apartment", "car", "Dallas"]
      : ["식당", "구인", "융자", "아파트", "자동차", "Dallas"];

  return (
    <div className="space-y-6">
      <EmptyState
        title={locale === "en" ? "No results found." : "검색 결과가 없습니다."}
        description={
          locale === "en"
            ? `No results for "${q}". Try different keywords or browse categories.`
            : `"${q}"에 대한 결과가 없습니다. 다른 검색어나 카테고리를 이용해보세요.`
        }
      />

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <p className="mb-3 text-sm font-medium text-neutral-500">
          {locale === "en" ? "Try these keywords" : "추천 검색어"}
        </p>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <Link
              key={item}
              href={`/${locale}/search?q=${encodeURIComponent(item)}`}
              className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-200"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <p className="mb-3 text-sm font-medium text-neutral-500">
          {locale === "en" ? "Browse categories" : "카테고리 바로가기"}
        </p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {[
            ["jobs", locale === "en" ? "Jobs" : "구인구직"],
            ["business-sale", locale === "en" ? "Business Sale" : "사업체매매"],
            ["loan", locale === "en" ? "Loan" : "융자"],
            ["marketplace", locale === "en" ? "Marketplace" : "사고팔기"],
            ["real-estate", locale === "en" ? "Real Estate" : "부동산"],
            ["cars", locale === "en" ? "Cars" : "자동차"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
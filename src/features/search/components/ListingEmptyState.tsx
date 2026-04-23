type Props = {
  locale: "ko" | "en";
  title?: string;
  description?: string;
};

export default function ListingEmptyState({
  locale,
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
      <h2 className="text-lg font-semibold text-neutral-900">
        {title ??
          (locale === "en" ? "No results found" : "검색 결과가 없습니다")}
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        {description ??
          (locale === "en"
            ? "Try changing your search or filter conditions."
            : "검색어나 필터 조건을 변경해보세요.")}
      </p>
    </div>
  );
}
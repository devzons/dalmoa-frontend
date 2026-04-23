type Props = {
  total: number;
  currentPage: number;
  totalPages: number;
  locale: "ko" | "en";
};

export default function ListingResultSummary({
  total,
  currentPage,
  totalPages,
  locale,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {locale === "en"
          ? `Total ${total} result${total === 1 ? "" : "s"}`
          : `총 ${total}개 결과`}
      </div>

      <div>
        {locale === "en"
          ? `Page ${currentPage} / ${Math.max(totalPages, 1)}`
          : `${currentPage} / ${Math.max(totalPages, 1)} 페이지`}
      </div>
    </div>
  );
}
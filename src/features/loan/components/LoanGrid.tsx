import { EmptyState } from "@/components/common/EmptyState";
import { LoanCard } from "@/features/loan/components/LoanCard";
import type { LoanItem } from "@/features/loan/types";

export function LoanGrid({
  items,
  locale,
}: {
  items: LoanItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={
          locale === "en"
            ? "No loan posts found."
            : "등록된 융자 글이 없습니다."
        }
        description={
          locale === "en"
            ? "Please check back later."
            : "잠시 후 다시 확인해 주세요."
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <LoanCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
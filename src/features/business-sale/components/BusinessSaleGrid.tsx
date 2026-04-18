import { EmptyState } from "@/components/common/EmptyState";
import { BusinessSaleCard } from "@/features/business-sale/components/BusinessSaleCard";
import type { BusinessSaleItem } from "@/features/business-sale/types";

export function BusinessSaleGrid({
  items,
  locale,
}: {
  items: BusinessSaleItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={
          locale === "en"
            ? "No business sale posts found."
            : "등록된 사업체매매 글이 없습니다."
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
        <BusinessSaleCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
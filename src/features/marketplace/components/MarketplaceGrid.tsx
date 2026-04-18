import { EmptyState } from "@/components/common/EmptyState";
import { MarketplaceCard } from "@/features/marketplace/components/MarketplaceCard";
import type { MarketplaceItem } from "@/features/marketplace/types";

export function MarketplaceGrid({
  items,
  locale,
}: {
  items: MarketplaceItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={locale === "en" ? "No marketplace posts found." : "등록된 사고팔기 글이 없습니다."}
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
        <MarketplaceCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
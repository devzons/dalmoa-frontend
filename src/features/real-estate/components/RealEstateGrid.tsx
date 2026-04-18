import { EmptyState } from "@/components/common/EmptyState";
import { RealEstateCard } from "@/features/real-estate/components/RealEstateCard";
import type { RealEstateItem } from "@/features/real-estate/types";

export function RealEstateGrid({
  items,
  locale,
}: {
  items: RealEstateItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={locale === "en" ? "No real estate posts found." : "등록된 부동산 글이 없습니다."}
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
        <RealEstateCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
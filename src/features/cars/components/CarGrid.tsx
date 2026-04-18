import { EmptyState } from "@/components/common/EmptyState";
import { CarCard } from "@/features/cars/components/CarCard";
import type { CarItem } from "@/features/cars/types";

export function CarGrid({
  items,
  locale,
}: {
  items: CarItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={locale === "en" ? "No car posts found." : "등록된 자동차 글이 없습니다."}
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
        <CarCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
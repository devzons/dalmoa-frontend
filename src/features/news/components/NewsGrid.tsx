import { EmptyState } from "@/components/common/EmptyState";
import { NewsCard } from "@/features/news/components/NewsCard";
import type { NewsItem } from "@/features/news/types";

export function NewsGrid({
  items,
  locale,
}: {
  items: NewsItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={locale === "en" ? "No news found." : "등록된 뉴스가 없습니다."}
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
        <NewsCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
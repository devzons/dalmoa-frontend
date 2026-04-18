import { EmptyState } from "@/components/common/EmptyState";
import { DirectoryCard } from "@/features/directory/components/DirectoryCard";
import type { DirectoryItem } from "@/features/directory/types";

export function DirectoryGrid({
  items,
  locale,
}: {
  items: DirectoryItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="등록된 업소가 없습니다."
        description="잠시 후 다시 확인해 주세요."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <DirectoryCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
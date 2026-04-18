import { EmptyState } from "@/components/common/EmptyState";
import { TownBoardCard } from "@/features/town-board/components/TownBoardCard";
import type { TownBoardItem } from "@/features/town-board/types";

export function TownBoardGrid({
  items,
  locale,
}: {
  items: TownBoardItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={locale === "en" ? "No town board posts found." : "등록된 타운게시판 글이 없습니다."}
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
        <TownBoardCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
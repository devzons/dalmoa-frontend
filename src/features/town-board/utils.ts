import type { TownBoardItem } from "@/features/town-board/types";

export function hasTownBoardContent(item: TownBoardItem) {
  return Boolean(item.content);
}
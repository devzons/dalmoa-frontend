import type { CarItem } from "@/features/cars/types";

export function hasCarContent(item: CarItem) {
  return Boolean(item.content);
}
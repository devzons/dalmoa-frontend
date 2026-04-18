import type { RealEstateItem } from "@/features/real-estate/types";

export function hasRealEstateContent(item: RealEstateItem) {
  return Boolean(item.content);
}
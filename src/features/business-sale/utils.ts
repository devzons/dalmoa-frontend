import type { BusinessSaleItem } from "@/features/business-sale/types";

export function hasBusinessSaleContent(item: BusinessSaleItem) {
  return Boolean(item.content);
}
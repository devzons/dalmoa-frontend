import type { MarketplaceItem } from "@/features/marketplace/types";

export function hasMarketplaceContent(item: MarketplaceItem) {
  return Boolean(item.content);
}
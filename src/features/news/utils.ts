import type { NewsItem } from "@/features/news/types";

export function hasNewsContent(item: NewsItem) {
  return Boolean(item.content);
}
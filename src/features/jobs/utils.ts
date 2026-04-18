import type { JobItem } from "@/features/jobs/types";

export function hasJobContent(item: JobItem) {
  return Boolean(item.content);
}
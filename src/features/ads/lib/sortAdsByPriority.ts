import type { AdItem } from "@/features/ads/types/ad";

const PLAN_PRIORITY: Record<string, number> = {
  premium: 30,
  premium_monthly: 30,
  featured: 20,
  featured_monthly: 20,
  basic: 10,
};

const FALLBACK_PRIORITY: Record<string, number> = {
  premium: 30,
  featured: 20,
  basic: 10,
};

function getAdPriority(item: AdItem): number {
  return (
    PLAN_PRIORITY[item.adPlan ?? ""] ??
    FALLBACK_PRIORITY[item.priority ?? ""] ??
    0
  );
}

function getTimestamp(value?: string | null): number {
  if (!value) return 0;

  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function sortAdsByPriority<T extends AdItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const priorityDiff = getAdPriority(b) - getAdPriority(a);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return getTimestamp(b.createdAt) - getTimestamp(a.createdAt);
  });
}
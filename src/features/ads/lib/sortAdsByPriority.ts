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

function getFeaturedPriority(item: AdItem): number {
  return item.isFeatured ? 100 : 0;
}

function getTimestamp(value?: string | null): number {
  if (!value) return 0;

  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getCTR(item: AdItem): number {
  const clicks = Number(
    (item as any).clickCount ?? (item as any).click_count ?? 0
  );
  const impressions = Number(
    (item as any).impressionCount ?? (item as any).impression_count ?? 0
  );

  if (impressions <= 0) return 0;
  return clicks / impressions;
}

export function sortAdsByPriority<T extends AdItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const featuredDiff = getFeaturedPriority(b) - getFeaturedPriority(a);
    if (featuredDiff !== 0) return featuredDiff;

    const priorityDiff = getAdPriority(b) - getAdPriority(a);
    if (priorityDiff !== 0) return priorityDiff;

    const ctrDiff = getCTR(b) - getCTR(a);
    if (ctrDiff !== 0) return ctrDiff;

    const featuredAtDiff =
      getTimestamp(b.featuredAt) - getTimestamp(a.featuredAt);
    if (featuredAtDiff !== 0) return featuredAtDiff;

    return getTimestamp(b.createdAt) - getTimestamp(a.createdAt);
  });
}
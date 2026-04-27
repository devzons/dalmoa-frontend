function isTruthy(value: unknown) {
  return value === true || value === 1 || value === "1" || value === "true";
}

function getPriority(item: any) {
  return Number(
    item?.adPriority ??
      item?.priorityScore ??
      item?.priority_score ??
      item?.priority ??
      0
  );
}

function getAdPlan(item: any) {
  return item?.adPlan ?? item?.ad_plan ?? item?.plan ?? null;
}

function isFeaturedItem(item: any) {
  const plan = getAdPlan(item);

  return (
    isTruthy(item?.isFeatured) ||
    isTruthy(item?.is_featured) ||
    isTruthy(item?.featured) ||
    isTruthy(item?.isPaid) ||
    isTruthy(item?.is_paid) ||
    plan === "featured" ||
    plan === "premium" ||
    getPriority(item) > 0
  );
}

export function splitFeatured<
  T extends { id?: number | string; slug?: string | null },
>(items: T[] = [], limit = 6) {
  const featured = items
    .filter(isFeaturedItem)
    .sort((a: any, b: any) => getPriority(b) - getPriority(a))
    .slice(0, limit);

  const featuredKeys = new Set(
    featured.map((item) => item.id ?? item.slug).filter(Boolean)
  );

  const regular = items.filter(
    (item) => !featuredKeys.has(item.id ?? item.slug)
  );

  return { featured, regular };
}
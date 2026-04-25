export function buildListingHref({
  locale,
  domain,
  slug,
}: {
  locale: "ko" | "en";
  domain: string;
  slug?: string | null;
}) {
  const pathMap: Record<string, string> = {
    jobs: "jobs",
    "business-sale": "business-sale",
    loan: "loan",
    marketplace: "marketplace",
    "real-estate": "real-estate",
    cars: "cars",
    directory: "directory",
    news: "news",
    "town-board": "town-board",
    ads: "ads",
  };

  const path = pathMap[domain] ?? domain;

  // 🔥 slug 없을 때 안전 처리 (Not Found 방지)
  if (!slug || typeof slug !== "string") {
    return `/${locale}/${path}`;
  }

  return `/${locale}/${path}/${encodeURIComponent(slug)}`;
}
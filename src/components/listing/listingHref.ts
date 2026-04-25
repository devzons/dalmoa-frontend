export function buildListingHref({
  locale,
  domain,
  slug,
}: {
  locale: "ko" | "en";
  domain: string;
  slug: string;
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

  return `/${locale}/${path}/${slug}`;
}
export type ListingDomain =
  | "jobs"
  | "directory"
  | "business-sale"
  | "loan"
  | "marketplace"
  | "real-estate"
  | "cars"
  | "town-board"
  | "news"
  | "ads"
  | "business";

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function buildListingHref({
  locale,
  domain,
  slug,
}: {
  locale: "ko" | "en";
  domain: ListingDomain;
  slug?: string | null;
}) {
  if (!slug) return `/${locale}/${domain}`;

  return `/${locale}/${domain}/${normalizeSlug(slug)}`;
}
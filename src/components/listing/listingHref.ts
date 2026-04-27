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
  let value = slug;

  for (let i = 0; i < 3; i++) {
    try {
      const decoded = decodeURIComponent(value);
      if (decoded === value) break;
      value = decoded;
    } catch {
      break;
    }
  }

  return encodeURIComponent(value);
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
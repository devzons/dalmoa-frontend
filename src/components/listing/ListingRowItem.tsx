import Link from "next/link";
import { buildListingHref, type ListingDomain } from "./listingHref";

type Item = {
  id?: number | string;
  slug?: string | null;
  title?: string | null;
  name?: string | null;
  businessName?: string | null;
  displayName?: string | null;
  excerpt?: string | null;
  description?: string | null;
  category?: string | null;
  categoryLabel?: string | null;
  businessCategory?: string | null;
  address?: string | null;
  phone?: string | null;
  region?: string | null;
  jobLocation?: string | null;
  price?: number | string | null;
  hero?: {
    title?: string | null;
    subtitle?: string | null;
  };
};

type Props = {
  item: Item;
  locale: "ko" | "en";
  domain: ListingDomain;
};

export default function ListingRowItem({ item, locale, domain }: Props) {
  const title =
    item.title ||
    item.name ||
    item.businessName ||
    item.displayName ||
    item.hero?.title ||
    "Untitled";

  const subtitle =
    item.address ||
    item.businessCategory ||
    item.categoryLabel ||
    item.category ||
    item.region ||
    item.jobLocation ||
    item.hero?.subtitle ||
    item.excerpt ||
    item.description ||
    null;

  const price =
    typeof item.price === "number"
      ? `$${item.price.toLocaleString()}`
      : item.price;

  const href = buildListingHref({
    locale,
    domain,
    slug: item.slug,
  });

  return (
    <Link
      href={href}
      className="block px-4 py-3 transition hover:bg-neutral-50"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-neutral-900">
            {title}
          </div>

          {subtitle ? (
            <div className="mt-1 truncate text-xs text-neutral-500">
              {subtitle}
            </div>
          ) : null}
        </div>

        <div className="shrink-0 text-right">
          {price ? (
            <div className="text-xs font-semibold text-neutral-700">
              {price}
            </div>
          ) : null}

          {item.phone ? (
            <div className="mt-1 text-[11px] text-neutral-500">
              {item.phone}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
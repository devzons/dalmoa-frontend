"use client";

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
  views?: number | string | null;
  viewCount?: number | string | null;
  hitCount?: number | string | null;
  view_count?: number | string | null;
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

function normalizeViews(value: unknown): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
}

export default function ListingRowItem({ item, locale, domain }: Props) {
  const title =
    item.title ||
    item.name ||
    item.businessName ||
    item.displayName ||
    item.hero?.title ||
    "Untitled";

  const content =
    item.excerpt ||
    item.description ||
    item.hero?.subtitle ||
    item.categoryLabel ||
    item.category ||
    "-";

  const region = item.region || item.jobLocation || item.address || "-";

  const views = normalizeViews(
    item.views ?? item.viewCount ?? item.view_count ?? item.hitCount ?? 0
  );

  const href = buildListingHref({
    locale,
    domain,
    slug: item.slug,
  });

  return (
    <Link
      href={href}
      className="mb-1 grid grid-cols-[1fr_60px] gap-1 border-b border-neutral-200 px-3 py-2 text-sm transition hover:bg-neutral-50 sm:grid-cols-[2fr_3fr_1fr_80px]"
    >
      <div className="truncate font-semibold text-neutral-900">{title}</div>

      <div className="hidden truncate text-neutral-500 sm:block">{content}</div>

      <div className="hidden truncate text-neutral-500 sm:block">{region}</div>

      <div className="text-right text-neutral-400">{views}</div>
    </Link>
  );
}
"use client";

import Link from "next/link";
import { buildListingHref, type ListingDomain } from "./listingHref";
import { trackAdEvent } from "@/features/ads/api/trackAdEvent";

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

  // 🔥 ads fields
  adPlan?: string | null;
  isFeatured?: boolean | number | string;
};

type Props = {
  item: Item;
  locale: "ko" | "en";
  domain: ListingDomain;
};

function isTruthy(value: unknown) {
  return value === true || value === 1 || value === "1" || value === "true";
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

  const views =
    item.viewCount ?? item.views ?? item.hitCount ?? item.view_count ?? 0;

  const href = buildListingHref({
    locale,
    domain,
    slug: item.slug,
  });

  const isAd =
    item.adPlan === "premium" ||
    item.adPlan === "featured" ||
    isTruthy(item.isFeatured);

  return (
    <Link
      href={href}
      onClick={() => {
        if (isAd && item?.id) {
          trackAdEvent({
            adId: Number(item.id),
            type: "click",
            placement: "listing_row",
          });
        }
      }}
      className="grid grid-cols-[1fr_60px] sm:grid-cols-[2fr_3fr_1fr_80px] gap-1 px-3 py-2 mb-1 text-sm transition border-b border-neutral-200 hover:bg-neutral-50"
    >
      <div className="truncate font-semibold text-neutral-900">
        {title}
      </div>

      <div className="hidden sm:block truncate text-neutral-500">
        {content}
      </div>

      <div className="hidden sm:block truncate text-neutral-500">
        {region}
      </div>

      <div className="text-right text-neutral-400">
        {views}
      </div>
    </Link>
  );
}
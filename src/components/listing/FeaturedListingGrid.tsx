"use client";

import Link from "next/link";
import { useEffect } from "react";
import { env } from "@/lib/config/env";
import { normalizeMediaUrl } from "@/lib/api/client";
import { buildListingHref, type ListingDomain } from "./listingHref";

type Item = {
  id: number | string;
  slug?: string | null;
  title?: string | null;
  price?: number | string | null;
  priceLabel?: string | null;
  salePriceLabel?: string | null;
  region?: string | null;
  excerpt?: string | null;
  companyName?: string | null;
  jobLocation?: string | null;
  thumbnailUrl?: string | null;
  thumbnail?: string | null;
  imageUrl?: string | null;
  featuredImageUrl?: string | null;
  featuredImage?: string | null;
  image?: string | null;
  businessCategory?: string | null;
  address?: string | null;
  phone?: string | null;
  featured?: boolean | number | string | null;
  isFeatured?: boolean | number | string | null;
  isPaid?: boolean | number | string | null;
  isAdActive?: boolean | null;
  adPlan?: string | null;
  adPriority?: number | string | null;
  hero?: {
    title?: string | null;
    subtitle?: string | null;
  };
};

type Props = {
  items: Item[];
  locale: "ko" | "en";
  domain: ListingDomain;
};

function isTruthy(value: unknown) {
  return value === true || value === 1 || value === "1" || value === "true";
}

function getPlan(item: Item) {
  return (item.adPlan || "").toLowerCase();
}

function trackAdEvent(
  id: number | string | undefined,
  type: "click" | "impression"
) {
  if (!id) return;

  const baseUrl = env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");

  fetch(`${baseUrl}/ads/${id}/${type}`, {
    method: "POST",
    keepalive: true,
  }).catch(() => {});
}

function getThumbnailUrl(item: Item) {
  return normalizeMediaUrl(
    item.thumbnailUrl ||
      item.thumbnail ||
      item.imageUrl ||
      item.featuredImageUrl ||
      item.featuredImage ||
      item.image
  );
}

export default function FeaturedListingGrid({
  items,
  locale,
  domain,
}: Props) {
  useEffect(() => {
    if (domain !== "ads") return;

    items.forEach((item) => {
      trackAdEvent(item.id, "impression");
    });
  }, [domain, items]);

  if (!items.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-950">
          {locale === "en" ? "Featured" : "추천"}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const plan = getPlan(item);
          const adPriority = Number(item.adPriority || 0);
          const isPaid = isTruthy(item.isPaid);
          const isAdActive = item.isAdActive !== false;

          const isPremium = isAdActive && plan === "premium";
          const isFeaturedAd =
            isAdActive && (plan === "featured" || adPriority >= 200);
          const isSponsored =
            isAdActive && isPaid && !isPremium && !isFeaturedAd;
          const isFreeFeatured =
            !isPaid &&
            !plan &&
            (isTruthy(item.isFeatured) || isTruthy(item.featured));

          const badgeLabel = isPremium
            ? "PREMIUM"
            : isFeaturedAd
              ? "FEATURED"
              : isSponsored
                ? locale === "en"
                  ? "SPONSORED"
                  : "광고"
                : isFreeFeatured
                  ? locale === "en"
                    ? "FEATURED"
                    : "추천"
                  : null;

          const title =
            item.title ||
            item.hero?.title ||
            item.companyName ||
            item.excerpt ||
            "Untitled";

          const subtitle =
            item.businessCategory ||
            item.region ||
            item.address ||
            item.jobLocation ||
            item.hero?.subtitle ||
            item.excerpt ||
            null;

          const price =
            typeof item.price === "number"
              ? `$${item.price.toLocaleString()}`
              : item.price || item.priceLabel || item.salePriceLabel || null;

          const href = buildListingHref({
            locale,
            domain,
            slug: item.slug,
          });

          const thumbnailUrl = getThumbnailUrl(item);

          return (
            <Link
              key={item.id ?? item.slug ?? title}
              href={href}
              onClick={() => {
                if (domain === "ads") {
                  trackAdEvent(item.id, "click");
                }
              }}
              className={[
                "group relative block overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                isPremium
                  ? "border-premium ring-2 ring-premium-light shadow-lg"
                  : isFeaturedAd
                    ? "border-featured ring-2 ring-featured-light shadow-md"
                    : isSponsored
                      ? "border-sponsored ring-1 ring-sponsored-light"
                      : "border-neutral-200",
              ].join(" ")}
            >
              {badgeLabel ? (
                <div
                  className={[
                    "absolute left-2 top-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm",
                    isPremium
                      ? "bg-premium text-white"
                      : isFeaturedAd
                        ? "bg-featured text-white"
                        : isSponsored
                          ? "bg-sponsored text-white"
                          : "bg-neutral-800 text-white",
                  ].join(" ")}
                >
                  {badgeLabel}
                </div>
              ) : null}

              {thumbnailUrl ? (
                <div className="aspect-[16/7] overflow-hidden bg-neutral-100">
                  <img
                    src={thumbnailUrl}
                    alt={title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div
                  className={[
                    "flex aspect-[16/7] items-center justify-center text-xs font-semibold",
                    isPremium
                      ? "bg-premium-light text-premium"
                      : isFeaturedAd
                        ? "bg-featured-light text-featured"
                        : isSponsored
                          ? "bg-sponsored-light text-sponsored"
                          : "bg-neutral-100 text-neutral-500",
                  ].join(" ")}
                >
                  {badgeLabel || (locale === "en" ? "Listing" : "게시물")}
                </div>
              )}

              <div className="space-y-1.5 p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900">
                    {title}
                  </h3>

                  {isPremium || isFeaturedAd ? (
                    <span
                      className={[
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold",
                        isPremium
                          ? "bg-premium text-white"
                          : "bg-featured-light text-featured",
                      ].join(" ")}
                    >
                      {isPremium ? "VIP" : "TOP"}
                    </span>
                  ) : null}
                </div>

                {subtitle ? (
                  <p className="line-clamp-1 text-xs text-neutral-500">
                    {subtitle}
                  </p>
                ) : null}

                <div className="flex items-center justify-between pt-1">
                  {price ? (
                    <span className="text-xs font-semibold text-neutral-900">
                      {price}
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-400">
                      {locale === "en" ? "View" : "보기"}
                    </span>
                  )}

                  {item.phone ? (
                    <span className="text-[10px] text-neutral-500">
                      {item.phone}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
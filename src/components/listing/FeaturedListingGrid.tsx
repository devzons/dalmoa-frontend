"use client";

import Link from "next/link";
import { useEffect } from "react";
import { env } from "@/lib/config/env";
import { buildListingHref } from "./listingHref";

type Item = {
  id: number | string;
  slug: string;
  title?: string | null;
  price?: number | string | null;
  priceLabel?: string | null;
  salePriceLabel?: string | null;
  region?: string | null;
  excerpt?: string | null;
  companyName?: string | null;
  jobLocation?: string | null;
  thumbnailUrl?: string | null;
  businessCategory?: string | null;
  address?: string | null;
  phone?: string | null;
  featured?: boolean | number | string | null;
  isFeatured?: boolean | number | string | null;
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
  domain?: string;
};

function trackAdEvent(id: number | string | undefined, type: "click" | "impression") {
  if (!id) return;

  fetch(`${env.NEXT_PUBLIC_API_URL}/ads/${id}/${type}`, {
    method: "POST",
    keepalive: true,
  }).catch(() => {});
}

export default function FeaturedListingGrid({
  items,
  locale,
  domain = "jobs",
}: Props) {
  useEffect(() => {
    if (domain !== "ads" && domain !== "directory") return;

    items.forEach((item) => {
      if (item.id) {
        trackAdEvent(item.id, "impression");
      }
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
          const adPlan = item.adPlan || "basic";
          const adPriority = Number(item.adPriority || 0);
          const isAdActive = item.isAdActive !== false;

          const isPremium = isAdActive && adPlan === "premium";

          const isFeaturedAd =
            isAdActive &&
            (adPlan === "featured" ||
              adPriority >= 20 ||
              item.isFeatured === true ||
              item.featured === true ||
              item.isFeatured === 1 ||
              item.featured === 1 ||
              item.isFeatured === "1" ||
              item.featured === "1" ||
              item.isFeatured === "true" ||
              item.featured === "true");

          const isAd = isPremium || isFeaturedAd;

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

          return (
            <Link
              key={item.id ?? item.slug}
              href={buildListingHref({
                locale,
                domain,
                slug: item.slug,
              })}
              onClick={() => {
                if ((domain === "ads" || domain === "directory") && item.id) {
                  trackAdEvent(item.id, "click");
                }
              }}
              className={[
                "group relative block overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                isPremium
                  ? "border-amber-500 ring-2 ring-amber-300 shadow-lg"
                  : isAd
                    ? "border-amber-400 ring-2 ring-amber-200 shadow-md"
                    : "border-neutral-200",
              ].join(" ")}
            >
              {isAd ? (
                <div
                  className={[
                    "absolute left-2 top-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-sm",
                    isPremium ? "bg-amber-600" : "bg-amber-500",
                  ].join(" ")}
                >
                  {isPremium ? "PREMIUM" : locale === "en" ? "AD" : "광고"}
                </div>
              ) : null}

              {item.thumbnailUrl ? (
                <div className="aspect-[16/7] overflow-hidden bg-neutral-100">
                  <img
                    src={item.thumbnailUrl}
                    alt={title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div
                  className={[
                    "flex aspect-[16/7] items-center justify-center text-xs font-semibold",
                    isPremium
                      ? "bg-amber-100 text-amber-800"
                      : isAd
                        ? "bg-amber-50 text-amber-700"
                        : "bg-neutral-100 text-neutral-500",
                  ].join(" ")}
                >
                  {isPremium
                    ? "Premium"
                    : isAd
                      ? locale === "en"
                        ? "Featured"
                        : "추천"
                      : locale === "en"
                        ? "Listing"
                        : "게시물"}
                </div>
              )}

              <div className="space-y-1.5 p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900">
                    {title}
                  </h3>

                  {isAd ? (
                    <span
                      className={[
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold",
                        isPremium
                          ? "bg-amber-600 text-white"
                          : "bg-amber-100 text-amber-700",
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
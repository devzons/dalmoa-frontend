"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { env } from "@/lib/config/env";
import { normalizeMediaUrl } from "@/lib/api/client";
import { buildListingHref, type ListingDomain } from "./listingHref";

type Props = {
  item: any;
  locale: "ko" | "en";
  domain: ListingDomain;
  variant?: "default" | "ad";
};

function isTruthy(value: unknown) {
  return value === true || value === 1 || value === "1" || value === "true";
}

function trackAdEvent(
  id: number | string | undefined,
  type: "click" | "impression"
) {
  if (!id) return;

  const baseUrl = env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");

  fetch(`${baseUrl}/wp-json/dalmoa/v1/ads/${id}/${type}`, {
    method: "POST",
    keepalive: true,
  }).catch(() => {});
}

export default function HomeListingCard({
  item,
  locale,
  domain,
  variant = "default",
}: Props) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const hasTrackedImpression = useRef(false);

  const adPlan = item?.adPlan || "basic";
  const adPriority = Number(item?.adPriority || 0);
  const isAdActive = item?.isAdActive !== false;

  const isPremium = isAdActive && adPlan === "premium";

  const isFeaturedAd =
    isAdActive &&
    (adPlan === "featured" ||
      adPriority >= 20 ||
      variant === "ad" ||
      domain === "ads" ||
      isTruthy(item?.isFeatured) ||
      isTruthy(item?.featured));

  const isAd = isPremium || isFeaturedAd;
  const shouldTrack = domain === "ads" && Boolean(item?.id);

  useEffect(() => {
    if (!shouldTrack || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!hasTrackedImpression.current) {
            hasTrackedImpression.current = true;
            trackAdEvent(item.id, "impression");
          }

          observer.disconnect();
        }
      },
      { threshold: [0.5] }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [item?.id, shouldTrack]);

  const title =
    item?.title ||
    item?.hero?.title ||
    item?.companyName ||
    item?.businessName ||
    item?.name ||
    "Untitled";

  const subtitle =
    item?.region ||
    item?.address ||
    item?.businessCategory ||
    item?.categoryLabel ||
    item?.category ||
    item?.jobLocation ||
    item?.excerpt ||
    item?.hero?.subtitle ||
    null;

  const price =
    typeof item?.price === "number"
      ? `$${item.price.toLocaleString()}`
      : item?.price || item?.priceLabel || item?.salePriceLabel || null;

  const thumbnailUrl = normalizeMediaUrl(
    item?.thumbnailUrl ||
      item?.thumbnail ||
      item?.imageUrl ||
      item?.featuredImageUrl ||
      item?.featuredImage ||
      item?.image
  );

  const href =
    item?.href ||
    buildListingHref({
      locale,
      domain,
      slug: item?.slug,
    });

  return (
    <Link
      ref={cardRef}
      href={href}
      onClick={() => {
        if (shouldTrack) {
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
            "flex aspect-[16/7] items-center justify-center",
            isPremium ? "bg-amber-100" : isAd ? "bg-amber-50" : "bg-neutral-100",
          ].join(" ")}
        >
          <span
            className={[
              "text-xs font-semibold",
              isAd ? "text-amber-700" : "text-neutral-400",
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
          </span>
        </div>
      )}

      <div className="space-y-1.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900">
            {title}
          </h3>

          {isAd ? (
            <span
              className={[
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
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
          <p className="line-clamp-1 text-xs text-neutral-500">{subtitle}</p>
        ) : null}

        {price ? (
          <p className="text-xs font-semibold text-neutral-900">{price}</p>
        ) : (
          <p className="text-xs text-neutral-400">
            {locale === "en" ? "View details" : "자세히 보기"}
          </p>
        )}
      </div>
    </Link>
  );
}
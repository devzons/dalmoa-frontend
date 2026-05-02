"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/Card";
import type { AdItem } from "@/features/ads/types/ad";
import type { AdPlacement } from "@/features/ads/types/adPlacement";
import { trackAdEvent } from "@/features/ads/api/trackAdEvent";

export function AdCard({
  item,
  locale,
  placement = "listing_middle",
}: {
  item: AdItem;
  locale: "ko" | "en";
  placement?: AdPlacement;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasTracked = useRef(false);

  if (!item || !item.id) return null;

  const href = `/${locale}/ads/${item.slug ?? item.id}`;
  const variantId = item.abTest?.variantId;
  const clickCount = Number(item.clickCount ?? 0);

  const isPremium =
    item.adPlan === "premium" ||
    item.adPlan === "premium_monthly" ||
    item.priority === "premium";

  const isFeatured =
    item.adPlan === "featured" ||
    item.adPlan === "featured_monthly" ||
    item.priority === "featured";

  const isSidebar = placement === "sidebar_right";

  const shouldRenderAsRow =
    !isSidebar &&
    (placement === "listing_middle" || placement === "listing_bottom");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasTracked.current) return;

        hasTracked.current = true;

        void trackAdEvent({
          adId: item.id,
          type: "impression",
          placement,
          variantId,
        });

        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [item.id, placement, variantId]);

  const handleClick = () => {
    void trackAdEvent({
      adId: item.id,
      type: "click",
      placement,
      variantId,
    });
  };

  if (!shouldRenderAsRow) {
    return (
      <div ref={ref}>
        <Card className="h-full overflow-hidden hover:bg-indigo-50">
          <CardHeader>
            <div className="mb-2 flex gap-2">
              <span className="rounded-sm bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
                AD
              </span>

              {isPremium ? (
                <span className="rounded-sm bg-black px-2 py-0.5 text-xs text-white">
                  Premium
                </span>
              ) : null}

              {!isPremium && isFeatured ? (
                <span className="rounded-sm bg-neutral-800 px-2 py-0.5 text-xs text-white">
                  Featured
                </span>
              ) : null}
            </div>

            <CardTitle className="line-clamp-2">{item.title ?? ""}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-1 text-sm text-neutral-500">
              {item.region ? <div>{item.region}</div> : null}
              <div>
                {locale === "en" ? "Clicks" : "조회"} {clickCount}
              </div>
            </div>

            <Link
              href={href}
              onClick={handleClick}
              className="mt-3 inline-block text-sm font-semibold text-indigo-700"
            >
              {locale === "en" ? "View Details" : "자세히 보기"}
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div ref={ref} className="border-b border-neutral-100">
      <Link
        href={href}
        onClick={handleClick}
        className="grid grid-cols-[1fr_60px] gap-2 bg-indigo-50 px-3 py-3 text-sm hover:bg-indigo-100 sm:grid-cols-[2fr_3fr_1fr_80px]"
      >
        <div className="font-semibold text-neutral-900">{item.title ?? ""}</div>

        <div
          className="hidden text-neutral-600 sm:block"
          dangerouslySetInnerHTML={{
            __html: item.excerpt ?? "",
          }}
        />

        <div className="hidden text-neutral-500 sm:block">
          {item.region ?? "-"}
        </div>

        <div className="text-right text-xs font-bold text-indigo-700">
          {clickCount}
        </div>
      </Link>
    </div>
  );
}
"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
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

  const viewCount = Number(item.viewCount ?? item.impressionCount ?? 0);
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

  useEffect(() => {
    if (!item?.id) return;

    if (isSidebar) {
      if (!hasTracked.current) {
        hasTracked.current = true;

        void trackAdEvent({
          adId: item.id,
          type: "impression",
          placement,
          variantId,
        });
      }
      return;
    }

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
  }, [item.id, placement, variantId, isSidebar]);

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    await trackAdEvent({
      adId: item.id,
      type: "click",
      placement,
      variantId,
    });

    window.location.href = href;
  };

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
              조회 {viewCount.toLocaleString()} · 방문{" "}
              {clickCount.toLocaleString()}
            </div>
          </div>

          <Link
            href={href}
            onClick={handleClick}
            className="mt-3 inline-block text-sm font-semibold text-indigo-700"
          >
            자세히 보기
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
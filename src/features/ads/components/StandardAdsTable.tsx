"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import type { AdItem } from "@/features/ads/types/ad";
import { trackAdEvent } from "@/features/ads/api/trackAdEvent";

export function StandardAdsTable({
  items = [],
  locale,
}: {
  items?: AdItem[];
  locale: "ko" | "en";
}) {
  const router = useRouter();

  if (!items.length) return null;

  const handleClick = async (
    event: MouseEvent<HTMLAnchorElement>,
    item: AdItem
  ) => {
    event.preventDefault();

    await trackAdEvent({
      adId: item.id,
      type: "click",
      placement: "listing_bottom",
    });

    router.push(`/${locale}/ads/${item.slug ?? item.id}`);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-neutral-900">
        {locale === "en" ? "Free Standard Ads" : "무료 일반 광고"}
      </h2>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="grid grid-cols-[2fr_4fr_100px] border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-neutral-600">
          <div>{locale === "en" ? "Title" : "제목"}</div>
          <div>{locale === "en" ? "Content" : "내용"}</div>
          <div className="text-right">
            {locale === "en" ? "Clicks" : "클릭수"}
          </div>
        </div>

        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}/ads/${item.slug ?? item.id}`}
            onClick={(event) => handleClick(event, item)}
            className="grid grid-cols-[2fr_4fr_100px] items-center gap-3 border-b border-neutral-100 px-4 py-3 text-sm last:border-b-0 hover:bg-neutral-50"
          >
            <div className="truncate font-semibold text-neutral-900">
              {item.title ?? ""}
            </div>

            <div
              className="truncate text-neutral-500"
              dangerouslySetInnerHTML={{
                __html: item.excerpt ?? "",
              }}
            />

            <div className="text-right text-neutral-400">
              {Number(item.clickCount ?? 0)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
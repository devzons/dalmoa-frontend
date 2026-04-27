"use client";

import { useEffect } from "react";
import { env } from "@/lib/config/env";
import HomeListingCard from "@/components/listing/HomeListingCard";

type Item = any;

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
        {items.map((item) => (
          <HomeListingCard
            key={item.id ?? item.slug}
            item={item}
            locale={locale}
            domain={domain}
            variant="ad"
          />
        ))}
      </div>
    </section>
  );
}
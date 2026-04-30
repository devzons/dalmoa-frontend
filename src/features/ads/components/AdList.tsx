"use client";

import type { AdItem } from "@/features/ads/types/ad";
import { AdCard } from "@/features/ads/components/AdCard";

type Props = {
  items: AdItem[];
  locale: "ko" | "en";
  placement?: string;
};

export function AdList({ items, locale, placement = "listing_middle" }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <AdCard
          key={item.id}
          item={item}
          locale={locale}
          placement={placement}
        />
      ))}
    </div>
  );
}
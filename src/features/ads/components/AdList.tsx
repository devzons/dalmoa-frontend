"use client";

import type { AdItem } from "@/features/ads/types/ad";
import type { AdPlacement } from "@/features/ads/types/adPlacement";
import { AdCard } from "@/features/ads/components/AdCard";

type Props = {
  items?: AdItem[];
  locale: "ko" | "en";
  placement?: AdPlacement;
};

export function AdList({
  items = [],
  locale,
  placement = "listing_middle",
}: Props) {
  if (!items.length) return null;

  const safeItems = items.filter((item) => item && item.id);

  if (!safeItems.length) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {safeItems.map((item) => (
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
```

import { AdCard } from "@/features/ads/components/AdCard";
import type { AdItem } from "@/features/ads/types";

export function FeaturedAds({
  items,
  locale,
}: {
  items: AdItem[];
  locale: "ko" | "en";
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <AdCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
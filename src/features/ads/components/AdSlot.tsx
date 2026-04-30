import type { AdItem } from "@/features/ads/types/ad";
import type { AdPlacement } from "@/features/ads/types/adPlacement";
import { AdCard } from "@/features/ads/components/AdCard";

export function AdSlot({
  item,
  locale,
  placement = "listing_middle",
}: {
  item?: AdItem | null;
  locale: "ko" | "en";
  placement?: AdPlacement;
}) {
  if (!item) return null;

  return (
    <div className="w-full">
      <AdCard item={item} locale={locale} placement={placement} />
    </div>
  );
}
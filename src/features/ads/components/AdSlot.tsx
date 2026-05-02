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
  if (!item || !item.id) return null;

  const isSidebar = placement === "sidebar_right";

  return (
    <div
      className={
        isSidebar
          ? "bg-transparent"
          : "border-b border-neutral-100 last:border-b-0"
      }
    >
      <AdCard item={item} locale={locale} placement={placement} />
    </div>
  );
}
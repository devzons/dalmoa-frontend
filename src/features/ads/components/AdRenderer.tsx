import type { AdItem } from "@/features/ads/types/ad";
import type { AdPlacement } from "@/features/ads/types/adPlacement";
import { AdCard } from "@/features/ads/components/AdCard";

export function AdRenderer({
  items = [],
  locale,
  placement = "listing_middle",
}: {
  items?: AdItem[];
  locale: "ko" | "en";
  placement?: AdPlacement;
}) {
  if (!items.length) return null;

  const safeItems = items.filter((item) => item && item.id);
  if (!safeItems.length) return null;

  const featured = safeItems.filter((item) =>
    String(item.adPlan).includes("featured")
  );
  const rest = safeItems.filter(
    (item) => !String(item.adPlan).includes("featured")
  );

  const ordered = [...featured, ...rest];

  // 🔥 inline placement은 grid 깨지지 않도록 1열 처리
  const isInline = placement === "listing_inline";

  return (
    <div
      className={
        isInline
          ? "space-y-3"
          : "grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      }
    >
      {ordered.map((item) => (
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
import type { AdItem } from "@/features/ads/types/ad";
import type { AdPlacement } from "@/features/ads/types/adPlacement";
import { AdRenderer } from "@/features/ads/components/AdRenderer";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";

export function FeaturedAdSection({
  title,
  description,
  items,
  locale,
  placement = "home_top",
}: {
  title?: string;
  description?: string;
  items: AdItem[];
  locale: "ko" | "en";
  placement?: AdPlacement;
}) {
  if (!items.length) return null;

  const sortedItems = sortAdsByPriority(items);

  return (
    <section className="space-y-4">
      {(title || description) ? (
        <div className="space-y-1">
          {title ? (
            <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          ) : null}

          {description ? (
            <p className="text-sm text-neutral-500">{description}</p>
          ) : null}
        </div>
      ) : null}

      <AdRenderer
        items={sortedItems}
        locale={locale}
        placement={placement}
      />
    </section>
  );
}
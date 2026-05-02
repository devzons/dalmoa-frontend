import type { AdItem } from "@/features/ads/types/ad";
import type { AdPlacement } from "@/features/ads/types/adPlacement";
import { AdRenderer } from "@/features/ads/components/AdRenderer";
import { rotateAds } from "@/features/ads/lib/rotateAds";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";

export function FeaturedAdSection({
  title,
  description,
  items = [],
  locale,
  placement = "home_top",
  limit,
}: {
  title?: string;
  description?: string;
  items?: AdItem[];
  locale: "ko" | "en";
  placement?: AdPlacement;
  limit?: number;
}) {
  if (!items.length) return null;

  const sorted = sortAdsByPriority(items);
  const rotated = rotateAds(limit ? sorted.slice(0, limit) : sorted);

  if (!rotated.length) return null;

  return (
    <section className="space-y-4">
      {title || description ? (
        <div className="space-y-1">
          {title ? (
            <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          ) : null}

          {description ? (
            <p className="text-sm text-neutral-500">{description}</p>
          ) : null}
        </div>
      ) : null}

      <AdRenderer items={rotated} locale={locale} placement={placement} />
    </section>
  );
}
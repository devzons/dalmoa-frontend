import type { AdItem } from "@/features/ads/types/ad";
import type { AdPlacement } from "@/features/ads/types/adPlacement";
import { AdRenderer } from "@/features/ads/components/AdRenderer";
import { selectAds } from "@/features/ads/lib/selectAds";
import { rotateAds } from "@/features/ads/lib/rotateAds";


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

  const selectedItems = selectAds(items, { limit: 4 });
  const rotated = rotateAds(selectedItems);

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

      <AdRenderer
        items={rotated}
        locale={locale}
        placement={placement}
      />
    </section>
  );
}
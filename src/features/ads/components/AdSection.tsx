import type { AdItem } from "@/features/ads/types/ad";
import type { AdPlacement } from "@/features/ads/types/adPlacement";
import { AdRenderer } from "@/features/ads/components/AdRenderer";

export function AdSection({
  title,
  description,
  items = [],
  locale,
  placement = "listing_middle",
}: {
  title?: string;
  description?: string;
  items?: AdItem[];
  locale: "ko" | "en";
  placement?: AdPlacement;
}) {
  if (!items.length) return null;

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

      <AdRenderer items={items} locale={locale} placement={placement} />
    </section>
  );
}
import type { Ad } from "../types/ad";
import { AdRenderer } from "./AdRenderer";

type Props = {
  ads?: Ad[];
  placement?: string;
  title?: string;
  emptyText?: string;
  className?: string;
};

export function FeaturedAdSection({
  ads = [],
  placement,
  title,
  emptyText,
  className = "",
}: Props) {
  const filteredAds = placement
    ? ads.filter((ad) => ad.placement === placement)
    : ads;

  if (!filteredAds.length) {
    if (!emptyText) return null;

    return (
      <section className={className}>
        {title ? (
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            {title}
          </h2>
        ) : null}

        <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-center text-sm text-neutral-500">
          {emptyText}
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      {title ? (
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          {title}
        </h2>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAds.map((ad) => (
          <AdRenderer key={ad.id} ad={ad} />
        ))}
      </div>
    </section>
  );
}
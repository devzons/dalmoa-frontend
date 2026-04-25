import Link from "next/link";
import { buildListingHref } from "./listingHref";

type Item = {
  id: number | string;
  slug: string;
  title?: string | null;
  price?: number | string | null;
  region?: string | null;
  excerpt?: string | null;
  companyName?: string | null;
  jobLocation?: string | null;
  thumbnailUrl?: string | null;
  businessCategory?: string | null;
  address?: string | null;
  phone?: string | null;
  hero?: {
    title?: string | null;
    subtitle?: string | null;
  };
};

type Props = {
  items: Item[];
  locale: "ko" | "en";
  domain?: string;
};

export default function FeaturedListingGrid({
  items,
  locale,
  domain = "jobs",
}: Props) {
  if (!items.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {locale === "en" ? "Featured" : "추천"}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const title =
            item.title ||
            item.hero?.title ||
            item.companyName ||
            item.excerpt ||
            "Untitled";

          const subtitle =
            item.businessCategory ||
            item.region ||
            item.address ||
            item.jobLocation ||
            item.hero?.subtitle ||
            item.excerpt ||
            null;

          const price =
            typeof item.price === "number"
              ? `$${item.price.toLocaleString()}`
              : item.price;

          return (
            <Link
              key={item.id ?? item.slug}
              href={buildListingHref({
                locale,
                domain,
                slug: item.slug,
              })}
              className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {item.thumbnailUrl ? (
                <div className="aspect-[16/7] overflow-hidden bg-neutral-100">
                  <img
                    src={item.thumbnailUrl}
                    alt={title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/7] items-center justify-center bg-neutral-100 text-xs text-neutral-500">
                  {locale === "en" ? "Featured" : "추천"}
                </div>
              )}

              <div className="space-y-1.5 p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900">
                    {title}
                  </h3>

                  <span className="shrink-0 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    AD
                  </span>
                </div>

                {subtitle ? (
                  <p className="line-clamp-1 text-xs text-neutral-500">
                    {subtitle}
                  </p>
                ) : null}

                <div className="flex items-center justify-between pt-1">
                  {price ? (
                    <span className="text-xs font-semibold text-neutral-900">
                      {price}
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-400">
                      {locale === "en" ? "View" : "보기"}
                    </span>
                  )}

                  {item.phone ? (
                    <span className="text-[10px] text-neutral-500">
                      {item.phone}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
import Link from "next/link";
import HomeListingCard from "@/components/listing/HomeListingCard";
import type { HomeCardItem, HomeLocale } from "@/features/home/types";

type Props = {
  locale: HomeLocale;
  title: string;
  description: string;
  moreHref: string;
  moreLabel: string;
  items: HomeCardItem[];
  domain: string;
  forceAdStyle?: boolean;
};

export function HomeCardSection({
  locale,
  title,
  description,
  moreHref,
  moreLabel,
  items,
  domain,
  forceAdStyle = false,
}: Props) {
  if (!items || items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => {
    const aPriority = Number(a.adPriority || 0);
    const bPriority = Number(b.adPriority || 0);

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    return 0;
  });

  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-950">
              {title}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">{description}</p>
          </div>

          <Link
            href={moreHref}
            className="shrink-0 text-sm font-semibold text-neutral-900 hover:underline"
          >
            {moreLabel}
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedItems.map((item) => (
            <HomeListingCard
              key={item.id ?? item.slug}
              item={item}
              locale={locale}
              domain={domain}
              variant={forceAdStyle ? "ad" : "default"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
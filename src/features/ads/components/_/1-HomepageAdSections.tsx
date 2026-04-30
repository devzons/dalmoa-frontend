import { AdCard } from "./AdCard";
import type { AdItem } from "@/features/ads/types";

type Props = {
  items: AdItem[];
  locale: "ko" | "en";
};

export default function HomepageAdSections({ items, locale }: Props) {
  const premium = items.filter(
    (i: any) => i.isAdActive && i.adPlan === "premium"
  );

  const featured = items.filter(
    (i: any) =>
      i.isAdActive &&
      (i.adPlan === "featured" || i.isFeatured || i.featured)
  );

  const standard = items.filter(
    (i: any) =>
      !premium.includes(i) &&
      !featured.includes(i)
  );

  return (
    <div className="space-y-10">
      {/* PREMIUM */}
      {premium.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-bold">
            {locale === "en" ? "Premium Ads" : "프리미엄 광고"}
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {premium.map((item) => (
              <div key={item.id} className="min-w-[280px]">
                <AdCard item={item} locale={locale} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED */}
      {featured.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-bold">
            {locale === "en" ? "Featured Ads" : "추천 광고"}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((item) => (
              <AdCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* STANDARD */}
      {standard.length > 0 && (
        <section>
          <div className="grid gap-4 md:grid-cols-3">
            {standard.map((item) => (
              <AdCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
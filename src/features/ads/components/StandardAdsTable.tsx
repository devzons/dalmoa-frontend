import Link from "next/link";
import type { AdItem } from "@/features/ads/types/ad";

export function StandardAdsTable({
  items,
  locale,
}: {
  items: AdItem[];
  locale: "ko" | "en";
}) {
  if (!items.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-neutral-900">
        {locale === "en" ? "Standard Ads" : "일반 광고"}
      </h2>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}/ads/${item.slug}`}
            className="grid gap-3 border-b border-neutral-100 px-4 py-4 last:border-b-0 hover:bg-neutral-50 sm:grid-cols-[1fr_160px]"
          >
            <div>
              <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900">
                {item.title}
              </h3>

              {item.excerpt ? (
                <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                  {item.excerpt}
                </p>
              ) : null}
            </div>

            <div className="text-sm text-neutral-500">
              {item.region ?? (locale === "en" ? "View details" : "자세히 보기")}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
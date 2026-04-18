import Link from "next/link";
import type { BusinessSaleItem } from "@/features/business-sale/types";

export function BusinessSaleList({
  items,
  locale,
}: {
  items: BusinessSaleItem[];
  locale: "ko" | "en";
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/${locale}/business-sale/${item.slug}`}
          className="grid grid-cols-[1fr_auto] gap-4 border-b border-neutral-200 px-4 py-4 last:border-b-0"
        >
          <div className="min-w-0">
            <div className="truncate font-medium">{item.title}</div>
            {item.excerpt ? (
              <div className="truncate text-sm text-neutral-500">
                {item.excerpt}
              </div>
            ) : null}
          </div>

          {item.priceLabel ? (
            <div className="text-sm text-neutral-500">{item.priceLabel}</div>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
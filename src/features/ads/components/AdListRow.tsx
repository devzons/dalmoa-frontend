import Link from "next/link";
import type { AdItem } from "@/features/ads/types";
import { getAdHref } from "@/features/ads/utils";

export function AdListRow({
  item,
  locale,
}: {
  item: AdItem;
  locale: "ko" | "en";
}) {
  const href = getAdHref(item, locale);

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-neutral-200 px-4 py-4 last:border-b-0">
      <div className="min-w-0">
        <div className="truncate font-medium">{item.title}</div>
        {item.excerpt ? (
          <div className="truncate text-sm text-neutral-500">{item.excerpt}</div>
        ) : null}
      </div>

      <Link
        href={href}
        target={item.isExternal ? "_blank" : "_self"}
        className="text-sm font-medium text-neutral-900 underline"
      >
        {item.ctaLabel || (locale === "en" ? "View" : "보기")}
      </Link>
    </div>
  );
}
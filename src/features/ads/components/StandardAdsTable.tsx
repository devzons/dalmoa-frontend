import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AdListRow } from "@/features/ads/components/AdListRow";
import type { AdItem } from "@/features/ads/types";

export function StandardAdsTable({
  items,
  locale,
}: {
  items: AdItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={locale === "en" ? "No standard ads found." : "일반 광고가 없습니다."}
      />
    );
  }

  return (
    <section>
      <SectionHeading
        title={locale === "en" ? "Standard Ads" : "일반 광고"}
        description={
          locale === "en"
            ? "Free or standard ads are shown in a list."
            : "무료 또는 일반 광고가 리스트형으로 노출됩니다."
        }
      />

      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        {items.map((item) => (
          <AdListRow key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </section>
  );
}
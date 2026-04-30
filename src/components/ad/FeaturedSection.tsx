import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FeaturedAdSection } from "@/features/ads/components/FeaturedAdSection";
import type { AdItem } from "@/features/ads/types/ad";

export function FeaturedSection({
  items,
  locale,
}: {
  items: AdItem[];
  locale: "ko" | "en";
}) {
  if (!items.length) {
    return (
      <EmptyState
        title={locale === "en" ? "No featured ads" : "추천 광고 없음"}
        description={
          locale === "en"
            ? "Featured ads will appear here."
            : "추천 광고가 여기에 표시됩니다."
        }
      />
    );
  }

  return (
    <section className="space-y-4">
      <SectionHeading
        title={locale === "en" ? "Featured Ads" : "추천 광고"}
        description={
          locale === "en"
            ? "Priority promotional placements."
            : "우선 노출되는 프로모션 광고입니다."
        }
      />

      <FeaturedAdSection
        items={items}
        locale={locale}
        placement="listing_top"
      />
    </section>
  );
}
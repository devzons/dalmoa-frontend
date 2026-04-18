import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FeaturedAds } from "@/features/ads/components/FeaturedAds";
import type { AdItem } from "@/features/ads/types";

export function FeaturedSection({
  items,
  locale,
}: {
  items: AdItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={locale === "en" ? "No featured ads found." : "추천 광고가 없습니다."}
      />
    );
  }

  return (
    <section>
      <SectionHeading
        title={locale === "en" ? "Featured Ads" : "추천 광고"}
        description={
          locale === "en"
            ? "Paid ads appear in a card layout."
            : "유료 광고가 상단 카드형으로 노출됩니다."
        }
      />

      <FeaturedAds items={items} locale={locale} />
    </section>
  );
}
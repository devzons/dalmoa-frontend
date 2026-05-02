import { getSidebarAds } from "@/features/ads/api/getSidebarAds";
import { AdSlot } from "@/features/ads/components/AdSlot";
import { rotateAds } from "@/features/ads/lib/rotateAds";

export async function RightSidebar({
  locale,
}: {
  locale: "ko" | "en";
}) {
  const ads = await getSidebarAds(locale);

  if (!ads.length) return null;

  const rotatedAds = rotateAds(ads).slice(0, 2);

  return (
    <aside className="hidden w-full shrink-0 space-y-6 lg:block lg:max-w-[300px]">
      <div className="sticky top-24 space-y-3">
        {rotatedAds.map((ad) => (
          <AdSlot
            key={ad.id}
            item={ad}
            locale={locale}
            placement="sidebar_right"
          />
        ))}
      </div>
    </aside>
  );
}
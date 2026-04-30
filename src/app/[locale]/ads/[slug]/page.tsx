import { notFound } from "next/navigation";
import { Badge } from "@/components/base/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import AdPromotionPanel from "@/components/payment/AdPromotionPanel";
import { getAdBySlug } from "@/features/ads/api";
import { getFeaturedAds } from "@/features/ads/api/getFeaturedAds";
import { sortAdsByPriority } from "@/features/ads/lib/sortAdsByPriority";
import { AdSlot } from "@/features/ads/components/AdSlot";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { normalizeMediaUrl } from "@/lib/api/client";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function getRemainingDays(adEndsAt?: string | null) {
  if (!adEndsAt) return null;

  const end = new Date(adEndsAt);
  const now = new Date();

  if (Number.isNaN(end.getTime())) return null;

  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Ad Detail" : "광고 상세",
    description:
      normalizedLocale === "en" ? "Ad detail page" : "광고 상세 페이지",
    path: `/${normalizedLocale}/ads/${slug}`,
  });
}

export const revalidate = 0;

export default async function AdDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  let item;

  try {
    item = await getAdBySlug(slug, normalizedLocale);
  } catch {
    notFound();
  }

  if (!item) {
    notFound();
  }

  const sidebarAds = sortAdsByPriority(await getFeaturedAds(normalizedLocale))
    .filter((ad) => ad.id !== item.id)
    .slice(0, 1);

  const remainingDays = getRemainingDays(item.adEndsAt ?? item.expiresAt);
  const isExpired =
    remainingDays !== null ? remainingDays <= 0 : item.isAdActive === false;
  const isExpiringSoon =
    remainingDays !== null && remainingDays > 0 && remainingDays <= 3;

  const clickCount = Number(item.clickCount || 0);
  const impressionCount = Number(item.impressionCount || 0);
  const ctr =
    impressionCount > 0
      ? ((clickCount / impressionCount) * 100).toFixed(1)
      : "0.0";

  const thumbnailUrl = normalizeMediaUrl(item.thumbnailUrl);

  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="overflow-hidden">
            {thumbnailUrl ? (
              <div className="h-[260px] w-full overflow-hidden bg-neutral-100">
                <img
                  src={thumbnailUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-[260px] w-full items-center justify-center bg-neutral-100 text-sm text-neutral-400">
                {normalizedLocale === "en" ? "No image" : "이미지 없음"}
              </div>
            )}

            <CardHeader>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {item.isPaid ? (
                  <Badge className="bg-neutral-900 text-white">
                    {normalizedLocale === "en" ? "Paid" : "유료"}
                  </Badge>
                ) : null}

                {item.isFeatured ? (
                  <Badge className="bg-amber-500 text-white">
                    {normalizedLocale === "en" ? "Featured" : "추천"}
                  </Badge>
                ) : null}

                {item.adPlan ? (
                  <Badge className="bg-amber-50 text-amber-700">
                    {String(item.adPlan).toUpperCase()}
                  </Badge>
                ) : null}

                {remainingDays !== null ? (
                  <Badge
                    className={
                      isExpired
                        ? "bg-red-50 text-red-700"
                        : "bg-green-50 text-green-700"
                    }
                  >
                    {isExpired
                      ? normalizedLocale === "en"
                        ? "Expired"
                        : "만료됨"
                      : normalizedLocale === "en"
                        ? `${remainingDays} days left`
                        : `${remainingDays}일 남음`}
                  </Badge>
                ) : null}

                {isExpiringSoon ? (
                  <Badge className="bg-orange-50 text-orange-700">
                    {normalizedLocale === "en" ? "Expiring soon" : "곧 만료"}
                  </Badge>
                ) : null}
              </div>

              <CardTitle className="text-2xl">{item.title}</CardTitle>

              {item.excerpt ? (
                <p className="mt-3 text-sm text-neutral-600">{item.excerpt}</p>
              ) : null}
            </CardHeader>

            <CardContent className="space-y-6">
              {item.ctaUrl ? (
                <a
                  href={item.ctaUrl}
                  target={item.isExternal ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="inline-block rounded-xl bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {item.ctaLabel ||
                    (normalizedLocale === "en" ? "Visit" : "바로가기")}
                </a>
              ) : null}

              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
                <StatBox
                  label={normalizedLocale === "en" ? "Impressions" : "노출"}
                  value={impressionCount.toLocaleString()}
                />
                <StatBox
                  label={normalizedLocale === "en" ? "Clicks" : "클릭"}
                  value={clickCount.toLocaleString()}
                />
                <StatBox label="CTR" value={`${ctr}%`} />

                <Link
                  href={`/${normalizedLocale}/ads/${slug}/report`}
                  className="inline-flex w-fit items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  {normalizedLocale === "en"
                    ? "View full report"
                    : "전체 리포트 보기"}
                </Link>
              </div>

              <AdPromotionPanel
                postId={item.id}
                locale={normalizedLocale}
                adPlan={item.adPlan}
                isPaid={item.isPaid}
                isFeatured={item.isFeatured}
                isAdActive={item.isAdActive}
                enableSubscription={false}
              />
            </CardContent>
          </Card>

          {sidebarAds.length > 0 ? (
            <aside className="space-y-4">
              <h2 className="text-sm font-semibold text-neutral-700">
                {normalizedLocale === "en" ? "Sponsored" : "스폰서 광고"}
              </h2>

              <AdSlot
                item={sidebarAds[0]}
                locale={normalizedLocale}
                placement="detail_sidebar"
              />
            </aside>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-3">
      <div className="text-[11px] font-medium text-neutral-500">{label}</div>
      <div className="mt-1 text-lg font-bold text-neutral-950">{value}</div>
    </div>
  );
}
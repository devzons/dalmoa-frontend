import { notFound } from "next/navigation";
import { Badge } from "@/components/base/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import AdPromotionPanel from "@/components/payment/AdPromotionPanel";
import { getAdBySlug } from "@/features/ads/api";
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

  const ad = item as any;

  const adPlan = ad.adPlan ?? ad.ad_plan ?? null;
  const isPaid = Boolean(ad.isPaid ?? ad.is_paid ?? false);
  const isFeatured = Boolean(ad.isFeatured ?? ad.is_featured ?? false);
  const isAdActive = Boolean(ad.isAdActive ?? ad.is_active ?? true);

  const title = ad.title ?? "";
  const excerpt = ad.excerpt ?? null;
  const thumbnailUrl = normalizeMediaUrl(ad.thumbnailUrl ?? ad.thumbnail_url ?? null);

  const ctaUrl = ad.ctaUrl ?? ad.cta_url ?? null;
  const ctaLabel = ad.ctaLabel ?? ad.cta_label ?? null;
  const isExternal = Boolean(ad.isExternal ?? ad.is_external ?? false);

  const remainingDays = getRemainingDays(
    ad.adEndsAt ?? ad.ad_ends_at ?? ad.expiresAt ?? ad.expires_at ?? null,
  );

  const isExpired =
    remainingDays !== null ? remainingDays <= 0 : isAdActive === false;

  const isExpiringSoon =
    remainingDays !== null && remainingDays > 0 && remainingDays <= 3;

  const clickCount = Number(ad.clickCount ?? ad.click_count ?? 0);
  const impressionCount = Number(ad.impressionCount ?? ad.impression_count ?? 0);

  const ctr =
    impressionCount > 0
      ? ((clickCount / impressionCount) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <Card className="overflow-hidden">
          {thumbnailUrl ? (
            <div className="h-[260px] w-full overflow-hidden bg-neutral-100">
              <img
                src={thumbnailUrl}
                alt={title}
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
              {isPaid ? (
                <Badge className="bg-neutral-900 text-white">
                  {normalizedLocale === "en" ? "Paid" : "유료"}
                </Badge>
              ) : null}

              {isFeatured ? (
                <Badge className="bg-amber-500 text-white">
                  {normalizedLocale === "en" ? "Featured" : "추천"}
                </Badge>
              ) : null}

              {adPlan ? (
                <Badge className="bg-amber-50 text-amber-700">
                  {String(adPlan).toUpperCase()}
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

            <CardTitle className="text-2xl">{title}</CardTitle>

            {excerpt ? (
              <p className="mt-3 text-sm text-neutral-600">{excerpt}</p>
            ) : null}
          </CardHeader>

          <CardContent className="space-y-6">
            {ctaUrl ? (
              <a
                href={ctaUrl}
                target={isExternal ? "_blank" : "_self"}
                rel="noreferrer"
                className="inline-block rounded-xl bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {ctaLabel || (normalizedLocale === "en" ? "Visit" : "바로가기")}
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

            <Link
              href={`/${normalizedLocale}/ads`}
              className="inline-flex w-fit items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
            >
              {normalizedLocale === "en" ? "Back to ads" : "광고 목록으로 돌아가기"}
            </Link>

            <AdPromotionPanel
              postId={ad.id}
              locale={normalizedLocale}
              adPlan={adPlan}
              isPaid={isPaid}
              isFeatured={isFeatured}
              isAdActive={isAdActive}
              enableSubscription={false}
            />
          </CardContent>
        </Card>
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
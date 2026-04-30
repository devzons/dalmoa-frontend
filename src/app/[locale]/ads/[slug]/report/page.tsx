import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import { getAdBySlug } from "@/features/ads/api";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Ad Report" : "광고 성과 리포트",
    description:
      normalizedLocale === "en"
        ? "View ad performance report."
        : "광고 성과 리포트를 확인하세요.",
    path: `/${normalizedLocale}/ads/${slug}/report`,
  });
}

export const revalidate = 0;

export default async function AdReportPage({ params }: Props) {
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

  const impressions = Number(ad.impressionCount ?? ad.impression_count ?? 0);
  const clicks = Number(ad.clickCount ?? ad.click_count ?? 0);
  const ctr =
    impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : "0.0";

  const adPlan = ad.adPlan ?? ad.ad_plan ?? "basic";
  const isAdActive = Boolean(ad.isAdActive ?? ad.is_active ?? true);
  const adStartsAt = ad.adStartsAt ?? ad.ad_starts_at ?? "-";
  const adEndsAt = ad.adEndsAt ?? ad.ad_ends_at ?? ad.expiresAt ?? ad.expires_at ?? "-";

  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950">
              {normalizedLocale === "en" ? "Ad Report" : "광고 성과 리포트"}
            </h1>
            <p className="mt-2 text-sm text-neutral-500">{ad.title}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <ReportCard
              label={normalizedLocale === "en" ? "Impressions" : "노출 수"}
              value={impressions.toLocaleString()}
            />
            <ReportCard
              label={normalizedLocale === "en" ? "Clicks" : "클릭 수"}
              value={clicks.toLocaleString()}
            />
            <ReportCard label="CTR" value={`${ctr}%`} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {normalizedLocale === "en" ? "Ad Details" : "광고 정보"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-neutral-700">
              <Row
                label={normalizedLocale === "en" ? "Plan" : "광고 상품"}
                value={String(adPlan).toUpperCase()}
              />
              <Row
                label={normalizedLocale === "en" ? "Status" : "상태"}
                value={
                  isAdActive
                    ? normalizedLocale === "en"
                      ? "Active"
                      : "활성"
                    : normalizedLocale === "en"
                      ? "Inactive"
                      : "비활성"
                }
              />
              <Row
                label={normalizedLocale === "en" ? "Start Date" : "시작일"}
                value={String(adStartsAt)}
              />
              <Row
                label={normalizedLocale === "en" ? "End Date" : "종료일"}
                value={String(adEndsAt)}
              />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Link
              href={`/${normalizedLocale}/ads/${slug}`}
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
            >
              {normalizedLocale === "en" ? "Back to Ad" : "광고 상세로"}
            </Link>

            <Link
              href={`/${normalizedLocale}/ads/create`}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900"
            >
              {normalizedLocale === "en" ? "Create New Ad" : "새 광고 등록"}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ReportCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="text-xs font-medium text-neutral-500">{label}</div>
        <div className="mt-2 text-3xl font-bold text-neutral-950">{value}</div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-neutral-100 pb-2">
      <span className="text-neutral-500">{label}</span>
      <strong className="text-neutral-900">{value}</strong>
    </div>
  );
}
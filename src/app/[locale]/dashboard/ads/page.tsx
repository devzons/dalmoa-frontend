"use client";

import Link from "next/link";
import { Container } from "@/components/base/Container";
import { getAds } from "@/features/ads/api";

type Props = {
  params: {
    locale: "ko" | "en";
  };
};

export default async function AdsDashboardPage({ params }: Props) {
  const { locale } = params;
  const data = await getAds(locale);

  const allAds = [
    ...(data.featured ?? []),
    ...(data.standard ?? []),
  ];

  return (
    <Container className="py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {locale === "en" ? "Ad Dashboard" : "광고 대시보드"}
        </h1>

        <Link
          href={`/${locale}/ads/create`}
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
        >
          {locale === "en" ? "Create Ad" : "광고 등록"}
        </Link>
      </div>

      {allAds.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-neutral-500">
          {locale === "en"
            ? "No ads yet. Create your first ad."
            : "등록된 광고가 없습니다. 광고를 등록하세요."}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allAds.map((ad: any) => {
            const impressions = ad.impressionCount ?? 0;
            const clicks = ad.clickCount ?? 0;

            const ctr =
              impressions > 0
                ? ((clicks / impressions) * 100).toFixed(1)
                : "0.0";

            const revenue = ad.billing?.totalRevenue ?? 0;

            const status = ad.isAdActive
              ? locale === "en"
                ? "Active"
                : "활성"
              : locale === "en"
                ? "Inactive"
                : "비활성";

            return (
              <div
                key={ad.id}
                className="rounded-xl border bg-white p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold line-clamp-1">
                    {ad.title}
                  </div>

                  <span className="text-xs font-medium text-neutral-500">
                    {status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600">
                  <div>
                    {locale === "en" ? "Impressions" : "노출"}:{" "}
                    {impressions.toLocaleString()}
                  </div>

                  <div>
                    {locale === "en" ? "Clicks" : "클릭"}:{" "}
                    {clicks.toLocaleString()}
                  </div>

                  <div>CTR: {ctr}%</div>

                  <div className="font-semibold text-green-600">
                    ${Number(revenue).toFixed(2)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/ads/${ad.slug}`}
                    className="flex-1 rounded-lg border px-3 py-1.5 text-xs text-center"
                  >
                    {locale === "en" ? "View" : "보기"}
                  </Link>

                  <Link
                    href={`/${locale}/ads/${ad.slug}/report`}
                    className="flex-1 rounded-lg border px-3 py-1.5 text-xs text-center"
                  >
                    {locale === "en" ? "Report" : "리포트"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/base/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import { apiFetch } from "@/lib/api/client";
import { type ListingDomain } from "@/components/listing/listingHref";
import AdPromotionPanel from "@/components/payment/AdPromotionPanel";
import ListingViewTracker from "@/features/listing/components/ListingViewTracker";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  domain: ListingDomain;
};

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function normalizeCount(value: unknown): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
}

function getDomainLabel(domain: ListingDomain, locale: "ko" | "en") {
  const labels: Record<string, { ko: string; en: string }> = {
    jobs: { ko: "구인구직", en: "Jobs" },
    marketplace: { ko: "사고팔고", en: "Marketplace" },
    "real-estate": { ko: "부동산", en: "Real Estate" },
    cars: { ko: "자동차", en: "Cars" },
    "business-sale": { ko: "사업체 매매", en: "Business Sale" },
    loan: { ko: "융자", en: "Loan" },
    "town-board": { ko: "게시판", en: "Town Board" },
    news: { ko: "뉴스", en: "News" },
  };

  return labels[domain]?.[locale] ?? domain;
}

async function getDetailData({
  locale,
  domain,
  slug,
}: {
  locale: "ko" | "en";
  domain: ListingDomain;
  slug: string;
}) {
  const normalizedSlug = normalizeSlug(slug);

  return apiFetch<any>(`/${domain}/${normalizedSlug}?lang=${locale}`, {
    cache: "no-store",
  });
}

export default async function ListingDetailPage({ params, domain }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const normalizedSlug = normalizeSlug(slug);

  const data = await getDetailData({
    locale: normalizedLocale,
    domain,
    slug,
  });

  if (!data) {
    notFound();
  }

  const title =
    data.title ||
    data.hero?.title ||
    data.businessName ||
    data.companyName ||
    data.name ||
    "Untitled";

  const subtitle =
    data.hero?.subtitle ||
    data.excerpt ||
    data.description ||
    data.address ||
    data.region ||
    data.categoryLabel ||
    data.businessCategory ||
    null;

  const price =
    data.priceLabel ||
    data.salePriceLabel ||
    data.price ||
    data.loanAmount ||
    data.interestRate ||
    null;

  const viewCount = normalizeCount(
    data.viewCount ?? data.views ?? data.view_count ?? data.hitCount ?? 0
  );

  const listHref = `/${normalizedLocale}/${domain}`;

  return (
    <div className="bg-neutral-50 py-10">
      <ListingViewTracker id={data.id} slug={normalizedSlug} domain={domain} />

      <Container>
        <Card className="overflow-hidden">
          {data.thumbnailUrl ? (
            <div className="h-[260px] w-full overflow-hidden bg-neutral-100">
              <img
                src={data.thumbnailUrl}
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
              <Badge>{getDomainLabel(domain, normalizedLocale)}</Badge>

              {data.categoryLabel || data.businessCategory || data.category ? (
                <Badge className="bg-amber-50 text-amber-700">
                  {data.categoryLabel || data.businessCategory || data.category}
                </Badge>
              ) : null}

              {data.isFeatured ? (
                <Badge className="bg-neutral-900 text-white">
                  {normalizedLocale === "en" ? "Featured" : "추천"}
                </Badge>
              ) : null}
            </div>

            <CardTitle className="text-2xl">{title}</CardTitle>

            {subtitle ? (
              <p className="mt-3 text-sm text-neutral-600">{subtitle}</p>
            ) : null}

            {price ? (
              <p className="mt-4 text-lg font-semibold text-neutral-950">
                {price}
              </p>
            ) : null}
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-3">
              <StatBox
                label={normalizedLocale === "en" ? "Views" : "조회수"}
                value={viewCount.toLocaleString()}
              />

              {data.region || data.jobLocation ? (
                <StatBox
                  label={normalizedLocale === "en" ? "Region" : "지역"}
                  value={data.region || data.jobLocation}
                />
              ) : null}

              {data.createdAt || data.publishedAt ? (
                <StatBox
                  label={normalizedLocale === "en" ? "Date" : "등록일"}
                  value={new Date(
                    data.createdAt || data.publishedAt
                  ).toLocaleDateString(
                    normalizedLocale === "en" ? "en-US" : "ko-KR"
                  )}
                />
              ) : null}
            </div>

            {data.content ? (
              <article
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            ) : (
              <div className="rounded-lg border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
                {normalizedLocale === "en"
                  ? "No content available."
                  : "상세 내용이 없습니다."}
              </div>
            )}

            <Link
              href={listHref}
              className="inline-flex w-fit items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
            >
              {normalizedLocale === "en" ? "Back to list" : "목록으로 돌아가기"}
            </Link>

            {domain !== "ads" ? (
              <AdPromotionPanel
                postId={data.id}
                locale={normalizedLocale}
                adPlan={data.adPlan}
                isPaid={data.isPaid}
                isFeatured={data.isFeatured}
                isAdActive={data.isAdActive}
              />
            ) : null}
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
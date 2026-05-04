import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/base/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Badge } from "@/components/base/Badge";
import AdPromotionPanel from "@/components/payment/AdPromotionPanel";
import { getDirectoryBySlug } from "@/features/directory/api";
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
    title: normalizedLocale === "en" ? "Directory Detail" : "업소 상세",
    description:
      normalizedLocale === "en"
        ? "Directory detail page"
        : "업소 상세 페이지",
    path: `/${normalizedLocale}/directory/${slug}`,
  });
}

export const revalidate = 0;

export default async function DirectoryDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  let item;

  try {
    item = await getDirectoryBySlug(slug, normalizedLocale);
  } catch {
    notFound();
  }

  if (!item) notFound();

  const listing = item as any;

  const title = listing.title ?? "";
  const content = listing.content ?? listing.excerpt ?? null;

  const clickCount = Number(listing.clickCount ?? listing.click_count ?? 0);
  const viewCount = Number(listing.viewCount ?? listing.view_count ?? 0);

  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {content && (
              <p className="text-sm text-neutral-600">{content}</p>
            )}

            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
              <StatBox
                label={normalizedLocale === "en" ? "Views" : "조회"}
                value={viewCount.toLocaleString()}
              />
              <StatBox
                label={normalizedLocale === "en" ? "Clicks" : "클릭"}
                value={clickCount.toLocaleString()}
              />
            </div>

            <Link
              href={`/${normalizedLocale}/directory`}
              className="inline-flex w-fit rounded-xl border px-4 py-2 text-sm"
            >
              {normalizedLocale === "en"
                ? "Back to directory"
                : "업소록으로 돌아가기"}
            </Link>

            <AdPromotionPanel
              postId={listing.id}
              locale={normalizedLocale}
              adPlan={listing.adPlan ?? null}
              isPaid={Boolean(listing.isPaid ?? false)}
              isFeatured={Boolean(listing.isFeatured ?? false)}
              isAdActive={Boolean(listing.isAdActive ?? true)}
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
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
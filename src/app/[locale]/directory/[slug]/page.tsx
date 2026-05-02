import Link from "next/link";
import { notFound } from "next/navigation";
import { DirectoryDetail } from "@/features/directory/components/DirectoryDetail";
import { getDirectoryBySlug } from "@/features/directory/api";
import { buildMetadata } from "@/lib/seo/metadata";
import AdPromotionPanel from "@/components/payment/AdPromotionPanel";

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
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function DirectoryDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  let item;

  try {
    item = await getDirectoryBySlug(slug, normalizedLocale);
  } catch {
    notFound();
  }

  if (!item) {
    notFound();
  }

  const listing = item as any;

  return (
    <>
      <DirectoryDetail item={item} locale={normalizedLocale} />

      <div className="mx-auto max-w-3xl space-y-4 px-4 pb-10">
        <Link
          href={`/${normalizedLocale}/directory`}
          className="inline-flex w-fit items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
        >
          {normalizedLocale === "en"
            ? "Back to directory"
            : "업소록 목록으로 돌아가기"}
        </Link>

        <AdPromotionPanel
          postId={listing.id}
          locale={normalizedLocale}
          adPlan={listing.adPlan ?? listing.ad_plan ?? null}
          isPaid={Boolean(listing.isPaid ?? listing.is_paid ?? false)}
          isFeatured={Boolean(listing.isFeatured ?? listing.is_featured ?? false)}
          isAdActive={Boolean(listing.isAdActive ?? listing.is_active ?? true)}
          enableSubscription={false}
        />
      </div>
    </>
  );
}
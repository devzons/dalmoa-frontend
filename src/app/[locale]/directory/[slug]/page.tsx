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
      <DirectoryDetail item={item} />

      <div className="mx-auto max-w-3xl px-4 pb-10">
        <AdPromotionPanel
          postId={listing.id}
          locale={normalizedLocale}
          adPlan={listing.adPlan ?? listing.ad_plan ?? null}
          isPaid={Boolean(listing.isPaid ?? listing.is_paid ?? false)}
          isFeatured={Boolean(
            listing.isFeatured ?? listing.is_featured ?? false,
          )}
          isAdActive={Boolean(
            listing.isAdActive ?? listing.is_active ?? true,
          )}
          enableSubscription={false}
        />
      </div>
    </>
  );
}
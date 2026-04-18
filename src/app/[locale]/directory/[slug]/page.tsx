import { notFound } from "next/navigation";
import { DirectoryDetail } from "@/features/directory/components/DirectoryDetail";
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

  try {
    const item = await getDirectoryBySlug(slug, normalizedLocale);

    return buildMetadata({
      title: item.title,
      description:
        item.excerpt ||
        (normalizedLocale === "en"
          ? `${item.title} directory detail`
          : `${item.title} 상세 정보`),
      path: `/${normalizedLocale}/directory/${slug}`,
    });
  } catch {
    return buildMetadata({
      title: normalizedLocale === "en" ? "Directory Detail" : "업소 상세",
      description:
        normalizedLocale === "en"
          ? "Directory detail page"
          : "업소 상세 페이지",
      path: `/${normalizedLocale}/directory/${slug}`,
    });
  }
}

export const revalidate = 300;

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

  return <DirectoryDetail item={item} />;
}
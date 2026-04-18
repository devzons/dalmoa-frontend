import { Container } from "@/components/base/Container";
import { DirectoryFilterBar } from "@/features/directory/components/DirectoryFilterBar";
import { DirectoryGrid } from "@/features/directory/components/DirectoryGrid";
import { getDirectories } from "@/features/directory/api";
import { getDirectoryCategories } from "@/features/directory/utils";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    featured?: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Directory" : "업소록",
    description:
      normalizedLocale === "en"
        ? "Dallas Korean business directory"
        : "달라스 한인 업소록",
    path: `/${normalizedLocale}/directory`,
  });
}

export const revalidate = 300;

export default async function DirectoryPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const resolvedSearchParams = await searchParams;

  const query = {
    q: resolvedSearchParams.q?.trim() || undefined,
    category: resolvedSearchParams.category?.trim() || undefined,
    featured: resolvedSearchParams.featured === "1",
  };

  const items = await getDirectories(normalizedLocale, query);
  const categories = getDirectoryCategories(items, normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Directory" : "업소록"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Browse local Korean businesses in Dallas."
            : "지역 업소 정보를 한눈에 확인하세요."}
        </p>
      </div>

      <DirectoryFilterBar
        locale={normalizedLocale}
        categories={categories}
      />

      <DirectoryGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
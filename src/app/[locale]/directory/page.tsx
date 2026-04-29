import Link from "next/link";
import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { DirectoryFilterBar } from "@/features/directory/components/DirectoryFilterBar";
import { getDirectories } from "@/features/directory/api";
import { getDirectoryCategories } from "@/features/directory/utils";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    featured?: string;
    sort?: string;
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

export const revalidate = 0;

export default async function DirectoryPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const resolvedSearchParams = await searchParams;

  const currentSort = resolvedSearchParams.sort === "popular" ? "popular" : "";

  const query = {
    q: resolvedSearchParams.q?.trim() || undefined,
    category: resolvedSearchParams.category?.trim() || undefined,
    featured: resolvedSearchParams.featured === "1",
    sort: currentSort || undefined,
  };

  const result = await getDirectories(normalizedLocale, query);
  const items = Array.isArray(result?.items) ? result.items : [];

  const categories = getDirectoryCategories(items, normalizedLocale);
  const { featured, regular } = splitFeatured(items);

  const baseParams = new URLSearchParams();

  if (query.q) baseParams.set("q", query.q);
  if (query.category) baseParams.set("category", query.category);
  if (query.featured) baseParams.set("featured", "1");

  const latestHref = `/${normalizedLocale}/directory${
    baseParams.toString() ? `?${baseParams.toString()}` : ""
  }`;

  const popularParams = new URLSearchParams(baseParams.toString());
  popularParams.set("sort", "popular");

  const popularHref = `/${normalizedLocale}/directory?${popularParams.toString()}`;

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

      <DirectoryFilterBar locale={normalizedLocale} categories={categories} />

      <div className="mb-5 flex gap-2">
        <Link
          href={latestHref}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            currentSort === ""
              ? "bg-primary text-white"
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {normalizedLocale === "en" ? "Latest" : "최신순"}
        </Link>

        <Link
          href={popularHref}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            currentSort === "popular"
              ? "bg-primary text-white"
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {normalizedLocale === "en" ? "Popular" : "인기순"}
        </Link>
      </div>

      <div className="mt-5 space-y-10">
        {featured.length > 0 && (
          <FeaturedListingGrid
            items={featured}
            locale={normalizedLocale}
            domain="directory"
          />
        )}

        {regular.length > 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white">
            <div className="grid grid-cols-[1fr_60px] gap-2 border-b bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-500 sm:grid-cols-[2fr_3fr_1fr_80px]">
              <div>{normalizedLocale === "en" ? "Title" : "제목"}</div>
              <div className="hidden sm:block">
                {normalizedLocale === "en" ? "Content" : "내용"}
              </div>
              <div className="hidden sm:block">
                {normalizedLocale === "en" ? "Region" : "지역"}
              </div>
              <div className="text-right">
                {normalizedLocale === "en" ? "Views" : "조회수"}
              </div>
            </div>

            {regular.map((item: any) => (
              <ListingRowItem
                key={item.id ?? item.slug}
                item={item}
                locale={normalizedLocale}
                domain="directory"
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
            {normalizedLocale === "en"
              ? "No regular directory listings found."
              : "일반 업소 목록이 없습니다."}
          </div>
        )}
      </div>
    </Container>
  );
}
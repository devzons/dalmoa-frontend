import Link from "next/link";
import { Container } from "@/components/base/Container";
import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import { buildListingHref } from "@/components/listing/listingHref";
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

  const query = {
    q: resolvedSearchParams.q?.trim() || undefined,
    category: resolvedSearchParams.category?.trim() || undefined,
  };

  const items = (await getDirectories(normalizedLocale, query)) ?? [];
  const categories = getDirectoryCategories(items, normalizedLocale);

  const { featured, regular } = splitFeatured(items);

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

      <div className="mt-8 space-y-10">
        {featured.length > 0 && (
          <FeaturedListingGrid
            items={featured}
            locale={normalizedLocale}
            domain="directory"
          />
        )}

        {regular.length > 0 ? (
          <div className="divide-y rounded-2xl border border-neutral-200 bg-white">
            {regular.map((item: any, index: number) => {
              const title =
                item.title ||
                item.name ||
                item.businessName ||
                item.displayName ||
                item.hero?.title ||
                "Untitled";

              const subtitle =
                item.businessCategory ||
                item.categoryLabel ||
                item.category ||
                item.address ||
                item.phone ||
                item.hero?.subtitle ||
                item.excerpt ||
                null;

              return (
                <Link
                  key={item.id ?? item.slug ?? `${title}-${index}`}
                  href={buildListingHref({
                    locale: normalizedLocale,
                    domain: "directory",
                    slug: item.slug,
                  })}
                  className="block px-5 py-4 transition hover:bg-neutral-50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-neutral-900">
                        {title}
                      </div>

                      {subtitle ? (
                        <div className="mt-1 truncate text-sm text-neutral-500">
                          {subtitle}
                        </div>
                      ) : null}
                    </div>

                    {item.phone ? (
                      <div className="shrink-0 text-sm text-neutral-500">
                        {item.phone}
                      </div>
                    ) : null}
                  </div>
                </Link>
              );
            })}
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
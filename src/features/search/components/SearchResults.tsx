import Link from "next/link";
import { Badge } from "@/components/base/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DirectoryList } from "@/features/directory/components/DirectoryList";
import type { SearchResponse } from "@/features/search/types";
import { groupSearchResults } from "@/features/search/utils";

export function SearchResults({
  data,
  locale,
}: {
  data: SearchResponse;
  locale: "ko" | "en";
}) {
  const grouped = groupSearchResults(data);

  const sections = [
    {
      key: "jobs",
      title: locale === "en" ? "Jobs" : "구인구직",
      items: grouped.jobs,
      href: (slug: string) => `/${locale}/jobs/${slug}`,
      listHref: `/${locale}/jobs?q=${encodeURIComponent(data.q)}`,
      badge: locale === "en" ? "Job" : "채용",
      meta: (item: any) => item.companyName ?? null,
    },
    {
      key: "business-sale",
      title: locale === "en" ? "Business Sale" : "사업체매매",
      items: grouped.businessSale,
      href: (slug: string) => `/${locale}/business-sale/${slug}`,
      listHref: `/${locale}/business-sale?q=${encodeURIComponent(data.q)}`,
      badge: locale === "en" ? "Business Sale" : "사업체매매",
      meta: (item: any) =>
        item.salePriceLabel ??
        item.priceLabel ??
        item.location ??
        item.businessCategory ??
        null,
    },
    {
      key: "loan",
      title: locale === "en" ? "Loan" : "융자",
      items: grouped.loan,
      href: (slug: string) => `/${locale}/loan/${slug}`,
      listHref: `/${locale}/loan?q=${encodeURIComponent(data.q)}`,
      badge: locale === "en" ? "Loan" : "융자",
      meta: (item: any) =>
        item.rateLabel ??
        item.interestRate ??
        item.loanAmountLabel ??
        item.loanAmount ??
        null,
    },
    {
      key: "marketplace",
      title: locale === "en" ? "Marketplace" : "사고팔기",
      items: grouped.marketplace,
      href: (slug: string) => `/${locale}/marketplace/${slug}`,
      listHref: `/${locale}/marketplace?q=${encodeURIComponent(data.q)}`,
      badge: locale === "en" ? "Marketplace" : "사고팔기",
      meta: (item: any) => item.priceLabel ?? null,
    },
    {
      key: "real-estate",
      title: locale === "en" ? "Real Estate" : "부동산",
      items: grouped.realEstate,
      href: (slug: string) => `/${locale}/real-estate/${slug}`,
      listHref: `/${locale}/real-estate?q=${encodeURIComponent(data.q)}`,
      badge: locale === "en" ? "Real Estate" : "부동산",
      meta: (item: any) => item.priceLabel ?? null,
    },
    {
      key: "cars",
      title: locale === "en" ? "Cars" : "자동차",
      items: grouped.cars,
      href: (slug: string) => `/${locale}/cars/${slug}`,
      listHref: `/${locale}/cars?q=${encodeURIComponent(data.q)}`,
      badge: locale === "en" ? "Car" : "자동차",
      meta: (item: any) => item.priceLabel ?? null,
    },
    {
      key: "news",
      title: locale === "en" ? "News" : "뉴스",
      items: grouped.news,
      href: (slug: string) => `/${locale}/news/${slug}`,
      listHref: `/${locale}/news?q=${encodeURIComponent(data.q)}`,
      badge: locale === "en" ? "News" : "뉴스",
      meta: () => null,
    },
    {
      key: "town-board",
      title: locale === "en" ? "Town Board" : "타운게시판",
      items: grouped.townBoard,
      href: (slug: string) => `/${locale}/town-board/${slug}`,
      listHref: `/${locale}/town-board?q=${encodeURIComponent(data.q)}`,
      badge: locale === "en" ? "Town Board" : "타운게시판",
      meta: (item: any) => item.boardCategory ?? null,
    },
  ];

  const directoryItems = grouped.directories.map((result) => result.item);
  const adItems = grouped.ads.map((result) => result.item);
  const businessItems = grouped.businesses.map((result) => result.item);

  return (
    <div className="space-y-10">
      {directoryItems.length > 0 ? (
        <section>
          <div className="flex items-start justify-between gap-4">
            <SectionHeading
              title={locale === "en" ? "Businesses" : "업소"}
              description={
                locale === "en"
                  ? `${directoryItems.length} results found`
                  : `${directoryItems.length}건 검색됨`
              }
            />

            <Link
              href={`/${locale}/directory?q=${encodeURIComponent(data.q)}`}
              className="mt-1 shrink-0 text-sm font-medium text-neutral-500 hover:text-neutral-900"
            >
              {locale === "en" ? "View more →" : "더보기 →"}
            </Link>
          </div>

          <DirectoryList items={directoryItems} locale={locale} />
        </section>
      ) : null}

      {sections.map((section) => {
        const items = section.items.map((result) => result.item);

        if (items.length === 0) return null;

        return (
          <section key={section.key}>
            <div className="flex items-start justify-between gap-4">
              <SectionHeading
                title={section.title}
                description={
                  locale === "en"
                    ? `${items.length} results found`
                    : `${items.length}건 검색됨`
                }
              />

              <Link
                href={section.listHref}
                className="mt-1 shrink-0 text-sm font-medium text-neutral-500 hover:text-neutral-900"
              >
                {locale === "en" ? "View more →" : "더보기 →"}
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item: any) => (
                <Link
                  key={`${section.key}-${item.id ?? item.slug}`}
                  href={section.href(item.slug)}
                  className="block"
                >
                  <Card className="h-full transition hover:shadow-md">
                    <CardHeader>
                      <div className="mb-2">
                        <Badge>{section.badge}</Badge>
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm text-neutral-600">
                      {section.meta(item) ? <p>{section.meta(item)}</p> : null}
                      {item.excerpt ? (
                        <p className="line-clamp-3">{item.excerpt}</p>
                      ) : null}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {businessItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Business Pages" : "비즈니스 페이지"}
            description={
              locale === "en"
                ? `${businessItems.length} results found`
                : `${businessItems.length}건 검색됨`
            }
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {businessItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/business/${item.slug}`}
                className="block"
              >
                <Card className="h-full transition hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Business" : "비즈니스"}</Badge>
                    </div>
                    <CardTitle>{item.hero.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="text-sm text-neutral-600">
                    {item.hero.subtitle ? <p>{item.hero.subtitle}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {adItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Ads" : "광고"}
            description={
              locale === "en"
                ? `${adItems.length} results found`
                : `${adItems.length}건 검색됨`
            }
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adItems.map((item) => {
              const href =
                item.ctaUrl && item.ctaUrl.startsWith("/")
                  ? item.ctaUrl
                  : item.ctaUrl || `/${locale}/ads`;

              return (
                <Card key={item.id} className="h-full transition hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Ad" : "광고"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm text-neutral-600">
                    {item.excerpt ? (
                      <p className="line-clamp-3">{item.excerpt}</p>
                    ) : null}
                    <Link
                      href={href}
                      target={item.isExternal ? "_blank" : "_self"}
                      className="font-medium underline"
                    >
                      {item.ctaLabel || (locale === "en" ? "View" : "보기")}
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
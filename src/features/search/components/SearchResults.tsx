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

  const directoryItems = grouped.directories.map((result) => result.item);
  const adItems = grouped.ads.map((result) => result.item);
  const businessItems = grouped.businesses.map((result) => result.item);
  const newsItems = grouped.news.map((result) => result.item);
  const jobItems = grouped.jobs.map((result) => result.item);
  const marketplaceItems = grouped.marketplace.map((result) => result.item);
  const realEstateItems = grouped.realEstate.map((result) => result.item);
  const carItems = grouped.cars.map((result) => result.item);
  const townBoardItems = grouped.townBoard.map((result) => result.item);
  const businessSaleItems = grouped.businessSale.map((result) => result.item);
  const loanItems = grouped.loan.map((result) => result.item);

  return (
    <div className="space-y-10">
      {directoryItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Businesses" : "업소"}
            description={
              locale === "en"
                ? `${directoryItems.length} results found`
                : `${directoryItems.length}건 검색됨`
            }
          />
          <DirectoryList items={directoryItems} locale={locale} />
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
          <div className="grid gap-4">
            {adItems.map((item) => {
              const href =
                item.ctaUrl && item.ctaUrl.startsWith("/")
                  ? item.ctaUrl
                  : item.ctaUrl || `/${locale}/ads`;

              return (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Ad" : "광고"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-neutral-600">
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                    <Link
                      href={href}
                      target={item.isExternal ? "_blank" : "_self"}
                      className="underline"
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
          <div className="grid gap-4">
            {businessItems.map((item) => (
              <Link key={item.slug} href={`/${locale}/business/${item.slug}`} className="block">
                <Card>
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

      {newsItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "News" : "뉴스"}
            description={
              locale === "en"
                ? `${newsItems.length} results found`
                : `${newsItems.length}건 검색됨`
            }
          />
          <div className="grid gap-4">
            {newsItems.map((item) => (
              <Link key={item.id} href={`/${locale}/news/${item.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "News" : "뉴스"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-neutral-600">
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {jobItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Jobs" : "구인구직"}
            description={
              locale === "en"
                ? `${jobItems.length} results found`
                : `${jobItems.length}건 검색됨`
            }
          />
          <div className="grid gap-4">
            {jobItems.map((item) => (
              <Link key={item.id} href={`/${locale}/jobs/${item.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Job" : "채용"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-neutral-600">
                    {item.companyName ? <p>{item.companyName}</p> : null}
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {marketplaceItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Marketplace" : "사고팔기"}
            description={
              locale === "en"
                ? `${marketplaceItems.length} results found`
                : `${marketplaceItems.length}건 검색됨`
            }
          />
          <div className="grid gap-4">
            {marketplaceItems.map((item) => (
              <Link key={item.id} href={`/${locale}/marketplace/${item.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Marketplace" : "사고팔기"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-neutral-600">
                    {item.priceLabel ? <p>{item.priceLabel}</p> : null}
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {realEstateItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Real Estate" : "부동산"}
            description={
              locale === "en"
                ? `${realEstateItems.length} results found`
                : `${realEstateItems.length}건 검색됨`
            }
          />
          <div className="grid gap-4">
            {realEstateItems.map((item) => (
              <Link key={item.id} href={`/${locale}/real-estate/${item.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Real Estate" : "부동산"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-neutral-600">
                    {item.priceLabel ? <p>{item.priceLabel}</p> : null}
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {carItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Cars" : "자동차"}
            description={
              locale === "en"
                ? `${carItems.length} results found`
                : `${carItems.length}건 검색됨`
            }
          />
          <div className="grid gap-4">
            {carItems.map((item) => (
              <Link key={item.id} href={`/${locale}/cars/${item.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Car" : "자동차"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-neutral-600">
                    {item.priceLabel ? <p>{item.priceLabel}</p> : null}
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {townBoardItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Town Board" : "타운게시판"}
            description={
              locale === "en"
                ? `${townBoardItems.length} results found`
                : `${townBoardItems.length}건 검색됨`
            }
          />
          <div className="grid gap-4">
            {townBoardItems.map((item) => (
              <Link key={item.id} href={`/${locale}/town-board/${item.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Town Board" : "타운게시판"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-neutral-600">
                    {item.boardCategory ? <p>{item.boardCategory}</p> : null}
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {businessSaleItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Business Sale" : "사업체매매"}
            description={
              locale === "en"
                ? `${businessSaleItems.length} results found`
                : `${businessSaleItems.length}건 검색됨`
            }
          />
          <div className="grid gap-4">
            {businessSaleItems.map((item) => (
              <Link key={item.id} href={`/${locale}/business-sale/${item.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Business Sale" : "사업체매매"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-neutral-600">
                    {item.salePriceLabel ? <p>{item.salePriceLabel}</p> : null}
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {loanItems.length > 0 ? (
        <section>
          <SectionHeading
            title={locale === "en" ? "Loan" : "융자"}
            description={
              locale === "en"
                ? `${loanItems.length} results found`
                : `${loanItems.length}건 검색됨`
            }
          />
          <div className="grid gap-4">
            {loanItems.map((item) => (
              <Link key={item.id} href={`/${locale}/loan/${item.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge>{locale === "en" ? "Loan" : "융자"}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-neutral-600">
                    {item.rateLabel ? <p>{item.rateLabel}</p> : null}
                    {item.loanAmountLabel ? <p>{item.loanAmountLabel}</p> : null}
                    {item.excerpt ? <p>{item.excerpt}</p> : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
import { notFound } from "next/navigation";
import { Badge } from "@/components/base/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import { SafeImage } from "@/components/common/SafeImage";
import { getMarketplaceItemBySlug } from "@/features/marketplace/api";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";
import { normalizeMediaUrl } from "@/lib/api/client";

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
    const item = await getMarketplaceItemBySlug(slug, normalizedLocale);

    return buildMetadata({
      title: item.title,
      description:
        item.excerpt ||
        (normalizedLocale === "en" ? `${item.title} marketplace detail` : `${item.title} 사고팔기 상세`),
      path: `/${normalizedLocale}/marketplace/${slug}`,
    });
  } catch {
    return buildMetadata({
      title: normalizedLocale === "en" ? "Marketplace Detail" : "사고팔기 상세",
      description:
        normalizedLocale === "en" ? "Marketplace detail page" : "사고팔기 상세 페이지",
      path: `/${normalizedLocale}/marketplace/${slug}`,
    });
  }
}

export const revalidate = 120;

export default async function MarketplaceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  let item;

  try {
    item = await getMarketplaceItemBySlug(slug, normalizedLocale);
  } catch {
    notFound();
  }

  if (!item) {
    notFound();
  }

  const thumbnailUrl = normalizeMediaUrl(item.thumbnailUrl);

  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <Card className="overflow-hidden">
          {thumbnailUrl ? (
            <SafeImage
              src={thumbnailUrl}
              alt={item.title}
              width={1400}
              height={900}
              className="h-[320px] w-full object-cover"
            />
          ) : null}

          <CardHeader>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {item.isFeatured ? (
                <Badge className="bg-neutral-900 text-white">
                  {normalizedLocale === "en" ? "Featured" : "추천"}
                </Badge>
              ) : null}

              {item.publishedAt ? (
                <span className="text-sm text-neutral-500">
                  {formatDate(item.publishedAt)}
                </span>
              ) : null}
            </div>

            <CardTitle className="text-3xl">{item.title}</CardTitle>

            {item.excerpt ? (
              <p className="mt-4 text-lg text-neutral-600">{item.excerpt}</p>
            ) : null}
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-3 text-sm text-neutral-700 md:grid-cols-2">
              {item.priceLabel ? (
                <div>
                  <strong className="mr-2 text-neutral-900">
                    {normalizedLocale === "en" ? "Price" : "가격"}
                  </strong>
                  <span>{item.priceLabel}</span>
                </div>
              ) : null}

              {item.itemCondition ? (
                <div>
                  <strong className="mr-2 text-neutral-900">
                    {normalizedLocale === "en" ? "Condition" : "상태"}
                  </strong>
                  <span>{item.itemCondition}</span>
                </div>
              ) : null}

              {item.itemLocation ? (
                <div>
                  <strong className="mr-2 text-neutral-900">
                    {normalizedLocale === "en" ? "Location" : "거래 위치"}
                  </strong>
                  <span>{item.itemLocation}</span>
                </div>
              ) : null}

              {item.contactEmail ? (
                <div className="md:col-span-2">
                  <strong className="mr-2 text-neutral-900">
                    {normalizedLocale === "en" ? "Email" : "이메일"}
                  </strong>
                  <a href={`mailto:${item.contactEmail}`} className="underline">
                    {item.contactEmail}
                  </a>
                </div>
              ) : null}

              {item.contactPhone ? (
                <div className="md:col-span-2">
                  <strong className="mr-2 text-neutral-900">
                    {normalizedLocale === "en" ? "Phone" : "연락처"}
                  </strong>
                  <span>{item.contactPhone}</span>
                </div>
              ) : null}

              {item.contactUrl ? (
                <div className="md:col-span-2">
                  <strong className="mr-2 text-neutral-900">
                    {normalizedLocale === "en" ? "Link" : "외부 링크"}
                  </strong>
                  <a
                    href={item.contactUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {item.contactUrl}
                  </a>
                </div>
              ) : null}
            </div>

            {item.content ? (
              <div className="whitespace-pre-wrap text-sm leading-7 text-neutral-700">
                {item.content}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
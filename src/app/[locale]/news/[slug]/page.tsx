import { notFound } from "next/navigation";
import { Badge } from "@/components/base/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import { SafeImage } from "@/components/common/SafeImage";
import { getNewsBySlug } from "@/features/news/api";
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
    const item = await getNewsBySlug(slug, normalizedLocale);

    return buildMetadata({
      title: item.title,
      description:
        item.excerpt ||
        (normalizedLocale === "en" ? `${item.title} news detail` : `${item.title} 뉴스 상세`),
      path: `/${normalizedLocale}/news/${slug}`,
    });
  } catch {
    return buildMetadata({
      title: normalizedLocale === "en" ? "News Detail" : "뉴스 상세",
      description:
        normalizedLocale === "en" ? "News detail page" : "뉴스 상세 페이지",
      path: `/${normalizedLocale}/news/${slug}`,
    });
  }
}

export const revalidate = 120;

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  let item;

  try {
    item = await getNewsBySlug(slug, normalizedLocale);
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
            {item.content ? (
              <div className="whitespace-pre-wrap text-sm leading-7 text-neutral-700">
                {item.content}
              </div>
            ) : null}

            {(item.sourceName || item.sourceUrl) ? (
              <div className="border-t border-neutral-200 pt-4 text-sm text-neutral-600">
                {item.sourceName ? (
                  <div>
                    <strong className="mr-2 text-neutral-900">
                      {normalizedLocale === "en" ? "Source" : "출처"}
                    </strong>
                    <span>{item.sourceName}</span>
                  </div>
                ) : null}

                {item.sourceUrl ? (
                  <div className="mt-2">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      {item.sourceUrl}
                    </a>
                  </div>
                ) : null}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
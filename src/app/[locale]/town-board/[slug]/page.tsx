import { notFound } from "next/navigation";
import { Badge } from "@/components/base/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import { SafeImage } from "@/components/common/SafeImage";
import { getTownBoardItemBySlug } from "@/features/town-board/api";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

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
    const item = await getTownBoardItemBySlug(slug, normalizedLocale);

    return buildMetadata({
      title: item.title,
      description:
        item.excerpt ||
        (normalizedLocale === "en" ? `${item.title} town board detail` : `${item.title} 게시글 상세`),
      path: `/${normalizedLocale}/town-board/${slug}`,
    });
  } catch {
    return buildMetadata({
      title: normalizedLocale === "en" ? "Town Board Detail" : "타운게시판 상세",
      description:
        normalizedLocale === "en" ? "Town board detail page" : "타운게시판 상세 페이지",
      path: `/${normalizedLocale}/town-board/${slug}`,
    });
  }
}

export const revalidate = 120;

export default async function TownBoardDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  let item;

  try {
    item = await getTownBoardItemBySlug(slug, normalizedLocale);
  } catch {
    notFound();
  }

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <Card className="overflow-hidden">
          {item.thumbnailUrl ? (
            <SafeImage
              src={item.thumbnailUrl}
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
              {item.boardCategory ? (
                <div>
                  <strong className="mr-2 text-neutral-900">
                    {normalizedLocale === "en" ? "Category" : "카테고리"}
                  </strong>
                  <span>{item.boardCategory}</span>
                </div>
              ) : null}

              {item.authorName ? (
                <div>
                  <strong className="mr-2 text-neutral-900">
                    {normalizedLocale === "en" ? "Author" : "작성자"}
                  </strong>
                  <span>{item.authorName}</span>
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
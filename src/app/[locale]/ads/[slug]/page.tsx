import { notFound } from "next/navigation";
import { Container } from "@/components/base/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Badge } from "@/components/base/Badge";
import { SafeImage } from "@/components/common/SafeImage";
import AdUpgradeButton from "@/components/payment/AdUpgradeButton";
import { getAdBySlug } from "@/features/ads/api";

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export default async function AdDetailPage({ params }: Props) {
  const locale = params.locale === "en" ? "en" : "ko";

  let item;

  try {
    item = await getAdBySlug(params.slug, locale);
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
              height={800}
              className="h-[260px] w-full object-cover"
            />
          ) : null}

          <CardHeader>
            <div className="mb-3 flex items-center gap-2">
              {item.isFeatured && (
                <Badge className="bg-amber-500 text-white">
                  {locale === "en" ? "Featured" : "추천"}
                </Badge>
              )}
            </div>

            <CardTitle className="text-2xl">{item.title}</CardTitle>

            {item.excerpt && (
              <p className="mt-3 text-sm text-neutral-600">
                {item.excerpt}
              </p>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {item.ctaUrl && (
              <a
                href={item.ctaUrl}
                target={item.isExternal ? "_blank" : "_self"}
                rel="noreferrer"
                className="inline-block rounded-xl bg-neutral-900 px-5 py-2 text-sm font-semibold text-white"
              >
                {item.ctaLabel || (locale === "en" ? "Visit" : "바로가기")}
              </a>
            )}

            {/* 🔥 결제 버튼 */}
            <div className="flex gap-3 pt-4">
              <AdUpgradeButton
                postId={item.id}
                plan="featured"
                locale={locale}
              />
              <AdUpgradeButton
                postId={item.id}
                plan="premium"
                locale={locale}
              />
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
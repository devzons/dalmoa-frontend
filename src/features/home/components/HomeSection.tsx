import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import { SafeImage } from "@/components/common/SafeImage";
import type { HomeCardItem, HomeLocale } from "@/features/home/types";

type Props = {
  title: string;
  description: string;
  moreHref: string;
  moreLabel: string;
  items: HomeCardItem[];
  locale: HomeLocale;
};

export function HomeSection({
  title,
  description,
  moreHref,
  moreLabel,
  items,
}: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="mt-2 text-sm text-neutral-500">{description}</p>
          </div>

          <Link href={moreHref} className="text-sm font-medium text-neutral-700 underline underline-offset-4">
            {moreLabel}
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <Link key={`${item.href}-${item.id}`} href={item.href} className="block">
              <Card className="h-full overflow-hidden transition-transform hover:-translate-y-0.5">
                {item.thumbnailUrl ? (
                  <SafeImage
                    src={item.thumbnailUrl}
                    alt={item.title}
                    width={1200}
                    height={800}
                    className="h-44 w-full object-cover"
                  />
                ) : null}

                <CardHeader>
                  {item.meta ? (
                    <div className="mb-2 text-xs text-neutral-500">{item.meta}</div>
                  ) : null}
                  <CardTitle className="line-clamp-2 text-lg">{item.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  {item.excerpt ? (
                    <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
                      {item.excerpt}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
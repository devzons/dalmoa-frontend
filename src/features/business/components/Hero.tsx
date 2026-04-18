import Link from "next/link";
import { Button } from "@/components/base/Button";
import { Container } from "@/components/base/Container";
import { SafeImage } from "@/components/common/SafeImage";
import type { BusinessPage } from "@/features/business/types";

export function Hero({ hero }: { hero: BusinessPage["hero"] }) {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <Container className="grid gap-8 py-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl">
            {hero.title}
          </h1>

          {hero.subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 lg:text-lg">
              {hero.subtitle}
            </p>
          ) : null}

          {hero.ctaLabel && hero.ctaUrl ? (
            <div className="mt-8">
              <Link href={hero.ctaUrl}>
                <Button size="lg">{hero.ctaLabel}</Button>
              </Link>
            </div>
          ) : null}
        </div>

        {hero.imageUrl ? (
          <SafeImage
            src={hero.imageUrl}
            alt={hero.title}
            width={1200}
            height={800}
            className="h-full min-h-[280px] w-full rounded-[2rem] object-cover"
            wrapperClassName="overflow-hidden rounded-[2rem]"
          />
        ) : null}
      </Container>
    </section>
  );
}
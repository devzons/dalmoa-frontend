import { Container } from "@/components/base/Container";
import { CarGrid } from "@/features/cars/components/CarGrid";
import { getCars } from "@/features/cars/api";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Cars" : "자동차",
    description:
      normalizedLocale === "en"
        ? "Vehicle listings and auto posts"
        : "차량 매물 및 자동차 게시물",
    path: `/${normalizedLocale}/cars`,
  });
}

export const revalidate = 120;

export default async function CarsPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const items = await getCars(normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Cars" : "자동차"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Vehicle listings and auto posts."
            : "차량 매물 및 자동차 게시물을 확인하세요."}
        </p>
      </div>

      <CarGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
import { Container } from "@/components/base/Container";
import AdCreateAndPayForm from "@/components/payment/AdCreateAndPayForm";
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
    title: normalizedLocale === "en" ? "Create Ad" : "광고 등록",
    description:
      normalizedLocale === "en"
        ? "Create a paid promotional ad."
        : "유료 프로모션 광고를 등록하세요.",
    path: `/${normalizedLocale}/ads/create`,
  });
}

export default async function AdCreatePage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950">
              {normalizedLocale === "en" ? "Create Ad" : "광고 등록"}
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              {normalizedLocale === "en"
                ? "Create your ad and continue directly to payment."
                : "광고 정보를 입력한 뒤 바로 결제로 이동합니다."}
            </p>
          </div>

          <AdCreateAndPayForm locale={normalizedLocale} />
        </div>
      </Container>
    </div>
  );
}
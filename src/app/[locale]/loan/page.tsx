import { Container } from "@/components/base/Container";
import { LoanGrid } from "@/features/loan/components/LoanGrid";
import { getLoanItems } from "@/features/loan/api";
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
    title: normalizedLocale === "en" ? "Loan" : "융자",
    description:
      normalizedLocale === "en"
        ? "Loan and financing opportunities"
        : "융자 및 금융 정보를 확인하세요.",
    path: `/${normalizedLocale}/loan`,
  });
}

export const revalidate = 120;

export default async function LoanPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const items = await getLoanItems(normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Loan" : "융자"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Explore loan and financing opportunities."
            : "등록된 융자 및 금융 정보를 확인하세요."}
        </p>
      </div>

      <LoanGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
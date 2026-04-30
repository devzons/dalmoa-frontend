import { Container } from "@/components/base/Container";
import { ListingCreateForm } from "@/components/common/ListingCreateForm";
import { requireSessionUser } from "@/lib/api/auth";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function BusinessSaleCreatePage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  await requireSessionUser();

  return (
    <Container className="space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Create Business Sale" : "사업체 매매 등록"}
        </h1>
      </div>

      <ListingCreateForm
        locale={normalizedLocale}
        category="business-sale"
      />
    </Container>
  );
}
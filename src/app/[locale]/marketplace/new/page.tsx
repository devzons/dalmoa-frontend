import { Container } from "@/components/base/Container";
import { ListingCreateForm } from "@/components/common/ListingCreateForm";
import { requireSessionUser } from "@/lib/api/auth";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function MarketplaceCreatePage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  await requireSessionUser();

  return (
    <Container className="space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Create Marketplace Listing" : "마켓 등록"}
        </h1>
      </div>

      <ListingCreateForm locale={normalizedLocale} category="marketplace" />
    </Container>
  );
}
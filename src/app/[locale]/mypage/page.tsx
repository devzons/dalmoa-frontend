import { Container } from "@/components/base/Container";
import { MyPageClient } from "@/features/mypage/components/MyPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MyPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale: "ko" | "en" = locale === "en" ? "en" : "ko";

  return (
    <Container className="py-10">
      <MyPageClient locale={normalizedLocale} />
    </Container>
  );
}
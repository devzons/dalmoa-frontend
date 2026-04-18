import { Container } from "@/components/base/Container";
import { LoginForm } from "@/features/auth/components/LoginForm";
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
    title: normalizedLocale === "en" ? "Login" : "로그인",
    description:
      normalizedLocale === "en"
        ? "Login to Dalmoa Hub"
        : "달모아 허브 로그인",
    path: `/${normalizedLocale}/login`,
  });
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return (
    <Container className="max-w-xl space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Login" : "로그인"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Login to create and manage your listings."
            : "로그인 후 게시글을 등록하고 관리할 수 있습니다."}
        </p>
      </div>

      <LoginForm locale={normalizedLocale} />
    </Container>
  );
}
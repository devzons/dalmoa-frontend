import { Container } from "@/components/base/Container";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
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
    title: normalizedLocale === "en" ? "Register" : "회원가입",
    description:
      normalizedLocale === "en"
        ? "Create your Dalmoa Hub account"
        : "달모아 허브 회원가입",
    path: `/${normalizedLocale}/register`,
  });
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return (
    <Container className="max-w-2xl space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Register" : "회원가입"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Create an account to post and manage listings."
            : "계정을 만들고 게시글을 등록하고 관리하세요."}
        </p>
      </div>

      <RegisterForm locale={normalizedLocale} />
    </Container>
  );
}
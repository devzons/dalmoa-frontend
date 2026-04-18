import { Container } from "@/components/base/Container";
import { ListingCreateForm } from "@/components/common/ListingCreateForm";
import { requireSessionUser } from "@/lib/api/auth";
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
    title: normalizedLocale === "en" ? "Create Job Listing" : "구인구직 등록",
    description:
      normalizedLocale === "en"
        ? "Create a new job listing"
        : "구인구직 게시글을 등록하세요.",
    path: `/${normalizedLocale}/jobs/new`,
  });
}

export default async function JobsCreatePage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  await requireSessionUser(normalizedLocale, `/${normalizedLocale}/jobs/new`);

  return (
    <Container className="space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Create Job Listing" : "구인구직 등록"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Fill out the form to post a new job."
            : "아래 정보를 입력하여 구인구직 글을 등록하세요."}
        </p>
      </div>

      <ListingCreateForm locale={normalizedLocale} category="jobs" />
    </Container>
  );
}
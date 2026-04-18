import { Container } from "@/components/base/Container";
import { JobGrid } from "@/features/jobs/components/JobGrid";
import { getJobs } from "@/features/jobs/api";
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
    title: normalizedLocale === "en" ? "Jobs" : "구인구직",
    description:
      normalizedLocale === "en"
        ? "Local job opportunities"
        : "지역 채용 및 구직 정보",
    path: `/${normalizedLocale}/jobs`,
  });
}

export const revalidate = 120;

export default async function JobsPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const items = await getJobs(normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Jobs" : "구인구직"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Local hiring and job opportunities."
            : "지역 채용 및 구직 정보."}
        </p>
      </div>

      <JobGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
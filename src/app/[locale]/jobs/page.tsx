import { Container } from "@/components/base/Container";
import { CreateListingEntry } from "@/components/common/CreateListingEntry";
import { getJobs } from "@/features/jobs/api";
import { JobGrid } from "@/features/jobs/components/JobGrid";
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
        ? "Browse job listings in the community."
        : "등록된 구인구직 정보를 확인하세요.",
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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {normalizedLocale === "en" ? "Jobs" : "구인구직"}
          </h1>
          <p className="mt-2 text-neutral-500">
            {normalizedLocale === "en"
              ? "Browse job listings in the community."
              : "등록된 구인구직 정보를 확인하세요."}
          </p>
        </div>

        <CreateListingEntry locale={normalizedLocale} category="jobs" />
      </div>

      <JobGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
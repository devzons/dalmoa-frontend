import { EmptyState } from "@/components/common/EmptyState";
import { JobCard } from "@/features/jobs/components/JobCard";
import type { JobItem } from "@/features/jobs/types";

export function JobGrid({
  items,
  locale,
}: {
  items: JobItem[];
  locale: "ko" | "en";
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={locale === "en" ? "No jobs found." : "등록된 구인구직 글이 없습니다."}
        description={
          locale === "en"
            ? "Please check back later."
            : "잠시 후 다시 확인해 주세요."
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <JobCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
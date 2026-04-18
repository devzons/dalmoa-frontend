import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { JobItem } from "@/features/jobs/types";

export function JobList({
  items,
  locale,
}: {
  items: JobItem[];
  locale: "ko" | "en";
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/${locale}/jobs/${item.slug}`}
          className="grid grid-cols-[1fr_auto] gap-4 border-b border-neutral-200 px-4 py-4 last:border-b-0"
        >
          <div className="min-w-0">
            <div className="truncate font-medium">{item.title}</div>
            {item.excerpt ? (
              <div className="truncate text-sm text-neutral-500">
                {item.excerpt}
              </div>
            ) : null}
          </div>

          {item.publishedAt ? (
            <div className="text-sm text-neutral-500">
              {formatDate(item.publishedAt)}
            </div>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
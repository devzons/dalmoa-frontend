import Link from "next/link";
import { getSessionUser } from "@/lib/api/auth";
import type { SubmitCategory } from "@/lib/api/listing-submit";

type Props = {
  locale: "ko" | "en";
  category: SubmitCategory;
  className?: string;
};

const copy = {
  ko: {
    create: "등록하기",
    login: "로그인 후 등록",
  },
  en: {
    create: "Create Listing",
    login: "Login to Create",
  },
} as const;

const pathMap: Record<SubmitCategory, string> = {
  "business-sale": "business-sale",
  loan: "loan",
  marketplace: "marketplace",
  "real-estate": "real-estate",
  cars: "cars",
  jobs: "jobs",
};

export async function CreateListingEntry({
  locale,
  category,
  className,
}: Props) {
  const user = await getSessionUser();
  const labels = copy[locale];
  const basePath = `/${locale}/${pathMap[category]}`;
  const createPath = `${basePath}/new`;

  if (user) {
    return (
      <Link
        href={createPath}
        className={[
          "inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-semibold text-white transition hover:opacity-90",
          className ?? "",
        ].join(" ")}
      >
        {labels.create}
      </Link>
    );
  }

  return (
    <Link
      href={`/${locale}/login?next=${encodeURIComponent(createPath)}`}
      className={[
        "inline-flex h-11 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50",
        className ?? "",
      ].join(" ")}
    >
      {labels.login}
    </Link>
  );
}
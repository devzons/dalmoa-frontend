import Link from "next/link";
import { getSessionUser } from "@/features/auth/server";
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
  ads: "ads",
};

export async function CreateListingEntry({
  locale,
  category,
  className,
}: Props) {
  const user = await getSessionUser();
  const labels = copy[locale];
  const basePath = `/${locale}/${pathMap[category]}`;
  const createPath = `${basePath}/new?target_domain=${category}`;

  return (
    <Link
      href={
        user
          ? createPath
          : `/${locale}/login?next=${encodeURIComponent(createPath)}`
      }
      className={[
        user
          ? "inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-semibold text-white transition hover:opacity-90"
          : "inline-flex h-11 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50",
        className ?? "",
      ].join(" ")}
    >
      {user ? labels.create : labels.login}
    </Link>
  );
}
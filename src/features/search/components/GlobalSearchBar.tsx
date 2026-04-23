"use client";

import { useState, useTransition, FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  locale: "ko" | "en";
  placeholder?: string;
  className?: string;
};

export default function GlobalSearchBar({
  locale,
  placeholder,
  className = "",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialQ = currentSearchParams.get("q") ?? "";
  const [q, setQ] = useState(initialQ);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    const keyword = q.trim();

    if (keyword) {
      params.set("q", keyword);
    }

    const target = `/${locale}/search${params.toString() ? `?${params.toString()}` : ""}`;

    startTransition(() => {
      router.push(target);
    });
  };

  const isSearchPage = pathname?.startsWith(`/${locale}/search`);

  return (
    <form
      onSubmit={submit}
      className={[
        "flex w-full items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm",
        className,
      ].join(" ")}
      role="search"
    >
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={
          placeholder ??
          (locale === "en"
            ? "Search jobs, business sale, loan, marketplace, real estate, cars..."
            : "구인구직, 사업체매매, 융자, 사고팔기, 부동산, 자동차 검색...")
        }
        className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-3 py-2 text-sm outline-none ring-0 placeholder:text-neutral-400"
        aria-label={locale === "en" ? "Global search" : "통합 검색"}
      />

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex shrink-0 items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? locale === "en"
            ? "Searching..."
            : "검색중..."
          : locale === "en"
            ? "Search"
            : "검색"}
      </button>

      {isSearchPage && q.trim() === "" ? (
        <span className="hidden text-xs text-neutral-400 lg:inline">
          {locale === "en" ? "Enter a keyword" : "검색어를 입력하세요"}
        </span>
      ) : null}
    </form>
  );
}
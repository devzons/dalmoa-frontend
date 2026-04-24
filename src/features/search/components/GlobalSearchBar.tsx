"use client";

import { useEffect, useRef, useState, useTransition, FormEvent, KeyboardEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  locale: "ko" | "en";
  placeholder?: string;
  className?: string;
};

type AutocompleteResult = {
  type: string;
  item: {
    id?: number;
    slug: string;
    title?: string;
    excerpt?: string | null;
    hero?: {
      title?: string;
      subtitle?: string | null;
    };
  };
};

const typePathMap: Record<string, string> = {
  directory: "directory",
  ad: "ads",
  business: "business",
  news: "news",
  jobs: "jobs",
  marketplace: "marketplace",
  "real-estate": "real-estate",
  cars: "cars",
  "town-board": "town-board",
  "business-sale": "business-sale",
  loan: "loan",
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
  const [debouncedQ, setDebouncedQ] = useState(initialQ);
  const [results, setResults] = useState<AutocompleteResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    if (debouncedQ.length < 2) {
      setResults([]);
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    let cancelled = false;

    fetch(`/api/search?q=${encodeURIComponent(debouncedQ)}&locale=${locale}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;

        const nextResults = Array.isArray(data?.results)
          ? data.results.slice(0, 6)
          : [];

        setResults(nextResults);
        setIsOpen(nextResults.length > 0);
        setActiveIndex(-1);
      })
      .catch(() => {
        if (!cancelled) {
          setResults([]);
          setIsOpen(false);
          setActiveIndex(-1);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQ, locale]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const getTitle = (result: AutocompleteResult) =>
    result.item.title ?? result.item.hero?.title ?? "";

  const goSearch = () => {
    const keyword = q.trim();
    const target = `/${locale}/search${
      keyword ? `?q=${encodeURIComponent(keyword)}` : ""
    }`;

    startTransition(() => {
      setIsOpen(false);
      setActiveIndex(-1);
      router.push(target);
    });
  };

  const goResult = (result: AutocompleteResult) => {
    const path = typePathMap[result.type] ?? result.type;

    startTransition(() => {
      setIsOpen(false);
      setActiveIndex(-1);
      router.push(`/${locale}/${path}/${result.item.slug}`);
    });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isOpen && activeIndex >= 0 && results[activeIndex]) {
      goResult(results[activeIndex]);
      return;
    }

    goSearch();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setActiveIndex(-1);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((current) =>
        current >= results.length - 1 ? 0 : current + 1
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? results.length - 1 : current - 1
      );
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const isSearchPage = pathname?.startsWith(`/${locale}/search`);

  return (
    <form
      ref={wrapperRef}
      onSubmit={submit}
      className={[
        "relative flex w-full items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm",
        className,
      ].join(" ")}
      role="search"
    >
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={
          placeholder ??
          (locale === "en"
            ? "Search jobs, business sale, loan, marketplace, real estate, cars..."
            : "구인구직, 사업체매매, 융자, 사고팔기, 부동산, 자동차 검색...")
        }
        className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-3 py-2 text-sm outline-none ring-0 placeholder:text-neutral-400"
        aria-label={locale === "en" ? "Global search" : "통합 검색"}
        aria-expanded={isOpen}
        aria-controls="global-search-autocomplete"
        autoComplete="off"
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

      {isOpen ? (
        <div
          id="global-search-autocomplete"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
        >
          {results.map((result, index) => {
            const title = getTitle(result);
            const active = index === activeIndex;

            return (
              <button
                key={`${result.type}-${result.item.slug}`}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => goResult(result)}
                className={[
                  "block w-full px-4 py-3 text-left transition",
                  active ? "bg-neutral-100" : "hover:bg-neutral-50",
                ].join(" ")}
              >
                <div className="line-clamp-1 text-sm font-semibold text-neutral-900">
                  {title}
                </div>
                <div className="mt-0.5 text-xs text-neutral-500">
                  {result.type}
                </div>
              </button>
            );
          })}

          <button
            type="button"
            onClick={goSearch}
            className="block w-full border-t border-neutral-100 px-4 py-3 text-left text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            {locale === "en" ? "View all results →" : "전체 검색 결과 →"}
          </button>
        </div>
      ) : null}
    </form>
  );
}
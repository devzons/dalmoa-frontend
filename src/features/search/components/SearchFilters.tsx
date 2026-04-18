"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Locale = "ko" | "en";

export type SearchFilterValues = {
  q: string;
  featured: boolean;
  region: string;
  price_min: string;
  price_max: string;
};

type RegionOption = {
  label: string;
  value: string;
};

type Props = {
  locale: Locale;
  initialValues: SearchFilterValues;
  regionOptions?: RegionOption[];
  className?: string;
};

const copy = {
  ko: {
    keyword: "검색어",
    keywordPlaceholder: "검색어를 입력하세요",
    featured: "추천만 보기",
    region: "지역",
    regionPlaceholder: "전체 지역",
    priceMin: "최소 금액",
    priceMinPlaceholder: "0",
    priceMax: "최대 금액",
    priceMaxPlaceholder: "1000000",
    apply: "적용",
    reset: "초기화",
  },
  en: {
    keyword: "Keyword",
    keywordPlaceholder: "Enter keyword",
    featured: "Featured only",
    region: "Region",
    regionPlaceholder: "All regions",
    priceMin: "Min price",
    priceMinPlaceholder: "0",
    priceMax: "Max price",
    priceMaxPlaceholder: "1000000",
    apply: "Apply",
    reset: "Reset",
  },
} as const;

function onlyDigits(value: string) {
  return value.replace(/[^\d]/g, "");
}

function setOrDelete(params: URLSearchParams, key: string, value: string) {
  const normalized = value.trim();

  if (!normalized) {
    params.delete(key);
    return;
  }

  params.set(key, normalized);
}

export function SearchFilters({
  locale,
  initialValues,
  regionOptions = [],
  className,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const labels = copy[locale];

  const values = useMemo<SearchFilterValues>(
    () => ({
      q: searchParams.get("q") ?? initialValues.q,
      featured:
        (searchParams.get("featured") ??
          (initialValues.featured ? "1" : "")) === "1",
      region: searchParams.get("region") ?? initialValues.region,
      price_min: searchParams.get("price_min") ?? initialValues.price_min,
      price_max: searchParams.get("price_max") ?? initialValues.price_max,
    }),
    [initialValues, searchParams],
  );

  const submit = (formData: FormData) => {
    const next = new URLSearchParams(searchParams.toString());

    const q = String(formData.get("q") ?? "");
    const featured = formData.get("featured") === "1";
    const region = String(formData.get("region") ?? "");
    const priceMin = onlyDigits(String(formData.get("price_min") ?? ""));
    const priceMax = onlyDigits(String(formData.get("price_max") ?? ""));

    setOrDelete(next, "q", q);
    setOrDelete(next, "region", region);
    setOrDelete(next, "price_min", priceMin);
    setOrDelete(next, "price_max", priceMax);

    if (featured) {
      next.set("featured", "1");
    } else {
      next.delete("featured");
    }

    next.delete("page");

    const queryString = next.toString();

    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const reset = () => {
    const next = new URLSearchParams(searchParams.toString());

    next.delete("q");
    next.delete("featured");
    next.delete("region");
    next.delete("price_min");
    next.delete("price_max");
    next.delete("page");

    const queryString = next.toString();

    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  return (
    <form
      action={submit}
      className={[
        "rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm",
        className ?? "",
      ].join(" ")}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <label
            htmlFor="search-q"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {labels.keyword}
          </label>
          <input
            id="search-q"
            name="q"
            type="text"
            defaultValue={values.q}
            placeholder={labels.keywordPlaceholder}
            className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900"
          />
        </div>

        <div>
          <label
            htmlFor="search-region"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {labels.region}
          </label>

          {regionOptions.length > 0 ? (
            <select
              id="search-region"
              name="region"
              defaultValue={values.region}
              className="h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-neutral-900"
            >
              <option value="">{labels.regionPlaceholder}</option>
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="search-region"
              name="region"
              type="text"
              defaultValue={values.region}
              placeholder={labels.regionPlaceholder}
              className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="search-price-min"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {labels.priceMin}
          </label>
          <input
            id="search-price-min"
            name="price_min"
            type="text"
            inputMode="numeric"
            defaultValue={values.price_min}
            placeholder={labels.priceMinPlaceholder}
            className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900"
          />
        </div>

        <div>
          <label
            htmlFor="search-price-max"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {labels.priceMax}
          </label>
          <input
            id="search-price-max"
            name="price_max"
            type="text"
            inputMode="numeric"
            defaultValue={values.price_max}
            placeholder={labels.priceMaxPlaceholder}
            className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
          <input
            name="featured"
            type="checkbox"
            value="1"
            defaultChecked={values.featured}
            className="h-4 w-4 rounded border-neutral-300"
          />
          <span>{labels.featured}</span>
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            disabled={isPending}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {labels.reset}
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {labels.apply}
          </button>
        </div>
      </div>
    </form>
  );
}
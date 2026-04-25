"use client";

import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ListingSearchDomain, ListingSearchFilters } from "../types";
import { buildListingSearchHref } from "../url";

type ListingFiltersProps = {
  domain: ListingSearchDomain;
  initialFilters: ListingSearchFilters;
  regionOptions?: string[];
};

const domainLabels: Record<ListingSearchDomain, string> = {
  "business-sale": "Business Sale",
  jobs: "Jobs",
  marketplace: "Marketplace",
  "real-estate": "Real Estate",
  cars: "Cars",
  loan: "Loan",
};

const categoryOptions: Record<ListingSearchDomain, string[]> = {
  jobs: ["restaurant", "office", "retail", "beauty", "delivery", "other"],
  "business-sale": ["restaurant", "beauty", "retail", "laundry", "gas-station", "other"],
  loan: ["business-loan", "mortgage", "personal-loan", "sba", "other"],
  marketplace: ["furniture", "electronics", "appliance", "baby", "fashion", "other"],
  "real-estate": ["rent", "sale", "commercial", "room", "office", "other"],
  cars: ["sedan", "suv", "truck", "van", "luxury", "other"],
};

export default function ListingFilters({
  domain,
  initialFilters,
  regionOptions = ["Dallas", "Plano", "Carrollton", "Frisco", "Irving", "Arlington"],
}: ListingFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(initialFilters.q);
  const [featured, setFeatured] = useState(initialFilters.featured);
  const [region, setRegion] = useState(initialFilters.region);
  const [category, setCategory] = useState(initialFilters.category);
  const [priceMin, setPriceMin] = useState(initialFilters.priceMin);
  const [priceMax, setPriceMax] = useState(initialFilters.priceMax);

  const currentLabel = useMemo(() => domainLabels[domain], [domain]);
  const categories = categoryOptions[domain];

  const applyFilters = () => {
    const href = buildListingSearchHref(pathname, {
      q: q.trim(),
      featured,
      region,
      category,
      priceMin: priceMin.replace(/[^\d]/g, ""),
      priceMax: priceMax.replace(/[^\d]/g, ""),
      page: 1,
    });

    startTransition(() => router.push(href));
  };

  const resetFilters = () => {
    setQ("");
    setFeatured(false);
    setRegion("");
    setCategory("");
    setPriceMin("");
    setPriceMax("");

    startTransition(() => router.push(pathname));
  };

  const inputClass =
    "h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-900";

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-gray-500">Search Filters</p>
          <h2 className="text-base font-bold text-gray-900">{currentLabel}</h2>
        </div>

        <div className="text-xs text-gray-500">
          {isPending ? "Updating..." : "Filters"}
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <label htmlFor={`${domain}-q`} className="mb-1 block text-xs font-medium text-gray-700">
            Search
          </label>
          <input
            id={`${domain}-q`}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${currentLabel.toLowerCase()}...`}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${domain}-category`} className="mb-1 block text-xs font-medium text-gray-700">
            Category
          </label>
          <select
            id={`${domain}-category`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("-", " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${domain}-region`} className="mb-1 block text-xs font-medium text-gray-700">
            Region
          </label>
          <select
            id={`${domain}-region`}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={inputClass}
          >
            <option value="">All Regions</option>
            {regionOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${domain}-price-min`} className="mb-1 block text-xs font-medium text-gray-700">
            Min Price
          </label>
          <input
            id={`${domain}-price-min`}
            type="text"
            inputMode="numeric"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="0"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${domain}-price-max`} className="mb-1 block text-xs font-medium text-gray-700">
            Max Price
          </label>
          <input
            id={`${domain}-price-max`}
            type="text"
            inputMode="numeric"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="100000"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-gray-300"
          />
          Featured only
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-9 items-center rounded-lg border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={applyFilters}
            disabled={isPending}
            className="inline-flex h-9 items-center rounded-lg bg-gray-900 px-3 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}
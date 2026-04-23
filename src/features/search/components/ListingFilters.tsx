'use client';

import { useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { ListingSearchDomain, ListingSearchFilters } from '../types';
import { buildListingSearchHref } from '../url';

type ListingFiltersProps = {
  domain: ListingSearchDomain;
  initialFilters: ListingSearchFilters;
  regionOptions?: string[];
};

const domainLabels: Record<ListingSearchDomain, string> = {
  'business-sale': 'Business Sale',
  jobs: 'Jobs',
  marketplace: 'Marketplace',
  'real-estate': 'Real Estate',
  cars: 'Cars',
  loan: 'Loan',
};

export default function ListingFilters({
  domain,
  initialFilters,
  regionOptions = ['Dallas', 'Plano', 'Carrollton', 'Frisco', 'Irving', 'Arlington'],
}: ListingFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(initialFilters.q);
  const [featured, setFeatured] = useState(initialFilters.featured);
  const [region, setRegion] = useState(initialFilters.region);
  const [priceMin, setPriceMin] = useState(initialFilters.priceMin);
  const [priceMax, setPriceMax] = useState(initialFilters.priceMax);

  const currentLabel = useMemo(() => domainLabels[domain], [domain]);

  const applyFilters = () => {
    const href = buildListingSearchHref(pathname, {
      q: q.trim(),
      featured,
      region,
      priceMin: priceMin.replace(/[^\d]/g, ''),
      priceMax: priceMax.replace(/[^\d]/g, ''),
      page: 1,
    });

    startTransition(() => {
      router.push(href);
    });
  };

  const resetFilters = () => {
    setQ('');
    setFeatured(false);
    setRegion('');
    setPriceMin('');
    setPriceMax('');

    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Search Filters</p>
          <h2 className="text-xl font-bold text-gray-900">{currentLabel}</h2>
        </div>

        <div className="text-sm text-gray-500">
          {isPending ? 'Updating...' : 'URL-based filter state enabled'}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <label htmlFor={`${domain}-q`} className="mb-2 block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            id={`${domain}-q`}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${currentLabel.toLowerCase()}...`}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900"
          />
        </div>

        <div>
          <label htmlFor={`${domain}-region`} className="mb-2 block text-sm font-medium text-gray-700">
            Region
          </label>
          <select
            id={`${domain}-region`}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900"
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
          <label htmlFor={`${domain}-price-min`} className="mb-2 block text-sm font-medium text-gray-700">
            Min Price
          </label>
          <input
            id={`${domain}-price-min`}
            type="text"
            inputMode="numeric"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="0"
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900"
          />
        </div>

        <div>
          <label htmlFor={`${domain}-price-max`} className="mb-2 block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <input
            id={`${domain}-price-max`}
            type="text"
            inputMode="numeric"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="100000"
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-900"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Featured only
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={applyFilters}
            disabled={isPending}
            className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </section>
  );
}
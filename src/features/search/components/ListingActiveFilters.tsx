import type { ListingSearchFilters } from "../types";

type ListingActiveFiltersProps = {
  filters: ListingSearchFilters;
};

export default function ListingActiveFilters({ filters }: ListingActiveFiltersProps) {
  const items = [
    filters.q ? `q=${filters.q}` : null,
    filters.featured ? "featured=1" : null,
    filters.region ? `region=${filters.region}` : null,
    filters.category ? `category=${filters.category}` : null,
    filters.priceMin ? `price_min=${filters.priceMin}` : null,
    filters.priceMax ? `price_max=${filters.priceMax}` : null,
    filters.page > 1 ? `page=${filters.page}` : null,
  ].filter(Boolean) as string[];

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
        No active filters.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-medium text-gray-500">Active Filters</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
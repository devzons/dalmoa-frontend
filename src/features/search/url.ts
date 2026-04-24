import type {
  ListingSearchFilters,
  ListingSearchParamsInput,
} from "./types";

const getSingleValue = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
};

const sanitizePositiveNumberString = (value: string) => {
  return value.replace(/[^\d]/g, "");
};

const sanitizePage = (value: string) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
};

export function parseListingSearchParams(
  searchParams?: ListingSearchParamsInput
): ListingSearchFilters {
  const q = getSingleValue(searchParams?.q).trim();
  const featured = getSingleValue(searchParams?.featured) === "1";
  const region = getSingleValue(searchParams?.region).trim();
  const category = getSingleValue(searchParams?.category).trim();
  const priceMin = sanitizePositiveNumberString(getSingleValue(searchParams?.price_min));
  const priceMax = sanitizePositiveNumberString(getSingleValue(searchParams?.price_max));
  const page = sanitizePage(getSingleValue(searchParams?.page));

  return {
    q,
    featured,
    region,
    category,
    priceMin,
    priceMax,
    page,
  };
}

export function buildListingSearchParams(filters: ListingSearchFilters) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.featured) params.set("featured", "1");
  if (filters.region) params.set("region", filters.region);
  if (filters.category) params.set("category", filters.category);
  if (filters.priceMin) params.set("price_min", filters.priceMin);
  if (filters.priceMax) params.set("price_max", filters.priceMax);
  if (filters.page > 1) params.set("page", String(filters.page));

  return params;
}

export function buildListingSearchHref(
  pathname: string,
  filters: ListingSearchFilters
) {
  const params = buildListingSearchParams(filters);
  const queryString = params.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}
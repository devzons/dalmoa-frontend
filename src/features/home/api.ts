import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";
import type { AdItem } from "@/features/ads/types/ad";
import type { HomeCardItem, HomeData, HomeLocale } from "@/features/home/types";

type PaginatedApiResponse<T> = {
  items?: T[];
  total?: number;
  page?: number;
  perPage?: number;
  totalPages?: number;
};

type MaybePaginated<T> = T[] | PaginatedApiResponse<T>;

type DirectoryApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  address?: string | null;
  address_ko?: string | null;
  address_en?: string | null;
  isFeatured?: boolean;
};

type AdApiItem = AdItem & {
  ctaUrl?: string | null;
  isExternal?: boolean;
  isFeatured?: boolean;
  adPriority?: number | string | null;
};

type NewsApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  publishedAt?: string | null;
};

type JobApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  companyName?: string | null;
  publishedAt?: string | null;
};

type BusinessSaleApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  priceLabel?: string | null;
  businessCategory?: string | null;
  location?: string | null;
  publishedAt?: string | null;
};

type LoanApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  loanType?: string | null;
  interestRate?: string | null;
  loanAmount?: string | null;
  location?: string | null;
  publishedAt?: string | null;
};

type MarketplaceApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  priceLabel?: string | null;
  publishedAt?: string | null;
};

type RealEstateApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  priceLabel?: string | null;
  publishedAt?: string | null;
};

type CarApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  priceLabel?: string | null;
  publishedAt?: string | null;
};

type TownBoardApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  boardCategory?: string | null;
  publishedAt?: string | null;
};

type CommonImageFields = {
  thumbnail?: string | null;
  imageUrl?: string | null;
  featuredImageUrl?: string | null;
  featuredImage?: string | null;
  image?: string | null;
};

function getThumbnailUrl(
  item: CommonImageFields & { thumbnailUrl?: string | null },
) {
  return (
    item.thumbnailUrl ||
    item.thumbnail ||
    item.imageUrl ||
    item.featuredImageUrl ||
    item.featuredImage ||
    item.image ||
    null
  );
}

function unwrapItems<T>(data: MaybePaginated<T> | null | undefined): T[] {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
}

function listUrl(basePath: string, locale: HomeLocale) {
  const searchParams = new URLSearchParams();
  searchParams.set("lang", locale);
  return `${basePath}?${searchParams.toString()}`;
}

function featuredUrl(basePath: string, locale: HomeLocale) {
  const searchParams = new URLSearchParams();
  searchParams.set("lang", locale);
  return `${basePath}?${searchParams.toString()}`;
}

function withNext(tags: string[]) {
  return {
    next: {
      revalidate: 120,
      tags,
    },
  };
}

function take<T>(items: T[], count: number) {
  return items.slice(0, count);
}

function mapDirectory(
  data: MaybePaginated<DirectoryApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    href: `/${locale}/directory/${item.slug}`,
    meta: item.address ?? item.address_ko ?? item.address_en ?? null,
  }));
}

function mapAds(data: MaybePaginated<AdApiItem>): AdItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    region: item.region ?? null,
    adPlan: item.adPlan ?? null,
    status: item.status ?? null,
    priority: item.priority ?? null,
    createdAt: item.createdAt,
    startsAt: item.startsAt ?? null,
    endsAt: item.endsAt ?? null,
  }));
}

function mapNews(
  data: MaybePaginated<NewsApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    publishedAt: item.publishedAt,
    href: `/${locale}/news/${item.slug}`,
    meta: item.publishedAt ?? null,
  }));
}

function mapJobs(
  data: MaybePaginated<JobApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    publishedAt: item.publishedAt,
    href: `/${locale}/jobs/${item.slug}`,
    meta: item.companyName ?? null,
  }));
}

function mapBusinessSale(
  data: MaybePaginated<BusinessSaleApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    publishedAt: item.publishedAt,
    href: `/${locale}/business-sale/${item.slug}`,
    meta: item.priceLabel ?? item.location ?? item.businessCategory ?? null,
  }));
}

function mapLoan(
  data: MaybePaginated<LoanApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    publishedAt: item.publishedAt,
    href: `/${locale}/loan/${item.slug}`,
    meta: item.interestRate ?? item.loanAmount ?? item.loanType ?? null,
  }));
}

function mapMarketplace(
  data: MaybePaginated<MarketplaceApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    publishedAt: item.publishedAt,
    href: `/${locale}/marketplace/${item.slug}`,
    meta: item.priceLabel ?? null,
  }));
}

function mapRealEstate(
  data: MaybePaginated<RealEstateApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    publishedAt: item.publishedAt,
    href: `/${locale}/real-estate/${item.slug}`,
    meta: item.priceLabel ?? null,
  }));
}

function mapCars(
  data: MaybePaginated<CarApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    publishedAt: item.publishedAt,
    href: `/${locale}/cars/${item.slug}`,
    meta: item.priceLabel ?? null,
  }));
}

function mapTownBoard(
  data: MaybePaginated<TownBoardApiItem>,
  locale: HomeLocale,
): HomeCardItem[] {
  return unwrapItems(data).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: getThumbnailUrl(item),
    publishedAt: item.publishedAt,
    href: `/${locale}/town-board/${item.slug}`,
    meta: item.boardCategory ?? null,
  }));
}

export async function getHomeData(locale: HomeLocale): Promise<HomeData> {
  const [
    ads,
    directory,
    news,
    jobs,
    businessSale,
    loan,
    marketplace,
    realEstate,
    cars,
    townBoard,
  ] = await Promise.all([
    apiFetch<MaybePaginated<AdApiItem>>(
      featuredUrl(endpoints.adsFeatured, locale),
      withNext([cacheTags.adsFeatured]),
    ),

    apiFetch<MaybePaginated<DirectoryApiItem>>(
      listUrl(endpoints.directoryList, locale),
      withNext([cacheTags.directoryList]),
    ),

    apiFetch<MaybePaginated<NewsApiItem>>(
      listUrl(endpoints.newsList, locale),
      withNext([cacheTags.newsList]),
    ),

    apiFetch<MaybePaginated<JobApiItem>>(
      listUrl(endpoints.jobsList, locale),
      withNext([cacheTags.jobsList]),
    ),

    apiFetch<MaybePaginated<BusinessSaleApiItem>>(
      listUrl(endpoints.businessSaleList, locale),
      withNext(["business-sale-list"]),
    ),

    apiFetch<MaybePaginated<LoanApiItem>>(
      listUrl(endpoints.loanList, locale),
      withNext(["loan-list"]),
    ),

    apiFetch<MaybePaginated<MarketplaceApiItem>>(
      listUrl(endpoints.marketplaceList, locale),
      withNext([cacheTags.marketplaceList]),
    ),

    apiFetch<MaybePaginated<RealEstateApiItem>>(
      listUrl(endpoints.realEstateList, locale),
      withNext([cacheTags.realEstateList]),
    ),

    apiFetch<MaybePaginated<CarApiItem>>(
      listUrl(endpoints.carsList, locale),
      withNext([cacheTags.carsList]),
    ),

    apiFetch<MaybePaginated<TownBoardApiItem>>(
      listUrl(endpoints.townBoardList, locale),
      withNext([cacheTags.townBoardList]),
    ),
  ]);

  const directoryItems = unwrapItems(directory);
  const featuredDirectory = directoryItems.filter((item) => item.isFeatured);

  return {
    featuredAds: take(mapAds(ads ?? []), 4),
    featuredDirectory: take(
      mapDirectory(
        featuredDirectory.length > 0 ? featuredDirectory : directoryItems,
        locale,
      ),
      6,
    ),
    latestNews: take(mapNews(news ?? [], locale), 4),
    latestJobs: take(mapJobs(jobs ?? [], locale), 4),
    latestBusinessSale: take(mapBusinessSale(businessSale ?? [], locale), 4),
    latestLoan: take(mapLoan(loan ?? [], locale), 4),
    latestMarketplace: take(mapMarketplace(marketplace ?? [], locale), 4),
    latestRealEstate: take(mapRealEstate(realEstate ?? [], locale), 4),
    latestCars: take(mapCars(cars ?? [], locale), 4),
    latestTownBoard: take(mapTownBoard(townBoard ?? [], locale), 4),
  };
}
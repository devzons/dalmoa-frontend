import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { cacheTags } from "@/lib/cache/tags";
import type { HomeCardItem, HomeData, HomeLocale } from "@/features/home/types";

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

type AdApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  ctaUrl?: string | null;
  isExternal?: boolean;
  isFeatured?: boolean;
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

function listUrl(basePath: string, locale: HomeLocale) {
  const searchParams = new URLSearchParams();
  searchParams.set("locale", locale);
  return `${basePath}?${searchParams.toString()}`;
}

function take<T>(items: T[], count: number) {
  return items.slice(0, count);
}

function mapDirectory(items: DirectoryApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    href: `/${locale}/directory/${item.slug}`,
    meta: item.address ?? item.address_ko ?? item.address_en ?? null,
  }));
}

function mapAds(items: AdApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    href:
      item.ctaUrl && item.ctaUrl.startsWith("/")
        ? item.ctaUrl
        : item.ctaUrl || `/${locale}/ads`,
    meta: locale === "en" ? "Featured Ad" : "추천 광고",
  }));
}

function mapNews(items: NewsApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    publishedAt: item.publishedAt,
    href: `/${locale}/news/${item.slug}`,
    meta: item.publishedAt ?? null,
  }));
}

function mapJobs(items: JobApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    publishedAt: item.publishedAt,
    href: `/${locale}/jobs/${item.slug}`,
    meta: item.companyName ?? null,
  }));
}

function mapBusinessSale(items: BusinessSaleApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    publishedAt: item.publishedAt,
    href: `/${locale}/business-sale/${item.slug}`,
    meta: item.priceLabel ?? item.location ?? item.businessCategory ?? null,
  }));
}

function mapLoan(items: LoanApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    publishedAt: item.publishedAt,
    href: `/${locale}/loan/${item.slug}`,
    meta: item.interestRate ?? item.loanAmount ?? item.loanType ?? null,
  }));
}

function mapMarketplace(items: MarketplaceApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    publishedAt: item.publishedAt,
    href: `/${locale}/marketplace/${item.slug}`,
    meta: item.priceLabel ?? null,
  }));
}

function mapRealEstate(items: RealEstateApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    publishedAt: item.publishedAt,
    href: `/${locale}/real-estate/${item.slug}`,
    meta: item.priceLabel ?? null,
  }));
}

function mapCars(items: CarApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
    publishedAt: item.publishedAt,
    href: `/${locale}/cars/${item.slug}`,
    meta: item.priceLabel ?? null,
  }));
}

function mapTownBoard(items: TownBoardApiItem[], locale: HomeLocale): HomeCardItem[] {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    thumbnailUrl: item.thumbnailUrl,
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
    apiFetch<AdApiItem[]>(`${endpoints.adsFeatured}?locale=${locale}`, {
      revalidate: 120,
      tags: [cacheTags.adsFeatured],
    }),
    apiFetch<DirectoryApiItem[]>(listUrl(endpoints.directoryList, locale), {
      revalidate: 120,
      tags: [cacheTags.directoryList],
    }),
    apiFetch<NewsApiItem[]>(listUrl(endpoints.newsList, locale), {
      revalidate: 120,
      tags: [cacheTags.newsList],
    }),
    apiFetch<JobApiItem[]>(listUrl(endpoints.jobsList, locale), {
      revalidate: 120,
      tags: [cacheTags.jobsList],
    }),
    apiFetch<BusinessSaleApiItem[]>(listUrl(endpoints.businessSaleList, locale), {
      revalidate: 120,
      tags: ["business-sale-list"],
    }),
    apiFetch<LoanApiItem[]>(listUrl(endpoints.loanList, locale), {
      revalidate: 120,
      tags: ["loan-list"],
    }),
    apiFetch<MarketplaceApiItem[]>(listUrl(endpoints.marketplaceList, locale), {
      revalidate: 120,
      tags: [cacheTags.marketplaceList],
    }),
    apiFetch<RealEstateApiItem[]>(listUrl(endpoints.realEstateList, locale), {
      revalidate: 120,
      tags: [cacheTags.realEstateList],
    }),
    apiFetch<CarApiItem[]>(listUrl(endpoints.carsList, locale), {
      revalidate: 120,
      tags: [cacheTags.carsList],
    }),
    apiFetch<TownBoardApiItem[]>(listUrl(endpoints.townBoardList, locale), {
      revalidate: 120,
      tags: [cacheTags.townBoardList],
    }),
  ]);

  const featuredDirectory = directory.filter((item) => item.isFeatured);

  return {
    featuredAds: take(mapAds(ads, locale), 4),
    featuredDirectory: take(
      mapDirectory(featuredDirectory.length > 0 ? featuredDirectory : directory, locale),
      6
    ),
    latestNews: take(mapNews(news, locale), 4),
    latestJobs: take(mapJobs(jobs, locale), 4),
    latestBusinessSale: take(mapBusinessSale(businessSale, locale), 4),
    latestLoan: take(mapLoan(loan, locale), 4),
    latestMarketplace: take(mapMarketplace(marketplace, locale), 4),
    latestRealEstate: take(mapRealEstate(realEstate, locale), 4),
    latestCars: take(mapCars(cars, locale), 4),
    latestTownBoard: take(mapTownBoard(townBoard, locale), 4),
  };
}
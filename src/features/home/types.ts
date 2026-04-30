import type { AdItem } from "@/features/ads/types/ad";

export type HomeLocale = "ko" | "en";

export type HomeCardItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  publishedAt?: string | null;
  href: string;
  meta?: string | null;
};

export type HomeData = {
  featuredAds: AdItem[];
  featuredDirectory: HomeCardItem[];
  latestNews: HomeCardItem[];
  latestJobs: HomeCardItem[];
  latestBusinessSale: HomeCardItem[];
  latestLoan: HomeCardItem[];
  latestMarketplace: HomeCardItem[];
  latestRealEstate: HomeCardItem[];
  latestCars: HomeCardItem[];
  latestTownBoard: HomeCardItem[];
};
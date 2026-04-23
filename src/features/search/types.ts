import type { AdItem } from "@/features/ads/types";
import type { BusinessPage } from "@/features/business/types";
import type { BusinessSaleItem } from "@/features/business-sale/types";
import type { CarItem } from "@/features/cars/types";
import type { DirectoryItem } from "@/features/directory/types";
import type { JobItem } from "@/features/jobs/types";
import type { LoanItem } from "@/features/loan/types";
import type { MarketplaceItem } from "@/features/marketplace/types";
import type { RealEstateItem } from "@/features/real-estate/types";
import type { TownBoardItem } from "@/features/town-board/types";

export type SearchResultItem =
  | {
      type: "directory";
      item: DirectoryItem;
    }
  | {
      type: "ad";
      item: AdItem;
    }
  | {
      type: "business";
      item: BusinessPage;
    }
  | {
      type: "news";
      item: {
        id: number;
        slug: string;
        title: string;
        excerpt?: string | null;
      };
    }
  | {
      type: "jobs";
      item: JobItem;
    }
  | {
      type: "marketplace";
      item: MarketplaceItem;
    }
  | {
      type: "real-estate";
      item: RealEstateItem;
    }
  | {
      type: "cars";
      item: CarItem;
    }
  | {
      type: "town-board";
      item: TownBoardItem;
    }
  | {
      type: "business-sale";
      item: BusinessSaleItem;
    }
  | {
      type: "loan";
      item: LoanItem;
    };

export type SearchResponse = {
  q: string;
  total: number;
  results: SearchResultItem[];
};

export type ListingSearchFilters = {
  q: string;
  featured: boolean;
  region: string;
  priceMin: string;
  priceMax: string;
  page: number;
};

export type ListingSearchDomain =
  | 'business-sale'
  | 'jobs'
  | 'marketplace'
  | 'real-estate'
  | 'cars'
  | 'loan';

export type ListingSearchParamsInput = {
  [key: string]: string | string[] | undefined;
};

export type PaginatedListResponse<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};
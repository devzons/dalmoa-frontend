export type MarketplaceItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  priceLabel?: string | null;
  itemCondition?: string | null;
  itemLocation?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactUrl?: string | null;
  publishedAt?: string | null;
  isFeatured?: boolean;
};
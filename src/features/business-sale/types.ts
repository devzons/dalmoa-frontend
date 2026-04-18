export type BusinessSaleItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  priceLabel?: string | null;
  businessCategory?: string | null;
  location?: string | null;
  monthlyRevenue?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactUrl?: string | null;
  publishedAt?: string | null;
  isFeatured?: boolean;
};
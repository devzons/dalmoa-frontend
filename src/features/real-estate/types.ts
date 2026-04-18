export type RealEstateItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  listingType?: string | null;
  propertyType?: string | null;
  priceLabel?: string | null;
  bedrooms?: string | null;
  bathrooms?: string | null;
  propertyLocation?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactUrl?: string | null;
  publishedAt?: string | null;
  isFeatured?: boolean;
};
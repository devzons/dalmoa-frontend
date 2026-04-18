export type CarItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  priceLabel?: string | null;
  carYear?: string | null;
  carMake?: string | null;
  carModel?: string | null;
  mileageLabel?: string | null;
  carLocation?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactUrl?: string | null;
  publishedAt?: string | null;
  isFeatured?: boolean;
};
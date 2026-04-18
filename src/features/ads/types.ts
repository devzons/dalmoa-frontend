export type AdItem = {
  id: number;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  isExternal?: boolean;
  region?: string | null;
};

export type AdsResponse = {
  featured: AdItem[];
  standard: AdItem[];
};
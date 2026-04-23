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

export type AdPlacement = 'top' | 'inline' | 'bottom' | 'sidebar';

export type AdSectionItem = {
  id: string;
  title: string;
  placement: AdPlacement;
  items: AdItem[];
};
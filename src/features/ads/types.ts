export type AdItem = {
  id: number;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  isExternal?: boolean;
  region?: string | null;

  // 🔴 PAYMENT / SUBSCRIPTION
  is_active?: boolean;
  is_paid?: boolean;
  is_featured?: boolean;
  priority_score?: number;

  payment_status?: string;

  billing_type?: "one_time" | "subscription";

  subscription_status?: string;
  subscription_cancel_at_period_end?: "0" | "1";

  ad_ends_at?: string;
  expires_at?: string;
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
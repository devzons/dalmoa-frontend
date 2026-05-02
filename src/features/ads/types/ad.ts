import type { AdPlanType } from "@/features/ads/types/adPlan";

export type AdStatus = "draft" | "active" | "expired" | "inactive";

export type AdPriority = "basic" | "featured" | "premium";

export type AdAbTest = {
  enabled: boolean;
  variantId?: string;
  strategy?: "weighted" | "auto_ctr";
};

export type AdItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  region?: string | null;

  adPlan?: AdPlanType | null;

  status?: AdStatus | null;
  priority?: AdPriority | null;

  viewCount?: number;
  impressionCount?: number;
  clickCount?: number;

  createdAt?: string;
  startsAt?: string | null;
  endsAt?: string | null;

  abTest?: AdAbTest | null;
};
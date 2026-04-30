export type AdPlanType =
  | "basic"
  | "featured"
  | "featured_monthly"
  | "premium"
  | "premium_monthly";

export type AdPlan = {
  key: AdPlanType;
  label: string;
  description?: string;
  price: number;
  durationDays?: number;
  isSubscription?: boolean;
};
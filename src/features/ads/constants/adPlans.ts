import type { AdPlan, AdPlanType } from "@/features/ads/types/adPlan";

export const AD_PLANS: Record<AdPlanType, AdPlan> = {
  basic: {
    key: "basic",
    label: "Basic",
    description: "Standard listing with minimal exposure",
    price: 0,
    durationDays: 30,
    isSubscription: false,
  },

  featured: {
    key: "featured",
    label: "Featured",
    description: "Highlighted listing with better visibility",
    price: 29,
    durationDays: 7,
    isSubscription: false,
  },

  featured_monthly: {
    key: "featured_monthly",
    label: "Featured (Monthly)",
    description: "Featured placement renewed monthly",
    price: 79,
    durationDays: 30,
    isSubscription: true,
  },

  premium: {
    key: "premium",
    label: "Premium",
    description: "Top priority placement across sections",
    price: 59,
    durationDays: 7,
    isSubscription: false,
  },

  premium_monthly: {
    key: "premium_monthly",
    label: "Premium (Monthly)",
    description: "Premium placement renewed monthly",
    price: 149,
    durationDays: 30,
    isSubscription: true,
  },
};
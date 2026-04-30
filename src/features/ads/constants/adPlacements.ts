import type { AdPlacement } from "../types/adPlacement";

export const AD_PLACEMENTS: AdPlacement[] = [
  "list",
  "featured",
  "top",
  "sidebar",
  "inline",
];

export const isValidPlacement = (placement: string): placement is AdPlacement => {
  return AD_PLACEMENTS.includes(placement as AdPlacement);
};
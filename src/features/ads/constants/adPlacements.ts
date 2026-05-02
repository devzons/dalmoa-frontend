import type { AdPlacement } from "@/features/ads/types/adPlacement";

export const AD_PLACEMENTS: AdPlacement[] = [
  "home_top",
  "home_middle",
  "home_bottom",
  "listing_top",
  "listing_middle",
  "listing_bottom",
  "detail_sidebar",
  "sidebar_right",
  "search_top",
  "search_middle",
];

export const AD_PLACEMENT_LABELS: Record<AdPlacement, string> = {
  home_top: "Home Top",
  home_middle: "Home Middle",
  home_bottom: "Home Bottom",
  listing_top: "Listing Top",
  listing_middle: "Listing Middle",
  listing_bottom: "Listing Bottom",
  detail_sidebar: "Detail Sidebar",
  sidebar_right: "Sidebar Right",
  search_top: "Search Top",
  search_middle: "Search Middle",
};
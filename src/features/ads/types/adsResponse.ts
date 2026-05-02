import type { AdItem } from "./ad";

export type AdsResponse = {
  featured: AdItem[];
  standard: AdItem[];
  sidebar: AdItem | null;
  sidebars: AdItem[]; 
};
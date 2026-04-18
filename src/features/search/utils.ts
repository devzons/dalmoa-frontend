import type { SearchResponse } from "@/features/search/types";

export function normalizeSearchQuery(value?: string) {
  return (value ?? "").trim();
}

export function groupSearchResults(data: SearchResponse) {
  return {
    directories: data.results.filter((result) => result.type === "directory"),
    ads: data.results.filter((result) => result.type === "ad"),
    businesses: data.results.filter((result) => result.type === "business"),
    news: data.results.filter((result) => result.type === "news"),
    jobs: data.results.filter((result) => result.type === "jobs"),
    marketplace: data.results.filter((result) => result.type === "marketplace"),
    realEstate: data.results.filter((result) => result.type === "real-estate"),
    cars: data.results.filter((result) => result.type === "cars"),
    townBoard: data.results.filter((result) => result.type === "town-board"),
    businessSale: data.results.filter((result) => result.type === "business-sale"),
    loan: data.results.filter((result) => result.type === "loan"),
  };
}
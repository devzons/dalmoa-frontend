export const routeKeys = {
  home: "",
  directory: "directory",
  ads: "ads",
  business: "business",
  news: "news",
  marketplace: "marketplace",
  jobs: "jobs",
  realEstate: "real-estate",
  cars: "cars",
  townBoard: "town-board",
  search: "search",
} as const;

export function withLocale(locale: "ko" | "en", path: string) {
  return path ? `/${locale}/${path}` : `/${locale}`;
}
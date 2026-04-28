export const cacheTags = {
  directoryList: "directory-list",
  directoryDetail: (slug: string) => `directory-${slug}`,

  adsList: "ads-list",
  adsFeatured: "ads-featured",
  adsDetail: (slug: string) => `ads-${slug}`,

  businessList: "business-list",
  businessDetail: (slug: string) => `business-${slug}`,

  newsList: "news-list",
  newsDetail: (slug: string) => `news-${slug}`,

  jobsList: "jobs-list",
  jobsDetail: (slug: string) => `jobs-${slug}`,

  marketplaceList: "marketplace-list",
  marketplaceDetail: (slug: string) => `marketplace-${slug}`,

  realEstateList: "real-estate-list",
  realEstateDetail: (slug: string) => `real-estate-${slug}`,

  carsList: "cars-list",
  carsDetail: (slug: string) => `cars-${slug}`,

  townBoardList: "town-board-list",
  townBoardDetail: (slug: string) => `town-board-${slug}`,

  businessSaleList: "business-sale-list",
  businessSaleDetail: (slug: string) => `business-sale-${slug}`,

  loanList: "loan-list",
  loanDetail: (slug: string) => `loan-${slug}`,
} as const;
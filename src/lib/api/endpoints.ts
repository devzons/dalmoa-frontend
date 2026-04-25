export const endpoints = {
  directoryList: "/directory",
  directoryDetail: (slug: string) => `/directory/${slug}`,

  adsList: "/ads",
  adsFeatured: "/ads/featured",

  businessDetail: (slug: string) => `/business-page/${slug}`,

  businessSaleList: "/business-sale",
  businessSaleDetail: (slug: string) => `/business-sale/${slug}`,

  newsList: "/news",
  newsDetail: (slug: string) => `/news/${slug}`,

  jobsList: "/jobs",
  jobsDetail: (slug: string) => `/jobs/${slug}`,

  loanList: "/loan",
  loanDetail: (slug: string) => `/loan/${slug}`,

  marketplaceList: "/marketplace",
  marketplaceDetail: (slug: string) => `/marketplace/${slug}`,

  realEstateList: "/real-estate",
  realEstateDetail: (slug: string) => `/real-estate/${slug}`,

  carsList: "/cars",
  carsDetail: (slug: string) => `/cars/${slug}`,

  townBoardList: "/town-board",
  townBoardDetail: (slug: string) => `/town-board/${slug}`,

  // PAYMENT
  createCheckoutSession: "/payments/create-checkout-session",
  paymentWebhook: "/payments/webhook",
} as const;
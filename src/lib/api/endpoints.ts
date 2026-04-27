export const endpoints = {
  // CORE
  directoryList: "/dalmoa/v1/directory",
  directoryDetail: (slug: string) => `/dalmoa/v1/directory/${slug}`,

  adsList: "/dalmoa/v1/ads",
  adsFeatured: "/dalmoa/v1/ads/featured",
  adsDetail: (slug: string) => `/dalmoa/v1/ads/${slug}`,

  businessDetail: (slug: string) => `/dalmoa/v1/business-page/${slug}`,

  businessSaleList: "/dalmoa/v1/business-sale",
  businessSaleDetail: (slug: string) => `/dalmoa/v1/business-sale/${slug}`,

  newsList: "/dalmoa/v1/news",
  newsDetail: (slug: string) => `/dalmoa/v1/news/${slug}`,

  jobsList: "/dalmoa/v1/jobs",
  jobsDetail: (slug: string) => `/dalmoa/v1/jobs/${slug}`,

  loanList: "/dalmoa/v1/loan",
  loanDetail: (slug: string) => `/dalmoa/v1/loan/${slug}`,

  marketplaceList: "/dalmoa/v1/marketplace",
  marketplaceDetail: (slug: string) => `/dalmoa/v1/marketplace/${slug}`,

  realEstateList: "/dalmoa/v1/real-estate",
  realEstateDetail: (slug: string) => `/dalmoa/v1/real-estate/${slug}`,

  carsList: "/dalmoa/v1/cars",
  carsDetail: (slug: string) => `/dalmoa/v1/cars/${slug}`,

  townBoardList: "/dalmoa/v1/town-board",
  townBoardDetail: (slug: string) => `/dalmoa/v1/town-board/${slug}`,

  // 🔴 PAYMENT
  createCheckoutSession: "/dalmoa/v1/payments/create-checkout-session",
  createSubscriptionSession: "/dalmoa/v1/payments/create-subscription-session",

  cancelSubscription: "/dalmoa/v1/subscriptions/cancel",
  resumeSubscription: "/dalmoa/v1/subscriptions/resume",
  syncSubscription: "/dalmoa/v1/subscriptions/sync",

  paymentWebhook: "/dalmoa/v1/payments/webhook",
} as const;
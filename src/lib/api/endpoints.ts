const API_PREFIX = "/wp-json/dalmoa/v1";

export const endpoints = {
  // CORE
  directoryList: `${API_PREFIX}/directory`,
  directoryDetail: (slug: string) =>
    `${API_PREFIX}/directory/${encodeURIComponent(slug)}`,

  adsList: `${API_PREFIX}/ads`,
  adsFeatured: `${API_PREFIX}/ads/featured`,
  adsDetail: (slug: string) =>
    `${API_PREFIX}/ads/${encodeURIComponent(slug)}`,

  businessList: `${API_PREFIX}/business`,
  businessDetail: (slug: string) =>
    `${API_PREFIX}/business/${encodeURIComponent(slug)}`,

  businessSaleList: `${API_PREFIX}/business-sale`,
  businessSaleDetail: (slug: string) =>
    `${API_PREFIX}/business-sale/${encodeURIComponent(slug)}`,

  newsList: `${API_PREFIX}/news`,
  newsDetail: (slug: string) =>
    `${API_PREFIX}/news/${encodeURIComponent(slug)}`,

  jobsList: `${API_PREFIX}/jobs`,
  jobsDetail: (slug: string) =>
    `${API_PREFIX}/jobs/${encodeURIComponent(slug)}`,

  loanList: `${API_PREFIX}/loan`,
  loanDetail: (slug: string) =>
    `${API_PREFIX}/loan/${encodeURIComponent(slug)}`,

  marketplaceList: `${API_PREFIX}/marketplace`,
  marketplaceDetail: (slug: string) =>
    `${API_PREFIX}/marketplace/${encodeURIComponent(slug)}`,

  realEstateList: `${API_PREFIX}/real-estate`,
  realEstateDetail: (slug: string) =>
    `${API_PREFIX}/real-estate/${encodeURIComponent(slug)}`,

  carsList: `${API_PREFIX}/cars`,
  carsDetail: (slug: string) =>
    `${API_PREFIX}/cars/${encodeURIComponent(slug)}`,

  townBoardList: `${API_PREFIX}/town-board`,
  townBoardDetail: (slug: string) =>
    `${API_PREFIX}/town-board/${encodeURIComponent(slug)}`,

  // 🔴 PAYMENT
  createCheckoutSession: `${API_PREFIX}/payments/create-checkout-session`,
  createSubscriptionSession: `${API_PREFIX}/payments/create-subscription-session`,

  cancelSubscription: `${API_PREFIX}/subscriptions/cancel`,
  resumeSubscription: `${API_PREFIX}/subscriptions/resume`,
  syncSubscription: `${API_PREFIX}/subscriptions/sync`,

  paymentWebhook: `${API_PREFIX}/payments/webhook`,
} as const;
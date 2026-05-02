const API_PREFIX = "";

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export const endpoints = {
  // CORE
  directoryList: `${API_PREFIX}/directory`,
  directoryDetail: (slug: string) =>
    `${API_PREFIX}/directory/${normalizeSlug(slug)}`,

  adsList: `${API_PREFIX}/ads`,
  adsFeatured: `${API_PREFIX}/ads/featured`,
  adsSidebar: `${API_PREFIX}/ads/sidebar`, // ✅ 추가
  adsDetail: (slug: string) =>
    `${API_PREFIX}/ads/${normalizeSlug(slug)}`,

  businessList: `${API_PREFIX}/business`,
  businessDetail: (slug: string) =>
    `${API_PREFIX}/business/${normalizeSlug(slug)}`,

  businessSaleList: `${API_PREFIX}/business-sale`,
  businessSaleDetail: (slug: string) =>
    `${API_PREFIX}/business-sale/${normalizeSlug(slug)}`,

  newsList: `${API_PREFIX}/news`,
  newsDetail: (slug: string) =>
    `${API_PREFIX}/news/${normalizeSlug(slug)}`,

  jobsList: `${API_PREFIX}/jobs`,
  jobsDetail: (slug: string) =>
    `${API_PREFIX}/jobs/${normalizeSlug(slug)}`,

  loanList: `${API_PREFIX}/loan`,
  loanDetail: (slug: string) =>
    `${API_PREFIX}/loan/${normalizeSlug(slug)}`,

  marketplaceList: `${API_PREFIX}/marketplace`,
  marketplaceDetail: (slug: string) =>
    `${API_PREFIX}/marketplace/${normalizeSlug(slug)}`,

  realEstateList: `${API_PREFIX}/real-estate`,
  realEstateDetail: (slug: string) =>
    `${API_PREFIX}/real-estate/${normalizeSlug(slug)}`,

  carsList: `${API_PREFIX}/cars`,
  carsDetail: (slug: string) =>
    `${API_PREFIX}/cars/${normalizeSlug(slug)}`,

  townBoardList: `${API_PREFIX}/town-board`,
  townBoardDetail: (slug: string) =>
    `${API_PREFIX}/town-board/${normalizeSlug(slug)}`,

  // PAYMENT
  createCheckoutSession: `${API_PREFIX}/payments/create-checkout-session`,
  createSubscriptionSession: `${API_PREFIX}/payments/create-subscription-session`,

  cancelSubscription: `${API_PREFIX}/subscriptions/cancel`,
  resumeSubscription: `${API_PREFIX}/subscriptions/resume`,
  syncSubscription: `${API_PREFIX}/subscriptions/sync`,

  paymentWebhook: `${API_PREFIX}/payments/webhook`,
} as const;
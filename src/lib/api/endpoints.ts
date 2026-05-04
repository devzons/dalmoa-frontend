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
  directoryView: (id: number | string) =>
    `${API_PREFIX}/directory/${id}/view`,
  directoryClick: (id: number | string) =>
    `${API_PREFIX}/directory/${id}/click`,

  adsList: `${API_PREFIX}/ads`,
  adsFeatured: `${API_PREFIX}/ads/featured`,
  adsSidebar: `${API_PREFIX}/ads/sidebar`,
  adsDetail: (slug: string) =>
    `${API_PREFIX}/ads/${normalizeSlug(slug)}`,

  businessList: `${API_PREFIX}/business`,
  businessDetail: (slug: string) =>
    `${API_PREFIX}/business/${normalizeSlug(slug)}`,
  businessView: (id: number | string) =>
    `${API_PREFIX}/business/${id}/view`,
  businessClick: (id: number | string) =>
    `${API_PREFIX}/business/${id}/click`,

  businessSaleList: `${API_PREFIX}/business-sale`,
  businessSaleDetail: (slug: string) =>
    `${API_PREFIX}/business-sale/${normalizeSlug(slug)}`,
  businessSaleView: (id: number | string) =>
    `${API_PREFIX}/business-sale/${id}/view`,
  businessSaleClick: (id: number | string) =>
    `${API_PREFIX}/business-sale/${id}/click`,

  newsList: `${API_PREFIX}/news`,
  newsDetail: (slug: string) =>
    `${API_PREFIX}/news/${normalizeSlug(slug)}`,
  newsView: (id: number | string) =>
    `${API_PREFIX}/news/${id}/view`,
  newsClick: (id: number | string) =>
    `${API_PREFIX}/news/${id}/click`,

  jobsList: `${API_PREFIX}/jobs`,
  jobsDetail: (slug: string) =>
    `${API_PREFIX}/jobs/${normalizeSlug(slug)}`,
  jobsView: (id: number | string) =>
    `${API_PREFIX}/jobs/${id}/view`,
  jobsClick: (id: number | string) =>
    `${API_PREFIX}/jobs/${id}/click`,

  loanList: `${API_PREFIX}/loan`,
  loanDetail: (slug: string) =>
    `${API_PREFIX}/loan/${normalizeSlug(slug)}`,
  loanView: (id: number | string) =>
    `${API_PREFIX}/loan/${id}/view`,
  loanClick: (id: number | string) =>
    `${API_PREFIX}/loan/${id}/click`,

  marketplaceList: `${API_PREFIX}/marketplace`,
  marketplaceDetail: (slug: string) =>
    `${API_PREFIX}/marketplace/${normalizeSlug(slug)}`,
  marketplaceView: (id: number | string) =>
    `${API_PREFIX}/marketplace/${id}/view`,
  marketplaceClick: (id: number | string) =>
    `${API_PREFIX}/marketplace/${id}/click`,

  realEstateList: `${API_PREFIX}/real-estate`,
  realEstateDetail: (slug: string) =>
    `${API_PREFIX}/real-estate/${normalizeSlug(slug)}`,
  realEstateView: (id: number | string) =>
    `${API_PREFIX}/real-estate/${id}/view`,
  realEstateClick: (id: number | string) =>
    `${API_PREFIX}/real-estate/${id}/click`,

  carsList: `${API_PREFIX}/cars`,
  carsDetail: (slug: string) =>
    `${API_PREFIX}/cars/${normalizeSlug(slug)}`,
  carsView: (id: number | string) =>
    `${API_PREFIX}/cars/${id}/view`,
  carsClick: (id: number | string) =>
    `${API_PREFIX}/cars/${id}/click`,

  townBoardList: `${API_PREFIX}/town-board`,
  townBoardDetail: (slug: string) =>
    `${API_PREFIX}/town-board/${normalizeSlug(slug)}`,
  townBoardView: (id: number | string) =>
    `${API_PREFIX}/town-board/${id}/view`,
  townBoardClick: (id: number | string) =>
    `${API_PREFIX}/town-board/${id}/click`,

  // PAYMENT
  createCheckoutSession: `${API_PREFIX}/payments/create-checkout-session`,
  createSubscriptionSession: `${API_PREFIX}/payments/create-subscription-session`,

  cancelSubscription: `${API_PREFIX}/subscriptions/cancel`,
  resumeSubscription: `${API_PREFIX}/subscriptions/resume`,
  syncSubscription: `${API_PREFIX}/subscriptions/sync`,

  paymentWebhook: `${API_PREFIX}/payments/webhook`,
} as const;
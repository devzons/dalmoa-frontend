export function injectAdsIntoList<T>({
  listings,
  ads,
  interval = 6,
  maxAds,
}: {
  listings?: T[];
  ads?: T[];
  interval?: number;
  maxAds?: number;
}): T[] {
  const safeListings = Array.isArray(listings) ? listings : [];
  const safeAds = Array.isArray(ads) ? ads : [];

  if (!safeAds.length) return safeListings;

  const safeInterval = Math.max(1, interval);
  const adsToInject = safeAds.slice(0, maxAds ?? safeAds.length);
  const result: T[] = [];

  let adIndex = 0;

  safeListings.forEach((listing, index) => {
    result.push(listing);

    const shouldInjectAd =
      (index + 1) % safeInterval === 0 && adIndex < adsToInject.length;

    if (shouldInjectAd) {
      result.push(adsToInject[adIndex]);
      adIndex += 1;
    }
  });

  return result;
}
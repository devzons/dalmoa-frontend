export function injectAdsIntoList<T>({
  listings,
  ads,
  interval = 6,
  maxAds,
}: {
  listings: T[];
  ads: T[];
  interval?: number;
  maxAds?: number;
}): T[] {
  if (!ads.length) return listings;

  const safeInterval = Math.max(1, interval);
  const adsToInject = ads.slice(0, maxAds ?? ads.length);
  const result: T[] = [];

  let adIndex = 0;

  listings.forEach((listing, index) => {
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
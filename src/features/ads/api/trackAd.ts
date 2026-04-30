export async function trackAd(params: {
  adId: number;
  type: "click" | "impression";
  placement?: string;
  variantId?: string;
}) {
  const body = {
    id: params.adId,
    type: params.type,
    placement: params.placement ?? "unknown",
    variantId: params.variantId ?? "",
  };

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/dalmoa/v1/ads/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}
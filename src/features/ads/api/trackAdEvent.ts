type TrackAdEventType = "impression" | "click";

type TrackAdEventParams = {
  adId: number;
  type: TrackAdEventType;
  placement?: string;
};

export async function trackAdEvent({
  adId,
  type,
  placement,
}: TrackAdEventParams): Promise<void> {
  await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/dalmoa/v1/ads/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adId,
      type,
      placement,
    }),
    cache: "no-store",
  });
}
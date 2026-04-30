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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!baseUrl) return;

  await fetch(`${baseUrl}/dalmoa/v1/ads/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: adId, // 🔥 핵심 수정
      type,
      placement,
    }),
    cache: "no-store",
  });
}
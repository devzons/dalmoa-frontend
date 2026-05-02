type TrackAdEventType = "impression" | "click";

type TrackAdEventParams = {
  adId: number;
  type: TrackAdEventType;
  placement?: string;
  variantId?: string;
};

export async function trackAdEvent({
  adId,
  type,
  placement,
  variantId,
}: TrackAdEventParams): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

  if (!baseUrl || !adId) return;

  try {
    await fetch(`${baseUrl}/ads/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: adId,
        type,
        placement,
        ...(variantId ? { variantId } : {}),
      }),
      keepalive: true,
    });
  } catch (_) {}
}
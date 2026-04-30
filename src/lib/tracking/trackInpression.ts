export async function trackImpression(
  id: number,
  placement: string
) {
  if (!id) return;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
    if (!baseUrl) return;

    await fetch(`${baseUrl}/dalmoa/v1/ads/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        type: "impression",
        placement,
      }),
    });
  } catch {
    // silent fail
  }
}
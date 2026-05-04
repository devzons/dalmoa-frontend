const API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getAdCredits(): Promise<number> {
  if (!API_BASE_URL) {
    return 0;
  }

  const res = await fetch(`${API_BASE_URL}/dalmoa/v1/me/ad-credits`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    return 0;
  }

  const data = (await res.json()) as { adCredits: number };

  return data.adCredits ?? 0;
}
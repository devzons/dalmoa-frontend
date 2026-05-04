const API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function deductAdCredits(postId: number, amount = 1): Promise<number> {
  if (!API_BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const res = await fetch(`${API_BASE_URL}/dalmoa/v1/me/ad-credits/deduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ postId, amount }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "크레딧 사용에 실패했습니다.");
  }

  return data.adCredits ?? 0;
}
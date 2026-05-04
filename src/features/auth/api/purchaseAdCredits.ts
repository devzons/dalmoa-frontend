const API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

type PurchaseInput = {
  priceId: string;
  credits: number;
  successUrl: string;
  cancelUrl: string;
};

export async function purchaseAdCredits(input: PurchaseInput): Promise<string> {
  if (!API_BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const res = await fetch(
    `${API_BASE_URL}/dalmoa/v1/payments/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        priceId: input.priceId,
        credits: input.credits,
        successUrl: input.successUrl,
        cancelUrl: input.cancelUrl,
        purpose: "ad_credits",
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "결제 생성 실패");
  }

  return data.url as string;
}
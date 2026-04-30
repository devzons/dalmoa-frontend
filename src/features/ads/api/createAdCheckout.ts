type CreateAdCheckoutParams = {
  postId: number;
  plan: string;
  locale: "ko" | "en";
};

export async function createAdCheckout({
  postId,
  plan,
  locale,
}: CreateAdCheckoutParams): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/dalmoa/v1/payments/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        plan,
        locale,
      }),
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to create checkout session");
  }

  if (!data?.url) {
    throw new Error("Checkout URL is missing");
  }

  return data.url;
}
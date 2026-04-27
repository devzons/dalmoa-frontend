import { env } from "@/lib/config/env";

export type SubmitCategory =
  | "business-sale"
  | "loan"
  | "marketplace"
  | "real-estate"
  | "cars"
  | "jobs"
  | "ads";

export type CreateListingResponse = {
  id: number;
  slug?: string;
  thumbnailId?: number;
  thumbnailUrl?: string;
  checkoutUrl?: string;
};

export async function createListing(
  category: SubmitCategory,
  formData: FormData
): Promise<CreateListingResponse> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/submit/${category}`, {
    method: "POST",
    body: formData,
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function createAdCheckoutSession({
  postId,
  plan,
}: {
  postId: number;
  plan: "featured" | "premium";
}): Promise<{ url: string }> {
  const formData = new FormData();
  formData.set("postId", String(postId));
  formData.set("plan", plan);

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/payments/create-checkout-session`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Payment request failed: ${response.status}`);
  }

  return response.json();
}
import { env } from "@/lib/config/env";

export type SubmitCategory =
  | "business-sale"
  | "loan"
  | "marketplace"
  | "real-estate"
  | "cars"
  | "jobs";

export async function createListing(
  category: SubmitCategory,
  formData: FormData
): Promise<{ id: number; slug?: string; thumbnailId?: number; thumbnailUrl?: string }> {
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
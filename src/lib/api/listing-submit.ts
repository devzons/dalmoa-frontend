export type SubmitCategory =
  | "business-sale"
  | "loan"
  | "marketplace"
  | "real-estate"
  | "cars"
  | "jobs";

export type ListingCreatePayload = {
  title: string;
  region?: string;
  price?: number | null;
  featured?: boolean;
  description?: string;
};

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  ).replace(/\/$/, "");
}

const endpointMap: Record<SubmitCategory, string> = {
  "business-sale": "/wp-json/dalmoa/v1/business-sales",
  loan: "/wp-json/dalmoa/v1/loans",
  marketplace: "/wp-json/dalmoa/v1/marketplace",
  "real-estate": "/wp-json/dalmoa/v1/real-estate",
  cars: "/wp-json/dalmoa/v1/cars",
  jobs: "/wp-json/dalmoa/v1/jobs",
};

export async function createListing(
  category: SubmitCategory,
  payload: ListingCreatePayload,
) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(`${apiBaseUrl}${endpointMap[category]}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      (data &&
        typeof data === "object" &&
        "message" in data &&
        typeof data.message === "string" &&
        data.message) ||
        "Failed to create item.",
    );
  }

  return data;
}
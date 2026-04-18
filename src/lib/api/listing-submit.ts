import { getAuthorizationHeader } from "@/features/auth/token";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "";
}

export async function createListing(path: string, payload: unknown) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...getAuthorizationHeader(),
  };

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("failed");
  }

  return res.json();
}
import { env } from "@/lib/config/env";

type FetchOptions = RequestInit & {
  revalidate?: number;
  tags?: string[];
};

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = 60, tags = [], ...init } = options;

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    next: {
      revalidate,
      tags,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
import { env } from "@/lib/config/env";

type FetchOptions = RequestInit & {
  revalidate?: number;
  tags?: string[];
};

function normalizeApiUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const base = env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (base.endsWith("/wp-json")) {
    if (cleanPath.startsWith("/wp-json/")) {
      return `${base}${cleanPath.replace(/^\/wp-json/, "")}`;
    }

    return `${base}${cleanPath}`;
  }

  if (cleanPath.startsWith("/wp-json/")) {
    return `${base}${cleanPath}`;
  }

  return `${base}/wp-json${cleanPath}`;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = 60, tags = [], ...init } = options;

  const response = await fetch(normalizeApiUrl(path), {
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
    console.error("API request failed:", {
      status: response.status,
      url: response.url,
      path,
    });

    throw new Error(`API request failed: ${response.status} ${response.url}`);
  }

  return response.json() as Promise<T>;
}

export function normalizeMediaUrl(url?: string | null) {
  if (!url) return null;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const base = env.NEXT_PUBLIC_API_URL
    .replace(/\/wp-json\/?$/, "")
    .replace(/\/+$/, "");

  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}
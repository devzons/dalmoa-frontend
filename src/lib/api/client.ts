export type ApiFetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function apiFetch<T = any>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T | null> {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!rawBaseUrl) {
    return null;
  }

  const baseUrl = rawBaseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;

  const fetchOptions: RequestInit = {
    ...options,
  };

  if (!options.cache && !options.next?.revalidate) {
    fetchOptions.cache = "no-store";
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        const body = await response.text().catch(() => "");

        console.warn("API request failed", {
          status: response.status,
          statusText: response.statusText,
          url,
          body,
        });
      }

      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("API fetch failed", {
        url,
        error,
      });
    }

    return null;
  }
}

export function normalizeMediaUrl(url?: string | null): string | null {
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    return url;
  }

  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}
import { getAuthorizationHeader } from "@/features/auth/token";
import type { MyPostDetail } from "./types";

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  ).replace(/\/$/, "");
}

async function myPageFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...getAuthorizationHeader(),
    ...(init?.headers ?? {}),
  };

  const res = await fetch(`${baseUrl}/wp-json/dalmoa/v1${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data && typeof data === "object" && "message" in data
        ? String(data.message)
        : "Request failed"
    );
  }

  return data as T;
}

export type MyPostItem = {
  id: number;
  title: string;
  type: string;
  status: string;
  slug: string;
  date: string;
};

export async function getMyPosts() {
  return myPageFetch<MyPostItem[]>("/my-posts", {
    method: "GET",
  });
}

export async function getMyPost(id: number | string) {
  return myPageFetch<MyPostDetail>(`/my-posts/${id}`, {
    method: "GET",
  });
}

export async function updateMyPost(
  id: number | string,
  payload: {
    title: string;
    description?: string;
    region?: string;
    price?: number | null;
    featured?: boolean;
  }
) {
  return myPageFetch<MyPostDetail>(`/my-posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteMyPost(id: number | string) {
  return myPageFetch<{ success: boolean; id: number }>(
    `/my-posts/${id}`,
    {
      method: "DELETE",
    }
  );
}
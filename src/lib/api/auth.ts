import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SessionUser = {
  id: number;
  name: string;
  email?: string;
};

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.WORDPRESS_API_URL ||
    ""
  ).replace(/\/$/, "");
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return null;
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const response = await fetch(`${apiBaseUrl}/wp-json/dalmoa/v1/auth/me`, {
      method: "GET",
      headers: cookieHeader
        ? {
            cookie: cookieHeader,
          }
        : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as SessionUser | null;

    if (!data || typeof data.id !== "number") {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export async function requireSessionUser(
  locale: "ko" | "en",
  nextPath: string,
) {
  const user = await getSessionUser();

  if (!user) {
    redirect(`/${locale}/login?next=${encodeURIComponent(nextPath)}`);
  }

  return user;
}
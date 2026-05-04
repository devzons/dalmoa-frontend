import "server-only";

import { cookies } from "next/headers";
import type { User } from "../types/user";

type SessionUserResponse = {
  authenticated: boolean;
  user: User | null;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getSessionUser(): Promise<User | null> {
  if (!API_BASE_URL) {
    return null;
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${API_BASE_URL}/dalmoa/v1/auth/me`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as SessionUserResponse;

  return data.authenticated ? data.user : null;
}
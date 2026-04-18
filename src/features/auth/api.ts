import {
  clearStoredAuthToken,
  getAuthorizationHeader,
  setStoredAuthToken,
} from "@/features/auth/token";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  name: string;
};

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  ).replace(/\/$/, "");
}

async function authFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(`${baseUrl}/wp-json/dalmoa/v1${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data && typeof data === "object" && "message" in data
        ? String(data.message)
        : "Auth request failed"
    );
  }

  return data as T;
}

export async function login(payload: LoginPayload) {
  const data = await authFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  setStoredAuthToken(data.token);
  return data.user;
}

export async function register(payload: RegisterPayload) {
  const data = await authFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  setStoredAuthToken(data.token);
  return data.user;
}

export async function logout() {
  try {
    await authFetch("/auth/logout", { method: "POST" });
  } finally {
    clearStoredAuthToken();
  }
}

export async function getMe() {
  return authFetch<AuthUser>("/auth/me", {
    method: "GET",
  });
}
const AUTH_TOKEN_KEY = "dalmoa_auth_token";

export function getStoredAuthToken(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY) ?? "";
}

export function setStoredAuthToken(token?: string) {
  if (typeof window === "undefined") {
    return;
  }

  if (!token) {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredAuthToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getAuthorizationHeader(): Record<string, string> {
  const token = getStoredAuthToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}
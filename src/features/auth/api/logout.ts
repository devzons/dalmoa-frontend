const API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function logout(): Promise<void> {
  if (!API_BASE_URL) {
    return;
  }

  await fetch(`${API_BASE_URL}/dalmoa/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
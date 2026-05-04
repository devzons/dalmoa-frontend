import type { User } from "../types/user";

type LoginInput = {
  email: string;
  password: string;
  remember?: boolean;
};

type LoginResponse = {
  success: boolean;
  user: User;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function login(input: LoginInput): Promise<User> {
  if (!API_BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const res = await fetch(`${API_BASE_URL}/dalmoa/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "로그인에 실패했습니다.");
  }

  return (data as LoginResponse).user;
}
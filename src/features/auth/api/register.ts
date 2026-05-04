import type { User } from "../types/user";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  success: boolean;
  user: User;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function register(input: RegisterInput): Promise<User> {
  if (!API_BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const res = await fetch(`${API_BASE_URL}/dalmoa/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "회원가입에 실패했습니다.");
  }

  return (data as RegisterResponse).user;
}
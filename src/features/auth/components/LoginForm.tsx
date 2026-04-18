"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/api";

type Props = {
  locale: "ko" | "en";
};

export function LoginForm({ locale }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);

    try {
      await login({
        username: String(formData.get("username") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      window.dispatchEvent(new Event("storage"));
      router.replace(`/${locale}`);
      router.refresh();
    } catch {
      setError(locale === "en" ? "Login failed" : "로그인에 실패했습니다.");
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <input
        name="username"
        placeholder={locale === "en" ? "username" : "아이디"}
        className="w-full rounded-xl border border-neutral-300 p-3"
      />
      <input
        name="password"
        type="password"
        placeholder={locale === "en" ? "password" : "비밀번호"}
        className="w-full rounded-xl border border-neutral-300 p-3"
      />

      {error ? <div className="text-sm text-red-500">{error}</div> : null}

      <button className="rounded-xl bg-black px-4 py-2 text-white">
        {loading ? "..." : locale === "en" ? "Login" : "로그인"}
      </button>
    </form>
  );
}
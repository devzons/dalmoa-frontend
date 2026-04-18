"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/features/auth/api";

type Props = {
  locale: "ko" | "en";
};

export function RegisterForm({ locale }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");

    try {
      await register({
        username: String(formData.get("username") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        name: String(formData.get("name") ?? ""),
      });

      window.dispatchEvent(new Event("storage"));
      router.replace(`/${locale}`);
      router.refresh();
    } catch {
      setError(locale === "en" ? "Register failed" : "회원가입에 실패했습니다.");
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <input
        name="username"
        placeholder="username"
        className="w-full rounded-xl border border-neutral-300 p-3"
      />
      <input
        name="email"
        placeholder="email"
        className="w-full rounded-xl border border-neutral-300 p-3"
      />
      <input
        name="name"
        placeholder="name"
        className="w-full rounded-xl border border-neutral-300 p-3"
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        className="w-full rounded-xl border border-neutral-300 p-3"
      />

      {error ? <div className="text-sm text-red-500">{error}</div> : null}

      <button className="rounded-xl bg-black px-4 py-2 text-white">
        {locale === "en" ? "Register" : "회원가입"}
      </button>
    </form>
  );
}
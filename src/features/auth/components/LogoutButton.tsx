"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/api";

export function LogoutButton({ locale }: { locale: "ko" | "en" }) {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    window.dispatchEvent(new Event("storage"));
    router.replace(`/${locale}`);
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
    >
      {locale === "en" ? "Logout" : "로그아웃"}
    </button>
  );
}
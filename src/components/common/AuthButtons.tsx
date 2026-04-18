"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMe, type AuthUser } from "@/features/auth/api";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

type Props = {
  locale: "ko" | "en";
};

export function AuthButtons({ locale }: Props) {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const me = await getMe();

        if (mounted) {
          setUser(me);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    };

    loadUser();

    const handleStorage = () => {
      loadUser();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      mounted = false;
      window.removeEventListener("storage", handleStorage);
    };
  }, [pathname]);

  if (!ready) {
    return <div className="h-10 w-[180px]" />;
  }

  if (user) {
    return (
      <div className="flex gap-2">
        <Link
          href={`/${locale}/mypage`}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
        >
          {locale === "en" ? "My Page" : "마이페이지"}
        </Link>

        <LogoutButton locale={locale} />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Link
        href={`/${locale}/login`}
        className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
      >
        {locale === "en" ? "Login" : "로그인"}
      </Link>

      <Link
        href={`/${locale}/register`}
        className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white transition hover:opacity-90"
      >
        {locale === "en" ? "Register" : "회원가입"}
      </Link>
    </div>
  );
}
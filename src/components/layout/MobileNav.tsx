"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMe, logout, type AuthUser } from "@/features/auth/api";

type Props = {
  locale: string;
};

export function MobileNav({ locale }: Props) {
  const normalizedLocale: "ko" | "en" = locale === "en" ? "en" : "ko";
  const [open, setOpen] = useState(false);
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
  }, []);

  const navItems = [
    {
      href: `/${normalizedLocale}/directory`,
      label: normalizedLocale === "en" ? "Directory" : "업소록",
    },
    {
      href: `/${normalizedLocale}/jobs`,
      label: normalizedLocale === "en" ? "Jobs" : "구인구직",
    },
    {
      href: `/${normalizedLocale}/business-sale`,
      label: normalizedLocale === "en" ? "Business Sale" : "사업체매매",
    },
    {
      href: `/${normalizedLocale}/loan`,
      label: normalizedLocale === "en" ? "Loan" : "융자",
    },
    {
      href: `/${normalizedLocale}/marketplace`,
      label: normalizedLocale === "en" ? "Marketplace" : "사고팔기",
    },
    {
      href: `/${normalizedLocale}/real-estate`,
      label: normalizedLocale === "en" ? "Real Estate" : "부동산",
    },
    {
      href: `/${normalizedLocale}/cars`,
      label: normalizedLocale === "en" ? "Cars" : "자동차",
    },
    {
      href: `/${normalizedLocale}/town-board`,
      label: normalizedLocale === "en" ? "Town Board" : "타운게시판",
    },
    {
      href: `/${normalizedLocale}/news`,
      label: normalizedLocale === "en" ? "News" : "뉴스",
    },
  ];

  const handleLogout = async () => {
    await logout();
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    setOpen(false);
    window.location.href = `/${normalizedLocale}`;
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700"
      >
        {normalizedLocale === "en" ? "Menu" : "메뉴"}
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-3 w-full border-t border-neutral-200 bg-white shadow-lg">
          <div className="flex flex-col px-4 py-4">
            {ready ? (
              user ? (
                <>
                  <Link
                    href={`/${normalizedLocale}/mypage`}
                    onClick={() => setOpen(false)}
                    className="border-b border-neutral-100 py-3 text-sm font-medium text-neutral-700"
                  >
                    {normalizedLocale === "en" ? "My Page" : "마이페이지"}
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="border-b border-neutral-100 py-3 text-left text-sm font-medium text-neutral-700"
                  >
                    {normalizedLocale === "en" ? "Logout" : "로그아웃"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={`/${normalizedLocale}/login`}
                    onClick={() => setOpen(false)}
                    className="border-b border-neutral-100 py-3 text-sm font-medium text-neutral-700"
                  >
                    {normalizedLocale === "en" ? "Login" : "로그인"}
                  </Link>

                  <Link
                    href={`/${normalizedLocale}/register`}
                    onClick={() => setOpen(false)}
                    className="border-b border-neutral-100 py-3 text-sm font-medium text-neutral-700"
                  >
                    {normalizedLocale === "en" ? "Register" : "회원가입"}
                  </Link>
                </>
              )
            ) : null}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-neutral-100 py-3 text-sm font-medium text-neutral-700 last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
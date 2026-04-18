"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  locale: string;
};

export function MobileNav({ locale }: Props) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: `/${locale}/directory`, label: locale === "en" ? "Directory" : "업소록" },
    { href: `/${locale}/jobs`, label: locale === "en" ? "Jobs" : "구인구직" },
    { href: `/${locale}/business-sale`, label: locale === "en" ? "Business Sale" : "사업체매매" },
    { href: `/${locale}/loan`, label: locale === "en" ? "Loan" : "융자" },
    { href: `/${locale}/marketplace`, label: locale === "en" ? "Marketplace" : "사고팔기" },
    { href: `/${locale}/real-estate`, label: locale === "en" ? "Real Estate" : "부동산" },
    { href: `/${locale}/cars`, label: locale === "en" ? "Cars" : "자동차" },
    { href: `/${locale}/town-board`, label: locale === "en" ? "Town Board" : "타운게시판" },
    { href: `/${locale}/news`, label: locale === "en" ? "News" : "뉴스" },
  ];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700"
      >
        {locale === "en" ? "Menu" : "메뉴"}
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-3 w-full border-t border-neutral-200 bg-white shadow-lg">
          <div className="flex flex-col px-4 py-4">
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
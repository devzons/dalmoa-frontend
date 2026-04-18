"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/base/Badge";

function replaceLocale(pathname: string, locale: "ko" | "en") {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  if (segments[0] === "ko" || segments[0] === "en") {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return `/${locale}/${segments.join("/")}`;
}

export function LocaleSwitcher({ locale }: { locale: "ko" | "en" }) {
  const pathname = usePathname();

  const koHref = replaceLocale(pathname, "ko");
  const enHref = replaceLocale(pathname, "en");

  return (
    <div className="flex items-center gap-2">
      <Link href={koHref}>
        <Badge className={locale === "ko" ? "bg-neutral-900 text-white" : ""}>
          KO
        </Badge>
      </Link>
      <Link href={enHref}>
        <Badge className={locale === "en" ? "bg-neutral-900 text-white" : ""}>
          EN
        </Badge>
      </Link>
    </div>
  );
}
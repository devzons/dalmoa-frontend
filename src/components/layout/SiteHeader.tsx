import Link from "next/link";
import { Container } from "@/components/base/Container";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MainNav } from "@/components/layout/MainNav";
import { MobileNav } from "@/components/layout/MobileNav";

type Props = {
  locale: string;
};

export function SiteHeader({ locale }: Props) {
  const normalizedLocale: "ko" | "en" = locale === "en" ? "en" : "ko";

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link href={`/${normalizedLocale}`} className="text-lg font-bold text-neutral-900">
          Dalmoa
        </Link>

        <MainNav locale={normalizedLocale} />

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={normalizedLocale} />
          <MobileNav locale={normalizedLocale} />
        </div>
      </Container>
    </header>
  );
}
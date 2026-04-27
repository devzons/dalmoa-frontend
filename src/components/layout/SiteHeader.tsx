import Link from "next/link";
import { Container } from "@/components/base/Container";
import { AuthButtons } from "@/components/common/AuthButtons";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MainNav } from "@/components/layout/MainNav";
import { MobileNav } from "@/components/layout/MobileNav";
import GlobalSearchBar from "@/features/search/components/GlobalSearchBar";

type Props = {
  locale: string;
};

export function SiteHeader({ locale }: Props) {
  const normalizedLocale: "ko" | "en" = locale === "en" ? "en" : "ko";

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <Container className="flex flex-col gap-3 py-3">

        {/* TOP ROW */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/${normalizedLocale}`}
            className="text-lg font-bold text-neutral-900"
          >
            Dalmoa
          </Link>

          <MainNav locale={normalizedLocale} />

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">

              {/* 🔥 광고 등록 버튼 */}
              <Link
                href={`/${normalizedLocale}/ads/create`}
                className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                {normalizedLocale === "en" ? "Post Ad" : "광고 등록"}
              </Link>

              <LocaleSwitcher locale={normalizedLocale} />
              <AuthButtons locale={normalizedLocale} />
            </div>

            <div className="md:hidden">
              <MobileNav locale={normalizedLocale} />
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div>
          <GlobalSearchBar locale={normalizedLocale} />
        </div>

      </Container>
    </header>
  );
}
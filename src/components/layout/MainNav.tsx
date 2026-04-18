import Link from "next/link";

type Props = {
  locale: string;
};

export function MainNav({ locale }: Props) {
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
    <nav className="hidden items-center gap-6 lg:flex">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
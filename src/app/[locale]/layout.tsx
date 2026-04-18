import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const locales = ["ko", "en"] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : locale === "ko" ? "ko" : null;

  if (!normalizedLocale || !locales.includes(normalizedLocale)) {
    notFound();
  }

  return (
    <>
      <SiteHeader locale={normalizedLocale} />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
import Link from "next/link";
import { Container } from "@/components/base/Container";
import type { HomeLocale } from "@/features/home/types";

export function HomeHero({ locale }: { locale: HomeLocale }) {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <Container className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600">
            {locale === "en" ? "Dallas Korean Community Portal" : "달라스 한인 커뮤니티 포털"}
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {locale === "en"
              ? "Find local businesses, jobs, marketplace posts, and community updates."
              : "업소, 구인구직, 사고팔기, 지역 소식을 한 번에 찾으세요."}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
            {locale === "en"
              ? "A home page connected to real data across directory, ads, news, jobs, marketplace, real estate, cars, and town board."
              : "업소록, 광고, 뉴스, 구인구직, 사고팔기, 부동산, 자동차, 타운게시판 데이터를 연결한 메인 화면입니다."}
          </p>

          <form
            action={`/${locale}/search`}
            method="get"
            className="mt-8 flex flex-col gap-3 md:flex-row"
          >
            <input
              type="text"
              name="q"
              placeholder={locale === "en" ? "Search businesses, jobs, cars..." : "업소, 구인구직, 자동차 등을 검색하세요"}
              className="h-12 flex-1 rounded-2xl border border-neutral-300 px-4 text-base outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-500"
            />
            <button
              type="submit"
              className="h-12 rounded-2xl bg-neutral-900 px-6 text-sm font-medium text-white"
            >
              {locale === "en" ? "Search" : "검색"}
            </button>
          </form>

          <div className="mt-8 flex flex-wrap gap-2">
            <Link href={`/${locale}/directory`} className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
              {locale === "en" ? "Directory" : "업소록"}
            </Link>
            <Link href={`/${locale}/jobs`} className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
              {locale === "en" ? "Jobs" : "구인구직"}
            </Link>
            <Link href={`/${locale}/business-sale`} className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
              {locale === "en" ? "Business Sale" : "사업체매매"}
            </Link>
            <Link href={`/${locale}/loan`} className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
              {locale === "en" ? "Loan" : "융자"}
            </Link>
            <Link href={`/${locale}/marketplace`} className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
              {locale === "en" ? "Marketplace" : "사고팔기"}
            </Link>
            <Link href={`/${locale}/real-estate`} className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
              {locale === "en" ? "Real Estate" : "부동산"}
            </Link>
            <Link href={`/${locale}/cars`} className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
              {locale === "en" ? "Cars" : "자동차"}
            </Link>
            <Link href={`/${locale}/town-board`} className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
              {locale === "en" ? "Town Board" : "타운게시판"}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
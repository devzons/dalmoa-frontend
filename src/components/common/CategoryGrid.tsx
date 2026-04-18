import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { withLocale } from "@/constants/routes";

type CategoryItem = {
  key: string;
  title: string;
  description: string;
  href: string;
};

export function CategoryGrid({ locale }: { locale: "ko" | "en" }) {
  const items: CategoryItem[] =
    locale === "en"
      ? [
          {
            key: "directory",
            title: "Directory",
            description: "Browse Korean businesses in Dallas.",
            href: withLocale(locale, "directory"),
          },
          {
            key: "ads",
            title: "Ads",
            description: "Featured and standard advertisements.",
            href: withLocale(locale, "ads"),
          },
          {
            key: "news",
            title: "News",
            description: "Community and local Texas news.",
            href: withLocale(locale, "news"),
          },
          {
            key: "marketplace",
            title: "Marketplace",
            description: "Buy and sell with the community.",
            href: withLocale(locale, "marketplace"),
          },
          {
            key: "jobs",
            title: "Jobs",
            description: "Find local hiring and opportunities.",
            href: withLocale(locale, "jobs"),
          },
          {
            key: "real-estate",
            title: "Real Estate",
            description: "Homes, leases, and property listings.",
            href: withLocale(locale, "real-estate"),
          },
          {
            key: "cars",
            title: "Cars",
            description: "Vehicle listings and automotive posts.",
            href: withLocale(locale, "cars"),
          },
          {
            key: "town-board",
            title: "Town Board",
            description: "General community posts and notices.",
            href: withLocale(locale, "town-board"),
          },
          {
            key: "business-sale",
            title: "Business Sale",
            description: "Businesses for sale and transfer listings.",
            href: withLocale(locale, "business-sale"),
          },
          {
            key: "loan",
            title: "Loan",
            description: "Loan, financing, and mortgage related listings.",
            href: withLocale(locale, "loan"),
          },
        ]
      : [
          {
            key: "directory",
            title: "업소록",
            description: "달라스 한인 업소를 찾으세요.",
            href: withLocale(locale, "directory"),
          },
          {
            key: "ads",
            title: "광고",
            description: "추천 광고와 일반 광고를 확인하세요.",
            href: withLocale(locale, "ads"),
          },
          {
            key: "news",
            title: "뉴스",
            description: "커뮤니티 및 텍사스 뉴스를 확인하세요.",
            href: withLocale(locale, "news"),
          },
          {
            key: "marketplace",
            title: "사고팔기",
            description: "커뮤니티 중고 거래 게시물을 확인하세요.",
            href: withLocale(locale, "marketplace"),
          },
          {
            key: "jobs",
            title: "구인구직",
            description: "지역 채용 정보와 구직 정보를 확인하세요.",
            href: withLocale(locale, "jobs"),
          },
          {
            key: "real-estate",
            title: "부동산",
            description: "매물과 임대 정보를 확인하세요.",
            href: withLocale(locale, "real-estate"),
          },
          {
            key: "cars",
            title: "자동차",
            description: "차량 매물과 자동차 게시물을 확인하세요.",
            href: withLocale(locale, "cars"),
          },
          {
            key: "town-board",
            title: "타운게시판",
            description: "자유 게시물과 공지를 확인하세요.",
            href: withLocale(locale, "town-board"),
          },
          {
            key: "business-sale",
            title: "사업체매매",
            description: "사업체 매매 및 양도 매물을 확인하세요.",
            href: withLocale(locale, "business-sale"),
          },
          {
            key: "loan",
            title: "융자",
            description: "융자 및 금융 상품 정보를 확인하세요.",
            href: withLocale(locale, "loan"),
          },
        ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Link key={item.key} href={item.href} className="block">
          <Card className="h-full transition-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-500">{item.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
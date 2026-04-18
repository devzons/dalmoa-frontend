import { Container } from "@/components/base/Container";
import { TownBoardGrid } from "@/features/town-board/components/TownBoardGrid";
import { getTownBoardItems } from "@/features/town-board/api";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  return buildMetadata({
    title: normalizedLocale === "en" ? "Town Board" : "타운게시판",
    description:
      normalizedLocale === "en"
        ? "Community posts and local notices"
        : "커뮤니티 게시물 및 공지",
    path: `/${normalizedLocale}/town-board`,
  });
}

export const revalidate = 120;

export default async function TownBoardPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";
  const items = await getTownBoardItems(normalizedLocale);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {normalizedLocale === "en" ? "Town Board" : "타운게시판"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Community posts and local notices."
            : "커뮤니티 게시물과 공지를 확인하세요."}
        </p>
      </div>

      <TownBoardGrid items={items} locale={normalizedLocale} />
    </Container>
  );
}
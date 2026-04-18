import { Container } from "@/components/base/Container";
import { getMyPosts } from "@/features/mypage/api";
import { MyPostList } from "@/features/mypage/components/MyPostList";
import { requireSessionUser } from "@/lib/api/auth";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MyPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  // 로그인 필수 (프론트 가드)
  await requireSessionUser(normalizedLocale, `/${normalizedLocale}/login`);

  const posts = await getMyPosts().catch(() => []);

  return (
    <Container className="py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {normalizedLocale === "en" ? "My Page" : "마이페이지"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {normalizedLocale === "en"
            ? "Manage your listings"
            : "내 등록글을 관리하세요"}
        </p>
      </div>

      <MyPostList items={posts} locale={normalizedLocale} />
    </Container>
  );
}
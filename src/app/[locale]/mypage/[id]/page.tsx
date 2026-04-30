import { Container } from "@/components/base/Container";
import { getMyPost } from "@/features/mypage/api";
import { EditPostForm } from "@/features/mypage/components/EditPostForm";
import { requireSessionUser } from "@/lib/api/auth";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function MyPostDetail({ params }: Props) {
  const { locale, id } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  await requireSessionUser();

  const post = await getMyPost(id);

  return (
    <Container className="py-10 space-y-6">
      <h1 className="text-2xl font-bold">
        {normalizedLocale === "en" ? "Edit Listing" : "글 수정"}
      </h1>

      <EditPostForm post={post} locale={normalizedLocale} />
    </Container>
  );
}
"use client";

import { useEffect, useState } from "react";
import { RequireAuth } from "@/features/auth/components/RequireAuth";
import { getMyPosts, type MyPostItem } from "@/features/mypage/api";
import { MyPostList } from "@/features/mypage/components/MyPostList";

export function MyPageClient({ locale }: { locale: "ko" | "en" }) {
  const [items, setItems] = useState<MyPostItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await getMyPosts();

        if (mounted) {
          setItems(data);
        }
      } catch {
        if (mounted) {
          setItems([]);
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <RequireAuth locale={locale}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === "en" ? "My Page" : "마이페이지"}
          </h1>
          <p className="mt-2 text-neutral-500">
            {locale === "en" ? "Manage your listings" : "내 등록글을 관리하세요"}
          </p>
        </div>

        {ready ? <MyPostList items={items} locale={locale} /> : null}
      </div>
    </RequireAuth>
  );
}
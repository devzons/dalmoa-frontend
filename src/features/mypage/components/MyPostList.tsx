"use client";

import Link from "next/link";
import { deleteMyPost } from "@/features/mypage/api";

type Item = {
  id: number;
  title: string;
  type: string;
  status: string;
  slug: string;
  date: string;
};

export function MyPostList({
  items,
  locale,
}: {
  items: Item[];
  locale: "ko" | "en";
}) {
  if (!items.length) {
    return (
      <div className="text-neutral-500">
        {locale === "en" ? "No posts yet." : "등록된 글이 없습니다."}
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (!confirm(locale === "en" ? "Delete?" : "삭제하시겠습니까?")) return;

    await deleteMyPost(id);
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-neutral-200 p-4 flex justify-between items-center"
        >
          <div>
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-neutral-500">
              {item.type} · {item.status}
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/${locale}/mypage/${item.id}`}
              className="px-3 py-1 border rounded text-sm"
            >
              {locale === "en" ? "Edit" : "수정"}
            </Link>

            <button
              onClick={() => handleDelete(item.id)}
              className="px-3 py-1 border rounded text-sm text-red-500"
            >
              {locale === "en" ? "Delete" : "삭제"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
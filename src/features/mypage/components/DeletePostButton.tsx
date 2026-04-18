"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMyPost } from "@/features/mypage/api";

type Props = {
  id: number;
  locale: "ko" | "en";
};

const copy = {
  ko: {
    delete: "삭제",
    deleting: "삭제 중...",
    confirm: "정말 삭제하시겠습니까?",
  },
  en: {
    delete: "Delete",
    deleting: "Deleting...",
    confirm: "Are you sure you want to delete this post?",
  },
} as const;

export function DeletePostButton({ id, locale }: Props) {
  const labels = copy[locale];
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm(labels.confirm)) {
      return;
    }

    startTransition(async () => {
      await deleteMyPost(id);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm text-red-600 underline underline-offset-4 disabled:opacity-60"
    >
      {isPending ? labels.deleting : labels.delete}
    </button>
  );
}
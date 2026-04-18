"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMyPost } from "@/features/mypage/api";
import type { MyPostDetail } from "@/features/mypage/types";

type Props = {
  post: MyPostDetail;
  locale: "ko" | "en";
};

export function EditPostForm({ post, locale }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description ?? "");
  const [region, setRegion] = useState(post.region ?? "");
  const [price, setPrice] = useState(post.price ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await updateMyPost(post.id, {
      title,
      description,
      region,
      price: price ? Number(price) : null,
    });

    router.refresh();
    setLoading(false);
  };

  return (
    <div className="max-w-xl space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-2"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded border p-2"
      />

      <input
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        placeholder="Region"
        className="w-full rounded border p-2"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="w-full rounded border p-2"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="rounded bg-black px-4 py-2 text-white"
      >
        {loading ? "..." : locale === "en" ? "Save" : "저장"}
      </button>
    </div>
  );
}
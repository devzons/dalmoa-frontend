"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  hasNextPage: boolean;
  label?: string;
};

export default function LoadMoreButton({
  currentPage,
  hasNextPage,
  label = "더 보기",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!hasNextPage) return null;

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(currentPage + 1));

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
      >
        {label}
      </button>
    </div>
  );
}
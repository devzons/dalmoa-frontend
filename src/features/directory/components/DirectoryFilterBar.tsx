"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/base/Input";
import { Button } from "@/components/base/Button";
import type { DirectoryCategoryOption } from "@/features/directory/types";

export function DirectoryFilterBar({
  locale,
  categories,
}: {
  locale: "ko" | "en";
  categories: DirectoryCategoryOption[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQ = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentFeatured = searchParams.get("featured") ?? "";

  function submit(formData: FormData) {
    const q = String(formData.get("q") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const featured = String(formData.get("featured") ?? "").trim();

    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (featured) params.set("featured", featured);

    const query = params.toString();
    router.push(`/${locale}/directory${query ? `?${query}` : ""}`);
  }

  function resetFilters() {
    router.push(`/${locale}/directory`);
  }

  return (
    <form
      action={submit}
      className="mb-8 grid gap-3 rounded-3xl border border-neutral-200 bg-white p-4 md:grid-cols-[1.5fr_1fr_auto_auto]"
    >
      <Input
        name="q"
        defaultValue={currentQ}
        placeholder={locale === "en" ? "Search businesses..." : "업소 검색"}
      />

      <select
        name="category"
        defaultValue={currentCategory}
        className="flex h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
      >
        {categories.map((item) => (
          <option key={item.value || "all"} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <select
        name="featured"
        defaultValue={currentFeatured}
        className="flex h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
      >
        <option value="">
          {locale === "en" ? "All Types" : "전체 유형"}
        </option>
        <option value="1">
          {locale === "en" ? "Featured Only" : "추천만"}
        </option>
      </select>

      <div className="flex gap-2">
        <Button type="submit">
          {locale === "en" ? "Apply" : "적용"}
        </Button>
        <Button type="button" variant="outline" onClick={resetFilters}>
          {locale === "en" ? "Reset" : "초기화"}
        </Button>
      </div>
    </form>
  );
}
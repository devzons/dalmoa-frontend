"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/base/Input";
import { Button } from "@/components/base/Button";
import type { DirectoryCategoryOption } from "@/features/directory/types";

export function DirectoryFilterBar({
  locale,
}: {
  locale: "ko" | "en";
  categories?: DirectoryCategoryOption[]; // 이제 사용 안함
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQ = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentFeatured = searchParams.get("featured") ?? "";
  const currentSort = searchParams.get("sort") ?? "";

  const DEFAULT_CATEGORIES: DirectoryCategoryOption[] = [
    { value: "", label: locale === "en" ? "All Categories" : "전체업종" },
    { value: "korean_restaurant", label: "한식" },
    { value: "chinese_restaurant", label: "중식" },
    { value: "japanese_restaurant", label: "일식" },
    { value: "cafe_dessert", label: "카페/디저트" },
    { value: "hair_salon", label: "미용실" },
    { value: "medical_clinic", label: "병원" },
    { value: "dental_clinic", label: "치과" },
    { value: "attorney", label: "변호사" },
    { value: "cpa_tax", label: "회계/세무" },
    { value: "real_estate", label: "부동산" },
    { value: "loan_mortgage", label: "융자/모기지" },
    { value: "insurance", label: "보험" },
    { value: "auto_repair", label: "정비소" },
    { value: "moving", label: "이사" },
    { value: "construction", label: "건축/리모델링" },
    { value: "academy", label: "학원" },
    { value: "church", label: "교회" },
    { value: "grocery_store", label: "마트" },
    { value: "local_services", label: "생활서비스" },
  ];

  function submit(formData: FormData) {
    const q = String(formData.get("q") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const featured = String(formData.get("featured") ?? "").trim();

    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (featured) params.set("featured", featured);
    if (currentSort) params.set("sort", currentSort);

    const query = params.toString();
    router.push(`/${locale}/directory${query ? `?${query}` : ""}`);
  }

  function resetFilters() {
    router.push(`/${locale}/directory`);
  }

  return (
    <form
      action={submit}
      className="mb-5 grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 md:grid-cols-[1.5fr_1fr_auto_auto]"
    >
      <Input
        name="q"
        defaultValue={currentQ}
        placeholder={locale === "en" ? "Search businesses..." : "업소 검색"}
      />

      <select
        name="category"
        defaultValue={currentCategory}
        className="flex h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
      >
        {DEFAULT_CATEGORIES.map((item) => (
          <option key={item.value || "all"} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <select
        name="featured"
        defaultValue={currentFeatured}
        className="flex h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">{locale === "en" ? "All Types" : "전체 유형"}</option>
        <option value="1">{locale === "en" ? "Featured Only" : "추천만"}</option>
      </select>

      <div className="flex gap-2">
        <Button type="submit">{locale === "en" ? "Apply" : "적용"}</Button>
        <Button type="button" variant="outline" onClick={resetFilters}>
          {locale === "en" ? "Reset" : "초기화"}
        </Button>
      </div>
    </form>
  );
}
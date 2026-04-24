"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createListing,
  type SubmitCategory,
} from "@/lib/api/listing-submit";

type Props = {
  locale: "ko" | "en";
  category: SubmitCategory;
};

const copy = {
  ko: {
    title: "제목",
    titlePlaceholder: "제목을 입력하세요",
    region: "지역",
    regionPlaceholder: "예: Dallas, Carrollton",
    price: "가격",
    pricePlaceholder: "숫자만 입력",
    image: "대표 이미지",
    imageHelp: "JPG, PNG, WebP 이미지를 업로드하세요.",
    featured: "추천 등록",
    description: "설명",
    descriptionPlaceholder: "상세 내용을 입력하세요",
    contactName: "연락 담당자",
    contactPhone: "전화번호",
    contactEmail: "이메일",
    submit: "등록 완료",
    submitting: "등록 중...",
    errorDefault: "등록에 실패했습니다.",
  },
  en: {
    title: "Title",
    titlePlaceholder: "Enter title",
    region: "Region",
    regionPlaceholder: "e.g. Dallas, Carrollton",
    price: "Price",
    pricePlaceholder: "Numbers only",
    image: "Featured Image",
    imageHelp: "Upload a JPG, PNG, or WebP image.",
    featured: "Featured",
    description: "Description",
    descriptionPlaceholder: "Enter description",
    contactName: "Contact Name",
    contactPhone: "Phone",
    contactEmail: "Email",
    submit: "Submit",
    submitting: "Submitting...",
    errorDefault: "Failed to create item.",
  },
} as const;

const pathMap: Record<SubmitCategory, string> = {
  "business-sale": "business-sale",
  loan: "loan",
  marketplace: "marketplace",
  "real-estate": "real-estate",
  cars: "cars",
  jobs: "jobs",
};

export function ListingCreateForm({ locale, category }: Props) {
  const labels = copy[locale];
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");

    const title = String(formData.get("title") ?? "").trim();

    if (!title) {
      setError(labels.errorDefault);
      return;
    }

    formData.set("category", category);

    startTransition(async () => {
      try {
        const res = await createListing(category, formData);

        if (res.slug) {
          router.push(`/${locale}/${pathMap[category]}/${encodeURIComponent(res.slug)}`);
        } else {
          router.push(`/${locale}/${pathMap[category]}`);
        }

        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error && err.message
            ? err.message
            : labels.errorDefault,
        );
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-neutral-700">
          {labels.title}
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder={labels.titlePlaceholder}
          className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="region" className="mb-1.5 block text-sm font-medium text-neutral-700">
            {labels.region}
          </label>
          <input
            id="region"
            name="region"
            type="text"
            placeholder={labels.regionPlaceholder}
            className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-neutral-700">
            {labels.price}
          </label>
          <input
            id="price"
            name="price"
            type="text"
            inputMode="numeric"
            placeholder={labels.pricePlaceholder}
            className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-neutral-700">
          {labels.image}
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="block w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
        <p className="mt-1 text-xs text-neutral-500">{labels.imageHelp}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div>
          <label htmlFor="contactName" className="mb-1.5 block text-sm font-medium text-neutral-700">
            {labels.contactName}
          </label>
          <input id="contactName" name="contactName" type="text" className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900" />
        </div>

        <div>
          <label htmlFor="contactPhone" className="mb-1.5 block text-sm font-medium text-neutral-700">
            {labels.contactPhone}
          </label>
          <input id="contactPhone" name="contactPhone" type="tel" className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900" />
        </div>

        <div>
          <label htmlFor="contactEmail" className="mb-1.5 block text-sm font-medium text-neutral-700">
            {labels.contactEmail}
          </label>
          <input id="contactEmail" name="contactEmail" type="email" className="h-11 w-full rounded-xl border border-neutral-300 px-3 text-sm outline-none transition focus:border-neutral-900" />
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
        <input name="featured" type="checkbox" value="1" className="h-4 w-4 rounded border-neutral-300" />
        <span>{labels.featured}</span>
      </label>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-neutral-700">
          {labels.description}
        </label>
        <textarea
          id="description"
          name="description"
          rows={8}
          placeholder={labels.descriptionPlaceholder}
          className="w-full rounded-xl border border-neutral-300 px-3 py-3 text-sm outline-none transition focus:border-neutral-900"
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
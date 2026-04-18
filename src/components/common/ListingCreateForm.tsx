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
    featured: "추천 등록",
    description: "설명",
    descriptionPlaceholder: "상세 내용을 입력하세요",
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
    featured: "Featured",
    description: "Description",
    descriptionPlaceholder: "Enter description",
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

function normalizeNumber(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

export function ListingCreateForm({ locale, category }: Props) {
  const labels = copy[locale];
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");

    const title = String(formData.get("title") ?? "").trim();
    const region = String(formData.get("region") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const featured = formData.get("featured") === "1";
    const price = normalizeNumber(String(formData.get("price") ?? ""));

    if (!title) {
      setError(labels.errorDefault);
      return;
    }

    startTransition(async () => {
      try {
        await createListing(category, {
          title,
          region,
          price,
          featured,
          description,
        });

        router.push(`/${locale}/${pathMap[category]}`);
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
        <label
          htmlFor="title"
          className="mb-1.5 block text-sm font-medium text-neutral-700"
        >
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
          <label
            htmlFor="region"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
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
          <label
            htmlFor="price"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
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
        <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
          <input
            name="featured"
            type="checkbox"
            value="1"
            className="h-4 w-4 rounded border-neutral-300"
          />
          <span>{labels.featured}</span>
        </label>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-neutral-700"
        >
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
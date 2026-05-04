"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  createAdCheckoutSession,
  createListing,
} from "@/lib/api/listing-submit";

type Props = {
  locale: "ko" | "en";
};

const labels = {
  ko: {
    title: "광고 제목",
    excerpt: "광고 설명",
    image: "대표 이미지",
    ctaLabel: "버튼 문구",
    ctaUrl: "버튼 링크",
    region: "지역",
    plan: "광고 상품",
    featured: "추천 광고 14일 - $49",
    premium: "프리미엄 광고 30일 - $99",
    submit: "등록 후 결제하기",
    submitting: "처리 중...",
    error: "광고 등록 또는 결제 생성에 실패했습니다.",
  },
  en: {
    title: "Ad Title",
    excerpt: "Ad Description",
    image: "Featured Image",
    ctaLabel: "Button Label",
    ctaUrl: "Button URL",
    region: "Region",
    plan: "Ad Plan",
    featured: "Featured Ad 14 days - $49",
    premium: "Premium Ad 30 days - $99",
    submit: "Create & Pay",
    submitting: "Processing...",
    error: "Failed to create ad or payment session.",
  },
} as const;

export default function AdCreateAndPayForm({ locale }: Props) {
  const t = labels[locale];
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const targetDomain =
    searchParams.get("target_domain") || searchParams.get("domain") || "all";

  const handleSubmit = async (formData: FormData) => {
    setError("");

    const plan = String(formData.get("plan") || "featured") as
      | "featured"
      | "premium";

    formData.set("category", "ads");
    formData.set("adPlan", plan);
    formData.set("target_domain", targetDomain);

    startTransition(async () => {
      try {
        const created = await createListing("ads", formData);

        const checkout = await createAdCheckoutSession({
          postId: created.id,
          plan,
          target_domain: targetDomain,
        } as any);

        window.location.href = checkout.url;
      } catch (err) {
        console.error(err);
        setError(t.error);
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
    >
      <input type="hidden" name="target_domain" value={targetDomain} />

      <div className="border-b border-neutral-100 px-4 py-3">
        <h2 className="text-base font-bold text-neutral-950">
          {locale === "en" ? "Create Paid Ad" : "유료 광고 등록"}
        </h2>
        <p className="mt-0.5 text-xs text-neutral-500">
          {locale === "en"
            ? "Create your ad and continue to payment."
            : "광고를 등록한 뒤 바로 결제로 이동합니다."}
        </p>
      </div>

      <div className="space-y-4 p-4">
        <Input name="title" label={t.title} required />
        <Textarea name="excerpt" label={t.excerpt} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Input name="ctaLabel" label={t.ctaLabel} />
          <Input name="ctaUrl" label={t.ctaUrl} type="url" />
          <Input name="region" label={t.region} />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-700">
            {t.plan}
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-700">
              <input
                type="radio"
                name="plan"
                value="featured"
                defaultChecked
                className="h-3.5 w-3.5"
              />
              <span>{t.featured}</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
              <input
                type="radio"
                name="plan"
                value="premium"
                className="h-3.5 w-3.5"
              />
              <span>{t.premium}</span>
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-1 block text-xs font-medium text-neutral-700"
          >
            {t.image}
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="block w-full rounded-lg border border-neutral-300 px-3 py-1.5 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-neutral-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
          />
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        ) : null}
      </div>

      <div className="flex justify-end border-t border-neutral-100 bg-neutral-50 px-4 py-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-amber-500 px-4 text-xs font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-xs font-medium text-neutral-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="h-9 w-full rounded-lg border border-neutral-300 bg-white px-3 text-xs outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100"
      />
    </div>
  );
}

function Textarea({ name, label }: { name: string; label: string }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-xs font-medium text-neutral-700"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100"
      />
    </div>
  );
}
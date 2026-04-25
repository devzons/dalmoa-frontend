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

const pathMap: Record<SubmitCategory, string> = {
  "business-sale": "business-sale",
  loan: "loan",
  marketplace: "marketplace",
  "real-estate": "real-estate",
  cars: "cars",
  jobs: "jobs",
};

const labels = {
  ko: {
    title: "제목",
    region: "지역",
    price: "가격",
    image: "대표 이미지",
    imageHelp: "JPG, PNG, WebP 이미지를 업로드하세요.",
    featured: "추천 등록",
    description: "설명",
    contactName: "연락 담당자",
    contactPhone: "전화번호",
    contactEmail: "이메일",
    submit: "등록 완료",
    submitting: "등록 중...",
    errorDefault: "등록에 실패했습니다.",
  },
  en: {
    title: "Title",
    region: "Region",
    price: "Price",
    image: "Featured Image",
    imageHelp: "Upload a JPG, PNG, or WebP image.",
    featured: "Featured",
    description: "Description",
    contactName: "Contact Name",
    contactPhone: "Phone",
    contactEmail: "Email",
    submit: "Submit",
    submitting: "Submitting...",
    errorDefault: "Failed to create item.",
  },
} as const;

const categoryFields: Record<
  SubmitCategory,
  {
    name: string;
    ko: string;
    en: string;
    placeholderKo?: string;
    placeholderEn?: string;
    type?: string;
  }[]
> = {
  jobs: [
    { name: "companyName", ko: "회사명", en: "Company Name" },
    { name: "salaryLabel", ko: "급여", en: "Salary", placeholderKo: "예: 시급 $18", placeholderEn: "e.g. $18/hour" },
    { name: "jobType", ko: "근무 형태", en: "Job Type", placeholderKo: "예: 풀타임", placeholderEn: "e.g. Full-time" },
  ],
  "business-sale": [
    { name: "businessCategory", ko: "업종", en: "Business Category" },
    { name: "salePriceLabel", ko: "매매가", en: "Sale Price", placeholderKo: "예: $250,000", placeholderEn: "e.g. $250,000" },
    { name: "monthlyRevenueLabel", ko: "월매출", en: "Monthly Revenue" },
  ],
  loan: [
    { name: "loanType", ko: "융자 종류", en: "Loan Type" },
    { name: "interestRateLabel", ko: "이자율", en: "Interest Rate" },
    { name: "loanAmountLabel", ko: "대출 가능 금액", en: "Loan Amount" },
  ],
  marketplace: [
    { name: "itemCondition", ko: "상품 상태", en: "Item Condition" },
    { name: "priceLabel", ko: "가격 표시", en: "Price Label", placeholderKo: "예: $100", placeholderEn: "e.g. $100" },
  ],
  "real-estate": [
    { name: "propertyType", ko: "매물 유형", en: "Property Type" },
    { name: "bedrooms", ko: "방 수", en: "Bedrooms", type: "number" },
    { name: "bathrooms", ko: "화장실 수", en: "Bathrooms", type: "number" },
    { name: "sizeLabel", ko: "면적", en: "Size", placeholderKo: "예: 1,200 sqft", placeholderEn: "e.g. 1,200 sqft" },
  ],
  cars: [
    { name: "carMake", ko: "제조사", en: "Make" },
    { name: "carModel", ko: "모델", en: "Model" },
    { name: "carYear", ko: "연식", en: "Year", type: "number" },
    { name: "mileageLabel", ko: "마일리지", en: "Mileage" },
  ],
};

const inputClass =
  "h-9 w-full rounded-lg border border-neutral-300 bg-white px-3 text-xs outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100";

export function ListingCreateForm({ locale, category }: Props) {
  const t = labels[locale];
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");

    const title = String(formData.get("title") ?? "").trim();

    if (!title) {
      setError(t.errorDefault);
      return;
    }

    formData.set("category", category);

    startTransition(async () => {
      try {
        const res = await createListing(category, formData);

        router.push(
          res.slug
            ? `/${locale}/${pathMap[category]}/${encodeURIComponent(res.slug)}`
            : `/${locale}/${pathMap[category]}`
        );

        router.refresh();
      } catch (err) {
        setError(err instanceof Error && err.message ? err.message : t.errorDefault);
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="border-b border-neutral-100 px-4 py-3">
        <h2 className="text-base font-bold text-neutral-950">
          {locale === "en" ? "Create Listing" : "매물 등록"}
        </h2>
        <p className="mt-0.5 text-xs text-neutral-500">
          {locale === "en"
            ? "Fill in the details below."
            : "아래 정보를 입력해 주세요."}
        </p>
      </div>

      <div className="space-y-4 p-4">
        <Input name="title" label={t.title} required />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Input name="region" label={t.region} />
          <Input name="price" label={t.price} inputMode="numeric" />
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categoryFields[category].map((field) => (
            <Input
              key={field.name}
              name={field.name}
              label={locale === "en" ? field.en : field.ko}
              type={field.type ?? "text"}
              placeholder={locale === "en" ? field.placeholderEn : field.placeholderKo}
            />
          ))}
        </div>

        <div>
          <label htmlFor="image" className="mb-1 block text-xs font-medium text-neutral-700">
            {t.image}
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="block w-full rounded-lg border border-neutral-300 px-3 py-1.5 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-neutral-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
          />
          <p className="mt-1 text-[11px] text-neutral-500">{t.imageHelp}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Input name="contactName" label={t.contactName} />
          <Input name="contactPhone" label={t.contactPhone} type="tel" />
          <Input name="contactEmail" label={t.contactEmail} type="email" />
        </div>

        <label className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-700">
          <input name="featured" type="checkbox" value="1" className="h-3.5 w-3.5 rounded border-neutral-300" />
          <span>{t.featured}</span>
        </label>

        <div>
          <label htmlFor="description" className="mb-1 block text-xs font-medium text-neutral-700">
            {t.description}
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100"
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
          className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
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
  placeholder,
  inputMode,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  inputMode?: "numeric";
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs font-medium text-neutral-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        required={required}
        className={inputClass}
      />
    </div>
  );
}
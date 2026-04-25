// app/[locale]/payment/cancel/page.tsx

import Link from "next/link";

type Props = {
  params: {
    locale: "ko" | "en";
  };
};

export default function PaymentCancelPage({ params }: Props) {
  const { locale } = params;

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-4xl">❌</div>

        <h1 className="text-xl font-bold text-neutral-900">
          {locale === "en" ? "Payment Cancelled" : "결제가 취소되었습니다"}
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          {locale === "en"
            ? "You can try again anytime."
            : "언제든지 다시 시도하실 수 있습니다."}
        </p>

        <div className="mt-6 space-y-3">
          <Link
            href={`/${locale}`}
            className="block w-full rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
          >
            {locale === "en" ? "Go Home" : "홈으로 이동"}
          </Link>

          <Link
            href={`/${locale}/ads`}
            className="block w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900"
          >
            {locale === "en" ? "Back to Ads" : "광고 목록으로"}
          </Link>
        </div>
      </div>
    </div>
  );
}
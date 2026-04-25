// app/[locale]/payment/success/page.tsx

import Link from "next/link";

type Props = {
  params: {
    locale: "ko" | "en";
  };
  searchParams: {
    post_id?: string;
    plan?: string;
  };
};

export default function PaymentSuccessPage({ params, searchParams }: Props) {
  const { locale } = params;
  const postId = searchParams.post_id;
  const plan = searchParams.plan;

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-4xl">🎉</div>

        <h1 className="text-xl font-bold text-neutral-900">
          {locale === "en" ? "Payment Successful" : "결제가 완료되었습니다"}
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          {locale === "en"
            ? "Your ad is now active."
            : "광고가 자동으로 활성화되었습니다."}
        </p>

        {plan && (
          <div className="mt-4 text-sm text-neutral-700">
            {locale === "en" ? "Plan" : "상품"}:{" "}
            <strong>{plan.toUpperCase()}</strong>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <Link
            href={`/${locale}`}
            className="block w-full rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
          >
            {locale === "en" ? "Go Home" : "홈으로 이동"}
          </Link>

          {postId && (
            <Link
              href={`/${locale}/ads`}
              className="block w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900"
            >
              {locale === "en" ? "View Ads" : "광고 목록 보기"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
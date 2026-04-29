import Link from "next/link";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    post_id?: string;
    plan?: string;
  }>;
};

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  const normalizedLocale = locale === "en" ? "en" : "ko";
  const postId = resolvedSearchParams.post_id;
  const plan = resolvedSearchParams.plan;

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-4xl">🎉</div>

        <h1 className="text-xl font-bold text-neutral-900">
          {normalizedLocale === "en"
            ? "Payment Successful"
            : "결제가 완료되었습니다"}
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          {normalizedLocale === "en"
            ? "Your ad is now active."
            : "광고가 자동으로 활성화되었습니다."}
        </p>

        {plan ? (
          <div className="mt-4 text-sm text-neutral-700">
            {normalizedLocale === "en" ? "Plan" : "상품"}:{" "}
            <strong>{plan.toUpperCase()}</strong>
          </div>
        ) : null}

        <div className="mt-6 space-y-3">
          <Link
            href={`/${normalizedLocale}`}
            className="block w-full rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
          >
            {normalizedLocale === "en" ? "Go Home" : "홈으로 이동"}
          </Link>

          {postId ? (
            <Link
              href={`/${normalizedLocale}/ads`}
              className="block w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900"
            >
              {normalizedLocale === "en" ? "View Ads" : "광고 목록 보기"}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
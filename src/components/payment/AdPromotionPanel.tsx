"use client";

import { useState } from "react";
import { endpoints } from "@/lib/api/endpoints";
import AdSubscribeButton from "@/components/payment/AdSubscribeButton";

type Plan = "featured" | "premium";

type Props = {
  postId: number;
  locale: "ko" | "en";
  adPlan?: string | null;
  isPaid?: boolean;
  isFeatured?: boolean;
  isAdActive?: boolean;
  enableSubscription?: boolean;
};

export default function AdPromotionPanel({
  postId,
  locale,
  adPlan,
  isPaid = false,
  isFeatured = false,
  isAdActive = false,
  enableSubscription = false,
}: Props) {
  const [loadingPlan, setLoadingPlan] = useState<Plan | null>(null);

  const currentPlan =
    adPlan === "premium" || adPlan === "featured" ? adPlan : null;

  const isPremium = currentPlan === "premium";
  const isFeaturedPlan = currentPlan === "featured";

  async function startCheckout(plan: Plan) {
    if (loadingPlan) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
    if (!baseUrl) return;

    setLoadingPlan(plan);

    try {
      const res = await fetch(`${baseUrl}${endpoints.createCheckoutSession}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, plan, locale }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      alert(
        locale === "en"
          ? "Payment initialization failed."
          : "결제 초기화에 실패했습니다."
      );
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-950">
            {locale === "en" ? "Promote this listing" : "광고 연장 / 업그레이드"}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {locale === "en"
              ? "Increase visibility with paid promotion."
              : "유료 노출 상품으로 게시물을 상단에 노출할 수 있습니다."}
          </p>
        </div>

        {isPremium ? (
          <span className="shrink-0 rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white">
            PREMIUM
          </span>
        ) : null}
      </div>

      {isPremium ? (
        <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-5">
          <h3 className="text-sm font-bold text-neutral-950">
            {locale === "en" ? "Premium Active" : "프리미엄 광고 이용 중"}
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            {locale === "en"
              ? "You already have the highest exposure. Extend to keep it."
              : "현재 최상단 노출 상태입니다. 연장하여 유지할 수 있습니다."}
          </p>

          <div className="mt-4 flex min-h-12 flex-wrap items-center gap-2 border-t border-purple-200 pt-4">
            <button
              type="button"
              onClick={() => startCheckout("premium")}
              disabled={!!loadingPlan}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingPlan === "premium"
                ? locale === "en"
                  ? "Processing..."
                  : "처리 중..."
                : locale === "en"
                  ? "Extend Premium"
                  : "프리미엄 연장"}
            </button>

            {enableSubscription ? (
              <AdSubscribeButton
                postId={postId}
                plan="premium_monthly"
                locale={locale}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-sm font-bold">
              {locale === "en" ? "Featured Listing" : "추천 광고"}
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              {locale === "en"
                ? "Show above regular listings."
                : "일반 게시물보다 상단에 노출됩니다."}
            </p>

            <div className="mt-4 flex min-h-12 flex-wrap items-center gap-2 border-t pt-4">
              <button
                type="button"
                onClick={() => startCheckout("featured")}
                disabled={!!loadingPlan}
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingPlan === "featured"
                  ? locale === "en"
                    ? "Processing..."
                    : "처리 중..."
                  : isFeaturedPlan && isAdActive
                    ? locale === "en"
                      ? "Extend Featured"
                      : "추천 광고 연장"
                    : locale === "en"
                      ? "Promote"
                      : "추천 광고 등록"}
              </button>

              {enableSubscription ? (
                <AdSubscribeButton
                  postId={postId}
                  plan="featured_monthly"
                  locale={locale}
                />
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-purple-200 p-5">
            <h3 className="text-sm font-bold">
              {locale === "en" ? "Premium Listing" : "프리미엄 광고"}
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              {locale === "en"
                ? "Top placement with strong visibility."
                : "최상단 우선 노출 + 강한 강조 효과."}
            </p>

            <div className="mt-4 flex min-h-12 flex-wrap items-center gap-2 border-t pt-4">
              <button
                type="button"
                onClick={() => startCheckout("premium")}
                disabled={!!loadingPlan}
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingPlan === "premium"
                  ? locale === "en"
                    ? "Processing..."
                    : "처리 중..."
                  : locale === "en"
                    ? "Upgrade to Premium"
                    : "프리미엄 광고 등록"}
              </button>

              {enableSubscription ? (
                <AdSubscribeButton
                  postId={postId}
                  plan="premium_monthly"
                  locale={locale}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
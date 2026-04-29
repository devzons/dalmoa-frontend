"use client";

import { useState } from "react";
import { endpoints } from "@/lib/api/endpoints";

type Plan = "featured" | "premium";

type Props = {
  postId: number;
  locale: "ko" | "en";
  adPlan?: string | null;
  isPaid?: boolean;
  isFeatured?: boolean;
  isAdActive?: boolean;
};

export default function AdPromotionPanel({
  postId,
  locale,
  adPlan,
  isPaid = false,
  isFeatured = false,
  isAdActive = false,
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          plan,
          locale,
        }),
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
      {/* 헤더 */}
      <div className="flex items-start justify-between">
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

        {isPremium && (
          <span className="rounded-full bg-premium px-3 py-1 text-xs font-bold text-white">
            PREMIUM
          </span>
        )}
      </div>

      {/* ===================== */}
      {/* 🔥 PREMIUM ACTIVE 상태 */}
      {/* ===================== */}
      {isPremium ? (
        <div className="mt-6 rounded-2xl border border-premium/30 bg-premium-light/40 p-5">
          <h3 className="text-sm font-bold text-neutral-950">
            {locale === "en" ? "Premium Active" : "프리미엄 광고 이용 중"}
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            {locale === "en"
              ? "You already have the highest exposure. Extend to keep it."
              : "현재 최상단 노출 상태입니다. 연장하여 유지할 수 있습니다."}
          </p>

          <div className="mt-4 border-t pt-4">
            <button
              onClick={() => startCheckout("premium")}
              disabled={!!loadingPlan}
              className="rounded-xl bg-premium px-4 py-2 text-sm font-semibold text-white"
            >
              {loadingPlan === "premium"
                ? locale === "en"
                  ? "Processing..."
                  : "처리 중..."
                : locale === "en"
                  ? "Extend Premium"
                  : "프리미엄 연장"}
            </button>
          </div>
        </div>
      ) : (
        /* ===================== */
        /* 🔥 NORMAL / FEATURED 상태 */
        /* ===================== */
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* FEATURED */}
          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-sm font-bold">
              {locale === "en" ? "Featured Listing" : "추천 광고"}
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              {locale === "en"
                ? "Show above regular listings."
                : "일반 게시물보다 상단에 노출됩니다."}
            </p>

            <div className="mt-4 border-t pt-4">
              <button
                onClick={() => startCheckout("featured")}
                disabled={!!loadingPlan}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
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
            </div>
          </div>

          {/* PREMIUM */}
          <div className="rounded-2xl border border-premium/30 p-5">
            <h3 className="text-sm font-bold">
              {locale === "en" ? "Premium Listing" : "프리미엄 광고"}
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              {locale === "en"
                ? "Top placement with strong visibility."
                : "최상단 우선 노출 + 강한 강조 효과."}
            </p>

            <div className="mt-4 border-t pt-4">
              <button
                onClick={() => startCheckout("premium")}
                disabled={!!loadingPlan}
                className="rounded-xl bg-premium px-4 py-2 text-sm font-semibold text-white"
              >
                {loadingPlan === "premium"
                  ? locale === "en"
                    ? "Processing..."
                    : "처리 중..."
                  : locale === "en"
                    ? "Upgrade to Premium"
                    : "프리미엄 광고 등록"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
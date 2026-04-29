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
};

export default function AdUpgradeButton({
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

    if (!baseUrl) {
      alert(locale === "en" ? "API URL is missing." : "API URL이 없습니다.");
      return;
    }

    setLoadingPlan(plan);

    try {
      const res = await fetch(`${baseUrl}${endpoints.createCheckoutSession}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, plan, locale }),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Invalid Stripe response");
    } catch (err) {
      console.error(err);
      alert(
        locale === "en"
          ? "Payment initialization failed."
          : "결제 초기화에 실패했습니다."
      );
    } finally {
      setLoadingPlan(null);
    }
  }

  if (isPremium) {
    return (
      <div className="rounded-2xl border border-premium/30 bg-premium-light/40 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-neutral-950">
            {locale === "en" ? "Premium Listing Active" : "프리미엄 광고 이용 중"}
          </h3>

          <span className="rounded-full bg-premium px-3 py-1 text-xs font-bold text-white">
            PREMIUM
          </span>
        </div>

        <p className="mt-2 text-sm text-neutral-600">
          {locale === "en"
            ? "Extend your Premium promotion to keep top exposure."
            : "프리미엄 광고를 연장하면 최상단 노출을 계속 유지할 수 있습니다."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-premium/20 pt-4">
          <button
            type="button"
            onClick={() => startCheckout("premium")}
            disabled={!!loadingPlan}
            className="inline-flex items-center justify-center rounded-xl bg-premium px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingPlan === "premium"
              ? locale === "en"
                ? "Processing..."
                : "처리 중..."
              : locale === "en"
                ? "Extend Premium"
                : "프리미엄 연장"}
          </button>

          <AdSubscribeButton
            postId={postId}
            plan="premium_monthly"
            locale={locale}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-neutral-950">
            {locale === "en" ? "Featured Listing" : "추천 광고"}
          </h3>

          {isFeaturedPlan ? (
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold text-white">
              FEATURED
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm text-neutral-500">
          {locale === "en"
            ? "Show this listing above regular posts."
            : "이 게시물을 일반 게시물보다 상단에 노출합니다."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-200 pt-4">
          <button
            type="button"
            onClick={() => startCheckout("featured")}
            disabled={!!loadingPlan}
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
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
                  ? "Promote as Featured"
                  : "추천 광고 등록"}
          </button>

          <AdSubscribeButton
            postId={postId}
            plan="featured_monthly"
            locale={locale}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-premium/30 bg-white p-5">
        <h3 className="text-sm font-bold text-neutral-950">
          {locale === "en" ? "Premium Listing" : "프리미엄 광고"}
        </h3>

        <p className="mt-2 text-sm text-neutral-500">
          {locale === "en"
            ? "Get the strongest placement and visual emphasis."
            : "최상단 우선 노출과 강한 시각적 강조를 제공합니다."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-200 pt-4">
          <button
            type="button"
            onClick={() => startCheckout("premium")}
            disabled={!!loadingPlan}
            className="inline-flex items-center justify-center rounded-xl bg-premium px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingPlan === "premium"
              ? locale === "en"
                ? "Processing..."
                : "처리 중..."
              : locale === "en"
                ? "Upgrade to Premium"
                : "프리미엄 광고 등록"}
          </button>

          <AdSubscribeButton
            postId={postId}
            plan="premium_monthly"
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
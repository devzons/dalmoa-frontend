"use client";

import { useState } from "react";
import { endpoints } from "@/lib/api/endpoints";

type Props = {
  postId: number;
  plan: "featured_monthly" | "premium_monthly";
  locale: "ko" | "en";
};

export default function AdSubscribeButton({ postId, plan, locale }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

    if (!baseUrl) {
      alert(locale === "en" ? "API URL missing." : "API URL이 없습니다.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}${endpoints.createSubscriptionSession}`, {
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

      if (!res.ok) {
        throw new Error("Failed to create subscription session");
      }

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Invalid Stripe response");
    } catch (error) {
      console.error(error);
      alert(locale === "en" ? "Subscription failed." : "구독 처리에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const label =
    plan === "premium_monthly"
      ? locale === "en"
        ? "Premium Monthly"
        : "프리미엄 월 구독"
      : locale === "en"
        ? "Featured Monthly"
        : "추천 광고 월 구독";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center justify-center rounded-xl bg-premium px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (locale === "en" ? "Processing..." : "처리 중...") : label}
    </button>
  );
}
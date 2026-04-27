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

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/dalmoa/v1${endpoints.createSubscriptionSession}`, {
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

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      alert(locale === "en" ? "Subscription failed" : "구독 실패");
    } finally {
      setLoading(false);
    }
  };

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
      onClick={handleClick}
      disabled={loading}
      className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white"
    >
      {loading ? "..." : label}
    </button>
  );
}
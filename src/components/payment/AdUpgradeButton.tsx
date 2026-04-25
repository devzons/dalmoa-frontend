"use client";

import { useState } from "react";
import { endpoints } from "@/lib/api/endpoints";

type Props = {
  postId: number;
  plan: "featured" | "premium";
  locale: "ko" | "en";
};

export default function AdUpgradeButton({ postId, plan, locale }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/dalmoa/v1${endpoints.createCheckoutSession}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          plan,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Invalid Stripe response");
      }
    } catch (err) {
      console.error(err);
      alert(
        locale === "en"
          ? "Payment initialization failed."
          : "결제 초기화에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const label =
    plan === "premium"
      ? locale === "en"
        ? "Upgrade to Premium"
        : "프리미엄 광고 등록"
      : locale === "en"
        ? "Upgrade to Featured"
        : "추천 광고 등록";

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={[
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
        plan === "premium"
          ? "bg-amber-500 text-white hover:bg-amber-600"
          : "bg-neutral-900 text-white hover:bg-neutral-800",
        loading ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {loading
        ? locale === "en"
          ? "Processing..."
          : "처리 중..."
        : label}
    </button>
  );
}
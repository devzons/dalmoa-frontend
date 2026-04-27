"use client";

import { useState } from "react";
import {
  cancelSubscription,
  resumeSubscription,
  syncSubscription,
} from "@/features/ads/api";

type Props = {
  postId: number;
  billingType?: string | null;
  subscriptionStatus?: string | null;
  cancelAtPeriodEnd?: "0" | "1" | null;
};

export default function AdSubscriptionActions({
  postId,
  billingType,
  subscriptionStatus,
  cancelAtPeriodEnd,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (billingType !== "subscription") return null;
  if (!subscriptionStatus) return null;

  const isActive = subscriptionStatus === "active" || subscriptionStatus === "trialing";
  const isCancelPending = cancelAtPeriodEnd === "1";
  const isCanceled = subscriptionStatus === "canceled" || subscriptionStatus === "cancelled";

  async function run(action: "cancel" | "resume" | "sync") {
    setLoading(true);

    try {
      if (action === "cancel") {
        await cancelSubscription(postId);
      }

      if (action === "resume") {
        await resumeSubscription(postId);
      }

      if (action === "sync") {
        await syncSubscription(postId);
      }

      window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
        Subscription: {isCancelPending ? "cancel pending" : subscriptionStatus}
      </span>

      {isActive && !isCancelPending && (
        <button
          type="button"
          disabled={loading}
          onClick={() => run("cancel")}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
        >
          Cancel subscription
        </button>
      )}

      {isActive && isCancelPending && (
        <button
          type="button"
          disabled={loading}
          onClick={() => run("resume")}
          className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
        >
          Resume subscription
        </button>
      )}

      {!isCanceled && (
        <button
          type="button"
          disabled={loading}
          onClick={() => run("sync")}
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 disabled:opacity-50"
        >
          Sync
        </button>
      )}
    </div>
  );
}
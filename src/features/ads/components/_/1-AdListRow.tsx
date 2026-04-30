import Link from "next/link";
import type { AdItem } from "@/features/ads/types";
import { getAdHref } from "@/features/ads/utils";
import AdSubscriptionActions from "@/features/ads/components/AdSubscriptionActions";

export function AdListRow({
  item,
  locale,
}: {
  item: AdItem;
  locale: "ko" | "en";
}) {
  const href = getAdHref(item, locale);

  const isPremium =
    item.adPlan === "premium" || item.adPlan === "premium_monthly";

  const isFeatured =
    item.adPlan === "featured" || item.adPlan === "featured_monthly";

  return (
    <div className="border-b border-neutral-200 px-4 py-4 last:border-b-0">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap gap-2">
            {isPremium ? (
              <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
                Premium
              </span>
            ) : null}

            {!isPremium && isFeatured ? (
              <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-white">
                Featured
              </span>
            ) : null}
          </div>

          <div className="truncate font-medium">{item.title}</div>

          {item.excerpt ? (
            <div className="truncate text-sm text-neutral-500">
              {item.excerpt}
            </div>
          ) : null}
        </div>

        <Link
          href={href}
          target={item.isExternal ? "_blank" : "_self"}
          className="text-sm font-medium text-neutral-900 underline"
        >
          {item.ctaLabel || (locale === "en" ? "View" : "보기")}
        </Link>
      </div>

      <AdSubscriptionActions
        postId={item.id}
        billingType={item.billing_type}
        subscriptionStatus={item.subscription_status}
        cancelAtPeriodEnd={item.subscription_cancel_at_period_end}
      />
    </div>
  );
}
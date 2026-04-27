import Link from "next/link";
import { Button } from "@/components/base/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/Card";
import type { AdItem } from "@/features/ads/types";

export function AdCard({
  item,
  locale,
}: {
  item: AdItem;
  locale: "ko" | "en";
}) {
  const href = `/${locale}/ads/${item.slug}`;

  const isPremium =
    item.adPlan === "premium" || item.adPlan === "premium_monthly";

  const isFeatured =
    item.adPlan === "featured" || item.adPlan === "featured_monthly";

  return (
    <Card className="h-full overflow-hidden">
      {item.thumbnailUrl ? (
        <div className="h-52 w-full overflow-hidden bg-neutral-100">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-52 w-full items-center justify-center bg-neutral-100 text-sm text-neutral-400">
          {locale === "en" ? "No image" : "이미지 없음"}
        </div>
      )}

      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          {isPremium ? (
            <span className="rounded-full bg-black px-2.5 py-1 text-xs font-medium text-white">
              Premium
            </span>
          ) : null}

          {!isPremium && isFeatured ? (
            <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-xs font-medium text-white">
              Featured
            </span>
          ) : null}
        </div>

        <CardTitle className="line-clamp-1">{item.title}</CardTitle>

        {item.excerpt ? (
          <CardDescription className="line-clamp-2">
            {item.excerpt}
          </CardDescription>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-4">
        {item.region ? (
          <div className="text-sm text-neutral-500">{item.region}</div>
        ) : null}

        <Link href={href}>
          <Button className="w-full" size="lg">
            {locale === "en" ? "View Details" : "자세히 보기"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
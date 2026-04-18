import Link from "next/link";
import { Button } from "@/components/base/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/Card";
import { SafeImage } from "@/components/common/SafeImage";
import type { AdItem } from "@/features/ads/types";
import { getAdHref, hasAdThumbnail } from "@/features/ads/utils";

export function AdCard({
  item,
  locale,
}: {
  item: AdItem;
  locale: "ko" | "en";
}) {
  const href = getAdHref(item, locale);

  return (
    <Card className="h-full overflow-hidden">
      {hasAdThumbnail(item) ? (
        <SafeImage
          src={item.thumbnailUrl}
          alt={item.title}
          width={1200}
          height={800}
          className="h-52 w-full object-cover"
        />
      ) : null}

      <CardHeader>
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

        <Link href={href} target={item.isExternal ? "_blank" : "_self"}>
          <Button className="w-full" size="lg">
            {item.ctaLabel || (locale === "en" ? "View Details" : "자세히 보기")}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
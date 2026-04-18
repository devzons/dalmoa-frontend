import Link from "next/link";
import { Badge } from "@/components/base/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/Card";
import { SafeImage } from "@/components/common/SafeImage";
import { formatDate } from "@/lib/utils";
import type { NewsItem } from "@/features/news/types";

export function NewsCard({
  item,
  locale,
}: {
  item: NewsItem;
  locale: "ko" | "en";
}) {
  return (
    <Link href={`/${locale}/news/${item.slug}`}>
      <Card className="h-full overflow-hidden transition-transform hover:-translate-y-0.5">
        {item.thumbnailUrl ? (
          <SafeImage
            src={item.thumbnailUrl}
            alt={item.title}
            width={1200}
            height={800}
            className="h-52 w-full object-cover"
          />
        ) : null}

        <CardHeader>
          <div className="mb-3 flex items-center justify-between gap-3">
            {item.isFeatured ? (
              <Badge className="bg-neutral-900 text-white">
                {locale === "en" ? "Featured" : "추천"}
              </Badge>
            ) : <span />}
            {item.publishedAt ? (
              <span className="text-xs text-neutral-500">
                {formatDate(item.publishedAt)}
              </span>
            ) : null}
          </div>

          <CardTitle className="line-clamp-2">{item.title}</CardTitle>

          {item.excerpt ? (
            <CardDescription className="line-clamp-3">
              {item.excerpt}
            </CardDescription>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-2 text-sm text-neutral-600">
          {item.sourceName ? <div>{item.sourceName}</div> : null}
        </CardContent>
      </Card>
    </Link>
  );
}
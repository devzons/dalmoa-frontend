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
import type { DirectoryItem } from "@/features/directory/types";

export function DirectoryCard({
  item,
  locale,
}: {
  item: DirectoryItem;
  locale: "ko" | "en";
}) {
  return (
    <Link href={`/${locale}/directory/${item.slug}`}>
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
            {item.businessCategory ? <Badge>{item.businessCategory}</Badge> : <span />}
            {item.isFeatured ? (
              <Badge className="bg-neutral-900 text-white">추천</Badge>
            ) : null}
          </div>

          <CardTitle className="line-clamp-1">{item.title}</CardTitle>

          {item.excerpt ? (
            <CardDescription className="line-clamp-2">
              {item.excerpt}
            </CardDescription>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-2 text-sm text-neutral-600">
          {item.phone ? <div>전화: {item.phone}</div> : null}
          {item.address ? <div className="line-clamp-1">주소: {item.address}</div> : null}
        </CardContent>
      </Card>
    </Link>
  );
}
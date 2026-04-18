import { Badge } from "@/components/base/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/Card";
import { Container } from "@/components/base/Container";
import { SafeImage } from "@/components/common/SafeImage";
import type { DirectoryItem } from "@/features/directory/types";
import {
  hasDirectoryAddress,
  hasDirectoryContact,
  hasDirectoryContent,
} from "@/features/directory/utils";

export function DirectoryDetail({ item }: { item: DirectoryItem }) {
  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <Card className="overflow-hidden">
          {item.thumbnailUrl ? (
            <SafeImage
              src={item.thumbnailUrl}
              alt={item.title}
              width={1400}
              height={900}
              className="h-[320px] w-full object-cover"
            />
          ) : null}

          <CardHeader>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {item.businessCategory ? <Badge>{item.businessCategory}</Badge> : null}
              {item.isFeatured ? (
                <Badge className="bg-neutral-900 text-white">추천 업소</Badge>
              ) : null}
            </div>

            <CardTitle className="text-3xl">{item.title}</CardTitle>

            {item.excerpt ? (
              <p className="mt-4 text-lg text-neutral-600">{item.excerpt}</p>
            ) : null}
          </CardHeader>

          <CardContent className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3 text-sm text-neutral-700">
              {hasDirectoryContact(item) ? (
                <>
                  {item.phone ? (
                    <div>
                      <strong className="mr-2 text-neutral-900">전화</strong>
                      <span>{item.phone}</span>
                    </div>
                  ) : null}

                  {item.email ? (
                    <div>
                      <strong className="mr-2 text-neutral-900">이메일</strong>
                      <a href={`mailto:${item.email}`} className="underline">
                        {item.email}
                      </a>
                    </div>
                  ) : null}

                  {item.websiteUrl ? (
                    <div>
                      <strong className="mr-2 text-neutral-900">웹사이트</strong>
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all underline"
                      >
                        {item.websiteUrl}
                      </a>
                    </div>
                  ) : null}
                </>
              ) : null}

              {hasDirectoryAddress(item) ? (
                <div>
                  <strong className="mr-2 text-neutral-900">주소</strong>
                  <span>{item.address}</span>
                </div>
              ) : null}
            </div>

            {hasDirectoryContent(item) ? (
              <div className="whitespace-pre-wrap text-sm leading-7 text-neutral-700">
                {item.content}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
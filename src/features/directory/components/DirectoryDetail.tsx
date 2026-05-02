"use client";

import { useEffect } from "react";
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

function normalizeViews(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function DirectoryDetail({ item }: { item: DirectoryItem }) {
  const listing = item as any;

  const viewCount = normalizeViews(
    listing.viewCount ??
      listing.views ??
      listing.view_count ??
      listing.hitCount ??
      0
  );

  useEffect(() => {
    if (!item?.id || !item?.slug) return;

    const key = `viewed-${item.id}`;
    const alreadyViewed = sessionStorage.getItem(key);

    if (alreadyViewed) return;

    sessionStorage.setItem(key, "1");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/directory/${item.slug}/view`, {
      method: "POST",
      cache: "no-store",
    }).catch(() => {});
  }, [item?.id, item?.slug]);

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

          <CardContent className="space-y-6">
            {/* 🔥 조회수 추가 */}
            <div className="flex justify-end text-sm text-neutral-500">
              조회수 {viewCount.toLocaleString()}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
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
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
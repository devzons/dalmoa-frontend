"use client";

import { useEffect } from "react";

export default function ListingViewTracker({
  id,
  slug,
  domain,
}: {
  id?: number | string | null;
  slug: string;
  domain: string;
}) {
  useEffect(() => {
    if (!id || !slug) return;

    const key = `viewed-${domain}-${id}`;
    const alreadyViewed = sessionStorage.getItem(key);

    if (alreadyViewed) return;

    sessionStorage.setItem(key, "1");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${domain}/${slug}/view`, {
      method: "POST",
      cache: "no-store",
    }).catch(() => {});
  }, [id, slug, domain]);

  return null;
}
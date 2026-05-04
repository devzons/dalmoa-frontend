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
    if (!id || !domain) return;

    const key = `viewed-${domain}-${id}`;

    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "1");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${domain}/${id}/view`, {
      method: "POST",
      cache: "no-store",
    }).catch(() => {
      sessionStorage.removeItem(key);
    });
  }, [id, domain]);

  return null;
}
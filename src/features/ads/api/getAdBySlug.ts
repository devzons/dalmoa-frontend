import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export async function getAdBySlug(
  slug: string,
  locale: "ko" | "en"
) {
  const data = await apiFetch<any>(
    `${endpoints.adsDetail(slug)}?lang=${locale}`,
    {
      next: {
        revalidate: 0,
        tags: [`ads-${slug}`],
      },
    }
  );

  return data ?? null;
}
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import { type ListingDomain } from "@/components/listing/listingHref";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  domain: ListingDomain;
};

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

async function getDetailData({
  locale,
  domain,
  slug,
}: {
  locale: "ko" | "en";
  domain: ListingDomain;
  slug: string;
}) {
  const normalizedSlug = normalizeSlug(slug);

  return apiFetch<any>(`/${domain}/${normalizedSlug}?lang=${locale}`);
}

export default async function ListingDetailPage({ params, domain }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  const data = await getDetailData({
    locale: normalizedLocale,
    domain,
    slug,
  });

  if (!data) {
    notFound();
  }

  const title =
    data.title ||
    data.hero?.title ||
    data.businessName ||
    data.companyName ||
    data.name ||
    "Untitled";

  const subtitle =
    data.hero?.subtitle ||
    data.excerpt ||
    data.description ||
    data.address ||
    data.region ||
    data.categoryLabel ||
    data.businessCategory ||
    null;

  const price =
    data.priceLabel ||
    data.salePriceLabel ||
    data.price ||
    data.loanAmount ||
    data.interestRate ||
    null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="border-b border-neutral-200 pb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {domain}
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-950">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-sm text-neutral-500">{subtitle}</p>
        )}

        {price && (
          <p className="mt-4 text-lg font-semibold text-neutral-950">
            {price}
          </p>
        )}

        {(data.createdAt || data.publishedAt) && (
          <p className="mt-3 text-xs text-neutral-400">
            {new Date(
              data.createdAt || data.publishedAt
            ).toLocaleDateString(
              normalizedLocale === "en" ? "en-US" : "ko-KR"
            )}
          </p>
        )}
      </header>

      {data.thumbnailUrl && (
        <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
          <img
            src={data.thumbnailUrl}
            alt={title}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {data.content ? (
        <article
          className="prose mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      ) : (
        <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          {normalizedLocale === "en"
            ? "No content available."
            : "상세 내용이 없습니다."}
        </div>
      )}
    </main>
  );
}
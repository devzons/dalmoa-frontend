import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";
import { type ListingDomain } from "@/components/listing/listingHref";
import { getListings } from "@/features/listing/api";
import { splitFeatured } from "@/features/listing/utils/splitFeatured";

type Props = {
  locale: "ko" | "en";
  domain: ListingDomain;
};

export default async function ListingPage({ locale, domain }: Props) {
  const data = await getListings({
    domain,
    locale,
  });

  const items = data?.items ?? [];
  const { featured, regular } = splitFeatured(items);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {featured.length > 0 && (
        <FeaturedListingGrid
          items={featured as any[]}
          locale={locale}
          domain={domain}
        />
      )}

      {regular.length > 0 && (
        <div className="divide-y rounded-lg border border-neutral-200 bg-white">
          {regular.map((item: any) => (
            <ListingRowItem
              key={item.id ?? item.slug}
              item={item}
              locale={locale}
              domain={domain}
            />
          ))}
        </div>
      )}
    </div>
  );
}
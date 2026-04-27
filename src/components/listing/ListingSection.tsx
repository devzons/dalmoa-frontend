import { Container } from "@/components/base/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";

import FeaturedListingGrid from "@/components/listing/FeaturedListingGrid";
import ListingRowItem from "@/components/listing/ListingRowItem";

import { splitFeatured } from "@/features/listing/utils/splitFeatured";
import { type ListingDomain } from "@/components/listing/listingHref";

type Props = {
  title: string;
  description?: string;

  items: any[];
  locale: "ko" | "en";
  domain: ListingDomain;

  emptyTitle: string;
  emptyDescription?: string;
};

export function ListingSection({
  title,
  description,
  items,
  locale,
  domain,
  emptyTitle,
  emptyDescription,
}: Props) {
  if (!items || items.length === 0) {
    return (
      <Container className="py-10">
        <SectionHeading title={title} description={description} />
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </Container>
    );
  }

  const { featured, regular } = splitFeatured(items);

  return (
    <Container className="py-10">
      <SectionHeading title={title} description={description} />

      <div className="mt-6 space-y-8">
        {/* Featured */}
        {featured.length > 0 && (
          <FeaturedListingGrid
            items={featured}
            locale={locale}
            domain={domain}
          />
        )}

        {/* Regular */}
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
      </div>
    </Container>
  );
}
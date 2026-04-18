import { Container } from "@/components/base/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";

export function ListingSection({
  title,
  description,
  emptyTitle,
  emptyDescription,
}: {
  title: string;
  description?: string;
  emptyTitle: string;
  emptyDescription?: string;
}) {
  return (
    <Container className="py-10">
      <SectionHeading title={title} description={description} />
      <EmptyState title={emptyTitle} description={emptyDescription} />
    </Container>
  );
}
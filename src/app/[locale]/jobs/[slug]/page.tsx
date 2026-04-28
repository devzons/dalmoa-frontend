import ListingDetailPage from "@/features/listing/components/ListingDetailPage";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default function JobDetailPage({ params }: Props) {
  return <ListingDetailPage params={params} domain="jobs" />;
}
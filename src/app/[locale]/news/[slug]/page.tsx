import ListingDetailPage from "@/features/listing/components/ListingDetailPage";

export default function Page({ params }: any) {
  return <ListingDetailPage params={params} domain="news" />;
}
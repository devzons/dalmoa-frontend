export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  sourceName?: string | null;
  sourceUrl?: string | null;
  publishedAt?: string | null;
  isFeatured?: boolean;
};
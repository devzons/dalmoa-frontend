export type TownBoardItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  boardCategory?: string | null;
  authorName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  publishedAt?: string | null;
  isFeatured?: boolean;
};
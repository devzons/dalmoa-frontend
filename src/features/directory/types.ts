export type DirectoryItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;

  businessCategory?: string | null;
  phone?: string | null;
  email?: string | null;
  websiteUrl?: string | null;
  address?: string | null;

  isFeatured?: boolean;
  clickCount?: number;
  viewCount?: number;
};

export type DirectoryQueryParams = {
  q?: string;
  category?: string;
  featured?: boolean;
};

export type DirectoryCategoryOption = {
  label: string;
  value: string;
};
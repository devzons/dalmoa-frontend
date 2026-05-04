export type JobItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  companyName?: string | null;
  jobLocation?: string | null;
  employmentType?: string | null;
  salaryLabel?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  applyUrl?: string | null;
  publishedAt?: string | null;
  isFeatured?: boolean;
  clickCount?: number;
};
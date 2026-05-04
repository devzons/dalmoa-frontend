export type LoanItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;

  loanType?: string | null;
  interestRateLabel?: string | null;
  loanAmountLabel?: string | null;
  location?: string | null;

  contactEmail?: string | null;
  contactPhone?: string | null;
  contactUrl?: string | null;

  publishedAt?: string | null;

  isFeatured?: boolean;
  clickCount?: number;
  viewCount?: number;
};
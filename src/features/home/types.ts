export type HomeCardItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  publishedAt?: string | null;
  href: string;
  meta?: string | null;

  // ✅ 광고/정렬 관련 필드 추가
  adPlan?: string | null;
  adPriority?: number | string | null;
  isAdActive?: boolean | null;

  // ✅ featured 관련 (여러 형태 대응)
  isFeatured?: boolean | number | string | null;
  featured?: boolean | number | string | null;
};
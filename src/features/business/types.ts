export type BusinessServiceItem = {
  title: string;
  body?: string | null;
};

export type BusinessPage = {
  slug: string;
  hero: {
    title: string;
    subtitle?: string | null;
    imageUrl?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
  };
  about?: {
    title?: string | null;
    content?: string | null;
    imageUrl?: string | null;
  };
  services: BusinessServiceItem[];
  contact?: {
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    websiteUrl?: string | null;
  };
};
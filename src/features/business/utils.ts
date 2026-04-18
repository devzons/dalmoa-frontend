import type { BusinessPage } from "@/features/business/types";

export function hasAboutSection(data: BusinessPage) {
  return Boolean(data.about?.title || data.about?.content || data.about?.imageUrl);
}

export function hasServices(data: BusinessPage) {
  return Array.isArray(data.services) && data.services.length > 0;
}

export function hasContactSection(data: BusinessPage) {
  return Boolean(
    data.contact?.phone ||
      data.contact?.email ||
      data.contact?.address ||
      data.contact?.websiteUrl
  );
}
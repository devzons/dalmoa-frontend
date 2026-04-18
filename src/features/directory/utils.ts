import type {
  DirectoryCategoryOption,
  DirectoryItem,
} from "@/features/directory/types";

export function hasDirectoryContact(item: DirectoryItem) {
  return Boolean(item.phone || item.email || item.websiteUrl);
}

export function hasDirectoryAddress(item: DirectoryItem) {
  return Boolean(item.address);
}

export function hasDirectoryContent(item: DirectoryItem) {
  return Boolean(item.content);
}

export function getDirectoryCategories(
  items: DirectoryItem[],
  locale: "ko" | "en"
): DirectoryCategoryOption[] {
  const map = new Map<string, string>();

  items.forEach((item) => {
    if (!item.businessCategory) {
      return;
    }
    map.set(item.businessCategory, item.businessCategory);
  });

  const options = Array.from(map.entries()).map(([value, label]) => ({
    value,
    label,
  }));

  options.sort((a, b) => a.label.localeCompare(b.label));

  return [
    {
      value: "",
      label: locale === "en" ? "All Categories" : "전체 업종",
    },
    ...options,
  ];
}
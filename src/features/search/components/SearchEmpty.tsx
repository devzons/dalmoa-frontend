import { EmptyState } from "@/components/common/EmptyState";

export function SearchEmpty({ locale }: { locale: "ko" | "en" }) {
  return (
    <EmptyState
      title={locale === "en" ? "No search results." : "검색 결과가 없습니다."}
      description={
        locale === "en"
          ? "Try a different keyword."
          : "다른 검색어로 다시 시도해 주세요."
      }
    />
  );
}
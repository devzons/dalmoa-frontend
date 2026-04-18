import { Button } from "@/components/base/Button";

export function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant="outline" onClick={onPrev} disabled={currentPage <= 1}>
        이전
      </Button>
      <span className="text-sm text-neutral-600">
        {currentPage} / {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        다음
      </Button>
    </div>
  );
}
import { cn } from "@/lib/utils";

export function LoadingBlock({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-3xl border border-neutral-200 bg-white p-6",
        className
      )}
    >
      <div className="h-6 w-40 rounded bg-neutral-200" />
      <div className="mt-4 h-4 w-full rounded bg-neutral-200" />
      <div className="mt-2 h-4 w-2/3 rounded bg-neutral-200" />
    </div>
  );
}
import Image from "next/image";
import { cn } from "@/lib/utils";

type SafeImageProps = {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
};

export function SafeImage({
  src,
  alt,
  width = 1200,
  height = 800,
  className,
  wrapperClassName,
}: SafeImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex min-h-[220px] items-center justify-center rounded-3xl bg-neutral-100 text-sm text-neutral-400",
          wrapperClassName
        )}
      >
        이미지 없음
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        unoptimized
      />
    </div>
  );
}
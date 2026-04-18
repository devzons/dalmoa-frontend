"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/base/Input";
import { Button } from "@/components/base/Button";
import { cn } from "@/lib/utils";

export function SearchBar({
  locale,
  size = "default",
}: {
  locale: "ko" | "en";
  size?: "default" | "hero";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQ = searchParams.get("q") ?? "";

  function submit(formData: FormData) {
    const q = String(formData.get("q") ?? "").trim();

    if (!q) {
      router.push(`/${locale}/search`);
      return;
    }

    router.push(`/${locale}/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      action={submit}
      className={cn(
        "grid gap-2",
        size === "hero"
          ? "grid-cols-[1fr_auto]"
          : "grid-cols-[1fr_auto]"
      )}
    >
      <Input
        name="q"
        defaultValue={currentQ}
        placeholder={
          locale === "en"
            ? "Search businesses, ads..."
            : "업소, 광고 검색"
        }
        className={cn(
          size === "hero" ? "h-12 text-base" : "h-10"
        )}
      />

      <Button size={size === "hero" ? "lg" : "default"}>
        {locale === "en" ? "Search" : "검색"}
      </Button>
    </form>
  );
}
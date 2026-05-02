import type { ReactNode } from "react";
import { RightSidebar } from "./RightSidebar";

export function PageWithSidebar({
  locale,
  children,
}: {
  locale: "ko" | "en";
  children: ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <main className="min-w-0">{children}</main>
      <RightSidebar locale={locale} />
    </div>
  );
}
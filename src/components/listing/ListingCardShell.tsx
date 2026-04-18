import { Card } from "@/components/base/Card";
import { cn } from "@/lib/utils";

export function ListingCardShell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "h-full overflow-hidden transition-transform hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </Card>
  );
}
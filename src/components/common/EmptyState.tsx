import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {description ? (
        <CardContent>
          <p className="text-sm text-neutral-500">{description}</p>
        </CardContent>
      ) : null}
    </Card>
  );
}
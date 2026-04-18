import { Button } from "@/components/base/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";

export function ErrorState({
  title = "문제가 발생했습니다",
  description = "잠시 후 다시 시도해 주세요.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-neutral-500">{description}</p>
        {onRetry ? <Button onClick={onRetry}>다시 시도</Button> : null}
      </CardContent>
    </Card>
  );
}
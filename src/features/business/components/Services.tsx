import { Container } from "@/components/base/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { BusinessServiceItem } from "@/features/business/types";

export function Services({ items }: { items: BusinessServiceItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="py-12">
      <Container>
        <SectionHeading
          title="서비스"
          description="비즈니스 페이지에 등록된 주요 서비스입니다."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Card key={`${item.title}-${index}`} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>

              <CardContent>
                {item.body ? (
                  <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-700">
                    {item.body}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
import { Container } from "@/components/base/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import { SafeImage } from "@/components/common/SafeImage";
import type { BusinessPage } from "@/features/business/types";

export function About({ about }: { about?: BusinessPage["about"] }) {
  if (!about || (!about.title && !about.content && !about.imageUrl)) {
    return null;
  }

  return (
    <section className="py-12">
      <Container>
        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            <div>
              <CardHeader>
                {about.title ? <CardTitle className="text-2xl">{about.title}</CardTitle> : null}
              </CardHeader>

              <CardContent>
                {about.content ? (
                  <div className="whitespace-pre-wrap text-sm leading-7 text-neutral-700">
                    {about.content}
                  </div>
                ) : null}
              </CardContent>
            </div>

            {about.imageUrl ? (
              <SafeImage
                src={about.imageUrl}
                alt={about.title || "about image"}
                width={1200}
                height={800}
                className="h-full min-h-[280px] w-full object-cover"
                wrapperClassName="h-full"
              />
            ) : null}
          </div>
        </Card>
      </Container>
    </section>
  );
}
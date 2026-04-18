import { Container } from "@/components/base/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/Card";
import type { BusinessPage } from "@/features/business/types";

export function Contact({ contact }: { contact?: BusinessPage["contact"] }) {
  if (!contact) {
    return null;
  }

  const hasAny =
    contact.phone || contact.email || contact.address || contact.websiteUrl;

  if (!hasAny) {
    return null;
  }

  return (
    <section className="py-12">
      <Container>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">문의 및 안내</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 text-sm text-neutral-700 md:grid-cols-2">
            {contact.phone ? (
              <div>
                <strong className="mr-2 text-neutral-900">전화</strong>
                <span>{contact.phone}</span>
              </div>
            ) : null}

            {contact.email ? (
              <div>
                <strong className="mr-2 text-neutral-900">이메일</strong>
                <a href={`mailto:${contact.email}`} className="underline">
                  {contact.email}
                </a>
              </div>
            ) : null}

            {contact.address ? (
              <div className="md:col-span-2">
                <strong className="mr-2 text-neutral-900">주소</strong>
                <span>{contact.address}</span>
              </div>
            ) : null}

            {contact.websiteUrl ? (
              <div className="md:col-span-2">
                <strong className="mr-2 text-neutral-900">웹사이트</strong>
                <a
                  href={contact.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all underline"
                >
                  {contact.websiteUrl}
                </a>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
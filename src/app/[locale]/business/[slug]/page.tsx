import { notFound } from "next/navigation";
import { About } from "@/features/business/components/About";
import { Contact } from "@/features/business/components/Contact";
import { Hero } from "@/features/business/components/Hero";
import { Services } from "@/features/business/components/Services";
import { getBusinessPageBySlug } from "@/features/business/api";
import {
  hasAboutSection,
  hasContactSection,
  hasServices,
} from "@/features/business/utils";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  try {
    const data = await getBusinessPageBySlug(slug, normalizedLocale);

    return buildMetadata({
      title: data.hero.title,
      description: data.hero.subtitle || `${data.hero.title} 비즈니스 페이지`,
      path: `/${normalizedLocale}/business/${slug}`,
    });
  } catch {
    return buildMetadata({
      title: normalizedLocale === "en" ? "Business Page" : "비즈니스 페이지",
      description:
        normalizedLocale === "en"
          ? "Business detail page"
          : "비즈니스 상세 페이지",
      path: `/${normalizedLocale}/business/${slug}`,
    });
  }
}

export const revalidate = 300;

export default async function BusinessPageDetail({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === "en" ? "en" : "ko";

  let data;

  try {
    data = await getBusinessPageBySlug(slug, normalizedLocale);
  } catch {
    notFound();
  }

  if (!data) {
    notFound();
  }

  const about = hasAboutSection(data) ? data.about : undefined;
  const services = hasServices(data) ? data.services : [];
  const contact = hasContactSection(data) ? data.contact : undefined;

  return (
    <div className="bg-neutral-50">
      <Hero hero={data.hero} />
      {about ? <About about={about} /> : null}
      {services.length > 0 ? <Services items={services} /> : null}
      {contact ? <Contact contact={contact} /> : null}
    </div>
  );
}
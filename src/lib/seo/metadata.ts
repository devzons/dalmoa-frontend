import type { Metadata } from "next";
import { env } from "@/lib/config/env";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path?: string;
};

const SITE_NAME = "Dalmoa";

export function buildMetadata({
  title,
  description,
  path = "",
}: BuildMetadataArgs): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${env.NEXT_PUBLIC_SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
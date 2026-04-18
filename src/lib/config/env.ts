function getEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  NEXT_PUBLIC_API_URL: getEnv(
    "NEXT_PUBLIC_API_URL",
    "http://backend.local/wp-json/dalmoa/v1"
  ),
  NEXT_PUBLIC_SITE_URL: getEnv(
    "NEXT_PUBLIC_SITE_URL",
    "http://frontend.local:3000"
  ),
  NEXT_PUBLIC_DEFAULT_LOCALE: getEnv("NEXT_PUBLIC_DEFAULT_LOCALE", "ko"),
  NEXT_PUBLIC_LOCALES: getEnv("NEXT_PUBLIC_LOCALES", "ko,en"),
  NEXT_PUBLIC_IMAGE_HOST: getEnv("NEXT_PUBLIC_IMAGE_HOST", "backend.local"),
} as const;
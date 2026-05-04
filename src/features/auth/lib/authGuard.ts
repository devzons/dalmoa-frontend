import "server-only";

import { redirect } from "next/navigation";
import { getSessionUser } from "../api/getSessionUser";

type RequireAuthOptions = {
  locale: string;
  nextPath?: string;
};

export async function requireAuth({ locale, nextPath }: RequireAuthOptions) {
  const user = await getSessionUser();

  if (!user) {
    const next = encodeURIComponent(nextPath ?? `/${locale}`);
    redirect(`/${locale}/login?next=${next}`);
  }

  return user;
}
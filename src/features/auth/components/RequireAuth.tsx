"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMe, type AuthUser } from "@/features/auth/api";

type Props = {
  locale: "ko" | "en";
  children: React.ReactNode;
};

export function RequireAuth({ locale, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const me = await getMe();

        if (mounted) {
          setUser(me);
        }
      } catch {
        if (mounted) {
          setUser(null);
          router.replace(`/${locale}/login?next=${encodeURIComponent(pathname)}`);
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    };

    check();

    return () => {
      mounted = false;
    };
  }, [locale, pathname, router]);

  if (!ready) {
    return null;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
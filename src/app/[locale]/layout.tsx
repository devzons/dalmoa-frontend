import { getSessionUser } from "@/features/auth/server";
import { AuthProvider } from "@/features/auth";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const user = await getSessionUser();

  return (
    <AuthProvider initialUser={user}>
      {children}
    </AuthProvider>
  );
}
export type SessionUser = {
  id: number;
  name: string;
  email?: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  return null;
}

export async function requireSessionUser() {
  return null;
}
export type User = {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin";
  hasActiveSubscription?: boolean;
  adCredits?: number;
};
export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  name: string;
};
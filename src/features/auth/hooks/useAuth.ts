"use client";

import { useCallback } from "react";
import { useAuthContext } from "../provider/AuthProvider";
import {
  deductAdCredits as deductAdCreditsApi,
  getAdCredits,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from "../api";
import { purchaseAdCredits as purchaseAdCreditsApi } from "../api";

export function useAuth() {
  const { user, setUser } = useAuthContext();

  const login = useCallback(
    async (email: string, password: string) => {
      const nextUser = await loginApi({ email, password });
      setUser(nextUser);
      return nextUser;
    },
    [setUser]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const nextUser = await registerApi({ name, email, password });
      setUser(nextUser);
      return nextUser;
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
  }, [setUser]);

  const purchaseAdCredits = useCallback(
    async (priceId: string, credits: number) => {
      if (!user) {
        throw new Error("로그인이 필요합니다.");
      }

      const url = await purchaseAdCreditsApi({
        priceId,
        credits,
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      });

      window.location.href = url;
    },
    [user]
  );

  const refreshAdCredits = useCallback(async () => {
    if (!user) {
      return 0;
    }

    const adCredits = await getAdCredits();

    setUser({
      ...user,
      adCredits,
    });

    return adCredits;
  }, [setUser, user]);

  const deductAdCredits = useCallback(
    async (postId: number, amount = 1) => {
      if (!user) {
        throw new Error("로그인이 필요합니다.");
      }

      const adCredits = await deductAdCreditsApi(postId, amount);

      setUser({
        ...user,
        adCredits,
      });

      return adCredits;
    },
    [setUser, user]
  );

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshAdCredits,
    deductAdCredits,
    purchaseAdCredits,
  };
}
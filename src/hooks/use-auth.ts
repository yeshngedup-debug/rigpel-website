"use client";

import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("rigpel_role");
      localStorage.removeItem("rigpel_user");
    }
    set({ user: null, isLoading: false });
  },
}));

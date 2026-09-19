import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import Cookies from "js-cookie";

// src/store/use-app-store.ts

import { UserRole } from "@/models/user.model"; // ایمپورت Enum از مدل

interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole; // 👈 اضافه کردن فیلد role به صورت صریح
}

// ... بقیه کد

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) ?? null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, {
      expires: 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name, { path: "/" });
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        Cookies.remove("token", { path: "/" });
        set({ user: null });
      },
    }),
    {
      name: "app-user-storage",
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);

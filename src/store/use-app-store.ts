import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole = "admin" | "customer" | "manager" | "guest";

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "app-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/api-client";
import { useAppStore } from "@/store/use-app-store";
import { useEffect } from "react";
import { useRouter } from "@/navigation"; // استفاده از navigation خودِ پروژه

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter(); // جایگزین window.location
  const { user, setUser, logout: clearStoreUser } = useAppStore();

  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auth-profile"],
    queryFn: async () => {
      const res = await http.get<any>("/auth/profile");
      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // ۵ دقیقه کش
  });

  // سینک کردن داده‌های کوئری با Zustand
  useEffect(() => {
    if (profileData) {
      setUser(profileData);
    } else if (isError) {
      clearStoreUser();
    }
  }, [profileData, isError, setUser, clearStoreUser]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await http.post("/auth/logout");
    },
    onSuccess: () => {
      clearStoreUser();
      queryClient.setQueryData(["auth-profile"], null);
      // ریدایرکت ایمن به لندینگ اصلی
      router.push("/main"); 
      router.refresh(); // اجبار به رفرش روت‌ها برای پاکسازی کش سرور
    },
  });

  // استفاده از Optional Chaining ایمن برای نقش‌ها
  const hasRole = (roles: string | string[]) => {
    if (!user?.role) return false;
    const targetRoles = Array.isArray(roles) ? roles : [roles];
    return targetRoles.includes(user.role);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isCustomer: user?.role === "customer",
    hasRole,
    refetchProfile: refetch,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}

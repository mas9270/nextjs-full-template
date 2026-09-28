import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore, User, UserRole } from "@/store/use-app-store";
import apiClient from "@/lib/api-client";
import { useRouter } from "@/navigation";
import { useEffect } from "react";

interface RawProfileResponse {
  _id?: string;
  id?: string;
  name: string;
  email?: string;
  role: UserRole;
}

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser, logout: clearLocalUser } = useAppStore();

  const profileQuery = useQuery({
    queryKey: ["auth-profile"],
    queryFn: async () => {
      const res = await apiClient.get<RawProfileResponse>("/auth/profile");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (profileQuery.data) {
      const raw = profileQuery.data;
      const normalizedUser: User = {
        id: raw.id || raw._id || "",
        name: raw.name,
        email: raw.email,
        role: raw.role,
      };
      setUser(normalizedUser);
    } else if (profileQuery.isError) {
      clearLocalUser();
    }
  }, [profileQuery.data, profileQuery.isError, setUser, clearLocalUser]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
    },
    onSettled: () => {
      clearLocalUser();
      queryClient.removeQueries({ queryKey: ["auth-profile"] });
      router.push("/auth");
    },
  });

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!user) return false;
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    return user.role === roles;
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: profileQuery.isLoading,
    isAdmin: user?.role === "admin",
    isCustomer: user?.role === "customer",
    hasRole,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    refetchProfile: profileQuery.refetch,
  };
};

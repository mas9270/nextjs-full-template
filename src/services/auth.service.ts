import { http } from "@/lib/api-client";
import { ApiResponse } from "@/types/api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUserData {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export const registerService = async (payload: RegisterPayload) => {
  const response = await http.post<ApiResponse<{ user: AuthUserData }>>(
    "/auth/register",
    payload,
  );
  return response.data;
};

export const loginService = async (payload: LoginPayload) => {
  const response = await http.post<ApiResponse<{ user: AuthUserData }>>(
    "/auth/login",
    payload,
  );
  return response.data;
};

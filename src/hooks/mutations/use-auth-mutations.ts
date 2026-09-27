"use client";

import { useMutation } from "@tanstack/react-query";
import {
  registerService,
  loginService,
  RegisterPayload,
  LoginPayload,
} from "@/services/auth.service";

export const authKeys = {
  register: () => ["register"] as const,
  login: () => ["login"] as const,
};

export function useRegisterMutation() {
  return useMutation({
    mutationKey: authKeys.register(),
    mutationFn: (payload: RegisterPayload) => registerService(payload),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationKey: authKeys.login(),
    mutationFn: (payload: LoginPayload) => loginService(payload),
  });
}

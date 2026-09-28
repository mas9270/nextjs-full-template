"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Form, FormField } from "@/components/ui/form";
import { useRegisterMutation } from "@/hooks/mutations/use-auth-mutations";
import { useAppStore, UserRole } from "@/store/use-app-store";
import { useRouter } from "@/navigation";

export default function RegisterForm() {
  const t = useTranslations("auth");
  const [serverError, setServerError] = useState<string | null>(null);

  const registerSchema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(2, t("errors.nameMin")),
          email: z
            .string()
            .min(1, t("errors.emailRequired"))
            .email(t("errors.emailInvalid")),
          password: z.string().min(6, t("errors.passwordMin")),
          confirmPassword: z
            .string()
            .min(1, t("errors.confirmPasswordRequired")),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t("errors.passwordMismatch"),
          path: ["confirmPassword"],
        }),
    [t]
  );

  type RegisterSchema = z.infer<typeof registerSchema>;

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register, isPending } = useRegisterMutation();
  const setUser = useAppStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit = (values: RegisterSchema) => {
    setServerError(null);
    register(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (response: any) => {
          const userData = response?.data?.user;
          if (userData) {
            setUser({
              id: userData.id || userData._id,
              name: userData.name,
              email: userData.email,
              role: (userData.role as UserRole) || "customer",
            });
          }
          router.push("/control-panel");
        },
        onError: (error: any) => {
          setServerError(
            error?.response?.data?.message ||
              error?.message ||
              t("defaultRegisterError")
          );
        },
      }
    );
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      {serverError && (
        <div className="p-3 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg">
          {serverError}
        </div>
      )}

      <FormField
        name="name"
        label={t("fullNameLabel")}
        placeholder={t("fullNamePlaceholder")}
      />

      <FormField
        name="email"
        label={t("emailLabel")}
        placeholder={t("emailPlaceholder")}
        type="email"
      />

      <FormField
        name="password"
        label={t("passwordLabel")}
        placeholder={t("passwordPlaceholder")}
        type="password"
      />

      <FormField
        name="confirmPassword"
        label={t("confirmPasswordLabel")}
        placeholder={t("passwordPlaceholder")}
        type="password"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isPending ? t("submittingRegister") : t("submitRegister")}
      </button>
    </Form>
  );
}

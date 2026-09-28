"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Form, FormField, FormCheckbox } from "@/components/ui/form";
import { useLoginMutation } from "@/hooks/mutations/use-auth-mutations";
import { useAppStore, UserRole } from "@/store/use-app-store";
import { useRouter } from "@/navigation";

export default function LoginForm() {
  const t = useTranslations("auth");
  const [serverError, setServerError] = useState<string | null>(null);

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, t("errors.emailRequired"))
          .email(t("errors.emailInvalid")),
        password: z.string().min(6, t("errors.passwordMin")),
        rememberMe: z.boolean().optional(),
      }),
    [t]
  );

  type LoginSchema = z.infer<typeof loginSchema>;

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate: login, isPending } = useLoginMutation();
  const setUser = useAppStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit = (values: LoginSchema) => {
    setServerError(null);
    login(
      {
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
              t("defaultLoginError")
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

      <div className="flex items-center justify-between">
        <FormCheckbox name="rememberMe" label={t("rememberMe")} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isPending ? t("submittingLogin") : t("submitLogin")}
      </button>
    </Form>
  );
}

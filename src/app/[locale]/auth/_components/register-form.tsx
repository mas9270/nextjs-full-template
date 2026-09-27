"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useRouter } from "@/navigation";
import { http } from "@/lib/api-client";
import { useAppStore } from "@/store/use-app-store";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const [show_password, set_show_password] = useState(false);
  const [show_confirm_password, set_show_confirm_password] = useState(false);
  const [server_error, set_server_error] = useState<string | null>(null);

  const register_schema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(2, t("errors.nameMin")),
          email: z
            .string()
            .min(1, t("errors.emailRequired"))
            .email(t("errors.emailInvalid")),
          password: z.string().min(6, t("errors.passwordMin")),
          confirm_password: z
            .string()
            .min(1, t("errors.confirmPasswordRequired")),
        })
        .refine((data) => data.password === data.confirm_password, {
          message: t("errors.passwordMismatch"),
          path: ["confirm_password"],
        }),
    [t],
  );

  type RegisterFormData = z.infer<typeof register_schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(register_schema),
    mode: "onTouched",
  });

  const on_submit = async (data: RegisterFormData) => {
    // set_server_error(null);
    // try {
    //   const res = await http.post<{ user: any }>("/auth/register", {
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //   });
    //   setUser(res.data?.user);
    //   if (onSuccess) {
    //     onSuccess();
    //   } else {
    //     router.push("/main");
    //   }
    // } catch (err: any) {
    //   set_server_error(
    //     err.response?.data?.message || t("defaultRegisterError"),
    //   );
    // }
  };

  return (
    <form onSubmit={handleSubmit(on_submit)} className="w-full space-y-4">
      <AnimatePresence>
        {server_error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 text-xs text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{server_error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {t("fullNameLabel")}
        </label>
        <div className="relative">
          <input
            {...register("name")}
            type="text"
            placeholder={t("fullNamePlaceholder")}
            disabled={isSubmitting}
            className={`h-11 w-full rounded-xl border bg-background/70 pl-3 pr-10 text-sm text-foreground placeholder:text-zinc-400 transition focus:bg-card focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-background/70 dark:text-foreground dark:focus:bg-card ${
              errors.name
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800"
                : "border-border focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-border dark:focus:border-indigo-500"
            }`}
          />
          <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </div>
        {errors.name && (
          <p className="text-xs text-rose-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {t("emailLabel")}
        </label>
        <div className="relative">
          <input
            {...register("email")}
            type="email"
            dir="ltr"
            placeholder="name@example.com"
            disabled={isSubmitting}
            className={`h-11 w-full rounded-xl border bg-background/70 pl-10 pr-3 text-sm text-foreground placeholder:text-zinc-400 transition focus:bg-card focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-background/70 dark:text-foreground dark:focus:bg-card ${
              errors.email
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800"
                : "border-border focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-border dark:focus:border-indigo-500"
            }`}
          />
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </div>
        {errors.email && (
          <p className="text-xs text-rose-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {t("passwordLabel")}
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={show_password ? "text" : "password"}
            dir="ltr"
            placeholder="••••••••"
            disabled={isSubmitting}
            className={`h-11 w-full rounded-xl border bg-background/70 pl-10 pr-10 text-sm text-foreground placeholder:text-zinc-400 transition focus:bg-card focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-background/70 dark:text-foreground dark:focus:bg-card ${
              errors.password
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800"
                : "border-border focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-border dark:focus:border-indigo-500"
            }`}
          />
          <LockKeyhole className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <button
            type="button"
            onClick={() => set_show_password(!show_password)}
            tabIndex={-1}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            {show_password ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-rose-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {t("confirmPasswordLabel")}
        </label>
        <div className="relative">
          <input
            {...register("confirm_password")}
            type={show_confirm_password ? "text" : "password"}
            dir="ltr"
            placeholder="••••••••"
            disabled={isSubmitting}
            className={`h-11 w-full rounded-xl border bg-background/70 pl-10 pr-10 text-sm text-foreground placeholder:text-zinc-400 transition focus:bg-card focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-background/70 dark:text-foreground dark:focus:bg-card ${
              errors.confirm_password
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800"
                : "border-border focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-border dark:focus:border-indigo-500"
            }`}
          />
          <LockKeyhole className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <button
            type="button"
            onClick={() => set_show_confirm_password(!show_confirm_password)}
            tabIndex={-1}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            {show_confirm_password ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.confirm_password && (
          <p className="text-xs text-rose-500">
            {errors.confirm_password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition duration-200 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 active:scale-[0.99] disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t("submittingRegister")}</span>
          </>
        ) : (
          <>
            <span>{t("submitRegister")}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </>
        )}
      </button>
    </form>
  );
}

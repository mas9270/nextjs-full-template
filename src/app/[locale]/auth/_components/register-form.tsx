"use client";

import { useState } from "react";
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
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useRouter } from "@/navigation";
import { http } from "@/lib/api-client";
import { useAppStore } from "@/store/use-app-store";

const register_schema = z
  .object({
    name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z.string().min(1, "ایمیل الزامی است").email("ایمیل نامعتبر است"),
    password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر است"),
    confirm_password: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirm_password"],
  });

type RegisterFormData = z.infer<typeof register_schema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const [show_password, set_show_password] = useState(false);
  const [show_confirm_password, set_show_confirm_password] = useState(false);
  const [server_error, set_server_error] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(register_schema),
    mode: "onTouched",
  });

  const on_submit = async (data: RegisterFormData) => {
    set_server_error(null);
    try {
      const res = await http.post<{ user: any }>("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setUser(res.data?.user);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/main");
      }
    } catch (err: any) {
      set_server_error(
        err.response?.data?.message || "خطایی در ثبت‌نام رخ داد",
      );
    }
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
          نام و نام خانوادگی
        </label>
        <div className="relative">
          <input
            {...register("name")}
            type="text"
            placeholder="علی علوی"
            disabled={isSubmitting}
            className={`h-11 w-full rounded-xl border bg-zinc-50/50 pl-3 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:bg-white focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-zinc-900/50 dark:text-zinc-100 dark:focus:bg-zinc-900 ${
              errors.name
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800"
                : "border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-zinc-800 dark:focus:border-indigo-500"
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
          ایمیل
        </label>
        <div className="relative">
          <input
            {...register("email")}
            type="email"
            dir="ltr"
            placeholder="name@example.com"
            disabled={isSubmitting}
            className={`h-11 w-full rounded-xl border bg-zinc-50/50 pl-10 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:bg-white focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-zinc-900/50 dark:text-zinc-100 dark:focus:bg-zinc-900 ${
              errors.email
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800"
                : "border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-zinc-800 dark:focus:border-indigo-500"
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
          رمز عبور
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={show_password ? "text" : "password"}
            dir="ltr"
            placeholder="••••••••"
            disabled={isSubmitting}
            className={`h-11 w-full rounded-xl border bg-zinc-50/50 pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:bg-white focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-zinc-900/50 dark:text-zinc-100 dark:focus:bg-zinc-900 ${
              errors.password
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800"
                : "border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-zinc-800 dark:focus:border-indigo-500"
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
          تکرار رمز عبور
        </label>
        <div className="relative">
          <input
            {...register("confirm_password")}
            type={show_confirm_password ? "text" : "password"}
            dir="ltr"
            placeholder="••••••••"
            disabled={isSubmitting}
            className={`h-11 w-full rounded-xl border bg-zinc-50/50 pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:bg-white focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-zinc-900/50 dark:text-zinc-100 dark:focus:bg-zinc-900 ${
              errors.confirm_password
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800"
                : "border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-zinc-800 dark:focus:border-indigo-500"
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
            <span>در حال ثبت نام...</span>
          </>
        ) : (
          <>
            <span>ایجاد حساب کاربری</span>
            <ArrowLeft className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

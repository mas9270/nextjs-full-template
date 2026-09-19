"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LockKeyhole, Mail, User, ArrowLeft, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { http } from "@/lib/api-client";
import { useRouter } from "@/navigation";
import { useAppStore } from "@/store/use-app-store";

const registerSchema = z
  .object({
    name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("ایمیل وارد شده معتبر نیست"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirm_password: z.string().min(6, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "رمز عبور با تکرار آن یکسان نیست",
    path: ["confirm_password"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setServerError(null);
      const res = await http.post<{ user: any }>("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res.data?.user) {
        setUser(res.data.user);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/main");
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || "خطایی در ثبت‌نام رخ داده است";
      setServerError(message);
    }
  };

  return (
    <div className="w-full" dir="rtl">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          ایجاد حساب کاربری
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          اطلاعات خود را برای ثبت‌نام در سامانه وارد کنید
        </p>
      </div>

      <AnimatePresence>
        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2"
          >
            <span>{serverError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* فیلد نام */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            نام و نام خانوادگی
          </label>
          <div className="relative">
            <input
              {...register("name")}
              type="text"
              placeholder="مثال: علی محمدی"
              className={`w-full h-11 pr-10 pl-4 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/60 border ${
                errors.name
                  ? "border-rose-500 focus:ring-rose-500/20"
                  : "border-zinc-200 dark:border-zinc-700/60 focus:border-blue-500 focus:ring-blue-500/20"
              } focus:outline-none focus:ring-4 transition-all duration-200 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400`}
            />
            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          </div>
          {errors.name && (
            <span className="text-xs text-rose-500 mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* فیلد ایمیل */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            پست الکترونیک
          </label>
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="example@mail.com"
              dir="ltr"
              className={`w-full h-11 pr-10 pl-4 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/60 border ${
                errors.email
                  ? "border-rose-500 focus:ring-rose-500/20"
                  : "border-zinc-200 dark:border-zinc-700/60 focus:border-blue-500 focus:ring-blue-500/20"
              } focus:outline-none focus:ring-4 transition-all duration-200 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400`}
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          </div>
          {errors.email && (
            <span className="text-xs text-rose-500 mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* فیلد کلمه عبور */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            کلمه عبور
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="حداقل ۶ کاراکتر"
              dir="ltr"
              className={`w-full h-11 pr-10 pl-10 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/60 border ${
                errors.password
                  ? "border-rose-500 focus:ring-rose-500/20"
                  : "border-zinc-200 dark:border-zinc-700/60 focus:border-blue-500 focus:ring-blue-500/20"
              } focus:outline-none focus:ring-4 transition-all duration-200 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400`}
            />
            <LockKeyhole className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-rose-500 mt-1 block">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* تکرار کلمه عبور */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            تکرار کلمه عبور
          </label>
          <div className="relative">
            <input
              {...register("confirm_password")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="تکرار همان رمز عبور"
              dir="ltr"
              className={`w-full h-11 pr-10 pl-10 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/60 border ${
                errors.confirm_password
                  ? "border-rose-500 focus:ring-rose-500/20"
                  : "border-zinc-200 dark:border-zinc-700/60 focus:border-blue-500 focus:ring-blue-500/20"
              } focus:outline-none focus:ring-4 transition-all duration-200 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400`}
            />
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirm_password && (
            <span className="text-xs text-rose-500 mt-1 block">
              {errors.confirm_password.message}
            </span>
          )}
        </div>

        {/* دکمه سابمیت */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:opacity-95 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>در حال ایجاد حساب...</span>
            </>
          ) : (
            <>
              <span>ثبت نام و ایجاد حساب</span>
              <ArrowLeft className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-zinc-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>اطلاعات شما با امنیت کامل ذخیره و محافظت می‌شود</span>
      </div>
    </div>
  );
}

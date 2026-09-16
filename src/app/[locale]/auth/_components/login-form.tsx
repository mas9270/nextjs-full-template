"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "پسورد حداقل ۶ کاراکتر"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormValues) => {
    // فراخوانی axios از api-client
    console.log(data);
  };

  return (
    <div
      dir="rtl"
      className="
        relative flex min-h-screen w-full items-center justify-center
        overflow-hidden bg-slate-50 px-4 py-8
        transition-colors duration-500
        dark:bg-[#09090b]
      "
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute -right-32 -top-32
            h-80 w-80 rounded-full
            bg-blue-400/20 blur-3xl
            dark:bg-blue-500/10
          "
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute -bottom-40 -left-32
            h-96 w-96 rounded-full
            bg-violet-400/20 blur-3xl
            dark:bg-violet-500/10
          "
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0,transparent_45%)]
            dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0,transparent_45%)]
          "
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="
            overflow-hidden rounded-3xl
            border border-slate-200/80
            bg-white/85
            shadow-[0_25px_80px_-20px_rgba(15,23,42,0.25)]
            backdrop-blur-xl
            transition-colors duration-500

            dark:border-white/[0.08]
            dark:bg-zinc-900/80
            dark:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.7)]
          "
        >
          {/* Top Accent */}
          <div
            className="
              h-1 w-full
              bg-gradient-to-r
              from-blue-600 via-indigo-500 to-violet-600
            "
          />

          <div className="p-7 sm:p-9">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-8 text-center"
            >
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="
                  mx-auto mb-5 flex h-16 w-16 items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br from-blue-600 to-indigo-600
                  text-white
                  shadow-lg shadow-blue-500/25
                "
              >
                <LockKeyhole size={28} strokeWidth={1.8} />
              </motion.div>

              <h1
                className="
                  text-2xl font-bold tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                خوش آمدید
              </h1>

              <p
                className="
                  mt-2 text-sm
                  text-slate-500
                  dark:text-zinc-400
                "
              >
                برای ورود به حساب کاربری خود اطلاعات زیر را وارد کنید
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="
                    mb-2 block text-sm font-medium
                    text-slate-700
                    dark:text-zinc-300
                  "
                >
                  ایمیل
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="
                      pointer-events-none absolute right-4 top-1/2
                      -translate-y-1/2
                      text-slate-400
                      dark:text-zinc-500
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@email.com"
                    {...register("email")}
                    className={`
                      h-12 w-full rounded-xl border
                      bg-slate-50 pr-11 pl-4
                      text-sm text-slate-900
                      outline-none transition-all duration-200

                      placeholder:text-slate-400

                      focus:bg-white
                      focus:ring-4

                      dark:bg-zinc-800/70
                      dark:text-white
                      dark:placeholder:text-zinc-600
                      dark:focus:bg-zinc-800

                      ${
                        errors.email
                          ? `
                            border-red-400
                            focus:border-red-500
                            focus:ring-red-500/10
                            dark:border-red-500/60
                          `
                          : `
                            border-slate-200
                            focus:border-blue-500
                            focus:ring-blue-500/10
                            dark:border-zinc-700
                            dark:focus:border-blue-500
                          `
                      }
                    `}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-xs font-medium text-red-500"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="
                      text-sm font-medium
                      text-slate-700
                      dark:text-zinc-300
                    "
                  >
                    رمز عبور
                  </label>

                  <button
                    type="button"
                    className="
                      text-xs font-medium
                      text-blue-600
                      transition-colors
                      hover:text-blue-700
                      dark:text-blue-400
                      dark:hover:text-blue-300
                    "
                  >
                    فراموشی رمز عبور؟
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="
                      pointer-events-none absolute right-4 top-1/2
                      -translate-y-1/2
                      text-slate-400
                      dark:text-zinc-500
                    "
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="رمز عبور خود را وارد کنید"
                    {...register("password")}
                    className={`
                      h-12 w-full rounded-xl border
                      bg-slate-50
                      pr-11 pl-11
                      text-sm text-slate-900
                      outline-none transition-all duration-200

                      placeholder:text-slate-400

                      focus:bg-white
                      focus:ring-4

                      dark:bg-zinc-800/70
                      dark:text-white
                      dark:placeholder:text-zinc-600
                      dark:focus:bg-zinc-800

                      ${
                        errors.password
                          ? `
                            border-red-400
                            focus:border-red-500
                            focus:ring-red-500/10
                            dark:border-red-500/60
                          `
                          : `
                            border-slate-200
                            focus:border-blue-500
                            focus:ring-blue-500/10
                            dark:border-zinc-700
                            dark:focus:border-blue-500
                          `
                      }
                    `}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="
                      absolute left-3 top-1/2
                      flex h-8 w-8
                      -translate-y-1/2
                      items-center justify-center
                      rounded-lg
                      text-slate-400
                      transition-all
                      hover:bg-slate-200
                      hover:text-slate-600

                      dark:text-zinc-500
                      dark:hover:bg-zinc-700
                      dark:hover:text-zinc-300
                    "
                    aria-label={
                      showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-xs font-medium text-red-500"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                whileHover={!isSubmitting ? { scale: 1.01 } : undefined}
                whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                disabled={isSubmitting}
                type="submit"
                className="
                  group relative flex h-12 w-full
                  items-center justify-center
                  gap-2 overflow-hidden
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  text-sm font-semibold
                  text-white
                  shadow-lg shadow-blue-500/20
                  outline-none
                  transition-all duration-300

                  hover:from-blue-700
                  hover:to-indigo-700
                  hover:shadow-xl
                  hover:shadow-blue-500/25

                  focus:ring-4
                  focus:ring-blue-500/20

                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {!isSubmitting && (
                  <span
                    className="
                      absolute inset-0
                      -translate-x-full
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                      transition-transform duration-700
                      group-hover:translate-x-full
                    "
                  />
                )}

                {isSubmitting ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    <span>در حال ورود...</span>
                  </>
                ) : (
                  <>
                    <span>ورود به حساب</span>
                    <ArrowLeft
                      size={18}
                      className="
                        transition-transform duration-300
                        group-hover:-translate-x-1
                      "
                    />
                  </>
                )}
              </motion.button>
            </form>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="
                mt-7 flex items-center justify-center
                gap-2 text-xs
                text-slate-400
                dark:text-zinc-500
              "
            >
              <ShieldCheck size={15} />

              <span>اطلاعات شما با امنیت کامل محافظت می‌شود</span>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="
            mt-5 text-center text-xs
            text-slate-400
            dark:text-zinc-600
          "
        >
          © {new Date().getFullYear()} تمامی حقوق محفوظ است
        </motion.p>
      </motion.div>
    </div>
  );
}

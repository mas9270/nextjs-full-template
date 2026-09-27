"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./_components/login-form";
import RegisterForm from "./_components/register-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="relative flex flex-1 min-h-0 min-w-0 w-full items-center justify-center overflow-hidden bg-background p-4 text-foreground transition-colors duration-200">
      {/* Background Blobs (ظاهر زیبا و انیمیشنی) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 h-96 w-96 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full blur-3xl opacity-20"
        />
      </div>

      <motion.div
        layout
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-foreground shadow-2xl backdrop-blur-xl transition-colors duration-200"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {mode === "login" ? "خوش آمدید" : "ایجاد حساب کاربری"}
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            {mode === "login"
              ? "برای ادامه وارد حساب خود شوید"
              : "برای شروع، اطلاعات خود را وارد کنید"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {mode === "login" ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center text-sm">
          <p className="text-foreground/65">
            {mode === "login"
              ? "حساب کاربری ندارید؟ "
              : "قبلاً ثبت‌نام کرده‌اید؟ "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-bold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400"
            >
              {mode === "login" ? "ثبت‌نام کنید" : "وارد شوید"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

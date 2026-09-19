"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./_components/login-form";
import RegisterForm from "./_components/register-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-50 p-4 dark:bg-zinc-950">
      {/* Background Blobs (ظاهر زیبا و انیمیشنی) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 h-96 w-96 rounded-full bg-indigo-500 blur-3xl opacity-20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-purple-500 blur-3xl opacity-20"
        />
      </div>

      <motion.div
        layout
        className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {mode === "login" ? "خوش آمدید" : "ایجاد حساب کاربری"}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
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
          <p className="text-zinc-600 dark:text-zinc-400">
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

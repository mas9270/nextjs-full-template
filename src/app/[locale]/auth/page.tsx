"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "./_components/login-form";
import { RegisterForm } from "./_components/register-form";
import { LogIn, UserPlus } from "lucide-react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-zinc-950">
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10">
        {/* جعبه تغییر تب (Segmented Control) */}
        <div className="bg-zinc-200/60 dark:bg-zinc-800/60 p-1 rounded-2xl flex items-center mb-4 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`relative flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "login"
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {activeTab === "login" && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <LogIn className="w-4 h-4 relative z-10" />
            <span className="relative z-10">ورود به حساب</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`relative flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "register"
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {activeTab === "register" && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <UserPlus className="w-4 h-4 relative z-10" />
            <span className="relative z-10">ایجاد حساب جدید</span>
          </button>
        </div>

        {/* کارت فرم با پس‌زمینه شیشه‌ای */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-zinc-900/5 dark:shadow-black/40">
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <motion.div
                key="login-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div
                key="register-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <RegisterForm onSuccess={() => setActiveTab("login")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

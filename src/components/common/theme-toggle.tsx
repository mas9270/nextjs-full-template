"use client";

// import { useNotify } from "@/hooks/use-notify";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  // const { notify } = useNotify();
  const toggleTheme = () => {
    // notify("wdawaw", "success");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="تغییر پوسته"
      className="relative flex h-9 w-9 cursor-pointer touch-manipulation select-none items-center justify-center rounded-full border border-slate-900/10 bg-slate-900/5 shadow-[0_3px_12px_rgba(15,23,42,0.16)] transition-all duration-300 active:scale-90 focus:outline-none dark:border-white/15 dark:bg-white/10 dark:shadow-[0_3px_12px_rgba(0,0,0,0.4)]"
    >
      <motion.span
        initial={false}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center dark:hidden"
      >
        <Sun size={18} strokeWidth={2} className="text-amber-500" />
      </motion.span>

      <motion.span
        initial={false}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="hidden items-center justify-center dark:flex"
      >
        <Moon size={18} strokeWidth={2} className="text-indigo-300" />
      </motion.span>
    </button>
  );
}

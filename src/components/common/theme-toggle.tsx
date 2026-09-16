"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const isDark = theme === "dark" || resolvedTheme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isDark ? "حالت روشن" : "حالت تاریک"}
      whileTap={{ scale: 0.88 }}
      className={` relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none ${isDark ? ` border-white/15 bg-white/10 shadow-[0_3px_12px_rgba(0,0,0,0.4)] hover:bg-white/15 hover:border-white/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)] ` : ` border-slate-900/10 bg-slate-900/5 shadow-[0_3px_12px_rgba(15,23,42,0.16)] hover:bg-slate-900/10 hover:border-slate-900/20 hover:shadow-[0_4px_16px_rgba(15,23,42,0.22)] `} `}
    >
      {" "}
      <AnimatePresence mode="wait" initial={false}>
        {" "}
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -120, scale: 0.3, x: 5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, rotate: 120, scale: 0.3, x: -5 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {" "}
            <motion.div
              animate={
                hovered
                  ? { rotate: [0, -18, 18, -8, 0], scale: [1, 1.12, 1] }
                  : {}
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {" "}
              <Moon
                size={16}
                strokeWidth={2}
                className=" text-indigo-300 drop-shadow-[0_0_5px_rgba(165,180,252,0.7)] "
              />{" "}
            </motion.div>{" "}
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 120, scale: 0.3, x: -5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, rotate: -120, scale: 0.3, x: 5 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {" "}
            <motion.div
              animate={
                hovered
                  ? { rotate: [0, 18, -18, 8, 0], scale: [1, 1.12, 1] }
                  : {}
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {" "}
              <Sun
                size={16}
                strokeWidth={2}
                className=" text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.65)] "
              />{" "}
            </motion.div>{" "}
          </motion.span>
        )}{" "}
      </AnimatePresence>{" "}
    </motion.button>
  );
}

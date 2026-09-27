"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";

interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
  dir: "rtl" | "ltr";
}

const LANGUAGES: LanguageOption[] = [
  { code: "fa", label: "Persian", nativeLabel: "فارسی", dir: "rtl" },
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  // { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
];

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<"left" | "right">("right");
  const [isPending, startTransition] = useTransition();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const activeLanguage = LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  const updatePlacement = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const isRightHalf = rect.left + rect.width / 2 > window.innerWidth / 2;
    setPlacement(isRightHalf ? "right" : "left");
  };

  const handleToggle = () => {
    if (!isOpen) {
      updatePlacement();
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleResize() {
      if (isOpen) {
        updatePlacement();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code: string) => {
    if (code === currentLocale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: code });
      setIsOpen(false);
    });
  };

  return (
    <div className="relative inline-block text-start" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className="relative flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
        aria-label="تغییر زبان"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-xs font-semibold uppercase tracking-wider">
          {activeLanguage.code}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 4 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute top-full z-50 mt-1 min-w-37.5 overflow-hidden rounded-xl border border-zinc-200 bg-white/95 p-1.5 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 ${
              placement === "right" ? "right-0" : "left-0"
            }`}
          >
            <div className="flex flex-col gap-0.5">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLocale;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                      isSelected
                        ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.nativeLabel}</span>
                      <span className="text-[10px] text-zinc-400 uppercase dark:text-zinc-500">
                        ({lang.code})
                      </span>
                    </span>

                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

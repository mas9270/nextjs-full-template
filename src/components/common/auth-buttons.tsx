"use client";

import { useTranslations } from "next-intl";
import { LogIn, UserPlus } from "lucide-react";
import { Link } from "@/navigation";

export default function AuthButtons() {
  const t = useTranslations("auth");

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/auth"
        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-card/80 hover:text-primary active:scale-[0.98]"
      >
        <LogIn className="h-3.5 w-3.5" />
        |
        <UserPlus className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

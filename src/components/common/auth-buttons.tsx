"use client";

import { useTranslations } from "next-intl";
import { LogIn, UserPlus, LogOut, LayoutDashboard, User } from "lucide-react";
import { Link } from "@/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function AuthButtons() {
  const t = useTranslations("auth");
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // User is authenticated
  if (user && isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        {/* User Profile */}
        <Link
          href="/profile"
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-card/80 hover:text-primary active:scale-[0.98]"
        >
          <User className="h-3.5 w-3.5" />

          <span className="max-w-24 truncate">
            {user.name || user.name || t("profile")}
          </span>
        </Link>

        {/* Admin Dashboard */}
        {isAdmin && (
          <Link
            href="/admin"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-card/80 hover:text-primary active:scale-[0.98]"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>{t("dashboard")}</span>
          </Link>
        )}

        {/* Logout */}
        <button
          type="button"
          onClick={() => logout()}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-xs font-medium text-foreground transition-all duration-200 hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive active:scale-[0.98]"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>{t("logout")}</span>
        </button>
      </div>
    );
  }

  // User is not authenticated
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/auth"
        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-card/80 hover:text-primary active:scale-[0.98]"
      >
        <LogIn className="h-3.5 w-3.5" />
        <span className="text-muted-foreground">|</span>
        <UserPlus className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

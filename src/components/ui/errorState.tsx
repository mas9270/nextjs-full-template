"use client";

import { useEffect } from "react";

interface ErrorStateProps {
  error?: Error | string | null;
  reset?: () => void;
  title?: string;
  className?: string;
  isFullScreen?: boolean;
}

export function ErrorState({
  error,
  reset,
  title = "مشکلی پیش آمد!",
  className = "",
  isFullScreen = false,
}: ErrorStateProps) {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "خطای ناشناخته رخ داده است.";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-center p-4 ${
        isFullScreen ? "h-screen w-full" : "w-full py-6"
      } ${className}`}
    >
      <h2 className="text-lg font-bold text-destructive">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-sm">{errorMessage}</p>

      {reset && (
        <button
          onClick={reset}
          className="mt-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
}

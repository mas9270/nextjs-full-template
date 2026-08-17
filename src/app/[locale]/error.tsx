// src/app/[locale]/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); // لاگ کردن خطا برای دیباگ
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-xl font-bold">مشکلی پیش آمد!</h2>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        تلاش مجدد
      </button>
    </div>
  );
}

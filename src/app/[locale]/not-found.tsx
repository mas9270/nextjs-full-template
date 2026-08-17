// src/app/[locale]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">۴۰۴</h1>
      <p>صفحه مورد نظر یافت نشد.</p>
      <Link href="/" className="text-primary underline">
        بازگشت به خانه
      </Link>
    </div>
  );
}

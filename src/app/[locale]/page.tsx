"use client"
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="rounded-xl border border-border bg-muted p-8 text-center shadow-xs">
        <h1 className="text-2xl font-bold text-foreground">
          Next.js Enterprise Scaffold Loaded Successfully
        </h1>
        <p className="mt-2 text-muted-foreground">
          Base translation key test: {t("common.welcome" as any)}
        </p>
      </div>
    </main>
  );
}

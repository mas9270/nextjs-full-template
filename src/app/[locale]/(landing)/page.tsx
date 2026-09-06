import { getTranslations } from "next-intl/server";
import ViewList from "./_components/viewList";

export default async function HomePage() {
  const t = await getTranslations("common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>
      <ViewList />
    </main>
  );
}

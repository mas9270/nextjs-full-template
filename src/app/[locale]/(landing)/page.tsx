// src/app/[locale]/page.tsx
import { getTranslations } from "next-intl/server";
// import { getOrganizations } from "@/services/organization-service";
import ViewList from "./_components/viewList";
// import { getOrganizations } from "@/services/organization-service";

export default async function HomePage() {
  const t = await getTranslations("common");
  // const orgs = await getOrganizations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>
      <ViewList />
    </main>
  );
}

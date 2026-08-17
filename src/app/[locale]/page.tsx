import { getTranslations } from "next-intl/server";


export default async function HomePage() {
  const t = await getTranslations("common");
  // const orgs = await getOrganizations(); // دیگر مستقیماً db صدا زده نمی‌شود

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {t("welcome")} — Flowdesk CRM
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {/* {orgs.length === 0 ? (
          <p className="text-slate-500">
            No organizations yet. Run `npm run db:seed`.
          </p>
        ) : (
          orgs.map((org) => (
            <div
              key={org.id}
              className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{org.name}</h2>
              <p className="text-sm text-slate-500">Slug: {org.slug}</p>
              <div className="mt-4 text-xs text-slate-400">ID: {org.id}</div>
            </div>
          ))
        )} */}
      </div>
    </main>
  );
}

import { db } from "@/db";
import { organizations } from "@/db/schema";

export default async function TestDbPage() {
  try {
    // یک کوئری ساده برای گرفتن تمام سازمان‌ها
    const allOrgs = await db.select().from(organizations);

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        <p className="text-green-500">✅ Connection Successful!</p>
        <pre className="bg-slate-100 p-4 mt-4 rounded">
          {JSON.stringify(allOrgs, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        <p className="text-red-500">❌ Connection Failed!</p>
        <pre className="bg-slate-100 p-4 mt-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }
}

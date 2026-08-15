import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;

// برای جلوگیری از ساختن Connectionهای متعدد در زمان Development (Hot Reload)
const client = postgres(connectionString);
export const db = drizzle(client);

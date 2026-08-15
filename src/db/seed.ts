import { db } from "./index";
import { organizations, users } from "./schema";

async function main() {
  console.log("🌱 开始 seeding database...");

  // ۱. ابتدا یک سازمان نمونه می‌سازیم
  // نکته: از 'insert().values()' استفاده می‌کنیم که روش استاندارد Drizzle است.
  const [org] = await db
    .insert(organizations)
    .values({
      name: "Acme Corp",
      slug: "acme-corp",
    })
    .returning(); // استفاده از returning برای گرفتن ID ساخته شده توسط دیتابیس

  console.log(`✅ Organization created: ${org.name} (${org.id})`);

  // ۲. حالا یک کاربر (مدیر) برای این سازمان می‌سازیم
  const [admin] = await db
    .insert(users)
    .values({
      name: "Admin User",
      email: "admin@acme.com",
      organizationId: org.id, // اتصال به سازمان ساخته شده
    })
    .returning();

  console.log(`✅ User created: ${admin.name} (${admin.email})`);

  console.log("✨ Seeding completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed!");
  console.error(err);
  process.exit(1);
});

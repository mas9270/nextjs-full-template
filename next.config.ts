// next.config.ts
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/i18n.ts", // مسیر فایل پیکربندی i18n
);

const nextConfig: NextConfig = {
  /* تنظیمات دیگر پروژه در صورت نیاز */
};

export default withNextIntl(nextConfig);

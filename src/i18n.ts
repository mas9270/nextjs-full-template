// src/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // بررسی معتبر بودن زبان، در غیر این‌صورت استفاده از زبان پیش‌فرض
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});

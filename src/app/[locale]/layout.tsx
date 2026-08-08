// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/navigation';
import { RootProvider } from '@/providers/root-provider';
import '@/app/globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // بررسی معتبر بودن زبان
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <RootProvider>
            {children}
          </RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

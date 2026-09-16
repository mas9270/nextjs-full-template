// src/app/[locale]/layout.tsx
import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/navigation";
import { RootProvider } from "@/providers/root-provider";
import "@/app/globals.css";
import { getHtmlDirectionProps } from "@/utils/utils";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dirProps = getHtmlDirectionProps(locale);

  return (
    <html {...dirProps} suppressHydrationWarning>
      <body className="h-screen w-screen bg-background text-foreground antialiased transition-colors duration-200">
        <NextIntlClientProvider messages={messages}>
          <RootProvider>{children}</RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

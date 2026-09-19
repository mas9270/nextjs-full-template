// src/app/[locale]/layout.tsx
import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/navigation";
import { RootProvider } from "@/providers/root-provider";
import "@/app/globals.css";
import { getHtmlDirectionProps } from "@/utils/utils";
import localFont from "next/font/local";
import clsx from "clsx";

const iranYekan = localFont({
  src: [
    {
      path: "../../../public/fonts/iran-yekan/IRANYekanXFaNum-Light.woff",
      weight: "300",
    },
    {
      path: "../../../public/fonts/iran-yekan/IRANYekanXFaNum-Regular.woff",
      weight: "400",
    },
    {
      path: "../../../public/fonts/iran-yekan/IRANYekanXFaNum-Medium.woff",
      weight: "500",
    },
    {
      path: "../../../public/fonts/iran-yekan/IRANYekanXFaNum-Bold.woff",
      weight: "700",
    },
  ],
  variable: "--font-iran-yekan",
});


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
      <body
        className={clsx(
          "h-screen w-screen bg-background text-foreground antialiased transition-colors duration-200",
          iranYekan.variable,
          "font-sans",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <RootProvider>{children}</RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

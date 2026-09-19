// src/app/[locale]/layout.tsx

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/navigation";
import { RootProvider } from "@/providers/root-provider";
import { getHtmlDirectionProps } from "@/utils/utils";
import localFont from "next/font/local";
import clsx from "clsx";
import "@/app/globals.css";

const iranYekan = localFont({
  src: [
    {
      path: "../../../public/fonts/iran-yekan/IRANYekanXFaNum-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/iran-yekan/IRANYekanXFaNum-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/iran-yekan/IRANYekanXFaNum-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/iran-yekan/IRANYekanXFaNum-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iran-yekan",
  display: "swap",
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
          "h-dvh w-dvw bg-background transition-colors duration-200",
          iranYekan.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <RootProvider>{children}</RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
export type Locale = "fa" | "en";
export const locales: Locale[] = ["fa", "en"];
export const defaultLocale: Locale = "fa";

export function getLocaleDirection(locale: string): "rtl" | "ltr" {
  switch (locale) {
    case "fa":
      return "rtl";
    case "en":
      return "ltr";
    default:
      return "rtl";
  }
}

export function getHtmlDirectionProps(locale: string) {
  return { lang: locale, dir: getLocaleDirection(locale) };
}

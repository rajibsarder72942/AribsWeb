import en from "./en.json";
import ar from "./ar.json";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type TranslationKey = keyof typeof en;
const dictionaries: Record<Locale, Record<TranslationKey, string>> = { en, ar };

// Open Graph locale codes
export const ogLocales: Record<Locale, string> = { en: "en_US", ar: "ar_OM" };

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

// Falls back to English when an Arabic key is missing.
export function useTranslations(locale: Locale) {
  return (key: TranslationKey): string => dictionaries[locale][key] ?? dictionaries.en[key];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}

// "/en/" for slug "", "/ar/about/" for slug "about".
export function localizedPath(locale: Locale, slug = ""): string {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

// Same page in another locale: "/en/about/" -> "/ar/about/".
export function switchLocalePath(pathname: string, target: Locale): string {
  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return localizedPath(target, rest);
}

// Shared getStaticPaths for pages under src/pages/[locale]/.
export function localeStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

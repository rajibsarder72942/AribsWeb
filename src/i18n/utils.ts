import en from "./en.json";
import ar from "./ar.json";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

type Key = keyof typeof en;
const dictionaries: Record<Locale, Record<Key, string>> = { en, ar };

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

// Falls back to English when an Arabic key is missing.
export function useTranslations(locale: Locale) {
  return (key: Key): string => dictionaries[locale][key] ?? dictionaries.en[key];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}

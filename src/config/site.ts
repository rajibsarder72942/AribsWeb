import { PUBLIC_NOINDEX, PUBLIC_WHATSAPP_NUMBER } from "astro:env/client";

// Central site settings. Brand and contact values are placeholders until real data is ready.
export const siteConfig = {
  name: "ARIBS",
  country: "Oman",
  // Digits only (international format without "+"); empty hides the WhatsApp button.
  whatsappNumber: (PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  noindex: PUBLIC_NOINDEX ?? false,
  crNumber: "0000000",
} as const;

export const navItems = [
  { key: "nav.home", slug: "" },
  { key: "nav.about", slug: "about" },
  { key: "nav.products", slug: "products" },
  { key: "nav.contact", slug: "contact" },
] as const;

import { PUBLIC_WHATSAPP_NUMBER } from "astro:env/client";

// Central site settings. Brand values are placeholders until assets are ready.
export const siteConfig = {
  name: "ARIBS",
  country: "Oman",
  whatsappNumber: PUBLIC_WHATSAPP_NUMBER ?? "",
} as const;

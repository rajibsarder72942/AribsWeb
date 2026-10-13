// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

// Production URL comes from env (.env or Cloudflare) so the domain is never hardcoded.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const site = PUBLIC_SITE_URL || "http://localhost:4321";

export default defineConfig({
  site,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_WHATSAPP_NUMBER: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_FROM_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

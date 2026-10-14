import type { APIRoute } from "astro";
import { siteConfig } from "../config/site";

// Built at build time: PUBLIC_NOINDEX=true (staging) blocks all crawlers.
export const GET: APIRoute = () => {
  const body = siteConfig.noindex ? "User-agent: *\nDisallow: /\n" : "User-agent: *\nAllow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};

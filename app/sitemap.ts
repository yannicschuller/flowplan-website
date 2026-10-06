import type { MetadataRoute } from "next";
import { websiteUrl } from "@/lib/links";

// Addresses come from WEBSITE_URL at runtime.
export const dynamic = "force-dynamic";

// The start page in German and English, each pointing to the other.
export default function sitemap(): MetadataRoute.Sitemap {
  const site = websiteUrl();
  const languages = { de: `${site}/de`, en: `${site}/en`, "x-default": `${site}/` };
  return (["de", "en"] as const).map((locale) => ({
    url: `${site}/${locale}`,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}

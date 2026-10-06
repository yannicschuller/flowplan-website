import type { MetadataRoute } from "next";
import { websiteUrl } from "@/lib/links";

// Addresses come from WEBSITE_URL at runtime.
export const dynamic = "force-dynamic";

// Open to search engines and AI crawlers alike; /llms.txt sums up Flowplan.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${websiteUrl()}/sitemap.xml`,
    host: websiteUrl(),
  };
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { localePrefix, requestLocale } from "@/lib/i18n-server";
import { websiteUrl } from "@/lib/links";
import { ogLocale, siteDescription } from "@/lib/seo";
import { LocaleProvider } from "@/components/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  const de = locale === "de";
  const title = de
    ? "Flowplan – Open-Source-Arbeitsbereich für Dokumente, Datenbanken und Whiteboards"
    : "Flowplan – Open-source workspace for documents, databases and whiteboards";
  const description = siteDescription(locale);
  return {
    metadataBase: new URL(websiteUrl()),
    title,
    description,
    applicationName: "Flowplan",
    keywords: de
      ? ["Notion Alternative", "AppFlowy Alternative", "Open Source", "Wiki", "Wissensdatenbank", "Projektmanagement", "Whiteboard", "Journal", "selbst hosten", "Self-Hosting", "DSGVO", "Hosting in Deutschland"]
      : ["Notion alternative", "AppFlowy alternative", "open source", "wiki", "knowledge base", "project management", "whiteboard", "journal", "self-hosted", "GDPR", "hosted in Germany"],
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    alternates: {
      canonical: `/${locale}`,
      languages: { de: "/de", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "Flowplan",
      title,
      description,
      url: `/${locale}`,
      locale: ogLocale(locale),
      alternateLocale: [ogLocale(de ? "en" : "de")],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Flowplan" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: "/icons/apple-touch-icon.png",
    },
  };
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfbf8" },
    { media: "(prefers-color-scheme: dark)", color: "#16151b" },
  ],
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await requestLocale();
  const prefix = await localePrefix();
  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          href="/fonts/instrument-sans-latin-standard-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link rel="stylesheet" href="/fonts.css" />
        <link rel="alternate" type="text/plain" href={`${prefix}/llms.txt`} title="llms.txt" />
      </head>
      <body>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

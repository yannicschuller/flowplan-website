import type { Metadata, Viewport } from "next";
import "./globals.css";
import { requestLocale } from "@/lib/i18n-server";
import { LocaleProvider } from "@/components/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const de = (await requestLocale()) === "de";
  return {
    title: de ? "Flowplan — Dein Raum für Ideen" : "Flowplan — Room for your ideas",
    description: de ? "Dokumente, Datenbanken, Whiteboards und Journal. Open Source, bei uns in Deutschland oder bei euch." : "Documents, databases, whiteboards and a journal. Open source, hosted by us in Germany or by you.",
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
      </head>
      <body>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

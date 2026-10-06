// What search engines and language models learn about Flowplan from the
// website: the start page in German (/de) and English (/en), the adaptive
// address / as x-default, and schema.org data built from the page's copy.
import { landingCopy } from "@/components/landing/copy";
import type { Locale } from "./i18n";
import { appUrl, docsUrl, GITHUB_URL, websiteUrl } from "./links";

export const ogLocale = (locale: Locale) => (locale === "de" ? "de_DE" : "en_US");

export function siteDescription(locale: Locale) {
  return locale === "de"
    ? "Flowplan ist der Open-Source-Arbeitsbereich für Dokumente, Datenbanken, Whiteboards und ein tägliches Journal – eine Alternative zu Notion und AppFlowy. Gehostet in Deutschland oder auf dem eigenen Server, ohne Tracking."
    : "Flowplan is the open-source workspace for documents, databases, whiteboards and a daily journal – an alternative to Notion and AppFlowy. Hosted in Germany or on your own server, without tracking.";
}

export function structuredData(locale: Locale) {
  const c = landingCopy[locale];
  const site = websiteUrl();
  const features = c.index.groups.flatMap((g: { items: readonly string[] }) => g.items);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}/#organization`,
        name: "Flowplan",
        url: site,
        logo: `${site}/icons/icon-512.png`,
        sameAs: [GITHUB_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        name: "Flowplan",
        url: site,
        inLanguage: ["de", "en"],
        publisher: { "@id": `${site}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site}/#software`,
        name: "Flowplan",
        url: site,
        description: siteDescription(locale),
        applicationCategory: "BusinessApplication",
        applicationSubCategory: locale === "de" ? "Wissensmanagement und Zusammenarbeit" : "Knowledge management and collaboration",
        operatingSystem: "Web, macOS, Windows, Linux (Docker)",
        inLanguage: ["de", "en"],
        license: "https://www.gnu.org/licenses/agpl-3.0.html",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", description: locale === "de" ? "Open Source, selbst gehostet" : "Open source, self-hosted" },
        featureList: features,
        softwareHelp: { "@type": "CreativeWork", url: `${docsUrl()}/${locale}` },
        installUrl: `${docsUrl()}/${locale}/installation`,
        downloadUrl: "https://github.com/yannicschuller/flowplan/pkgs/container/flowplan",
        sameAs: [GITHUB_URL, appUrl()],
        publisher: { "@id": `${site}/#organization` },
      },
      {
        "@type": "SoftwareSourceCode",
        name: "Flowplan",
        codeRepository: GITHUB_URL,
        programmingLanguage: "TypeScript",
        license: "https://www.gnu.org/licenses/agpl-3.0.html",
        targetProduct: { "@id": `${site}/#software` },
      },
    ],
  };
}
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });

// llms.txt (https://llmstxt.org): the facts about Flowplan in plain Markdown.
export function llmsText(locale: Locale) {
  const c = landingCopy[locale];
  const de = locale === "de";
  const docs = docsUrl();
  const lines = [
    "# Flowplan",
    "",
    `> ${siteDescription(locale)}`,
    "",
    de
      ? "- Lizenz: AGPL-3.0, Quellcode auf GitHub\n- Gehostet: app.flowplan.org, Server in Deutschland\n- Selbst gehostet: ein Docker-Container (Next.js, SQLite, optional S3-Sicherung), Image ghcr.io/yannicschuller/flowplan\n- Anmeldung: E-Mail und Passwort, Passkeys, Single Sign-on (OIDC)\n- Sprachen: Deutsch und Englisch\n- Plattformen: Browser (Desktop und Handy), Web-App mit Push, Desktop-Apps für macOS und Windows, offline auf Wunsch\n- Keine KI-Funktionen, kein Tracking, keine Weitergabe an Dritte"
      : "- License: AGPL-3.0, source code on GitHub\n- Hosted: app.flowplan.org, servers in Germany\n- Self-hosted: one Docker container (Next.js, SQLite, optional S3 backup), image ghcr.io/yannicschuller/flowplan\n- Sign-in: e-mail and password, passkeys, single sign-on (OIDC)\n- Languages: German and English\n- Platforms: browser (desktop and phone), web app with push, desktop apps for macOS and Windows, offline on request\n- No AI features, no tracking, no sharing with third parties",
    "",
    de ? "## Funktionen" : "## Features",
    "",
  ];
  for (const group of c.index.groups as { title: string; items: readonly string[] }[]) {
    lines.push(`### ${group.title}`, "", ...group.items.map((item) => `- ${item}`), "");
  }
  lines.push(
    de ? "## Links" : "## Links",
    "",
    `- [${de ? "Dokumentation" : "Documentation"}](${docs}/${locale}): ${de ? "jede Funktion und das Selbst-Hosten" : "every feature and self-hosting"}`,
    `- [${de ? "Dokumentation für Sprachmodelle" : "Documentation for language models"}](${docs}${de ? "/de" : ""}/llms.txt)`,
    `- [${de ? "Installation mit Docker" : "Installation with Docker"}](${docs}/${locale}/installation)`,
    `- [${de ? "Quellcode" : "Source code"}](${GITHUB_URL})`,
    `- [${de ? "Gehostete App" : "Hosted app"}](${appUrl()})`,
    `- [${de ? "Vorlagengalerie" : "Template gallery"}](${appUrl()}/templates)`,
    "",
  );
  return lines.join("\n");
}

import { BrandMark } from "@/components/brand-mark";
import { serverT } from "@/lib/i18n-server";

export default async function NotFound() {
  const t = await serverT();
  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeContent: "center", gap: 16, textAlign: "center", padding: 24 }}>
      <a href="/" aria-label="Flowplan" style={{ justifySelf: "center" }}>
        <BrandMark size={44} />
      </a>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 40, margin: 0 }}>
        {t("Seite nicht gefunden", "Page not found")}
      </h1>
      <p style={{ color: "var(--secondary)", margin: 0 }}>
        <a href="/" style={{ color: "var(--blue)" }}>
          {t("Zur Startseite", "Back to the start page")}
        </a>
      </p>
    </main>
  );
}

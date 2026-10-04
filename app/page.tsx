import Landing from "@/components/landing/landing";
import { OldAppLinks } from "@/components/old-app-links";
import { appUrl, docsUrl } from "@/lib/links";

// Rendered per request: the app decides whether sign-ups and the demo are open.
export const dynamic = "force-dynamic";

type SiteInfo = { signupOpen: boolean; demo: boolean; sso: boolean };

// What the app offers right now (administration settings). If the app cannot
// be reached, signing up stays visible and the demo is hidden.
async function siteInfo(): Promise<SiteInfo> {
  try {
    const response = await fetch(`${appUrl()}/api/site-info`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    });
    if (response.ok) return (await response.json()) as SiteInfo;
  } catch {}
  return { signupOpen: true, demo: false, sso: false };
}

export default async function Home() {
  const app = appUrl();
  const info = await siteInfo();
  return (
    <>
      <OldAppLinks app={app} />
      <Landing
        loginHref={`${app}/login`}
        registerHref={info.signupOpen ? `${app}/register` : undefined}
        demoHref={info.demo ? `${app}/demo` : undefined}
        docsHref={docsUrl()}
        templatesHref={`${app}/templates`}
      />
    </>
  );
}

// Addresses of the other Flowplan sites. Set at runtime (Coolify, Docker):
// APP_URL, DOCS_URL and WEBSITE_URL; the defaults are flowplan.org's.
const clean = (value: string | undefined, fallback: string) => (value || fallback).replace(/\/$/, "");
export const appUrl = () => clean(process.env.APP_URL, "https://app.flowplan.org");
export const docsUrl = () => clean(process.env.DOCS_URL, "https://docs.flowplan.org");
export const websiteUrl = () => clean(process.env.WEBSITE_URL, "https://flowplan.org");
export const GITHUB_URL = "https://github.com/yannicschuller/flowplan";

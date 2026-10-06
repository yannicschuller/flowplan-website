// The reader's language on the server. Addresses under /de and /en fix the
// language (proxy.ts sets a header); other addresses follow the cookie or
// the browser.
import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, isLocale, pickLocale, translate, type Locale } from "./i18n";

export const LOCALE_HEADER = "x-flowplan-locale";

export async function requestLocale(): Promise<Locale> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const fixed = headerStore.get(LOCALE_HEADER);
  if (isLocale(fixed)) return fixed;
  return pickLocale(cookieStore.get(LOCALE_COOKIE)?.value, headerStore.get("accept-language"));
}
// "/en" on English addresses, "/de" on German ones, "" on adaptive ones, so
// links stay in the language the page was opened in.
export async function localePrefix(): Promise<string> {
  const fixed = (await headers()).get(LOCALE_HEADER);
  return isLocale(fixed) ? `/${fixed}` : "";
}
export async function serverT() {
  return translate(await requestLocale());
}

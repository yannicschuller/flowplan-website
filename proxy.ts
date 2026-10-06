import { NextResponse, type NextRequest } from "next/server";
import { appUrl, docsUrl } from "@/lib/links";
import { LOCALE_HEADER } from "@/lib/i18n-server";

// flowplan.org used to serve the app and the docs as well. Their addresses
// (shared pages, forms, sign-in, the docs) now live on app.flowplan.org and
// docs.flowplan.org; old links are sent there.
const appPaths = /^\/(login|register|reset|share|share-target|forms|templates|api\/auth)(\/|$)/;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // /de and /en: the start page in a fixed language (one address per
  // language for search engines), likewise /de/llms.txt.
  const fixed = pathname.match(/^\/(de|en)(\/.*)?$/);
  if (fixed) {
    const url = request.nextUrl.clone();
    url.pathname = fixed[2] || "/";
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, fixed[1]);
    return NextResponse.rewrite(url, { request: { headers } });
  }
  if (pathname === "/docs" || pathname.startsWith("/docs/"))
    return NextResponse.redirect(`${docsUrl()}${pathname.slice(5) || "/"}${search}`, 308);
  if (appPaths.test(pathname)) return NextResponse.redirect(`${appUrl()}${pathname}${search}`, 308);
  return NextResponse.next();
}

export const config = {
  matcher: ["/de", "/en", "/de/:path*", "/en/:path*", "/docs/:path*", "/docs", "/login", "/register", "/reset", "/share/:path*", "/share-target", "/forms/:path*", "/templates/:path*", "/templates", "/api/auth/:path*"],
};

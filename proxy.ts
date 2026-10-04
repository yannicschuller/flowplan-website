import { NextResponse, type NextRequest } from "next/server";
import { appUrl, docsUrl } from "@/lib/links";

// flowplan.org used to serve the app and the docs as well. Their addresses
// (shared pages, forms, sign-in, the docs) now live on app.flowplan.org and
// docs.flowplan.org; old links are sent there.
const appPaths = /^\/(login|register|reset|share|share-target|forms|templates|api\/auth)(\/|$)/;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/docs" || pathname.startsWith("/docs/"))
    return NextResponse.redirect(`${docsUrl()}${pathname.slice(5) || "/"}${search}`, 308);
  if (appPaths.test(pathname)) return NextResponse.redirect(`${appUrl()}${pathname}${search}`, 308);
  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:path*", "/docs", "/login", "/register", "/reset", "/share/:path*", "/share-target", "/forms/:path*", "/templates/:path*", "/templates", "/api/auth/:path*"],
};

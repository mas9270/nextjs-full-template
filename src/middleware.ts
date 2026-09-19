import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./navigation";
import { verifyToken } from "./lib/auth";

const handleI18n = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const response = handleI18n(req);

  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = routing.locales.includes(segments[0] as any)
    ? segments[0]
    : routing.defaultLocale;

  const pathWithoutLocale = routing.locales.includes(segments[0] as any)
    ? `/${segments.slice(1).join("/")}`
    : pathname;

  const token = req.cookies.get("token")?.value;
  const user = token ? await verifyToken(token) : null;
  const isLoggedIn = !!user;

  const isAuthRoute = pathWithoutLocale.startsWith("/auth");
  const isProtectedPanel = pathWithoutLocale.startsWith("/control-panel");

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${currentLocale}/main`, req.url));
  }

  if (isProtectedPanel) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/${currentLocale}/main`, req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/:path*"],
};

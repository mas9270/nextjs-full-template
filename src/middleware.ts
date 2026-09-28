import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./navigation";
import { verifyToken } from "./lib/auth";

const handleI18n = createMiddleware(routing);

type AppLocale = (typeof routing.locales)[number];

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] as AppLocale;

  const currentLocale: AppLocale = routing.locales.includes(firstSegment)
    ? firstSegment
    : routing.defaultLocale;

  const pathWithoutLocale = routing.locales.includes(firstSegment)
    ? `/${segments.slice(1).join("/")}`
    : pathname;

  const token = req.cookies.get("token")?.value;
  const user = token ? await verifyToken(token) : null;
  const isLoggedIn = !!user;

  const isAuthRoute = pathWithoutLocale.startsWith("/auth");
  const isProtectedPanel = pathWithoutLocale.startsWith("/control-panel");

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${currentLocale}/control-panel`, req.url));
  }

  if (isProtectedPanel && !isLoggedIn) {
    const loginUrl = new URL(`/${currentLocale}/auth`, req.url);
    const fullTarget = `${pathname}${search}`;
    loginUrl.searchParams.set("callbackUrl", fullTarget);
    return NextResponse.redirect(loginUrl);
  }

  return handleI18n(req);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/:path*"],
};

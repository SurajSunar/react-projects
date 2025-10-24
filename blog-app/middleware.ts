import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/profile", "/post/create", "/post/edit"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = getSessionCookie(request);

  const matchPath = protectedRoutes.some((path) => pathname.startsWith(path));

  if (matchPath && !session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (pathname === "/auth" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/profile/:path*", "/post/create", "/post/edit/:path*"],
};

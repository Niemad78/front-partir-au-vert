import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMyRole, verifyMe } from "./lib/api/resources/user/user";

const PUBLIC_ENABLED = process.env.PUBLIC_ENABLED === "true";

const PUBLIC_ALLOWLIST = [
  "/login",
  "/_next",
  "/images",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/maintenance",
  "/api",
];

function isAllowlisted(pathname: string) {
  return PUBLIC_ALLOWLIST.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (isAllowlisted(url.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session")?.value;

  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      const payload = await verifyMe({ token });

      if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!payload.ok) {
          return NextResponse.redirect("/login");
        }
      }

      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("session");
      return res;
    }
  }

  if (PUBLIC_ENABLED) {
    return NextResponse.next();
  }

  if (!token) {
    url.pathname = "/maintenance";
    return NextResponse.redirect(url);
  }

  const role = await getMyRole({ token });

  if (!role.ok) {
    url.pathname = "/maintenance";
    return NextResponse.redirect(url);
  }

  if (role.role === "admin" || role.role === "super_admin") {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

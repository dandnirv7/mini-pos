import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  const isDashboardPage = pathname.startsWith("/dashboard");
  const isOverviewPage = pathname === "/dashboard/overview";
  const isCheckoutPage = pathname === "/user/checkout";
  const isUserPage = pathname.startsWith("/user");
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isHomePage = pathname === "/";
  const isSettingsPage = pathname.startsWith("/user/settings");

  const isAdmin = token?.role === "ADMIN";
  const isUser = token?.role === "USER";

  if (isDashboardPage) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isUserPage) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    if (!isUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isCheckoutPage && isUser) {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  if (isAuthenticated && (isHomePage || isAuthPage)) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (isUser) {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  if (isOverviewPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isSettingsPage && isUser) {
    return NextResponse.redirect(new URL("/user/settings/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/user/:path*",
    "/login",
    "/register",

    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

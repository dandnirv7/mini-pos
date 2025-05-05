import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
  const isOverviewPage = req.nextUrl.pathname === "/dashboard/overview";
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  const isAdmin = token?.role === "admin";

  if (isDashboardPage && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isDashboardPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isOverviewPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",

    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};

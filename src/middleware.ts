import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const role = (token?.role as string) || "member";

    // ১. /admin রুটে শুধুমাত্র অ্যাডমিন ঢুকতে পারবে
    if (pathname.startsWith("/admin") && role !== "admin") {
      if (role === "manager") {
        return NextResponse.redirect(new URL("/manager", req.url));
      }
      return NextResponse.redirect(new URL("/member", req.url));
    }

    // ২. /manager রুটে অ্যাডমিন এবং ম্যানেজার ঢুকতে পারবে
    if (pathname.startsWith("/manager") && role !== "manager" && role !== "admin") {
      return NextResponse.redirect(new URL("/member", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/manager/:path*",
    "/member/:path*",
    "/meals/:path*",
    "/bazaar/:path*",
    "/members-list/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};

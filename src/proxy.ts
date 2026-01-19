import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Redirect authenticated users away from login page
    if (req.nextUrl.pathname === "/admin" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin dashboard routes - require authentication
        if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {
          return !!token;
        }
        // Allow access to admin login page for everyone
        if (req.nextUrl.pathname === "/admin") {
          return true;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};

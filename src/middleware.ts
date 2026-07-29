import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    
    if (path.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      
      // Force password change if required
      if (token.mustChangePassword && path !== "/dashboard/change-password") {
        return NextResponse.redirect(new URL("/dashboard/change-password", req.url));
      }
      
      // If trust member tries to go to admin dashboard
      if (token.role === "trust_member" && path === "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard/trust-member", req.url));
      }
      
      // If admin goes to /dashboard/trust-member, let them or redirect to /dashboard?
      // We'll let admin access everything for simplicity or redirect.
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*"]
};

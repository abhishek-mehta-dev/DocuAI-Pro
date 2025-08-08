import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Log middleware trigger in your Next.js server console
  console.log("[Middleware] Checking request:", url.pathname);

  if (url.pathname.startsWith("/user")) {
    const token = req.cookies.get("access_token");
    console.log("[Middleware] access_token:", token);

    if (!token) {
      console.log("[Middleware] No token found, redirecting to /sign-in");
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  // Add a custom header to verify middleware ran (check in browser network tab)
  const response = NextResponse.next();
  response.headers.set("x-middleware-executed", "true");

  return response;
}

export const config = {
  matcher: ["/user/:path*"], // middleware runs only for /user/* routes
};

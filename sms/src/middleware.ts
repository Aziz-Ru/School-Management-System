import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./session";

const publicRoutes = ["/login", "/signup", "/", "/home"];
const adminRoutes = ["/dashboard"];
const teacherRoutes = ["/teacher"];
const studentRoutes = ["/student"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname; // Get the pathname instead of full URL

  // Check if it's a public route
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  const session = req.cookies.get("__session")?.value; // Use req.cookies instead of cookies()

  if (!session) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  try {
    const { user } = await decrypt(session);

    // Check routes based on user role
    if (user.role === "ADMIN") {
      // For admin routes, check if the current path starts with /dashboard
      if (!path.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } else if (user.role === "TEACHER") {
      if (!path.startsWith("/teacher")) {
        return NextResponse.redirect(new URL("/teacher", req.url));
      }
    } else if (user.role === "STUDENT") {
      if (!path.startsWith("/student")) {
        return NextResponse.redirect(new URL("/student", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error decrypting the session, redirect to home
    return NextResponse.redirect(new URL("/home", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

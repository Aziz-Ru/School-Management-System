import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup", "/home"];
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

  return NextResponse.next();
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

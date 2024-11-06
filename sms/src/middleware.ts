import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "hom/details/infrastructure",
  "/details/code-of-conduct",
  "/details/mission-vision",
  "/home",
];
const adminRoutes = ["/dashboard"];
const teacherRoutes = ["/teacher"];
const studentRoutes = ["/student"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname; // Get the pathname instead of full URL
  const regex = new RegExp(/home*/);
  // Check if it's a public route
  if (regex.test(path)) {
    return NextResponse.next();
  }

  const session = req.cookies.get("__session")?.value; // Use req.cookies instead of cookies()

  if (!session) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};

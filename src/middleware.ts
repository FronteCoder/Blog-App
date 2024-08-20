import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const publicPath = ["/login", "/register"];
  const currentPath = request.nextUrl.pathname;
  const getCookies = cookies();
  const token = getCookies.get("token")?.value || "";

  if (token && publicPath.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", request.nextUrl
    ));
  } else if(!token && 
    !publicPath.includes(currentPath))
   {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
export const config={
    matcher:['/login','/register']
}
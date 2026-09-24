import { NextResponse } from "next/server";
import { auth } from "./auth";
import getLoggedUser from "./data/Auth";

export default auth(async function proxy(request) {

  if (request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(
      new URL("/dashboard/overview", request.nextUrl.origin)
    );
  }

  // NextAuth user
  // const sessionUser = request.auth;
  // console.log('+++++++++++++++++ User', sessionUser)

  // Your existing authentication
  const user = await getLoggedUser();
  console.log('+++++++++++++++++ User', user)

  // Neither authentication exists
  if (user instanceof Response || user === 'null') {
    return NextResponse.redirect(
      new URL("/login", request.nextUrl.origin)
    );
  }

  const userId = request.cookies.get("userId");

  if (!userId && user === 'null') {
    console.log('useid')
    return NextResponse.redirect(
      new URL("/login", request.nextUrl.origin)
    );
  }
  return NextResponse.next()
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path"]
};

import { NextResponse } from "next/server";

export function proxy(request) {
    const userId = request.cookies.get('userId')

    if (!userId) {
        return NextResponse.redirect(new URL('/login', request.nextUrl.origin))
    } else {
        return NextResponse.redirect(new URL('/dashboard/overview', request.nextUrl.origin))
    }
}

export const config = {
    matcher: ['/dashboard'],
}

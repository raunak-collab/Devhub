import { NextResponse } from "next/server";
import getLoggedUser from "./data/Auth";

export async function proxy(request) {

    const user = await getLoggedUser()

    if (user instanceof Response) {
        return NextResponse.redirect(new URL('/login', request.nextUrl.origin))
    }

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

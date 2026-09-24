"use server";

import { signIn, auth } from "../auth";

export async function googleLogin() {
    await signIn("google", {
        redirectTo: '/dashboard/overview'
    });
}

export async function githubLogin() {
    await signIn("github", {
        redirectTo: '/dashboard/overview'
    });
}

export default async function oAuthUser() {
    const session = await auth()
    const user = session?.user

    if (!user) return null
    return user
}
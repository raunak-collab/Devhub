"use server";

import { signIn } from "../auth";

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

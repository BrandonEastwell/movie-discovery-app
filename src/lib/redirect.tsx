import { NextResponse } from "next/server";

export function RedirectToLogin({ error }: { error: string }) {
    // Determine the URL of the login page
    const loginPageUrl = `/login?error=${encodeURIComponent(error)}`;

    // Return a redirect response with the login page URL
    return NextResponse.redirect(loginPageUrl);
}
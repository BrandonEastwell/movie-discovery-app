import {NextRequest, NextResponse} from 'next/server'
import {TokenExpiredError} from "jsonwebtoken";
import {AuthService} from "./lib/services/authService";

export const config = {
    runtime: 'nodejs', // Force Node.js runtime (avoids Edge restrictions)
};

export async function middleware(req: NextRequest) {
    const {origin} = req.nextUrl;
    let res = NextResponse;
    const protectedPaths = ['/account'];
    const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));
    const isAuthPath = req.nextUrl.pathname.startsWith('/auth');

    try {
        const { isLoggedIn } = await AuthService.getAuthStateFromRequestHeader(req);

        if (isProtectedPath && !isLoggedIn) {
            res.json({error: 'User must be login to access this path'}, {status: 400});
            return res.redirect(new URL(`${origin}/login`));
        }

        if (isAuthPath) {
            return res.redirect(new URL(`/`, req.url));
        }

        console.log('MIDDLEWARE: Authentication Successful');

    } catch (error) {
        if (isProtectedPath) {
            if (error instanceof TokenExpiredError) {
                return res.redirect(new URL(`${origin}/auth/login?expired=true`));
            } else {
                // If JWT verification fails, redirect to the login.tsx
                console.error('Error verifying token: ', error);
                console.log('MIDDLEWARE: REDIRECTING TO ' + `${origin}/auth/login`);
                return res.redirect(new URL(`${origin}/auth/login`));
            }
        }
    }

    return NextResponse.next();
}

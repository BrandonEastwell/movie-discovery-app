import {NextRequest, NextResponse} from 'next/server'
import {TokenExpiredError, verify} from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const { origin } = req.nextUrl;
    let res = NextResponse;

    const token = req.cookies.get('token')?.value;
    const protectedPaths = ['/account'];
    const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));
    const isAuthPath = req.nextUrl.pathname.startsWith('/login');

    if (isProtectedPath && !token) {
        res.json({ error: 'Token not found' }, { status: 400 });
        return res.redirect(new URL(`${origin}/login`));
    }

    if (token) {
        try {
            // Decode JWT token
            const decodedToken = verify(token, `${process.env.JWT_SECRET}`) as { username: string, userid: number };
            console.log('MIDDLEWARE: Authentication Successful');

            if (isAuthPath) {
                return res.redirect(new URL(`/`, req.url));
            }

        } catch (error) {
            if (isProtectedPath) {
                if (error instanceof TokenExpiredError) {
                    return res.redirect(new URL(`${origin}/login?expired=true`));
                } else {
                    // If JWT verification fails, redirect to the login.tsx
                    console.error('Error verifying JWT token:', error);
                    console.log('MIDDLEWARE: REDIRECTING TO ' + `${origin}/login`);
                    return res.redirect(new URL(`${origin}/login`));
                }
            }
        }
    }

    return NextResponse.next();
}

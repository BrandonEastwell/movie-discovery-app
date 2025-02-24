import {NextRequest, NextResponse} from 'next/server'
import jwt, {TokenExpiredError} from "jsonwebtoken";

export const config = {
    matcher: ['/account/:path*']
}

export function middleware(req: NextRequest) {
    const {origin } = req.nextUrl;
    let userid: number | undefined = undefined;

    try {
        const cookieHeader = req.headers.get('cookie');
        if (!cookieHeader) {
            return NextResponse.redirect(new URL(`${origin}/login`));
        }

        const tokenMatch = cookieHeader.match(/token=([^;]+)/);
        if (!tokenMatch || tokenMatch.length < 2) {
            return NextResponse.redirect(new URL(`${origin}/login`));
        }

        const token = tokenMatch[1];

        if (token) {
            // Decode JWT token
            const decodedToken = jwt.decode(token) as { username: string; userid: number };
            userid = decodedToken.userid
            console.log('MIDDLEWARE: Authentication Successful');
        }
        console.log(req.nextUrl.pathname.startsWith)
        if (req.nextUrl.pathname === '/account') {
            if (userid !== undefined) {
                console.log('MIDDLEWARE: REDIRECTING TO ' + `${origin}/account/${userid}`);
                return NextResponse.redirect(new URL(`${origin}/account/${userid}`))
            } else {
                console.log('MIDDLEWARE: REDIRECTING TO ' + `${origin}/login`);
                return NextResponse.redirect(new URL(`${origin}/login`));
            }
        }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return NextResponse.redirect(new URL(`${origin}/login?expired=true`));
        } else {
            console.error('Error verifying JWT token:', error);
            // If JWT verification fails for another reason, redirect to the login.tsx page
            return NextResponse.redirect(new URL(`${origin}/login`));
        }
    }
}

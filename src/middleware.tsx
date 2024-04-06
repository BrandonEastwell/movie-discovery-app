import {NextRequest, NextResponse} from 'next/server'
import jwt, {verify} from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const { cookies } = req;
    const {origin } = req.nextUrl;
    const jwt = cookies.get("auth-token")?.value
    const protectedPaths = ['/dashboard']
    protectedPaths.forEach((path) => {
        if (req.url.includes(path)) {
            if (!jwt) {
                return NextResponse.redirect(new URL(`${origin}/login`))
            }
            try {
                const decoded = verify(jwt, `${process.env.JWT_SECRET}`);
            } catch (e) {
                console.log(e)
                return NextResponse.redirect(new URL(`${origin}/login`))
            }
        }
    })
    return NextResponse.next()
}
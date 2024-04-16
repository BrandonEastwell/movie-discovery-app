import {TokenExpiredError, verify} from "jsonwebtoken";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    console.log('AUTH SESSION Request Headers:', req.headers);

    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
        return NextResponse.json({ error: 'Cookie header not found' }, { status: 400 });
    }

    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    if (!tokenMatch || tokenMatch.length < 2) {
        return NextResponse.json({ error: 'Token not found in the cookie header' }, { status: 400 });
    }

    const token = tokenMatch[1];

    if (token != undefined) {
        try {
            const decodedToken = verify(token, `${process.env.JWT_SECRET}`) as { username: string, userid: number };
            const {username, userid} = decodedToken;
            console.log('Authentication Successful')
            return NextResponse.json({ message: 'Authentication Successful', userid: userid, username: username }, {status: 201});
        } catch (error) {
            console.error('Error authenticating user:', error);
            if (error instanceof TokenExpiredError) {
                return NextResponse.redirect(new URL(`${origin}/login?expired=true`));
            } else {
                console.error('Error verifying JWT token:', error);
                // If JWT verification fails for another reason, redirect to the login page
                return NextResponse.redirect(new URL(`${origin}/login`));
            }
        }
    } else {
        return NextResponse.json({ error: 'Token does not exist'}, {status: 400});
    }
}
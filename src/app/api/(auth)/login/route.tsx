import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../lib/services/prisma";
import {cookies} from "next/headers";
import {AuthService} from "../../../../lib/services/authService";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const password = body.password;
    const username = body.username;

    try {
        // Find user by username
        const user = await AuthService.getFirstUserByUsername(username);

        if (!user) {
            return NextResponse.json({ success: false, error: 'Username does not exist', errorType: 'username' }, {status: 401});
        }

        // Compare passwords
        const passwordMatch = await AuthService.comparePasswords(password, user.encryptedpassword);
        if (!passwordMatch) {
            return NextResponse.json({ success: false, error: 'Password is incorrect', errorType: 'password' }, {status: 401});
        }

        // Generate JWT token
        const token = await AuthService.signToken(user.userid, user.username);

        if ((await cookies()).has('token')) {
            (await cookies()).delete("token");
        }

        let response = NextResponse.json({ success: true, error: '', errorType: '', userid: user.userid }, {status: 201});

        AuthService.setAuthCookieToResponse(response, token);

        return response;
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error', errorType: 'server' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
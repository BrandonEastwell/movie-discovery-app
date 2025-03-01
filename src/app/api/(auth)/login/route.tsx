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
            return NextResponse.json({ error: 'Username does not exist' }, {status: 401});
        }

        // Compare passwords
        const passwordMatch = await AuthService.comparePasswords(password, user.encryptedpassword);
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Password is incorrect' }, {status: 401});
        }

        // Generate JWT token
        const token = AuthService.signToken(user.userid, user.username);

        if ((await cookies()).has('token')) {
            (await cookies()).delete("token");
        }

        let response = NextResponse.json({ message: 'successful login' }, {status: 201});

        AuthService.setAuthCookieToResponse(response, token)

        return response;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
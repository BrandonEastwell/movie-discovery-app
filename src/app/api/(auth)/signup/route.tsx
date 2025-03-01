import { NextRequest, NextResponse } from 'next/server';
import {cookies} from "next/headers";
import { prisma } from "../../../../lib/services/prisma";
import {AuthService} from "../../../../lib/services/authService";
import {isPasswordValid} from "../../../../lib/utils/passwordUtils";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const password = body.password;
    const username = body.username;

    try {
        try {
            // Checks if password meets the check conditions required
            isPasswordValid(password);
        } catch (error) {
            return NextResponse.json({error: error}, {status: 400});
        }

        // Hash the password
        const hashedPassword = await AuthService.hashPassword(password);

        // Check if username already exists
        const user = await AuthService.getFirstUserByUsername(username);
        if (user) {
            return NextResponse.json({ error: 'Username already exists' }, {status: 400});
        }

        // Create user with hashed password and new username
        // Add user to database
        const createdUser = await AuthService.addUserToDB(username, hashedPassword);

        if ((await cookies()).has('token')) {
            return NextResponse.json({ error: 'User already signed in'}, {status: 400});
        }

        // Generate JWT token
        const token = AuthService.signToken(createdUser.userid, createdUser.username);

        let response = NextResponse.json({ message: 'User registered successfully' }, {status: 201});

        // Set secure to true in production
        AuthService.setAuthCookieToResponse(response, token)

        return response;
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
import { NextRequest, NextResponse } from 'next/server';
import {cookies} from "next/headers";
import { prisma } from "../../../../lib/services/prisma";
import {AuthService} from "../../../../lib/services/authService";
import {isPasswordValid} from "../../../../lib/utils/passwordUtils";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const password = body.password;
    const username = body.username;
    const authService = new AuthService();

    try {
        // Checks if password meets the check conditions required
        try {
            isPasswordValid(password);
        } catch (e) {
            return NextResponse.json({error: e}, {status: 400});
        }

        // Hash the password
        const hashedPassword = await authService.hashPassword(password);

        // Check if username already exists
        const existingUser = await authService.getFirstUserByUsername(username);
        if (existingUser) {
            return NextResponse.json({ error: 'Username already exists' }, {status: 400});
        }

        // Create user with hashed password and new username
        // Add user to database
        const newUser = await authService.addUserToDB(username, hashedPassword);

        if ((await cookies()).has('token')) {
            return NextResponse.json({ error: 'User already signed in'}, {status: 400});
        }

        // Generate JWT token
        const jwtToken = authService.signToken(newUser.userid, newUser.username);

        // Set secure to true in production
        (await cookies()).set('token', jwtToken, {httpOnly: true, maxAge: 21600, secure: false, path: '/', sameSite: 'lax'});

        return NextResponse.json({ message: 'User registered successfully', userid: newUser.userid, username: newUser.username }, {status: 201});
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
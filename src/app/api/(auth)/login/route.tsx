// apis/register.tsx
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers'


const prisma = new PrismaClient();
export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }

    //This will generate a random hexadecimal string of 32 bytes (256 bits) using node crypto library
    //const crypto = require('crypto');
    //const jwtSecretKey = crypto.randomBytes(32).toString('hex');
    //console.log("secret key:", jwtSecretKey);

    const body = await req.json();
    const password = body.password;
    const username = body.username;
    console.log(password);
    console.log(username);

    try {
        if (typeof password !== 'string' || password.trim().length === 0) {
            return NextResponse.json({ error: 'Password is required' }, {status: 400});
        } else {
            let len = password.length;
            if (len < 8) {
                return NextResponse.json({ error: 'Password must meet the safety conditions (8 character length)' }, {status: 400});
            }
            const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
            if (!regex.test(password)) {
                return NextResponse.json({ error: 'Password must meet the safety conditions (1 special character)' }, {status: 400});
            }

            let characters : string[] = [];
            let uppercase : boolean = false;
            for (let i = 0; i < len; i++) {
                const char : string = password.charAt(i);
                characters[i] = char;
                if (char == char.toUpperCase()) {
                    uppercase = true;
                }
            }
            if (!uppercase) {
                return NextResponse.json({ error: 'Password must meet the safety conditions (1 uppercase)' }, {status: 400});
            }
        }
        // Find user by username
        const user = await prisma.accounts.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            return NextResponse.json({ error: 'Password must meet the safety conditions (1 uppercase)' }, {status: 401});
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.encryptedpassword);
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Password must meet the safety conditions (1 uppercase)' }, {status: 401});
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userid }, `${process.env.JWT_SECRET}`, {
            expiresIn: `${process.env.JWT_EXPIRES_IN}`,
        });

        // Set token as a cookie or send it in the response body
        res = NextResponse.json({ token, data: {user}}, {status: 201});
        cookies().set('token', token, {httpOnly: true, maxAge: 3600, secure: true});
        return res;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
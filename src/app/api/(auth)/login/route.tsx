// api/login.tsx/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from "../../../../lib/prisma";
import {cookies} from "next/headers";

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

    try {
        if (typeof password !== 'string' || password.trim().length === 0) {
            return NextResponse.json({ error: 'Password is required' }, {status: 400});
        } else {
            let len = password.length;
            if (len < 8) {
                return NextResponse.json({ error: 'Password must meet the safety conditions (8 character length)' }, {status: 400});
            }
            const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?/|\\]/;
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
            return NextResponse.json({ error: 'Username does not exist' }, {status: 401});
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.encryptedpassword);
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Password does not match' }, {status: 401});
        }

        // Generate JWT token
        const jwtToken = jwt.sign({ userid: user.userid, username: user.username }, `${process.env.JWT_SECRET}`, {
           expiresIn: `${process.env.JWT_EXPIRES_IN}`
        });

        if ((await cookies()).has("token")) {
            (await cookies()).delete("token");
        }

        // Set token as a cookie using the response headers
        const cookieHeaderValue = `token=${jwtToken}; HttpOnly; Max-Age=21600; Path=/; SameSite=Lax Domain=localhost`;
        res = NextResponse.json({ message: 'Successful login.tsx', userid: user.userid, username: user.username }, {
            status: 201,
            headers: {
                'Set-Cookie': cookieHeaderValue
            }
        });
        console.log('LOGIN API Response Headers:', res.headers);
        return res;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
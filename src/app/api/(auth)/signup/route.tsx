'use server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }

    const body = await req.json();
    const password = body.password;
    const username = body.username;
    console.log(password);
    console.log(username);
    try {
        // Checks if password meets the conditions of a good password
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
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Check if username already exists
        const existingUser = await prisma.accounts.findFirst({
            where: {
                username,
            },
        });
        if (existingUser) {
            return NextResponse.json({ error: 'Username already exists' }, {status: 400});
        }

        // Create user with hashed password and new username
        const newUser = await prisma.accounts.create({
            data: {
                username,
                encryptedpassword: hashedPassword,
            },
        });

        return NextResponse.json({ message: 'User registered successfully', user: newUser }, {status: 201});
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
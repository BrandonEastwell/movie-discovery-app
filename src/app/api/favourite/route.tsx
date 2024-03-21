import { NextRequest, NextResponse } from 'next/server';
import jwt, {verify} from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import {cookies} from "next/headers";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    try {
        const token = cookies().get('token')?.value
        let username: string | null = null;

        if (token) {
            try {
                const decodedToken = verify(token, `${process.env.JWT_EXPIRES_IN}`) as {username: string} ;
                username = decodedToken.username;
            } catch (error) {
                console.error('Error decoding JWT token:', error)
            }
        }
        return res;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
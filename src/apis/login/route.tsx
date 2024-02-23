// apis/register.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import crypto from "crypto";
const prisma = new PrismaClient();
const jwtSecretKey = process.env.JWT_SECRET;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    //This will generate a random hexadecimal string of 32 bytes (256 bits) using node crypto library
    //const crypto = require('crypto');
    //const jwtSecretKey = crypto.randomBytes(32).toString('hex');
    //console.log("secret key:", jwtSecretKey);

    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, `${process.env.JWT_SECRET}`, {
            expiresIn: `${process.env.JWT_EXPIRES_IN}`,
        });

        // Set token as a cookie or send it in the response body
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user,
            },
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
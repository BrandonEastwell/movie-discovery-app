import {prisma} from "./prisma";
import bcrypt from "bcryptjs";
import jwt, {verify} from "jsonwebtoken";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
    //This will generate a random hexadecimal string of 32 bytes (256 bits) using node crypto library
    //const crypto = require('crypto');
    //const jwtSecretKey = crypto.randomBytes(32).toString('hex');
    //console.log("secret key:", jwtSecretKey);
}


export class AuthService {
    static getFirstUserByUsername(username: string) {
        return prisma.accounts.findFirst({
            where: {
                username,
            },
        });
    }

    static addUserToDB(username: string, hashedPassword: string) {
        return prisma.accounts.create({
            data: {
                username,
                encryptedpassword: hashedPassword,
            },
        });
    }

    static hashPassword(password: string) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    static comparePasswords(passwordToCompare: string, hashedPassword: string) {
        return bcrypt.compare(passwordToCompare, hashedPassword)
    }

    static signToken(userid: number, username: string){
        return jwt.sign({ userid: userid, username: username }, `${JWT_EXPIRES_IN}`, {
            expiresIn: `${JWT_EXPIRES_IN}`
        });
    }

    static setAuthCookieToResponse(response: NextResponse, jwtToken: string) {
        response.cookies.set({
            name: "token",
            value: jwtToken,
            httpOnly: true,
            maxAge: 21600,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production'
        })
    }

    static decodeToken(token: string | undefined) {
        let isLoggedIn = false;
        let userData = null;

        if (token) {
            try {
                userData = verify(token, `${JWT_SECRET}`) as { username: string, userid: number };
                // if decode successful
                if (userData.username) {
                    isLoggedIn = true;
                }
            } catch (error) {
                console.error('Token verification failed:', error);
            }
        }

        return {isLoggedIn, userData}
    }

    static async getAuthState() {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        return AuthService.decodeToken(token);
    }

    static getAuthStateFromRequestHeader(req: NextRequest){
        const token = req.cookies.get('token')?.value;
        if (!token) {
            throw new Error('Token not found');
        }
        return AuthService.decodeToken(token);
    }
}
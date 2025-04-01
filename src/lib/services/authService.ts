import {prisma} from "./prisma";
import bcrypt from "bcryptjs";
import jwt, {verify} from "jsonwebtoken";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {jwtVerify, SignJWT} from "jose";

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

    static setAuthCookieToResponse(response: NextResponse, jwtToken: string) {
        response.cookies.set({
            name: "token",
            value: jwtToken,
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production'
        })
    }

    static async signToken(userid: number, username: string) {
        const secretKey = new TextEncoder().encode(JWT_SECRET);

        return await new SignJWT({userid, username})
            .setProtectedHeader({alg: "HS256"})
            .setExpirationTime(JWT_EXPIRES_IN)
            .sign(secretKey);
    }

    static async decodeToken(token: string | undefined) {
        if (!token) return {isLoggedIn: false, userData: null};

        try {
            const secretKey = new TextEncoder().encode(JWT_SECRET);
            const { payload } = await jwtVerify(token, secretKey) as { payload: {username: string, userid: number}};
            return {isLoggedIn: !!payload.username, userData: {username: payload.username, userid: payload.userid}};
        } catch (error) {
            console.error("Token verification failed:", error);
            return {isLoggedIn: false, userData: null};
        }
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
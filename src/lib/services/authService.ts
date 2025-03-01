import {prisma} from "./prisma";
import bcrypt from "bcryptjs";
import jwt, {verify} from "jsonwebtoken";
import {cookies} from "next/headers";
import {NextRequest} from "next/server";

const SALT_ROUNDS = 10;

export class AuthService {
    getFirstUserByUsername(username: string) {
        return prisma.accounts.findFirst({
            where: {
                username,
            },
        });
    }

    addUserToDB(username: string, hashedPassword: string) {
        return prisma.accounts.create({
            data: {
                username,
                encryptedpassword: hashedPassword,
            },
        });
    }

    hashPassword(password: string) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    signToken(userid: number, username: string){
        return jwt.sign({ userid: userid, username: username }, `${process.env.JWT_SECRET}`, {
            expiresIn: `${process.env.JWT_EXPIRES_IN}`
        });
    }

    static decodeToken(token: string | undefined) {
        let isLoggedIn = false;
        let userData = null;

        if (token) {
            try {
                userData = verify(token, `${process.env.JWT_SECRET}`) as { username: string, userid: number };
                // if decode successful
                if (userData.username) {
                    isLoggedIn = true;
                }
            } catch (error) {
                console.log(error);
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
        const cookieHeader = req.headers.get('cookie');
        if (!cookieHeader) {
            throw new Error('Cookie header not found');
        }

        const tokenMatch = cookieHeader.match(/token=([^;]+)/);
        if (!tokenMatch || tokenMatch.length < 2) {
            throw new Error('Token not found in the cookie header');
        }

        const token = tokenMatch[1];
        return AuthService.decodeToken(token);
    }
}
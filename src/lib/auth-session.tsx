import {verify} from "jsonwebtoken";
import {NextResponse} from "next/server";

export function authSession(token : string) {
    let username: string | null;
    let userid: number | null;

    try {
        const decodedToken = verify(token, `${process.env.JWT_SECRET}`) as {username: string, userid: number};
        username = decodedToken.username;
        userid = decodedToken.userid;
        console.log(userid, username);
        return userid;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
}
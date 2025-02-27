import {verify} from "jsonwebtoken";

export function processToken(token: string | undefined) {
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
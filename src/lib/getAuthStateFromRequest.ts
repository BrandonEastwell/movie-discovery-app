import {NextRequest} from "next/server";
import {processToken} from "./processToken";

export const getAuthStateFromRequest = (req: NextRequest) => {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
        throw new Error('Cookie header not found');
    }

    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    if (!tokenMatch || tokenMatch.length < 2) {
        throw new Error('Token not found in the cookie header');
    }

    const token = tokenMatch[1];
    return processToken(token);
}
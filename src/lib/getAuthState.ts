import {cookies} from "next/headers";
import {processToken} from "./processToken";

export default async function getAuthState() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    return processToken(token);
}
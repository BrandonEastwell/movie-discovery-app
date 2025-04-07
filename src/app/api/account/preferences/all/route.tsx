import {NextRequest, NextResponse} from "next/server";
import {AuthService} from "../../../../../lib/services/authService";
import {PreferencesService} from "../../../../../lib/services/preferencesService";
import {prisma} from "../../../../../lib/services/prisma";

export default async function GET(req: NextRequest) {
    try {
        const authState = await AuthService.getAuthStateFromRequestHeader(req);
        if (authState.isLoggedIn && authState.userData?.userid) {
            const preferences = await PreferencesService.getListOfAllPreferences(authState.userData?.userid)
            return NextResponse.json({result: true, preferences: preferences}, {status: 200})
        } else {
            return NextResponse.json({result: false}, {status: 401})
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: `Error: ${error}`, }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
import {NextRequest, NextResponse} from "next/server";
import { prisma } from "../../../../../lib/services/prisma";
import {getMoviesByDiscoveryCast} from "../../../../../lib/api/TMDB/movieLists";
import {PreferencesService} from "../../../../../lib/services/preferencesService";
import {AuthService} from "../../../../../lib/services/authService";

export async function GET(req: NextRequest) {
    try {
        const authState = await AuthService.getAuthStateFromRequestHeader(req);
        if (authState.userData && authState.userData.userid) {
            const preferences = await PreferencesService.getAllUserPreferenceIDs(authState.userData.userid);

            if (preferences != null && preferences.preferredCast != null) {
                const preferredCast = preferences.preferredCast.replace(/,/g, '|');
                const preferredCastList = preferences.preferredCast.split(","); // Split comma-separated genres

                const listOfCastMembers = PreferencesService.getPeopleData(preferredCastList);

                const preferredMoviesByCast = await getMoviesByDiscoveryCast("popularity.desc", preferredCast);

                return NextResponse.json({result: true, movies: preferredMoviesByCast.results, strings: listOfCastMembers}, {status: 200})
            } else {
                return NextResponse.json({result: false}, {status: 404})
            }
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
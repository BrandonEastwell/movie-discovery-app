import {NextRequest, NextResponse} from "next/server";
import {getMoviesByDiscoveryCrew} from "../../../../../lib/api/TMDB/movieLists";
import { prisma } from "../../../../../lib/services/prisma";
import {PreferencesService} from "../../../../../lib/services/preferencesService";
import {AuthService} from "../../../../../lib/services/authService";

export async function GET(req: NextRequest) {
    try {
        const authState = await AuthService.getAuthStateFromRequestHeader(req);
        if (authState.userData && authState.userData.userid) {
            const preferences = await PreferencesService.getAllUserPreferenceIDs(authState.userData.userid);

            if (preferences != null && preferences.preferredCrew != null) {
                const preferredCrew = preferences.preferredCrew.replace(/,/g, '|');
                const preferredCrewList = preferences.preferredCrew.split(","); // Split comma-separated genres

                const listOfCrewMembers = PreferencesService.getPeopleData(preferredCrewList);

                const preferredMoviesByCrew = await getMoviesByDiscoveryCrew("popularity.desc", preferredCrew);

                return NextResponse.json({result: true, movies: preferredMoviesByCrew.results, strings: listOfCrewMembers}, {status: 200})
            } else {
                return NextResponse.json({result: false}, {status: 404})
            }
        } else {
            return NextResponse.json({result: false}, {status: 401})
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: `Error: ${error}` }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
import {NextRequest, NextResponse} from "next/server";
import {getMoviesByDiscoveryCrew} from "../../../../../lib/api/server/movieLists";
import {getAuthStateFromRequest} from "../../../../../lib/getAuthStateFromRequest";
import { prisma } from "../../../../../lib/prisma";
import {PreferencesService} from "../../../../../lib/services/preferencesService";

export async function GET(req: NextRequest) {
    try {
        const authState = getAuthStateFromRequest(req);
        if (authState.userData && authState.userData.userid) {
            const preferencesService = new PreferencesService();
            const preferences = await preferencesService.getAllUserPreferenceIDs(authState.userData.userid);

            if (preferences != null && preferences.preferredCrew != null) {
                const preferredCrew = preferences.preferredCrew.replace(/,/g, '|');
                const preferredCrewList = preferences.preferredCrew.split(","); // Split comma-separated genres

                const people = preferencesService.getPeopleData(preferredCrewList);

                let discovery = await getMoviesByDiscoveryCrew("popularity.desc", preferredCrew);

                return NextResponse.json({result: true, movies: discovery.results, strings: people}, {status: 200})
            } else {
                return NextResponse.json({result: false}, {status: 200})
            }
        }
        return NextResponse.json({result: false}, {status: 200})
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
import {NextRequest, NextResponse} from "next/server";
import { prisma } from "../../../../../lib/prisma";
import {getMoviesByDiscoveryCast} from "../../../../../lib/api/server/movieLists";
import {getAuthStateFromRequest} from "../../../../../lib/getAuthStateFromRequest";
import {getPersonDetails} from "../../../../../lib/api/server/personDetails";
import {PreferencesService} from "../../../../../lib/services/preferencesService";

interface Person {
    name: string;
}

export async function GET(req: NextRequest) {
    try {
        const authState = getAuthStateFromRequest(req);
        if (authState.userData && authState.userData.userid) {
            const preferencesService = new PreferencesService();
            const preferences = await preferencesService.getAllUserPreferenceIDs(authState.userData.userid);

            if (preferences != null && preferences.preferredCast != null) {
                const preferredCast = preferences.preferredCast.replace(/,/g, '|');
                const preferredCastList = preferences.preferredCast.split(","); // Split comma-separated genres

                const people = preferencesService.getPeopleData(preferredCastList);

                let discovery = await getMoviesByDiscoveryCast("popularity.desc", preferredCast);

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
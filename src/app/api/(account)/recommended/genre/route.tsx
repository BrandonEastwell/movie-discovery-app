import {NextRequest, NextResponse} from "next/server";
import {getMoviesByDiscoveryGenre} from "../../../../../lib/api/server/movieLists";
import {getAuthStateFromRequest} from "../../../../../lib/getAuthStateFromRequest";
import { prisma } from "../../../../../lib/prisma";
import {PreferencesService} from "../../../../../lib/services/preferencesService";

export async function GET(req: NextRequest) {
    try {
        const authState = getAuthStateFromRequest(req);
        if (authState.userData && authState.userData.userid) {
            const preferencesService = new PreferencesService();
            const preferences = await preferencesService.getAllUserPreferenceIDs(authState.userData.userid);

            if (preferences != null && preferences.preferredGenre != null) {
                const preferredGenre = preferences.preferredGenre.replace(/,/g, '|');
                const preferredGenreList = preferences.preferredGenre.split(","); // Split comma-separated genres

                const genreToStrings = await preferencesService.genreIdToString(preferredGenreList);

                let discovery = await getMoviesByDiscoveryGenre(preferredGenre, "popularity.desc");

                return NextResponse.json({result: true, movies: discovery.results, strings: genreToStrings}, {status: 200})
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
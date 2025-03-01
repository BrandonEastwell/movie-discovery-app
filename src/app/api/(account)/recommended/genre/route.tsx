import {NextRequest, NextResponse} from "next/server";
import {getMoviesByDiscoveryGenre} from "../../../../../lib/api/serverSide/movieLists";
import { prisma } from "../../../../../lib/services/prisma";
import {PreferencesService} from "../../../../../lib/services/preferencesService";
import {AuthService} from "../../../../../lib/services/authService";

export async function GET(req: NextRequest) {
    try {
        const authState = AuthService.getAuthStateFromRequestHeader(req);
        if (authState.userData && authState.userData.userid) {
            const preferencesService = new PreferencesService();
            const preferences = await preferencesService.getAllUserPreferenceIDs(authState.userData.userid);

            if (preferences != null && preferences.preferredGenre != null) {
                const preferredGenre = preferences.preferredGenre.replace(/,/g, '|');
                const preferredGenreList = preferences.preferredGenre.split(","); // Split comma-separated genres

                const listOfGenreNames = await preferencesService.genreIdToString(preferredGenreList);

                const preferredMoviesByGenre = await getMoviesByDiscoveryGenre(preferredGenre, "popularity.desc");

                return NextResponse.json({result: true, movies: preferredMoviesByGenre.results, strings: listOfGenreNames}, {status: 200})
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
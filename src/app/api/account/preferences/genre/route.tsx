import {NextRequest, NextResponse} from "next/server";
import {getMoviesByDiscoveryGenre} from "../../../../../lib/api/TMDB/movieLists";
import { prisma } from "../../../../../lib/services/prisma";
import {PreferencesService} from "../../../../../lib/services/preferencesService";
import {AuthService} from "../../../../../lib/services/authService";

export async function GET(req: NextRequest) {
    try {
        const authState = await AuthService.getAuthStateFromRequestHeader(req);
        if (authState.userData && authState.userData.userid) {
            const preferences = await PreferencesService.getAllUserPreferenceIDs(authState.userData.userid);

            if (preferences != null && preferences.preferredGenre != null) {
                const preferredGenre = preferences.preferredGenre.replace(/,/g, '|');
                const preferredGenreList = preferences.preferredGenre.split(","); // Split comma-separated genres

                const listOfGenreNames = await PreferencesService.genreIdToString(preferredGenreList);

                const preferredMoviesByGenre = await getMoviesByDiscoveryGenre(preferredGenre, "popularity.desc");

                return NextResponse.json({result: true, movies: preferredMoviesByGenre.results, strings: listOfGenreNames}, {status: 200})
            } else {
                return NextResponse.json({result: false}, {status: 404})
            }
        } else {
            return NextResponse.json({result: false}, {status: 401})
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: `Internal Server Error` }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
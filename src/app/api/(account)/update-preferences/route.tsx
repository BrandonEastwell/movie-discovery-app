import {NextRequest, NextResponse} from "next/server";
import { prisma } from "../../../../lib/services/prisma";
import {FavouritesService} from "../../../../lib/services/favouritesService";
import {MoviesService} from "../../../../lib/services/moviesService";
import {PreferencesService} from "../../../../lib/services/preferencesService";
import {AuthService} from "../../../../lib/services/authService";


export async function POST(req: NextRequest) {
    try {
        const authState = AuthService.getAuthStateFromRequestHeader(req);

        if (authState.userData && authState.userData.userid) {
            const favouriteService = new FavouritesService();
            const favoriteMovies = await favouriteService.getFavouriteMovies(authState.userData.userid);

            if (!favoriteMovies) {
                return NextResponse.json({result: false}, {status: 200})
            }

            const movieService = new MoviesService();
            const moviesData = await movieService.getDetailsFromMovies(favoriteMovies);
            const preferencesService = new PreferencesService();
            await preferencesService.setPreferences({genre: moviesData.genreIds, crew: moviesData.crewIds, cast: moviesData.castIds}, authState.userData.userid);

            return NextResponse.json({result: true}, {status: 200})
        } else {
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: `Error: ${error}` }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
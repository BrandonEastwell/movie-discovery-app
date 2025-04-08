import {NextRequest, NextResponse} from "next/server";
import { prisma } from "../../../../../lib/services/prisma";
import {PreferencesService} from "../../../../../lib/services/preferencesService";
import {AuthService} from "../../../../../lib/services/authService";
import {FavouritesService} from "../../../../../lib/services/favouritesService";

export async function POST(req: NextRequest) {
    try {
        const authState = await AuthService.getAuthStateFromRequestHeader(req);
        if (authState.userData && authState.userData.userid) {
            const favoriteMovies = await FavouritesService.getFavouriteMovies(authState.userData.userid);
            let favouriteIds: number[] = [];
            favoriteMovies.forEach(movie => favouriteIds.push(movie.id))
            await PreferencesService.updateAllPreferences(authState.userData.userid, favouriteIds)
            return NextResponse.json({result: true}, {status: 200})
        } else {
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: `Internal Server Error` }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
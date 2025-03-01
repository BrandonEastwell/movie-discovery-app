import {NextRequest, NextResponse} from 'next/server';
import {getAuthStateFromRequest} from "../../../../lib/utils/getAuthStateFromRequest";
import {prisma} from "../../../../lib/services/prisma";
import {FavouritesService} from "../../../../lib/services/favouritesService";

export async function POST(req: NextRequest) {
    let movieid: number | null;
    const body = await req.json();
    movieid = typeof body.movieid === 'number' ? body.movieid : parseInt(body.movieid);

    try {
        const authState = getAuthStateFromRequest(req);

        //add or remove movie id to favourite database process
        if (authState.userData && authState.userData.userid && movieid != null) {
            const favouriteMoviesService = new FavouritesService();
            await favouriteMoviesService.toggleFavourite(authState.userData.userid, movieid);
        } else {
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }
    } catch (error) {
        console.error('Error Authenticating:', error);
        return NextResponse.json({ error: error }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest) {
    try {
        const authState = getAuthStateFromRequest(req);

        // If authentication is successful, extract userid and username from data
        if (authState.userData && authState.userData.userid) {
            const favouriteMoviesService = new FavouritesService();
            const movies = favouriteMoviesService.getFavouriteMovies(authState.userData.userid);
            return NextResponse.json({result: movies}, {status: 200})
        }
        return NextResponse.json({result: null}, {status: 200})
    } catch (error) {
        console.error('Error Authenticating:', error);
        return NextResponse.json({ error: error }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
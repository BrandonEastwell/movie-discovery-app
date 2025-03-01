import {NextRequest, NextResponse} from 'next/server';
import {prisma} from "../../../../lib/services/prisma";
import {FavouritesService} from "../../../../lib/services/favouritesService";
import {AuthService} from "../../../../lib/services/authService";

export async function POST(req: NextRequest) {
    let movieid: number | null;
    const body = await req.json();
    movieid = typeof body.movieid === 'number' ? body.movieid : parseInt(body.movieid);

    try {
        const authState = AuthService.getAuthStateFromRequestHeader(req);

        //add or remove movie id to favourite database process
        if (authState.userData && authState.userData.userid && movieid != null) {
            const action = await FavouritesService.toggleFavourite(authState.userData.userid, movieid);
            return NextResponse.json({result: action}, {status: 200})
        }
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 401});
    } catch (error) {
        console.error('Error Authenticating:', error);
        return NextResponse.json({ error: error }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest) {
    try {
        const authState = AuthService.getAuthStateFromRequestHeader(req);

        // If authentication is successful, extract userid and username from data
        if (authState.userData && authState.userData.userid) {
            const movies = FavouritesService.getFavouriteMovies(authState.userData.userid);
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
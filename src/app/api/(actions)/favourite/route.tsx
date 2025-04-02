import {NextRequest, NextResponse} from 'next/server';
import {prisma} from "../../../../lib/services/prisma";
import {FavouritesService} from "../../../../lib/services/favouritesService";
import {AuthService} from "../../../../lib/services/authService";

export async function POST(req: NextRequest) {
    try {
        const authState = await AuthService.getAuthStateFromRequestHeader(req);

        const body = await req.json();
        let movieid = typeof body.movieid === 'number' ? body.movieid : parseInt(body.movieid);

        // Add or remove movie id to favourite database process
        if (authState.userData && authState.userData.userid && movieid != null) {
            const action = await FavouritesService.toggleFavourite(authState.userData.userid, movieid);
            console.log(action)
            return NextResponse.json({ success: true, result: action }, {status: 200})
        } else {
            return NextResponse.json({ success: false, error: 'Error Authenticating' }, {status: 401});
        }
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ success: false, error: error }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest) {
    try {
        const authState = await AuthService.getAuthStateFromRequestHeader(req);

        // If authentication is successful, extract userid and username from data
        if (authState.userData && authState.userData.userid) {
            const movies = await FavouritesService.getFavouriteMovies(authState.userData.userid);
            return NextResponse.json({ success: true, result: movies }, {status: 200})
        } else {
            return NextResponse.json({ success: false, error: 'Error Authenticating' }, {status: 401});
        }
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ success: false, error: error }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
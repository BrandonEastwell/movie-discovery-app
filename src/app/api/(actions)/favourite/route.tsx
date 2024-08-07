import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {authSession} from "../../../../lib/authenticate";
import {getMovieDetails} from "../../../../lib/movieDetails";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    let userid: number | null = null;
    let movieid: number | null = null;
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    try {
        const body = await req.json();
        movieid = typeof body.movieid === 'number' ? body.movieid : parseInt(body.movieid);

        const response = authSession(req, res); // Await the authentication function
        if (response.ok) {
            // If authentication is successful, extract userid and username from data
            const data = await response.json(); // Await the JSON response from the authentication function
            userid = data.userid;
        } else {
            // If authentication fails, handle the error
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }

        //add or remove movie id to favourite database process
        if (userid != null && movieid != null) {
            const existingFavorite= await prisma.favouritemovies.findFirst({
                where: {
                    userid: userid,
                    movieid: movieid,
                },
            });
            // remove the movie from user's favourites
            if (existingFavorite) {
                await prisma.favouritemovies.delete({
                    where: {
                        favouriteid: existingFavorite.favouriteid,
                    },
                })
                return NextResponse.json({ result: "favourite removed" }, {status: 200});
            }
            // Add the movie to user's favorites
            await prisma.favouritemovies.create({
                data: {
                    userid: userid,
                    movieid: movieid,
                },
            });
            return NextResponse.json({ result: "favourite added" }, {status: 200});
        } else {
            // Redirect to login.tsx page if authentication fails
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method !== 'GET') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    interface Movie {
        id: number;
        title: string;
        poster_path: string;
        backdrop_path: string;
    }

    let movies : Movie[] = []
    let userid: number | null = null;

    try {
        const response = authSession(req, res); // Await the authentication function
        const data = await response.json(); // Await the JSON response from the authentication function
        if (response.ok) {
            // If authentication is successful, extract userid and username from data
            userid = data.userid;
        } else {
            // If authentication fails, handle the error
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }
        if (userid != null) {
            const favorites = await prisma.favouritemovies.findMany({
                where: {
                    userid: userid,
                },
            });

            if (favorites.length != 0) {
                // Extracting only movieids from the favorites array
                const movieIds = favorites.map(favorite => favorite.movieid);
                for (const id of movieIds) {
                    const movieData = await getMovie(id)
                    movies.push(movieData as Movie)
                }
                return NextResponse.json({result: movies}, {status: 200})
            }
        }
        return NextResponse.json({result: null}, {status: 200})
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

async function getMovie(id: number) {
    let movie = await getMovieDetails(id)
    return await movie
}
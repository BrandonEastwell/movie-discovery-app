import {NextRequest, NextResponse} from "next/server";
import {getMovieDetails} from "../../../../../lib/api/server/movieDetails";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    try {
        const body = await req.json();
        const playlistid : number = parseInt(body.playlistid);
        const movieid : number = parseInt(body.movieid);
        //add or remove movie id to favourite database process
        if (playlistid != null) {
            const existingMovie = await prisma.playlistmovies.findFirst({
                where: {
                    playlistid: playlistid,
                    movieid: movieid,
                },
            });
            if (existingMovie) {
                await prisma.playlistmovies.delete({
                    where: {
                        id: existingMovie.id
                    }
                })
                return NextResponse.json({ message: "movie removed from playlist" }, {status: 200});
            } else {
                const movies = await prisma.playlistmovies.findMany({
                    where: {
                        playlistid: playlistid
                    }
                })
                let position = movies.length
                await prisma.playlistmovies.create({
                    data: {
                        playlistid: playlistid,
                        position: position++,
                        movieid: movieid,
                    }
                })
                return NextResponse.json({ message: "movie added to playlist" }, {status: 200});
            }
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    interface Movie {
        id: number;
        title: string;
        poster_path: string;
        backdrop_path: string;
    }

    let movieData : Movie[] = []

    try {

        const playlistid : number = parseInt(req.nextUrl.searchParams.get("id") as string);

        if (playlistid != null) {
            const movies = await prisma.playlistmovies.findMany({
                where: {
                    playlistid: playlistid
                }
            })
            if (movies.length != 0) {
                const movieIds = movies.map(movie => movie.movieid);
                for (const id of movieIds) {
                    const getMovieData = await getMovie(id)
                    movieData.push(getMovieData as Movie)
                }
                return NextResponse.json({ result: {movies, movieData} }, {status: 200});
            } else {
                return NextResponse.json({ result: null }, {status: 200});
            }
        }
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
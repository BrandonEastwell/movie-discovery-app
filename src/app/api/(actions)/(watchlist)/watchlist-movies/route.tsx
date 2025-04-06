import {NextRequest, NextResponse} from "next/server";
import {getMovieDetails} from "../../../../../lib/api/server/movieDetails";
import { prisma } from "../../../../../lib/services/prisma";
import WatchlistService from "../../../../../lib/services/watchlistService";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const watchlistID : number = parseInt(body.watchlistID);
        const movieID : number = parseInt(body.movieID);

        // Add or remove movie id to favourite database process
        if (watchlistID) {
            // Finds if the movie exists in DB already
            const existingMovie = await prisma.playlistmovies.findFirst({
                where: {
                    playlistid: watchlistID,
                    movieid: movieID,
                },
            });

            if (existingMovie) {
                await prisma.playlistmovies.delete({
                    where: {
                        id: existingMovie.id
                    }
                })

                return NextResponse.json({ success: true, result: "movie removed from watchlist" }, {status: 200});
            } else {
                const maxPosition = await prisma.playlistmovies.aggregate({
                    where: { playlistid: watchlistID },
                    _max: { position: true }
                });

                const nextPosition = (maxPosition._max.position ?? -1) + 1;

                await prisma.playlistmovies.create({
                    data: {
                        playlistid: watchlistID,
                        position: nextPosition,
                        movieid: movieID,
                    }
                })

                return NextResponse.json({ success: true, result: "movie added to watchlist" }, {status: 200});
            }
        } else {
            return NextResponse.json({ success: false, error: "watchlist ID is null or undefined" }, {status: 200});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest) {
    let moviesData : Movie[] = []

    try {
        const body = await req.json();
        const watchlistID : number = parseInt(body.watchlistID);

        if (watchlistID) {
            const moviesInWatchlist = await WatchlistService.getAllWatchlistMovies(watchlistID)

            if (moviesInWatchlist.length != 0) {
                const watchlistMovieIds = moviesInWatchlist.map(movie => movie.movieid);

                for (const id of watchlistMovieIds) {
                    const movieDetails : Movie = await getMovieDetails(id);
                    moviesData.push(movieDetails);
                }

                return NextResponse.json({ success: true, result: {moviesInWatchlist, moviesData} }, {status: 200});
            } else {
                return NextResponse.json({ success: false, error: "No movies found in watchlist" }, {status: 400});
            }
        } else {
            return NextResponse.json({ success: false, error: "watchlist ID is null or undefined" }, {status: 400});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
import {NextRequest, NextResponse} from "next/server";
import {getMovieDetails} from "../../../../../../lib/api/TMDB/movieDetails";
import { prisma } from "../../../../../../lib/services/prisma";
import WatchlistService from "../../../../../../lib/services/watchlistService";
import {Movie} from "../../../../../../lib/utils/types/movies";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const watchlistId : number = parseInt(body.watchlistID);
        const movieId : number = parseInt(body.movieID);

        // Add or remove movie id to favourite database process
        if (watchlistId) {
            // Finds if the movie exists in DB already
            const transaction = await prisma.$transaction(async (tx) => {
                const existingMovie = await tx.watchlistMovies.findUnique({
                    where: {
                        watchlistId_movieId: {
                            watchlistId,
                            movieId,
                        },
                    },
                });

                if (!existingMovie) {
                    return null;
                }

                await tx.watchlistMovies.delete({
                    where: {
                        watchlistId_movieId: {
                            watchlistId,
                            movieId,
                        },
                    },
                });

                return existingMovie;
            });

            if (transaction) {
                return NextResponse.json(
                    { success: true, result: "movie removed from watchlist" },
                    { status: 200 }
                );
            }

            const maxPosition = await prisma.watchlistMovies.aggregate({
                where: { watchlistId: watchlistId },
                _max: { position: true }
            });

            const nextPosition = (maxPosition._max.position ?? -1) + 1;

            await prisma.watchlistMovies.create({
                data: {
                    watchlistId: watchlistId,
                    position: nextPosition,
                    movieId: movieId,
                }
            })

            return NextResponse.json({ success: true, result: "movie added to watchlist" }, {status: 200});
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
    let moviesData: Movie[] = []

    try {
        const body = await req.json();
        const watchlistID : number = parseInt(body.watchlistID);

        if (watchlistID) {
            const moviesInWatchlist = await WatchlistService.getWatchlistMoviesByWatchlistId(watchlistID)

            if (moviesInWatchlist.length != 0) {
                const watchlistMovieIds = moviesInWatchlist.map((movie) => movie.movieId);

                for (const id of watchlistMovieIds) {
                    const movieDetails: Movie = await getMovieDetails(id);
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
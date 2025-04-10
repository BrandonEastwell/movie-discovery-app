import {prisma} from "./prisma";

export default class WatchlistService {
    static async getAllWatchlistsByUserId(userId : number) {
        return prisma.watchlist.findMany({
            where: {
                userId: userId
            },
            select: {
                watchlistName: true,
                watchlistDesc: true,
                id: true,
                watchlistMovies: {
                    select: {
                        movieId: true
                    }
                }
            }
        });
    }

    static async getWatchlistDetailsByWatchlistId(watchlistId: number) {
        return prisma.watchlist.findUnique({
            where: {
                id: watchlistId
            },
            select: {
                watchlistName: true,
                watchlistDesc: true,
                id: true,
                watchlistMovies: {
                    select: {
                        movieId: true
                    }
                }
            }
        });
    }

    static async getWatchlistMoviesByWatchlistId(watchlistId: number) {
        return prisma.watchlistMovies.findMany({
            where: {
                watchlistId: watchlistId
            },
            select: {
                position: true,
                movieId: true
            }
        });
    }

}
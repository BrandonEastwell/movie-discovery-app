import {prisma} from "./prisma";

export default class WatchlistService {
    static async getAllWatchlistsByUserId(userid : number) {
        return prisma.userplaylist.findMany({
            where: {
                userid: userid
            },
            select: {
                playlist_name: true,
                playlist_desc: true,
                playlistid: true,
                playlistMovies: {
                    select: {
                        movieid: true
                    }
                }
            }
        });
    }

    static async getWatchlistDetailsByWatchlistId(watchlistid: number) {
        return prisma.userplaylist.findUnique({
            where: {
                playlistid: watchlistid
            },
            select: {
                playlist_name: true,
                playlist_desc: true,
                playlistid: true,
                playlistMovies: {
                    select: {
                        movieid: true
                    }
                }
            }
        });
    }

    static async getWatchlistsMoviesByWatchlistId(watchlistid: number) {
        return prisma.playlistmovies.findMany({
            where: {
                playlistid: watchlistid
            }
        });
    }

    static async getUserWatchlistsByMovieId(movieid: number) {
        return prisma.playlistmovies.findMany({
            where: {
                movieid: movieid
            },
            select: {
                playlistid: true
            }
        })
    }
}
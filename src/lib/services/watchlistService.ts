import {prisma} from "./prisma";

export default class WatchlistService {
    static async getAllUserWatchlists(userid : number) {
        return prisma.userplaylist.findMany({
            where: {
                userid: userid
            },
        });
    }

    static async getAllWatchlistMovies(watchlistID: number) {
        return prisma.playlistmovies.findMany({
            where: {
                playlistid: watchlistID
            }
        });
    }

    static async getWatchlistDetails(watchlistID: number) {
        return prisma.userplaylist.findUnique({
            where: {
                playlistid: watchlistID
            },
        });
    }
}
import {prisma} from "./prisma";
import {getMovieDetails} from "../api/TMDB/movieDetails";
import {Movie} from "../utils/types/movies";

export class FavouritesService {

    static async getFavouriteMovieIDs(userid: number) {
        return prisma.favouriteMovies.findMany({
            where: {
                userId: userid,
            },
        });
    }

    static async getFavouriteMovies(userid: number) {
        const favourites = await this.getFavouriteMovieIDs(userid);
        let movies: Movie[] = [];

        // Extracting only movieids from the favorites array
        if (favourites.length != 0) {
            const movieIds = favourites.map(favorite => favorite.movieId);
            for (const id of movieIds) {
                const movieData = await this.getMovie(id)
                movies.push(movieData as Movie)
            }
        }
        return movies;
    }

    static async toggleFavourite(userid: number, movieid: number) {
        const existingFavorite= await prisma.favouriteMovies.findUnique({
            where: {
                userId_movieId: {
                    userId: userid,
                    movieId: movieid,
                }
            }
        });

        // remove the movie from user's favourites
        if (existingFavorite) {
            await prisma.favouriteMovies.delete({
                where: {
                    favouriteId: existingFavorite.favouriteId,
                },
            })
            return {action: 'removed'}
        }

        // Add the movie to user's favorites
        await prisma.favouriteMovies.create({
            data: {
                userId: userid,
                movieId: movieid,
            },
        });

        return {action: 'added'}
    }

    static async getMovie(id: number) {
        let movie = await getMovieDetails(id)
        return await movie
    }

}
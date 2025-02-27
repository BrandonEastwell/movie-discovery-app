import {prisma} from "../prisma";
import {getMovieDetails} from "../api/server/movieDetails";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

export class FavouritesService {

    async getFavouriteMovieIDs(userid: number) {
        return prisma.favouritemovies.findMany({
            where: {
                userid: userid,
            },
        });
    }

    async getFavouriteMovies(userid: number) {
        const favourites = await this.getFavouriteMovieIDs(userid);
        let movies: Movie[] = [];

        // Extracting only movieids from the favorites array
        if (favourites.length != 0) {
            const movieIds = favourites.map(favorite => favorite.movieid);
            for (const id of movieIds) {
                const movieData = await this.getMovie(id)
                movies.push(movieData as Movie)
            }
        }
        return movies;
    }

    async toggleFavourite(userid: number, movieid: number) {
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
            return {action: 'removed'}
        }

        // Add the movie to user's favorites
        await prisma.favouritemovies.create({
            data: {
                userid: userid,
                movieid: movieid,
            },
        });
        return {action: 'added'}
    }

    async getMovie(id: number) {
        let movie = await getMovieDetails(id)
        return await movie
    }

}
import {getPopular, getTopRated, getTrendingWeekMovie, getUpcoming} from "../api/TMDB/movieLists";
import {getMovieCredits, getMovieDetails} from "../api/TMDB/movieDetails";

interface Cast {
    id: number
    count: number
}

interface Crew {
    id: number
    count: number
}

interface Genre {
    id: number
    count: number
}

export class MoviesService {
    static async getListsOfMoviesByCategory() {
        const trending = await getTrendingWeekMovie()
        const topRated = await getTopRated()
        const popular = await getPopular()
        const upcoming = await getUpcoming()

        return {
            trending,
            topRated,
            popular,
            upcoming
        }
    }

    static async getDetailsFromMovies (movies: any) {
        // Fetch movie details from TMDB API and extract genres from each users favorite movie
        let genreIds : Genre[] = [];
        let castIds : Cast[] = [];
        let crewIds : Crew[] = [];
        for (const movie of movies) {
            let movieCredits = await getMovieCredits(movie.id)
            let movieDetails = await getMovieDetails(movie.id)

            if (movieCredits) {
                // Loop through the cast array and push each cast member ID into the castIds array
                for (const castMember of movieCredits.cast) {
                    let found = false;
                    for (let i = 0; i < castIds.length; i++) {
                        if (castIds[i].id === castMember.id) {
                            castIds[i].count++;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        castIds.push({ id: castMember.id, count: 1 });
                    }
                }
                for (const crewMember of movieCredits.crew) {
                    let found = false;
                    for (let i = 0; i < crewIds.length; i++) {
                        if (crewIds[i].id === crewMember.id) {
                            crewIds[i].count++;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        crewIds.push({ id: crewMember.id, count: 1 });
                    }
                }
            }

            if (movieDetails && movieDetails.genres) {
                for (const genre of movieDetails.genres) {
                    let found = false;
                    for (let i = 0; i < genreIds.length; i++) {
                        if (genreIds[i].id === genre.id) {
                            genreIds[i].count++;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        genreIds.push({id: genre.id, count: 1});
                    }
                }
            }
        }

        return {genreIds, castIds, crewIds}
    }
}
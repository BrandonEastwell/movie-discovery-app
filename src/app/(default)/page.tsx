import React, {lazy} from "react";
import {FavouritesService} from "../../lib/services/favouritesService";
import {MoviesService} from "../../lib/services/moviesService";
import {PreferencesService} from "../../lib/services/preferencesService";
import {AuthService} from "../../lib/services/authService";
import dynamic from "next/dynamic";
import {Movie} from "../../lib/utils/types/movies";

const MoviesRecommendedByGenre = lazy(() => import("../../components/movies/MoviesRecommendedByGenre"));
const MoviesRecommendedByCast = lazy(() => import("../../components/movies/MoviesRecommendedByCast"));
const MoviesRecommendedByCrew = lazy(() => import("../../components/movies/MoviesRecommendedByCrew"));

const MoviesList = dynamic(() => import('../../components/movies/MoviesList').then(mod => mod.MoviesList))

export default async function Page() {
    const { trending, topRated, popular, upcoming } = await MoviesService.getListsOfMoviesByCategory();
    const { isLoggedIn, userData } = (await AuthService.getAuthState());

    let favourites : Movie[] = [];
    let favouriteIds: number[] = [];
    let preferences;

    let filteredRecommendedGenre : Movie[] = []
    let filteredRecommendedCast : Movie[] = []
    let filteredRecommendedCrew : Movie[] = []

    if (userData) {
        try {
            favourites = await FavouritesService.getFavouriteMovies(userData.userid);
            favouriteIds = favourites.map((movie: Movie) => movie.id);
        } catch (error) {
            console.log("Error: ", error)
        }

        if (favourites) {
            if (favourites.length >= 5) {
                try {
                    preferences = await PreferencesService.getListOfAllPreferences(userData.userid);
                    if (favourites.length % 5) {
                        await PreferencesService.updateAllPreferences(userData.userid, favouriteIds)
                    }
                } catch (error) {
                    console.log("Error: ", error)
                }
            }
        }

        // Remove favorite movies from the recommended movie sets
        if (preferences) {
            filteredRecommendedGenre = preferences.preferredMoviesByGenre.filter((movie: Movie) => !favourites.some(fav => fav.id === movie.id));
            filteredRecommendedCast = preferences.preferredMoviesByCast.filter((movie: Movie) => !favourites.some(fav => fav.id === movie.id));
            filteredRecommendedCrew = preferences.preferredMoviesByCrew.filter((movie: Movie) => !favourites.some(fav => fav.id === movie.id));
        }
    }

    return (
        <div className="w-full flex flex-col gap-5 justify-start font-vt323 overflow-hidden no-scrollbar">
            <h2 className="flex items-center text-[3rem] text-pearl-white ml-2 font-medium">
                TRENDING FILM
            </h2>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <MoviesList movies={trending.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>

            {isLoggedIn && preferences &&
                <>
                    <b className="flex items-center text-[3rem] text-pearl-white ml-2 font-medium">
                        SELECTED FOR YOU
                    </b>
                    <MoviesRecommendedByGenre favouriteMoviesIds={favouriteIds} recommendedGenreMovies={filteredRecommendedGenre} recommendedGenreNames={preferences.genreNames} />
                    <MoviesRecommendedByCast favouriteMoviesIds={favouriteIds} recommendedCastMovies={filteredRecommendedCast} recommendedCastMembers={preferences.castMembers} />
                    <MoviesRecommendedByCrew favouriteMoviesIds={favouriteIds} recommendedCrewMovies={filteredRecommendedCrew} recommendedCrewMembers={preferences.crewMembers} />
                </>
            }

            <h2 className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                POPULAR FILM
            </h2>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <MoviesList movies={popular.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
            <h2 className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                CRITICALLY ACCLAIMED FILM
            </h2>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <MoviesList movies={topRated.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
            <h2 className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                UPCOMING FILM
            </h2>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <MoviesList movies={upcoming.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
        </div>
    )
}
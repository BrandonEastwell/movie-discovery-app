import "../globals.css"
import React, {Suspense} from "react";
import {FavouritesService} from "../../lib/services/favouritesService";
import {MoviesService} from "../../lib/services/moviesService";
import {PreferencesService} from "../../lib/services/preferencesService";
import {AuthService} from "../../lib/services/authService";
import {MoviesRecommendedByGenre} from "../../components/movies/MoviesRecommendedByGenre";
import {MoviesRecommendedByCast} from "../../components/movies/MoviesRecommendedByCast";
import {MoviesRecommendedByCrew} from "../../components/movies/MoviesRecommendedByCrew";
import dynamic from "next/dynamic";
import {Movie} from "../../lib/utils/types/movies";

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
            <b className="flex items-center text-[3rem] text-pearl-white ml-2 font-medium">
                TRENDING FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <Suspense fallback={<p>loading..</p>}>
                    <MoviesList movies={trending.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
                </Suspense>
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

            <b className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                POPULAR FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <MoviesList movies={popular.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
            <b className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                CRITICALLY ACCLAIMED FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <MoviesList movies={topRated.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
            <b className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                UPCOMING FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <MoviesList movies={upcoming.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
        </div>
    )
}
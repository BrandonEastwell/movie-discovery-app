import "../styles/globals.css"
import {Movies} from '../../components/client/MoviesList';
import React, {Suspense} from "react";
import {FavouritesService} from "../../lib/services/favouritesService";
import {MoviesService} from "../../lib/services/moviesService";
import {PreferencesService} from "../../lib/services/preferencesService";
import {AuthService} from "../../lib/services/authService";
import {MoviesRecommendedByGenre} from "../../components/client/MoviesRecommendedByGenre";
import {MoviesRecommendedByCast} from "../../components/client/MoviesRecommendedByCast";
import {MoviesRecommendedByCrew} from "../../components/client/MoviesRecommendedByCrew";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

export default async function Page() {
    const movieService = new MoviesService();
    const { trending, topRated, popular, upcoming } = await movieService.getListsOfMoviesByCategory();
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
            if (favourites.length % 5 && favourites.length >= 5) {
                try {
                    await PreferencesService.updateAllPreferences(userData.userid, favourites)
                    preferences = await PreferencesService.getListOfAllPreferences(userData.userid);
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
            <Suspense fallback={<p>loading..</p>}>
                <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                    <Movies movies={trending.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
                </div>
            </Suspense>

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
                <Movies movies={popular.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
            <b className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                CRITICALLY ACCLAIMED FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <Movies movies={topRated.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
            <b className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                UPCOMING FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                <Movies movies={upcoming.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
        </div>
    )
}
import "./styles/globals.css"
import {Movies} from '../components/client/movies-list';
import React from "react";
import {UserRecommendedMovies} from "../components/recommended-list";
import {FavouritesService} from "../lib/services/favouritesService";
import {MoviesService} from "../lib/services/moviesService";
import {PreferencesService} from "../lib/services/preferencesService";
import getAuthState from "../lib/services/authService";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

export default async function Page() {
    const movieService = new MoviesService();
    const { trending, topRated, popular, upcoming } = await movieService.getListsOfMoviesByCategory();
    const { isLoggedIn, userData } = (await getAuthState());
    const favouriteService = new FavouritesService();
    let favourites : Movie[] = [];
    let favouriteIds: number[] = [];
    let preferences;

    if (userData) {
        favourites = await favouriteService.getFavouriteMovies(userData.userid);
        favouriteIds = favourites.map((movie: Movie) => movie.id);

        if (favourites) {
            const preferencesService = new PreferencesService();
            preferences = await preferencesService.getAllListOfPreferences(userData.userid);
        }

    }

    return (
        <div className="main-content w-full h-full col-span-1 col-start-2 row-start-3 z-0 overflow-auto no-scrollbar">
            <div className="w-full h-100 flex flex-col gap-10 justify-start overflow-hidden no-scrollbar">
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    TRENDING FILM
                </b>
                <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={trending.results} favouriteMovieIds={favouriteIds}/>
                </div>

                {isLoggedIn && favourites && preferences && <UserRecommendedMovies favouriteMoviesIds={favouriteIds}
                                                                    initFavouriteMovies={favourites}
                                                                    initRecommendedCastMovies={preferences.preferredMoviesByCast}
                                                                    initRecommendedCastMembers={preferences.listOfCastMembers}
                                                                    initRecommendedGenreMovies={preferences.preferredMoviesByGenre}
                                                                    initRecommendedGenreNames={preferences.listOfGenreNames}
                                                                    initRecommendedCrewMovies={preferences.preferredMoviesByCrew}
                                                                    initRecommendedCrewMembers={preferences.listOfCrewMembers} />
                }

                {isLoggedIn && !favourites }
                {!isLoggedIn }

                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    POPULAR FILM
                </b>
                <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={popular.results} favouriteMovieIds={favouriteIds}/>
                </div>
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    CRITICALLY ACCLAIMED FILM
                </b>
                <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={topRated.results} favouriteMovieIds={favouriteIds}/>
                </div>
                <b className="flex items-center text-[3rem] font-vt323 text-pearl-white mt-4 ml-2 font-medium">
                    UPCOMING FILM
                </b>
                <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden overflow-x-auto no-scrollbar">
                    <Movies movies={upcoming.results} favouriteMovieIds={favouriteIds}/>
                </div>
            </div>
        </div>
    )
}
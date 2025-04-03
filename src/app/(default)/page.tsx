import "../styles/globals.css"
import {Movies} from '../../components/client/MoviesList';
import React, {Suspense} from "react";
import {UserRecommendedMovies} from "../../components/client/RecommendedMovies";
import {FavouritesService} from "../../lib/services/favouritesService";
import {MoviesService} from "../../lib/services/moviesService";
import {PreferencesService} from "../../lib/services/preferencesService";
import {AuthService} from "../../lib/services/authService";

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
                    preferences = await PreferencesService.getAllListOfPreferences(userData.userid);
                } catch (error) {
                    console.log("Error: ", error)
                }
            }
        }

    }

    return (
        <div className="w-full flex flex-col gap-5 justify-start font-vt323 overflow-hidden no-scrollbar">
            <b className="flex items-center text-[3rem] text-pearl-white ml-2 font-medium">
                TRENDING FILM
            </b>
            <Suspense fallback={<p>loading..</p>}>
                <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden no-scrollbar">
                    <Movies movies={trending.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
                </div>
            </Suspense>

            {isLoggedIn && preferences && <UserRecommendedMovies favouriteMoviesIds={favouriteIds}
                                                                               initFavouriteMovies={favourites}
                                                                               initRecommendedCastMovies={preferences.preferredMoviesByCast}
                                                                               initRecommendedCastMembers={preferences.listOfCastMembers}
                                                                               initRecommendedGenreMovies={preferences.preferredMoviesByGenre}
                                                                               initRecommendedGenreNames={preferences.listOfGenreNames}
                                                                               initRecommendedCrewMovies={preferences.preferredMoviesByCrew}
                                                                               initRecommendedCrewMembers={preferences.listOfCrewMembers} />
            }

            <b className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                POPULAR FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden no-scrollbar">
                <Movies movies={popular.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
            <b className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                CRITICALLY ACCLAIMED FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden no-scrollbar">
                <Movies movies={topRated.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
            <b className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                UPCOMING FILM
            </b>
            <div className="flex w-full h-full flex-row gap-[3rem] overflow-hidden no-scrollbar">
                <Movies movies={upcoming.results} favouriteMovieIds={favouriteIds} isLoggedIn={isLoggedIn}/>
            </div>
        </div>
    )
}